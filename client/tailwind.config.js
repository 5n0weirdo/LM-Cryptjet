const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{html,js,ts,tsx,jsx}',
    './src/components/**/*.{html,js,ts,tsx,jsx}',
    './**/*.{html,js,ts,tsx,jsx}',
  ],
  mode: "jit",
  media: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
	require("@tailwindcss/forms"),
    plugin(function ({ addVariant, e, postcss }) {
	  addVariant('firefox', ({ container, separator }) => {
		const isFirefoxRule = postcss.atRule({
		  name: '-moz-document',
		  params: 'url-prefix()',
		});
		isFirefoxRule.append(container.nodes);
		container.append(isFirefoxRule);
		isFirefoxRule.walkRules((rule) => {
		  rule.selector = `.${e(
			`firefox${separator}${rule.selector.slice(1)}`
		  )}`;
		});
	  });
	}),
  ],
}