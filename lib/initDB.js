const sequelize = require('./database');
const User = require('../models/User');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');

let initialized = false;

async function initDB() {
  if (initialized) return;
  initialized = true;

  try {
    await sequelize.sync({ alter: true });

    // Seed projects if empty
    const count = await Project.count();
    if (count === 0) {
      await Project.bulkCreate([
        {
          title: 'ShopEasy – E-Commerce Platform',
          description: 'A full-stack e-commerce platform with product catalog, shopping cart, Stripe payment integration, and admin dashboard. Built with React, Node.js and PostgreSQL.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redux', 'Tailwind CSS'],
          githubUrl: 'https://github.com/youba/shopeasy',
          liveUrl: 'https://shopeasy-demo.vercel.app',
          emoji: '🛍️',
        },
        {
          title: 'TaskFlow – Project Management',
          description: 'A Kanban-style project management tool with drag-and-drop boards, real-time collaboration via WebSockets, and team management features.',
          technologies: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind CSS', 'JWT'],
          githubUrl: 'https://github.com/youba/taskflow',
          liveUrl: 'https://taskflow-demo.vercel.app',
          emoji: '📋',
        },
        {
          title: 'WeatherApp – Météo en temps réel',
          description: 'Application météo moderne qui affiche les prévisions sur 7 jours avec géolocalisation, cartes interactives et alertes météo en temps réel.',
          technologies: ['React', 'OpenWeather API', 'Leaflet.js', 'CSS Modules', 'Axios'],
          githubUrl: 'https://github.com/youba/weatherapp',
          liveUrl: 'https://weatherapp-demo.vercel.app',
          emoji: '🌤️',
        },
      ]);
    }

    // Seed testimonials if empty
    const tCount = await Testimonial.count();
    if (tCount === 0) {
      await Testimonial.bulkCreate([
        {
          name: 'Sophie Martin',
          email: 'sophie.martin@example.com',
          message: "Un développeur exceptionnel ! Youba a livré notre projet dans les délais avec une qualité de code irréprochable. Très professionnel et à l'écoute.",
        },
        {
          name: 'Karim Bensalem',
          email: 'karim.b@example.com',
          message: 'Travail remarquable sur notre application mobile. Les animations sont fluides, le code est propre. Je recommande vivement !',
        },
      ]);
    }
  } catch (error) {
    console.error('DB init error:', error);
  }
}

module.exports = { initDB, User, Project, Testimonial };
