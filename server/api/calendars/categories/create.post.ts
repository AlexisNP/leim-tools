import { serverSupabaseClient } from "#supabase/server";
import { type Category, categorySchema } from "@@/models/Category";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: bodyData, error: bodyError } = await readValidatedBody(event, body => categorySchema.safeParse(body))

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
      .insert(
        {
          name: bodyData.category.name,
          color: bodyData.category.color,
          calendar_id: bodyData.calendarId
        } as never
      )
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
