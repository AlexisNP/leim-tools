import { serverSupabaseClient } from "#supabase/server";
import type { Category } from "~/models/Category";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const output = client
    .from('calendar_event_categories')
    .select(`
      id,
      name
    `)

  return output.returns<Category[]>()
})
