
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Psychological color system
				trustBlue: {
					100: '#E6F4FF',
					200: '#BDDDF9',
					300: '#64B5F6',
					400: '#42A5F5',
					500: '#1E88E5',
					600: '#1976D2',
					700: '#1565C0',
					800: '#0D47A1',
					900: '#0A2E66',
				},
				warmAccent: {
					100: '#FFF3E0',
					200: '#FFE0B2',
					300: '#FFCC80',
					400: '#FFB74D',
					500: '#FFA726',
					600: '#FB8C00',
					700: '#F57C00',
					800: '#EF6C00',
					900: '#E65100',
				},
				neutral: {
					50: '#F5F7FA',
					100: '#E4E8F0',
					200: '#D5DAE3',
					300: '#BBC3D4',
					400: '#8997B1',
					500: '#5E6E8C',
					600: '#475472',
					700: '#354264',
					800: '#1F2A43',
					900: '#111827',
					950: '#0A0F1A',
				},
				medilink: {
					50: '#e0f7ff',
					100: '#b8edff',
					200: '#85e0ff',
					300: '#55d4ff',
					400: '#36cbff',
					500: '#0eb5ff',
					600: '#0096ef',
					700: '#0078cc',
					800: '#0061a8',
					900: '#004c86',
					950: '#001a33',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(30, 136, 229, 0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(30, 136, 229, 0.8)' }
				},
				'trust-pulse': {
					'0%, 100%': { boxShadow: '0 0 0 rgba(30, 136, 229, 0)' },
					'50%': { boxShadow: '0 0 15px rgba(30, 136, 229, 0.6)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.7s ease-out',
				'fade-in-down': 'fade-in-down 0.7s ease-out',
				'slide-in-right': 'slide-in-right 0.7s ease-out',
				'slide-in-left': 'slide-in-left 0.7s ease-out',
				'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
				'float': 'float 6s infinite ease-in-out',
				'glow': 'glow 2s infinite ease-in-out',
				'trust-pulse': 'trust-pulse 3s infinite ease-in-out',
			},
			boxShadow: {
				'glass': '0 0 15px 0 rgba(30, 136, 229, 0.3)',
				'glass-lg': '0 0 30px 0 rgba(30, 136, 229, 0.4)',
				'soft': '0 2px 15px rgba(0, 0, 0, 0.5)',
				'soft-lg': '0 5px 30px rgba(0, 0, 0, 0.7)',
				'neon': '0 0 5px rgba(30, 136, 229, 0.7), 0 0 10px rgba(30, 136, 229, 0.5), 0 0 15px rgba(30, 136, 229, 0.3)',
				'neon-lg': '0 0 10px rgba(30, 136, 229, 0.7), 0 0 20px rgba(30, 136, 229, 0.5), 0 0 30px rgba(30, 136, 229, 0.3)',
				'trust': '0 0 0 1px rgba(30, 136, 229, 0.2), 0 4px 12px rgba(30, 136, 229, 0.1)',
				'trust-hover': '0 0 0 1px rgba(30, 136, 229, 0.3), 0 6px 16px rgba(30, 136, 229, 0.2)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'trust-gradient': 'linear-gradient(135deg, #1E88E5, #64B5F6)',
				'warm-gradient': 'linear-gradient(135deg, #FFA726, #FB8C00)',
				'dark-gradient': 'linear-gradient(135deg, #111827, #1F2A43)',
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			},
			transitionTimingFunction: {
				'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'bounce-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
				'serif': ['Merriweather', 'serif'],
				'mono': ['Roboto Mono', 'monospace'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
