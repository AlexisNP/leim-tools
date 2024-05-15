import { serverSupabaseClient } from "#supabase/server";
import { z } from 'zod'

const querySchema = z.object({
  world_id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const output = client
    .from('world_calendars')
    .select(`
      id,
      months,
      days_per_year,
      events (*)
    `)
    .eq('world_id', query.world_id)

  return output
})
