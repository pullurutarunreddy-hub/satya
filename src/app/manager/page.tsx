import { redirect } from 'next/navigation'

export default function ManagerPage() {
  // In a real app, you'd check for authentication here.
  // For now, we redirect to a dashboard page which will be built next.
  // If not logged in, you'd redirect to '/manager/login'
  redirect('/manager/dashboard')
}