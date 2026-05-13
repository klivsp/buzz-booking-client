import SettingsView from "@/components/client-settings/settings-view";
import { UserProfile } from "@/types/room";

export default async function SettingsPage() {

  const mockUser: UserProfile = {
    id: "user-123",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
    preferences: {
      language: "English",
      notifications: true,
      currency: "EUR",
      travelType: "leisure",
      
    },
    
};
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <SettingsView user={mockUser} />
    </div>
  );
}