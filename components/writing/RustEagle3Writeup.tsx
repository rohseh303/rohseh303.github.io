import body from '@/content/writing/rust-eagle3-body';
import links from '@/content/writing/rust-eagle3-links.json';
import './rust-eagle3.css';

export default function RustEagle3Writeup() {
  return (
    <div className="rust-study">
      <div className="rust-artifacts" aria-label="Experiment artifacts">
        <a href="/artifacts/rust-eagle3/rust-eagle3-source-v0.1.0.zip" download>Source + evidence ↓</a>
        <a href="/artifacts/rust-eagle3/phase2/comparisons.csv" download>Results CSV ↓</a>
        <a href="/artifacts/rust-eagle3/WRITEUP.md" download>Full report ↓</a>
        {links.repository && <a href={links.repository}>GitHub ↗</a>}
        {links.release && <a href={links.release}>Weights ↗</a>}
      </div>
      {!links.release && <p className="rust-release-note">Local review: six checkpoint bundles are prepared. Public weight downloads will be linked when the release is published.</p>}
      <details className="rust-toc">
        <summary>In this experiment</summary>
        <nav aria-label="Article contents">
          <a href="#the-question">The question</a>
          <a href="#what-eagle-3-is-doing-here">How the draft works</a>
          <a href="#data-and-training">Data and training</a>
          <a href="#the-evaluation-contract">Evaluation contract</a>
          <a href="#result-1-the-initial-gain-replicated">Replication</a>
          <a href="#result-2-longer-training-mattered-more-than-a-larger-pool">Data versus training</a>
          <a href="#result-3-the-trade-offs-are-real">Trade-offs</a>
          <a href="#integrity-checks-and-failure-modes">Integrity and limits</a>
          <a href="#cost-and-artifacts">Cost and artifacts</a>
        </nav>
      </details>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
