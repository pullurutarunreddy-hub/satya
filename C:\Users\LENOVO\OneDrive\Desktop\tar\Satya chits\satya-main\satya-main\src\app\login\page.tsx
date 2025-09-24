'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

// Helper to set up reCAPTCHA
const setupRecaptcha = (phoneNumber: string) => {
    // To prevent abuse, Firebase requires a reCAPTCHA verifier.
    // This will be invisible to the user.
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log("reCAPTCHA verified");
        }
    });
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

export default function LoginPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'number' | 'otp'>('number');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(phoneNumber)) {
            toast({
                title: "Invalid Number",
                description: "Please enter a valid 10-digit mobile number.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        const formattedPhoneNumber = `+91${phoneNumber}`;

        try {
            const confirmation = await setupRecaptcha(formattedPhoneNumber);
            setConfirmationResult(confirmation);
            setStep('otp');
            toast({
                title: "OTP Sent",
                description: `An OTP has been sent to ${formattedPhoneNumber}.`,
            });
        } catch (error: any) {
            console.error("Error sending OTP: ", error);
            toast({
                title: "Failed to Send OTP",
                description: error.message || "An unknown error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^\d{6}$/.test(otp)) {
            toast({
                title: "Invalid OTP",
                description: "Please enter the 6-digit OTP.",
                variant: "destructive",
            });
            return;
        }

        if (!confirmationResult) {
            toast({
                title: "Verification Failed",
                description: "No OTP request found. Please try again.",
                variant: "destructive",
            });
            setStep('number');
            return;
        }

        setLoading(true);
        try {
            await confirmationResult.confirm(otp);
            toast({
                title: "Login Successful!",
                description: "You are now logged in.",
            });
            router.push('/');
        } catch (error: any) {
            console.error("Error verifying OTP: ", error);
            toast({
                title: "Invalid OTP",
                description: "The OTP you entered is incorrect. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-secondary/30">
            <div id="recaptcha-container"></div>
            <Card className="w-full max-w-sm mx-4">
                {step === 'number' ? (
                    <form onSubmit={handleSendOtp}>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-headline">Login or Sign Up</CardTitle>
                            <CardDescription>Enter your mobile number to receive an OTP.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="p-2 border rounded-md bg-muted">+91</span>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    maxLength={10}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send OTP
                            </Button>
                        </CardContent>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-headline">Verify OTP</CardTitle>
                            <CardDescription>Enter the 6-digit code sent to +91{phoneNumber}.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                id="otp"
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                className="text-center tracking-[0.5em]"
                            />
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify & Login
                            </Button>
                             <Button variant="link" onClick={() => setStep('number')} className="w-full">
                                Back to number entry
                            </Button>
                        </CardContent>
                    </form>
                )}
            </Card>
        </div>
    );
}
