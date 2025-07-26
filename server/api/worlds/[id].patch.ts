import { z } from "zod"
import { serverSupabaseClient } from "#supabase/server"
import { postWorldSchema, type World } from "~/models/World"

const paramsSchema = z.object({
  id: z.coerce.number().positive().int()
})

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: params, error: paramsError} = await getValidatedRouterParams(event, paramsSchema.safeParse)
  const { data: bodyData, error: bodyError } = await readValidatedBody(event, body => postWorldSchema.safeParse(body))

  if (paramsError) {
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "L'identifiant du monde est manquant ou mal renseigné.",
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
      .from("worlds")
      .update(
        {
          name: bodyData.name,
          description: bodyData.description,
          state: bodyData.state,
          gm_id: bodyData.gmId,
          color: bodyData.color
        } as never
      )
      .eq("id", params.id)
      .select(`
        id,
        name,
        description,
        color,
        createdAt:created_at,
        updatedAt:updated_at,
        gmId:gm_id,
        state
      `)
      .single<World>()

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
