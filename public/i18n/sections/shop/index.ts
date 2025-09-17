import en from "./en.json";
import vi from "./vi.json";
import { i18n } from "@/i18n/enterprise/i18n";

export default function registerShopLocales(): void {
  const g = i18n.global;
  const set = (loc: string, msgs: Record<string, any>) => {
    const cur = g.getLocaleMessage(loc) || {};
    g.setLocaleMessage(loc, {
      ...cur,
      shop: { ...(cur as any).shop, ...msgs },
    });
  };
  set("en", en);
  set("vi", vi);
}
