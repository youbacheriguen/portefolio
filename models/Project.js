const { DataTypes } = require('sequelize');
const sequelize = require('../lib/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.STRING, // stored as JSON string
    allowNull: false,
    get() {
      const raw = this.getDataValue('technologies');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('technologies', JSON.stringify(val));
    },
  },
  githubUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  liveUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emoji: {
    type: DataTypes.STRING,
    defaultValue: '🚀',
  },
}, {
  tableName: 'projects',
  timestamps: true,
});

module.exports = Project;
