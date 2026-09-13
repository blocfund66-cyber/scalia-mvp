// Theme management (toggleTheme, updateThemeIcons)
    function toggleTheme() {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('scalia_theme', isLight ? 'light' : 'dark');
      updateThemeIcons(isLight);
    }

    function updateThemeIcons(isLight) {
      const iconTop = document.getElementById('theme-toggle-icon-topbar');
      const iconLand = document.getElementById('theme-toggle-icon-landing');
      const iconClass = isLight ? 'ri-moon-line' : 'ri-sun-line';
      if (iconTop) iconTop.className = iconClass;
      if (iconLand) iconLand.className = iconClass;
    }

