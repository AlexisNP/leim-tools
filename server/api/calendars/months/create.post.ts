import { serverSupabaseClient } from "#supabase/server";
import { calendarMonthSchema, type CalendarMonth } from "~/models/CalendarMonth"

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: bodyData, error: schemaError } = await readValidatedBody(event, body => calendarMonthSchema.safeParse(body))

  if (schemaError) {
    console.log(schemaError)
    throw createError({
      cause: 'Utilisateur',
      fatal: false,
      message: "Le schéma de la requête n'est pas complet ou mal renseigné.",
      status: 401,
    })
  }

  try {
    const { data, error } = await client
      .from('calendar_months')
      .insert(
        {
          name: bodyData?.name,
          days: bodyData.days,
          position: bodyData?.position,
          calendar_id: bodyData.calendar_id,
        } as never
      )
      .select(`
        id,
        name,
        days,
        position,
        calendar_id
      `)
      .single<CalendarMonth>()

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
