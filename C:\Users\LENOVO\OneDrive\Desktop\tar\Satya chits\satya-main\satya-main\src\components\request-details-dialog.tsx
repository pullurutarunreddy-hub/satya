'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { sendOtp, verifyOtp } from '@/ai/flows/send-otp-flow';

type RequestDetailsDialogProps = {
  planId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RequestDetailsDialog({ planId, open, onOpenChange }: RequestDetailsDialogProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || mobile.trim().length !== 10 || !/^\d+$/.test(mobile.trim())) {
      setError('Please enter a valid name and 10-digit mobile number.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const result = await sendOtp({ mobile });
      if (result.success) {
        setStep(2);
        toast({
          title: 'OTP Sent',
          description: 'An OTP has been sent to your mobile number.',
        });
      } else {
        // Use the detailed error message from the flow
        setError(result.message);
        toast({
          title: 'Failed to Send OTP',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
        const result = await verifyOtp({ mobile, otp });
        if (result.success) {
            toast({
                title: 'Success!',
                description: 'You can now view the chit details.'
            });
            onOpenChange(false);
            router.push(`/chit/${planId}`);
        } else {
            setError(result.message);
            toast({
                title: 'Verification Failed',
                description: result.message,
                variant: 'destructive',
            });
        }
    } catch(err: any) {
        console.error(err);
        const errorMessage = err.message || 'An unexpected error occurred.';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const resetState = () => {
    setStep(1);
    setName('');
    setMobile('');
    setOtp('');
    setError('');
    setIsLoading(false);
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        // Reset state after a short delay to allow closing animation
        setTimeout(resetState, 300);
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {step === 1 ? (
          <form onSubmit={handleGetOtp}>
            <DialogHeader>
              <DialogTitle>View Full Details</DialogTitle>
              <DialogDescription>
                Please provide your name and mobile number to receive an OTP and view the complete chit details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mobile" className="text-right">
                  Mobile
                </Label>
                <Input
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="col-span-3"
                  type="tel"
                  maxLength={10}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive col-span-4 text-center">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get OTP
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <DialogHeader>
              <DialogTitle>Verify OTP</DialogTitle>
              <DialogDescription>
                Enter the 6-digit OTP sent to your mobile number <span className="font-semibold">{mobile}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right">
                  OTP
                </Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="col-span-3"
                  type="text"
                  maxLength={6}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive col-span-4 text-center">{error}</p>}
            </div>
            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <Button type="button" variant="ghost" onClick={() => { setStep(1); setError('')}}>Back</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & Proceed
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
