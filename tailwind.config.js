module.exports = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	media: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: {
				'seas-lg': "url('/assets/assistencia-social-lg.jpg')",
				'seas-sm': "url('/assets/assistencia-social-sm.jpg')",
			},
			animation: {
				bounce200: 'bounce 1s infinite 200ms',
				bounce400: 'bounce 1s infinite 400ms',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
