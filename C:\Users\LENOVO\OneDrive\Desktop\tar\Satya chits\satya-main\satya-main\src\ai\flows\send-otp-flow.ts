'use server';
/**
 * @fileOverview A flow for sending and verifying OTPs.
 * - sendOtp - Sends a 6-digit OTP to a mobile number.
 * - verifyOtp - Verifies a 6-digit OTP.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Twilio } from 'twilio';

// In a real app, these would be stored securely, maybe in a database or a secure cache
const otpStore: Record<string, { otp: string; expires: number }> = {};

const SendOtpInputSchema = z.object({
  mobile: z.string().length(10, 'Mobile number must be 10 digits.'),
});
export type SendOtpInput = z.infer<typeof SendOtpInputSchema>;

const SendOtpOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SendOtpOutput = z.infer<typeof SendOtpOutputSchema>;

const sendOtpFlow = ai.defineFlow(
  {
    name: 'sendOtpFlow',
    inputSchema: SendOtpInputSchema,
    outputSchema: SendOtpOutputSchema,
  },
  async (input) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    otpStore[input.mobile] = { otp, expires };

    console.log(`Generated OTP for ${input.mobile}: ${otp}`);

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      console.error('Twilio credentials are not set in environment variables.');
      return { success: false, message: 'Server configuration error. Missing Twilio credentials.' };
    }

    const client = new Twilio(accountSid, authToken);

    try {
      await client.messages.create({
        body: `Your OTP for Satya Community Chits is: ${otp}`,
        from: fromNumber,
        to: `+91${input.mobile}`,
      });
      return { success: true, message: 'OTP sent successfully.' };
    } catch (error) {
      console.error('Failed to send SMS via Twilio:', error);
      return { success: false, message: 'Failed to send OTP.' };
    }
  }
);

export async function sendOtp(input: SendOtpInput): Promise<SendOtpOutput> {
    return await sendOtpFlow(input);
}


const VerifyOtpInputSchema = z.object({
    mobile: z.string().length(10, 'Mobile number must be 10 digits.'),
    otp: z.string().length(6, 'OTP must be 6 digits.'),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpInputSchema>;

const VerifyOtpOutputSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});
export type VerifyOtpOutput = z.infer<typeof VerifyOtpOutputSchema>;


const verifyOtpFlow = ai.defineFlow({
    name: 'verifyOtpFlow',
    inputSchema: VerifyOtpInputSchema,
    outputSchema: VerifyOtpOutputSchema,
}, async (input) => {
    const stored = otpStore[input.mobile];

    if (!stored) {
        return { success: false, message: 'OTP not found or expired. Please request again.' };
    }

    if (Date.now() > stored.expires) {
        delete otpStore[input.mobile];
        return { success: false, message: 'OTP has expired. Please request again.' };
    }

    if (stored.otp === input.otp) {
        delete otpStore[input.mobile]; // OTP is single-use
        return { success: true, message: 'OTP verified successfully.' };
    }

    return { success: false, message: 'Invalid OTP. Please try again.' };
});

export async function verifyOtp(input: VerifyOtpInput): Promise<VerifyOtpOutput> {
    return await verifyOtpFlow(input);
}
