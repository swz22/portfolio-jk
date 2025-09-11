'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { TERMINAL_COMMANDS } from '@/constants';
import { useTheme } from '@/contexts/theme-context';

interface Command {
  input: string;
  output: string;
}

interface GameState {
  wins: number;
  losses: number;
  draws: number;
  isPlaying: boolean;
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
  const [gameState, setGameState] = useState<GameState>({
    wins: 0,
    losses: 0,
    draws: 0,
    isPlaying: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { currentTheme, setTheme, themes, isEffectsEnabled, toggleEffects } =
    useTheme();

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getRPSAsciiArt = (choice: string) => {
    const art: { [key: string]: string } = {
      rock: `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)`,
      paper: `
     _______
---'    ____)____
           ______)
          _______)
         _______)
---.__________)`,
      scissors: `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)`,
    };
    return art[choice] || '';
  };

  const playRPS = (playerChoice: string) => {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    let result = '';
    let resultEmoji = '';
    
    if (playerChoice === computerChoice) {
      result = "It's a DRAW!";
      resultEmoji = '🤝';
      setGameState(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      result = 'You WIN!';
      resultEmoji = '🎉';
      setGameState(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      result = 'You LOSE!';
      resultEmoji = '😢';
      setGameState(prev => ({ ...prev, losses: prev.losses + 1 }));
    }

    const output = `
🎮 ROCK PAPER SCISSORS SHOWDOWN! 🎮
=====================================

Your choice: ${playerChoice.toUpperCase()}
${getRPSAsciiArt(playerChoice)}

Computer's choice: ${computerChoice.toUpperCase()}
${getRPSAsciiArt(computerChoice)}

${resultEmoji} ${result} ${resultEmoji}

📊 Score: Wins: ${gameState.wins + (result === 'You WIN!' ? 1 : 0)} | Losses: ${gameState.losses + (result === 'You LOSE!' ? 1 : 0)} | Draws: ${gameState.draws + (result === "It's a DRAW!" ? 1 : 0)}

Play again? Type 'rock', 'paper', or 'scissors'
Type 'quit' to exit the game`;

    return output;
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    // Handle game commands
    if (gameState.isPlaying) {
      if (trimmedCmd === 'quit' || trimmedCmd === 'exit') {
        setGameState(prev => ({ ...prev, isPlaying: false }));
        output = `Thanks for playing! 
Final Score: ${gameState.wins} wins, ${gameState.losses} losses, ${gameState.draws} draws
        
Type 'game' to play again!`;
      } else if (['rock', 'paper', 'scissors'].includes(trimmedCmd)) {
        output = playRPS(trimmedCmd);
      } else if (['r', 'p', 's'].includes(trimmedCmd)) {
        const fullChoice = trimmedCmd === 'r' ? 'rock' : trimmedCmd === 'p' ? 'paper' : 'scissors';
        output = playRPS(fullChoice);
      } else {
        output = `Invalid move! Choose 'rock' (r), 'paper' (p), or 'scissors' (s)
Or type 'quit' to exit the game.`;
      }
      setHistory([...history, { input: cmd, output }]);
      setInput('');
      return;
    }

    switch (trimmedCmd) {
      case 'help':
        output = `🚀 Available Commands:
        
${Object.entries(TERMINAL_COMMANDS)
  .map(([command, description]) => `  ${command.padEnd(15)} - ${description}`)
  .join('\n')}

💡 Pro Tips:
  • Type commands exactly as shown
  • Use 'clear' to clean up the terminal
  • All commands are case-insensitive
  • Try typing 'easter' for hidden features!`;
        break;
      case 'about':
        output = `John Kim
Full Stack Developer

Software engineer proficient in modern web technologies. Proven 
ability to deliver enterprise solutions, lead cross-functional 
initiatives, optimize application performance, and enhance user 
experience. Currently driving data-driven insights at Samsung 
Electronics America while maintaining strong full-stack 
development expertise.`;
        break;
      case 'skills':
        output = `🛠️ Technical Skills:

💻 Languages:
• JavaScript (92%)  • TypeScript (88%)  • Python (82%)
• SQL (90%)         • HTML/CSS (95%)

⚛️ Frontend:
• React (90%)       • Angular (85%)     • Redux (82%)
• Next.js (88%)     • Tailwind CSS (90%)

🖥️ Backend:
• Node.js (88%)     • Express.js (85%)  • Django (80%)
• GraphQL (78%)     • REST APIs (90%)

🗄️ Database:
• PostgreSQL (82%)  • MongoDB (85%)     • MySQL (88%)
• Firebase (80%)    • Supabase (85%)

⚙️ DevOps:
• Git (92%)         • Docker (78%)      • AWS (75%)
• Vercel (85%)      • Heroku (75%)

📊 Other:
• Power BI (82%)    • Tableau (78%)

Type 'analytics' for data analysis experience at Samsung.`;
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
• Location: Allen, Texas`;
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
      case 'socials':
        output = `Social Links:
• GitHub: github.com/swz22
• LinkedIn: linkedin.com/in/jkim022
• Twitter/X: x.com/jkdev220
• Email: jkdev220@gmail.com`;
        break;
      case 'analytics':
        output = `Data Analytics Experience:
• Power BI Dashboard Development
• SQL Query Optimization
• Big Data Analysis with SAP
• Tableau & Superset Visualization
• Python Data Processing
• Automated Reporting Pipelines

Currently leveraging these skills at Samsung Electronics 
to drive data-driven insights while maintaining active 
development on modern web applications.`;
        break;
      case 'easter':
        output = '🥚 Try: matrix, hack, or game';
        break;
      case 'game':
      case 'rps':
        setGameState({ wins: 0, losses: 0, draws: 0, isPlaying: true });
        output = `
🎮 ROCK PAPER SCISSORS 🎮
========================

Welcome to the ultimate RPS showdown!

    _______          _______          _______
---'   ____)    ---'    ____)____  ---'   ____)____
      (_____)             ______)           ______)
      (_____)            _______)        __________)
      (____)            _______)        (____)
---.__(___)     ---.__________)    ---.__(___)
    ROCK             PAPER           SCISSORS

How to play:
• Type 'rock' (or 'r') to play Rock
• Type 'paper' (or 'p') to play Paper  
• Type 'scissors' (or 's') to play Scissors
• Type 'quit' to exit

Ready? Make your move!`;
        break;
      case 'matrix':
        // Enable effects if disabled
        if (!isEffectsEnabled) {
          toggleEffects();
        }
        // Switch to Matrix theme
        setTheme('matrix');
        output = `🔢 ENTERING THE MATRIX...
        
Wake up, Neo...
The Matrix has you...
Follow the white rabbit...

01001000 01100101 01101100 01101100 01101111
01010111 01101111 01110010 01101100 01100100

🕶️ Matrix Rain theme activated.
The digital rain falls around you...`;
        break;
      case 'hack':
        output = `🚨 HACKING INITIATED...

[████████████████████████████████] 100%

ACCESS GRANTED
Welcome, elite hacker! 😎

Just kidding - I'm a web developer, not a security expert.
But I can build you some pretty cool web applications!
Check out my projects with 'projects' command.`;
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
    <div className="terminal-container flex h-[450px] w-full flex-col rounded-xl border-2 border-white/20 bg-black/80 p-6 font-mono text-sm shadow-2xl">
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
          placeholder={gameState.isPlaying ? "rock, paper, scissors, or quit..." : "Type a command..."}
          autoFocus
        />
      </div>
    </div>
  );
}