'use client';

import { FileText, Loader2, Search as SearchIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { DocumentSearchResponse, searchDocuments } from '../../lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<DocumentSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      setResponse(await searchDocuments(term));
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : 'Search is unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">FIND A DOCUMENT</div>
          <h1>Search</h1>
          <p>Search indexed documents by invoice number, supplier, or document content.</p>
        </div>
      </div>

      <section className="panel">
        <div className="panel-body search-panel-body">
          <form className="search-form" onSubmit={handleSearch} role="search">
            <label className="search-input-wrap">
              <SearchIcon size={17} aria-hidden="true" />
              <span className="sr-only">Search documents</span>
              <input
                className="search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search invoices, suppliers, or document content…"
              />
            </label>
            <button className="button button-primary" type="submit" disabled={!query.trim() || loading}>
              {loading ? <Loader2 size={15} className="spinner" /> : <SearchIcon size={15} />}
              {loading ? 'Searching…' : 'Search'}
            </button>
          </form>

          {error && <div className="inline-error" role="alert">{error}</div>}

          {loading && (
            <div className="empty-state" aria-live="polite">
              <div><Loader2 size={23} className="spinner muted-icon" /><p>Searching documents…</p></div>
            </div>
          )}

          {!loading && response && response.results.length === 0 && (
            <div className="empty-state">
              <div>
                <div className="empty-state-icon empty-state-icon-centered"><FileText size={19} /></div>
                <h3>No matching documents</h3>
                <p>No documents matched “{response.query}”. Try a different search term.</p>
              </div>
            </div>
          )}

          {!loading && response && response.results.length > 0 && (
            <div className="search-results" aria-live="polite">
              <div className="section-title-row search-results-heading">
                <div>
                  <h2>Results</h2>
                  <p>{response.results.length} {response.results.length === 1 ? 'result' : 'results'} for “{response.query}”</p>
                </div>
                <span className="state-pill state-pill-neutral">{response.type} search</span>
              </div>
              {response.results.map((result) => (
                <article className="search-result" key={result.id}>
                  <div className="search-result-top">
                    <div className="search-result-name"><FileText size={16} /><span>{result.filename}</span></div>
                    {typeof result.score === 'number' && <span className="result-score">Relevance {Math.round(result.score * 100)}%</span>}
                  </div>
                  {result.text_snippet && <p className="search-result-snippet">{result.text_snippet}</p>}
                </article>
              ))}
            </div>
          )}

          {!loading && !response && !error && (
            <div className="search-empty-hint">
              <SearchIcon size={16} />
              <span>Enter a search term to find matching documents in the connected service.</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
