import HotelOperations from "./HotelOperations";
import HotelTable from "./HotelTable";

interface HotelDashboardProps {
  filter: string;
}

export default function HotelDashboard({ filter }: HotelDashboardProps) {
  return (
    <div>
      <HotelOperations />
      <HotelTable filter={filter} />
    </div>
  );
}
