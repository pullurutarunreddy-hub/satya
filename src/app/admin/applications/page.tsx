import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const applications = [
  { id: 'APP001', name: 'Ravi Kumar', chitPlan: '1 Lakh Chitti', status: 'Pending', submitted: '2024-07-28' },
  { id: 'APP002', name: 'Priya Sharma', chitPlan: '2 Lakh Chitti (25m)', status: 'Verified', submitted: '2024-07-27' },
  { id: 'APP003', name: 'Amit Singh', chitPlan: '1 Lakh Chitti', status: 'Rejected', submitted: '2024-07-26' },
  { id: 'APP004', name: 'Sunita Devi', chitPlan: '2 Lakh Chitti', status: 'Pending', submitted: '2024-07-28' },
];

export default function AdminApplicationsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Review and manage all member applications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Chit Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted On</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.chitPlan}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === 'Pending' ? 'secondary' : app.status === 'Verified' ? 'default' : 'destructive'}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.submitted}</TableCell>
                  <TableCell>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Verified</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
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
