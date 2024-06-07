import { serverSupabaseClient } from "#supabase/server";
import { z } from 'zod'
import type { Calendar } from "~/models/CalendarConfig";

const querySchema = z.object({
  world_id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const output = client
    .from('calendars')
    .select(`
      id,
      name,
      today,
      months:calendar_months (*),
      events:calendar_events (
        id,
        title,
        description,
        location,
        hidden,
        startDate:start_date,
        endDate:end_date,
        wiki,
        category:calendar_event_categories!calendar_events_category_fkey (*),
        secondaryCategories:calendar_event_categories!calendar_event_categories_links (*)
      )
    `)
    .eq('world_id', query.world_id)
    .limit(1)
    .single<Calendar>()

  return output
})
