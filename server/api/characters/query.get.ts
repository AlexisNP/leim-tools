import { z } from 'zod'
import { serverSupabaseClient } from "#supabase/server";
import type { Character } from "~/models/Characters";

const querySchema = z.object({
  worldId: z.number({ coerce: true }).positive().int()
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
      category:character_categories!characters_category_fkey (*),
      secondaryCategories:character_categories!character_categories_links (*)
    `)

  if (query.worldId) {
    output.eq('world_id', query.worldId)
  }

  return output.returns<Character[]>()
})
