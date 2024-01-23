
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
      },
      backgroundImage: {
        'goober-bg': "url('public/bg.gif')",
      }
    },
  },
  plugins: [],
} satisfies Config;
