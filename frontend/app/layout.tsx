import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "AbleSpace | Task Management",
  description: "Organize tasks and projects with your team.",
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var mode = window.localStorage.getItem('ablespace:theme-mode');
    var accent = window.localStorage.getItem('ablespace:accent-color');
    mode = mode ? JSON.parse(mode) : 'light';
    accent = accent ? JSON.parse(accent) : 'blue';
    document.documentElement.dataset.theme = mode;
    document.documentElement.dataset.accent = accent;
    if (mode === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
