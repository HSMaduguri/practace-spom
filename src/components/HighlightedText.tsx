import React from 'react';

/**
 * Strips module numbering and chapter numbering prefixes (for both Set A and Set B)
 * so UI navigation lists and headings display purely the plain chapter name.
 */
export function getPlainChapterName(name?: string | null): string {
  if (!name) return '';
  return name
    .replace(/^Module\s+\d+(?:\s*\([^)]*\))?\s*[–—-]\s*Chapter\s+\d+\s*:\s*/i, '')
    .replace(/^M\d+(?:\s+Part\s+[IVX]+)?\s*(?:Ch(?:apter)?\s*[\d\s&–—-]+)?\s*:\s*/i, '')
    .replace(/^Chapter\s+\d+\s*:\s*/i, '')
    .trim();
}

interface HighlightedTextProps {
  text: string;
  searchQuery?: string;
  /** Bold leading "Label:" prefix in bullets (default true) */
  boldPrefix?: boolean;
  /** Set true when rendered inside an always-dark container (e.g., flipped dark flashcard) */
  onDark?: boolean;
}

const STATUTORY_PATTERN =
  String.raw`(?:(?:Sub-section|Section|Sec\.?|Rule|Reg\.?|Regulation|Schedule|Clause|Para|Part|Form|SA|AS|Ind AS)\s+(?:No\.?\s*)?(?:[A-Z]{1,5}-)?[IVX\d]+(?:\([a-zA-Z0-9]+\))*(?:[–-](?:[A-Z]{1,5}-)?[IVX\d]+(?:\([a-zA-Z0-9]+\))*)?|u\/s\s+\d+[A-Z]*(?:\([a-zA-Z0-9]+\))*|r\/w\s+(?:Sec\.?|Rule|Reg\.?)\s*\d+[A-Z]*(?:\([a-zA-Z0-9]+\))*|\b(?:DIR|MR|MGT|ADT|AOC|CHG|INC|STK|PAS|SH|FC|BEN|DPT|CRA|IEPF|GNL)-\d+[A-Z]*\b|\b(?:NCLT|NCLAT|SFIO|SEBI|LODR|SAST|PIT|ICDR|NFRA|RBI|FEMA|FCRA|IBC|CIRP|PPIRP|CoC|IRP|MCA|RoC|LRS|ECB|OEE|DMAIC|DMADV|Kaizen|Six Sigma|Kanban|Takt Time|Backflush Costing|Throughput Accounting|Balanced Scorecard|Value Chain Analysis|Target Costing|Life Cycle Costing|Value Engineering|Pareto Analysis|Transfer Pricing|Residual Income|Activity Based Costing|EVA|TQM|TPM|SMED|BPR|JIT|VMI|CLV|XBRL|CARO)\b)`;

const THRESHOLD_PATTERN =
  String.raw`(?:(?:Rs\.?|INR|₹|USD|\$)\s*\d[\d,]*(?:\.\d+)?(?:\s*(?:Crores?|Cr\.?|Lakhs?|Lacs?|Millions?|Mn|Billions?|Bn|Thousands?|K))?(?:\s*\/\s*(?:FY|year|annum|day|month|quarter|sitting|meeting|director))?|\b\d+(?:\.\d+)?%|\b\d+\/\d+(?:st|nd|rd|th)?\b|\b\d+(?:\s*(?:to|–|-)\s*\d+)?\s+(?:days?|months?|years?|yrs?|hours?|hrs?|weeks?|consecutive\s+terms?|consecutive\s+years?|financial\s+years?|working\s+days?)\b|\b\d+x\b)`;

const PROHIBITION_PATTERN =
  String.raw`(?:\b(?:PROHIBITED|EXEMPTED|EXEMPT|NON-COMPOUNDABLE|ULTRA VIRES|VOID AB INITIO|DISQUALIFIED|INELIGIBLE|FORFEITED|BARRED|MANDATORILY|NOT)\b|\bnot\s+(?:exceeding|less\s+than|more\s+than|later\s+than|eligible|permitted|allowed|applicable|compoundable|refundable)\b)`;

