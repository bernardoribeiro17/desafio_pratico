// =============================
// IMPORTAR STYLES SCSS
// =============================

import './styles/main.scss';

// =============================
// IMPORTAR SCRIPT ORIGINAL
// =============================

import './script.js';

// =============================
// THEME SWITCHER
// =============================

const THEME_KEY = 'tech-store-theme';
const THEMES = ['default', 'dark', 'green'];

/**
 * Inicializar tema salvo
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'default';
  setTheme(savedTheme);
  updateThemeSwitcher();
}

/**
 * Definir tema
 * @param {string} theme - Nome do tema
 */
function setTheme(theme) {
  const html = document.documentElement;

  if (theme === 'default') {
    html.removeAttribute('class');
  } else {
    html.className = `theme-${theme}`;
  }

  localStorage.setItem(THEME_KEY, theme);
  updateThemeSwitcher();
}

/**
 * Alternar entre temas
 */
function toggleTheme() {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'default';
  const currentIndex = THEMES.indexOf(currentTheme);
  const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
  setTheme(nextTheme);
}

/**
 * Atualizar estado do switcher
 */
function updateThemeSwitcher() {
  const switcher = document.getElementById('theme-switcher');
  if (switcher) {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'default';
    switcher.textContent = `🎨 Tema: ${getThemeLabel(currentTheme)}`;
  }
}

/**
 * Obter label do tema em português
 * @param {string} theme - Nome do tema
 * @returns {string}
 */
function getThemeLabel(theme) {
  const labels = {
    default: 'Azul/Laranja',
    dark: 'Escuro',
    green: 'Verde',
  };
  return labels[theme] || 'Padrão';
}

/**
 * Criar switcher de temas na navbar
 */
function createThemeSwitcher() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const navList = navbar.querySelector('.navbar-nav');
  if (!navList) return;

  // Verificar se já existe
  if (document.getElementById('theme-switcher')) return;

  const li = document.createElement('li');
  li.className = 'nav-item';

  const button = document.createElement('button');
  button.id = 'theme-switcher';
  button.className = 'btn btn-sm btn-outline-primary ms-3';
  button.innerHTML = '🎨 Tema: Azul/Laranja';
  button.addEventListener('click', toggleTheme);

  li.appendChild(button);
  navList.appendChild(li);
}

/**
 * Inicializar ao carregar o DOM
 */
document.addEventListener('DOMContentLoaded', function () {
  initializeTheme();
  createThemeSwitcher();
});

// Exportar funções para uso global
window.theme = {
  set: setTheme,
  toggle: toggleTheme,
  init: initializeTheme,
};
