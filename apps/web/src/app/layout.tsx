import './globals.css';
import AppShell from '../components/layout/AppShell';

export const metadata = {
  title: 'Document Intelligence | DocuMind AI',
  description: 'Process and review business documents with AI-powered extraction.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
