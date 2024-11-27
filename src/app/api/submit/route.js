import db from '@/lib/db'

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Insert the data into SQLite database
    const stmt = db.prepare(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)'
    )
    
    const result = stmt.run(data.name, data.email, data.message)

    if (result.changes > 0) {
      return new Response(JSON.stringify({ message: 'Form submitted successfully' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      throw new Error('Failed to insert data')
    }
  } catch (error) {
    console.error('Error processing form submission:', error)
    return new Response(JSON.stringify({ message: 'Error processing form submission' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 