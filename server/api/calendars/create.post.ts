import { serverSupabaseClient } from "#supabase/server";
// import type { Calendar} from "~/models/CalendarConfig";
import type { Calendar} from "~/models/CalendarConfig";
import { postCalendarSchema } from "~/models/CalendarConfig";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: bodyData, error: schemaError } = await readValidatedBody(event, body => postCalendarSchema.safeParse(body))

  if (schemaError) {
    console.log(schemaError)
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "Le schéma de la requête n'est pas complet ou mal renseigné.",
      status: 401,
    })
  }

  // Store calendarId for rollback / links
  let calendarId: number | null = null

  // First insert the calendar
  try {
    const { data, error } = await client
      .from("calendars")
      .insert(
        {
          name: bodyData.name,
          today: bodyData.today,
          color: bodyData.color,
          world_id: bodyData.worldId
        } as never
      )
      .select("id")
      .single()

    if (data?.id) {
      calendarId = data.id
    }

    if (error) throw error
  } catch (err) {
    console.log(err)
    throw createError({
      cause: "Serveur",
      fatal: false,
      message: "Une erreur inconnue s'est produite pendant la création du calendrier.",
      status: 500,
    })
  }

  // Setup months data
  for (let i = 0; i < bodyData.months.length; i++) {
    bodyData.months[i].calendar_id = calendarId
    bodyData.months[i].position = i
  }

  // Bulk insert the months
  try {
    const { error } = await client
      .from("calendar_months")
      .insert(bodyData.months as never)

    if (error) throw error
  } catch (err) {
    // If we found an error, rollback the calendar
    if (calendarId) {
      await client
        .from("calendars")
        .delete()
        .eq("id", calendarId)
        .single()
    }

    throw createError({
      cause: "Serveur",
      fatal: false,
      message: "Une erreur inconnue s'est produite pendant la création des mois du calendrier.",
      status: 500,
    })
  }

  if (calendarId) {
    try {
      return client
        .from("calendars")
        .select("*")
        .eq("id", calendarId)
        .limit(1)
        .single<Calendar>()
    } catch (err) {
      throw createError({
        cause: "Serveur",
        fatal: false,
        message: "Impossible de récupérer les données du calendrier créé.",
        status: 500,
      })
    }
  }
})
