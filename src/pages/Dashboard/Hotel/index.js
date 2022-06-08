import { useEffect } from 'react';
import useHotel from '../../../hooks/api/useHotel';

export default function Hotel() {
  const { hotels } = useHotel();

  console.log(hotels);

  return 'Hotel: Em breve!';
}
