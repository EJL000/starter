async function getContent() {
  const response = await fetch('https://netzwelt-devtest.azurewebsites.net/Territories/All', {
    method: 'GET'
  });
  const data = await response.json();
  const content = data.data;
  return content
}

function unflatten(items) {
  var tree = [], mappedArr = {};
      
  items.forEach(function(item) {
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

var getListItems = dataset => {
  return dataset.map(item => {
    var nested = getTreeStrucureTemplate(item.children || [])
    return `<li>${ item.name }</li>${ nested }`
  }).join('') 
}

var getTreeStrucureTemplate = dataset => {
  if (dataset.length) {
    return `<ul>${ getListItems(dataset) }</ul>`
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
      <h1 className="text-5x1 font-bold">Territories</h1>
      <div dangerouslySetInnerHTML={{ __html: test }}>
      </div>
    </div>
  );
}