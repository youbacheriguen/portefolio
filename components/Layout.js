import Navbar from './Navbar';
import Footer from './Footer';
import { useRef, useState, useEffect } from 'react';

export default function Layout({ children, title = 'Accueil' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [previewName, setPreviewName] = useState('');
  const fileInputRef = useRef(null);

  // Listen for custom event dispatched by child pages (photo button on home)
  useEffect(() => {
    const handler = () => setModalOpen(true);
    window.addEventListener('openPhotoModal', handler);
    return () => window.removeEventListener('openPhotoModal', handler);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setPendingUrl(null);
    setPreviewName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onFileSelected = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPendingUrl(url);
    setPreviewName(file.name);
  };

  const applyPhoto = (url) => {
    const imgIds = ['sbAvatarImg', 'heroAvatarImg', 'sbUavatarImg'];
    const txtIds = ['sbAvatarText', 'heroAvatarText', 'sbUavatarText'];
    imgIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (url) { el.src = url; el.classList.add('loaded'); }
      else { el.src = ''; el.classList.remove('loaded'); }
    });
    txtIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = url ? 'none' : '';
    });
    const btn = document.getElementById('addPhotoBtn');
    if (btn) {
      btn.textContent = url ? 'Modifier la photo' : 'Ajouter une photo';
    }
  };

  const confirmPhoto = () => {
    if (!pendingUrl) { closeModal(); return; }
    applyPhoto(pendingUrl);
    setHasPhoto(true);
    closeModal();
  };

  const removePhoto = () => {
    applyPhoto(null);
    setHasPhoto(false);
    closeModal();
  };

  return (
    <>
      {/* PHOTO MODAL */}
      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0d2452', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 12, padding: 24, width: 320,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              Changer la photo de profil
            </div>
            <p style={{ fontSize: 11, color: '#4a7ab5', marginBottom: 18 }}>
              Choisissez une image depuis votre appareil.
            </p>

            {!pendingUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '1.5px dashed rgba(255,255,255,0.2)', borderRadius: 12,
                  padding: '32px 16px', textAlign: 'center', cursor: 'pointer',
                  marginBottom: 14,
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(55,138,221,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#378ADD" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                </div>
                <div style={{ fontSize: 12, color: '#7ba7d8', marginBottom: 4 }}>
                  Cliquez pour choisir une photo
                </div>
                <div style={{ fontSize: 10, color: '#2a5a9e' }}>JPG, PNG, WEBP — max 5 MB</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <img
                  src={pendingUrl}
                  alt="preview"
                  style={{
                    width: 88, height: 88, borderRadius: '50%',
                    objectFit: 'cover', border: '3px solid #378ADD',
                    display: 'block', margin: '0 auto 8px',
                  }}
                />
                <div style={{ fontSize: 11, color: '#7ba7d8', marginBottom: 6 }}>{previewName}</div>
                <button
                  onClick={() => {
                    setPendingUrl(null);
                    setPreviewName('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  style={{
                    fontSize: 10, color: '#4a7ab5', background: 'none',
                    border: 'none', cursor: 'pointer', textDecoration: 'underline',
                  }}
                >
                  Choisir une autre photo
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={onFileSelected}
            />

            {hasPhoto && (
              <button
                onClick={removePhoto}
                style={{
                  width: '100%', padding: '7px 0',
                  background: 'rgba(255,80,80,0.1)', color: '#ff6b6b',
                  border: '0.5px solid rgba(255,80,80,0.3)',
                  borderRadius: 8, fontSize: 11, cursor: 'pointer', marginBottom: 10,
                }}
              >
                Supprimer la photo actuelle
              </button>
            )}

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={confirmPhoto}
                disabled={!pendingUrl}
                style={{
                  flex: 1, padding: '9px 0',
                  background: pendingUrl ? '#378ADD' : '#1e4080',
                  color: '#fff', border: 'none', borderRadius: 8,
                  fontSize: 12, fontWeight: 500,
                  cursor: pendingUrl ? 'pointer' : 'not-allowed',
                }}
              >
                Appliquer
              </button>
              <button
                onClick={closeModal}
                style={{
                  flex: 1, padding: '9px 0',
                  background: 'transparent', color: '#7ba7d8',
                  border: '0.5px solid rgba(255,255,255,0.2)',
                  borderRadius: 8, fontSize: 12, cursor: 'pointer',
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="app-layout">
        <Navbar onOpenPhotoModal={() => setModalOpen(true)} />
        <div className="main-content">
          <div className="topbar">
            <span className="topbar-title">{title}</span>
            <div className="tb-badge">
              <div className="tb-dot"></div>
              Disponible
            </div>
          </div>
          <div className="page-content fade-in">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
