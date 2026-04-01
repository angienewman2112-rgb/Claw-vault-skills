import type { Metadata } from 'next';
import './globals.css';
import PostHogProvider from '@/components/PostHogProvider';

export const metadata: Metadata = {
  title: 'Claw Vault Skills - 25 Elite Open Claw Skills Marketplace',
  description: 'Premium high-ticket AI-powered Open Claw skills for serious business owners. Instant access after purchase.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-white">
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
