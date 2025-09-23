import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function ManagerLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Manager Login</CardTitle>
          <CardDescription>Enter your credentials to access the portal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="manager@example.com" defaultValue="manager@example.com" required />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">
                        Forgot password?
                    </Link>
                </div>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/manager/dashboard">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
