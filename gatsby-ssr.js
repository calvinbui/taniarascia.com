'use strict';

const React = require("react")

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({
    lang: "en"
  })

  setHeadComponents([
    // https://victorzhou.com/blog/dark-mode-gatsby/
    // https://github.com/vzhou842/victorzhou.com/blob/master/gatsby-ssr.js
    <script key="theme" dangerouslySetInnerHTML={{
      __html: `
        (function() {
          function setTheme(theme) {
            if (theme === 'dark') {
              document.documentElement.className = 'dark';
            } else {
              document.documentElement.className = 'light';
            }
            window.__theme = theme;
          };

          window.__setPreferredTheme = function(theme) {
            setTheme(theme);
            try {
              localStorage.setItem('preferred-theme', theme);
            } catch (e) {}
          };

          var preferredTheme;

          try {
            preferredTheme = localStorage.getItem('preferred-theme');
          } catch (e) {}

          window.__themeListeners = [];

          var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

          darkQuery.addListener(function(e) {
            window.__setPreferredTheme(e.matches ? 'dark' : 'light');
            window.__themeListeners.forEach(function(listener) {
              listener();
            });
          });

          setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
        })();
        `
        .replace(/\n/g, ' ')
        .replace(/ {2}/g, ''),
    }} />,
  ]);
}
