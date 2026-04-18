import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { registerUser, clearErrors } from '../store/slices/authSlice';

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, fieldErrors, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => { dispatch(clearErrors()); }, []);

  const validate = (d) => {
    const e = {};
    if (!d.name || d.name.trim().length < 2) e.name = 'Le nom doit contenir au moins 2 caractères.';
    if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Adresse email invalide.';
    if (!d.password || d.password.length < 6) e.password = 'Le mot de passe doit contenir au moins 6 caractères.';
    if (d.confirmPassword !== d.password) e.confirmPassword = 'Les mots de passe ne correspondent pas.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) setClientErrors(validate(updated));
  };
  const handleBlur = (e) => { setTouched((p) => ({ ...p, [e.target.name]: true })); setClientErrors(validate(form)); };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    const errs = validate(form);
    setClientErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const { confirmPassword, ...payload } = form;
    const result = await dispatch(registerUser(payload));
    if (result.meta.requestStatus === 'fulfilled') router.push('/');
  };

  const allErrors = { ...clientErrors, ...fieldErrors };

  return (
    <>
      <Head><title>Inscription — Portfolio</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, background: 'var(--bg-hover)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 500, marginBottom: 8 }}>YC</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>Créer un compte</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>Rejoignez le portfolio de Youba</div>
          </div>

          <div className="form-card" style={{ maxWidth: '100%' }}>
            {error && !Object.keys(fieldErrors).length && <div className="alert-error-msg">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              {[
                { name: 'name', label: 'Nom complet', type: 'text', placeholder: 'Votre nom' },
                { name: 'email', label: 'Adresse email', type: 'email', placeholder: 'votre@email.com' },
                { name: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Minimum 6 caractères' },
                { name: 'confirmPassword', label: 'Confirmer le mot de passe', type: 'password', placeholder: 'Répétez le mot de passe' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className={`form-group${allErrors[name] ? ' has-error' : ''}`}>
                  <label>{label}</label>
                  <input type={type} name={name} placeholder={placeholder} value={form[name]} onChange={handleChange} onBlur={handleBlur} />
                  <div className="error-msg">⚠ {allErrors[name]}</div>
                </div>
              ))}
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Création...' : 'Créer mon compte →'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 13, fontSize: 12, color: 'var(--text-dim)' }}>
              Déjà un compte ?{' '}
              <Link href="/login" style={{ color: 'var(--text-muted)' }}>Se connecter</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
