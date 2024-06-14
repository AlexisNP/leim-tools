import { z } from 'zod'
import { serverSupabaseClient } from "#supabase/server";
import type { World } from "~/models/World";

const querySchema = z.object({
  id: z.number({ coerce: true }).positive().int().optional(),
  full: z.boolean({ coerce: true }).optional()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const fullFields = `id, name, description, color, calendars (id, name, color, today)`
  const partialFields = `id, name, description, color`

  let output

  if (query.full) {
    output = client.from('worlds').select(fullFields)
  } else {
    output = client.from('worlds').select(partialFields)
  }

  if (query.id) {
    // const eventNb = await client.from('worlds').select('events:calendars(calendar_events(id))').order('events_count')

    return output.eq('id', query.id).single<World>()
  }

  return output.returns<World[]>()
})
