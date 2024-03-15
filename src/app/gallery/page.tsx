"use client"
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";

export default function GalleryPage() {
  return (
    <div className="w-100 px-2 flex items-center justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Gallery
        </h2>
        <p className="text-sm text-muted-foreground">
          Curated and update daily.
        </p>
      </div>
      <CldUploadButton
        uploadPreset="rwap8wb6"
        // onSuccess={(result) => {
        //   if (result.info && typeof result.info !== 'string') {
        //     setImageID(result.info.public_id);
        //   }
        // }}
      >
        <Button asChild>
          <div className="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            Upload
          </div>
        </Button>
      </CldUploadButton>
    </div>
  )
}