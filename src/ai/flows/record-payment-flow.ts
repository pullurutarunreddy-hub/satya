'use server';
/**
 * @fileOverview A flow for recording a payment and notifying the customer.
 *
 * - recordPayment - A function that handles recording a payment and sending an SMS.
 * - RecordPaymentInput - The input type for the recordPayment function.
 * - RecordPaymentOutput - The return type for the recordPayment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RecordPaymentInputSchema = z.object({
  subscriptionId: z.string().describe('The ID of the subscription the payment is for.'),
  member: z.object({
    name: z.string().describe("The member's name."),
    mobile: z.string().describe("The member's mobile number."),
  }),
  amount: z.number().describe('The payment amount.'),
  date: z.string().describe('The date of the payment in ISO format.'),
  method: z.enum(['cash', 'upi', 'card']).describe('The payment method.'),
  txnRef: z.string().optional().describe('The transaction reference, if any.'),
});
export type RecordPaymentInput = z.infer<typeof RecordPaymentInputSchema>;

const RecordPaymentOutputSchema = z.object({
  success: z.boolean().describe('Whether the payment was recorded successfully.'),
  message: z.string().describe('A message detailing the result.'),
});
export type RecordPaymentOutput = z.infer<typeof RecordPaymentOutputSchema>;


const sendSmsTool = ai.defineTool(
    {
      name: 'sendSms',
      description: 'Sends an SMS message to a specified mobile number.',
      inputSchema: z.object({
        to: z.string().describe('The 10-digit mobile number to send the SMS to.'),
        body: z.string().describe('The content of the SMS message.'),
      }),
      outputSchema: z.object({
        success: z.boolean(),
      }),
    },
    async (input) => {
      console.log(`Simulating SMS to ${input.to}: "${input.body}"`);
      // In a real implementation, you would integrate with an SMS provider like Twilio.
      // const twilio = require('twilio');
      // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      // try {
      //   await client.messages.create({
      //     body: input.body,
      //     from: process.env.TWILIO_FROM_NUMBER,
      //     to: `+91${input.to}`,
      //   });
      //   return { success: true };
      // } catch (error) {
      //   console.error('Failed to send SMS:', error);
      //   return { success: false };
      // }
      return { success: true }; // Assume success for simulation
    }
  );

const recordPaymentPrompt = ai.definePrompt({
    name: 'recordPaymentPrompt',
    input: { schema: RecordPaymentInputSchema },
    output: { schema: RecordPaymentOutputSchema },
    tools: [sendSmsTool],
    system: `You are an assistant for a chit fund company. 
    Your task is to record a payment and confirm it with the user.
    First, you MUST use the sendSms tool to send a confirmation SMS to the customer.
    The SMS should be polite and confirm the amount received.
    
    Example SMS: "Dear {customer_name}, we have received your payment of ₹{amount}. Thank you for your payment. - ChitConnect"
    
    After sending the SMS, respond with a success message for the manager.`,
});


const recordPaymentFlow = ai.defineFlow(
  {
    name: 'recordPaymentFlow',
    inputSchema: RecordPaymentInputSchema,
    outputSchema: RecordPaymentOutputSchema,
  },
  async (input) => {
    
    console.log('Recording payment in database (simulation)...', input);
    // In a real app, you would have database logic here to:
    // 1. Create a `payments` document.
    // 2. Update the `subscriptions` document with new totals.
    // This would all happen inside a Firestore transaction.
    
    const llmResponse = await recordPaymentPrompt(input);

    return llmResponse.output!;
  }
);


export async function recordPayment(input: RecordPaymentInput): Promise<RecordPaymentOutput> {
    return await recordPaymentFlow(input);
}
