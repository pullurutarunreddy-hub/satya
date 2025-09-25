'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { collection, doc, getDocs, updateDoc, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Application = {
  id: string;
  fullName: string;
  planId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
};

export default function AdminApplicationsPage() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    try {
        const q = query(collection(db, "applications"));
        const querySnapshot = await getDocs(q);
        const appsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Application));
        setApplications(appsData);
    } catch (error) {
        console.error("Error fetching applications: ", error);
        toast({ title: "Error", description: "Could not fetch applications.", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (appId: string, appName: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      const appRef = doc(db, 'applications', appId);
      await updateDoc(appRef, { status: newStatus });
      toast({
        title: `Application ${newStatus}`,
        description: `${appName}'s application has been marked as ${newStatus}.`,
      });
      // Refresh the list
      setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
    } catch (error) {
      console.error("Error updating status: ", error);
      toast({ title: "Error", description: "Could not update application status.", variant: "destructive" });
    }
  };

  const getStatusVariant = (status: Application['status']) => {
    switch (status) {
        case 'Pending': return 'secondary';
        case 'Approved': return 'default';
        case 'Rejected': return 'destructive';
        default: return 'outline';
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Review and manage all member applications.</CardDescription>
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
                  <TableHead>Applicant</TableHead>
                  <TableHead>Chit Plan ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.fullName}</TableCell>
                    <TableCell>{app.planId}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(app.status)}>
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/applications/${app.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(app.id, app.fullName, 'Approved')}>
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(app.id, app.fullName, 'Rejected')} className="text-destructive">
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
