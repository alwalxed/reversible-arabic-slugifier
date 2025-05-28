/**
 * Reversible Arabic ↔ URL-safe slugifier.
 *
 * ASCII [A-Za-z0-9_-] pass through.
 * All other supported chars are escaped as "~" + a short code.
 * The escape‐prefix "~" never appears unescaped.
 */

const ESC = "~";

const characterMap: Record<string, string> = {
  "ا": "~a", "أ": "~A", "إ": "~I", "آ": "~Aa",
  "ب": "~b", "ت": "~t", "ث": "~th", "ج": "~j",
  "ح": "~h", "خ": "~kh", "د": "~d", "ذ": "~dh",
  "ر": "~r", "ز": "~z", "س": "~s", "ش": "~sh",
  "ص": "~S", "ض": "~D", "ط": "~T", "ظ": "~Z",
  "ع": "~E", "غ": "~gh", "ف": "~f", "ق": "~q",
  "ك": "~k", "ل": "~l", "م": "~m", "ن": "~n",
  "ه": "~H", "و": "~w", "ي": "~y", "ى": "~Y",
  "ة": "~ta", "ء": "~~x", "ؤ": "~wx", "ئ": "~yx",

  "٠": "~0", "١": "~1", "٢": "~2", "٣": "~3", "٤": "~4",
  "٥": "~5", "٦": "~6", "٧": "~7", "٨": "~8", "٩": "~9",

  "ً": "~an", "ٌ": "~un", "ٍ": "~in", "َ": "~fa",
  "ُ": "~da", "ِ": "~ka",
  "ّ": "~sh2",
  "ْ": "~su",
  "ـ": "~tt",

  " ": "~_", ".": "~dt", ",": "~cm", ":": "~cl",
  ";": "~sc", "!": "~ex", "?": "~qu", "(": "~lp",
  ")": "~rp", "[": "~lb", "]": "~rb", "{": "~lc",
  "}": "~rc", '"': "~qt", "'": "~ap", "/": "~sl",
  "\\": "~bs", "&": "~am", "%": "~pc", "#": "~hs",
  "@": "~at", "$": "~dl", "+": "~pl", "=": "~eq",
  "<": "~lt", ">": "~gt", "|": "~pi", "~": "~~t",

  "؟": "~qm", "،": "~cm2", "٪": "~pc2"
};

const reverseMap: Record<string, string> = {};
for (const [ k, v ] of Object.entries(characterMap)) {
  reverseMap[ v ] = k;
}
const escapes = Object.keys(reverseMap).sort((a, b) => b.length - a.length);

/**
 * slugify(input):
 *  - ASCII [A-Za-z0-9_-] pass through
 *  - others must exist in characterMap or we throw
 */
export function slugify(input: string): string {
  if (!input) return "";
  const out: string[] = [], bad: string[] = [];
  for (const ch of input) {
    if (/^[A-Za-z0-9_-]$/.test(ch)) out.push(ch);
    else if (ch in characterMap) out.push(characterMap[ ch ]);
    else bad.push(ch);
  }
  if (bad.length) {
    throw new Error(`Unsupported character(s): ${ [ ...new Set(bad) ].join(", ") }`);
  }
  return out.join("");
}

/**
 * deslugify(slug):
 *  - whenever we see "~", try the longest matching escape‐code
 *  - otherwise preserve the ASCII char
 */
export function deslugify(slug: string): string {
  let i = 0, out = "";
  while (i < slug.length) {
    if (slug[ i ] === ESC) {
      let matched = false;
      for (const code of escapes) {
        if (slug.startsWith(code, i)) {
          out += reverseMap[ code ];
          i += code.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
    }
    out += slug[ i++ ];
  }
  return out;
}

/** Round‐trip check */
export function isReversible(text: string): boolean {
  try {
    return deslugify(slugify(text)) === text;
  } catch {
    return false;
  }
}
