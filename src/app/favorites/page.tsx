import cloudinary from 'cloudinary';
import FavoritesList from './favorites-list';

export interface CloudinaryResult {
  public_id: string
  tags: string[]
}

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image AND tags=favorite')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: CloudinaryResult[] }

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
      <FavoritesList results={results}/>
    </section>
  )
}