import { z } from "zod";

export const LeadSchema = z.object({
  id: z.number().nullish(),
  assigne_id: z.number().nullish(),
  branch_id: z
    .number()
    .nullish()
    .refine((val) => val !== null, { message: "Branch is required" }),
  fullname: z.string().refine((val) => val !== "", {
    message: "Fullname is required",
  }),
  company_name: z.string().refine((val) => val !== "", {
    message: "Company Name is required",
  }),
  address: z.string().refine((val) => val !== "", {
    message: "Address is required",
  }),
  email: z.string().email(),
  phone_number: z
    .string()
    .min(11, { message: "Phone Number must be at least 11 characters" })
    .max(13, { message: "Phone Number must be at most 13 characters" })
    .regex(/^[0-9]+$/, { message: "Phone Number must be numeric" }),
  latitude: z.string().refine((val) => val !== "", {
    message: "Latitude is required",
  }),
  longitude: z.string().refine((val) => val !== "", {
    message: "Longitude is required",
  }),
  is_coverage: z.string(),
  status_id: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Status is required" }),
  probability_id: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Probability is required" }),
  type_id: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Type is required" }),
  channel_id: z
    .number()
    .nullable()
    .refine((val) => val !== null, { message: "Channel is required" }),
  media_id: z.number().nullish().optional().refine(val => val !== null, {
    message: "Media is required",
  }),
  source_id: z.number().nullish().optional().refine(val => val !== null, {
    message: "Source is required",
  }),
  notes: z.string().nullish(),
});