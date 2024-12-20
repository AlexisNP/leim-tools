import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod"
import type { Calendar } from "~/models/CalendarConfig";

const querySchema = z.object({
  id: z.number({ coerce: true }).positive().int().optional(),
  shortId: z.string().optional(),
  full: z.boolean({ coerce: true }).optional()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=7200")

  const partialFields = `
    id,
    shortId:short_id,
    name,
    today,
    months:calendar_months (*),
    state,
    eventNb:calendar_events(count)
  `

  const fullFields = `
    id,
    shortId:short_id,
    name,
    today,
    months:calendar_months (*),
    state,
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
    ),
    eventNb:calendar_events(count),
    world:worlds (
      id,
      gmId:gm_id
    )
  `

  let output

  if (query.full) {
    output = client.from("calendars").select(fullFields)
  } else {
    output = client.from("calendars").select(partialFields)
  }

  if (query.shortId) {
    return output.eq("short_id", query.shortId).limit(1).single<Calendar>()
  }

  if (query.id) {
    return output.eq("id", query.id).limit(1).single<Calendar>()
  }

  return output.returns<Calendar[]>()
})
