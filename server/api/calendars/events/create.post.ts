import { serverSupabaseClient } from "#supabase/server";
import type { CalendarEvent } from "@/models/CalendarEvent";
import { postEventBodySchema } from "@/models/CalendarEvent";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: bodyData, error: schemaError } = await readValidatedBody(event, body => postEventBodySchema.safeParse(body))

  if (schemaError) {
    const error = createError({
      cause: "Utilisateur",
      fatal: false,
      statusCode: 401,
      statusMessage: "Validation Error",
      message: "Erreur de validation du schéma, probablement dûe à une erreur utilisateur.",
      data: {
        errors: schemaError.issues.map(issue => ({
          path: issue.path,
          message: issue.message,
          code: issue.code
        }))
      }
    })

    throw error
  }

  try {
    const { data, error } = await client
      .from("calendar_events")
      .insert(
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
    throw createError({
      cause: "Serveur",
      status: 500,
      fatal: false,
      message: "Une erreur inconnue est survenue."
    })
  }
})
