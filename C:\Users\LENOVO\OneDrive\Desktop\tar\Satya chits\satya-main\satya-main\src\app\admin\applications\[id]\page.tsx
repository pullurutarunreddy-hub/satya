'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Download, Mail, Phone, User, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from '@/hooks/use-toast';

type Application = {
    id: string;
    fullName: string;
    motherName: string;
    fatherName: string;
    email?: string;
    address?: string;
    userId: string;
    planId: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    submittedAt: string;
    // We will handle file uploads later
    // aadhaarFront: any;
    // aadhaarBack: any;
    accountNumber?: string;
    ifscCode?: string;
};

export default function ApplicationDetailPage({ params }: { params: { id: string }}) {
  const router = useRouter();
  const { toast } = useToast();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
        if (!params.id) return;
        setLoading(true);
        try {
            const docRef = doc(db, "applications", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setApplication({ id: docSnap.id, ...docSnap.data() } as Application);
            } else {
                toast({ title: "Error", description: "Application not found.", variant: "destructive" });
                router.push('/admin/applications');
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
            toast({ title: "Error", description: "Failed to fetch application details.", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };
    fetchApplication();
  }, [params.id, router, toast]);

  const handleStatusChange = async (newStatus: 'Approved' | 'Rejected') => {
    if (!application) return;
    try {
      const appRef = doc(db, 'applications', application.id);
      await updateDoc(appRef, { status: newStatus });
      setApplication(prev => prev ? { ...prev, status: newStatus } : null);
      toast({
        title: `Application ${newStatus}`,
        description: `${application.fullName}'s application has been marked as ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating status: ", error);
      toast({ title: "Error", description: "Could not update application status.", variant: "destructive" });
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin" /></div>;
  }

  if (!application) {
    return null; // Or a more graceful not found component
  }

  const getStatusClass = (status: Application['status']) => {
    switch (status) {
        case 'Pending': return 'text-yellow-500';
        case 'Approved': return 'text-green-500';
        case 'Rejected': return 'text-red-500';
        default: return '';
    }
  }


  return (
    <div className="container mx-auto py-12 px-4">
       <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2" /> Back to Applications
      </Button>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl">Application Details</CardTitle>
              <CardDescription>Reviewing application for {application.fullName}.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                <Download className="mr-2"/> Download Docs
              </Button>
              <Button onClick={() => handleStatusChange('Approved')} disabled={application.status === 'Approved'}>
                <Check className="mr-2" /> Approve
              </Button>
              <Button variant="destructive" onClick={() => handleStatusChange('Rejected')} disabled={application.status === 'Rejected'}>
                <X className="mr-2" /> Reject
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Applicant Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <User className="text-muted-foreground" />
                            <span>{application.fullName}</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <Phone className="text-muted-foreground" />
                            <span>(Phone number available on user profile)</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <Mail className="text-muted-foreground" />
                            <span>{application.email || 'Not Provided'}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <User className="text-muted-foreground" />
                            <span>Mother: {application.motherName}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <User className="text-muted-foreground" />
                            <span>Father: {application.fatherName}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground italic">Document upload functionality will be added soon.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Application Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <p>Status: <span className={`font-semibold ${getStatusClass(application.status)}`}>{application.status}</span></p>
                         <p>Submitted: {new Date(application.submittedAt).toLocaleString()}</p>
                         <p>Chit Plan ID: {application.planId}</p>
                         <p>User ID: {application.userId}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Bank Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p>Account No: {application.accountNumber || 'Not Provided'}</p>
                       <p>IFSC Code: {application.ifscCode || 'Not Provided'}</p>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
