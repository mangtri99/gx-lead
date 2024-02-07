import * as z from "zod";

export const LeadSettingSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(3).max(255),
  description: z.string().nullish(),
  // if media_id == null, then media_id is required
  media_id: z.number().nullish().optional().refine(val => val !== null, {
    message: "Media is required",
  }),
  // if source_id == null, then source_id is required
  channel_id: z.number().nullish().optional().refine(val => val !== null, {
    message: "Channel is required",
  }),
});
