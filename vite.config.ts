import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Splits top-level CSS blocks while respecting nested braces and string literals.
 */
function splitCssBlocks(css: string): string[] {
  const blocks: string[] = [];
  let depth = 0;
  let start = 0;
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    const prev = i > 0 ? css[i - 1] : '';

    if (ch === "'" && !inDoubleQuote && prev !== '\\') {
      inSingleQuote = !inSingleQuote;
    } else if (ch === '"' && !inSingleQuote && prev !== '\\') {
      inDoubleQuote = !inDoubleQuote;
    } else if (!inSingleQuote && !inDoubleQuote) {
      if (ch === '{') {
        depth++;
      } else if (ch === '}') {
        depth = Math.max(0, depth - 1);
        if (depth === 0) {
          blocks.push(css.slice(start, i + 1).trim());
          start = i + 1;
        }
      } else if (ch === ';' && depth === 0) {
        const stmt = css.slice(start, i + 1).trim();
        if (stmt) blocks.push(stmt);
        start = i + 1;
      }
    }
  }
  const tail = css.slice(start).trim();
  if (tail) blocks.push(tail);
  return blocks;
}

/**
 * Above-the-fold selector matcher for Header, Mobile Menu, Welcome Modal, and Dashboard Hero.
 */
const CRITICAL_SELECTOR_PATTERNS = [
  /^(html|body|:root|:host|\*|::backdrop|:before|:after)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(min-h-screen|min-h-\[140px\]|flex|inline-flex|grid|hidden|block|inline|inline-block|relative|fixed|absolute|inset-0|-bottom-0\.5|-right-0\.5|z-30|z-50)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(w-full|w-auto|w-20|w-9|w-6|w-4|w-3\.5|w-3|w-2\.5|w-1\.5|w-\[1px\]|w-\[76px\]|w-\[160px\]|w-\[172px\]|h-full|h-\[50px\]|h-\[54px\]|h-\[58px\]|h-\[64px\]|h-9|h-20|h-16|h-14|h-6|h-4|h-3\.5|h-2\.5|h-1\.5|h-1|h-\[2px\]|max-w-7xl|max-w-3xl|max-w-2xl|max-w-xl|max-w-\[170px\]|max-h-\[94vh\]|mx-auto|mx-1\.5|min-w-0|min-h-0|shrink-0|flex-shrink-0|flex-1|flex-col|flex-row|flex-wrap|flex-nowrap|items-center|items-start|justify-between|justify-center|justify-end|self-center|self-start|self-auto|whitespace-nowrap)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(p-0|p-1|p-1\.5|p-2|p-2\.5|p-3|p-3\.5|p-4|p-5|p-6|p-8|px-2|px-2\.5|px-3|px-3\.5|px-4|px-5|px-6|px-8|py-0\.5|py-1|py-1\.5|py-2\.5|py-3|py-3\.5|py-4|py-6|pt-0|pt-1|pt-1\.5|pt-2|pt-3|pt-4|pb-1|pb-4|pb-5|pr-2\.5|pr-3|pr-4|pl-0|pl-2|pl-3|gap-0\.5|gap-1|gap-1\.5|gap-2|gap-2\.5|gap-3|gap-4|gap-5|gap-6|space-y-6|space-y-5|space-y-3|space-y-2|space-y-1\.5|space-y-1|mt-0\.5|mt-1|mt-4|mb-1|mb-4|ml-0|ml-1\.5|m-0)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(bg-\[#021027\]|bg-\[#070b19\]|bg-\[#0b1124\]|bg-\[#0c1228\]|bg-\[#111933\]|bg-\[#111936\]|bg-\[#111938\]|bg-\[#171f3a\]|bg-\[#1a233d\]|bg-\[#f8fafc\]|bg-\[#C9A84C\]|bg-\[#C9A84C\]\/10|bg-white|bg-slate-950|bg-slate-950\/90|bg-slate-900|bg-slate-800|bg-slate-800\/90|bg-slate-700|bg-slate-100|bg-slate-50|bg-blue-600|bg-amber-400|bg-amber-400\/10|bg-amber-50\/50|bg-amber-950\/20|bg-emerald-400|bg-rose-400|bg-rose-500|bg-gradient-to-r)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(text-white|text-slate-950|text-slate-900|text-slate-800|text-slate-700|text-slate-600|text-slate-500|text-slate-400|text-slate-300|text-slate-200|text-\[#C9A84C\]|text-amber-700|text-amber-600|text-amber-400|text-amber-300|text-sky-600|text-sky-500|text-sky-400|text-blue-600|text-blue-500|text-blue-400|text-emerald-600|text-emerald-500|text-emerald-400|text-indigo-500|text-indigo-400|text-rose-400|text-xs|text-sm|text-lg|text-xl|text-2xl|text-\[8px\]|text-\[9px\]|text-\[10px\]|text-\[11px\]|text-\[12px\]|text-\[13px\]|text-\[14px\]|text-\[17px\]|text-\[19px\]|text-\[20px\]|font-sans|font-mono|font-black|font-extrabold|font-bold|font-semibold|font-medium|uppercase|tracking-wide|tracking-wider|tracking-widest|tracking-tight|leading-none|leading-tight|leading-snug|leading-normal|leading-relaxed|text-center|text-left|truncate)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(stroke-slate-100|stroke-\[#171f3a\]|stroke-blue-500|stroke-\[#C9A84C\]|fill-amber-500|-rotate-90|transform)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(border|border-2|border-b|border-t|border-l|border-t-0|border-\[#021027\]|border-\[#1c243f\]|border-\[#1e293b\]|border-\[#C9A84C\]\/30|border-\[#C9A84C\]\/50|border-slate-800|border-slate-800\/60|border-slate-700|border-slate-700\/80|border-slate-200|border-slate-200\/50|border-amber-200|border-amber-400\/30|border-amber-900\/50|rounded-md|rounded-lg|rounded-xl|rounded-2xl|rounded-\[12px\]|rounded-full|shadow-xs|shadow-2xs|shadow-md|shadow-lg|shadow-2xl|shadow-inner|shadow-sm|overflow-hidden|overflow-y-auto|object-contain|object-cover|antialiased|select-none|cursor-pointer|backdrop-blur-md|animate-fadeIn|animate-spin|animate-pulse|transition-all|transition-colors|transition-transform|duration-200|duration-300|duration-700|duration-1000)(?=[:\s,{]|$)/,
  /\.(?:(?:sm|md|lg|xl|2xl|dark):)*(grid-cols-1|grid-cols-2|grid-cols-3|grid-cols-4|grid-cols-5|col-span-1|col-span-2)(?=[:\s,{]|$)/,
];

function isCriticalRule(rule: string): boolean {
  const braceIdx = rule.indexOf('{');
  if (braceIdx === -1) return false;
  const selector = rule.slice(0, braceIdx).trim();

  if (selector.startsWith('@media')) {
    const inner = rule.slice(braceIdx + 1, -1).trim();
    const innerBlocks = splitCssBlocks(inner);
    return innerBlocks.some(isCriticalRule);
  }

  // Unescape Tailwind CSS escaped characters (e.g. \:, \[, \], \#, \/) for reliable matching
  const normalizedSelector = selector.replace(/\\(.)/g, '$1');
  return CRITICAL_SELECTOR_PATTERNS.some((re) => re.test(normalizedSelector));
}

function filterCriticalMedia(rule: string): string {
  const braceIdx = rule.indexOf('{');
  const header = rule.slice(0, braceIdx).trim();
  if (!header.startsWith('@media')) return rule;
  const inner = rule.slice(braceIdx + 1, -1).trim();
  const kept = splitCssBlocks(inner).filter(isCriticalRule);
  return kept.length > 0 ? `${header}{${kept.join('')}}` : '';
}

function extractCriticalCss(fullCss: string): string {
  const cleanCss = fullCss.replace(/\/\*[\s\S]*?\*\//g, '');
  const blocks = splitCssBlocks(cleanCss);
  const criticalParts: string[] = [];

  for (const block of blocks) {
    if (
      block.startsWith('@layer properties') ||
      block.startsWith('@layer theme') ||
      block.startsWith('@layer base')
    ) {
      criticalParts.push(block);
      continue;
    }

    if (block.startsWith('@layer utilities')) {
      const braceIdx = block.indexOf('{');
      const inner = block.slice(braceIdx + 1, -1).trim();
      const utilBlocks = splitCssBlocks(inner);
      const keptUtils: string[] = [];
      for (const ub of utilBlocks) {
        if (ub.startsWith('@media')) {
          const filteredMedia = filterCriticalMedia(ub);
          if (filteredMedia) keptUtils.push(filteredMedia);
        } else if (isCriticalRule(ub)) {
          keptUtils.push(ub);
        }
      }
      if (keptUtils.length > 0) {
        criticalParts.push(`@layer utilities{${keptUtils.join('')}}`);
      }
      continue;
    }

    if (
      block.startsWith('@keyframes fadeIn') ||
      block.startsWith('.animate-fadeIn') ||
      block.startsWith('.dark{') ||
      block.startsWith('.dark,.dark .min-h-screen') ||
      block.startsWith('.dark .bg-white') ||
      block.startsWith('.dark .bg-slate-50') ||
      block.startsWith('.dark .bg-slate-100') ||
      block.startsWith('.dark .text-slate-900') ||
      block.startsWith('.dark .text-slate-500') ||
      block.startsWith('.dark .border-slate-200')
    ) {
      criticalParts.push(block);
    }
  }

  return criticalParts.join('');
}

function criticalCssPlugin(): Plugin {
  return {
    name: 'practace-critical-css-defer',
    enforce: 'post',
    apply: 'build',
    generateBundle(_options, bundle) {
      const htmlAsset = bundle['index.html'];
      if (!htmlAsset || htmlAsset.type !== 'asset' || typeof htmlAsset.source !== 'string') {
        return;
      }

      const cssAssets = Object.values(bundle).filter(
        (item): item is Extract<typeof item, { type: 'asset' }> =>
          item.type === 'asset' && item.fileName.endsWith('.css') && typeof item.source === 'string'
      );

      if (cssAssets.length === 0) return;

      let html = htmlAsset.source;
      const criticalChunks: string[] = [];

      for (const cssAsset of cssAssets) {
        const critical = extractCriticalCss(cssAsset.source as string);
        if (critical) {
          criticalChunks.push(critical);
        }

        // Use CSP-safe media="print" deferred loading (activated by main.tsx module script)
        const escapedFile = cssAsset.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const linkRegex = new RegExp(
          `<link[^>]+rel=["']stylesheet["'][^>]*href=["'][^"']*${escapedFile}["'][^>]*>`,
          'gi'
        );

        html = html.replace(linkRegex, (match) => {
          const hrefMatch = match.match(/href=["']([^"']+)["']/i);
          const href = hrefMatch ? hrefMatch[1] : `./${cssAsset.fileName}`;
          return (
            `<link rel="stylesheet" media="print" data-defer-css="true" crossorigin href="${href}">` +
            `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
          );
        });
      }

      if (criticalChunks.length > 0) {
        const compactedCss = criticalChunks
          .join('')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,])\s*/g, '$1')
          .replace(/;}/g, '}');
        const inlineStyle = `<style id="critical-css">${compactedCss}</style>`;
        html = html.replace('</head>', `  ${inlineStyle}\n  </head>`);
      }

      htmlAsset.source = html;
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), criticalCssPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      modulePreload: {
        resolveDependencies: (_filename, deps) => {
          return deps.filter((dep) => !dep.includes('vendor-pdf'));
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/firebase/') || id.includes('node_modules/@firebase/')) {
              return 'vendor-firebase';
            }
            if (id.includes('node_modules/lucide-react/')) {
              return 'vendor-icons';
            }
            if (
              id.includes('node_modules/jspdf') ||
              id.includes('node_modules/html2canvas') ||
              id.includes('node_modules/dompurify')
            ) {
              return 'vendor-pdf';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
