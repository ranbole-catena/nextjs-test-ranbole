import "./globals.css";
import { Inter, Oswald } from "next/font/google";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Play USA POC",
  description: "A catena POC",
};

const Header = dynamic(
  () => {
    const theme = process.env.THEME;
    const path = `../themes/${theme}/home_page`;
    console.log("path");
    if (theme == "black") {
      return import(`./themes/black/home_page`);
    } else if (theme == "white") {
      return import(`./themes/white/header`);
    } else {
      return import(`./themes/black/home_page`);
    }
  },
  {
    loading: () => <p>Loading...</p>,
  },
);

const Footer = dynamic(
  () => {
    const theme = process.env.THEME;
    console.log("path");
    if (theme == "black") {
      return import(`./themes/black/footer`);
    } else if (theme == "white") {
      return import(`./themes/white/footer`);
    } else {
      return import(`./themes/black/footer`);
    }
  },
  {
    loading: () => <p>Loading...</p>,
  },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${oswald.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
