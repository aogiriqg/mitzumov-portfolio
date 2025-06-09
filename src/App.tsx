import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import StarryBackground from './StarryBackground';
import HeaderBar from './HeaderBar';
import { Sandpack } from '@codesandbox/sandpack-react';
import { FaReact, FaNodeJs, FaCss3Alt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Carousel from './components/Carousel';
import Preloader from './components/Preloader';

const characters = [
  {
    name: 'Mitzumov',
    img: 'https://i.imgur.com/1Q9Z1Zm.png', // Можно заменить на свой арт
    style: { left: '38%', bottom: '22%' }
  },
  {
    name: 'Friend',
    img: 'https://i.imgur.com/2Q9Z1Zm.png', // Можно заменить на свой арт
    style: { left: '52%', bottom: '22%' }
  }
];

// Кастомный курсор
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const activate = () => cursorRef.current?.classList.add('active');
    const deactivate = () => cursorRef.current?.classList.remove('active');
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,.header-btn').forEach(el => {
      el.addEventListener('mouseenter', activate);
      el.addEventListener('mouseleave', deactivate);
    });
    return () => {
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('a,button,.header-btn').forEach(el => {
        el.removeEventListener('mouseenter', activate);
        el.removeEventListener('mouseleave', deactivate);
      });
    };
  }, []);
  return <div className="custom-cursor" ref={cursorRef} />;
};

