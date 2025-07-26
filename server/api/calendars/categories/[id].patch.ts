import { z } from "zod"
import { serverSupabaseClient } from "#supabase/server"
import type { Category} from "~/models/Category";
import { categorySchema } from "~/models/Category"

const paramsSchema = z.object({
  id: z.coerce.number().positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: params, error: paramsError} = await getValidatedRouterParams(event, paramsSchema.safeParse)
  const { data: bodyData, error: bodyError } = await readValidatedBody(event, body => categorySchema.safeParse(body))

  if (paramsError) {
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "L'identifiant de la catégorie est manquant ou mal renseigné.",
      status: 401,
    })
  }

  if (bodyError) {
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
      .from("calendar_event_categories")
      .update(
        {
          name: bodyData.category.name,
          color: bodyData.category.color,
          calendar_id: bodyData.calendarId
        } as never
      )
      .eq("id", params.id)
      .select(`
        id,
        name,
        color
      `)
      .single<Category>()

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
