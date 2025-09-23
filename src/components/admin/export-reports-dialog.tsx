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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getChitPlans } from '@/lib/data';

type ExportReportsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ReportType = 'paid_this_month' | 'due_customers' | 'customer_summary' | 'chit_payment_details';

export function ExportReportsDialog({ open, onOpenChange }: ExportReportsDialogProps) {
  const [reportType, setReportType] = useState<ReportType>('paid_this_month');
  const [selectedChit, setSelectedChit] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const chitPlans = getChitPlans();

  // Dummy customer data for the selector
  const dummyCustomers = [
    { id: 'CUST001', name: 'Ravi Kumar' },
    { id: 'CUST002', name: 'Priya Sharma' },
    { id: 'CUST003', name: 'Amit Singh' },
  ];

  const handleGenerateReport = () => {
    setIsLoading(true);
    // Simulate report generation
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      toast({
        title: 'Report Generation Started',
        description: 'Your report is being generated and will be downloaded shortly.',
      });
    }, 1500);
  };

  const isGenerateDisabled = () => {
    if (reportType === 'customer_summary' && !selectedCustomer) return true;
    if (reportType === 'chit_payment_details' && !selectedChit) return true;
    return false;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Reports</DialogTitle>
          <DialogDescription>Select the type of report you would like to generate.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <RadioGroup value={reportType} onValueChange={(value) => setReportType(value as ReportType)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid_this_month" id="r1" />
              <Label htmlFor="r1">Payments Received (This Month)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="due_customers" id="r2" />
              <Label htmlFor="r2">Customers with Dues</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer_summary" id="r3" />
              <Label htmlFor="r3">Individual Customer Summary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="chit_payment_details" id="r4" />
              <Label htmlFor="r4">Chit Payment Details</Label>
            </div>
          </RadioGroup>

          {reportType === 'customer_summary' && (
            <Select onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer..." />
              </SelectTrigger>
              <SelectContent>
                {dummyCustomers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          )}

          {reportType === 'chit_payment_details' && (
            <Select onValueChange={setSelectedChit}>
              <SelectTrigger>
                <SelectValue placeholder="Select a chit plan..." />
              </SelectTrigger>
              <SelectContent>
                {chitPlans.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleGenerateReport} disabled={isLoading || isGenerateDisabled()}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
