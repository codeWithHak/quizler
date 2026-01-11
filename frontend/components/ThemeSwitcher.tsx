'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { THEME_LABELS, THEME_ORDER, THEME_STORAGE_KEY, type ThemeId } from "@/lib/theme";

function isThemeId(value: string): value is ThemeId {
  return (THEME_ORDER as readonly string[]).includes(value);
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("noir");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(THEME_STORAGE_KEY) : null;
    if (stored && isThemeId(stored)) {
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
    } else {
      document.documentElement.dataset.theme = "noir";
    }
  }, []);

  const applyTheme = (next: ThemeId) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  };

  return (
    <div className="hidden items-center gap-1 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--ui-panel)] p-1 md:flex">
      {THEME_ORDER.map((id) => {
        const active = id === theme;
        return (
          <Button
            key={id}
            type="button"
            variant="ghost"
            onClick={() => applyTheme(id)}
            className={cn(
              "h-8 rounded-full px-3 text-xs font-semibold",
              active
                ? "bg-[color:var(--ui-accent)] text-[color:var(--ui-accent-contrast)] hover:bg-[color:var(--ui-accent)]"
                : "text-[color:var(--ui-muted)] hover:bg-[color:var(--ui-hover)] hover:text-[color:var(--ui-fg)]"
            )}
          >
            {THEME_LABELS[id]}
          </Button>
        );
      })}
    </div>
  );
}
