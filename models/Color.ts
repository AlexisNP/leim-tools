import { z } from "zod"

export const rpgColors = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose", "black", "white"] as const

export type RPGColor = typeof rpgColors[number];

export const rpgColorSchema = z.enum(rpgColors)
