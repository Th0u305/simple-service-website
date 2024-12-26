const {nextui} = require('@nextui-org/theme');
import {nextui} from "@nextui-org/react";
const withMT = require("@material-tailwind/react/utils/withMT");


/** @type {import('tailwindcss').Config} */

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         playFair: ["Playfair", "serif"],
//         Montserrat: ["Montserrat", "sans-serif"],
//       },
//     },

//   },
//   plugins: [nextui()],
// }


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        playFair: ["Playfair", "serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },

  },
  plugins: [nextui()],
});

