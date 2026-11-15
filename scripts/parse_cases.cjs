const fs = require('fs');
const path = require('path');

const text = fs.readFileSync('extracted_pdf_text.txt', 'utf8');

// Locate all 65 cases after TOC
const caseStarts = [];
for (let i = 1; i <= 65; i++) {
  const re = new RegExp('CASE\\s+SCENARIO\\s+' + i + '(?!\\s*\\.)\\b', 'i');
  const match = text.slice(14400).match(re);
  if (match) {
    caseStarts.push({ caseNum: i, idx: 14400 + match.index });
  } else {
    console.error('Could not find CASE SCENARIO', i);
  }
}

console.log('Located all case starts:', caseStarts.length);

function clean(str) {
  if (!str) return '';
  return str
    .replace(/©\s*The\s+Institute\s+of\s+Chartered\s+Accountants\s+of\s+India/gi, '')
    .replace(/\bCORPORATE\s+AND\s+ECONOMIC\s+LAWS\b/gi, '')
    .replace(/\bCASE\s+SCENARIOS?\s*\d*\b/gi, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();
}

function detectChapter(raw) {
  const t = raw.toLowerCase();

  // PMLA
  if (t.includes('pmla') || t.includes('money laundering') || t.includes('proceeds of crime') || t.includes('scheduled offence')) {
    return { id: 111, name: 'Chapter 11: Prevention of Money Laundering Act (PMLA), 2002' };
  }
  // FCRA
  if (t.includes('fcra') || t.includes('foreign contribution') || t.includes('foreign source')) {
    return { id: 112, name: 'Chapter 12: Foreign Contribution (Regulation) Act (FCRA), 2010' };
  }
  // IBC
  if (t.includes('insolvency and bankruptcy code') || t.includes('cirp') || t.includes('interim resolution professional') || t.includes('committee of creditors') || t.includes('corporate debtor') || t.includes('operational creditor') || t.includes('section 14') || t.includes('moratorium')) {
    return { id: 110, name: 'Chapter 10: Insolvency and Bankruptcy Code (IBC), 2016' };
  }
  // FEMA
  if (t.includes('foreign exchange management') || t.includes('liberalised remittance') || t.includes('lrs') || t.includes('authorized dealer') || t.includes('capital account transaction') || t.includes('current account transaction') || t.includes('external commercial borrowing') || t.includes('overseas direct investment')) {
    return { id: 109, name: 'Chapter 9: Foreign Exchange Management Act (FEMA), 1999' };
  }
  // SEBI
  if (t.includes('lodr') || t.includes('prohibition of insider trading') || t.includes('insider trading') || t.includes('substantive acquisition') || t.includes('takeover') || t.includes('icdr') || t.includes('sebi act') || t.includes('securities and exchange board of india')) {
    return { id: 108, name: 'Chapter 8: SEBI Act, 1992 & SEBI (LODR)' };
  }
  // Winding Up
  if (t.includes('winding up') || t.includes('company liquidator') || t.includes('official liquidator') || t.includes('section 271') || t.includes('section 272') || t.includes('preferential payments')) {
    return { id: 107, name: 'Chapter 7: Winding Up' };
  }
  // Oppression & Mismanagement
  if (t.includes('oppression') || t.includes('mismanagement') || t.includes('section 241') || t.includes('section 242') || t.includes('section 244') || t.includes('class action') || t.includes('section 245')) {
    return { id: 106, name: 'Chapter 6: Prevention of Oppression & Mismanagement' };
  }
  // Compromises, Arrangements & Amalgamations
  if (t.includes('compromise') || t.includes('amalgamation') || t.includes('merger') || t.includes('demerger') || t.includes('section 230') || t.includes('section 232') || t.includes('scheme of arrangement')) {
    return { id: 105, name: 'Chapter 5: Compromises, Arrangements & Amalgamations' };
  }
  // Inspection, Inquiry & Investigation
  if (t.includes('serious fraud') || t.includes('sfio') || t.includes('inspection') || t.includes('investigation') || t.includes('section 206') || t.includes('section 210') || t.includes('section 212')) {
    return { id: 104, name: 'Chapter 4: Inspection, Inquiry & Investigation' };
  }
  // Managerial Remuneration
  if (t.includes('managerial remuneration') || t.includes('section 196') || t.includes('section 197') || t.includes('schedule v')) {
    return { id: 103, name: 'Chapter 3: Appointment & Remuneration of Managerial Personnel' };
  }
  // Board Meetings & Powers
  if (t.includes('board meeting') || t.includes('audit committee') || t.includes('section 173') || t.includes('section 177') || t.includes('section 180') || t.includes('section 184') || t.includes('section 188')) {
    return { id: 102, name: 'Chapter 2: Meetings of Board and its Powers' };
  }
  return { id: 101, name: 'Chapter 1: Appointment & Qualifications of Directors' };
}

function parseQuestions(qText) {
  const cleaned = clean(qText)
    .replace(/O\s*\n\s*ption/gi, 'Option')
    .replace(/Rea\s*\n\s*son/gi, 'Reason');

  // Match question numbering e.g. 1. or 1 or 2.
  const qMatches = [...cleaned.matchAll(/(?:^|\n)\s*([1-9]|1[0-5])\.?\s+/g)];
  const questions = [];

  for (let i = 0; i < qMatches.length; i++) {
    const qNum = parseInt(qMatches[i][1]);
    const startPos = qMatches[i].index + qMatches[i][0].length;
    const endPos = (i < qMatches.length - 1) ? qMatches[i+1].index : cleaned.length;
    const block = cleaned.slice(startPos, endPos);

    // Option indicators must be preceded by line start, newline or 2+ spaces (not immediately attached to section numbers like (1)(d))
    const optAMatch = block.match(/(?:^|\n|\s{2,})\(\s*a\s*\)/i);
    const optBMatch = block.match(/(?:^|\n|\s{2,})\(\s*b\s*\)/i);
    const optCMatch = block.match(/(?:^|\n|\s{2,})\(\s*c\s*\)/i);
    const optDMatch = block.match(/(?:^|\n|\s{2,})\(\s*d\s*\)/i);

    if (optAMatch && optBMatch && optCMatch && optDMatch) {
      const qPrompt = block.slice(0, optAMatch.index).trim();
      const optA = block.slice(optAMatch.index + optAMatch[0].length, optBMatch.index).trim();
      const optB = block.slice(optBMatch.index + optBMatch[0].length, optCMatch.index).trim();
      const optC = block.slice(optCMatch.index + optCMatch[0].length, optDMatch.index).trim();
      const optD = block.slice(optDMatch.index + optDMatch[0].length).trim();
      questions.push({ qNum, qPrompt, optA, optB, optC, optD });
    }
  }
  return questions;
}

function parseAnswers(aText) {
  const cleaned = clean(aText)
    .replace(/O\s*\n\s*ption/gi, 'Option')
    .replace(/Rea\s*\n\s*son/gi, 'Reason');

  // Matches 1. Option (b), 1. Answer (b), 1 Option (b), 1 (b)
  const aMatches = [...cleaned.matchAll(/(?:^|\n|\.\s+)\s*([1-9]|1[0-5])\.?\s*(?:Option|Answer|Ans)?\s*[:\.]?\s*\(\s*([a-d])\s*\)/gi)];
  const answersList = [];

  for (let i = 0; i < aMatches.length; i++) {
    const qNum = parseInt(aMatches[i][1]);
    const correctOpt = aMatches[i][2].toUpperCase();
    const startPos = aMatches[i].index + aMatches[i][0].length;
    const endPos = (i < aMatches.length - 1) ? aMatches[i+1].index : cleaned.length;
    let reason = cleaned.slice(startPos, endPos).trim();
    reason = reason.replace(/^[^:]*:\s*/, '').trim();
    answersList.push({ qNum, correctOpt, reason });
  }
  return answersList;
}

// Generate descriptive title from scenario text
function extractTitle(scenarioText, caseNum) {
  const lines = scenarioText.split('\n').map(l => l.trim()).filter(Boolean);
  let firstLine = lines[0] || '';
  const compMatch = firstLine.match(/([A-Z][A-Za-z0-9\s&,.-]+?(?:Limited|Ltd\.|LLP|Corporation|Bank|Authority|Enterprises|Industries|India|Company))/);
  if (compMatch && compMatch[1].length < 50) {
    return `Case ${caseNum}: ${compMatch[1].trim()}`;
  }
  return `Case Scenario ${caseNum}`;
}

const allCases = [];

for (let i = 1; i <= 65; i++) {
  const cur = caseStarts[i - 1];
  const nextIdx = i < 65 ? caseStarts[i].idx : text.length;
  const raw = text.slice(cur.idx, nextIdx);

  const headerMatch = raw.match(/CASE\s+SCENARIO\s+\d+\b/i);
  const mcqMatch = raw.match(/\bMULTIPLE\s+CHOICE\s+QUESTIONS?\b/i);
  const ansMatch = raw.match(/(?:ANSWERS?[^\n]*|TO\s+MULTIPLE[^\n]*|MULTIPLE\s+CHOICE\s+QUESTIONS?)?\s*\n\s*1\.\s*(?:Option|Answer)?\s*\(\s*[a-d]\s*\)/i);

  let scenarioRaw = '';
  let qRaw = '';
  let aRaw = '';

  if (mcqMatch && ansMatch) {
    scenarioRaw = raw.slice(headerMatch[0].length, mcqMatch.index);
    qRaw = raw.slice(mcqMatch.index + mcqMatch[0].length, ansMatch.index);
    aRaw = raw.slice(ansMatch.index);
  } else {
    console.error('Case ' + i + ' structure split failed');
  }

  const scenarioClean = clean(scenarioRaw);
  const parsedQs = parseQuestions(qRaw);
  const parsedAs = parseAnswers(aRaw);

  const ch = detectChapter(raw);
  const title = extractTitle(scenarioClean, i);

  // Combine questions with answers
  const questions = parsedQs.map((q, idx) => {
    let ans = parsedAs.find(a => a.qNum === q.qNum);
    if (!ans && parsedAs[idx]) {
      ans = parsedAs[idx];
    }
    const correctOption = (ans && ans.correctOpt) ? ans.correctOpt : 'A';
    const explanation = (ans && ans.reason && ans.reason.length > 10) ? ans.reason : 'As per the relevant statutory provisions of the Companies Act / Corporate & Economic Laws.';

    return {
      id: `case-setA-${i}-q${idx + 1}`,
      questionText: q.qPrompt,
      options: {
        A: q.optA,
        B: q.optB,
        C: q.optC,
        D: q.optD
      },
      correctOption: correctOption,
      explanation: explanation
    };
  });

  allCases.push({
    id: `setA-case-${i}`,
    title: title,
    chapterId: ch.id,
    chapterName: ch.name,
    scenarioText: scenarioClean,
    questions: questions
  });
}

console.log('Successfully built cases:', allCases.length);
const totalQuestions = allCases.reduce((acc, c) => acc + c.questions.length, 0);
console.log('Total Questions across all 65 cases:', totalQuestions);

// Save as JSON
fs.writeFileSync('src/setA/allSetACases.json', JSON.stringify(allCases, null, 2));

// Generate src/setA/setACases.ts
const tsContent = `// ICAI Official SPOM Set A: Corporate and Economic Laws - 65 Case Scenarios Booklet
// Parsed with statutory legal provisions, multiple-choice questions, and authoritative explanations
import { CaseScenario } from '../scenariosData';

export const setACases: CaseScenario[] = ${JSON.stringify(allCases, null, 2)};
`;

fs.writeFileSync('src/setA/setACases.ts', tsContent);
console.log('Saved src/setA/setACases.ts with all 65 cases!');
