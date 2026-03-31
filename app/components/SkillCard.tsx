'use client';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SkillCard({ skill }: { skill: any }) {
  const handleBuy = async () => {
    const stripe = await stripePromise;
    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: skill.stripe_price_id, skillId: skill.id }),
    });
    const { sessionId } = await res.json();
    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 hover:scale-105 transition-all border border-zinc-800">
      <h3 className="text-2xl font-semibold">{skill.name}</h3>
      <p className="text-zinc-400 mt-3 line-clamp-3">{skill.description}</p>
      <div className="mt-8 flex justify-between items-end">
        <div className="text-5xl font-bold">${skill.price / 100}</div>
        <button 
          onClick={handleBuy}
          className="bg-violet-600 hover:bg-violet-500 px-10 py-4 rounded-2xl font-semibold text-lg transition"
        >
          Buy Now – Instant Access
        </button>
      </div>
    </div>
  );
}
