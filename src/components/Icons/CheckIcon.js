import { CheckmarkCircle } from 'react-ionicons';

export default function CheckIcon({ radius, color }) {
  return(
    <CheckmarkCircle
      color={color}
      height={radius}
      width={radius}
    />
  );
}
