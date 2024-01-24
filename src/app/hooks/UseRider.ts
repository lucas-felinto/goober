import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Person } from '../components/UserCard';

const useRider = () => {
  const [selectedRider, setSelectedRider] = useState<Person>();

  const fetchRiders = useCallback(
    () => fetch('api/riders').then((res) => res.json()),
    []
  );

  const { data: riders } = useQuery({
    queryKey: ['riders'],
    queryFn: fetchRiders,
  });

  useEffect(() => {
    if (riders && riders.length > 0 && !selectedRider) {
      // setSelectedRider(riders[0]);
    }
  }, [riders, selectedRider]);

  return { riders, selectedRider, setSelectedRider };
};

export default useRider;
