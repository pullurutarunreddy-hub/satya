'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Banner } from '@/lib/types';
import Image from 'next/image';

const bannerSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    linkUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    image: z.any().refine(files => files?.length > 0 || typeof files === 'string', 'Image is required.'),
});

type BannerFormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    banner: Banner | null;
};

export function BannerFormDialog({ open, onOpenChange, onSuccess, banner }: BannerFormDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof bannerSchema>>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            title: '',
            linkUrl: '',
            image: undefined,
        },
    });

    useEffect(() => {
        if (banner) {
            form.reset({
                title: banner.title,
                linkUrl: banner.linkUrl || '',
                image: banner.imageUrl,
            });
            setPreview(banner.imageUrl);
        } else {
            form.reset({
                title: '',
                linkUrl: '',
                image: undefined,
            });
            setPreview(null);
        }
    }, [banner, form, open]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue('image', event.target.files);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: z.infer<typeof bannerSchema>) => {
        setIsSubmitting(true);
        try {
            let imageUrl = banner?.imageUrl;

            // Check if a new image was uploaded
            if (values.image && typeof values.image !== 'string') {
                const file = values.image[0];
                const storageRef = ref(storage, `banners/${Date.now()}_${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(snapshot.ref);
            }
            
            if (!imageUrl) {
                throw new Error("Image URL is missing.");
            }

            const bannerData = {
                title: values.title,
                linkUrl: values.linkUrl,
                imageUrl: imageUrl,
                active: banner ? banner.active : true, // Default to active for new banners
            };

            if (banner) {
                // Update existing banner
                const bannerRef = doc(db, 'banners', banner.id);
                await setDoc(bannerRef, bannerData, { merge: true });
                toast({ title: 'Banner Updated', description: 'The banner has been successfully updated.' });
            } else {
                // Add new banner
                await addDoc(collection(db, 'banners'), bannerData);
                toast({ title: 'Banner Added', description: 'The new banner has been successfully added.' });
            }

            onSuccess();
        } catch (error) {
            console.error("Error saving banner: ", error);
            toast({ title: 'Error', description: 'Failed to save the banner.', variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{banner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
                    <DialogDescription>
                        Fill out the details below. Banners will appear in the customer portal.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl><Input placeholder="e.g., Summer Bonanza" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link URL (Optional)</FormLabel>
                                    <FormControl><Input placeholder="https://example.com/offer" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Banner Image</FormLabel>
                                    {preview && <Image src={preview} alt="Banner preview" width={400} height={200} className="rounded-md object-contain mb-2" />}
                                    <FormControl>
                                        <Input type="file" accept="image/*" onChange={handleFileChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {banner ? 'Save Changes' : 'Add Banner'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
