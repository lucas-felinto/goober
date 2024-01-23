// @ts-nocheck
import React, { Dispatch, MutableRefObject, RefObject, SetStateAction, useCallback } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { GeoLocation } from '~/interfaces/types';

type SearchBoxType = {
  placeholder: string;
  state: {
    location: string,
    setLocation: Dispatch<SetStateAction<string>>,
    ref: RefObject<google.maps.places.Autocomplete>,
    setCoordinates: Dispatch<SetStateAction<GeoLocation>>
  };
};

export default function AutoCompleteSearchBox({ placeholder, state }: SearchBoxType) {
  const { setLocation, setCoordinates, ref } = state;

  const onPlaceChanged = useCallback(() => {
    const autocomplete = ref.current;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        const formattedAddress = place.formatted_address || '';
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
      onLoad={(autocomplete) => {
        ref.current = autocomplete;
      }}
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
