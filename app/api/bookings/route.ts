import { proxyStudio } from '@/lib/studio-backend';
export const dynamic = 'force-dynamic';
export function POST(request: Request) { return proxyStudio(request, '/api/bookings'); }
