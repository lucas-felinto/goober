import React, { Dispatch, RefObject, SetStateAction, useCallback, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { GeoLocation } from '~/interfaces/types';

type SearchBoxType = {
  placeholder: string;
  state: {
    location: string,
    setLocation: Dispatch<SetStateAction<string>>,
    setCoordinates: Dispatch<SetStateAction<GeoLocation>>
  };
};

const AutoCompleteSearchBox: React.FC<SearchBoxType> = ({ placeholder, state }) => {
  const { setLocation, setCoordinates } = state;
  const ref = useRef<google.maps.places.Autocomplete | null>(null);

  const setRef = (autocomplete: google.maps.places.Autocomplete) => {
    ref.current = autocomplete;
  };

  const onPlaceChanged = useCallback(() => {
    const autocomplete = ref.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        const formattedAddress = place.formatted_address ?? '';
        setLocation(formattedAddress);

        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCoordinates({ lat, lng });
        }
      }
    }
  }, [setLocation, setCoordinates, ref]);




  return (
    <Autocomplete
      onLoad={setRef}
      onPlaceChanged={onPlaceChanged}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={state.location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </Autocomplete>
  );
}

export default AutoCompleteSearchBox