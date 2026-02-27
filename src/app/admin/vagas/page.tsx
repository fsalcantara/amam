"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { UserRole } from '@/features/auth/types';
import JobList from '@/features/admin/jobs/JobList';

export default function Page() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }

    if (!authService.hasPermission(user, [UserRole.HR, UserRole.ADMIN])) {
      router.push('/admin'); // Redirect to dashboard if unauthorized
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  return <JobList />;
}
