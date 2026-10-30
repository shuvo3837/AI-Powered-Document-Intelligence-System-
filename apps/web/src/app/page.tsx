import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileStack,
  Search,
} from 'lucide-react';
import FileUploader from '../components/upload/FileUploader';

const metrics = [
  { label: 'Documents processed', icon: FileStack },
  { label: 'Processing', icon: Clock3 },
  { label: 'Needs review', icon: AlertTriangle },
  { label: 'Completed', icon: CheckCircle2 },
];

export default function Home() {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">WORKSPACE OVERVIEW</div>
          <h1>Document intelligence</h1>
          <p>Monitor document processing, extraction quality, and validation activity.</p>
        </div>
        <div className="heading-actions">
          <Link className="button button-secondary" href="/search"><Search size={15} /> Search documents</Link>
        </div>
      </div>

      <section aria-label="Document activity summary">
        <div className="metric-grid">
          {metrics.map(({ label, icon: Icon }) => (
            <article className="metric-card" key={label}>
              <div className="metric-card-top">
                <span>{label}</span>
                <span className="metric-icon"><Icon size={15} /></span>
              </div>
              <div className="metric-value" aria-label={`${label} unavailable`}>—</div>
              <div className="metric-caption">Not provided by the current API</div>
            </article>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <div>
          <FileUploader />
          <section className="panel" style={{ marginTop: 16 }} aria-labelledby="activity-title">
            <div className="panel-header">
              <div>
                <h2 id="activity-title">Recent activity</h2>
                <p>Document history from your workspace.</p>
              </div>
              <Link className="button button-secondary button-small" href="/documents">
                All documents <ArrowRight size={14} />
              </Link>
            </div>
            <div className="empty-state">
              <div>
                <div className="empty-state-icon empty-state-icon-centered"><FileStack size={19} /></div>
                <h3>Activity is not available yet</h3>
                <p>The current API does not expose a document list or activity feed. Uploaded job IDs are shown in the upload queue.</p>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <section className="panel" aria-labelledby="capabilities-title">
            <div className="panel-header">
              <div>
                <h2 id="capabilities-title">Workspace tools</h2>
                <p>Use the document API capabilities available today.</p>
              </div>
            </div>
            <div className="pipeline-list">
              <Link className="tool-link" href="/documents">
                <span className="pipeline-marker"><FileStack size={12} /></span>
                <span>Browse documents</span>
                <span className="pipeline-caption">Unavailable</span>
              </Link>
              <Link className="tool-link" href="/review">
                <span className="pipeline-marker"><AlertTriangle size={12} /></span>
                <span>Review queue</span>
                <span className="pipeline-caption">Unavailable</span>
              </Link>
              <Link className="tool-link" href="/search">
                <span className="pipeline-marker"><Search size={12} /></span>
                <span>Search documents</span>
                <span className="pipeline-caption tool-available">API available</span>
              </Link>
            </div>
            <div className="panel-body panel-body-compact">
              <div className="availability-note">
                <AlertTriangle size={14} />
                <span>Summary metrics, document listing, and job monitoring need API endpoints that are not currently implemented.</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
