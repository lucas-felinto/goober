
import Head from 'next/head';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="w-full h-screen from-indigo-500 bg-cover bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmZzMmFzNXV5NGRmb3IzNW9vbWVjZmU0Y2N0bTdyMWkzYmc1OGJraCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BbSxLhu3UR2PG0VxKm/giphy.gif')] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <Head>
        <title>Goober</title>
      </Head>
      <div className="space-y-6">
        <h1 className="text-5xl text-center font-extrabold text-white">Goober</h1>
        <p className="text-xl text-center text-white">Your journey, your way.</p>
      </div>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
        <Link
          className="inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium bg-white text-black rounded hover:bg-black hover:text-white transition duration-300 focus-visible:outline-none focus-visible:ring- disabled:pointer-events-none disabled:opacity-50"
          href="/rider"
        >
          {"I'm a Rider"}
        </Link>
        <Link
          className="inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium bg-black text-white rounded hover:bg-white hover:text-black transition duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
          href="/driver"
        >
          {"I'm a Driver"}
        </Link>
      </div>
    </section>
  )
}
