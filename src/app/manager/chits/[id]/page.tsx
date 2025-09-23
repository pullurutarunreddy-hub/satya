import { notFound } from "next/navigation";
import { getChitPlanById } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, Landmark, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type ManagerChitDetailsPageProps = {
    params: {
      id: string;
    };
  };

const dummyMembers = [
    { id: 'MEM001', name: 'Aarav Sharma', mobile: '9876543210', seat: 1, status: 'active', monthsCompleted: 5, amountPaid: 25000, amountDue: 0, lastPayment: '2024-07-15' },
    { id: 'MEM002', name: 'Diya Patel', mobile: '9876543211', seat: 2, status: 'active', monthsCompleted: 4, amountPaid: 20000, amountDue: 5000, lastPayment: '2024-06-18' },
    { id: 'MEM003', name: 'Vihaan Singh', mobile: '9876543212', seat: 3, status: 'dropped', monthsCompleted: 2, amountPaid: 10000, amountDue: 10000, lastPayment: '2024-04-10' },
    { id: 'MEM004', name: 'Ananya Gupta', mobile: '9876543213', seat: 4, status: 'active', monthsCompleted: 5, amountPaid: 25000, amountDue: 0, lastPayment: '2024-07-20' },
    { id: 'MEM005', name: 'Kabir Kumar', mobile: '9876543214', seat: 5, status: 'pending', monthsCompleted: 0, amountPaid: 500, amountDue: 0, lastPayment: '2024-07-25' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

const statusVariant = (status: string) => {
    switch (status) {
        case 'active': return 'default';
        case 'pending': return 'secondary';
        case 'dropped': return 'destructive';
        default: return 'outline';
    }
}


export default function ManagerChitDetailsPage({ params }: ManagerChitDetailsPageProps) {
    const plan = getChitPlanById(params.id);

    if (!plan) {
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <CardTitle>{plan.title}</CardTitle>
                            <CardDescription>Manage members and their payments for this chit plan.</CardDescription>
                        </div>
                        <div className="relative w-full sm:max-w-xs">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by name or mobile..."
                                className="pl-8 sm:w-full"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Paid</TableHead>
                                <TableHead>Due</TableHead>
                                <TableHead>Last Payment</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyMembers.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">
                                        <div>{member.name}</div>
                                        <div className="text-sm text-muted-foreground">{member.mobile} (Seat #{member.seat})</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant(member.status)}>{member.status}</Badge>
                                    </TableCell>
                                    <TableCell>{member.monthsCompleted} / {plan.months} months</TableCell>
                                    <TableCell>{formatCurrency(member.amountPaid)}</TableCell>
                                    <TableCell className={member.amountDue > 0 ? 'text-destructive font-semibold' : ''}>
                                        {formatCurrency(member.amountDue)}
                                    </TableCell>
                                    <TableCell>{member.lastPayment}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem><FileText className="mr-2"/>View Details</DropdownMenuItem>
                                                <DropdownMenuItem><Landmark className="mr-2"/>Record Payment</DropdownMenuItem>
                                                <DropdownMenuItem><AlertTriangle className="mr-2"/>Flag for Review</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}