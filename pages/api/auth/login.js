import { initDB, User } from '../../../lib/initDB';
import { signToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  await initDB();

  const { email, password } = req.body;

  // Validation
  const errors = {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Adresse email invalide.';
  }
  if (!password || password.trim().length === 0) {
    errors.password = 'Le mot de passe est requis.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Erreurs de validation', errors });
  }

  try {
    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });

    if (!user) {
      return res.status(401).json({
        message: 'Erreurs de validation',
        errors: { email: 'Aucun compte trouvé avec cet email.' },
      });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({
        message: 'Erreurs de validation',
        errors: { password: 'Mot de passe incorrect.' },
      });
    }

    const token = signToken({ id: user.id, name: user.name, email: user.email });

    return res.status(200).json({
      message: 'Connexion réussie!',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer.' });
  }
}
