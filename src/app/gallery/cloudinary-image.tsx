"use client"
import { CldImage, CldImageProps } from "next-cloudinary"

interface CloudinaryImageProps extends CldImageProps {}

export default function CloudinaryImage(props: CloudinaryImageProps) {
  return (
    <CldImage
      {...props}
    />
  )
}