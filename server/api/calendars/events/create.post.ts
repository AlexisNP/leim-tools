import { serverSupabaseClient } from "#supabase/server";
import type { CalendarEvent } from "@/models/CalendarEvent";
import { postEventBodySchema } from "@/models/CalendarEvent";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: bodyData, error: schemaError } = await readValidatedBody(event, body => postEventBodySchema.safeParse(body))

  if (schemaError) {
    throw createError({
      cause: 'Utilisateur',
      fatal: false,
      message: "Le schéma de la requête n'est pas complet ou mal renseigné.",
      status: 401,
    })
  }

  try {
    const { data, error } = await client
      .from('calendar_events')
      .insert({ start_date: bodyData?.event.startDate, end_date: bodyData.event.endDate, title: bodyData?.event.title, description: bodyData.event.description, calendar_id: bodyData?.calendarId } as never)
      .select()
      .returns<CalendarEvent>()

    if (error) throw error

    return data
  } catch (err) {
    throw createError({
      cause: 'Serveur',
      status: 500,
      fatal: false,
      message: 'Une erreur inconnue est survenue.'
    })
  }
})
