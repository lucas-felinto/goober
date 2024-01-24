import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Person } from '../components/UserCard';
import { Driver } from '~/interfaces/types';

const useDriver = () => {
  const [selectedDriver, setSelectedDriver] = useState<Person>();

  const fetchDrivers = useCallback(
    () => fetch('api/drivers').then((res) => res.json()),
    []
  );

  const { data: drivers } = useQuery({
    queryKey: ['riders'],
    queryFn: fetchDrivers,
  });

  useEffect(() => {
    if (drivers && drivers.length > 0 && !selectedDriver) {
      setSelectedDriver(drivers[0]);
    }
  }, [drivers, selectedDriver]);

  return { drivers, selectedDriver, setSelectedDriver };
};

export default useDriver;
