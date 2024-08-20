import { serverSupabaseClient } from "#supabase/server";
import { z } from 'zod'
import type { Calendar } from "~/models/CalendarConfig";

const querySchema = z.object({
  id: z.number({ coerce: true }).positive().int().optional(),
  full: z.boolean({ coerce: true }).optional()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const partialFields = `
    id,
    name,
    today,
    months:calendar_months (*)
  `

  const fullFields = `
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
  `

  let output

  if (query.full) {
    output = client.from('calendars').select(fullFields)
  } else {
    output = client.from('calendars').select(partialFields)
  }

  if (query.id) {
    return output.eq('id', query.id).single<Calendar>()
  }

  return output.returns<Calendar[]>()
})
