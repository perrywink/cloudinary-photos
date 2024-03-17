"use client"
import CloudinaryImage from "@/components/cloudinary-image"
import { CloudinaryResult } from "./page"
import { useEffect, useState } from "react"
import { fetchFavoritesAction } from "./actions"

interface FavoritesListProps {
  results: {
    resources: CloudinaryResult[]
  }
}

export default function FavoritesList() {
  const [resources, setResources] = useState<CloudinaryResult[]>([])

  useEffect(() => {
    const handleFavFetch = async () => {
      const res = await fetchFavoritesAction()
      setResources(res)
    }
    handleFavFetch();
  }, [])

  const MAX_COLS = 4
  const getResultCols = (colIndex: number) => (
    resources.filter((_, idx) => {
      return idx % MAX_COLS === colIndex
    })
  )

  const handleUnheart = (publicId: string) => {
    setResources((currResources) => 
      currResources.filter(resource => {
        return resource.public_id !== publicId
      })
    )
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {
        Array.from({length: 4}, (_, i) => getResultCols(i))
          .map((col, idx) => (
            <div className="flex flex-col gap-4" key={idx}>
              {col.map((image) => (
                <CloudinaryImage
                  src={image.public_id}
                  key={image.public_id}
                  image={image}
                  width="500"
                  height="300"
                  sizes="100vw"
                  alt="Description of my image"
                  handleUnheart={handleUnheart}
                />
              ))}
            </div>
          ))
      }
    </div>
  );
}