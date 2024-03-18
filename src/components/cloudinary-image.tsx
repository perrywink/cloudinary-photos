"use client"
import Heart from "@/components/icons/heart"
import { CldImage, CldImageProps } from "next-cloudinary"
import { favoriteAction } from "../app/gallery/actions";
import { useState, useTransition } from "react";
import { CloudinaryResult } from "@/types/cloudinary";

interface CloudinaryImageProps extends CldImageProps {
  image: CloudinaryResult
  handleUnheart?: (publicId: string) => void
}

export default function CloudinaryImage(props: CloudinaryImageProps) {
  const [isPending, startTransition] = useTransition();

  const isFavorited = props.image.tags.includes("favorite")
  const [favorited, setFavorited] = useState<boolean>(isFavorited)

  const handleCallback = () => {
    if (favorited) {
      props.handleUnheart && props.handleUnheart(props.image.public_id)
    }
  }

  return (
    <div className="relative">
      <Heart
        className={`absolute top-2 left-2 opacity-75 hover:text-rose-500 hover:opacity-100 ${favorited && "text-rose-500"} cursor-pointer`}
        onClick={() => {
          setFavorited(!favorited)
          handleCallback();
          startTransition(() => {
            favoriteAction(props.image.public_id, favorited)
          })
        }}
      />
      <CldImage
        {...props}
      />
    </div>
  )
}