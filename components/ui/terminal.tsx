'use client';

import { useState, useRef, useEffect } from 'react';
import { TERMINAL_COMMANDS } from '@/constants';
import { useTheme } from '@/contexts/theme-context';

interface Command {
  input: string;
  output: string;
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([
    {
      input: '',
      output: `Welcome to JK's Portfolio Terminal v1.0.0
Type 'help' for available commands.`,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { currentTheme, setTheme, themes, isEffectsEnabled, toggleEffects } =
    useTheme();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmedCmd) {
      case 'help':
        output = Object.entries(TERMINAL_COMMANDS)
          .map(
            ([command, description]) => `${command.padEnd(12)} - ${description}`
          )
          .join('\n');
        break;
      case 'about':
        output = `John Kim
Full Stack Developer & Project Manager

Forward-focused Software Developer proficient in various modern web technologies.
Proven track record of improving application performance, delivering enterprise-grade 
solutions, and optimizing user experience. Currently leading cross-functional 
initiatives at Samsung Electronics America.`;
        break;
      case 'skills':
        output = `Technical Skills:
• Frontend: React, Angular, TypeScript, Redux
• Backend: Node.js, Express.js, Python
• Database: PostgreSQL, MongoDB, MySQL
• Tools: Git, Docker, GraphQL, SAP
• Cloud: Firebase, Heroku, AWS`;
        break;
      case 'projects':
        output = `Recent Projects:
1. 3D Portfolio Website - Interactive portfolio with Three.js
2. E-commerce Platform - Full-stack Next.js application
3. Data Visualization - D3.js and WebGL dashboards
4. Mobile App - React Native cross-platform app

Type 'projects [number]' for more details.`;
        break;
      case 'contact':
        output = `Get in Touch:
• Email: jkdev220@gmail.com
• GitHub: github.com/swz22
• LinkedIn: linkedin.com/in/jkim022
• Location: Dallas, Texas`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'theme':
        output = `Theme commands:
• theme list     - Show available themes
• theme set <n> - Change theme
• theme current  - Show current theme
• effects on/off - Toggle effects`;
        break;
      case 'theme list':
        output = `Available themes:\n${themes
          .filter((t) => t.available)
          .map(
            (t) =>
              `• ${t.name.padEnd(12)} - ${t.description} [${t.performance}]`
          )
          .join('\n')}`;
        break;
      case 'theme current':
        output = `Current theme: ${currentTheme}
Effects: ${isEffectsEnabled ? 'enabled' : 'disabled'}`;
        break;
      case 'effects on':
        toggleEffects();
        output = 'Effects enabled. Enjoy the visual experience!';
        break;
      case 'effects off':
        toggleEffects();
        output = 'Effects disabled.';
        break;
      case 'enable effects':
        if (!isEffectsEnabled) {
          toggleEffects();
          output = 'Effects enabled. Enjoy the visual experience!';
        } else {
          output = 'Effects are already enabled.';
        }
        break;
      case 'resume':
        output = 'Downloading resume...';
        setTimeout(() => {
          window.open('/resume.pdf', '_blank');
        }, 500);
        break;
      case 'socials':
        output = `Social Links:
• GitHub: github.com/swz22
• LinkedIn: linkedin.com/in/jkim022
• Twitter/X: x.com/jkdev220
• Email: jkdev220@gmail.com`;
        break;
      case 'easter':
        output = '🥚 Try: matrix, hack, or game';
        break;
      case 'matrix':
        if (themes.find((t) => t.id === 'matrix')?.available) {
          setTheme('matrix');
          output = 'Entering the Matrix...';
        } else {
          output = 'Matrix theme coming soon...';
        }
        break;
      case '':
        return;
      default:
        if (trimmedCmd.startsWith('theme set ')) {
          const themeName = trimmedCmd.replace('theme set ', '');
          const theme = themes.find(
            (t) => t.name.toLowerCase() === themeName.toLowerCase()
          );
          if (theme && theme.available) {
            setTheme(theme.id);
            output = `Theme changed to ${theme.name}`;
          } else {
            output = `Theme "${themeName}" not found or unavailable`;
          }
        } else {
          output = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }
    }

    setHistory([...history, { input: cmd, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="terminal-container glass-hover flex h-[450px] w-full flex-col rounded-xl bg-black/40 p-6 font-mono text-sm shadow-2xl backdrop-blur-lg">
      <div className="terminal-header mb-4 flex select-none items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-muted-foreground">terminal</span>
      </div>

      <div ref={terminalRef} className="mb-2 flex-1 space-y-2 overflow-y-auto">
        {history.map((item, index) => (
          <div key={index}>
            {item.input && (
              <div className="flex items-center gap-2">
                <span className="select-none text-primary">❯</span>
                <span className="select-none">{item.input}</span>
              </div>
            )}
            {item.output && (
              <div className="terminal-output whitespace-pre-wrap pl-4 text-muted-foreground">
                {item.output}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border pt-2">
        <span className="select-none text-primary">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent placeholder-muted-foreground outline-none"
          placeholder="Type a command..."
          autoFocus
        />
      </div>
    </div>
  );
}
