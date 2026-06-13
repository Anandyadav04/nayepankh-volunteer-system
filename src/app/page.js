import styles from './page.module.css';
import VolunteerForm from '@/components/VolunteerForm';
import SmoothScrollLink from '@/components/SmoothScrollLink';

export default function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <header className={styles.hero}>
        <div className={`${styles.heroContent} animate-fade-in`}>
          <div className={styles.heroBadge}>🏛️ UP Govt. Registered | 80G & 12A Certified NGO</div>
          <h1 className={styles.heroTitle}>
            Giving <span className={styles.heroHighlight}>Wings</span> to Uplift the Underprivileged
          </h1>
          <p className={styles.heroSubtitle}>
            NayePankh Foundation — one of India's biggest student-led NGOs. 
            Started by a group of high schoolers during COVID-19, now serving across multiple cities. 
            We are 'Badalte Bharat Ki Nayi Tasveer'!
          </p>
          <div className={styles.heroActions}>
            <SmoothScrollLink targetId="register" className="btn btn-primary btn-lg" isButton>
              Join Our Team
            </SmoothScrollLink>
            <SmoothScrollLink targetId="about" className="btn btn-outline-white btn-lg" isButton>
              Learn Our Story
            </SmoothScrollLink>
          </div>
        </div>
      </header>

      {/* ===== Stats Bar ===== */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={`${styles.statItem} animate-fade-in-delay-1`}>
              <div className={styles.statNumber}>2L+</div>
              <div className={styles.statText}>Lives Impacted</div>
            </div>
            <div className={`${styles.statItem} animate-fade-in-delay-2`}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statText}>Active Volunteers</div>
            </div>
            <div className={`${styles.statItem} animate-fade-in-delay-3`}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statText}>Cities Covered</div>
            </div>
            <div className={`${styles.statItem} animate-fade-in-delay-3`}>
              <div className={styles.statNumber}>2021</div>
              <div className={styles.statText}>Founded (28 March)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section className={styles.aboutSection} id="about">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Story</span>
            <h2 className={styles.sectionTitle}>How It All Started</h2>
            <p className={styles.sectionSubtitle}>
              From a group of high schoolers during COVID-19 to one of India's biggest student-led NGOs
            </p>
          </div>

          <div className={styles.aboutGrid}>
            <div className={`${styles.aboutCard} animate-fade-in`}>
              <div className={styles.aboutCardIcon}>🌱</div>
              <h3 className={styles.aboutCardTitle}>The Beginning</h3>
              <p className={styles.aboutCardText}>
                2020 — the world was striving to survive COVID-19. During these dire times, we felt an urge to make an impact with whatever we had. We tried to uplift the underprivileged and help the needy with all our resources. It was tough, but we didn't lose hope.
              </p>
            </div>
            <div className={`${styles.aboutCard} animate-fade-in-delay-1`}>
              <div className={styles.aboutCardIcon}>🚀</div>
              <h3 className={styles.aboutCardTitle}>The Launch</h3>
              <p className={styles.aboutCardText}>
                28th March 2021 — the day we officially landed on the ground. We started as a bunch of high schoolers but are now a team of numerous people from different parts of the city and state, serving our duties as the youth of the nation.
              </p>
            </div>
            <div className={`${styles.aboutCard} animate-fade-in-delay-2`}>
              <div className={styles.aboutCardIcon}>🪽</div>
              <h3 className={styles.aboutCardTitle}>NayePankh Today</h3>
              <p className={styles.aboutCardText}>
                Now a 12A and 80G certified NGO, we provide food, sanitary napkins, clothes, and education to underprivileged sectors. We run hygiene awareness campaigns, distribute food to the needy and stray animals, and have impacted over two lakh lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== What We Do Section ===== */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Initiatives</span>
            <h2 className={styles.sectionTitle}>What We Do</h2>
            <p className={styles.sectionSubtitle}>
              Making this earth a better place to live for all creatures
            </p>
          </div>

          <div className={styles.servicesGrid}>
            <div className={`${styles.serviceCard} animate-fade-in`}>
              <div className={styles.serviceIcon}>🍲</div>
              <h4 className={styles.serviceTitle}>Food Distribution</h4>
              <p className={styles.serviceText}>Distributing food to underprivileged communities and stray animals to fight hunger.</p>
            </div>
            <div className={`${styles.serviceCard} animate-fade-in-delay-1`}>
              <div className={styles.serviceIcon}>🩺</div>
              <h4 className={styles.serviceTitle}>Hygiene Awareness</h4>
              <p className={styles.serviceText}>Creating awareness about personal hygiene and providing sanitary napkins to women and youth.</p>
            </div>
            <div className={`${styles.serviceCard} animate-fade-in-delay-2`}>
              <div className={styles.serviceIcon}>📚</div>
              <h4 className={styles.serviceTitle}>Education</h4>
              <p className={styles.serviceText}>Educating underprivileged children for a brighter and better future.</p>
            </div>
            <div className={`${styles.serviceCard} animate-fade-in-delay-3`}>
              <div className={styles.serviceIcon}>👕</div>
              <h4 className={styles.serviceTitle}>Clothing Drives</h4>
              <p className={styles.serviceText}>Providing clothes and essential supplies to poor families across multiple cities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Registration Section ===== */}
      <main className={styles.content} id="register">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Join the Movement</span>
            <h2 className={styles.sectionTitle}>Become a NayePankh Volunteer</h2>
            <p className={styles.sectionSubtitle}>
              We are completely led by the youth — many still in colleges and schools. There's a place for you too.
            </p>
          </div>

          <div className={styles.grid}>
            {/* Left: Info Card */}
            <div className={`${styles.infoCard} animate-fade-in`}>
              <div className={styles.infoCardHeader}>
                <div className={styles.infoCardIcon}>🤝</div>
                <h3>Why Join Us?</h3>
              </div>
              <p>
                At NayePankh Foundation, we are committed to creating positive change. The most striking feature about us is that we are completely led by the youth of our country. By joining, you become part of 'Badalte Bharat Ki Nayi Tasveer'.
              </p>
              <ul className={styles.benefitsList}>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  Work with a UP Govt., 80G & 12A registered NGO (50% tax relief on donations!)
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  Make a direct impact in food, hygiene, education, and clothing drives
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  Join a team of passionate youth from across multiple cities and states
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.benefitCheck}>✓</span>
                  Receive certificates and letters of recommendation for your contribution
                </li>
              </ul>

              <div className={styles.quoteCard}>
                <p className={styles.quoteText}>
                  "The main hope of a nation lies in the arms of its youth. If we all do something, then together there is no problem that we cannot solve!"
                </p>
                <div className={styles.quoteAuthor}>
                  <strong>Prashant Shukla</strong>
                  Founder & President, NayePankh Foundation
                </div>
              </div>
            </div>

            {/* Right: Registration Form */}
            <div className={styles.formCard} id="register-form">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
