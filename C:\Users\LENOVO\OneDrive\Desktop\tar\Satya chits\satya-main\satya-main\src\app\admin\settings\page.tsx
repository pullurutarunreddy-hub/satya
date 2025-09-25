
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, UploadCloud, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dummyBanners = [
  { id: 'BNR001', title: 'Summer Bonanza', imageUrl: 'https://picsum.photos/seed/banner1/300/100', linkUrl: '/offers/summer', active: true },
  { id: 'BNR002', title: 'New Year Offer', imageUrl: 'https://picsum.photos/seed/banner2/300/100', linkUrl: '/offers/new-year', active: false },
];

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage your application's appearance, promotions, and account details.</p>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="banners">Promotional Banners</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your app. Changes will be reflected globally.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input type="color" defaultValue="#10b981" className="w-12 h-10 p-1" />
                    <Input placeholder="#10b981" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-2">
                    <Input type="color" defaultValue="#f1f5f9" className="w-12 h-10 p-1" />
                    <Input placeholder="#f1f5f9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <Input type="color" defaultValue="#64748b" className="w-12 h-10 p-1" />
                    <Input placeholder="#64748b" />
                  </div>
                </div>
              </div>
              <Separator />
               <div className="space-y-2">
                  <Label>App Logo</Label>
                  <div className="flex items-center gap-4">
                     <Button variant="outline"><UploadCloud className="mr-2"/> Upload New Logo</Button>
                     <span className="text-sm text-muted-foreground">Current: logo.svg</span>
                  </div>
                </div>
               <Button>Save Appearance</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banners">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Promotional Banners</CardTitle>
                <CardDescription>Manage banners on the customer dashboard.</CardDescription>
              </div>
              <Button>
                <PlusCircle className="mr-2" /> Add Banner
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Link URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyBanners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell className="font-medium flex items-center gap-4">
                        <img src={banner.imageUrl} alt={banner.title} data-ai-hint="advertisement banner" className="w-32 rounded-md" />
                        <span>{banner.title}</span>
                      </TableCell>
                      <TableCell>{banner.linkUrl}</TableCell>
                      <TableCell>
                        <Badge variant={banner.active ? 'default' : 'secondary'}>
                          {banner.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4"/></Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4"/></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Business Details</CardTitle>
                        <CardDescription>This information may be displayed on invoices and communications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="businessName">Business Name</Label>
                                <Input id="businessName" defaultValue="Satya Community Chits" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="businessContact">Contact Number</Label>
                                <Input id="businessContact" defaultValue="+91 98765 43210" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="businessAddress">Business Address</Label>
                            <Input id="businessAddress" defaultValue="123 Main Street, Anytown, India" />
                        </div>
                        <Button>Save Business Details</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Account</CardTitle>
                        <CardDescription>Manage your personal admin login details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="adminName">Full Name</Label>
                                <Input id="adminName" defaultValue="Admin User" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="adminEmail">Email</Label>
                                <Input id="adminEmail" type="email" defaultValue="admin@example.com" />
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" placeholder="Leave blank to keep current password" />
                        </div>
                        <Button variant="destructive">Update Account & Send OTP</Button>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
