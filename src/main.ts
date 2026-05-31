// =============================
// IMPORTAR STYLES SCSS
// =============================

import './styles/main.scss';

// script logic is initialized from React entrypoint (initShop)

// =============================
// THEME SWITCHER
// =============================

const THEME_KEY = 'tech-store-theme';
const THEMES: readonly string[] = ['default', 'dark', 'green', 'solar', 'frost'] as const;

/**
 * Inicializar tema salvo
 */
const initializeTheme = (): void => {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'default';
  setTheme(savedTheme);
  updateThemeSwitcher();
};

/**
 * Definir tema
 */
const setTheme = (theme: string): void => {
  const html = document.documentElement;

  if (theme === 'default') {
    html.removeAttribute('class');
  } else {
    html.className = `theme-${theme}`;
  }

  localStorage.setItem(THEME_KEY, theme);
  updateThemeSwitcher();
};

/**
 * Alternar entre temas
 */
const toggleTheme = (): void => {
  const currentTheme = localStorage.getItem(THEME_KEY) || 'default';
  const currentIndex = THEMES.indexOf(currentTheme);
  const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
  setTheme(nextTheme);
}

/**
 * Atualizar estado do switcher
 */
const updateThemeSwitcher = (): void => {
  const switcher = document.getElementById('theme-switcher');
  if (switcher) {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'default';
    switcher.textContent = `🎨 Tema: ${getThemeLabel(currentTheme)}`;
  }
};

const createThemeButton = (id: string, text: string, theme: string): HTMLButtonElement => {
  const button = document.createElement('button');
  button.id = id;
  button.type = 'button';
  button.className = 'btn btn-sm btn-outline-secondary ms-2';
  button.textContent = text;
  button.addEventListener('click', () => setTheme(theme));
  return button;
};

const attachThemeButton = (id: string, theme: string | null, isToggle = false): HTMLElement | null => {
  const button = document.getElementById(id);
  if (!button) return null;
  button.type = 'button';

  if (isToggle) {
    button.addEventListener('click', toggleTheme);
  } else if (theme) {
    button.addEventListener('click', () => setTheme(theme));
  }

  return button;
};

/**
 * Obter label do tema em português
 */
const getThemeLabel = (theme: string): string => {
  const labels: Record<string, string> = {
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
const createThemeSwitcher = (): void => {
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
};

/**
 * Inicializar ao carregar o DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  createThemeSwitcher();
});

// Exportar funções para uso global
declare global {
  interface Window {
    theme?: {
      set: (theme: string) => void;
      toggle: () => void;
      init: () => void;
    };
  }
}

window.theme = {
  set: setTheme,
  toggle: toggleTheme,
  init: initializeTheme,
};
