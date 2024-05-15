import { serverSupabaseClient } from "#supabase/server";
import type { Character } from "~/models/Characters";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  return client.from('characters')
    .select(`
      id,
      name,
      description,
      birth,
      death,
      wiki,
      characters_category (id, name)
    `)
    .returns<Character[]>()
})
