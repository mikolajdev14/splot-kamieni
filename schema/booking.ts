import * as z from "zod";
export const bookingSchema = z.object({
  rugTypeId: z.string().min(1),
  customerName: z.string().min(2, "Podaj imię i nazwisko"),
  customerEmail: z.email("Nieprawidlowy email"),
  customerPhone: z.string().max(500).optional(),
  customerNotes: z.string().max(500).optional(),
  pickedSize: z.number().min(1).max(10),
  pickupDate: z.string().min(1, "Wybierz termin"),
  deliveryMethod: z.enum(["parcel_locker", "courier"], {
    error: "Wybierz metodę wysyłki",
  }),
  parcelLockerCode: z.string().max(100).optional(),
  deliveryAddress: z.string().max(500).optional(),
  referenceImagePath: z.string().max(300).optional(),
}).superRefine((booking, context) => {
  if (booking.deliveryMethod === "parcel_locker" && !booking.parcelLockerCode?.trim()) {
    context.addIssue({
      code: "custom",
      path: ["parcelLockerCode"],
      message: "Podaj kod paczkomatu InPost",
    });
  }

  if (booking.deliveryMethod === "courier" && !booking.deliveryAddress?.trim()) {
    context.addIssue({
      code: "custom",
      path: ["deliveryAddress"],
      message: "Podaj adres dostawy",
    });
  }
});
