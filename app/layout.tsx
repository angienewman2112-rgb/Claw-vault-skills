import './globals.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import PostHogProvider from '@/components/PostHogProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">
        <PostHogProvider>
          <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold tracking-tighter">Claw Vault Skills</span>
              </div>
              <div className="flex items-center gap-8 text-sm font-medium">
                <a href="/skills" className="hover:text-violet-400 transition">Skills Marketplace</a>
                <a href="/pricing" className="hover:text-violet-400 transition">Pricing & Bundles</a>
                <a href="/admin" className="hover:text-violet-400 transition">Admin Dashboard</a>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-zinc-900 py-12 text-center text-sm text-zinc-500 border-t border-zinc-800">
            © 2026 Claw Vault Skills LLC. All Rights Reserved. 
            <a href="https://clawvaultskills.com/privacy" className="mx-3 hover:text-white">Privacy Policy</a> 
            <a href="https://clawvaultskills.com/terms" className="hover:text-white">Terms of Service</a>
          </footer>
        </PostHogProvider>
      </body>
    </html>
  );
}
