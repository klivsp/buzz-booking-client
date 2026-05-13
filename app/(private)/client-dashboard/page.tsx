import ClientDashboard from "@/components/client-dashboard/client-dashboard";
import { MOCK_USER, MOCK_PROPERTIES } from "@/lib/mock-data";

export default function DashboardPage() {
  
  return (
    <div className="container mx-auto py-10 px-4">
      <ClientDashboard 
        user={MOCK_USER} 
        properties={MOCK_PROPERTIES} 
      />
    </div>
  );
}