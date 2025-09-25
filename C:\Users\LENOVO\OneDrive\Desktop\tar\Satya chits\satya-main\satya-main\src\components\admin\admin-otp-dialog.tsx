'use client';

import { useState } from 'react';
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

type AdminOtpDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

// In a real app, this OTP would be sent via SMS/email.
const ADMIN_OTP = "123456";

export function AdminOtpDialog({ open, onOpenChange, onSuccess }: AdminOtpDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const handleVerify = () => {
    setIsLoading(true);
    // Simulate OTP check
    setTimeout(() => {
      if (otp === ADMIN_OTP) {
        toast({ title: "OTP Verified", description: "Creating chit plan..." });
        onSuccess();
      } else {
        toast({ title: "Invalid OTP", description: "The OTP you entered is incorrect.", variant: "destructive" });
      }
      setIsLoading(false);
      setOtp('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Admin Verification</DialogTitle>
          <DialogDescription>
            Enter the OTP sent to the admin number to confirm this action. For now, use 123456.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input 
              id="otp" 
              type="text" 
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-center tracking-[0.5em]"
              placeholder="Enter OTP"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleVerify} disabled={isLoading || otp.length !== 6} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify & Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
