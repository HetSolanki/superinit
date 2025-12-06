const supersetupDefaultPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>supersetup</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body class="m-0 p-0">
  <div id="app" class="h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
    <!-- Top Navigation Bar -->
    <nav id="nav" class="border-b border-gray-800 backdrop-blur-sm transition-all duration-700 opacity-0 -translate-y-4">
      <div class="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span class="font-semibold text-sm">supersetup</span>
        </div>
        <div class="flex items-center gap-3">
          <a 
            href="https://github.com/HetSolanki/supersetup" 
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all text-xs hover:border-purple-500/50"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Star on GitHub</span>
          </a>
          <a 
            href="https://www.npmjs.com/package/supersetup" 
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all text-xs hover:border-red-500/50"
          >
            <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span>npm</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center px-6">
      <div class="max-w-5xl w-full">
        <!-- Hero Section -->
        <div id="hero" class="text-center mb-12 transition-all duration-700 delay-100 opacity-0 translate-y-4">
          <h1 class="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
            supersetup
          </h1>
          <p class="text-gray-400 text-base mb-8 max-w-xl mx-auto">
            One command. Every framework. Zero config hassle.
          </p>

          <!-- Terminal Command -->
          <div class="max-w-xl mx-auto mb-10">
            <div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div class="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-700/50">
                <div class="flex gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
                </div>
              </div>
              <div class="p-4 font-mono text-sm">
                <div class="flex items-center gap-2 text-green-400">
                  <span class="text-gray-500">$</span>
                  <span class="text-gray-300">npx supersetup</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Frameworks Grid -->
        <div id="frameworks" class="transition-all duration-700 delay-200 opacity-0 translate-y-4">
          <p class="text-center text-xs text-gray-500 mb-6 uppercase tracking-wider">
            Supported Frameworks
          </p>
          <div id="frameworks-grid" class="grid grid-cols-7 gap-4 max-w-3xl mx-auto">
            <!-- Frameworks will be inserted here by JavaScript -->
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer id="footer" class="border-t border-gray-800 backdrop-blur-sm transition-all duration-700 delay-300 opacity-0">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
        <div class="flex items-center gap-6 text-xs text-gray-500">
          <a href="https://github.com/HetSolanki/supersetup" target="_blank" rel="noopener noreferrer" class="hover:text-gray-300 transition-colors flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>GitHub</span>
          </a>
          <span>•</span>
          <a href="https://www.npmjs.com/package/supersetup" target="_blank" rel="noopener noreferrer" class="hover:text-gray-300 transition-colors flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span>npm</span>
          </a>
          <span>•</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  </div>

  <script>
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

    // Render frameworks
    const frameworksGrid = document.getElementById('frameworks-grid');
    frameworks.forEach((fw) => {
      const frameworkCard = document.createElement('div');
      frameworkCard.className = \`bg-gray-900 border \${fw.borderColor} rounded-lg p-4 hover:bg-gray-800 transition-all hover:scale-105 cursor-default group\`;
      frameworkCard.innerHTML = \`
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 h-10 flex items-center justify-center">
            <img 
              src="\${fw.iconUrl}" 
              alt="\${fw.name} logo"
              class="w-full h-full object-contain group-hover:scale-110 transition-transform"
            />
          </div>
          <span class="text-gray-400 text-xs font-medium">\${fw.name}</span>
        </div>
      \`;
      frameworksGrid.appendChild(frameworkCard);
    });

    // Trigger animations on mount
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('nav').classList.remove('opacity-0', '-translate-y-4');
        document.getElementById('nav').classList.add('opacity-100', 'translate-y-0');
        
        document.getElementById('hero').classList.remove('opacity-0', 'translate-y-4');
        document.getElementById('hero').classList.add('opacity-100', 'translate-y-0');
        
        document.getElementById('frameworks').classList.remove('opacity-0', 'translate-y-4');
        document.getElementById('frameworks').classList.add('opacity-100', 'translate-y-0');
        
        document.getElementById('footer').classList.remove('opacity-0');
        document.getElementById('footer').classList.add('opacity-100');
      }, 100);
    });
  </script>
</body>
</html>`;

export default supersetupDefaultPage;