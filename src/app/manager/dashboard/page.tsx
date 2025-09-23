import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, IndianRupee, CircleCheck, CircleAlert, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getChitPlans } from "@/lib/data";

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

const kpis = [
    { title: "To Collect (This Month)", value: formatCurrency(540000), icon: IndianRupee },
    { title: "Collected (This Month)", value: formatCurrency(310000), icon: CircleCheck },
    { title: "Remaining Due (This Month)", value: formatCurrency(230000), icon: CircleAlert },
    { title: "Pending Join Requests", value: "4", icon: Users },
]

export default function ManagerDashboardPage() {
    const activeChits = getChitPlans().filter(p => p.joiningOpen);

    return (
        <div className="container mx-auto py-12 px-4 space-y-8">
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map(kpi => (
                     <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Chits Table */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <CardTitle>Active Chits</CardTitle>
                            </div>
                            <div className="relative w-full sm:max-w-xs">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search by customer, mobile..."
                                    className="pl-8 sm:w-full"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Chit Plan</TableHead>
                                    <TableHead>Capital</TableHead>
                                    <TableHead>Members</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activeChits.map(chit => (
                                    <TableRow key={chit.id}>
                                        <TableCell className="font-medium">{chit.title}</TableCell>
                                        <TableCell>{formatCurrency(chit.capital)}</TableCell>
                                        <TableCell>{Math.floor(Math.random() * chit.totalMembers)} / {chit.totalMembers}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" asChild>
                                                {/* This will later be linked to a chit-specific members page */}
                                                <Link href="#">View Members</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
