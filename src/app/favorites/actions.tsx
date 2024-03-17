"use server"
import cloudinary from 'cloudinary'
import { CloudinaryResult } from './page'

export async function fetchFavoritesAction() {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image AND tags=favorite')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: CloudinaryResult[] }
  return results.resources
}