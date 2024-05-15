import { serverSupabaseClient } from "#supabase/server";
import { z } from 'zod'

const querySchema = z.object({
  world_id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  const output = client
    .from('characters')
    .select(`
      id,
      name,
      description,
      birth,
      death,
      wiki,
      characters_category (id, name)
    `)

  if (query.world_id) {
    output.eq('world_id', query.world_id)
  }

  return output
})
