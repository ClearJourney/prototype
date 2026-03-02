import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full min-w-0 flex-1 gap-0">
      <SettingsSidebar />
      <div className="min-h-full min-w-0 flex-1 bg-sand px-8 pb-8 pt-2">
        {children}
      </div>
    </div>
  );
}
