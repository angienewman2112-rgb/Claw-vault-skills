'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SkillCardProps {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  stripePriceId: string;
}

export default function SkillCard({ id, name, description, price, stripePriceId }: SkillCardProps) {
  const handleBuy = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        priceId: stripePriceId,
        skillId: id,
        skillName: name 
      }),
    });

    const { sessionId } = await response.json();
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) console.error(error);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);

  return (
    <div className="skill-card bg-[#1a1a1a] border border-gray-700 rounded-2xl p-6 hover:border-violet-500 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-white mb-3">{name}</h3>
      <p className="text-gray-400 mb-6 line-clamp-3">{description}</p>
      
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-4xl font-bold text-violet-400">{formattedPrice}</span>
          <span className="text-sm text-gray-500 ml-1">one-time</span>
        </div>
      </div>

      <button
        onClick={handleBuy}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
      >
        Buy Now – Instant Access
      </button>
    </div>
  );
}
