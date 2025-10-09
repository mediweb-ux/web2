export type Theme = 'light' | 'dark';

export interface ThemeStore {
	subscribe: (callback: (theme: Theme) => void) => () => void;
	set: (theme: Theme) => void;
	toggle: () => void;
}