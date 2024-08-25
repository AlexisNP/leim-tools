import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod"
import type { CalendarMonth } from "~/models/CalendarMonth";

const querySchema = z.object({
  calendarId: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const output = client
    .from("calendar_months")
    .select(`
      id,
      name,
      days,
      position,
      calendar_id
    `)

  if (query.calendarId) {
    output.eq("calendar_id", query.calendarId)
  }

  return output.returns<CalendarMonth[]>()
})
