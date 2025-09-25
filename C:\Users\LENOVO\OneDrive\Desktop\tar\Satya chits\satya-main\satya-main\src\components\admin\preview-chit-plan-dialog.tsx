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
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { ChitPlanFormValues } from '@/app/admin/chits/create/page';
import { AdminOtpDialog } from './admin-otp-dialog';

type PreviewChitPlanDialogProps = {
  planData: ChitPlanFormValues;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (values: ChitPlanFormValues) => Promise<void>;
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');

export function PreviewChitPlanDialog({ planData, open, onOpenChange, onConfirm }: PreviewChitPlanDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    setIsOtpOpen(true);
  };

  const handleOtpSuccess = async () => {
    setIsOtpOpen(false);
    setIsLoading(true);
    await onConfirm(planData);
    setIsLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Preview Chit Plan</DialogTitle>
            <DialogDescription>Please review the details before creating the plan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm">
            <div className="flex justify-between"><span>Title:</span><span className="font-semibold">{planData.title}</span></div>
            <div className="flex justify-between"><span>Capital:</span><span className="font-semibold">{formatCurrency(planData.capital)}</span></div>
            <div className="flex justify-between"><span>Monthly Installment:</span><span className="font-semibold">{formatCurrency(planData.monthly)}</span></div>
            <div className="flex justify-between"><span>Duration:</span><span className="font-semibold">{planData.months} months</span></div>
            <div className="flex justify-between"><span>Members:</span><span className="font-semibold">{planData.totalMembers}</span></div>
            <div className="flex justify-between"><span>Payout Range:</span><span className="font-semibold">{planData.payoutRange}</span></div>
            <div className="flex justify-between"><span>Onboarding Fee:</span><span className="font-semibold">{formatCurrency(planData.onboardingFee)}</span></div>
            <div className="flex justify-between"><span>Start Date:</span><span className="font-semibold">{formatDate(planData.startDate)}</span></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Confirm & Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AdminOtpDialog
        open={isOtpOpen}
        onOpenChange={setIsOtpOpen}
        onSuccess={handleOtpSuccess}
      />
    </>
  );
}
