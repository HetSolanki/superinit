const supersetupDefaultPage = `import React, { useState, useEffect } from 'react';
import { Github, Terminal, Star, Package } from 'lucide-react';

export default function SupersetupLanding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const frameworks = [
    { 
      name: 'Next.js', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      borderColor: 'border-gray-700'
    },
    { 
      name: 'React', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      borderColor: 'border-cyan-500/30'
    },
    { 
      name: 'Vue', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      borderColor: 'border-green-500/30'
    },
    { 
      name: 'Svelte', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
      borderColor: 'border-orange-500/30'
    },
    { 
      name: 'Node.js', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      borderColor: 'border-green-600/30'
    },
    { 
      name: 'Python', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      borderColor: 'border-blue-500/30'
    },
    { 
      name: 'Go', 
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      borderColor: 'border-cyan-400/30'
    },
  ];

  return (
    <div className="h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <nav className={\`border-b border-gray-800 backdrop-blur-sm transition-all duration-700 \${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}\`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-sm">supersetup</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/HetSolanki/supersetup" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all text-xs hover:border-purple-500/50"
            >
              <Star className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>
            <a 
              href="https://www.npmjs.com/package/supersetup" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all text-xs hover:border-red-500/50"
            >
              <Package className="w-4 h-4 text-red-500" />
              <span>npm</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          {/* Hero Section */}
          <div className={\`text-center mb-12 transition-all duration-700 delay-100 \${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}\`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
              supersetup
            </h1>
            <p className="text-gray-400 text-base mb-8 max-w-xl mx-auto">
              One command. Every framework. Zero config hassle.
            </p>

            {/* Terminal Command */}
            <div className="max-w-xl mx-auto mb-10">
              <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-gray-500">$</span>
                    <span className="text-gray-300">npx supersetup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frameworks Grid */}
          <div className={\`transition-all duration-700 delay-200 \${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}\`}>
            <p className="text-center text-xs text-gray-500 mb-6 uppercase tracking-wider">
              Supported Frameworks
            </p>
            <div className="grid grid-cols-7 gap-4 max-w-3xl mx-auto">
              {frameworks.map((fw, idx) => (
                <div
                  key={idx}
                  className={\`bg-gray-900 border \${fw.borderColor} rounded-lg p-4 hover:bg-gray-800 transition-all hover:scale-105 cursor-default group\`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img 
                        src={fw.iconUrl} 
                        alt={\`\${fw.name} logo\`}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-gray-400 text-xs font-medium">{fw.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={\`border-t border-gray-800 backdrop-blur-sm transition-all duration-700 delay-300 \${mounted ? 'opacity-100' : 'opacity-0'}\`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <a href="https://github.com/HetSolanki/supersetup" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a href="https://www.npmjs.com/package/supersetup" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              <span>npm</span>
            </a>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}`;

export default supersetupDefaultPage;
