import Link from 'next/link';
import { ArrowUpFromLine, HelpCircle } from 'lucide-react';

interface FeatureUnavailableProps {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
}

export default function FeatureUnavailable({
  eyebrow,
  title,
  description,
  detail,
}: FeatureUnavailableProps) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Link className="button button-primary" href="/#upload">
          <ArrowUpFromLine size={15} /> Upload documents
        </Link>
      </div>
      <section className="panel">
        <div className="empty-state">
          <div>
            <div className="empty-state-icon empty-state-icon-centered"><HelpCircle size={19} /></div>
            <h3>This view is not available yet</h3>
            <p>{detail}</p>
          </div>
        </div>
      </section>
    </>
  );
}
