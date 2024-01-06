import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col">
        <Link
          href="/account/login"
          className="flex rounded-lg bg-blue-500 px-6 py-3"
        >
          <span>Login</span>
        </Link>
      </div>
    </main>
  )
}
