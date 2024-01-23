
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
      },
      backgroundImage: {
        'goober-bg': "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmZzMmFzNXV5NGRmb3IzNW9vbWVjZmU0Y2N0bTdyMWkzYmc1OGJraCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BbSxLhu3UR2PG0VxKm/giphy.gif')",
      }
    },
  },
  plugins: [],
} satisfies Config;
