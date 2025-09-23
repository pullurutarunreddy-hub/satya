'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, HandCoins, UserPlus, Users, IndianRupee, CircleAlert, Settings, BarChart3 } from "lucide-react";
import { ExportReportsDialog } from "@/components/admin/export-reports-dialog";

const kpis = [
    { title: "Total Revenue (YTD)", value: "₹12,45,000", icon: IndianRupee },
    { title: "Pending Applications", value: "4", icon: ListChecks },
    { title: "Total Dues (This Month)", value: "₹2,30,000", icon: CircleAlert },
    { title: "Active Customers", value: "128", icon: Users },
];

export default function AdminDashboard() {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto py-12 px-4 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Admin. Here's your high-level overview.</p>
          </div>
          <div className="flex gap-2">
              <Button asChild>
                  <Link href="/admin/create-manager">
                      <UserPlus className="mr-2" /> Create Manager
                  </Link>
              </Button>
              <Button variant="outline" onClick={() => setIsExportDialogOpen(true)}>
                  Export Reports
              </Button>
          </div>
        </div>
        
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="text-primary" />
                Monthly Collections
              </CardTitle>
              <CardDescription>A placeholder for monthly collection trends.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-secondary flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">Chart component will be here.</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-8">
              <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                  <ListChecks className="text-primary" />
                  Manage Applications
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground mb-4">
                  View, verify, and manage new member applications.
                  </p>
                  <Button asChild>
                  <Link href="/admin/applications">View Applications</Link>
                  </Button>
              </CardContent>
              </Card>
              <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                  <HandCoins className="text-primary" />
                  Manage Chit Plans
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground mb-4">
                  Create, edit, and manage all chit fund plans.
                  </p>
                  <Button asChild>
                  <Link href="/admin/chits">View Chit Plans</Link>
                  </Button>
              </CardContent>
              </Card>
               <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                  <Settings className="text-primary" />
                  Site Settings
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground mb-4">
                  Manage site appearance, banners, and offers.
                  </p>
                  <Button asChild>
                  <Link href="/admin/settings">Manage Settings</Link>
                  </Button>
              </CardContent>
              </Card>
          </div>
        </div>
      </div>
      <ExportReportsDialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen} />
    </>
  );
}
