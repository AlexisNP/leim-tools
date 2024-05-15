import { serverSupabaseClient } from "#supabase/server";
import { z } from 'zod'

const querySchema = z.object({
  world_id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const output = client
    .from('events')
    .select(`
      id,
      title,
      description,
      world_calendars (id, world_id)
    `)
    .eq('world_calendars.world_id', query.world_id)

  return output
})
