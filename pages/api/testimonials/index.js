import { initDB, Testimonial } from '../../../lib/initDB';
import { requireAuth } from '../../../lib/auth';

async function handler(req, res) {
  await initDB();

  if (req.method === 'GET') {
    try {
      const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
      return res.status(200).json(testimonials);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const errors = {};
    if (!name || name.trim().length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Adresse email invalide.';
    }
    if (!message || message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Erreurs de validation', errors });
    }

    try {
      const testimonial = await Testimonial.create({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      return res.status(201).json(testimonial);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}

export default requireAuth(handler);
