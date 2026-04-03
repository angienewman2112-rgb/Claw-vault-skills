// app/page.tsx
import { createSupabaseServerClient } from './lib/supabase/server'

export default async function Home() {
  const supabase = createSupabaseServerClient()

  // Example: Fetch something from Supabase (remove or customize as needed)
  const { data: skills, error } = await supabase
    .from('skills') // change table name if yours is different
    .select('*')
    .limit(10)

  if (error) {
    console.error('Supabase error:', error)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Claw Vault Skills Marketplace</h1>
      
      <p className="mb-6">25 Elite Skills — Open Claw Skills Marketplace</p>

      {skills && skills.length > 0 ? (
        <div className="grid gap-6">
          {skills.map((skill: any) => (
            <div key={skill.id} className="border p-6 rounded-lg">
              <h2 className="text-2xl font-semibold">{skill.title || 'Untitled Skill'}</h2>
              <p className="mt-2 text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No skills loaded yet. Add data to your Supabase table.</p>
      )}

      {error && <p className="text-red-500 mt-4">Error loading skills: {error.message}</p>}
    </div>
  )
}
