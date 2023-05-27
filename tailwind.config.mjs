import OpenColor from 'open-color';
import TailwindColors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    },
  ],
  theme: {
    colors: {
      ...OpenColor,
      primary: OpenColor.teal[5],
      current: TailwindColors.current,
      inherit: TailwindColors.inherit,
      transparent: TailwindColors.transparent,
    },
    extend: {
      maxWidth: {
        xxs: '16rem',
      },
    },
  },
  plugins: [],
}
