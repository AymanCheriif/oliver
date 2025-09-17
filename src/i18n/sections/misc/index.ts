import en from "./en.json";
import vi from "./vi.json";
import { i18n } from "@/i18n/enterprise/i18n";

export default function registerMiscLocales(): void {
  const g = i18n.global;
  const set = (loc: string, msgs: Record<string, any>) => {
    const cur = g.getLocaleMessage(loc) || {};
    g.setLocaleMessage(loc, {
      ...cur,
      common: { ...(cur as any).common, ...msgs },
    });
  };
  set("en", en);
  set("vi", vi);
}
