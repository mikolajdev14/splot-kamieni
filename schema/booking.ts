import * as z from "zod";
export const bookingSchema = z.object({
  rugTypeId: z.string().min(1),
  customerName: z.string().min(2, "Podaj imię i nazwisko"),
  customerEmail: z.email("Nieprawidlowy email"),
  customerPhone: z.string().max(500).optional(),
  customerNotes: z.string().max(500).optional(),
  pickedSize: z.number().min(1).max(10),
  pickupDate: z.string().min(1, "Wybierz temin"),
});
