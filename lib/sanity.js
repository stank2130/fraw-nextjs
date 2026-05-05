import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

export async function getFeaturedArticle() {
  return client.fetch(`
    *[_type == "article" && featured == true] | order(publishedAt desc) [0] {
      _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
    }
  `)
}

export async function getLatestArticles(limit = 6) {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
    }
  `, { limit })
}

export async function getArticleBySlug(slug) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, category, excerpt, body, coverImage, author, publishedAt, readTime
    }
  `, { slug })
}

export async function getAllArticleSlugs() {
  return client.fetch(`*[_type == "article"]{ "slug": slug.current }`)
}

export async function getUpcomingReleases(limit = 8) {
  return client.fetch(`
    *[_type == "release"] | order(releaseDate asc) [0...$limit] {
      _id, name, brand, image, releaseDate, price, colorway, hot, where, notes
    }
  `, { limit })
}