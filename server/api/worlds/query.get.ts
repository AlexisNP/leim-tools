import { z } from "zod"
import { serverSupabaseClient } from "#supabase/server";
import type { World } from "~/models/World";

const querySchema = z.object({
  id: z.coerce.number().positive().int().optional(),
  full: z.coerce.boolean().optional(),
  gmId: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const fullFields = `
    id,
    name,
    description,
    color,
    state,
    createdAt:created_at,
    updatedAt:updated_at,
    gmId:gm_id,
    calendars (
      id,
      name,
      color,
      today,
      state,
      months:calendar_months(*),
      createdAt:created_at,
      updatedAt:updated_at,
      eventNb:calendar_events(count)
    )
  `
  const partialFields = `
    id,
    name,
    description,
    color,
    state,
    createdAt:created_at,
    updatedAt:updated_at,
    calendars (
      createdAt:created_at,
      updatedAt:updated_at,
      months:calendar_months(*),
      eventNb:calendar_events(count)
    )
  `

  let output

  if (query.full) {
    output = client.from("worlds").select(fullFields)
  } else {
    output = client.from("worlds").select(partialFields)
  }

  if (query.id) {
    return output.eq("id", query.id).single<World>()
  }
  if (query.gmId) {
    return output.eq("gm_id", query.gmId).overrideTypes<World[]>()
  }

  return output.overrideTypes<World[]>()
})
