import { getChitPlanById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ApplicationForm } from '@/components/application-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ApplyPageProps = {
  params: {
    id: string;
  };
};

export default function ApplyPage({ params }: ApplyPageProps) {
  const plan = getChitPlanById(params.id);

  if (!plan) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Application for {plan.title}</CardTitle>
          <CardDescription>
            Please fill out the form below to apply. Your information is kept secure and confidential.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm planId={plan.id} />
        </CardContent>
      </Card>
    </div>
  );
}