// Музыкальный фон
const MUSIC_LIST = [
  {
    name: 'KRISTIEE - Dirty',
    url: '/music/KRISTIEE - Dirty.mp3',
  },
];
const MusicPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [userStarted, setUserStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      playing ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [playing, track]);

  if (!userStarted) {
    return (
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, background: '#181e36cc', borderRadius: 16, padding: '0.7rem 1.2rem', boxShadow: '0 2px 16px #0006', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => { setUserStarted(true); setPlaying(true); }} style={{ fontSize: 18, fontWeight: 600, color: '#7f8fff', background: 'none', border: '2px solid #7f8fff', borderRadius: 12, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Включить музыку 🎵</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, background: '#181e36cc', borderRadius: 16, padding: '0.7rem 1.2rem', boxShadow: '0 2px 16px #0006', display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={() => setPlaying(p => !p)} style={{ fontSize: 18, marginRight: 8 }}>{playing ? '⏸' : '▶️'}</button>
      <span style={{ color: '#7f8fff', fontWeight: 600 }}>{MUSIC_LIST[track].name}</span>
      <button onClick={() => setTrack(t => (t + 1) % MUSIC_LIST.length)} style={{ fontSize: 18, marginLeft: 8 }}>⏭</button>
      <audio ref={audioRef} src={MUSIC_LIST[track].url} loop />
    </div>
  );
};

// Live Playground
const playgroundCode = `function Hello() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h3>Live Playground 👋</h3>
      <button onClick={() => setCount(count + 1)}>
        Кликнули {count} раз
      </button>
    </div>
  );
}
render(<Hello />);
`;

const IDEPanel: React.FC = () => (
  <div className="ide-panel">
    <div className="ide-header">
      <span className="ide-dot red" />
      <span className="ide-dot yellow" />
      <span className="ide-dot green" />
      <span className="ide-title">Simmoni Info</span>
    </div>
    <pre className="ide-content">
      <span className="ide-key">Проект:</span> <a href="https://simmoni.ru/" target="_blank" rel="noopener noreferrer" className="ide-link">@https://simmoni.ru/</a>{'\n'}
      <span className="ide-key">Telegram:</span> <a href="https://t.me/Matvey_Lomanov" target="_blank" rel="noopener noreferrer" className="ide-link">@Matvey_Lomanov</a>{'\n'}
      <span className="ide-key">Discord server:</span> <a href="https://discord.gg/UaMf3u8XJg" target="_blank" rel="noopener noreferrer" className="ide-link">@https://discord.gg/UaMf3u8XJg</a>
    </pre>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <CustomCursor />
          <MusicPlayer />
          <StarryBackground />
          <HeaderBar />
          <main>
            <Carousel
              autoPlay={false}
              interval={5000}
              showArrows={true}
              showDots={true}
            >
              <div>
                <div className="slide-content">
                  <h1>
                    Привет, я <span className="gradient-text">mitzumov</span> <span className="dev-badge">Fullstack Dev</span>
                  </h1>
                  <p className="subtitle">Fullstack web developer, 17 лет</p>
                  <div className="cta-buttons">
                    <a href="#projects" className="btn primary">Мои проекты</a>
                  </div>
                  <IDEPanel />
                </div>
              </div>

              <div>
                <div className="slide-content">
                  <h2>Обо мне</h2>
                  <p>Я fullstack-разработчик, который любит создавать оригинальные и красивые сайты. Мне 17 лет, я обожаю аниме, ночное небо и необычные проекты.</p>
                  <div className="skills">
                    <span><FaReact size={20} color="#61dafb" /> React</span>
                    <span><FaNodeJs size={20} color="#8cc84b" /> Node.js</span>
                    <span><FaCss3Alt size={20} color="#2965f1" /> CSS</span>
                    <span><FaGithub size={20} color="#7f8fff" /> GitHub</span>
                    <span>TypeScript</span>
                    <span>UI/UX</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="slide-content">
                  <h2>Мои проекты</h2>
                  <div className="project-list">
                    <div className="project-card">
                      <h3>Оригинальный проект</h3>
                      <p>Описание вашего крутого проекта. Здесь может быть ссылка на GitHub или демо.</p>
                    </div>
                    <div className="project-card">
                      <h3>Еще один проект</h3>
                      <p>Краткое описание второго проекта. Добавьте свои работы!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="slide-content">
                  <h2>Roadmap для Fullstack by mitzumov</h2>
                  <div className="roadmap-editor">
                    <pre>{`1. Основы:

•  HTML, CSS, JavaScript: База для любого веб-разработчика.
  •  HTML (https://metanit.com/web/html5/)
  •  CSS (https://metanit.com/web/html5/): 
  •  JavaScript (https://metanit.com/web/javascript/): 
•  Основы Git: Система контроля версий - MUST HAVE.
  •  Git Tutorial: https://www.atlassian.com/git/tutorials

2. Frontend:

•  Vue.js: (Ну если вы человек не тупой то поймет, ведь он проще)
  •  Vue.js докумка: https://vuejs.org/
  •  Vue.js (https://www.youtube.com/watch?v=qXhmJhR0Fhg&list=PL-wEcSTifrSn5cae0gFQ7Gy7v3t6c7hLF&ab_channel=JAVA%D0%98S%D0%9A%D0%A0%D0%98%D0%9F%D0%A2%D0%AB%2C%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B0%D0%BD%D0%B0%D0%BD%D0%BE%D0%B2%D1%8B%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB%D0%B2%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B8) (Я не стал крепить все что смотрел, но данный пак зашел очень хорошо) 

•  Дополнительно (но полезно):
  •  TypeScript: https://www.typescriptlang.org/ (статическая типизация для JS)
  •  Metanit TS (https://metanit.com/web/typescript/)

3. Backend:

•  Язык программирования: (Выбери один, углубляйся в него)
  •  Node.js (JavaScript): https://nodejs.org/ (Express.js - популярный фреймворк)
  •  Python: https://www.python.org/ (Django или Flask - веб-фреймворки)
  •  Go: https://go.dev/
  •  PHP: https://www.php.net/ (Laravel - фреймворк)

Я честно не хотел вписывать в бек какие либо яп, потому что у разных проектов разные требования и бегать от языка к языку такое себе. Опять же читайте Метанита и документалку.

•  Базы данных:
  •  MySQL (https://www.youtube.com/watch?v=ERZoxHuQ-QI&list=PLDyJYA6aTY1lPhlF2iHiLlkDW6bd39VmE&ab_channel=%D0%A8%D0%BA%D0%BE%D0%BB%D0%B0itProger%2F%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5): https://www.mysql.com/,

4. DevOps & Deployment:

•  Docker: https://www.docker.com/ (контейнеризация)
•  CI/CD (Continuous Integration/Continuous Deployment): (автоматизация развертывания)

5. Дополнительно (полезные навыки):

•  Testing (Unit, Integration, E2E): https://www.browserstack.com/guide/types-of-software-testing (виды тестирования)
•  Performance Optimization: (оптимизация производительности)
•  Design Patterns: (шаблоны проектирования)
•  Clean Code: (чистый код)
•  Agile/Scrum: (методологии разработки)

 Этот Roadmap - это ориентир. Не нужно знать все и сразу. Начните с основ, выбирайте то, что вам интересно, и идите по своей ветке желаемого.
`}</pre>
                  </div>
                </div>
              </div>

              <div>
                <div className="slide-content">
                  <h2>Live Playground</h2>
                  <div className="playground-editor">
                    <Sandpack
                      template="react"
                      theme="dark"
                      options={{
                        showNavigator: false,
                        showTabs: false,
                        showLineNumbers: true,
                        wrapContent: true,
                      }}
                      files={{
                        "/App.js": {
                          code: `import React, { useState } from "react";
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>Live Playground 👋</h3>
      <button onClick={() => setCount(count + 1)}>
        Кликнули {count} раз
      </button>
    </div>
  );
}
`,
                          active: true,
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="slide-content">
                  <h2>Будущие фичи</h2>
                  <ul>
                    <li>3D-объекты (Three.js, вау-эффект)</li>
                    <li>API-демо (open-source проекты)</li>
                    <li>GitHub-статистика</li>
                    <li>Счётчик посетителей</li>
                  </ul>
                  <div style={{marginTop: '2rem', textAlign: 'center'}}>
                    <img
                      src="https://github-readme-stats.vercel.app/api?username=aogiriqg&show_icons=true&theme=tokyonight"
                      alt="GitHub stats"
                      style={{ maxWidth: 400, width: '100%', borderRadius: 12 }}
                    />
                  </div>
                </div>
              </div>
            </Carousel>
          </main>
          <footer>
            <p>© 2025 mitzumov. Сделано с душой и звездами. <a href="https://github.com/mitzumov" style={{color:'#7f8fff',textDecoration:'underline'}}>GitHub</a></p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;

