'use client';

import { useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  motherName: z.string().min(2, "Mother's name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  mobile: z.string().length(10, 'Mobile number must be 10 digits'),
  altMobile: z.string().length(10, 'Alternate mobile must be 10 digits').optional().or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().min(5, 'Address is required').optional().or(z.literal('')),
});

const kycSchema = z.object({
  aadhaarFront: z.any().refine((files) => files?.length === 1, 'Aadhaar front image is required.'),
  aadhaarBack: z.any().refine((files) => files?.length === 1, 'Aadhaar back image is required.'),
});

const bankSchema = z.object({
  accountNumber: z.string().min(9, 'Invalid account number').max(18, 'Invalid account number'),
  ifscCode: z.string().length(11, 'IFSC code must be 11 characters'),
});

const formSchemas = [personalDetailsSchema, kycSchema, bankSchema];

export function ApplicationForm({ planId }: { planId: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchemas[currentStep]),
    mode: 'onChange',
  });

  const progress = ((currentStep + 1) / formSchemas.length) * 100;

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      if (currentStep < formSchemas.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FieldValues) => {
    console.log('Application data:', data);
    setIsLoading(true);

    // Simulate API call and OTP verification
    setTimeout(() => {
        toast({
            title: "Application Submitted",
            description: "Your application is pending OTP verification."
        });
        setTimeout(() => {
            setIsLoading(false);
            router.push(`/chit/${planId}/onboarding`);
        }, 1500)
    }, 1500);

  };

  return (
    <div className="space-y-8">
        <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {formSchemas.length}</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <h2 className="text-xl font-semibold md:col-span-2">Personal Details</h2>
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="mobile" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="motherName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Mother's Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="fatherName" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Father's Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="altMobile" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Alternate Mobile</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Email (Optional)</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="address" control={form.control} render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Address (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
          )}

          {currentStep === 1 && (
             <div className="space-y-6">
                <h2 className="text-xl font-semibold">KYC Documents</h2>
                 <FormField name="aadhaarFront" control={form.control} render={({ field }) => (
                     <FormItem>
                         <FormLabel>Aadhaar Card (Front)</FormLabel>
                         <FormControl>
                             <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                         </FormControl>
                         <FormDescription>Upload a clear image of the front of your Aadhaar card.</FormDescription>
                         <FormMessage />
                     </FormItem>
                 )} />
                 <FormField name="aadhaarBack" control={form.control} render={({ field }) => (
                     <FormItem>
                         <FormLabel>Aadhaar Card (Back)</FormLabel>
                         <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                         </FormControl>
                         <FormDescription>Upload a clear image of the back of your Aadhaar card.</FormDescription>
                         <FormMessage />
                     </FormItem>
                 )} />
             </div>
          )}
          
          {currentStep === 2 && (
             <div className="space-y-6">
                <h2 className="text-xl font-semibold">Bank Details</h2>
                <FormField name="accountNumber" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Bank Account Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="ifscCode" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>IFSC Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
          )}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              Back
            </Button>
            {currentStep < formSchemas.length - 1 ? (
              <Button type="button" onClick={handleNext}>Next</Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
