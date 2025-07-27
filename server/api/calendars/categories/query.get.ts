import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod"
import type { Category } from "@@/models/Category";

const querySchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  calendarId: z.coerce.number().positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=7200")

  const output = client
    .from("calendar_event_categories")
    .select(`
      id,
      name,
      color
    `)

  if (query.id) {
    return output.eq("id", query.id).limit(1).single<Category>()
  }

  if (query.calendarId) {
    output.eq("calendar_id", query.calendarId)
  }

  return output.overrideTypes<Category[]>()
})
