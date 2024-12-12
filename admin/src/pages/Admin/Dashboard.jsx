import { Stats } from "@/components/Stats";
import { AppointmentList } from "@/components/AppointmentList";

function Dashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Stats />
      <AppointmentList />
    </div>
  );
}

export default Dashboard;
