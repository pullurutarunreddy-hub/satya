'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ChitPlan } from '@/lib/types';


export default function AdminChitsPage() {
    const [plans, setPlans] = useState<ChitPlan[]>([]);
    const [loading, setLoading] = useState(true);

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

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Chit Plans</CardTitle>
                <CardDescription>Create, edit, and manage all chit plans.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/chits/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Plan
                </Link>
            </Button>
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
                        <TableHead>Monthly</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {plans.map((plan) => (
                        <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.title}</TableCell>
                        <TableCell>{formatCurrency(plan.capital)}</TableCell>
                        <TableCell>{formatCurrency(plan.monthly)}</TableCell>
                        <TableCell>{plan.months} months</TableCell>
                        <TableCell><Badge>{plan.joiningOpen ? 'Active' : 'Closed'}</Badge></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
