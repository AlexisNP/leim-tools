import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod"
import type { CalendarEvent } from "~/models/CalendarEvent";

const querySchema = z.object({
  calendarId: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const output = client
    .from("calendar_events")
    .select(`
      id,
      title,
      description,
      location,
      startDate:start_date,
      endDate:end_date,
      wiki,
      category:calendar_event_categories!calendar_events_category_fkey (*),
      secondaryCategories:calendar_event_categories!calendar_event_categories_links (*)
    `)

  if (query.calendarId) {
    output.eq("calendar_id", query.calendarId)
  }

  return output.returns<CalendarEvent[]>()
})
