import "./globals.css";
import Navbar from "./components/navbar.js";
import { AuthProvider } from "./provider";

export const metadata = {
  title: "TeamMeUp",
  description: "Teameup Home Page",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
