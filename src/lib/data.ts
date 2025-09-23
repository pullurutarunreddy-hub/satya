import type { ChitPlan } from './types';

const chitPlans: ChitPlan[] = [
  {
    id: '1-lakh-20-months',
    title: '1 Lakh Chitti (20 months)',
    capital: 100000,
    monthly: 5000,
    months: 20,
    payoutRange: '₹96,000 - ₹1,15,000',
    startDate: '2025-10-01T00:00:00.000Z',
    onboardingFee: 500,
    liftingOption: 'Auction',
    joiningOpen: true,
    totalMembers: 20,
  },
  {
    id: '2-lakh-20-months',
    title: '2 Lakh Chitti (20 months)',
    capital: 200000,
    monthly: 10000,
    months: 20,
    payoutRange: '₹1,92,000 - ₹2,30,000',
    startDate: '2025-11-01T00:00:00.000Z',
    onboardingFee: 1000,
    liftingOption: 'Lottery',
    joiningOpen: true,
    totalMembers: 20,
  },
  {
    id: '1-lakh-25-months',
    title: '1 Lakh Chitti (25 months)',
    capital: 100000,
    monthly: 4000,
    months: 25,
    payoutRange: '₹96,000 - ₹1,15,000',
    startDate: '2025-12-01T00:00:00.000Z',
    onboardingFee: 400,
    liftingOption: 'Auction',
    joiningOpen: true,
    totalMembers: 25,
  },
  {
    id: '2-lakh-25-months',
    title: '2 Lakh Chitti (25 months)',
    capital: 200000,
    monthly: 8000,
    months: 25,
    payoutRange: '₹1,92,000 - ₹2,30,000',
    startDate: '2026-01-01T00:00:00.000Z',
    onboardingFee: 800,
    liftingOption: 'Lottery',
    joiningOpen: true,
    totalMembers: 25,
  },
];

export function getChitPlans(): ChitPlan[] {
  return chitPlans;
}

export function getChitPlanById(id: string): ChitPlan | undefined {
  return chitPlans.find(plan => plan.id === id);
}
