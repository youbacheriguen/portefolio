# 🚀 Portfolio – Youba Cheriguen

Portfolio personnel développé avec **Next.js**, **Redux Toolkit**, **Sequelize** et **SQLite**.

---

## ✨ Fonctionnalités

- **Page d'accueil** : photo/avatar, présentation, compétences
- **Header/Footer** : navigation, liens GitHub & LinkedIn
- **Projets** : liste + détails, données provenant du backend (Next API)
- **Inscription / Connexion** : formulaires validés, JWT
- **Témoignages** : liste, ajout et modification de témoignages
- **Protection des routes** : toutes les pages sauf `/login` et `/register` nécessitent une authentification
- **Redux Toolkit** : gestion du state global (auth, projets, témoignages)
- **Axios** : communication frontend ↔ backend
- **Responsive** : mobile, tablette, ordinateur

---

## 🛠️ Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Next.js 14, React 18 |
| State Management | Redux Toolkit, React-Redux |
| HTTP Client | Axios |
| Backend | Next.js API Routes |
| Base de données | SQLite + Sequelize ORM |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Style | CSS custom (variables, animations) |
| Fonts | Google Fonts (Syne + DM Sans) |

---

## 📁 Structure du projet

```
portfolio/
├── components/         # Navbar, Footer, Layout
├── lib/                # database.js, auth.js, initDB.js
├── models/             # User, Project, Testimonial (Sequelize)
├── pages/
│   ├── api/
│   │   ├── auth/       # register.js, login.js
│   │   ├── projects/   # index.js, [id].js
│   │   └── testimonials/ # index.js, [id].js
│   ├── projects/       # index.js, [id].js
│   ├── testimonials/   # index.js, new.js, [id]/edit.js
│   ├── index.js        # Accueil
│   ├── login.js
│   ├── register.js
│   ├── _app.js
│   └── _document.js
├── store/
│   ├── index.js
│   └── slices/         # authSlice, projectsSlice, testimonialsSlice
└── styles/
    └── globals.css
```

---

## 🚀 Installation & Démarrage

```bash
# Cloner le repo
git clone https://github.com/youba/portfolio-next.git
cd portfolio-next

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

> La base de données SQLite est créée automatiquement au premier démarrage avec des données de démonstration.

---



---

## 👤 Auteur

**Youba Cheriguen**  
GitHub: [@youba](https://github.com/youba)  
LinkedIn: [youba-cheriguen](https://linkedin.com/in/youba)
