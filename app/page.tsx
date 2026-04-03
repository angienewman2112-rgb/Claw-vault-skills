import SkillCard from '@/components/SkillCard';
import { createClient } from '@/lib/supabase/server';
import { Suspense } from 'react';

async function SkillsData() {
  const supabase = await createClient();
  
  const { data: skills, error } = await supabase
    .from('skills')
    .select('*')
    .order('price', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return <div className="text-red-400 text-center py-12">Error loading skills. Please try again later.</div>;
  }

  if (!skills || skills.length === 0) {
    return <div className="text-zinc-500 text-center py-12">No skills found yet. Add them in Supabase Table Editor.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.map((skill: any) => (
        <SkillCard
          key={skill.id}
          id={skill.id}
          name={skill.name}
          description={skill.description}
          price={skill.price}
          stripePriceId={skill.stripe_price_id}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-8 inline-flex items-center gap-3 bg-zinc-950 border border-zinc-800 px-8 py-3 rounded-full">
            <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse"></div>
            <span className="text-violet-400 text-sm tracking-[4px] font-mono">ELITE ACCESS ONLY</span>
          </div>

          <h1 className="text-[88px] md:text-[110px] font-black tracking-[-4px] leading-none mb-8">
            CLAW<br />VAULT
          </h1>

          <p className="text-4xl md:text-5xl text-zinc-400 font-light mb-16 max-w-4xl mx-auto">
            25 elite Open Claw skills.<br />
            For serious operators who demand results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a href="#skills" className="inline-block bg-white hover:bg-violet-600 text-black hover:text-white px-16 py-7 rounded-2xl text-2xl font-semibold transition-all duration-300">
              ENTER THE VAULT
            </a>
            <a href="#pricing" className="inline-block border-2 border-zinc-700 hover:border-white px-16 py-7 rounded-2xl text-2xl font-semibold transition-all duration-300">
              VIEW PRICING
            </a>
          </div>

          <p className="text-xs tracking-widest text-zinc-500">ONE-TIME PURCHASE • INSTANT DELIVERY • LIFETIME VALUE</p>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills" className="py-28 px-6 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold mb-6">25 Weapons.<br />Zero Excuses.</h2>
            <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
              Battle-tested AI automations built for operators who execute at the highest level.
            </p>
          </div>

          <Suspense fallback={
            <div className="text-center py-24 text-zinc-500">Loading your premium skills...</div>
          }>
            <SkillsData />
          </Suspense>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-zinc-950 py-24 text-center border-t border-zinc-900">
        <p className="text-4xl font-light mb-10">Stop playing small.<br />Claim what belongs to you.</p>
        <a href="#skills" className="inline-block bg-white text-black px-20 py-7 rounded-2xl text-3xl font-bold hover:bg-violet-600 hover:text-white transition-all">
          OPEN THE VAULT
        </a>
      </div>
    </div>
  );
}
