'use client';

import { useState, useRef, useEffect } from 'react';
import { TERMINAL_COMMANDS } from '@/constants';

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
Full Stack Developer

Passionate about creating exceptional digital experiences with modern web technologies and 3D graphics.
Specializing in React, Next.js, Three.js, and TypeScript.`;
        break;
      case 'skills':
        output = `Technical Skills:
• Frontend: React, Next.js, TypeScript, Three.js
• Backend: Node.js, Python, PostgreSQL
• Tools: Git, Docker, AWS, Figma
• Specialties: 3D Graphics, Performance Optimization`;
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
• Email: hello@johnkim.dev
• GitHub: github.com/johnkim
• LinkedIn: linkedin.com/in/johnkim
• Twitter: @johnkim`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'theme':
        output = 'Theme toggling is not available in terminal mode.';
        break;
      case 'resume':
        output = 'Downloading resume...';
        setTimeout(() => {
          window.open('/resume.pdf', '_blank');
        }, 500);
        break;
      case 'socials':
        output = `Social Links:
• GitHub: github.com/johnkim
• LinkedIn: linkedin.com/in/johnkim
• Twitter: @johnkim
• Email: hello@johnkim.dev`;
        break;
      case 'easter':
        output = '🥚 Try: matrix, hack, or game';
        break;
      case 'matrix':
        output = 'Entering the Matrix... (Feature coming soon)';
        break;
      case '':
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
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
    <div className="glass-hover flex h-[450px] w-full flex-col rounded-xl bg-black/40 p-6 font-mono text-sm shadow-2xl backdrop-blur-lg">
      <div className="mb-4 flex items-center gap-2">
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
                <span className="text-primary">❯</span>
                <span>{item.input}</span>
              </div>
            )}
            {item.output && (
              <div className="whitespace-pre-wrap pl-4 text-muted-foreground">
                {item.output}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-border pt-2">
        <span className="text-primary">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent placeholder-muted-foreground/50 outline-none"
          placeholder="Type a command..."
          autoFocus
        />
      </div>
    </div>
  );
}
