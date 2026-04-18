import { initDB, Testimonial } from '../../../lib/initDB';
import { requireAuth } from '../../../lib/auth';

async function handler(req, res) {
  await initDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const testimonial = await Testimonial.findByPk(id);
      if (!testimonial) return res.status(404).json({ message: 'Témoignage non trouvé' });
      return res.status(200).json(testimonial);
    } catch {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  if (req.method === 'PUT') {
    const { name, email, message } = req.body;

    const errors = {};
    if (!name || name.trim().length < 2) errors.name = 'Le nom doit contenir au moins 2 caractères.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Adresse email invalide.';
    if (!message || message.trim().length < 10) errors.message = 'Le message doit contenir au moins 10 caractères.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: 'Erreurs de validation', errors });
    }

    try {
      const testimonial = await Testimonial.findByPk(id);
      if (!testimonial) return res.status(404).json({ message: 'Témoignage non trouvé' });
      await testimonial.update({ name: name.trim(), email: email.trim(), message: message.trim() });
      return res.status(200).json(testimonial);
    } catch {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const testimonial = await Testimonial.findByPk(id);
      if (!testimonial) return res.status(404).json({ message: 'Témoignage non trouvé' });
      await testimonial.destroy();
      return res.status(200).json({ message: 'Témoignage supprimé' });
    } catch {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}

export default requireAuth(handler);
