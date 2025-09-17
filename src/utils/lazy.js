const modules = import.meta.glob("/src/components/**/*.vue");
const i18nModules = import.meta.glob("/src/i18n/sections/*/index.ts");

export function lazy(section, importer) {
  return async () => {
    try {
      const promises = [importer()];

      if (section) {
        const registrarPath = `/src/i18n/sections/${section}/index.ts`;
        const registrarLoader = i18nModules[registrarPath];

        if (registrarLoader) {
          promises.push(
            registrarLoader()
              .then((m) => m.default?.())
              .catch((error) => {
                console.warn(
                  `[I18N] Failed to load registrar for section "${section}":`,
                  error
                );
                return null;
              })
          );
        } else {
          console.warn(`[I18N] No registrar found for section "${section}"`);
        }
      }

      const results = await Promise.all(promises);
      const cmp = results[0];
      return cmp.default || cmp;
    } catch (error) {
      console.error(`[LAZY] Failed to load component:`, error);
      throw error;
    }
  };
}

// Helper function to create importer from path using glob
export function createImporter(path) {
  let normalizedPath = path;
  if (path.startsWith("@/")) {
    normalizedPath = path.replace("@/", "/src/");
  }

  // Try to find the component in the pre-loaded modules
  const loader = modules[normalizedPath];
  if (loader) {
    return loader;
  } else {
    // Fallback to dynamic import for paths not in glob
    return () => import(/* @vite-ignore */ normalizedPath);
  }
}

// Legacy function for cases where we need to load without section context
export function legacyLazy(path) {
  if (!path || typeof path !== "string") {
    return () => Promise.reject(new Error("lazy(): invalid path"));
  }
  if (path.includes("App.vue")) {
    return () =>
      Promise.reject(new Error("lazy(): cannot dynamically load App.vue"));
  }
  let normalized = path.replace(/^@\/?/, "/src/");
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  const loader = modules[normalized];
  if (!loader) {
    return () =>
      Promise.reject(
        new Error(`lazy(): component not found for path ${normalized}`)
      );
  }
  return loader;
}
