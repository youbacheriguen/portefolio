import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Navbar({ onOpenPhotoModal }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const navLinks = [
    {
      href: '/', label: 'Accueil',
      icon: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1.5L1 7h2v7h4v-4h2v4h4V7h2L8 1.5z"/></svg>,
    },
    {
      href: '/projects', label: 'Projets',
      icon: <svg viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>,
    },
    {
      href: '/testimonials', label: 'Témoignages',
      icon: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M2 2h12v9H9l-3 3V11H2V2z"/></svg>,
    },
  ];

  const authLinks = [
    {
      href: '/login', label: 'Connexion',
      icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"/></svg>,
    },
    {
      href: '/register', label: 'Inscription',
      icon: <svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5"/></svg>,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sb-top">
        <div className="sb-avatar-wrap">
          <div
            className="sb-avatar"
            onClick={onOpenPhotoModal}
            style={{ cursor: 'pointer' }}
            title="Changer la photo"
          >
            <span id="sbAvatarText">{user?.name?.charAt(0).toUpperCase() || 'Y'}</span>
            <img id="sbAvatarImg" alt="photo profil" />
          </div>
          <div
            className="sb-avatar-edit"
            onClick={onOpenPhotoModal}
            style={{ cursor: 'pointer' }}
            title="Changer la photo"
          >
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
              <path d="M11 2l3 3-8 8H3v-3l8-8z"/>
            </svg>
          </div>
        </div>
        <div className="sb-name">Youba Cheriguen</div>
        <div className="sb-role">Programmeur &amp; créateur web</div>
      </div>

      <nav className="sb-nav">
        <div className="sb-section">Principal</div>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sb-item${router.pathname === link.href ? ' active' : ''}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}

        <div className="sb-section">Compte</div>
        {authLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sb-item${router.pathname === link.href ? ' active' : ''}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="sb-bottom">
        <div className="sb-user">
          <div className="sb-uavatar" id="sbUavatar">
            <span id="sbUavatarText">{user?.name?.charAt(0).toUpperCase() || 'Y'}</span>
            <img id="sbUavatarImg" alt="" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sb-uname">Youba Cheriguen</div>
            <div className="sb-uemail">youba@email.com</div>
          </div>
          <button className="sb-logout-btn" onClick={handleLogout} title="Déconnexion">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 2h3a1 1 0 011 1v10a1 1 0 01-1 1h-3M7 11l3-3-3-3M10 8H3"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
