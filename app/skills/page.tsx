import SkillCard from '@/components/SkillCard';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function SkillsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: skills } = await supabase
    .from('skills')
    .select('*')
    .order('price', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tighter">All 25 Premium OpenClaw Skills</h1>
        <p className="text-xl text-zinc-400 mt-4">Instant access • Lifetime updates • High-ticket automation tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills?.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
