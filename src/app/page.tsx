"use client"

import Image from "next/image";
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { CldImage } from 'next-cloudinary';
import { useState } from "react";

export default function Home() {
  const [imageID, setImageID] = useState("")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CldUploadButton
        uploadPreset="rwap8wb6"
        onSuccess={(result) => {
          console.log(result)
          if (result.info && typeof result.info !== 'string') {
            setImageID(result.info.public_id);
          }
        }}
      />
      {
        imageID &&
        <CldImage
          width="960"
          height="600"
          src={imageID}
          sizes="100vw"
          alt="Description of my image"
        />
      }
    </main>
  );
}
