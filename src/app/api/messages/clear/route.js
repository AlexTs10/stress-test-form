import db from '@/lib/db'

export async function DELETE() {
  try {
    const stmt = db.prepare('DELETE FROM messages')
    const result = stmt.run()

    return new Response(JSON.stringify({ 
      message: 'All messages deleted successfully',
      count: result.changes 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error deleting messages:', error)
    return new Response(JSON.stringify({ message: 'Error deleting messages' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 