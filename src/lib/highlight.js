const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'def', 'class',
  'import', 'from', 'new', 'print', 'echo', 'foreach', 'as', 'final', 'int', 'String', 'void',
  'package', 'func', 'export', 'default', 'true', 'false', 'null', 'nil', 'True', 'False',
  'None', 'this', 'async', 'await', 'switch', 'case', 'break', 'continue', 'in', 'of', 'static',
  'public', 'extends', 'implements', 'final',
]);

export const CODE_CLS = {
  comment: 'text-[#7A87AE]',
  string: 'text-[#A7E8A0]',
  keyword: 'text-[#C3A6FF]',
  number: 'text-[#FBD27A]',
  tag: 'text-[#7DD3FC]',
  plain: 'text-[#E8EAFB]',
};

const RE_SRC =
  '\\/\\/[^\\n]*' +
  '|#[^\\n]*' +
  '|"(?:[^"\\\\]|\\\\.)*"' +
  "|'(?:[^'\\\\]|\\\\.)*'" +
  '|`(?:[^`\\\\]|\\\\.)*`' +
  '|<\\/?[A-Za-z][\\w-]*' +
  '|\\b[A-Za-z_$][\\w$]*\\b' +
  '|\\b\\d+(?:\\.\\d+)?\\b';

/** Splits one line of code into coloured tokens for rendering. */
export default function tokenize(line = '', lang = 'javascript') {
  const hashIsComment = lang === 'python' || lang === 'php';
  const re = new RegExp(RE_SRC, 'g');
  const out = [];
  let last = 0;
  let match;

  while ((match = re.exec(line)) !== null) {
    const token = match[0];
    if (token.startsWith('#') && !hashIsComment) continue;

    if (match.index > last) out.push({ text: line.slice(last, match.index), cls: CODE_CLS.plain });

    let cls = CODE_CLS.plain;
    if (token.startsWith('//') || (hashIsComment && token.startsWith('#'))) cls = CODE_CLS.comment;
    else if (/^["'`]/.test(token)) cls = CODE_CLS.string;
    else if (token.startsWith('<')) cls = CODE_CLS.tag;
    else if (/^\d/.test(token)) cls = CODE_CLS.number;
    else if (KEYWORDS.has(token)) cls = CODE_CLS.keyword;

    out.push({ text: token, cls });
    last = match.index + token.length;
  }

  if (last < line.length) out.push({ text: line.slice(last), cls: CODE_CLS.plain });
  return out;
}