import { redirect } from 'next/navigation';

export default function AdminPage() {
    // In a real app, you would have authentication logic here.
    // For now, we redirect to the admin dashboard.
    redirect('/admin/dashboard');
}
