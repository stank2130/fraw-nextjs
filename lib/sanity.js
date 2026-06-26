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
export async function getFeaturedArticles() {
  return client.fetch(`
    *[_type == "article" && featured == true] | order(featuredOrder asc) [0...3] {
      _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
    }
  `)
}
export async function getArticleBySlug(slug) {
  return client.fetch(`
    *[_type == "article" && slug.current == $slug][0] {
      _id, title, slug, category, excerpt, body, coverImage, author, publishedAt, _updatedAt, readTime, youtubeUrls, instagramUrls, instagramReelUrls
    }
  `, { slug })
}
export async function getAllArticleSlugs() {
  return client.fetch(`*[_type == "article"]{ "slug": slug.current }`)
}
export async function getUpcomingReleases(limit = 8) {
  return client.fetch(`
    *[_type == "release"] | order(releaseDate desc) [0...$limit] {
      _id, name, brand, image, releaseDate, price, colorway, hot, where, notes, slug
    }
  `, { limit })
}
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteTitle,
      siteDescription,
      navLinks,
      categories,
      tickerItems,
      newsletterHeading,
      googleAdsenseId,
      heroArticles[]->{
        _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
      },
      sidebarAds[] {
        image,
        url,
        label
      }
    }
  `)
}
export async function getReleaseBySlug(slug) {
  return client.fetch(
    `*[_type == "release" && slug.current == $slug][0]{
      _id, name, brand, image, releaseDate,
      price, colorway, styleCode, where, hot, notes,
      slug
    }`,
    { slug }
  )
}
export async function getAllReleaseSlugs() {
  return client.fetch(`*[_type == "release" && defined(slug.current)]{ "slug": slug.current }`)
}
export async function getLatestArticles(limit = 9) {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) [0...$limit] {
      _id, title, slug, category, excerpt, coverImage, author, publishedAt, readTime
    }
  `, { limit })
}
export async function getRelatedArticles(category, excludeId) {
  return client.fetch(`
    *[_type == "article" && category == $category && _id != $excludeId] | order(publishedAt desc) [0...4] {
      _id, title, slug, category, coverImage, publishedAt
    }
  `, { category, excludeId })
}
export async function getArticleCount() {
  return client.fetch(`count(*[_type == "article"])`)
}
export async function getArticlesByCategory(category) {
  return client.fetch(`
    *[_type == "article" && category == $category] | order(publishedAt desc) {
      _id, title, slug, category, excerpt, coverImage, publishedAt, readTime
    }
  `, { category })
}
