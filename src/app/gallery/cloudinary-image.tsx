"use client"
import Heart from "@/components/icons/heart"
import { CldImage, CldImageProps } from "next-cloudinary"
import { favoriteAction } from "./actions";
import { useTransition } from "react";
import { CloudinaryResult } from "./page";

interface CloudinaryImageProps extends CldImageProps {
  image: CloudinaryResult
}

export default function CloudinaryImage(props: CloudinaryImageProps) {
  const [transition, startTransition] = useTransition();

  const isFavorited = props.image.tags.includes("favorite")

  return (
    <div className="relative">
      <Heart
        isFavorited={isFavorited}
        className="absolute top-2 left-2 text-zinc-200"
        onClick={() => {
          startTransition(() => {
            favoriteAction(props.image.public_id, isFavorited)
          })
        }}
      />
      <CldImage
        {...props}
      />
    </div>
  )
}