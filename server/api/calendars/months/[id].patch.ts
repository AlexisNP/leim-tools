import { z } from "zod"
import { serverSupabaseClient } from "#supabase/server"
import { calendarMonthSchema, type CalendarMonth } from "~/models/CalendarMonth"

const paramsSchema = z.object({
  id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: params, error: paramsError} = await getValidatedRouterParams(event, paramsSchema.safeParse)
  const { data: bodyData, error: bodyError } = await readValidatedBody(event, body => calendarMonthSchema.safeParse(body))

  if (paramsError) {
    console.log(paramsError)
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "L'identifiant du mois est manquant ou mal renseigné.",
      status: 401,
    })
  }

  if (bodyError) {
    console.log(bodyData)
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "Le schéma de la requête n'est pas complet ou mal renseigné.",
      status: 401,
    })
  }

  try {
    const { data, error } = await client
      .from("calendar_months")
      .update(
        {
          name: bodyData?.name,
          days: bodyData.days,
          position: bodyData?.position,
          calendar_id: bodyData.calendar_id,
        } as never
      )
      .eq("id", params.id)
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
      cause: "Serveur",
      status: 500,
      fatal: false,
      message: "Une erreur inconnue est survenue."
    })
  }
})
