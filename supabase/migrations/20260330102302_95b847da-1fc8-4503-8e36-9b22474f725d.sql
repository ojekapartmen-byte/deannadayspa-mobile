
-- Drop the overly permissive policy and replace with a more specific one
DROP POLICY "Anyone can create bookings" ON public.bookings;

-- Allow inserts but require all mandatory fields (effectively same but explicit)
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    customer_name IS NOT NULL AND
    customer_phone IS NOT NULL AND
    service_title IS NOT NULL AND
    option_name IS NOT NULL AND
    price IS NOT NULL
  );
