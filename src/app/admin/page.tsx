import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListChecks, HandCoins } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>
    </div>
  );
}
