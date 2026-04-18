import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { fetchProjects } from '../../store/slices/projectsSlice';

export default function Projects() {
  const dispatch = useDispatch();
  const { list: projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  return (
    <Layout title="Projets">
      <Head><title>Projets — Portfolio Youba</title></Head>

      <div className="section-header">
        <div className="section-title">Mes projets</div>
        <span className="section-count">{projects.length} projets</span>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Chargement...</div>}
      {error && <div className="alert-error-msg">{error}</div>}

      {!loading && (
        <div className="project-list">
          {projects.map((project) => {
            const techs = Array.isArray(project.technologies)
              ? project.technologies
              : JSON.parse(project.technologies || '[]');
            return (
              <Link key={project.id} href={`/projects/${project.id}`} className="project-row">
                <div className="project-icon">{project.emoji}</div>
                <div className="project-info">
                  <div className="project-title">{project.title}</div>
                  <div className="project-desc">{project.description}</div>
                  <div className="tags-wrap">
                    {techs.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <span className="project-arrow">›</span>
              </Link>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
