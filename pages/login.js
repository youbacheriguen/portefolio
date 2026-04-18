import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { loginUser, clearErrors } from '../store/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, fieldErrors, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => { dispatch(clearErrors()); }, []);

  const validate = (d) => {
    const e = {};
    if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Adresse email invalide.';
    if (!d.password || d.password.trim().length === 0) e.password = 'Le mot de passe est requis.';
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
    setTouched({ email: true, password: true });
    const errs = validate(form);
    setClientErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === 'fulfilled') router.push('/');
  };

  const allErrors = { ...clientErrors, ...fieldErrors };

  return (
    <>
      <Head><title>Connexion — Portfolio</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, background: 'var(--bg-hover)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 500, marginBottom: 8 }}>YC</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>Connexion</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>Accédez à votre espace portfolio</div>
          </div>

          <div className="form-card" style={{ maxWidth: '100%' }}>
            {error && !Object.keys(fieldErrors).length && <div className="alert-error-msg">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-group${allErrors.email ? ' has-error' : ''}`}>
                <label>Adresse email</label>
                <input type="email" name="email" placeholder="votre@email.com" value={form.email} onChange={handleChange} onBlur={handleBlur} />
                <div className="error-msg">⚠ {allErrors.email}</div>
              </div>
              <div className={`form-group${allErrors.password ? ' has-error' : ''}`}>
                <label>Mot de passe</label>
                <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} onBlur={handleBlur} />
                <div className="error-msg">⚠ {allErrors.password}</div>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Connexion...' : 'Se connecter →'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 13, fontSize: 12, color: 'var(--text-dim)' }}>
              Pas encore de compte ?{' '}
              <Link href="/register" style={{ color: 'var(--text-muted)' }}>Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
