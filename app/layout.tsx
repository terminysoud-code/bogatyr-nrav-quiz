import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Богатырский нрав — кто вы из героев былин?",
  description: "Психологический тест из 25 вопросов: узнайте свой архетип среди двенадцати героев русских былин.",
  openGraph: {
    title: "Богатырский нрав",
    description: "Кто вы из героев былин?",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Богатырский нрав — кто вы из героев былин?" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="ru"><body>{children}</body></html>;
}
