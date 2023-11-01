import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import React, { useEffect, useState } from 'react';

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(localStorage.getItem('markdown') || '');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem('markdown', markdown);
  }, [markdown]);

  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(markdown, {
      highlight: function (code, lang) {
        return Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang);
      },
    });
    return { __html: rawMarkup };
  };

  return (
    <div>
      <h2>Live Markdown Previewer</h2>
      <select value={theme} onChange={handleThemeChange}>
        <option value="light">Light Theme</option>
        <option value="dark">Dark Theme</option>
      </select>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <textarea
          placeholder="Type some Markdown here..."
          value={markdown}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Tab' && e.preventDefault()}
          style={{ width: '48%', height: '200px', fontFamily: 'monospace' }}
        />
        <div
          className={`markdown-preview ${theme}`}
          style={{ width: '48%', border: '1px solid black', padding: '10px', minHeight: '200px', overflowY: 'auto', textAlign: 'left' }}
          dangerouslySetInnerHTML={getMarkdownText()}
        />
      </div>
    </div>
  );
}

export default MarkdownPreviewer;
