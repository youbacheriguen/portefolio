import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const skills = ['React', 'Next.js', 'Node.js', 'JavaScript', 'TypeScript', 'Redux', 'SQL', 'MongoDB', 'Git', 'Tailwind CSS'];

export default function Home() {
  return (
    <Layout title="Accueil">
      <Head>
        <title>Youba Cheriguen — Portfolio</title>
        <meta name="description" content="Portfolio de Youba Cheriguen, programmeur et créateur web" />
      </Head>

      {/* HERO */}
      <div className="hero-grid">
        <div>
          <div className="hero-greeting">Bienvenue sur mon portfolio</div>
          <div className="hero-name">Youba Cheriguen</div>
          <div className="hero-role">Programmeur &amp; créateur web</div>
          <p className="hero-desc">
            Passionné par la création d'applications web modernes et performantes.
            Je transforme des idées en expériences numériques mémorables.
          </p>
          <div className="skills-wrap">
            {skills.map((s) => <span key={s} className="skill-tag">{s}</span>)}
          </div>
          <div className="hero-btns">
            <Link href="/projects" className="btn btn-primary">Voir mes projets</Link>
            <Link href="/testimonials" className="btn btn-secondary">Témoignages</Link>
          </div>
        </div>

        <div className="hero-avatar-wrap">
          <div className="hero-avatar">
            <span id="heroAvatarText">YC</span>
            <img id="heroAvatarImg" alt="photo profil" />
          </div>
          <PhotoButton />
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">3</div>
          <div className="stat-label">Projets réalisés</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">2+</div>
          <div className="stat-label">Ans d'expérience</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">10+</div>
          <div className="stat-label">Technologies maîtrisées</div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="services-grid">
        {[
          { icon: '💻', title: 'Développement web', desc: "Applications React, Next.js et Node.js. Code propre et maintenable." },
          { icon: '🎨', title: 'Design UI/UX', desc: "Interfaces modernes, élégantes et centrées sur l'utilisateur." },
          { icon: '🗄️', title: 'Backend & API', desc: "APIs RESTful robustes avec bases de données SQL et NoSQL." },
          { icon: '📱', title: 'Responsive design', desc: "Sites parfaitement adaptés mobile, tablette et ordinateur." },
        ].map((s) => (
          <div key={s.title} className="service-card">
            <div className="service-icon">{s.icon}</div>
            <div className="service-title">{s.title}</div>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// Bouton qui ouvre le modal photo géré par Layout
function PhotoButton() {
  const handleClick = () => {
    // Déclenche un événement custom capté par Layout
    window.dispatchEvent(new CustomEvent('openPhotoModal'));
  };
  return (
    <button
      id="addPhotoBtn"
      className="btn-add-photo"
      onClick={handleClick}
      type="button"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3"/>
        <path d="M6 2h4l1 2h3v9H2V4h3l1-2z"/>
      </svg>
      Ajouter une photo
    </button>
  );
}
