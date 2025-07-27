import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Weather Server",
  description: "Servidor MCP para información del clima usando Vercel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
