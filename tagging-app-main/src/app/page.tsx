import Link from 'next/link'
import levels from '../data/dataLevel.json'
import Image from 'next/image'
export default function Home() {
  return (
    <>
      <div className="mt-4 px-4 py-2">
        <h3 className="font-bold text-2xl">What is your objective?</h3>
        <p>
          You are an automated inspector looking for people who might be
          suspicious to be arrested.
        </p>
      </div>
      <main className="selector">
        {levels.map((l) => {
          return (
            <article key={l.slug}>
              <Link href={`/level/${l.slug}`}>
                <h2>{l.title}</h2>
                <Image
                  className='preview'
                  width={100}
                  height={100}
                  src={`/${l.slug}/preview.webp`}
                  alt={l.title}
                />
              </Link>
              <Link
                className='self-start w-auto'
                title={`Leaderboard: ${l.title}`}
                href={`/ranking/${l.slug}`}>
                <Image
                  src="/leaderboard.svg"
                  width={24}
                  height={24}
                  alt="Ladearboard"
                ></Image>
              </Link>
            </article>
          )
        })}
      </main>
    </>
  )
}
