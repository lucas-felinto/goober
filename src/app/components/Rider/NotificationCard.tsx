import React, { Dispatch, SetStateAction } from 'react';

type NotificationCardType = {
  isVisible: boolean,
  onClose: Dispatch<SetStateAction<boolean>>
}

const NotificationCard = ({ isVisible, onClose }: NotificationCardType) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-6 md:w-1/3 rounded shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">Notice</h2>
        <p>Sorry, all drivers are busy at the moment, try again in a few minutes.</p>
        <button
          onClick={() => onClose(false)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
