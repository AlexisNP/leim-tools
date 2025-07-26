import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod"
import type { Calendar } from "~/models/CalendarConfig";

const querySchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  shortId: z.string().optional(),
  full: z.coerce.boolean().optional()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const partialFields = `
    id,
    shortId:short_id,
    name,
    today,
    months:calendar_months (*),
    state,
    color,
    createdAt:created_at,
    updatedAt:updated_at,
    eventNb:calendar_events(count),
    world:worlds (
      id,
      name,
      gmId:gm_id
    )
  `

  const fullFields = `
    id,
    shortId:short_id,
    name,
    today,
    months:calendar_months (*),
    state,
    color,
    createdAt:created_at,
    updatedAt:updated_at,
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
    categories:calendar_event_categories (
      id,
      name,
      color
    ),
    eventNb:calendar_events(count),
    world:worlds (
      id,
      name,
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

  return output.overrideTypes<Calendar[]>()
})
