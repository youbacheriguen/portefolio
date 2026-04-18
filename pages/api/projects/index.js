import { initDB, Project } from '../../../lib/initDB';
import { requireAuth } from '../../../lib/auth';

async function handler(req, res) {
  await initDB();

  if (req.method === 'GET') {
    try {
      const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}

export default requireAuth(handler);
