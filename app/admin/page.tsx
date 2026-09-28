import { redirect } from 'next/navigation';
import { studioBackend } from '@/lib/studio-backend';
export default function AdminPage() { redirect(`${studioBackend}/admin`); }
