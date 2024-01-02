import { useEffect } from 'react';

const ThemeScript = () => {
  useEffect(() => {
    try {
      var d = document.documentElement;
      var c = d.classList;
      var e = localStorage.getItem('theme');
      if ('system' === e || (!e && true)) {
        var t = '(prefers-color-scheme: dark)';
        var m = window.matchMedia(t);
        if (m.media !== t || m.matches) {
          d.style.colorScheme = 'dark';
          c.add('dark');
          c.remove('light');
        } else {
          d.style.colorScheme = 'light';
          c.add('light');
          c.remove('dark');
        }
      } else if (e) {
        c.add(e);
        if (e === 'dark') {
          c.remove('light');
        } else if (e === 'light') {
          c.remove('dark');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return null;
};

export default ThemeScript;
