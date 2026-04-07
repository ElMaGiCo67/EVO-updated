/**
 * EVO Maritime Theme Tokens
 * Centralised dark/light colour values used across all section components.
 * Import `getTokens(theme)` and destructure what you need.
 */

export type ThemeMode = "dark" | "light";

export function getTokens(theme: ThemeMode) {
  const isDark = theme === "dark";
  return {
    // Backgrounds
    bgPage:       isDark ? "oklch(0.10 0.03 240)"  : "oklch(0.96 0.006 240)",
    bgAlt:        isDark ? "oklch(0.12 0.035 240)" : "oklch(0.92 0.010 240)",
    bgCard:       isDark ? "oklch(0.14 0.04 240)"  : "oklch(0.98 0.004 240)",
    bgCardHover:  isDark ? "oklch(0.17 0.05 240)"  : "oklch(0.94 0.008 240)",
    bgPanel:      isDark ? "oklch(0.13 0.04 240)"  : "oklch(0.97 0.005 240)",
    bgFooter:     isDark ? "oklch(0.08 0.03 240)"  : "oklch(0.88 0.012 240)",
    bgNavScrolled:isDark ? "oklch(0.10 0.03 240 / 95%)" : "oklch(0.97 0.005 240 / 96%)",
    bgMobileMenu: isDark ? "oklch(0.08 0.03 240)"  : "oklch(0.97 0.005 240)",
    bgInput:      isDark ? "oklch(1 0 0 / 6%)"     : "oklch(0.94 0.006 240)",
    inputBg:      isDark ? "oklch(0.10 0.03 240)"  : "oklch(0.98 0.004 240)",
    inputBorder:  isDark ? "oklch(1 0 0 / 12%)"    : "oklch(0 0 0 / 15%)",

    // Text
    textPrimary:  isDark ? "oklch(0.97 0 0)"       : "oklch(0.12 0.04 240)",
    textSecondary:isDark ? "oklch(0.75 0.02 240)"  : "oklch(0.35 0.04 240)",
    textMuted:    isDark ? "oklch(0.55 0.02 240)"  : "oklch(0.50 0.03 240)",
    textWhite60:  isDark ? "rgba(255,255,255,0.60)" : "oklch(0.30 0.04 240)",
    textWhite40:  isDark ? "rgba(255,255,255,0.40)" : "oklch(0.45 0.03 240)",
    textWhite30:  isDark ? "rgba(255,255,255,0.30)" : "oklch(0.55 0.02 240)",

    // Borders
    borderSubtle: isDark ? "oklch(1 0 0 / 8%)"     : "oklch(0 0 0 / 10%)",
    borderCard:   isDark ? "oklch(0.82 0.18 200 / 20%)" : "oklch(0.55 0.18 200 / 30%)",
    borderCardHover: isDark ? "oklch(0.82 0.18 200 / 60%)" : "oklch(0.55 0.18 200 / 80%)",

    // Cyan accent (same in both, slightly darker in light for contrast)
    cyan:         isDark ? "oklch(0.82 0.18 200)"  : "oklch(0.50 0.18 200)",
    cyanGlow:     isDark ? "oklch(0.82 0.18 200 / 60%)" : "oklch(0.50 0.18 200 / 40%)",
    cyanBg:       isDark ? "oklch(0.82 0.18 200 / 15%)" : "oklch(0.55 0.18 200 / 12%)",
    cyanBar:      "linear-gradient(90deg, #00d4ff, #0099cc)",

    // Icon box
    iconBg:       isDark ? "oklch(0.82 0.18 200 / 15%)" : "oklch(0.55 0.18 200 / 12%)",

    // Divider line
    dividerLine:  isDark ? "oklch(0.82 0.18 200 / 30%)" : "oklch(0.55 0.18 200 / 40%)",
  };
}
