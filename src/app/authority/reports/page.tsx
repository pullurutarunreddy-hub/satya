import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getChitPlans } from "@/lib/data";
import { Download } from "lucide-react";

export default function AuthorityReportsPage() {
    const plans = getChitPlans();

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Authority Reports</CardTitle>
                <CardDescription>Read-only access to active chit summaries.</CardDescription>
            </div>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chit Plan</TableHead>
                <TableHead>Capital</TableHead>
                <TableHead>Total Members</TableHead>
                <TableHead>Filled Seats</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.title}</TableCell>
                  <TableCell>{formatCurrency(plan.capital)}</TableCell>
                  <TableCell>{plan.totalMembers}</TableCell>
                  <TableCell>{Math.floor(Math.random() * plan.totalMembers)}</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
