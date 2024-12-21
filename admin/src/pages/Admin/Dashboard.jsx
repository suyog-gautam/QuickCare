import { Stats } from "@/components/Stats";
import { AppointmentList } from "@/components/AppointmentList";
import { UseAdminContext } from "@/context/AdminContext";

function Dashboard() {
  const { aToken } = UseAdminContext();
  return (
    aToken && (
      <div className="container mx-auto p-6 space-y-6">
        <Stats />
        <AppointmentList />
      </div>
    )
  );
}

export default Dashboard;
