export type ChitPlan = {
  id: string;
  title: string;
  capital: number;
  monthly: number;
  months: number;
  payoutRange: string;
  startDate: string; // ISO date string
  onboardingFee: number;
  liftingOption: string;
  joiningOpen: boolean;
  totalMembers: number; // Corresponds to maxSeats
};
