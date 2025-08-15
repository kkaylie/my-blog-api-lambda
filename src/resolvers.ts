import 'dotenv/config'
import { getPool } from './databaseConfig'

const pool = getPool()
if (!pool) {
  throw new Error('Database connection pool is not initialized.')
}

export const resolvers = {
  Query: {
    // posts list
    posts: async () => {
      console.log('Resolving: Query.posts')
      try {
        const result = await pool.query(
          'SELECT id, title, slug, summary, cover, icon, published_date, is_pinned, tags FROM posts WHERE published_date IS NOT NULL ORDER BY is_pinned DESC, published_date DESC'
        )
        return result.rows
      } catch (error) {
        console.error('Error fetching posts list:', error)
        throw new Error('Failed to fetch posts.')
      }
    },
    // single post by slug
    post: async (_: any, { slug }: { slug: string }) => {
      console.log(`Resolving: Query.post with slug: ${slug}`)
      try {
        const result = await pool.query('SELECT * FROM posts WHERE slug = $1', [
          slug,
        ])
        if (result.rows.length === 0) {
          return null
        }
        return result.rows[0]
      } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error)
        throw new Error('Failed to fetch post.')
      }
    },
  },
}
