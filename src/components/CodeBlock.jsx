import tokenize from '@/lib/highlight';

export default function CodeBlock({ code = '', lang = 'javascript', numbered = true, footer }) {
  const lines = code.split('\n');

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#2A2354] bg-[#141033] shadow-soft">
      <div className="flex items-center gap-1.5 border-b border-[#2A2354] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#F87171]" />
        <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
        <span className="h-2 w-2 rounded-full bg-[#34D399]" />
        <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#7A87AE]">{lang}</span>
      </div>
      <div className="overflow-x-auto px-3 py-3">
        <pre className="lc-code">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {numbered && (
                <span className="mr-3 w-4 shrink-0 select-none text-right text-[#4B5478]">{i + 1}</span>
              )}
              <code className="whitespace-pre">
                {tokenize(line, lang).map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>
      {footer ? <div className="border-t border-[#2A2354] px-3.5 py-2 text-[11px] text-[#7A87AE]">{footer}</div> : null}
    </div>
  );
}