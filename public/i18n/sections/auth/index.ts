import en from "./en.json";
import vi from "./vi.json";
import { i18n } from "@/i18n/enterprise/i18n"; // your existing vue-i18n instance

export default function registerAuthLocales(): void {
  const g = i18n.global;
  const set = (loc: string, msgs: Record<string, any>) => {
    const cur = g.getLocaleMessage(loc) || {};
    g.setLocaleMessage(loc, {
      ...cur,
      auth: { ...(cur as any).auth, ...msgs },
    });
  };
  set("en", en);
  set("vi", vi);
}
