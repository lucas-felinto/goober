import Link from 'next/link';

export default function HomePage() {
  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen bg-[#5bb1c2] bg-[url('/background.jpeg')] bg-center bg-no-repeat">
  //     <div className="space-x-4">
  //       <Link href="/rider">
  //         <span className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black transition duration-300">
  //           I'm a Rider
  //         </span>
  //       </Link>
  //       <Link href="/driver">
  //         <span className="px-4 py-2 bg-white text-black rounded hover:bg-black hover:text-white transition duration-300">
  //           I'm a Driver
  //         </span>
  //       </Link>
  //     </div>
  //   </div>
  // );
  return (
    <section className="w-full h-screen bg-gradient-to-r from-indigo-500  flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* <NextVideo
        src={VideoLoop}
        autoPlay
        muted
        loop
        playsInline
        controls
      /> */}
      <div className="space-y-6">
        <h1 className="text-5xl text-center font-extrabold text-black-900 dark:text-black-100">Goober</h1>
        <p className="text-xl text-center text-black-800 dark:text-black-800">Your journey, your way.</p>
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
