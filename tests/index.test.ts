import { describe, expect, it } from 'bun:test';
import { deslugify, isReversible, slugify } from "../src/index";

describe("Arabic-Slugifier round-trips", () => {
  const cases = [
    "مرحبا بالعالم",
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "بسم الله الرحمن الرحيم",
    "العربية الفصحى",
    "اللغة العربية الجميلة",
    "القرآن الكريم",
    "محمد رسول الله",
    "أحمد علي فاطمة خديجة عائشة",
    "ياء ى و همزة ء ؤ ئ تاء مربوطة ة الف مقصورة ى",
    "التطويل بـيـن الأحـرف",
    "٠١٢٣٤٥٦٧٨٩",
    "الأرقام العربية ١٢٣٤٥",
    "الشدة فوق الحرف بّ تّ ثّ جّ حّ خّ",
    "التنوين: ـً ـٌ ـٍ",
    "السكون والجزم: اَلْبَيْتُ اَلْقَمَرُ",
    "مزيج من ١٢٣ والحروف العربية",
    "كلمات-بها_واصلات-123",
    'النص: مع علامات ترقيم!',
    "سؤال؟ جواب.",
    "قائمة: (١) أول، (٢) ثاني، (٣) ثالث.",
    'المقال#١: "التقنية في ٢٠٢٤" - نظرة عامة',
    "البريد الإلكتروني: user@example.com",
    "النسبة: ٧٥٪ من المستخدمين",
    "المعادلة: ٢ + ٢ = ٤",
    "ث vs ت + ه",
    "خ vs ك + ه",
    "ش vs س + ه",
    "ذ vs د + ه",
    "غ vs غ + ه",
    "", "a", "ا", " ", "---", "___",
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-"
  ];

  for (const txt of cases) {
    it(`"${ txt }" ↔ slug ↔ back`, () => {
      const s = slugify(txt);
      const d = deslugify(s);
      expect(d).toBe(txt);
      expect(isReversible(txt)).toBe(true);
    });
  }
});

describe("ASCII & determinism", () => {
  it("ASCII a–z A–Z 0–9 _ - untouched", () => {
    const t = "ABC-xyz_0123";
    expect(slugify(t)).toBe(t);
    expect(deslugify(t)).toBe(t);
  });

  it("same input ⇒ same slug every time", () => {
    const t = "مرحبا بالعالم ثلاثة خمسة";
    const s1 = slugify(t);
    const s2 = slugify(t);
    expect(s1).toBe(s2);
    expect(deslugify(s1)).toBe(t);
  });

  it("throws on unknown chars", () => {
    expect(() => slugify("hello€world")).toThrow(/Unsupported character/);
  });
});
