import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { fetchTestimonial, updateTestimonial, clearMessages, clearCurrent } from '../../../store/slices/testimonialsSlice';

export default function EditTestimonial() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { current, loading, fieldErrors, error, success } = useSelector((state) => state.testimonials);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    dispatch(clearMessages());
    if (id) dispatch(fetchTestimonial(id));
    return () => dispatch(clearCurrent());
  }, [id]);

  useEffect(() => { if (current) setForm({ name: current.name, email: current.email, message: current.message }); }, [current]);
  useEffect(() => { if (success) setTimeout(() => router.push('/testimonials'), 1400); }, [success]);

  const validate = (d) => {
    const e = {};
    if (!d.name || d.name.trim().length < 2) e.name = 'Le nom doit contenir au moins 2 caractères.';
    if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Adresse email invalide.';
    if (!d.message || d.message.trim().length < 10) e.message = 'Le message doit contenir au moins 10 caractères.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) setClientErrors(validate(updated));
  };
  const handleBlur = (e) => { setTouched((p) => ({ ...p, [e.target.name]: true })); setClientErrors(validate(form)); };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const errs = validate(form);
    setClientErrors(errs);
    if (Object.keys(errs).length === 0) dispatch(updateTestimonial({ id, data: form }));
  };

  const allErrors = { ...clientErrors, ...fieldErrors };

  return (
    <Layout title="Modifier le témoignage">
      <Head><title>Modifier le témoignage — Portfolio</title></Head>
      <Link href="/testimonials" className="back-link">‹ Retour</Link>

      <div className="form-card fade-in">
        <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>Modifier le témoignage</div>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 18 }}>Modifiez les informations ci-dessous.</p>

        {success && <div className="alert-success-msg show">✅ {success} Redirection...</div>}
        {error && !Object.keys(fieldErrors).length && <div className="alert-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {[
            { name: 'name', label: 'Nom complet', type: 'text' },
            { name: 'email', label: 'Adresse email', type: 'email' },
          ].map(({ name, label, type }) => (
            <div key={name} className={`form-group${allErrors[name] ? ' has-error' : ''}`}>
              <label>{label}</label>
              <input type={type} name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur} />
              <div className="error-msg">⚠ {allErrors[name]}</div>
            </div>
          ))}
          <div className={`form-group${allErrors.message ? ' has-error' : ''}`}>
            <label>Message</label>
            <textarea name="message" rows={4} value={form.message} onChange={handleChange} onBlur={handleBlur} style={{ resize: 'vertical' }} />
            <div className="error-msg">⚠ {allErrors.message}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading || !!success} style={{ flex: 1 }}>
              {loading ? 'Mise à jour...' : 'Enregistrer →'}
            </button>
            <Link href="/testimonials" className="btn btn-secondary">Annuler</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
