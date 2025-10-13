import { useCallback, useEffect, useState } from 'react';

// You only need 'light' now
export type Appearance = 'dark';

// Just a dummy cookie setter (optional for SSR)
const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// Apply light theme only
const applyTheme = () => {
    if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('light');
    }
};

export function initializeTheme() {
    // Always apply light theme
    applyTheme();
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('dark');

    const updateAppearance = useCallback((mode: Appearance) => {
        // Always set to light
        setAppearance('dark');
        localStorage.setItem('appearance', 'dark');
        setCookie('appearance', 'dark');
        applyTheme();
    }, []);

    useEffect(() => {
        updateAppearance('dark');
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
