
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="w-full h-screen from-indigo-500 bg-[url('/bg.gif')] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-5xl text-center font-extrabold text-white">Goober</h1>
        <p className="text-xl text-center text-white">Your journey, your way.</p>
      </div>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8">
        <Link
          className="inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium bg-white text-black rounded hover:bg-black hover:text-white transition duration-300 focus-visible:outline-none focus-visible:ring- disabled:pointer-events-none disabled:opacity-50"
          href="/rider"
        >
          I'm a Rider
        </Link>
        <Link
          className="inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium bg-black text-white rounded hover:bg-white hover:text-black transition duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
          href="/driver"
        >
          I'm a Driver
        </Link>
      </div>
    </section>
  )
}
