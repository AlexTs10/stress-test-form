import db from '@/lib/db'

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM messages ORDER BY created_at DESC')
    const messages = stmt.all()

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return new Response(JSON.stringify({ message: 'Error fetching messages' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 