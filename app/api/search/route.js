import { client } from '../../../lib/sanity'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  if (!q.trim()) return Response.json([])

  const results = await client.fetch(`
    *[_type == "article" && (
      title match $q ||
      excerpt match $q
    )] | order(publishedAt desc) [0...8] {
      _id, title, slug, category, excerpt, publishedAt
    }
  `, { q: `*${q}*` })

  return Response.json(results)
}
