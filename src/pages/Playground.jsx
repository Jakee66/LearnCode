import { useEffect, useState } from 'react';
import { ChevronDown, Maximize2, Minimize2, Play, RotateCcw, Save, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import tokenize from '@/lib/highlight';

const SAMPLES = {
  javascript: {
    label: 'JavaScript',
    runnable: true,
    code:
      'const learner = { name: "Rani", xp: 1240 };\n\nfunction levelFor(xp) {\n  return Math.floor(xp / 250) + 1;\n}\n\nconsole.log(`${learner.name} is level ${levelFor(learner.xp)}`);\nconsole.log("XP to next level:", 250 - (learner.xp % 250));',
    expected: 'Rani is level 5\nXP to next level: 10',
  },
  python: {
    label: 'Python',
    runnable: false,
    code: 'learner = {"name": "Rani", "xp": 1240}\nlevel = learner["xp"] // 250 + 1\nprint(f"{learner[\'name\']} is level {level}")',
    expected: 'Rani is level 5',
  },
  php: {
    label: 'PHP',
    runnable: false,
    code: '<?php\n$xp = 1240;\n$level = intdiv($xp, 250) + 1;\necho "Rani is level $level\\n";\n?>',
    expected: 'Rani is level 5',
  },
  go: {
    label: 'Go',
    runnable: false,
    code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\txp := 1240\n\tfmt.Println("Rani is level", xp/250+1)\n}',
    expected: 'Rani is level 5',
  },
  dart: {
    label: 'Dart',
    runnable: false,
    code: "void main() {\n  final xp = 1240;\n  print('Rani is level ${xp ~/ 250 + 1}');\n}",
    expected: 'Rani is level 5',
  },
  html: {
    label: 'HTML',
    runnable: false,
    code: '<h1>Hello, LearnCode</h1>\n<p>My first page.</p>',
    expected: 'HTML has no console output — the page renders instead.',
  },
};

const LANG_KEYS = Object.keys(SAMPLES);

function runJavaScript(source) {
  const logs = [];
  const format = (value) =>
    typeof value === 'string' ? value : typeof value === 'object' ? JSON.stringify(value) : String(value);
  const fakeConsole = {
    log: (...args) => logs.push(args.map(format).join(' ')),
    info: (...args) => logs.push(args.map(format).join(' ')),
    warn: (...args) => logs.push(`⚠ ${args.map(format).join(' ')}`),
    error: (...args) => logs.push(`✕ ${args.map(format).join(' ')}`),
  };

  try {
    // Runs the learner's own snippet in the page sandbox.
    new Function('console', `"use strict";\n${source}`)(fakeConsole);
    return { output: logs.join('\n'), error: null, note: null };
  } catch (error) {
    return { output: logs.join('\n'), error: `${error.name}: ${error.message}`, note: null };
  }
}

export default function Playground() {
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState(SAMPLES.javascript.code);
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(`learncode.code.${lang}`);
    setCode(stored || SAMPLES[lang].code);
    setResult(null);
  }, [lang]);

  const lines = code.split('\n');
  const sample = SAMPLES[lang];
  const filtered = LANG_KEYS.filter((key) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return SAMPLES[key].label.toLowerCase().includes(q) || key.toLowerCase().includes(q);
  });

  const handleRun = () => {
    if (sample.runnable) {
      setResult(runJavaScript(code));
      return;
    }
    setResult({
      output: sample.expected,
      error: null,
      note: `Live execution in this demo is JavaScript only. Showing the expected output for ${sample.label}.`,
    });
  };

  const handleSave = () => {
    localStorage.setItem(`learncode.code.${lang}`, code);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div>
      <PageHeader title="Code playground" subtitle="Write, run, repeat" to="/practice" />

      <div className="mt-4 px-5">
        <div className="flex items-center gap-2 rounded-[14px] border border-border/80 bg-card px-3 py-2">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search languages…"
            aria-label="Search programming languages"
            className="w-full bg-transparent font-mono text-[12px] text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      <div className="lc-scroll-x mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
        {filtered.length === 0 && (
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">No languages found.</span>
        )}
        {filtered.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setLang(key)}
            aria-pressed={lang === key}
            className={`shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-bold transition-colors ${
              lang === key ? 'bg-foreground text-background' : 'border border-border/80 bg-card text-muted-foreground'
            }`}
          >
            {SAMPLES[key].label}
          </button>
        ))}
      </div>

      <div className="mt-4 px-4">
        <div className="overflow-hidden rounded-[22px] border border-[#2A2354] bg-[#141033]">
          <div className="flex items-center justify-between border-b border-[#2A2354] px-3.5 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#F87171]" />
              <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
              <span className="h-2 w-2 rounded-full bg-[#34D399]" />
              <span className="ml-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#7A87AE]">
                main.{lang === 'javascript' ? 'js' : lang}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? 'Shrink editor' : 'Expand editor'}
              className="text-[#7A87AE]"
            >
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="relative">
            <pre
              aria-hidden="true"
              className="lc-code pointer-events-none absolute inset-0 overflow-hidden px-3 py-3 pl-11"
            >
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  {tokenize(line, lang).map((token, j) => (
                    <span key={j} className={token.cls}>
                      {token.text || ' '}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
            <div className="lc-code pointer-events-none absolute left-0 top-0 w-8 py-3 pr-2 text-right text-[#4B5478]">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Code editor"
              rows={expanded ? Math.max(lines.length + 6, 18) : Math.max(lines.length + 1, 8)}
              className="lc-code relative w-full resize-none whitespace-pre-wrap break-words bg-transparent px-3 py-3 pl-11 text-transparent caret-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 border-t border-[#2A2354] px-3 py-2.5">
            <button
              type="button"
              onClick={handleRun}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-accent py-2.5 text-[12px] font-bold text-[#3B2A00]"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Run code
            </button>
            <button
              type="button"
              onClick={() => {
                setCode(sample.code);
                setResult(null);
              }}
              className="flex items-center justify-center gap-1.5 rounded-[12px] border border-[#3A3268] px-3 py-2.5 text-[11.5px] font-bold text-[#C7CDF5]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center justify-center gap-1.5 rounded-[12px] border border-[#3A3268] px-3 py-2.5 text-[11.5px] font-bold text-[#C7CDF5]"
            >
              <Save className="h-3.5 w-3.5" aria-hidden="true" /> {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 px-4">
        <div className="overflow-hidden rounded-[20px] border border-border/70 bg-[#0F0C28]">
          <button
            type="button"
            onClick={() => setConsoleOpen((v) => !v)}
            aria-expanded={consoleOpen}
            className="flex w-full items-center justify-between px-3.5 py-2.5"
          >
            <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#7A87AE]">Console</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-[#7A87AE] transition-transform ${consoleOpen ? '' : '-rotate-90'}`}
              aria-hidden="true"
            />
          </button>
          {consoleOpen && (
            <div className="border-t border-[#2A2354] px-3.5 py-3">
              <pre className="whitespace-pre-wrap break-words font-mono text-[11.5px] leading-relaxed text-[#A7E8A0]">
                {result?.output || 'Run your code to see the output here.'}
              </pre>
              {result?.note && <p className="mt-2 font-mono text-[10px] leading-relaxed text-[#7A87AE]">{result.note}</p>}
            </div>
          )}
        </div>

        {result?.error && (
          <div className="mt-2.5 rounded-[18px] border border-destructive/40 bg-destructive/10 p-3.5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-destructive">Error</p>
            <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-destructive">{result.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}