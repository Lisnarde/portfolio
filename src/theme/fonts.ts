import { Ubuntu, Ubuntu_Mono } from "next/font/google";

// Pour changer de police : remplacer l'import ci-dessus, le reste suit.
export const fontSans = Ubuntu({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const fontMono = Ubuntu_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
