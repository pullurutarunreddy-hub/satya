'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type OnboardingPageProps = {
    params: {
      id: string;
    };
  };

export default function OnboardingPage({ params }: OnboardingPageProps) {
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
        toast({
            title: "Payment Successful!",
            description: "Your onboarding fee has been received.",
        });
        setIsLoading(false);
        router.push(`/chit/${params.id}/onboarding/success`);
    }, 2000);
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Final Step: Onboarding</CardTitle>
          <CardDescription>
            Please review the terms and conditions and pay the onboarding fee to complete your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Terms & Conditions</h3>
            <ScrollArea className="h-48 w-full rounded-md border p-4 text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="mt-4">
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, 
                nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
              </p>
            </ScrollArea>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={accepted} onCheckedChange={(checked) => setAccepted(checked as boolean)} />
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I have read and agree to the terms and conditions.
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!accepted || isLoading} onClick={handlePayment}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Pay Onboarding Fee & Finalize
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
