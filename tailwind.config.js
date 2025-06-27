/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			animation: {
				fadeIn: 'fadeIn 0.4s ease-out both',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0, transform: 'translateY(20px)' },
					'100%': { opacity: 1, transform: 'translateY(0)' },
				},
			},
			scale: {
				'200': '2'
			},
			width: {
				'66': '16.5rem',
				'30': '7.5rem',
				'53': '13.25rem',
				'71': '17.75rem',
			},
			margin: {
				'-15': '-3.75rem',
			},
			screens: {
				'md1': '1024px',
				'lg1': '1440px',
			},
		},
	},
	variants: {
		extend: {
			display: ['print'],
			visibility: ['print'],
			backgroundColor: ['print'],
			textColor: ['print'],
			borderColor: ['print'],
		},
	},
	plugins: [
		require('tailwind-scrollbar-hide')
	],
}