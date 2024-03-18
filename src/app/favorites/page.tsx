import cloudinary from 'cloudinary';
import FavoritesList from './favorites-list';
import { CloudinaryResult } from "@/types/cloudinary";
import { unstable_noStore as noStore } from 'next/cache';
import { Suspense } from 'react';

async function Favorites(){
  noStore()
  const results = (await cloudinary.v2.search
    .expression('resource_type:image AND tags=favorite')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: CloudinaryResult[] }

  return (
    <FavoritesList results={results}/>
  )
}

export default function FavoritesPage() {
  // const results = (await cloudinary.v2.search
  //   .expression('resource_type:image AND tags=favorite')
  //   .sort_by('created_at', 'desc')
  //   .with_field('tags')
  //   .max_results(30)
  //   .execute()) as { resources: CloudinaryResult[] }

  return (
    <section className="flex flex-col gap-4">
      <div className="w-100 px-2 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your Favorites
          </h2>
          <p className="text-sm text-muted-foreground">
            Your curated collection.
          </p>
        </div>
      </div>
      <Suspense fallback={null}>
        <Favorites />
      </Suspense>
    </section>
  )
}