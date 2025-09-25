'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Edit, Search } from "lucide-react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ChitPlan } from '@/lib/types';
import { differenceInMonths } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function AdminChitsPage() {
    const [plans, setPlans] = useState<ChitPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "chit-plans"));
            const plansData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ChitPlan[];
            setPlans(plansData);
            setLoading(false);
        };

        fetchPlans();
    }, []);
    
    const filteredPlans = useMemo(() => {
        return plans.filter(plan => 
            plan.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [plans, searchTerm]);


    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
    
    const getPlanStatus = (plan: ChitPlan): { completedMonths: number; status: 'Active' | 'Completed' } => {
        const startDate = new Date(plan.startDate);
        const now = new Date();
        const completedMonths = differenceInMonths(now, startDate);
        
        if (completedMonths >= plan.months) {
            return { completedMonths: plan.months, status: 'Completed' };
        }
        // Return 0 if the start date is in the future
        return { completedMonths: Math.max(0, completedMonths), status: 'Active' };
    }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                 <div>
                    <CardTitle>Chit Plans</CardTitle>
                    <CardDescription>Create, edit, and manage all chit plans.</CardDescription>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by title..."
                            className="pl-8 sm:w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button asChild>
                        <Link href="/admin/chits/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Plan
                        </Link>
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Capital</TableHead>
                            <TableHead>Monthly Instalment</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlans.map((plan) => {
                            const { completedMonths, status } = getPlanStatus(plan);
                            return (
                                <TableRow key={plan.id}>
                                    <TableCell className="font-medium">{plan.title}</TableCell>
                                    <TableCell>{formatCurrency(plan.capital)}</TableCell>
                                    <TableCell>{formatCurrency(plan.monthly)}</TableCell>
                                    <TableCell>{completedMonths} / {plan.months} months</TableCell>
                                    <TableCell>
                                        <Badge variant={status === 'Completed' ? 'secondary' : 'default'}>{status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" disabled>
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit Plan</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
