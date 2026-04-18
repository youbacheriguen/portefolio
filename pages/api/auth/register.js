import { initDB, User } from '../../../lib/initDB';
import { signToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  await initDB();

  const { name, email, password } = req.body;

  // Validation
  const errors = {};
  if (!name || name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères.';
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Adresse email invalide.';
  }
  if (!password || password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Erreurs de validation', errors });
  }

  try {
    // Check if email already exists
    const existing = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(400).json({
        message: 'Erreurs de validation',
        errors: { email: 'Cette adresse email est déjà utilisée.' },
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    });

    const token = signToken({ id: user.id, name: user.name, email: user.email });

    return res.status(201).json({
      message: 'Compte créé avec succès!',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer.' });
  }
}
