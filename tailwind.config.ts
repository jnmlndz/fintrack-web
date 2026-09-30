import type { Config } from 'tailwindcss';
import { brandColors } from './src/assets/styles/theme';

export default {
  theme: {
    extend: {
      colors: brandColors,
    },
  },
} satisfies Config;