'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isVerified, setIsVerified] = useState<boolean>(false)

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const isVerified = localStorage.getItem('isVerified') === 'true';

        setIsVerified(isVerified)
        if (!userId || !isVerified) {
            router.push('/login');
        }
    }, [router]);

    return (
        <>
            {isVerified && children}
        </>
    );
}
