import { z } from 'zod'
import { serverSupabaseClient } from "#supabase/server"
import type { CalendarEvent } from "~/models/CalendarEvent"

const paramsSchema = z.object({
  id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: params, error: paramsError} = await getValidatedRouterParams(event, paramsSchema.safeParse)

  if (paramsError) {
    throw createError({
      cause: 'Utilisateur',
      fatal: false,
      message: "L'identifiant de l'évènement est manquant ou mal renseigné.",
      status: 401,
    })
  }

  try {
    const { data, error } = await client
      .from('calendar_events')
      .delete()
      .eq('id', params.id)
      .single<CalendarEvent>()

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
