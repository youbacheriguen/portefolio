import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { fetchProject, clearCurrent } from '../../store/slices/projectsSlice';

export default function ProjectDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { current: project, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (id) dispatch(fetchProject(id));
    return () => dispatch(clearCurrent());
  }, [id, dispatch]);

  const technologies = project
    ? Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]')
    : [];

  return (
    <Layout title="Détail du projet">
      <Head><title>{project ? `${project.title} — Portfolio` : 'Projet'}</title></Head>

      <Link href="/projects" className="back-link">‹ Retour aux projets</Link>

      {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement...</div>}
      {error && <div className="alert-error-msg">{error}</div>}

      {!loading && project && (
        <div className="detail-card fade-in">
          <div className="detail-banner">{project.emoji}</div>
          <div className="detail-body">
            <div className="detail-title">{project.title}</div>
            <p className="detail-description">{project.description}</p>
            <div className="tech-label">Technologies utilisées</div>
            <div className="tags-wrap">
              {technologies.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="detail-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Voir en ligne
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
