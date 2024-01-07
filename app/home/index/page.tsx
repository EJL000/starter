import { signOut } from '@/auth';

async function getContent() {
  const response = await fetch('https://netzwelt-devtest.azurewebsites.net/Territories/All', {
    method: 'GET'
  });
  const data = await response.json();
  const content = data.data;
  return content
}

function unflatten(items: any) {
  let tree = [];
  let mappedArr: any = [];
      
  items.forEach(function(item: any) {
    var id = item.id;
    if (!mappedArr.hasOwnProperty(id)) { 
      mappedArr[id] = item; 
      mappedArr[id].children = [];  
    }
  })
  
  for (var id in mappedArr) { 
    if (mappedArr.hasOwnProperty(id)) {
      let mappedElem = mappedArr[id];
      if (mappedElem.parent) { 
        var parentId = mappedElem.parent;
        mappedArr[parentId].children.push(mappedElem); 
      } else { 
        tree.push(mappedElem);
      } 
    }
  }
    return tree;
}

var getListItems = (dataset: any) => {
  return dataset.map((item: any) => {
    var nested = getTreeStrucureTemplate(item.children || [])
    if(item.children.length) {
      return `<details><summary>${ item.name }</summary>${ nested }</details>`
    } else {
      return `<p>${ item.name }</p>`
    }
  }).join('') 
}

var getTreeStrucureTemplate = (dataset: any) => {
  if (dataset.length) {
    return `${ getListItems(dataset) }`
  } else {
    return ''
  }
};

export default async function Page() {
  const data = await getContent();
  const tree = unflatten(data);
  let test = getTreeStrucureTemplate(tree);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className="font-bold">Territories</h1>
      <h2>Here is the list of territories</h2>
      <div dangerouslySetInnerHTML={{__html: test}}>
      </div>
      <form action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </div>
  );
}