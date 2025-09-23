import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";

export default function CreateManagerPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="text-primary" />
            Create Manager Account
          </CardTitle>
          <CardDescription>
            Create a new manager account and securely provide them with the temporary password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="e.g., Ravi Kumar" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="manager@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" type="tel" placeholder="9876543210" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tempPassword">Temporary Password</Label>
                    <Input id="tempPassword" type="password" placeholder="Will be auto-generated if blank" />
                </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="requirePasswordChange" defaultChecked />
              <Label htmlFor="requirePasswordChange" className="font-normal">
                Require password change on first login
              </Label>
            </div>
            <Button type="submit" className="w-full md:w-auto">
                <UserPlus className="mr-2" />
                Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
