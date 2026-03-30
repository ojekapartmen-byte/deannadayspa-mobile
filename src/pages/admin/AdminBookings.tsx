import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AdminBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Booking[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      toast.success("Status diupdate!");
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Kelola Bookings</h1>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-3">
          {bookings?.map((b) => (
            <Card key={b.id}>
              <CardContent className="py-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{b.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{b.customer_phone}</p>
                  </div>
                  <Badge className={statusColors[b.status] ?? "bg-muted"}>{b.status}</Badge>
                </div>
                <div className="text-sm">
                  <p>{b.service_title} — {b.option_name}</p>
                  <p className="text-muted-foreground">{b.price}</p>
                  {b.booking_date && <p className="text-xs text-muted-foreground">{b.booking_date} {b.booking_time}</p>}
                  {b.notes && <p className="text-xs italic text-muted-foreground mt-1">{b.notes}</p>}
                </div>
                <Select value={b.status} onValueChange={(v) => updateStatus.mutate({ id: b.id, status: v })}>
                  <SelectTrigger className="w-40 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
          {bookings?.length === 0 && <p className="text-center text-muted-foreground py-10">Belum ada booking.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
