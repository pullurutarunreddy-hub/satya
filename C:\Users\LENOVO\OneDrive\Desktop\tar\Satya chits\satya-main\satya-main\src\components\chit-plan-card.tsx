'use client';

import type { ChitPlan } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { Calendar, IndianRupee, Landmark, Users } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

type ChitPlanCardProps = {
  plan: ChitPlan;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

export function ChitPlanCard({ plan }: ChitPlanCardProps) {
  const { user } = useAuth();

  return (
    <>
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-2xl">{plan.title}</CardTitle>
            <Badge variant="secondary">{plan.totalMembers} Seats</Badge>
          </div>
          <CardDescription>Capital: <span className="font-bold text-primary">{formatCurrency(plan.capital)}</span></CardDescription>
        </CardHeader>
        <CardContent className="flex-grow grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
            <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-muted-foreground" />
                <div>
                    <p className="text-muted-foreground">Monthly</p>
                    <p className="font-semibold">{formatCurrency(plan.monthly)}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold">{plan.months} months</p>
                </div>
            </div>
            <div className="flex items-center gap-2 col-span-2">
                <Landmark className="w-5 h-5 text-muted-foreground" />
                <div>
                    <p className="text-muted-foreground">Payout Range</p>
                    <p className="font-semibold">{plan.payoutRange}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
              <Link href={user ? `/chit/${plan.id}` : '/login'}>
                {user ? 'View Details' : 'Login to View Details'}
              </Link>
            </Button>
        </CardFooter>
      </Card>
    </>
  );
}
