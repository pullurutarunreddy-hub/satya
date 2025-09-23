'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateChitPlanPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Plan Created",
        description: "The new chit plan has been successfully created."
    });
    router.push('/admin/chits');
  }

  return (
    <div className="container mx-auto py-12 px-4">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2" /> Back to Chit Plans
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Chit Plan</CardTitle>
          <CardDescription>
            Fill out the details below to create a new chit fund plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g., 2 Lakh Chitti (20 months)" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="payoutRange">Payout Range (Display)</Label>
                    <Input id="payoutRange" placeholder="e.g., ₹1,92,000 - ₹2,30,000" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="capital">Capital (INR)</Label>
                    <Input id="capital" type="number" placeholder="200000" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="monthly">Monthly Installment (INR)</Label>
                    <Input id="monthly" type="number" placeholder="10000" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="months">Duration (Months)</Label>
                    <Input id="months" type="number" placeholder="20" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="onboardingFee">Onboarding Fee (INR)</Label>
                    <Input id="onboardingFee" type="number" placeholder="1000" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" required />
                </div>
            </div>
            
            <Button type="submit" className="w-full md:w-auto">
                <PlusCircle className="mr-2" />
                Create Plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
