/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"src/pages/**/*.{ts,tsx}",
		"src/components/**/*.{ts,tsx}",
		"pages/**/*.{ts,tsx}",
		"components/**/*.{ts,tsx}",
		"node_modules/daisyui/dist/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				"rounded-btn": "var(--rounded-btn)",
				"rounded-box": "var(--rounded-box)",
			},
		},
	},
	// safelist: [...[...Array(50).keys()].flatMap((i) => [`max-w-[${i * 10}px]`])],
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			"light",
			"dark",
			"cupcake",
			"bumblebee",
			"emerald",
			"corporate",
			"synthwave",
			"retro",
			"cyberpunk",
			"valentine",
			"halloween",
			"garden",
			"forest",
			"aqua",
			"lofi",
			"pastel",
			"fantasy",
			"wireframe",
			"black",
			"luxury",
			"dracula",
			"cmyk",
			"autumn",
			"business",
			"acid",
			"lemonade",
			"night",
			"coffee",
			"winter",
		],
	},
};
