import { getChitPlanById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, IndianRupee, Info, SlidersHorizontal, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ChitDetailPageProps = {
  params: {
    id: string;
  };
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
    <div className="flex items-start gap-4">
        <Icon className="h-6 w-6 text-primary mt-1" />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    </div>
);

export default function ChitDetailPage({ params }: ChitDetailPageProps) {
  const plan = getChitPlanById(params.id);

  if (!plan) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <CardTitle className="text-3xl font-headline">{plan.title}</CardTitle>
            <Badge className="text-base" variant="default">Capital: {formatCurrency(plan.capital)}</Badge>
          </div>
          <CardDescription className="pt-2">Full details for the selected chit plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-secondary/30 rounded-lg">
                <DetailItem icon={Calendar} label="Start Date" value={formatDate(plan.startDate)} />
                <DetailItem icon={IndianRupee} label="Onboarding Fee" value={formatCurrency(plan.onboardingFee)} />
                <DetailItem icon={SlidersHorizontal} label="Lifting Options" value={plan.liftingOptions} />
                <DetailItem icon={IndianRupee} label="Monthly Payment" value={formatCurrency(plan.monthlyPayment)} />
                <DetailItem icon={Users} label="Duration / Seats" value={`${plan.duration} months / ${plan.totalMembers} seats`} />
            </div>
            
            <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Info className="h-5 w-5 text-accent"/>Sample Payout Schedule</h3>
                <div className="border rounded-lg max-h-80 overflow-y-auto">
                    <Table>
                        <TableHeader className="sticky top-0 bg-secondary">
                            <TableRow>
                            <TableHead className="w-[100px]">Month</TableHead>
                            <TableHead className="text-right">Sample Payout Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {plan.payoutSchedule.map((payout) => (
                            <TableRow key={payout.month}>
                                <TableCell className="font-medium">{payout.month}</TableCell>
                                <TableCell className="text-right">{formatCurrency(payout.amount)}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="text-center pt-6">
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={`/chit/${plan.id}/apply`}>Join This Plan</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
