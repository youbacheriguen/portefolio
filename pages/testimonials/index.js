import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchTestimonials, deleteTestimonial } from '../../store/slices/testimonialsSlice';

export default function Testimonials() {
  const dispatch = useDispatch();
  const { list: testimonials, loading } = useSelector((state) => state.testimonials);

  useEffect(() => { dispatch(fetchTestimonials()); }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce témoignage ?')) {
      dispatch(deleteTestimonial(id));
    }
  };

  return (
    <Layout title="Témoignages">
      <Head><title>Témoignages — Portfolio Youba</title></Head>

      <div className="section-header">
        <div className="section-title">Témoignages</div>
        <Link href="/testimonials/new" className="btn btn-primary btn-sm">+ Nouveau</Link>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement...</div>}

      {!loading && testimonials.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Aucun témoignage pour l'instant.</div>
          <Link href="/testimonials/new" className="btn btn-primary">Laisser un témoignage</Link>
        </div>
      )}

      {!loading && testimonials.length > 0 && (
        <div className="testimonial-list">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card fade-in">
              <div className="testi-header">
                <div className="testi-avatar">{t.name?.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-email">{t.email}</div>
                </div>
              </div>
              <p className="testi-message">"{t.message}"</p>
              <div className="testi-actions">
                <Link href={`/testimonials/${t.id}/edit`} className="btn btn-edit-outline btn-sm">Modifier</Link>
                <button onClick={() => handleDelete(t.id)} className="btn btn-del-outline btn-sm">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
