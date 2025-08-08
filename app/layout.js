import { Analytics } from "@vercel/analytics/next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "./_Components/clientSide/Header";
import Footer from "./_Components/clientSide/Footer";
import { MenuHamburgerContextProvider } from "./context/menuHamburgerContext";
import { FilterProductsContextProvider } from "./context/filterProductsContext";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import Modal from "./_Components/clientSide/modal/ModalYesNO";
import { Toaster } from "react-hot-toast";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400"] });
export const metadata = {
  title: "Shopping Digital - Vêtements, Tech & Accessoires Tendances",
  description: "Boutique en ligne tout-en-un : smartphones, ordinateurs, montres, sacs & mode à petits prix.",
  keywords: [
    "shopping en ligne",
    "acheter vêtements pas cher",
    "téléphones neufs",
    "ordinateurs portables",
    "montres connectées",
    "sacs tendance",
    "mode et tech",
    "e-commerce France",
    "boutique digitale",
  ],
  robots: "all",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={schibsted.className}>
        <AuthProvider>
          <ModalProvider>
            <MenuHamburgerContextProvider>
              <FilterProductsContextProvider>
                <Header />
                 <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
                {children}
                <Modal />
              </FilterProductsContextProvider>
            </MenuHamburgerContextProvider>
          </ModalProvider>
        </AuthProvider>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
