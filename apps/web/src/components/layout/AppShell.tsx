'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpFromLine,
  ChevronDown,
  Command,
  Files,
  GitCompareArrows,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { label: 'Overview', href: '/', icon: LayoutDashboard },
  { label: 'Documents', href: '/documents', icon: Files },
  { label: 'Processing', href: '/processing', icon: Workflow },
  { label: 'Review queue', href: '/review', icon: ShieldCheck },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Comparisons', href: '/comparisons', icon: GitCompareArrows },
];

const pageTitles: Record<string, string> = {
  '/': 'Overview',
  '/documents': 'Documents',
  '/processing': 'Processing',
  '/review': 'Review queue',
  '/search': 'Search',
  '/comparisons': 'Comparisons',
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = pageTitles[pathname] ?? 'Document Intelligence';

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <Command size={19} strokeWidth={2.2} />
          </div>
          <div className="brand-copy">
            <span className="brand-name">DocuMind</span>
            <span className="brand-caption">DOCUMENT INTELLIGENCE</span>
          </div>
          <button
            className="icon-button sidebar-close"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">W</div>
          <div className="workspace-copy">
            <span>Workspace</span>
            <small>Document operations</small>
          </div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <p className="nav-label">WORKSPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link${active ? ' nav-link-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-links">
            <Link href="/settings" className="nav-link" onClick={() => setSidebarOpen(false)}>
              <Settings2 size={17} strokeWidth={1.8} />
              <span>Settings</span>
            </Link>
            <button className="nav-link nav-link-disabled" type="button" disabled title="Support contact is not configured">
              <HelpCircle size={17} strokeWidth={1.8} />
              <span>Help & support</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{title}</strong>
          </div>
          <div className="topbar-actions">
            <Link className="topbar-search" href="/search" aria-label="Search documents">
              <Search size={15} />
              <span>Search documents</span>
            </Link>
            <Link className="button button-primary button-small" href="/#upload">
              <ArrowUpFromLine size={15} />
              <span>Upload documents</span>
            </Link>
          </div>
        </header>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
