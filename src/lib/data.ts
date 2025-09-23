import type { ChitPlan } from './types';

const chitPlans: ChitPlan[] = [
  {
    id: '1-lakh-20-months',
    title: '1 Lakh Chitti',
    capital: 100000,
    monthlyPayment: 5000,
    duration: 20,
    payoutRange: {
      min: 96000,
      max: 115000,
    },
    startDate: '2024-09-01T00:00:00.000Z',
    onboardingFee: 1000,
    liftingOptions: 'Monthly Auction / Lottery',
    totalMembers: 20,
    payoutSchedule: Array.from({ length: 20 }, (_, i) => ({
      month: i + 1,
      amount: 96000 + Math.floor(Math.random() * (115000 - 96000))
    })),
  },
  {
    id: '2-lakh-20-months',
    title: '2 Lakh Chitti',
    capital: 200000,
    monthlyPayment: 10000,
    duration: 20,
    payoutRange: {
      min: 192000,
      max: 230000,
    },
    startDate: '2024-09-15T00:00:00.000Z',
    onboardingFee: 2000,
    liftingOptions: 'Monthly Auction',
    totalMembers: 20,
    payoutSchedule: Array.from({ length: 20 }, (_, i) => ({
      month: i + 1,
      amount: 192000 + Math.floor(Math.random() * (230000 - 192000))
    })),
  },
  {
    id: '1-lakh-25-months',
    title: '1 Lakh Chitti (25m)',
    capital: 100000,
    monthlyPayment: 4000,
    duration: 25,
    payoutRange: {
      min: 96000,
      max: 115000,
    },
    startDate: '2024-10-01T00:00:00.000Z',
    onboardingFee: 1000,
    liftingOptions: 'Monthly Auction / Lottery',
    totalMembers: 25,
    payoutSchedule: Array.from({ length: 25 }, (_, i) => ({
      month: i + 1,
      amount: 96000 + Math.floor(Math.random() * (115000 - 96000))
    })),
  },
  {
    id: '2-lakh-25-months',
    title: '2 Lakh Chitti (25m)',
    capital: 200000,
    monthlyPayment: 8000,
    duration: 25,
    payoutRange: {
      min: 190000,
      max: 225000,
    },
    startDate: '2024-10-15T00:00:00.000Z',
    onboardingFee: 2000,
    liftingOptions: 'Monthly Auction',
    totalMembers: 25,
    payoutSchedule: Array.from({ length: 25 }, (_, i) => ({
      month: i + 1,
      amount: 190000 + Math.floor(Math.random() * (225000 - 190000))
    })),
  },
];

export function getChitPlans(): ChitPlan[] {
  return chitPlans;
}

export function getChitPlanById(id: string): ChitPlan | undefined {
  return chitPlans.find(plan => plan.id === id);
}
