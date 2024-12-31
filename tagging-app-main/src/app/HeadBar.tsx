import Link from 'next/link'

export function HeadBar () {
  return (
    <header className="main-header">
      <h1 className='text-4xl'>Tagging-App</h1>
      <nav>
        <Link href={'/'}>Levels</Link>
        <Link href={'/about'}>About</Link>
      </nav>
    </header>
  )
}
