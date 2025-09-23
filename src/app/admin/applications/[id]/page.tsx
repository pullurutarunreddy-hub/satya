'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Download, Mail, Phone, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const dummyApplication = {
  id: 'APP001',
  name: 'Ravi Kumar',
  chitPlan: '1 Lakh Chitti',
  status: 'Pending',
  submitted: '2024-07-28',
  mobile: '9876543210',
  email: 'ravi.kumar@example.com',
  address: '123, Gandhi Nagar, Bangalore, 560001',
  documents: [
    { name: 'Aadhaar Card', url: '#' },
    { name: 'Address Proof', url: '#' },
    { name: 'Bank Statement', url: '#' },
  ]
};

export default function ApplicationDetailPage() {
  const router = useRouter();

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
              <CardDescription>Reviewing application for {dummyApplication.name}.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2"/> Download Docs
              </Button>
              <Button>
                <Check className="mr-2" /> Approve
              </Button>
              <Button variant="destructive">
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
                            <span>{dummyApplication.name}</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <Phone className="text-muted-foreground" />
                            <span>{dummyApplication.mobile}</span>
                        </div>
                         <div className="flex items-center gap-4">
                            <Mail className="text-muted-foreground" />
                            <span>{dummyApplication.email}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {dummyApplication.documents.map(doc => (
                                <li key={doc.name} className="flex justify-between items-center">
                                    <span>{doc.name}</span>
                                    <Button variant="link" asChild><a href={doc.url}>View</a></Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Application Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <p>Status: <span className="font-semibold text-yellow-500">{dummyApplication.status}</span></p>
                         <p>Submitted: {dummyApplication.submitted}</p>
                         <p>Chit Plan: {dummyApplication.chitPlan}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground italic">No notes added yet.</p>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
