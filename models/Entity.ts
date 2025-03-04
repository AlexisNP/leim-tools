export const contentStates = ["published", "draft", "archived"] as const
export type ContentState = typeof contentStates[number]
