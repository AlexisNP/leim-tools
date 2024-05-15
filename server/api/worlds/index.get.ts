import { serverSupabaseClient } from "#supabase/server";
import type { World } from "~/models/World";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  return client.from('worlds')
    .select(`id, name, description, color`)
    .returns<World[]>()
})
