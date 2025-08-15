import { type VariantProps, cva } from "class-variance-authority"

export { default as Avatar } from "@/components/ui/avatar/Avatar.vue"
export { default as AvatarImage } from "@/components/ui/avatar/AvatarImage.vue"
export { default as AvatarFallback } from "@/components/ui/avatar/AvatarFallback.vue"

export const avatarVariant = cva(
  "inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",
  {
    variants: {
      size: {
        sm: "size-6 text-xs",
        base: "size-14 text-2xl",
        lg: "size-24 text-5xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
