import { serverSupabaseClient } from "#supabase/server";
import { z } from "zod"
import type { Category } from "~/models/Category";

const querySchema = z.object({
  id: z.number({ coerce: true }).positive().int().optional(),
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const query = await getValidatedQuery(event, querySchema.parse)

  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=7200")

  const output = client
    .from("calendar_event_categories")
    .select(`
      id,
      name
    `)

  if (query.id) {
    return output.eq("id", query.id).limit(1).single<Category>()
  }

  return output.returns<Category[]>()
})
