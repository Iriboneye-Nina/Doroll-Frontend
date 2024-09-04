import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Logic to check if user is authenticated
        const checkAuth = async () => {
            // Simulate an authentication check (replace with actual logic)
            const user = localStorage.getItem('user');
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                router.push('/login');
            }
        };
        checkAuth();
    }, [router]);

    return { isAuthenticated };
}
