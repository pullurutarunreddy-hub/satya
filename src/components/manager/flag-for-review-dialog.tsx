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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type DummyMember = {
    id: string;
    name: string;
};

type FlagForReviewDialogProps = {
  member: DummyMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FlagForReviewDialog({ member, open, onOpenChange }: FlagForReviewDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to flag the member
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      toast({
        title: 'Member Flagged',
        description: `${member.name} has been flagged for admin review.`,
        variant: 'destructive'
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Flag for Review</DialogTitle>
            <DialogDescription>
              Add notes for the admin regarding {member.name}. The admin will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea placeholder="e.g., Consistently late payments, incorrect contact info..." id="notes" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Flag
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
