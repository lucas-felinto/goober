import React from 'react'

type MoveUpPassangerCardType = {
  address: string
  message: string
}

const MoveUpPassangerCard: React.FC<MoveUpPassangerCardType> = ({ address, message }) => {
  return (
    <div className="rounded-lg text-card-foreground bg-green-100 border border-green-200 shadow-md p-4" data-v0-t="card">
      <div className="flex-col space-y-1.5 p-6 flex items-center space-x-2">
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
          className="h-6 w-6 text-green-500"
        >
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
          <line x1="9" x2="9" y1="3" y2="18"></line>
          <line x1="15" x2="15" y1="6" y2="21"></line>
        </svg>
        <div className="space-y-1">
          <h3 className="whitespace-nowrap text-center tracking-tight text-lg font-semibold text-green-800">{address}</h3>
          <p className="text-sm flex items-center space-x-2 text-green-600">
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
              className="h-4 w-4 text-green-500"
            >
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <path d="M9 17h6"></path>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
            <span className='text-left'>{message}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoveUpPassangerCard