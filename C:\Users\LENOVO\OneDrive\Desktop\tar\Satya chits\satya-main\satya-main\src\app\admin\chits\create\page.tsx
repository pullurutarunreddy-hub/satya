'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const chitPlanSchema = z.object({
    title: z.string().min(5, "Title is required"),
    payoutRange: z.string().min(5, "Payout range is required"),
    capital: z.coerce.number().positive("Capital must be positive"),
    monthly: z.coerce.number().positive("Monthly installment must be positive"),
    months: z.coerce.number().positive("Duration must be positive"),
    totalMembers: z.coerce.number().positive("Total members must be positive"),
    onboardingFee: z.coerce.number().min(0, "Onboarding fee cannot be negative"),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
});

type ChitPlanFormValues = z.infer<typeof chitPlanSchema>;

export default function CreateChitPlanPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<ChitPlanFormValues>({
    resolver: zodResolver(chitPlanSchema),
    defaultValues: {
        onboardingFee: 0,
    }
  });

  const { formState: { isSubmitting } } = form;

  const handleSubmit = async (values: ChitPlanFormValues) => {
    try {
        const docData = {
            ...values,
            joiningOpen: true, // By default, new plans are open for joining
            liftingOption: "Auction", // Default value
        };
        await addDoc(collection(db, "chit-plans"), docData);
        toast({
            title: "Plan Created",
            description: "The new chit plan has been successfully created."
        });
        router.push('/admin/chits');
        router.refresh();
    } catch (error) {
        console.error("Error creating chit plan: ", error);
        toast({
            title: "Error",
            description: "Failed to create the chit plan. Please try again.",
            variant: "destructive"
        });
    }
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
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="title" render={({ field }) => (
                        <FormItem><Label>Title</Label><FormControl><Input placeholder="e.g., 2 Lakh Chitti (20 months)" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="payoutRange" render={({ field }) => (
                        <FormItem><Label>Payout Range (Display)</Label><FormControl><Input placeholder="e.g., ₹1,92,000 - ₹2,30,000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="capital" render={({ field }) => (
                        <FormItem><Label>Capital (INR)</Label><FormControl><Input type="number" placeholder="200000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="monthly" render={({ field }) => (
                        <FormItem><Label>Monthly Installment (INR)</Label><FormControl><Input type="number" placeholder="10000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="months" render={({ field }) => (
                        <FormItem><Label>Duration (Months)</Label><FormControl><Input type="number" placeholder="20" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="totalMembers" render={({ field }) => (
                        <FormItem><Label>Total Members / Seats</Label><FormControl><Input type="number" placeholder="20" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="onboardingFee" render={({ field }) => (
                        <FormItem><Label>Onboarding Fee (INR)</Label><FormControl><Input type="number" placeholder="1000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="startDate" render={({ field }) => (
                        <FormItem><Label>Start Date</Label><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 animate-spin" /> : <PlusCircle className="mr-2" />}
                    Create Plan
                </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
