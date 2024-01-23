import React from 'react'

export default function SearchingDriverCard() {
  return (
    <div
      className="border text-card-foreground w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden"
      data-v0-t="card"
    >
      <div className="flex flex-col items-center justify-center p-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-20 w-20 animate-spin text-blue-500"
        >
          <line x1="2" x2="5" y1="12" y2="12"></line>
          <line x1="19" x2="22" y1="12" y2="12"></line>
          <line x1="12" x2="12" y1="2" y2="5"></line>
          <line x1="12" x2="12" y1="19" y2="22"></line>
          <circle cx="12" cy="12" r="7"></circle>
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-black text-center">
          We are searching for available drivers
        </h2>
        <p className="mt-2 text-black text-sm text-center">
          Please wait while we find a driver for you. This may take a few moments.
        </p>
      </div>
    </div>
  )
}
