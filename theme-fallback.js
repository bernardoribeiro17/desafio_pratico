const THEME_FALLBACK_KEY = 'tech-store-theme';

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

function applyFallbackTheme(theme) {
  const html = document.documentElement;

  if (theme === 'default') {
    html.removeAttribute('class');
  } else {
    html.className = `theme-${theme}`;
  }

  localStorage.setItem(THEME_FALLBACK_KEY, theme);
  const switcher = document.getElementById('theme-switcher');
  if (switcher) {
    switcher.textContent = `🎨 Tema: ${getThemeLabel(theme)}`;
  }
}

function initThemeFallback() {
  if (window.theme && typeof window.theme.set === 'function') {
    return;
  }

  const savedTheme = localStorage.getItem(THEME_FALLBACK_KEY) || 'default';
  applyFallbackTheme(savedTheme);

  const lightButton = document.getElementById('theme-light-button');
  const darkButton = document.getElementById('theme-dark-button');
  const switcherButton = document.getElementById('theme-switcher');

  if (lightButton) {
    lightButton.addEventListener('click', () => applyFallbackTheme('default'));
  }

  if (darkButton) {
    darkButton.addEventListener('click', () => applyFallbackTheme('dark'));
  }

  if (switcherButton) {
    switcherButton.addEventListener('click', () => {
      const currentTheme =
        localStorage.getItem(THEME_FALLBACK_KEY) || 'default';
      const themes = ['default', 'dark', 'green', 'solar', 'frost'];
      const nextTheme =
        themes[(themes.indexOf(currentTheme) + 1) % themes.length];
      applyFallbackTheme(nextTheme);
    });
  }
}

document.addEventListener('DOMContentLoaded', initThemeFallback);
