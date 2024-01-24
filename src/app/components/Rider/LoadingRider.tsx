export default function LoadingRider() {
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-lg space-y-4">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div className="w-12 bg-gray-300 h-12 rounded-full " />
        <div className="flex flex-col space-y-3">
          <div className="w-36 bg-gray-300 h-6 rounded-md " />
        </div>
      </div>
    </div>
  )
}