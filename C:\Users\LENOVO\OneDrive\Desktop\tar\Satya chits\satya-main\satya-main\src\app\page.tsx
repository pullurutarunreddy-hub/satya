'use client';

import { ChitPlanCard } from '@/components/chit-plan-card';
import { db } from '@/lib/firebase';
import type { ChitPlan } from '@/lib/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [chitPlans, setChitPlans] = useState<ChitPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
        setLoading(true);
        const q = query(collection(db, "chit-plans"), where("joiningOpen", "==", true));
        const querySnapshot = await getDocs(q);
        const plansData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ChitPlan[];
        setChitPlans(plansData);
        setLoading(false);
    };

    fetchPlans();
  }, []);


  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Welcome to Satya Community Chits
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure your financial future with our transparent and reliable chit fund plans. Browse our active plans below and find the one that fits your goals.
        </p>
      </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        ) : chitPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {chitPlans.map(plan => (
                <ChitPlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold">No Active Plans</h3>
                <p className="text-muted-foreground mt-2">Please check back later for new chit fund plans.</p>
            </div>
        )}
    </div>
  );
}
