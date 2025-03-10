import { z } from "zod"
import { serverSupabaseClient } from "#supabase/server"
import type { Calendar} from "~/models/CalendarConfig";
import { postCalendarSchema } from "~/models/CalendarConfig"

const paramsSchema = z.object({
  id: z.number({ coerce: true }).positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: params, error: paramsError} = await getValidatedRouterParams(event, paramsSchema.safeParse)
  const { data: bodyData, error: bodyError } = await readValidatedBody(event, body => postCalendarSchema.safeParse(body))

  if (paramsError) {
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "L'identifiant du calendrier est manquant ou mal renseigné.",
      status: 401,
    })
  }

  if (bodyError) {
    console.log(bodyData)
    console.log(bodyError)
    const error = createError({
      cause: "Utilisateur",
      fatal: false,
      statusCode: 401,
      statusMessage: "Validation Error",
      message: "Erreur de validation du schéma, probablement dûe à une erreur utilisateur.",
      data: {
        errors: bodyError.issues.map(issue => ({
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
      .from("calendars")
      .update(
        {
          name: bodyData.name,
          world_id: bodyData.worldId,
          today: bodyData.today,
          state: bodyData.state,
          color: bodyData.color,
        } as never
      )
      .eq("id", params.id)
      .select(`
        id,
        name,
        color,
        state,
        createdAt:created_at,
        updatedAt:updated_at
      `)
      .single<Calendar>()

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
