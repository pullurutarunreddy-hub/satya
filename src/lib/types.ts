export type ChitPlan = {
  id: string;
  title: string;
  capital: number;
  monthlyPayment: number;
  duration: number; // in months
  payoutRange: {
    min: number;
    max: number;
  };
  startDate: string; // ISO date string
  onboardingFee: number;
  liftingOptions: string;
  payoutSchedule: { month: number; amount: number }[];
  totalMembers: number;
};