const TRIGGER_PATTERN =
  String.raw`(?:\b(?:Special Resolution|Ordinary Resolution|Unanimous Board Resolution|Unanimous Resolution|Board Resolution|arm's length(?:\s+basis)?|ordinary course of business|pari passu|whichever is LATER|whichever is EARLIER|whichever is LOWER|whichever is HIGHER|whichever is LESS|whichever is MORE|LATER|EARLIER|LOWER|HIGHER|MANDATORY|COMPULSORY|Related Party Transaction|Independent Director|Small Shareholders' Director|Audit Committee|Nomination & Remuneration Committee|CSR Committee|Registered Valuer|Nidhi Company|Foreign Contribution|Corporate Debtor|Operational Creditor|Financial Creditor|Resolution Plan|Bottleneck Resource|Relevant Cost|Opportunity Cost|Sunk Cost|Goal Congruence)\b)`;

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderTokenizedSegment(
  segment: string,
  searchQuery?: string,
  onDark = false
): React.ReactNode[] {
  const q = searchQuery?.trim();
  const hasSearch = Boolean(q && q.length >= 2);
  const searchGroup = hasSearch ? `(?<search>${escapeRegExp(q!)})|` : '';

  const masterRegex = new RegExp(
    `${searchGroup}(?<threshold>${THRESHOLD_PATTERN})|(?<prohibition>${PROHIBITION_PATTERN})|(?<statutory>${STATUTORY_PATTERN})|(?<trigger>${TRIGGER_PATTERN})`,
    'g'
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = masterRegex.exec(segment)) !== null) {
    if (match.index > lastIndex) {
      parts.push(segment.slice(lastIndex, match.index));
    }

    const token = match[0];
    const groups = match.groups || {};

    if (groups.search) {
      parts.push(
        <mark
          key={`kw-${keyCounter++}`}
          className={
            onDark
              ? 'bg-yellow-500/35 text-yellow-100 font-bold px-0.5 rounded'
              : 'bg-yellow-200 dark:bg-yellow-500/35 text-slate-950 dark:text-yellow-100 font-bold px-0.5 rounded'
          }
        >
          {token}
        </mark>
      );
    } else if (groups.threshold) {
      parts.push(
        <span
          key={`kw-${keyCounter++}`}
          className={
            onDark
              ? 'bg-amber-500/25 text-amber-200 font-bold px-1 rounded'
              : 'bg-amber-100 text-amber-950 dark:bg-amber-500/20 dark:text-amber-200 font-bold px-1 rounded'
          }
        >
          {token}
        </span>
      );
    } else if (groups.prohibition) {
      parts.push(
        <span
          key={`kw-${keyCounter++}`}
          className={
            onDark
              ? 'font-extrabold text-rose-300'
              : 'font-extrabold text-rose-700 dark:text-rose-300'
          }
        >
          {token}
        </span>
      );
    } else if (groups.statutory) {
      parts.push(
        <span
          key={`kw-${keyCounter++}`}
          className={
            onDark
              ? 'font-bold text-sky-300'
              : 'font-bold text-blue-700 dark:text-blue-300'
          }
        >
          {token}
        </span>
      );
    } else if (groups.trigger) {
      parts.push(
        <span
          key={`kw-${keyCounter++}`}
          className={
            onDark
              ? 'font-extrabold text-white underline decoration-amber-400/80 decoration-2 underline-offset-2'
              : 'font-extrabold text-slate-900 dark:text-white underline decoration-amber-400/80 decoration-2 underline-offset-2'
          }
        >
          {token}
        </span>
      );
    } else {
      parts.push(token);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < segment.length) {
    parts.push(segment.slice(lastIndex));
  }

  return parts;
}

export function HighlightedText({
  text,
  searchQuery,
  boldPrefix = true,
  onDark = false,
}: HighlightedTextProps): React.ReactElement {
  if (!text) return <></>;

  if (boldPrefix) {
    const colonIdx = text.indexOf(':');
    if (colonIdx > 2 && colonIdx <= 85) {
      const candidatePrefix = text.slice(0, colonIdx);
      // Treat as a structured bullet label if it does not span multiple sentences or URLs
      if (
        !/^https?$/i.test(candidatePrefix.trim()) &&
        !/[.!?]\s/.test(candidatePrefix) &&
        !candidatePrefix.includes('\n')
      ) {
        const rest = text.slice(colonIdx + 1);
        return (
          <>
            <strong
              className={
                onDark
                  ? 'font-extrabold text-white'
                  : 'font-extrabold text-slate-900 dark:text-white'
              }
            >
              {candidatePrefix}:
            </strong>
            {renderTokenizedSegment(rest, searchQuery, onDark)}
          </>
        );
      }
    }
  }

  return <>{renderTokenizedSegment(text, searchQuery, onDark)}</>;
}

/**
 * Recursively highlights string nodes inside static JSX blueprints (e.g., ChapterVisualizer)
 * without altering headings or already-bolded label prefixes inside <strong>/<code>.
 */
export function highlightReactNode(
  node: React.ReactNode,
  searchQuery?: string
): React.ReactNode {
  if (typeof node === 'string') {
    if (!node.trim()) return node;
    return <HighlightedText text={node} searchQuery={searchQuery} boldPrefix={false} />;
  }

  if (Array.isArray(node)) {
    return node.map((child, idx) => (
      <React.Fragment key={idx}>{highlightReactNode(child, searchQuery)}</React.Fragment>
    ));
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    const typeName = typeof node.type === 'string' ? node.type : '';
    if (typeName === 'strong' || typeName === 'code' || typeName === 'h5') {
      return node;
    }
    if (node.props && node.props.children !== undefined) {
      return React.cloneElement(node, {
        ...node.props,
        children: highlightReactNode(node.props.children, searchQuery),
      });
    }
  }

  return node;
}
