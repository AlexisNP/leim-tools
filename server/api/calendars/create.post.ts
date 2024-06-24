import { serverSupabaseClient } from "#supabase/server";
// import type { Calendar} from "~/models/CalendarConfig";
import { postCalendarSchema } from "~/models/CalendarConfig";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: bodyData, error: schemaError } = await readValidatedBody(event, body => postCalendarSchema.safeParse(body))

  if (schemaError) {
    console.log(bodyData)
    console.log(schemaError)
    throw createError({
      cause: 'Utilisateur',
      fatal: false,
      message: "Le schéma de la requête n'est pas complet ou mal renseigné.",
      status: 401,
    })
  }

  let calendarObject: any

  // First insert the calendar
  try {
    const { data, error } = await client
      .from('calendars')
      .insert(
        {
          name: bodyData.name,
          today: bodyData.today,
          color: bodyData.color,
          world_id: bodyData.worldId
        } as never
      )
      .select(`id`)
      .single()
    console.log(data)

    if (error) throw error
  } catch (err) {
    console.log(err)
  }
})
