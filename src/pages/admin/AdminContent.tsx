import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import type { Tables } from "@/integrations/supabase/types";

type SiteContent = Tables<"site_content">;

const AdminContent = () => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data: contents, isLoading } = useQuery({
    queryKey: ["admin-content"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_content").select("*").order("key");
      if (error) throw error;
      return data as SiteContent[];
    },
  });

  useEffect(() => {
    if (contents) {
      const map: Record<string, string> = {};
      contents.forEach((c) => { map[c.key] = c.value; });
      setValues(map);
    }
  }, [contents]);

  const saveMutation = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase.from("site_content").update({ value: values[key] }).eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast.success("Konten disimpan!");
    },
    onError: (e) => toast.error(e.message),
  });

  const labelMap: Record<string, string> = {
    hero_title: "Judul Hero",
    hero_subtitle: "Subtitle Hero",
    hero_description: "Deskripsi Hero",
    hero_image: "URL Gambar Hero",
    wa_number: "Nomor WhatsApp",
    contact_address: "Alamat",
    contact_email: "Email",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Kelola Konten</h1>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-4">
          {contents?.map((c) => (
            <Card key={c.id}>
              <CardContent className="py-3 space-y-2">
                <Label className="text-xs text-muted-foreground">{labelMap[c.key] ?? c.key}</Label>
                <div className="flex gap-2">
                  <Input
                    value={values[c.key] ?? ""}
                    onChange={(e) => setValues({ ...values, [c.key]: e.target.value })}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => saveMutation.mutate(c.key)}
                    disabled={saveMutation.isPending}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContent;
