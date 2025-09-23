'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '../ui/scroll-area';

type DummyMember = {
    id: string;
    name: string;
    mobile: string;
};

const dummyPayments = [
    { id: 'PAY001', date: '2024-07-15', amount: 5000, method: 'Cash', status: 'success' },
    { id: 'PAY002', date: '2024-06-15', amount: 5000, method: 'UPI', status: 'success' },
    { id: 'PAY003', date: '2024-05-15', amount: 5000, method: 'Cash', status: 'success' },
    { id: 'PAY004', date: '2024-04-15', amount: 5000, method: 'Card', status: 'success' },
    { id: 'PAY005', date: '2024-03-15', amount: 5000, method: 'Cash', status: 'success' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

type MemberDetailsDialogProps = {
  member: DummyMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MemberDetailsDialog({ member, open, onOpenChange }: MemberDetailsDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Member Details: {member.name}</DialogTitle>
          <DialogDescription>
            Viewing details for {member.name} ({member.mobile}).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold text-lg mb-2">Recent Payments</h3>
                <ScrollArea className="h-64">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {dummyPayments.map((payment) => (
                            <TableRow key={payment.id}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{formatCurrency(payment.amount)}</TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell>
                                <Badge variant={payment.status === 'success' ? 'default' : 'destructive'}>
                                {payment.status}
                                </Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
            <div>
                <h3 className="font-semibold text-lg mb-2">KYC Information</h3>
                <div className="text-sm text-muted-foreground p-4 bg-secondary/50 rounded-md">
                    <p>Aadhaar: **** **** 1234 (Masked)</p>
                    <p>Bank Account: ******5678 (Masked)</p>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
