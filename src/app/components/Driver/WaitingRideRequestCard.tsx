import React from 'react'
import { Person } from '../UserCard'

type WaitingRideRequestCardType = {
  driver: Person
}

const WaitingRideRequestCard: React.FC<WaitingRideRequestCardType> = (props) => {
  return (
    <div
      className="border bg-card bg-gradient-to-r from-blue-400 to-green-400 text-white p-6 rounded-lg shadow-lg"
      data-v0-t="card"
    >
      <div className="flex items-center space-x-4">
        <span className="flex h-10 w-10 shrink-0 rounded-full relative overflow-visible">
          <img className="flex h-full w-full items-center justify-center rounded-full bg-muted" src={props.driver.imageUrl} />
          <span className="absolute right-0 top-0 flex h-3 w-3 rounded-full bg-green-600"></span>
        </span>
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{props.driver.name}</h4>
          <p className="text-sm">Available for rides</p>
        </div>
      </div>
    </div>
  )
}

export default WaitingRideRequestCard