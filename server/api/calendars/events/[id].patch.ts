import { z } from 'zod'
import { serverSupabaseClient } from "#supabase/server"
import { postEventBodySchema, type CalendarEvent } from "~/models/CalendarEvent"

const paramsSchema = z.object({
  id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: params, error: paramsError} = await getValidatedRouterParams(event, paramsSchema.safeParse)
  const { data: bodyData, error: bodyError } = await readValidatedBody(event, body => postEventBodySchema.safeParse(body))

  if (paramsError) {
    throw createError({
      cause: 'Utilisateur',
      fatal: false,
      message: "L'identifiant de l'évènement est manquant ou mal renseigné.",
      status: 401,
    })
  }

  if (bodyError) {
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
      .update(
        {
          start_date: bodyData?.event.startDate,
          end_date: bodyData.event.endDate,
          title: bodyData?.event.title,
          description: bodyData.event.description,
          location: bodyData.event.location,
          hidden: bodyData.event.hidden,
          category: bodyData.event.category?.id,
          calendar_id: bodyData?.calendarId
        } as never
      )
      .eq('id', params.id)
      .select(`
        id,
        title,
        description,
        location,
        hidden,
        startDate:start_date,
        endDate:end_date,
        wiki,
        category:calendar_event_categories!calendar_events_category_fkey (*),
        secondaryCategories:calendar_event_categories!calendar_event_categories_links (*)
      `)
      .single<CalendarEvent>()

    if (error) throw error

    return data
  } catch (err) {
    console.log(err)
    throw createError({
      cause: 'Serveur',
      status: 500,
      fatal: false,
      message: 'Une erreur inconnue est survenue.'
    })
  }
})
