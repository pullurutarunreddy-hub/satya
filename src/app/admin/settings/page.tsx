import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, UploadCloud, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dummyBanners = [
  { id: 'BNR001', title: 'Summer Bonanza', imageUrl: 'https://picsum.photos/seed/banner1/300/100', linkUrl: '/offers/summer', active: true },
  { id: 'BNR002', title: 'New Year Offer', imageUrl: 'https://picsum.photos/seed/banner2/300/100', linkUrl: '/offers/new-year', active: false },
];

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto py-12 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage your application's appearance and promotional content.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of your app. Changes will be reflected globally.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input type="color" defaultValue="#4299e1" className="w-12 h-10 p-1" />
                <Input placeholder="#4299e1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex items-center gap-2">
                <Input type="color" defaultValue="#f0f4f8" className="w-12 h-10 p-1" />
                <Input placeholder="#f0f4f8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex items-center gap-2">
                <Input type="color" defaultValue="#6b7280" className="w-12 h-10 p-1" />
                <Input placeholder="#6b7280" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="icon"><UploadCloud /></Button>
                 <span className="text-sm text-muted-foreground">logo.svg</span>
              </div>
            </div>
          </div>
           <Button>Save Appearance</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Promotional Banners</CardTitle>
            <CardDescription>Manage the banners that appear on the customer dashboard.</CardDescription>
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
    </div>
  );
}
