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
const THEMES = ['default', 'dark', 'green', 'solar', 'frost'];

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

function createThemeButton(id, text, theme) {
  const button = document.createElement('button');
  button.id = id;
  button.type = 'button';
  button.className = 'btn btn-sm btn-outline-secondary ms-2';
  button.textContent = text;
  button.addEventListener('click', () => setTheme(theme));
  return button;
}

function attachThemeButton(id, theme, isToggle = false) {
  const button = document.getElementById(id);
  if (!button) return null;
  button.type = 'button';

  if (isToggle) {
    button.addEventListener('click', toggleTheme);
  } else {
    button.addEventListener('click', () => setTheme(theme));
  }

  return button;
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
    solar: 'Solar',
    frost: 'Frost',
  };
  return labels[theme] || 'Padrão';
}

/**
 * Criar switcher de temas na navbar
 */
function createThemeSwitcher() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;

  const navList = navbar.querySelector('.navbar-nav, .nav');
  if (!navList) return;

  if (document.getElementById('theme-switcher')) {
    attachThemeButton('theme-light-button', 'default');
    attachThemeButton('theme-dark-button', 'dark');
    attachThemeButton('theme-switcher', null, true);
    return;
  }

  const li = document.createElement('li');
  li.className = 'nav-item d-flex align-items-center';

  const darkButton = createThemeButton('theme-dark-button', 'Escuro', 'dark');
  const lightButton = createThemeButton('theme-light-button', 'Claro', 'default');

  const toggleButton = document.createElement('button');
  toggleButton.id = 'theme-switcher';
  toggleButton.type = 'button';
  toggleButton.className = 'btn btn-sm btn-outline-primary ms-3';
  toggleButton.textContent = '🎨 Tema: Azul/Laranja';
  toggleButton.addEventListener('click', toggleTheme);

  li.appendChild(lightButton);
  li.appendChild(darkButton);
  li.appendChild(toggleButton);
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
