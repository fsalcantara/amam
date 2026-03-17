"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/authService';
import { UserRole } from '@/features/auth/types';
import ProductList from '@/features/admin/products/ProductList';

export default function Page() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/admin/login');
      return;
    }

    if (!authService.hasPermission(user, [UserRole.ADMIN])) {
      router.push('/admin');
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;

  return <ProductList />;
}
