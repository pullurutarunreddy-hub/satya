import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, Download } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function OnboardingSuccessPage() {
    const successImage = PlaceHolderImages.find(img => img.id === 'onboarding-success');

    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
                {successImage && (
                    <Image
                        src={successImage.imageUrl}
                        alt={successImage.description}
                        data-ai-hint={successImage.imageHint}
                        width={400}
                        height={300}
                        className="rounded-lg mb-8 shadow-lg"
                    />
                )}
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h1 className="text-4xl font-bold font-headline mb-2">Welcome to ChitConnect!</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    Your onboarding is complete. We're excited to have you with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg">
                        <Download className="mr-2 h-4 w-4" />
                        Download Onboarding PDF
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
