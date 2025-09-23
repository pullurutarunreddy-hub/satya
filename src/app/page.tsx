import { ChitPlanCard } from '@/components/chit-plan-card';
import { getChitPlans } from '@/lib/data';

export default function Home() {
  const chitPlans = getChitPlans();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Welcome to ChitConnect
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure your financial future with our transparent and reliable chit fund plans. Browse our active plans below and find the one that fits your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {chitPlans.map(plan => (
          <ChitPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
