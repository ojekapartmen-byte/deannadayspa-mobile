import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, CalendarCheck, Star, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { data: servicesCount } = useQuery({
    queryKey: ["admin-services-count"],
    queryFn: async () => {
      const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: bookingsCount } = useQuery({
    queryKey: ["admin-bookings-count"],
    queryFn: async () => {
      const { count } = await supabase.from("bookings").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: premiumCount } = useQuery({
    queryKey: ["admin-premium-count"],
    queryFn: async () => {
      const { count } = await supabase.from("premium_services").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: contentCount } = useQuery({
    queryKey: ["admin-content-count"],
    queryFn: async () => {
      const { count } = await supabase.from("site_content").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Services", value: servicesCount ?? 0, icon: Scissors, color: "text-primary" },
    { label: "Bookings", value: bookingsCount ?? 0, icon: CalendarCheck, color: "text-accent" },
    { label: "Premium", value: premiumCount ?? 0, icon: Star, color: "text-yellow-500" },
    { label: "Konten", value: contentCount ?? 0, icon: FileText, color: "text-blue-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
