import { CldImage } from "next-cloudinary";
import UploadButton from "./upload-button";
import cloudinary from 'cloudinary';
import CloudinaryImage from "./cloudinary-image";

export interface CloudinaryResult {
  public_id: string
}

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at', 'desc')
    .max_results(30)
    .execute()) as { resources: CloudinaryResult[] }

  const MAX_COLS = 4
  const getResultCols = (colIndex: number) => (
    results.resources.filter((_, idx) => {
      return idx % MAX_COLS === colIndex
    })
  )

  return (
    <section className="flex flex-col gap-4">
      <div className="w-100 px-2 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Gallery
          </h2>
          <p className="text-sm text-muted-foreground">
            All your photos in one place.
          </p>
        </div>
        <UploadButton />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {
          [getResultCols(0), getResultCols(1), getResultCols(2), getResultCols(3)]
            .map((col, idx) => (
              <div className="flex flex-col gap-4" key={idx}>
                {col.map((image) => (
                  <CloudinaryImage
                    src={image.public_id}
                    key={image.public_id}
                    width="500"
                    height="300"
                    sizes="100vw"
                    alt="Description of my image"
                  />
                ))}
              </div>
            ))
        }
      </div>
    </section>
  )
}