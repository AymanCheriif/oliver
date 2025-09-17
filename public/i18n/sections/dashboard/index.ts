import en from "./en.json";
import vi from "./vi.json";
import { i18n } from "@/i18n/enterprise/i18n";

export default function registerDashboardLocales(): void {
  const g = i18n.global;
  const set = (loc: string, msgs: Record<string, any>) => {
    const cur = g.getLocaleMessage(loc) || {};
    g.setLocaleMessage(loc, {
      ...cur,
      dashboard: { ...(cur as any).dashboard, ...msgs },
    });
  };
  set("en", en);
  set("vi", vi);
}
