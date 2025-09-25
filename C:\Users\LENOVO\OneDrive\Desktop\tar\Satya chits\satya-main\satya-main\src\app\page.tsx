'use client';

import { ChitPlanCard } from '@/components/chit-plan-card';
import { db } from '@/lib/firebase';
import type { Banner, ChitPlan } from '@/lib/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

function BannerCarousel({ banners }: { banners: Banner[]}) {
  if (!banners || banners.length === 0) {
    return null;
  }
  return (
    <div className="mb-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Link href={banner.linkUrl || '#'}>
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                     <Image
                        src={banner.imageUrl}
                        alt={banner.title}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint="promotional banner"
                      />
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default function Home() {
  const [chitPlans, setChitPlans] = useState<ChitPlan[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch active chit plans
            const plansQuery = query(collection(db, "chit-plans"), where("joiningOpen", "==", true));
            const plansSnapshot = await getDocs(plansQuery);
            const plansData = plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ChitPlan[];
            setChitPlans(plansData);
            
            // Fetch active banners
            const bannersQuery = query(collection(db, "banners"), where("active", "==", true));
            const bannersSnapshot = await getDocs(bannersQuery);
            const bannersData = bannersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Banner[];
            setBanners(bannersData);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);


  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Welcome to Satya Community Chits
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure your financial future with our transparent and reliable chit fund plans. Browse our active plans below and find the one that fits your goals.
        </p>
      </div>

       <BannerCarousel banners={banners} />

        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-16 w-16 animate-spin" />
            </div>
        ) : chitPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {chitPlans.map(plan => (
                <ChitPlanCard key={plan.id} plan={plan} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold">No Active Plans</h3>
                <p className="text-muted-foreground mt-2">Please check back later for new chit fund plans.</p>
            </div>
        )}
    </div>
  );
}
