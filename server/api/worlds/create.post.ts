import { serverSupabaseClient } from "#supabase/server";
// import type { Calendar} from "~/models/CalendarConfig";
import type { World } from "~/models/World";
import { postWorldSchema } from "~/models/World";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: bodyData, error: schemaError } = await readValidatedBody(event, body => postWorldSchema.safeParse(body))

  if (schemaError) {
    console.log(schemaError)
    throw createError({
      cause: "Utilisateur",
      fatal: false,
      message: "Le schéma de la requête n'est pas complet ou mal renseigné.",
      status: 401,
    })
  }

  try {
    const { data, error } = await client
      .from("worlds")
      .insert(
        {
          name: bodyData.name,
          description: bodyData.description,
          color: bodyData.color,
          gm_id: bodyData.gmId,
        } as never
      )
      .select(`
        id,
        name,
        description,
        color,
        gmId:gm_id
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
