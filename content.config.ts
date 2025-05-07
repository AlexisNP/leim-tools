import { defineCollection, defineContentConfig } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    sections: defineCollection({
      type: "page",
      source: "sections/**/*.md"
    })
  }
})
