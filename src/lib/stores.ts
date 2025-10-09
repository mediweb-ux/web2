import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function isTheme(value: string | null): value is Theme {
    return value === 'light' || value === 'dark';
}

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>('light');
    let isInitialized = false;

    return {
        subscribe,

        init() {
            if (!browser || isInitialized) return;

            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            const initialTheme: Theme = isTheme(savedTheme)
                ? savedTheme
                : prefersDark
                ? 'dark'
                : 'light';

            set(initialTheme);

            // Apply theme to document
            document.documentElement.classList.toggle('dark', initialTheme === 'dark');

            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                if (!isTheme(localStorage.getItem('theme'))) {
                    const newTheme: Theme = e.matches ? 'dark' : 'light';
                    set(newTheme);
                    document.documentElement.classList.toggle('dark', newTheme === 'dark');
                }
            };

            mediaQuery.addEventListener('change', handleChange);
            isInitialized = true;

            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        },

        toggle() {
            update(currentTheme => {
                const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';

                if (browser) {
                    localStorage.setItem('theme', newTheme);
                    document.documentElement.classList.remove('dark');
                    if (newTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    }
                }

                return newTheme;
            });
        }
    };
}

export const theme = createThemeStore();

function createReducedMotionStore() {
    const { subscribe, set } = writable(false);

    return {
        subscribe,

        init() {
            if (!browser) return;

            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            set(mediaQuery.matches);

            const handleChange = (e: MediaQueryListEvent) => {
                set(e.matches);
            };

            mediaQuery.addEventListener('change', handleChange);

            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }
    };
}

export const prefersReducedMotion = createReducedMotionStore();