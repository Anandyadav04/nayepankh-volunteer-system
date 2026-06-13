import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NayePankh Foundation | Volunteer Registration System",
  description: "Join NayePankh Foundation — one of the biggest student-led NGOs of India. Started during COVID-19 by high schoolers, now a 12A & 80G registered NGO providing food, education, hygiene awareness, and clothing to the underprivileged. Register as a volunteer today!",
  keywords: "NayePankh, NGO, Volunteer, India, Student-led, Foundation, Community, COVID, Education, Hygiene, Kanpur, Ghaziabad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
