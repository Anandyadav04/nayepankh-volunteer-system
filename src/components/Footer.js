import SmoothScrollLink from './SmoothScrollLink';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-title">NayePankh Foundation</div>
            <p className="footer-desc">
              A non-governmental organisation with a strong desire to help society and make it a better place for all. 
              We are one of the biggest student-led NGOs of India, providing food, sanitary napkins, clothes, and education to the underprivileged. 
              UP Government, 80G & 12A Registered NGO.
            </p>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            <a href="https://nayepankh.com" target="_blank" rel="noopener noreferrer" className="footer-link">Official Website</a>
            <SmoothScrollLink targetId="register" className="footer-link">Volunteer Registration</SmoothScrollLink>
            <a href="/login" className="footer-link">Admin Portal</a>
            <a href="https://nayepankh.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="footer-link">Terms & Conditions</a>
            <a href="https://nayepankh.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a>
          </div>
          <div>
            <div className="footer-heading">Contact Us</div>
            <a href="mailto:contact@nayepankh.com" className="footer-link">📧 contact@nayepankh.com</a>
            <a href="tel:+918318500748" className="footer-link">📱 +91-8318500748</a>
            <span className="footer-link">📍 Kanpur, Ghaziabad & other cities</span>
            <span className="footer-link" style={{ marginTop: '0.5rem', display: 'block', opacity: 0.5, fontSize: '0.75rem' }}>
              Donations are tax-exempted under 80G of the Indian Income Tax Act
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NayePankh Foundation. All rights reserved.</span>
          <span>Badalte Bharat Ki Nayi Tasveer 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}
