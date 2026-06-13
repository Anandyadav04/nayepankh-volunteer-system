"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Please check your email and password.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftContent}>
          <div className={styles.loginBrand}>
            <div className={styles.loginLogo}>NP</div>
            <h1 className={styles.loginBrandTitle}>NayePankh</h1>
            <p className={styles.loginBrandSub}>Foundation Admin Portal</p>
          </div>
          <div className={styles.loginQuote}>
            <p>"If we all do something, then together there is no problem that we cannot solve!"</p>
            <span>— Prashant Shukla, Founder</span>
          </div>
          <p className={styles.loginTagline}>Badalte Bharat Ki Nayi Tasveer</p>
        </div>
      </div>

      <div className={styles.loginRight}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h2 className={styles.loginTitle}>Welcome back</h2>
            <p className={styles.loginSubtitle}>Sign in to access the admin dashboard</p>
          </div>
          
          {error && (
            <div className={styles.loginError}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="login-email">Email Address</label>
              <input 
                id="login-email"
                type="email" 
                className="input-field" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@nayepankh.com"
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor="login-password">Password</label>
              <input 
                id="login-password"
                type="password" 
                className="input-field" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }} 
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className={styles.loginFooter}>
            <p>First time? Use <strong>admin@nayepankh.com</strong> to create your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
