import { client } from '../../../lib/sanity'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 9
  const start = (page - 1) * limit

  const results = await client.fetch(`
    *[_type == "article"] | order(publishedAt desc) [$start...$end] {
      _id, title, slug, category, excerpt, coverImage, publishedAt, readTime
    }
  `, { start, end: start + limit })

  const total = await client.fetch(`count(*[_type == "article"])`)

  return Response.json({ articles: results, total, hasMore: start + limit < total })
}
