import { initDB, Project } from '../../../lib/initDB';
import { requireAuth } from '../../../lib/auth';

async function handler(req, res) {
  await initDB();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}

export default requireAuth(handler);
