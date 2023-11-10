import "./globals.css";
import Navbar from "./components/navbar.js";
export const metadata = {
  title: "TeamMeUp",
  description: "Teameup Home Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
