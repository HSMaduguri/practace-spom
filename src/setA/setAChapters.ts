import { Chapter } from '../scenariosData';

export interface OfficialSyllabusResource {
  id: string;
  module: string;
  section: string;
  chapterCode: string;
  title: string;
  url: string;
  chapterId?: number;
}

export const setAOfficialSyllabusResources: OfficialSyllabusResource[] = [
  {
    id: 'm1-ch1',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 1',
    title: 'Chapter 1: Appointment and Qualifications of Directors (Sec 149–172)',
    url: 'https://resource.cdn.icai.org/88586bos-aps2625m1-ch1.pdf',
    chapterId: 101
  },
  {
    id: 'm1-ch2',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 2',
    title: 'Chapter 2: Appointment and Remuneration of Managerial Personnel (Sec 196–205)',
    url: 'https://resource.cdn.icai.org/88587bos-aps2625m1-ch2.pdf',
    chapterId: 102
  },
  {
    id: 'm1-ch3',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 3',
    title: 'Chapter 3: Meetings of Board and its Powers (Sec 173–195)',
    url: 'https://resource.cdn.icai.org/88588bos-aps2625m1-ch3.pdf',
    chapterId: 103
  },
  {
    id: 'm1-ch4',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 4',
    title: 'Chapter 4: Inspection, Inquiry and Investigation (Sec 206–229)',
    url: 'https://resource.cdn.icai.org/88589bos-aps2625m1-ch4.pdf',
    chapterId: 104
  },
  {
    id: 'm1-ch5',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 5',
    title: 'Chapter 5: Compromises, Arrangements and Amalgamations (Sec 230–240)',
    url: 'https://resource.cdn.icai.org/88590bos-aps2625m1-ch5.pdf',
    chapterId: 105
  },
  {
    id: 'm1-ch6',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 6',
    title: 'Chapter 6: Prevention of Oppression and Mismanagement (Sec 241–246)',
    url: 'https://resource.cdn.icai.org/88591bos-aps2625m1-ch6.pdf',
    chapterId: 106
  },
  {
    id: 'm1-ch7',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 7',
    title: 'Chapter 7: Winding Up (Sec 270–365)',
    url: 'https://resource.cdn.icai.org/88592bos-aps2625m1-ch7.pdf',
    chapterId: 107
  },
  {
    id: 'm1-ch8',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 8',
    title: 'Chapter 8: Miscellaneous Provisions (Registered Valuer, Strike Off, Govt Co, Nidhi, Dormant Co & Sec 447)',
    url: 'https://resource.cdn.icai.org/88593bos-aps2625m1-ch8.pdf',
    chapterId: 108
  },
  {
    id: 'm1-ch9',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 9',
    title: 'Chapter 9: Adjudication, Special Courts, National Company Law Tribunal and Appellate Tribunal (Sec 407–454A)',
    url: 'https://resource.cdn.icai.org/88594bos-aps2625m1-ch9.pdf',
    chapterId: 109
  },
  {
    id: 'm1-ch10',
    module: 'Module 1',
    section: 'Part I • Section A: Company Law (50 Marks)',
    chapterCode: 'M1 – Ch 10',
    title: 'Chapter 10: e-Filing, MCA21 Version 3.0 & Case Studies Relating to Ethics (Sec 396–404)',
    url: 'https://resource.cdn.icai.org/88595bos-aps2625m1-ch10.pdf',
    chapterId: 110
  },
  {
    id: 'm2-ip',
    module: 'Module 2 (Index)',
    section: 'Official Syllabus & Detailed Contents (Modules 1 & 2)',
    chapterCode: 'M2 – IP',
    title: 'Module 2 Initial Pages & Complete Set A Syllabus Index (May 2026 & Onward)',
    url: 'https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf'
  },
  {
    id: 'm2-ch1',
    module: 'Module 2',
    section: 'Part I • Section B: Securities Laws (20 Marks)',
    chapterCode: 'M2 (Sec B) – Ch 1',
    title: 'Chapter 1: The SEBI Act, 1992, SEBI (LODR) 2015, SEBI (ICDR) 2018, SEBI (SAST) 2011 & SEBI (PIT) 2015',
    url: 'https://resource.cdn.icai.org/88559bos-aps2625m2-ch1.pdf',
    chapterId: 111
  },
  {
    id: 'm2-p2-ch1',
    module: 'Module 2',
    section: 'Part II • Economic Laws (30 Marks)',
    chapterCode: 'M2 (Part II) – Ch 1',
    title: 'Chapter 1: The Foreign Exchange Management Act (FEMA), 1999',
    url: 'https://resource.cdn.icai.org/88555bos-aps2625m2-p2-ch1.pdf',
    chapterId: 112
  },
  {
    id: 'm2-p2-ch2',
    module: 'Module 2',
    section: 'Part II • Economic Laws (30 Marks)',
    chapterCode: 'M2 (Part II) – Ch 2',
    title: 'Chapter 2: The Foreign Contribution (Regulation) Act (FCRA), 2010',
    url: 'https://resource.cdn.icai.org/88556bos-aps2625m2-p2-ch2.pdf',
    chapterId: 113
  },
  {
    id: 'm2-p2-ch3',
    module: 'Module 2',
    section: 'Part II • Economic Laws (30 Marks)',
    chapterCode: 'M2 (Part II) – Ch 3',
    title: 'Chapter 3: The Insolvency and Bankruptcy Code (IBC), 2016 (Up to Sec 33)',
    url: 'https://resource.cdn.icai.org/88557bos-aps2625m2-p2-ch3.pdf',
    chapterId: 114
  }
];

export const setAChapters: Chapter[] = [
  {
    id: 101,
    name: "Module 1 – Chapter 1: Appointment and Qualifications of Directors (Sec 149–172)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88586bos-aps2625m1-ch1.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Board composition (Sec 149), Woman Director (Rule 3), Resident Director (Sec 149(3)), Independent Directors & Data Bank (Sec 149–150), Small Shareholders' Director (Sec 151), DIN (Sec 152–159), Additional/Alternate/Casual/Nominee Directors (Sec 161), Disqualifications (Sec 164), Max Directorships (Sec 165), Duties (Sec 166), Vacation (Sec 167), Resignation (Sec 168), Removal (Sec 169), and Registers (Sec 170–172).",
    summaryNotes: [
      {
        title: "Board Composition, Woman Director & Resident Director (Sec 149)",
        bullets: [
          "Minimum & Maximum Directors (Sec 149(1)): Public Company = Min 3; Private Company = Min 2; OPC = Min 1. Maximum = 15 directors (can exceed 15 by passing Special Resolution; Section 8 and Government companies exempt from SR requirement).",
          "Woman Director (2nd Proviso to Sec 149(1) & Rule 3): Mandatory at least 1 Woman Director for: (i) Every Listed Company; and (ii) Every other Public Company having Paid-up Share Capital >= Rs. 100 Crore OR Turnover >= Rs. 300 Crore as per latest audited financial statements.",
          "Intermittent Vacancy of Woman Director: Must be filled by the Board at the earliest, but not later than immediate next Board Meeting OR 3 months from the date of such vacancy, whichever is LATER.",
          "Resident Director (Sec 149(3)): Every company shall have at least 1 director who stays in India for a total period of not less than 182 days during the financial year (proportionate for newly incorporated companies)."
        ]
      },
      {
        title: "Independent Directors, Selection Data Bank & Small Shareholders' Director (Sec 149–151)",
        bullets: [
          "Listed Company ID Quota (Sec 149(4)): Minimum 1/3rd of total number of directors (any fraction rounded off as one).",
          "Unlisted Public Company ID Thresholds (Rule 4): Minimum 2 Independent Directors if: (a) Paid-up Share Capital >= Rs. 10 Crore; OR (b) Turnover >= Rs. 100 Crore; OR (c) Aggregate outstanding loans, debentures, and deposits > Rs. 50 Crore. Exempt: Joint Venture, Wholly Owned Subsidiary, and Dormant Company.",
          "Pecuniary & Relative Restrictions (Sec 149(6)): No pecuniary relationship (other than remuneration as ID or transaction <= 10% of his total income) during 2 immediately preceding FYs or current FY; relative's pecuniary transaction cannot exceed 2% of gross turnover/total income or Rs. 50 Lakh (whichever is lower); not a KMP/employee in preceding 3 FYs.",
          "Tenure & Cooling-off (Sec 149(10)-(11)): Term up to 5 consecutive years; eligible for 2nd term of 5 years via Special Resolution; mandatory 3-year cooling-off period after 2 consecutive terms. Exempt from retirement by rotation (Sec 149(13)).",
          "Small Shareholders' Director (Sec 151 & Rule 7): Listed company may appoint 1 director elected by small shareholders (holding shares of nominal value <= Rs. 20,000) upon notice of >= 1,000 small shareholders or 1/10th of total small shareholders, whichever is lower. Tenure <= 3 consecutive years, not liable to retire by rotation."
        ]
      },
      {
        title: "Retirement by Rotation, Additional/Alternate/Casual Directors, Disqualifications & Vacation (Sec 152–172)",
        bullets: [
          "Rotational Directors (Sec 152(6)): At least 2/3rd of total directors of a public company (excluding Independent Directors) shall be rotational; 1/3rd (or nearest number) of such rotational directors retire at every AGM.",
          "Section 160 Notice & Deposit: Person other than retiring director requires 14 days written notice + Rs. 1,00,000 deposit (refunded if elected or secures > 25% of total valid votes; no deposit required if recommended by NRC or Board).",
          "Additional, Alternate & Casual Vacancy Directors (Sec 161): Additional Director (161(1)) holds office up to date of next AGM or last date on which AGM should have been held, whichever is earlier. Alternate Director (161(2)) appointed if director is absent from India for >= 3 months. Casual Vacancy (161(4)) in public company filled by Board and subsequently approved in immediate next General Meeting.",
          "Disqualifications & Vacation (Sec 164, 165 & 167): Sec 164(2) disqualifies directors for 5 years if company fails to file financial statements OR annual returns for continuous 3 FYs, OR fails to repay deposits/debentures/interest/declared dividend for >= 1 year. Under Sec 167(1)(a) proviso, director vacates office in ALL companies EXCEPT the defaulting company. Max directorships (Sec 165) = 20 companies (max 10 public companies; dormant & Section 8 companies excluded)."
        ]
      }
    ],
    formulas: [
      {
        name: "Woman Director Applicability Test (Sec 149(1) & Rule 3)",
        formula: "Every Listed Company OR Public Co with [Paid-up Capital >= Rs. 100 Cr OR Turnover >= Rs. 300 Cr]",
        description: "Intermittent vacancy must be filled by next Board Meeting OR 3 months from vacancy, whichever is later."
      },
      {
        name: "Independent Director Unlisted Public Threshold (Sec 149(4) & Rule 4)",
        formula: "Paid-up Capital >= Rs. 10 Cr OR Turnover >= Rs. 100 Cr OR Aggregate Borrowings > Rs. 50 Cr",
        description: "Requires minimum 2 Independent Directors. Joint Ventures, WOS, and Dormant Companies are exempt."
      },
      {
        name: "Rotational & Retiring Directors Calculation (Sec 152(6))",
        formula: "Rotational Pool = Ceil(2/3 x [Total Directors - Independent Directors]); Retiring at AGM = RoundNearest(1/3 x Rotational Pool)",
        description: "Rotational pool rounds UP to next integer; retiring 1/3rd rounds to NEAREST integer."
      },
      {
        name: "Maximum Directorships Cap (Sec 165(1))",
        formula: "Total Directorships <= 20 Companies (Public + Deemed Public <= 10) [Dormant & Sec 8 Excluded]",
        description: "Members can specify a lesser number of companies by passing a Special Resolution."
      }
    ]
  },
  {
    id: 102,
    name: "Module 1 – Chapter 2: Appointment and Remuneration of Managerial Personnel (Sec 196–205)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88587bos-aps2625m1-ch2.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Appointment of MD, WTD or Manager (Sec 196), Appointment of KMP (Sec 203), Functions of CS (Sec 205), Overall Maximum Managerial Remuneration & Inadequate Profits (Sec 197), Recovery of Remuneration (Sec 199), Calculation of Net Profits (Sec 198), Compensation for Loss of Office (Sec 202), Secretarial Audit (Sec 204), and Schedule V (Parts I–IV).",
    summaryNotes: [
      {
        title: "Appointment of MD, WTD, Manager & Key Managerial Personnel (Sec 196 & 203)",
        bullets: [
          "Prohibition & Term (Sec 196(1)-(2)): No company shall appoint or employ a Managing Director and a Manager at the same time. Maximum term = 5 years at a time; re-appointment cannot be made earlier than 1 year before expiry of current term.",
          "Age & Schedule V Part I Eligibility (Sec 196(3)): Minimum age = 21 years; reaching 70 years requires Special Resolution (or Ordinary Resolution if votes cast in favour exceed votes against and Central Govt approves). Return of appointment in Form MR-1 within 60 days.",
          "Whole-Time Key Managerial Personnel (Sec 203 & Rule 8/8A): Every listed company and every other public company having Paid-up Share Capital >= Rs. 10 Crore must appoint whole-time KMP (MD/CEO/Manager/WTD, CS, and CFO). Every private company having Paid-up Share Capital >= Rs. 10 Crore must appoint a whole-time Company Secretary (Rule 8A).",
          "KMP Vacancy & Dual Holding (Sec 203(3)-(4)): Whole-time KMP cannot hold office in more than 1 company except in its subsidiary company at the same time (MD/Manager can be appointed in 1 other company with unanimous Board resolution). Vacancy in KMP must be filled at a Board meeting within 6 months."
        ]
      },
      {
        title: "Overall Managerial Remuneration Ceilings & Schedule V (Sec 197–199)",
        bullets: [
          "Overall Cap (Sec 197(1)): Total managerial remuneration payable by a public company to its directors (MD, WTD, Manager, and other directors) shall not exceed 11% of Net Profits calculated under Sec 198 (excluding sitting fees up to Rs. 1,00,000 per meeting).",
          "Sub-Ceilings within 11%: (a) 1 MD/WTD/Manager: Max 5% of Net Profits; (b) > 1 MD/WTD: Max 10% combined; (c) Non-Executive Directors (NEDs): Max 1% if company has MD/WTD/Manager, OR Max 3% if no MD/WTD/Manager. Exceeding these caps requires Special Resolution (plus prior approval of Bank/PFI/Debenture holders if default in repayment).",
          "Inadequacy or Absence of Profits (Sec 197(3) & Schedule V Part II): Based on Effective Capital: (i) Negative or < Rs. 5 Cr: Max Rs. 60 Lakhs (MD/WTD) / Rs. 12 Lakhs (NED); (ii) Rs. 5 Cr to < Rs. 100 Cr: Max Rs. 84 Lakhs / Rs. 17 Lakhs; (iii) Rs. 100 Cr to < Rs. 250 Cr: Max Rs. 120 Lakhs / Rs. 24 Lakhs; (iv) >= Rs. 250 Cr: Rs. 120 Lakhs + 0.01% of Effective Capital in excess of Rs. 250 Cr. Limits can be exceeded by passing a Special Resolution.",
          "Waiver & Clawback (Sec 197(10) & 199): Waiver of recovery of excess remuneration requires Special Resolution within 2 years. In case of restatement of financial statements due to fraud or non-compliance, past or present MD/WTD/Manager/CEO must refund excess remuneration received (Sec 199)."
        ]
      },
      {
        title: "Compensation for Loss of Office & Secretarial Audit (Sec 202 & 204)",
        bullets: [
          "Compensation for Loss of Office (Sec 202): Payable ONLY to MD, WTD, or Manager (NOT to ordinary/non-executive directors). Quantum capped at remuneration he would have earned for the unexpired residue of his term OR 3 years, whichever is shorter, calculated on the basis of average remuneration actually earned during the preceding 3 years (or shorter period held).",
          "Secretarial Audit in Form MR-3 (Sec 204 & Rule 9): Mandatory for: (a) Every Listed Company; (b) Every Public Company with Paid-up Share Capital >= Rs. 50 Crore; (c) Every Public Company with Turnover >= Rs. 250 Crore; (d) Every Company having outstanding loans or borrowings from banks or PFIs >= Rs. 100 Crore."
        ]
      }
    ],
    formulas: [
      {
        name: "Managerial Remuneration Profit Ceilings (Sec 197(1))",
        formula: "Overall <= 11% | 1 MD/WTD <= 5% | >1 MD/WTD <= 10% | NEDs <= 1% (with MD) or 3% (no MD)",
        description: "Computed on Net Profits under Sec 198. Sitting fees (up to Rs. 1 Lakh/meeting) are excluded from the 11% ceiling."
      },
      {
        name: "Effective Capital Computation (Schedule V Explanation I)",
        formula: "Paid-up Capital (excl. share application) + Reserves & Surplus (excl. Revaluation) + Long-Term Loans & Deposits (>1 yr) - [Investments + Accumulated Losses + Preliminary Expenses]",
        description: "Calculated as on the last date of the financial year preceding the financial year in which appointment is made."
      },
      {
        name: "Compensation for Loss of Office Cap (Sec 202(3))",
        formula: "Max Compensation = Avg Annual Remuneration (Last 3 Yrs) x Min(Unexpired Residue of Term, 3 Years)",
        description: "Only MD, WTD, or Manager are eligible. No compensation if company is wound up within 12 months due to his negligence."
      },
      {
        name: "Secretarial Audit Applicability (Sec 204 & Rule 9)",
        formula: "Listed Co OR Public Co [Paid-up Capital >= Rs. 50 Cr OR Turnover >= Rs. 250 Cr] OR Any Co [Bank/PFI Borrowings >= Rs. 100 Cr]",
        description: "Secretarial Audit Report in Form MR-3 must be annexed to the Board's Report."
      }
    ]
  },
  {
    id: 103,
    name: "Module 1 – Chapter 3: Meetings of Board and its Powers (Sec 173–195)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88588bos-aps2625m1-ch3.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Meetings of Board (Sec 173), Quorum (Sec 174), Resolution by Circulation (Sec 175), Audit Committee & Vigil Mechanism (Sec 177), NRC & SRC (Sec 178), Powers & Restrictions on Board (Sec 179–180), Charitable/Political/NDF Contributions (Sec 181–183), Disclosure of Interest (Sec 184), Loan to Directors (Sec 185), Inter-Corporate Loans & Investments (Sec 186), RPTs (Sec 188), Non-Cash Transactions (Sec 192), and OPC Contracts (Sec 193).",
    summaryNotes: [
      {
        title: "Board Meetings, Notice, Quorum & Resolution by Circulation (Sec 173–175)",
        bullets: [
          "Frequency (Sec 173(1)): First Board Meeting within 30 days of incorporation. Thereafter, minimum 4 meetings every year with maximum gap of 120 days between two consecutive meetings. OPC, Small Company, Dormant Company & Startup Private Company: at least 1 meeting in each half of a calendar year with minimum gap of 90 days (no meeting needed if OPC has only 1 director).",
          "Notice (Sec 173(3)): Minimum 7 days written notice to every director at registered address. Shorter notice permitted for urgent business if at least 1 Independent Director is present (or circulated to all directors and ratified by at least 1 ID).",
          "Quorum (Sec 174): 1/3rd of total strength OR 2 directors, whichever is higher (any fraction rounded off as one). Interested directors (Sec 184(2)) are excluded; if interested directors >= 2/3rd of total strength, remaining non-interested directors present (>= 2) form quorum. Section 8 companies: 8 members or 25% of total strength, whichever is less (min 2).",
          "Resolution by Circulation (Sec 175): Approved by majority of directors entitled to vote. However, if >= 1/3rd of total number of directors require that the resolution under circulation be decided at a meeting, the Chairperson shall put the resolution to be decided at a Board meeting."
        ]
      },
      {
        title: "Board Committees, Powers, Restrictions & Contributions (Sec 177–183)",
        bullets: [
          "Audit Committee & NRC (Sec 177 & 178): Mandatory for Listed Public Companies + Unlisted Public Companies with Paid-up Capital >= Rs. 10 Cr OR Turnover >= Rs. 100 Cr OR Aggregate Borrowings > Rs. 50 Cr. Audit Committee: Min 3 directors with majority Independent Directors. NRC: Min 3 Non-Executive Directors with >= 50% Independent Directors.",
          "Stakeholders Relationship Committee (Sec 178(5)): Mandatory where company has > 1,000 shareholders, debenture-holders, deposit-holders, and any other security holders at any time during a financial year. Chaired by a Non-Executive Director.",
          "Restrictions on Powers of Board (Sec 180): Requires Special Resolution to: (a) Sell, lease, or dispose of whole/substantially whole of undertaking (>= 20% of net worth OR generates >= 20% of total income); (b) Invest compensation received from merger/amalgamation; (c) Borrow money where money to be borrowed + already borrowed > Paid-up Share Capital + Free Reserves + Securities Premium (excluding temporary loans); (d) Remit or give time for repayment of any debt due from a director.",
          "Contributions (Sec 181–183): Bona fide Charitable Funds (Sec 181): Board can contribute up to 5% of average net profits of 3 immediately preceding FYs; exceeding 5% requires prior General Meeting approval (Ordinary Resolution). Political Contributions (Sec 182): Government companies and companies in existence for < 3 FYs are prohibited; others can contribute any amount via resolution passed at a Board meeting (no circular resolution; no cash contribution). National Defence Fund (Sec 183): Unlimited amount, can be approved by Board or person/committee authorized."
        ]
      },
      {
        title: "Loans to Directors, Inter-Corporate Investments & Related Party Transactions (Sec 184–193)",
        bullets: [
          "Loans to Directors (Sec 185): Sub-section (1) completely prohibits loan/guarantee/security to any director of company or holding company, or partner/relative of such director, or firm in which director/relative is partner. Sub-section (2) allows advancing loan/guarantee/security to any person in whom director is interested ONLY if: (a) Special Resolution is passed in General Meeting; AND (b) Loans are utilized by the borrowing company for its principal business activities.",
          "Loan & Investment by Company (Sec 186): Max 2 layers of investment subsidiaries. Unanimous Board Resolution (all directors present) required for every loan/investment/guarantee. Prior Special Resolution required if aggregate loans/investments/guarantees exceed Higher of: (i) 60% of [Paid-up Share Capital + Free Reserves + Securities Premium], OR (ii) 100% of [Free Reserves + Securities Premium]. Interest rate on loan cannot be lower than prevailing yield of 1/3/5/10 year Government Security closest to tenor.",
          "Related Party Transactions (Sec 188 & Rule 15): Board resolution at a meeting (or prior Ordinary Resolution if Sale/Purchase/Supply of goods or property >= 10% of Turnover or Net Worth; Leasing >= 10% of Turnover; Availing/rendering services >= 10% of Turnover; Office or place of profit > Rs. 2.5 Lakh/month; Underwriting > 1% of Net Worth). Exempt if in ordinary course of business AND at arm's length price."
        ]
      }
    ],
    formulas: [
      {
        name: "Board Meeting Quorum Formula (Sec 174(1))",
        formula: "Quorum = Max(2, Ceil(Total Strength in Office / 3)) [Interested Directors Excluded]",
        description: "For Section 8 companies: Min(8 Directors, 25% of Total Strength), subject to minimum 2."
      },
      {
        name: "Section 180(1)(c) Borrowing Power Threshold",
        formula: "Proposed Borrowing + Existing Long-Term Borrowings > Paid-up Share Capital + Free Reserves + Securities Premium",
        description: "Exceeding this ceiling requires prior approval of shareholders by Special Resolution. Private companies are exempt."
      },
      {
        name: "Section 186(2) Inter-Corporate Loan & Investment Ceiling",
        formula: "Ceiling = Max(60% of [PSC + Free Reserves + SP], 100% of [Free Reserves + SP])",
        description: "Prior Special Resolution required if proposed loan/investment/guarantee crosses this limit (WOS loan/guarantee exempt from SR)."
      }
    ]
  },
  {
    id: 104,
    name: "Module 1 – Chapter 4: Inspection, Inquiry and Investigation (Sec 206–229)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88589bos-aps2625m1-ch4.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Power to call for information & inspect books (Sec 206–208), Search and seizure (Sec 209), Investigation into affairs of company (Sec 210), SFIO Establishment & Investigation (Sec 211–212), Investigation by Tribunal (Sec 213), Protection of employees (Sec 218), Freezing of assets (Sec 221), Restrictions on securities (Sec 222), and Inspector's Report (Sec 223–229).",
    summaryNotes: [
      {
        title: "Call for Information, Inspection, Inquiry & Seizure (Sec 206–209)",
        bullets: [
          "Call for Information & Inspection (Sec 206–207): Registrar (RoC) may by written notice call for information/explanation or inspect books. Conviction of director or officer under Sec 207(4) results in automatic vacation of office from the date of conviction AND disqualification from holding office in any company.",
          "Search and Seizure (Sec 209): RoC or Inspector may enter, search, and seize books and papers ONLY after obtaining an order from the Special Court. Books seized can be retained for a maximum of 180 days, and may be called again for a further period of 180 days by an order in writing."
        ]
      },
      {
        title: "Investigation into Affairs of Company & SFIO (Sec 210–213)",
        bullets: [
          "Central Government Investigation (Sec 210): Discretionary on: (a) Report of RoC under Sec 208; (b) Intimation of Special Resolution passed by company; (c) In public interest. MANDATORY where an order is passed by a Court or the Tribunal (NCLT).",
          "Serious Fraud Investigation Office - SFIO (Sec 211–212): Once Central Government assigns investigation to SFIO, no other investigating agency of Central/State Government shall proceed with investigation in respect of any offence under this Act. Offences under Sec 447 (Fraud) are cognizable and non-bailable with stringent twin bail conditions (Public Prosecutor heard + reasonable grounds that accused is not guilty).",
          "Investigation by Tribunal (Sec 213): Application by >= 100 members OR members holding >= 1/10th of total voting power (for company with share capital); OR >= 1/5th of members (for company without share capital); OR by any other person suggesting fraud/unlawful purpose/misconduct."
        ]
      },
      {
        title: "Protection of Employees, Freezing of Assets & Securities Restrictions (Sec 218–229)",
        bullets: [
          "Protection of Employees during Investigation (Sec 218): Company cannot discharge, suspend, punish, or reduce rank of any employee during pendency of investigation without prior approval of the Tribunal (NCLT). If NCLT does not raise objection within 30 days of application, company may proceed.",
          "Freezing of Assets (Sec 221) & Restrictions on Securities (Sec 222): NCLT may freeze removal/transfer/disposal of funds or assets for a period not exceeding 3 years. NCLT may also impose restrictions on transfer/voting rights of securities for a period not exceeding 3 years."
        ]
      }
    ],
    formulas: [
      {
        name: "Search & Seizure Book Retention Limit (Sec 209(2))",
        formula: "Initial Retention <= 180 Days (+ Re-requisition <= 180 Days via written order)",
        description: "Requires prior order of the Special Court before conducting search and seizure."
      },
      {
        name: "NCLT Asset Freezing & Security Restriction Cap (Sec 221 & 222)",
        formula: "Maximum Duration of Freezing / Restriction = 3 Years",
        description: "Contravention attracts fine on company (Rs. 1 Lakh to Rs. 25 Lakh) and imprisonment up to 3 years for officer."
      }
    ]
  },
  {
    id: 105,
    name: "Module 1 – Chapter 5: Compromises, Arrangements and Amalgamations (Sec 230–240)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88590bos-aps2625m1-ch5.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Compromise or Arrangement (Sec 230), Enforcement by Tribunal (Sec 231), Merger and Amalgamation (Sec 232), Fast Track Merger (Sec 233), Cross-Border Merger (Sec 234), Acquisition of Dissenting Shareholders (Sec 235), Minority Squeeze-Out (Sec 236), Amalgamation in Public Interest (Sec 237), and Preservation of Books (Sec 239–240).",
    summaryNotes: [
      {
        title: "Scheme of Compromise, Arrangement & Merger (Sec 230–232)",
        bullets: [
          "NCLT Meeting & Statutory Majority (Sec 230(6)): Scheme must be approved by a majority in number (> 50% of persons present and voting) representing 3/4th (>= 75%) in value of the creditors or class of creditors or members or class of members voting in person, by proxy, or by postal ballot.",
          "Dispensation of Creditors' Meeting (Sec 230(9)): NCLT may dispense with calling a meeting of creditor(s) where creditors having at least 90% value agree and confirm by way of affidavit.",
          "Threshold for Raising Objections (Sec 230(4)): Objections to a compromise or arrangement can be made ONLY by persons holding >= 10% of the shareholding OR having outstanding debt amounting to >= 5% of total outstanding debt as per latest audited financial statement.",
          "Notice to Regulatory Authorities (Sec 230(5)): Authorities (CG, RBI, SEBI, RoC, Official Liquidator, Income Tax, CCI) must make representations within 30 days from receipt of notice."
        ]
      },
      {
        title: "Fast Track Merger & Cross-Border Merger (Sec 233 & 234)",
        bullets: [
          "Fast Track Merger Eligibility (Sec 233): Available to: (i) Two or more Small Companies; (ii) Holding company and its Wholly-Owned Subsidiary (WOS); (iii) Two or more Start-up companies, or Start-up company with Small Company.",
          "Fast Track Approval Thresholds (Sec 233(1)): Requires: (a) Declaration of Solvency filed by each company; (b) Approval by members holding at least 90% of total number of shares at a general meeting; AND (c) Approval by majority representing 9/10th (90%) in value of the creditors or class of creditors of respective companies. Registered by Regional Director (RD) without NCLT petition unless RD objects within 60 days.",
          "Cross-Border Merger (Sec 234): Foreign company may merge into an Indian company or vice versa with prior approval of the Reserve Bank of India (RBI) and in compliance with Sec 230–232."
        ]
      },
      {
        title: "Dissenting Shareholders, Minority Squeeze-Out & Public Interest Merger (Sec 235–240)",
        bullets: [
          "Acquisition of Dissenting Shareholders (Sec 235): If scheme/contract involving transfer of shares to another company (transferee) is approved by holders of >= 9/10th (90%) in value of the shares (excluding shares already held by transferee/nominee) within 4 months of offer, transferee company may within 2 months after expiry of the 4 months give notice to acquire dissenting shareholders' shares (dissenting shareholder has 1 month to apply to NCLT).",
          "Purchase of Minority Shareholding (Sec 236): When acquirer/PAC becomes registered holder of >= 90% of issued equity share capital, acquirer shall notify the company of intention to buy remaining equity shares at a price determined by a Registered Valuer. Price proceeds must be disbursed to entitled shareholders within 60 days.",
          "Preservation of Books & Papers (Sec 239): Books and papers of an amalgamated or transferor company shall NOT be disposed of without prior permission of the Central Government."
        ]
      }
    ],
    formulas: [
      {
        name: "Scheme Approval Dual Majority Test (Sec 230(6))",
        formula: "Majority in Number (> 50% present & voting) AND >= 75% (3/4th) in Value of present & voting",
        description: "Compare with Fast Track Merger (Sec 233) which requires >= 90% of Total Shares and >= 90% in value of Total Creditors."
      },
      {
        name: "Objection Locus Standi Threshold (Sec 230(4))",
        formula: "Shareholding >= 10% of Total Paid-up Capital OR Outstanding Debt >= 5% of Total Debt",
        description: "Tested as per the latest audited financial statement."
      },
      {
        name: "Section 235 Dissenting Squeeze-Out Timeline",
        formula: "90% Approval within 4 Months of Offer -> Notice within next 2 Months -> NCLT Objection within 1 Month",
        description: "Shares already held by transferee company or its nominees/subsidiaries are excluded from the 90% calculation."
      }
    ]
  },
  {
    id: 106,
    name: "Module 1 – Chapter 6: Prevention of Oppression and Mismanagement (Sec 241–246)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88591bos-aps2625m1-ch6.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Application to Tribunal for relief in cases of oppression & mismanagement (Sec 241), Right to apply & waiver (Sec 244), Powers of Tribunal (Sec 242), Consequences of termination or modification of agreements (Sec 243), Class Action Suits (Sec 245), and Application of provisions (Sec 246).",
    summaryNotes: [
      {
        title: "Application for Relief & Eligibility Thresholds (Sec 241 & 244)",
        bullets: [
          "Grounds under Sec 241(1): (a) Affairs of the company are being conducted in a manner prejudicial to public interest or oppressive to any member(s) or prejudicial to the interests of the company; OR (b) Material change has taken place in the management or control of the company and by reason of such change, it is likely that the affairs will be conducted in a manner prejudicial to its interests or its members.",
          "Right to Apply (Sec 244(1)): (a) Company having Share Capital: Not less than 100 members OR not less than 1/10th (10%) of total number of members, whichever is LESS, OR any member(s) holding not less than 1/10th (10%) of issued share capital (all calls/sums due must be paid); (b) Company NOT having Share Capital: Not less than 1/5th (20%) of total number of members.",
          "NCLT Waiver & Withdrawal: Proviso to Sec 244(1) empowers the Tribunal (NCLT) to waive all or any of the eligibility requirements. Once filed, an application cannot be withdrawn without leave of the Tribunal, and subsequent reduction in shareholding/withdrawal of consent by some applicants does not invalidate a validly instituted petition."
        ]
      },
      {
        title: "Powers of Tribunal & Consequences of Agreement Termination (Sec 242 & 243)",
        bullets: [
          "Powers of Tribunal (Sec 242): Regulation of conduct of affairs, purchase of shares of any members by other members or by the company (with consequent reduction of share capital), restriction on transfer/allotment of shares, termination/setting aside/modification of agreements with MD/director/manager or third parties (within 3 months prior to application), and removal of MD/manager/director.",
          "Consequence of Termination/Modification (Sec 243): Where an order under Sec 242 terminates or sets aside an agreement with MD, WTD, Manager, or Director: (a) He shall NOT be entitled to claim any damages or compensation for loss of office; AND (b) He shall NOT be appointed as MD/Manager/Director of that company for a period of 5 years from the date of the order without leave of the Tribunal."
        ]
      },
      {
        title: "Class Action Suits (Sec 245 & Rule 84)",
        bullets: [
          "Member Threshold for Class Action: Company with Share Capital: Minimum 100 members OR 5% of total number of members (whichever is less), OR members holding >= 5% of issued share capital (for Unlisted Company) or >= 2% of issued share capital (for Listed Company).",
          "Depositor Threshold for Class Action: Minimum 100 depositors OR 5% of total number of depositors (whichever is less), OR depositors to whom the company owes >= 5% of total deposits of the company.",
          "Scope & Exemption: Can claim damages/compensation or demand any other suitable action from the company, directors, auditors (including audit firm AND individual partners jointly and severally), or experts/advisors. Section 245 does NOT apply to a Banking Company."
        ]
      }
    ],
    formulas: [
      {
        name: "Section 244 Oppression Petition Eligibility",
        formula: "Share Capital Co: Min(100 Members, 10% of Total Members) OR >= 10% of Issued Share Capital | No Capital Co: >= 20% of Members",
        description: "Joint holders of shares are counted as ONE member for the numerical head-count test."
      },
      {
        name: "Section 245 Class Action Suit Thresholds",
        formula: "Members: Min(100, 5% of Members) OR Shareholding >= 5% (Unlisted) / >= 2% (Listed) | Depositors: Min(100, 5% of Depositors) OR >= 5% of Total Deposits",
        description: "Banking companies are completely excluded from Section 245 Class Action suits."
      }
    ]
  },
  {
    id: 107,
    name: "Module 1 – Chapter 7: Winding Up (Sec 270–365)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88592bos-aps2625m1-ch7.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Modes & circumstances of Winding Up by Tribunal (Sec 270–271), Petition for Winding Up (Sec 272), Powers of Tribunal & Statement of Affairs (Sec 273–274), Company Liquidators (Sec 275–276), Advisory Committee (Sec 287), Overriding Preferential Payments (Sec 326–327), Fraudulent Preference & Void Transfers (Sec 328–332), Disclaimer of Onerous Property (Sec 333), and Dissolution (Sec 302 & 356).",
    summaryNotes: [
      {
        title: "Circumstances & Petition for Winding Up by Tribunal (Sec 271 & 272)",
        bullets: [
          "5 Grounds for Winding Up by Tribunal (Sec 271): (a) Company has by Special Resolution resolved to be wound up by Tribunal; (b) Company has acted against the sovereignty and integrity of India, security of the State, friendly relations with foreign States, public order, decency or morality; (c) On application by Registrar or person authorized by CG, Tribunal is of opinion that affairs have been conducted in a fraudulent manner or company was formed for fraudulent/unlawful purpose; (d) Company has made default in filing with Registrar its financial statements OR annual returns for immediately preceding 5 consecutive financial years; (e) Tribunal is of opinion that it is just and equitable that the company should be wound up.",
          "Eligible Petitioners (Sec 272): (a) The Company (accompanied by Statement of Affairs); (b) Any Contributory or Contributories (even if holding fully paid-up shares or company has no assets, provided shares were originally allotted to him OR held by him and registered in his name for at least 6 months during the 18 months immediately before commencement of winding up, or devolved through death of former holder); (c) The Registrar (with previous sanction of Central Government); (d) Any person authorized by Central Government; (e) Central or State Government (on ground of sovereignty/security).",
          "Timeline for Order & Statement of Affairs (Sec 273–274): Tribunal shall pass order on winding up petition within 90 days from presentation. Statement of Affairs must be filed within 30 days (+ 30 days extension by Tribunal)."
        ]
      },
      {
        title: "Liquidator, Advisory Committee & Preferential Payments (Sec 275–327)",
        bullets: [
          "Company Liquidator & Declaration (Sec 275): Appointed from the panel of Insolvency Professionals registered under IBC, 2016. Must file declaration of independence/conflict of interest within 7 days of appointment. Report to Tribunal within 60 days of winding up order (Sec 281).",
          "Advisory Committee (Sec 287): Maximum 12 members consisting of creditors and contributories in such proportion as Tribunal directs; chaired by the Company Liquidator.",
          "Overriding Preferential Payments (Sec 326): Pari passu first charge for: (a) Workmen's dues; and (b) Debts due to secured creditors (to the extent compromised by workmen's portion). Workmen's dues (salary/wages for up to 2 years) must be paid in priority to all other debts within 30 days of sale of assets."
        ]
      },
      {
        title: "Fraudulent Preference, Floating Charge, Onerous Property & Dissolution (Sec 328–356)",
        bullets: [
          "Fraudulent Preference (Sec 328) & Avoidance of Voluntary Transfer (Sec 329): Fraudulent preference of a creditor within 6 months before presentation of winding up petition may be declared invalid by Tribunal. Any transfer of property/goods not in the ordinary course of business or not in good faith for valuable consideration made within 1 year before presentation of petition is void against the Company Liquidator.",
          "Effect of Floating Charge (Sec 332): A floating charge created within 12 months immediately preceding the commencement of winding up is invalid (unless company was solvent immediately after creation), except to the amount of any cash paid to the company at the time of or subsequent to the creation with interest at 5% p.a.",
          "Disclaimer of Onerous Property (Sec 333) & Void Dissolution (Sec 356): Liquidator may with leave of Tribunal disclaim onerous property within 12 months of commencement of winding up (or 12 months after becoming aware). Tribunal may declare dissolution void on application made within 2 years of the date of dissolution (Sec 356)."
        ]
      }
    ],
    formulas: [
      {
        name: "Contributory Holding Period Requirement (Sec 272(2))",
        formula: "Original Allottee OR Inherited on Death OR Held & Registered >= 6 Months during preceding 18 Months",
        description: "A contributory can petition even if he holds fully paid-up shares or the company has no surplus assets."
      },
      {
        name: "Clawback Look-Back Periods in Winding Up (Sec 328, 329 & 332)",
        formula: "Fraudulent Preference: 6 Months | Voluntary Non-Ordinary Transfer: 1 Year | Floating Charge: 12 Months",
        description: "Measured backward from the presentation/commencement of the winding up petition."
      }
    ]
  },
  {
    id: 108,
    name: "Module 1 – Chapter 8: Miscellaneous Provisions (Sec 247–252, 394–406 & 447–470)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88593bos-aps2625m1-ch8.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Registered Valuer (Sec 247), Removal of Names / Strike Off & Revival (Sec 248–252), Government Companies (Sec 394–395), Nidhis (Sec 406 & Nidhi Rules, 2014), Punishment for Fraud (Sec 447), Dormant Company (Sec 455), and General Miscellaneous Provisions (Sec 448–470).",
    summaryNotes: [
      {
        title: "Registered Valuer & Strike Off / Removal of Names (Sec 247–252)",
        bullets: [
          "Registered Valuer (Sec 247 & Valuation Rules, 2017): Appointed by the Audit Committee or, in its absence, by the Board of Directors. Valuer must NOT conduct valuation of any assets in which he has a direct or indirect interest during 3 years prior to appointment OR 3 years after valuation is conducted. Authority (IBBI) grants registration certificate within 60 days of application (excluding time given for additional documents). Partnership entity/company is ineligible if all partners/directors are disqualified, or if it is not a member of a Registered Valuers Organisation (RVO); foreign resident cannot act as Registered Valuer (Rule 3).",
          "Removal of Name by RoC / Voluntary Strike Off (Sec 248): Grounds: (a) Failed to commence business within 1 year of incorporation; (b) Not carrying on business for 2 immediately preceding FYs and has not applied for Dormant status under Sec 455; (c) Subscribers have not paid subscription within 180 days (Sec 10A); (d) Not carrying on business on physical verification. Voluntary application by company (Form STK-2) requires extinguishing all liabilities AND passing a Special Resolution (or consent of 75% members in terms of paid-up share capital).",
          "Restrictions on Voluntary Strike Off (Sec 249): Cannot apply under Sec 248(2) if at any time in the previous 3 months the company has: (a) Changed its name or shifted registered office from one State to another; (b) Made disposal for value of property/rights immediately before cesser of trade; (c) Engaged in any other activity except what is necessary for making the application.",
          "Appeal & Restoration to Register by NCLT (Sec 252): (1) Any person aggrieved by RoC's order under Sec 248 may file an appeal to the Tribunal within 3 years from the date of the RoC order; RoC itself may apply within 3 years if name was struck off on incorrect information. (2) Company, or any member, creditor, or workman aggrieved by the company having its name struck off may apply to the Tribunal before the expiry of 20 years from the publication in the Official Gazette."
        ]
      },
      {
        title: "Government Companies & Nidhi Companies (Sec 394–395 & Sec 406)",
        bullets: [
          "Government Company (Sec 2(45) & Sec 394–395): Any company in which not less than 51% of the paid-up share capital (or total voting power if DVR shares issued) is held by Central Govt, State Govt(s), or partly by CG and partly by SG(s), and includes a subsidiary of a Government company. Annual Report must be prepared within 3 months of AGM where C&AG audit report is placed and laid before both Houses of Parliament / State Legislature.",
          "Nidhi Company Incorporation & Capital (Sec 406 & Nidhi Rules, 2014): Public company incorporated with minimum Paid-up Equity Share Capital of Rs. 10 Lakhs (Rs. 5 Lakhs for Nidhis incorporated before 2022 amendment). Must apply in Form NDH-4 within 120 days of incorporation with minimum 200 members and Net Owned Funds (NOF) of >= Rs. 20 Lakhs (formerly Rs. 10 Lakhs within 1 year). Ratio of NOF to Deposits shall not exceed 1:20.",
          "Nidhi Prohibitions, Shares, Branches, Directors & Interest: Nidhi CANNOT issue preference shares, debentures, or any debt instrument; cannot open current accounts; cannot acquire another company; cannot admit a body corporate or trust as a member (deposits may be accepted in the name of a minor if made by natural/legal guardian who is a member). Must allot minimum 10 equity shares (or shares equivalent to Rs. 100) to each deposit holder (1 equity share of Rs. 10 for savings/recurring account holder). Director can hold office for up to 10 consecutive years and is eligible for re-appointment ONLY after 2 years cooling-off. Auditor individual: 1 term of 5 years; Audit Firm: max 2 terms of 5 consecutive years (with 2-year cooling-off). Max interest on loan = 7.5% above highest rate offered on deposits. Max dividend = 25% without transfer to reserves requirement. Locker rent income <= 20% of gross income. Branches allowed only after earning net profits after tax continuously during preceding 3 FYs (up to 3 branches within district without RD approval; beyond 3 or outside district within State requires RD approval; NO branches outside the State)."
        ]
      },
      {
        title: "Punishment for Fraud & Dormant Company (Sec 447 & Sec 455)",
        bullets: [
          "Punishment for Fraud (Sec 447): (a) Fraud involving >= Rs. 10 Lakh OR >= 1% of Turnover (whichever is lower): Imprisonment of 6 months to 10 years (minimum 3 years if public interest is involved) AND fine from 1x to 3x the fraud amount. (b) Fraud involving < Rs. 10 Lakh or < 1% of Turnover (whichever is lower) AND not involving public interest: Imprisonment up to 5 years OR fine up to Rs. 50 Lakh OR both.",
          "Dormant Company (Sec 455 & Miscellaneous Rules, 2014): Formed for a future project or to hold an asset/IP and has no significant accounting transaction, OR an inactive company (not carrying on business/operation or no significant accounting transaction or non-filing of FS & AR during last 2 FYs). Application in Form MSC-1 after Special Resolution or consent of >= 3/4th shareholders in value (only if no inspection/inquiry/investigation is pending). Minimum directors: 3 (Public), 2 (Private), 1 (OPC); rotational retirement does not apply. Annual return in Form MSC-3 within 30 days from end of FY. Maximum period of Dormant status = 5 consecutive years (RoC strikes off name if it remains dormant beyond 5 years). Application for active status in Form MSC-4."
        ]
      }
    ],
    formulas: [
      {
        name: "Section 252 Strike-Off Restoration Timelines",
        formula: "Aggrieved Person / RoC Appeal: Within 3 Years of Order | Company / Member / Creditor / Workman Petition: Within 20 Years of Gazette Notice",
        description: "Voluntary strike-off under Sec 248(2) requires Special Resolution or 75% consent in value after extinguishing all liabilities."
      },
      {
        name: "Nidhi Company Core Statutory Ratios (Nidhi Rules, 2014)",
        formula: "Min Members >= 200 | NOF : Deposits <= 1 : 20 | Max Loan Spread <= Highest Deposit Rate + 7.5% | Locker Income <= 20% of Gross Income",
        description: "Nidhi director max consecutive tenure = 10 years (2-year cooling-off). Max dividend = 25%."
      },
      {
        name: "Section 447 Fraud Severity Threshold",
        formula: "Severe Fraud Trigger: Amount >= Min(Rs. 10 Lakh, 1% of Turnover) -> 6M to 10Y Imprisonment (Min 3Y if Public Interest) + Fine 1x to 3x",
        description: "Below threshold without public interest: Imprisonment up to 5 years OR Fine up to Rs. 50 Lakh OR both."
      },
      {
        name: "Dormant Company Retention & Board Quotas (Sec 455)",
        formula: "Max Dormant Tenure = 5 Consecutive Years | Min Directors = 3 (Public), 2 (Private), 1 (OPC) | Return = Form MSC-3 (within 30 days of FY end)",
        description: "Payments to RoC, statutory fees, share allotment for Act compliance, and office/record maintenance are NOT significant accounting transactions."
      }
    ]
  },
  {
    id: 109,
    name: "Module 1 – Chapter 9: Adjudication, Special Courts, NCLT and Appellate Tribunal (Sec 407–454A)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88594bos-aps2625m1-ch9.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "NCLT and NCLAT constitution, term, rectification & appeals (Sec 407–434), Special Courts & Summary Trial (Sec 435–438), Non-cognizable offences (Sec 439), Compounding of offences (Sec 441), Mediation and Conciliation Panel (Sec 442), Lesser penalties for OPC/Small Co (Sec 446B), Adjudication of penalties (Sec 454), and Penalty for repeated default (Sec 454A).",
    summaryNotes: [
      {
        title: "NCLT & NCLAT Tenure, Disposal, Rectification & Appeals (Sec 407–423)",
        bullets: [
          "Term & Age Limits (Sec 413): President and Members of NCLT/NCLAT hold office for 5 years and are eligible for re-appointment for another term of 5 years. Minimum age for appointment = 50 years. Maximum age limit: NCLT President = 67 years, NCLT Member = 65 years; NCLAT Chairperson = 70 years, NCLAT Member = 67 years.",
          "Expeditious Disposal & Rectification of Orders (Sec 420–422): Every application/petition before NCLT or appeal before NCLAT shall be disposed of as expeditiously as possible and endeavour shall be made within 3 months from date of presentation (+ extension not exceeding 90 days recorded in writing). Under Sec 420(2), NCLT may at any time within 2 years from the date of the order amend any order passed by it to rectify any mistake apparent from the record, provided no appeal has been preferred against such order.",
          "Appeal to NCLAT (Sec 421) & Appeal to Supreme Court (Sec 423): Appeal from NCLT to NCLAT must be filed within 45 days from date on which copy of order is made available (+ further 45 days extension by NCLAT on sufficient cause). No appeal lies to NCLAT from an order made by NCLT with the consent of parties. Appeal from NCLAT to Supreme Court on any question of law must be filed within 60 days (+ further 60 days extension by Supreme Court on sufficient cause; total outer cap = 120 days)."
        ]
      },
      {
        title: "Special Courts, Non-Cognizable Offences, Compounding & Mediation (Sec 435–442)",
        bullets: [
          "Special Courts & Summary Trial (Sec 435–436): Single Judge holding office as Sessions Judge or Additional Sessions Judge (for offences punishable with imprisonment of 2 years or more) and Metropolitan Magistrate / Judicial Magistrate First Class (in case of other offences). Where there is more than one Special Court for an area, jurisdiction is specified by the High Court concerned. Special Court may try summarily any offence punishable with imprisonment for a term not exceeding 3 years (maximum sentence of imprisonment in summary trial = 1 year).",
          "Offences to be Non-Cognizable (Sec 439): Every offence under the Companies Act, 2013 EXCEPT offences under Sec 212(6) (SFIO / Sec 447 Fraud) is deemed non-cognizable. Court can take cognizance ONLY on the written complaint of the Registrar, a shareholder or member of the company, or a person authorized by Central Government (or SEBI for issue/transfer of securities and non-payment of dividend). Court CANNOT take suo-moto cognizance on newspaper reports.",
          "Compounding of Offences (Sec 441) & Mediation Panel (Sec 442): Offences punishable with fine only, or with imprisonment OR fine, or with imprisonment or fine or both, may be compounded by: (i) NCLT (if maximum fine exceeds Rs. 25 Lakhs); or (ii) Regional Director or officer authorized by CG (if maximum fine does NOT exceed Rs. 25 Lakhs). Offences punishable with imprisonment ONLY, or with imprisonment AND fine (mandatory imprisonment), CANNOT be compounded. Bar on compounding if similar offence was compounded within preceding 3 years. Mediation & Conciliation Panel (Sec 442) must dispose of matter within 3 months."
        ]
      },
      {
        title: "Lesser Penalties, Adjudication of Penalties & Repeated Default (Sec 446B, 454 & 454A)",
        bullets: [
          "Lesser Penalties for OPC, Small Companies, Start-ups & Producer Companies (Sec 446B): Liable to a penalty which shall not be more than one-half (50%) of the penalty specified in such provisions, subject to a maximum of Rs. 2,00,000 in case of a company and Rs. 1,00,000 in case of an officer who is in default or any other person.",
          "Adjudication of Penalties (Sec 454 & Adjudication Rules, 2014): Adjudicating Officer (RoC) issues show-cause notice giving 15 to 30 days from date of service. Under Sec 454(3) proviso, if default relates to non-filing under Sec 92(4) or Sec 137(1)/(2) and such default has been rectified either prior to, or within 30 days of, the issue of the notice by the adjudicating officer, NO penalty shall be imposed. Appeal against Adjudicating Officer's order lies to Regional Director within 60 days from receipt of copy of order.",
          "Penalty for Repeated Default (Sec 454A): Where a company or officer having already been subjected to penalty for default under any provision of this Act, again commits such default within 3 years from the date of order imposing such penalty passed by the Adjudicating Officer or Regional Director, it or he shall be liable for the second or subsequent defaults for an amount equal to TWICE (2x) the amount of penalty provided for such default."
        ]
      }
    ],
    formulas: [
      {
        name: "NCLT -> NCLAT -> Supreme Court Appeal & Rectification Timelines",
        formula: "NCLT Rectification: <= 2 Years | NCLT to NCLAT: 45 Days (+ 45 Days) | NCLAT to Supreme Court: 60 Days (+ 60 Days)",
        description: "Disposal target for NCLT/NCLAT is 3 months (+ 90 days extension). No appeal lies against a consent order."
      },
      {
        name: "Compounding Jurisdiction & Summary Trial Limits (Sec 441 & 436)",
        formula: "Compounding: Max Fine <= Rs. 25 Lakh (Regional Director) | > Rs. 25 Lakh (NCLT) | Summary Trial: Offence <= 3 Yrs (Max Sentence 1 Yr)",
        description: "Offences punishable with mandatory imprisonment (Imprisonment only, or Imprisonment AND fine) cannot be compounded."
      },
      {
        name: "Section 446B Lesser Penalty & Section 454A Repeated Default",
        formula: "Sec 446B (OPC/Small/Startup/Producer): 50% of Penalty (Cap: Rs. 2L Co / Rs. 1L Officer) | Sec 454A (Repeat within 3 Yrs): 2x Penalty",
        description: "Appeal to Regional Director under Sec 454(6) must be filed within 60 days of receipt of Adjudicating Officer's order."
      }
    ]
  },
  {
    id: 110,
    name: "Module 1 – Chapter 10: e-Filing, MCA21 Version 3.0 & Case Studies Relating to Ethics (Sec 396–404)",
    moduleCode: "Module 1 • Part I (Sec A: Company Law)",
    officialPdfUrl: "https://resource.cdn.icai.org/88595bos-aps2625m1-ch10.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Filing of applications, documents & inspection in electronic form (Sec 398–402), Fee for filing & additional fees (Sec 403), MCA21 Version 3.0 architecture (e-Scrutiny, e-Adjudication, e-Consultation, CMS, MCA Lab), XBRL filing applicability & exemptions, and Case Studies Relating to Corporate & Audit Ethics (NFRA Sec 132(4), SA 550, Rule 9A Demat).",
    summaryNotes: [
      {
        title: "Statutory Framework for e-Filing & Additional Fees (Sec 398–403)",
        bullets: [
          "Electronic Form Mandate (Sec 398 & 400): Nomenclature 'MCA21' reflects that MCA is capable of fulfilling the aspirations of its stakeholders in the 21st century. Under Sec 400, the electronic form shall be exclusive, or in the alternative, or in addition to the physical form as prescribed by the Central Government. Every valid upload generates a unique Service Request Number (SRN) to track service status (submitting an e-form like ADT-3 by email is NOT valid e-filing).",
          "Fee for Filing & Default Consequences (Sec 403): Where any document required to be submitted under Sec 92 (Annual Return) or Sec 137 (Financial Statement) is not submitted within the time provided, it may be submitted after expiry on payment of additional fee of Minimum Rs. 100 per day of default. Where there is default on 2 or more occasions, the document may be filed on payment of higher additional fee (not less than twice the additional fee)."
        ]
      },
      {
        title: "MCA21 Version 3.0 Pillars & XBRL Filing Rules",
        bullets: [
          "5 Key Components of MCA21 Version 3.0: (1) e-Scrutiny: Central Scrutiny Cell scrutinises Straight Through Process (STP) forms and flags companies for in-depth scrutiny; (2) e-Adjudication: End-to-end digitisation and online hearings for adjudication proceedings by RoC and RD; (3) e-Consultation: Online public consultation on proposed amendments with AI-driven sentiment analysis; (4) Compliance Management System (CMS): Rule-based compliance checks, e-notices to defaulting companies/LLPs, and internal alerts; (5) MCA Lab: Corporate law experts evaluating effectiveness of CMS, e-Consultation, and enforcement modules.",
          "XBRL (eXtensible Business Reporting Language) Applicability (Rule 3): Mandatory filing of financial statements in XBRL (Form AOC-4 XBRL) for: (i) All companies listed with any stock exchange in India and their Indian subsidiaries; (ii) All companies having Paid-up Capital of Rs. 5 Crore or above; (iii) All companies having Turnover of Rs. 100 Crore or above; (iv) All companies which are required to prepare their financial statements in accordance with Companies (Indian Accounting Standards) Rules, 2015.",
          "XBRL Exemptions (2nd Proviso to Rule 3(1)): (a) Non-Banking Financial Companies (NBFCs); (b) Housing Finance Companies; (c) Companies engaged in Banking business; and (d) Companies belonging to the Insurance sector."
        ]
      },
      {
        title: "ICAI Case Studies Relating to Ethics & Corporate Compliance",
        bullets: [
          "NFRA Action under Sec 132(4) & Audit of Related Parties (SA 550): Engagement Partner failing to verify arm's length pricing documentation for related party sales (> 50% of sales to MD's firm) or failing to report inter-company loan diversions exceeding Sec 186 limits is guilty of professional misconduct under Clauses (5), (6), (7), and (8) of Part I of Second Schedule to the Chartered Accountants Act, 1949. CFO is not liable if full related-party disclosures were made in the audit file and annual report.",
          "Dividend out of Reserves, Auditor Rotation & Books Preservation (Sec 123, 124, 128, 139): Dividend rate out of free reserves cannot exceed average dividend rate of 3 immediately preceding FYs. Unpaid dividend must be transferred to Unpaid Dividend Account within 7 days after expiry of 30 days from declaration (total 37 days). Books of account together with relevant vouchers must be preserved for at least 8 immediately preceding FYs (Sec 128(5)). Individual auditor completes 1 term of 5 consecutive years and faces a 5-year cooling-off period (Sec 139(2)).",
          "Deemed Public Company Dematerialization & Adjudication (Sec 2(71), Rule 9A(3)(a) & Sec 454): A private company which is a subsidiary of a public company is a deemed public company and must issue/transfer securities ONLY in dematerialized form under Rule 9A(3)(a). Subsequent rectification or admission of default before the Adjudicating Officer does not absolve the company and its executive directors from penalty under Sec 454 (non-executive directors not involved in day-to-day operations are excluded from officer-in-default penalty)."
        ]
      }
    ],
    formulas: [
      {
        name: "XBRL Filing Mandatory Thresholds (Rule 3)",
        formula: "Listed Co & Indian Subsidiaries OR Paid-up Capital >= Rs. 5 Cr OR Turnover >= Rs. 100 Cr OR Ind AS Applicable",
        description: "Exempt: Banking, Insurance, Housing Finance, and NBFCs. Once applicable, XBRL continues to apply even if thresholds drop later."
      },
      {
        name: "Section 403 Delayed Filing Additional Fee (Sec 92 & 137)",
        formula: "Additional Fee >= Rs. 100 per day of delay | Repeat Default (2 or more occasions) >= 2x Additional Fee",
        description: "Without prejudice to legal liability for punishment/penalty under Sections 92 and 137."
      }
    ]
  },
  {
    id: 111,
    name: "Module 2 (Part I – Sec B) – Chapter 1: SEBI Act, 1992 & SEBI Regulations (LODR 2015, ICDR 2018, SAST 2011, PIT 2015)",
    moduleCode: "Module 2 • Part I (Sec B: Securities Laws)",
    officialPdfUrl: "https://resource.cdn.icai.org/88559bos-aps2625m2-ch1.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "The SEBI Act, 1992 (Establishment, Powers, Investigation, Penalties Sec 15A–15HB, SAT Appeals Sec 15T–15Z), SEBI (LODR) Regulations, 2015, SEBI (ICDR) Regulations, 2018, SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011 [SAST], and SEBI (Prohibition of Insider Trading) Regulations, 2015 [PIT].",
    summaryNotes: [
      {
        title: "SEBI Act, 1992 & SEBI (LODR) Regulations, 2015",
        bullets: [
          "SEBI Penalties & SAT Appeals (Sec 15A–15Z): Insider trading (Sec 15G) & Fraudulent/Unfair Trade Practices (Sec 15HA) attract penalty from Rs. 10 Lakh to Rs. 25 Crore OR 3 times the amount of profits made out of such practices, whichever is higher. Residual penalty (Sec 15HB): Rs. 1 Lakh to Rs. 1 Crore. Appeal to Securities Appellate Tribunal (SAT) under Sec 15T within 45 days; Appeal from SAT to Supreme Court under Sec 15Z within 60 days on a question of law.",
          "SEBI (LODR) Board & Committees (Reg 17–21): Board (Reg 17): >= 50% Non-Executive Directors; at least 1 Woman Director (Independent Woman Director for top 1000 listed entities). If Chairperson is Non-Executive (not promoter/related), >= 1/3rd IDs; if Executive or Promoter/related, >= 50% IDs. Minimum 6 directors for top 2000 listed entities; Quorum = 1/3rd of total strength or 3 directors, whichever is higher (including at least 1 ID). Audit Committee (Reg 18): Min 3 directors, >= 2/3rd IDs, chaired by ID; meets at least 4 times a year (max gap 120 days), quorum = 2 members or 1/3rd whichever is greater with >= 2 IDs. Quarterly financial results (Reg 33) must be submitted within 45 days of end of quarter (60 days for annual audited results). Prior intimation of Board meeting: at least 5 days (financial results) or 2 working days (buyback/dividend/fund raising)."
        ]
      },
      {
        title: "SEBI (ICDR) Regulations, 2018 — IPO, FPO, Promoters' Contribution & Lock-In",
        bullets: [
          "IPO Eligibility on Main Board (Reg 6(1) & 6(2)): Under Reg 6(1), issuer must have: (a) Net Tangible Assets >= Rs. 3 Crore in each of preceding 3 full years (of which <= 50% held in monetary assets, unless excess is firm commitment to be utilized); (b) Average Operating Profit >= Rs. 15 Crore during preceding 3 years with operating profit in each of these 3 years; (c) Net Worth >= Rs. 1 Crore in each of preceding 3 full years; (d) If name changed within last 1 year, >= 50% of revenue for preceding 1 full year earned from activity indicated by new name. If Reg 6(1) is not met, issuer may make IPO under Reg 6(2) via Book Building process by allotting >= 75% of net offer to Qualified Institutional Buyers (QIBs).",
          "General Corporate Purposes Cap: Amount for General Corporate Purposes as mentioned in objects of the issue shall NOT exceed 25% of the amount being raised by the issuer.",
          "Promoters' Contribution & Lock-In (Reg 14 & 16): Promoters of the issuer shall hold at least 20% of the post-issue capital (Minimum Promoters' Contribution - MPC). Lock-in period for MPC (20%): 18 months from date of allotment in IPO (3 years if majority of issue proceeds excluding OFS is utilized for capital expenditure). Promoters' holding in excess of MPC is locked in for 6 months (1 year if majority is for capital expenditure)."
        ]
      },
      {
        title: "SEBI (SAST) Regulations, 2011 & SEBI (PIT) Regulations, 2015",
        bullets: [
          "SEBI (SAST) Trigger Thresholds (Reg 3, 4 & 7): (1) Initial Threshold (Reg 3(1)): Acquirer + Persons Acting in Concert (PAC) cannot acquire shares or voting rights which taken together entitle them to exercise >= 25% of voting rights in target company without making a public announcement of an Open Offer. (2) Creeping Acquisition (Reg 3(2)): Acquirer + PAC already holding >= 25% Voting Rights (but less than maximum permissible non-public shareholding of 75%) cannot acquire > 5% additional voting rights in any financial year without making an Open Offer. (3) Acquisition of Control (Reg 4) also triggers Open Offer. Minimum Open Offer Size (Reg 7): At least 26% of total shares of the target company.",
          "SEBI (PIT) Regulations, 2015 (Insider Trading): Prohibits communication of Unpublished Price Sensitive Information (UPSI) except in furtherance of legitimate purposes, performance of duties, or discharge of legal obligations (with due notice of confidentiality and entry in Structured Digital Database maintained for >= 8 years). Trading Plan (Reg 5): Cool-off period of 6 months (revised to 120 calendar days in recent amendments) before commencement; cannot trade during trading window closure for financial results; once approved by Compliance Officer and notified to stock exchanges, Trading Plan is irrevocable. Continual Disclosure (Reg 7(2)): Promoters, designated persons, and directors must disclose within 2 trading days if value of securities traded in a calendar quarter exceeds Rs. 10 Lakhs."
        ]
      }
    ],
    formulas: [
      {
        name: "SEBI (ICDR) Main Board IPO Eligibility (Reg 6(1) vs 6(2))",
        formula: "Reg 6(1): NTA >= Rs. 3 Cr (3 Yrs) & Avg Operating Profit >= Rs. 15 Cr (3 Yrs) & Net Worth >= Rs. 1 Cr (3 Yrs) | Else Reg 6(2): >= 75% QIB Book-Build",
        description: "Minimum Promoters' Contribution = 20% of post-issue capital (Locked-in for 18 months / 3 years if CapEx)."
      },
      {
        name: "SEBI (SAST) Open Offer Triggers & Size (Reg 3 & 7)",
        formula: "Initial Trigger: >= 25% Voting Rights | Creeping Acquisition (if holding 25%–75%): > 5% in a FY | Mandatory Open Offer Size >= 26%",
        description: "Gross acquisitions are considered for the 5% creeping limit without netting off sales during the financial year."
      },
      {
        name: "SEBI (PIT) Continual Disclosure & Penalty (Reg 7(2) & Sec 15G)",
        formula: "Continual Disclosure: Traded Value > Rs. 10 Lakh in Calendar Quarter (Notify Co in 2 Trading Days) | Sec 15G Penalty: Max(Rs. 10L–25Cr, 3x Profit)",
        description: "Structured Digital Database (SDD) containing nature of UPSI and PAN of recipients must be preserved for at least 8 years."
      }
    ]
  },
  {
    id: 112,
    name: "Module 2 (Part II) – Chapter 1: The Foreign Exchange Management Act (FEMA), 1999",
    moduleCode: "Module 2 • Part II (Economic Laws)",
    officialPdfUrl: "https://resource.cdn.icai.org/88555bos-aps2625m2-p2-ch1.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Residential Status under FEMA (Sec 2(v)), Current Account Transactions (Sec 5 & Rules: Schedules I, II, III, LRS USD 250,000), Capital Account Transactions (Sec 6, ODI, ECB, Immovable Property), Export & Realisation (Sec 7–9), Authorised Person (Sec 10–12), Contraventions, Penalties & Compounding (Sec 13–15), and Adjudication, Appeals & Enforcement Directorate (Sec 16–38).",
    summaryNotes: [
      {
        title: "Residential Status under FEMA (Sec 2(v) & 2(w))",
        bullets: [
          "Person Resident in India - PRII (Sec 2(v)): A person residing in India for more than 182 days during the course of the PRECEDING financial year, BUT does NOT include: (A) A person who has gone out of India or stays outside India: (a) for or on taking up employment outside India, or (b) for carrying on outside India a business or vocation, or (c) for any other purpose in such circumstances as would indicate his intention to stay outside India for an uncertain period (becomes PROI from the day of departure); (B) A person who has come to or stays in India OTHERWISE than for employment, business/vocation, or uncertain stay in India.",
          "Body Corporate & Citizenship: Any person or body corporate registered or incorporated in India, OR an office, branch or agency in India owned or controlled by a PROI, is a PRII. Citizenship is irrelevant for determining residential status under FEMA."
        ]
      },
      {
        title: "Current & Capital Account Transactions, Exports & Realisation (Sec 5–9)",
        bullets: [
          "Current Account Schedules (Sec 5 & FEM (Current Account Transactions) Rules, 2000): Schedule I (Strictly Prohibited): Remittance out of lottery winnings, income from racing/riding, purchase of lottery tickets/banned magazines/football pools/sweepstakes, commission on exports towards equity investment in JV/WOS abroad or under Rupee State Credit Route (except up to 10% for tea & tobacco), dividend where dividend balancing applies, call back services. Schedule II (Prior CG Approval): Cultural tours, advertisement in foreign print media by State Govt/PSU > USD 10,000 (except tourism/foreign investment promotion), freight of vessel chartered by PSU, multi-modal transport, remittance of hiring charges of transponders, container detention charges > DGS rate, prize money/sponsorship of sports > USD 100,000 (other than international/national/state bodies), club membership in P&I Club.",
          "Schedule III (Liberalised Remittance Scheme - LRS): Resident individuals can avail foreign exchange facility up to USD 250,000 per financial year for private visits, gift/donation, going abroad for employment, emigration, maintenance of close relatives, business trip, medical treatment, studies abroad, or permissible capital account transactions. Remittance exceeding USD 250,000 requires prior RBI approval (except emigration, medical treatment, and studies abroad if required by country of emigration, medical institute estimate, or foreign university estimate). For Person other than Individual: Donations > 1% of forex earnings (last 3 FYs) or USD 5,000,000 (whichever is less); Commission to agent abroad for sale of residential flats/commercial plots > Max(USD 25,000, 5% of inward remittance); Consultancy services > USD 10,000,000 (infrastructure) or > USD 1,000,000 (other projects); Pre-incorporation expenses reimbursement > Max(5% of investment brought in, USD 100,000).",
          "Capital Account, Surrender & Retention (Sec 6–9): Under Sec 6(4), a PRII may hold, own, transfer or invest in foreign currency, foreign security or any immovable property situated outside India if it was acquired, held or owned when he was resident outside India or inherited from a PROI. Unused foreign exchange drawn for travel must be surrendered within 180 days from date of return to India (may retain up to USD 2,000 in foreign currency notes/travellers' cheques, and any amount in foreign coins). Export value realisation period = 9 months from date of export (15 months for goods exported to a warehouse outside India)."
        ]
      },
      {
        title: "Penalties, Compounding, Appeals & Directorate of Enforcement (Sec 13–38)",
        bullets: [
          "Penalties & Enforcement of Orders (Sec 13 & 14): Penalty up to THREE TIMES (3x) the sum involved in such contravention where amount is quantifiable, OR up to Rs. 2,00,000 where amount is not quantifiable; plus continuing penalty up to Rs. 5,000 per day. If penalty is not paid within 90 days of service of notice, defaulter is liable to civil imprisonment (up to 6 months if demand <= Rs. 1 Crore; up to 3 years if demand > Rs. 1 Crore). For holding foreign assets in contravention of Sec 4 exceeding Rs. 1 Crore (Sec 13(1A)-(1C)): Equivalent value in India may be seized and punishable with imprisonment up to 5 years.",
          "Compounding (Sec 15) & Appeals (Sec 17, 19 & 35): Contraventions under Sec 13 must be compounded within 180 days from receipt of application by Directorate of Enforcement / RBI. Appeal against Adjudicating Authority (Asst/Deputy Director) lies to Special Director (Appeals) within 45 days; Appeal to Appellate Tribunal within 45 days; Appeal to High Court on question of law within 60 days (+ max 60 days extension by High Court)."
        ]
      }
    ],
    formulas: [
      {
        name: "FEMA LRS & Corporate Consultancy Thresholds (Schedule III)",
        formula: "Individual LRS Cap = USD 250,000 / FY | Corporate Consultancy: Infra <= USD 10M, Others <= USD 1M | Flat Commission <= Max(USD 25,000, 5% Inward)",
        description: "Exceeding Schedule III limits requires prior approval of the Reserve Bank of India (RBI)."
      },
      {
        name: "FEMA Section 13 Penalty & Section 15 Compounding Timeline",
        formula: "Quantifiable Penalty <= 3x Sum Involved | Non-Quantifiable <= Rs. 2 Lakh (+ Rs. 5,000/day) | Compounding Disposal <= 180 Days",
        description: "Failure to pay penalty within 90 days attracts civil imprisonment (up to 3 years if demand > Rs. 1 Crore)."
      }
    ]
  },
  {
    id: 113,
    name: "Module 2 (Part II) – Chapter 2: The Foreign Contribution (Regulation) Act (FCRA), 2010",
    moduleCode: "Module 2 • Part II (Economic Laws)",
    officialPdfUrl: "https://resource.cdn.icai.org/88556bos-aps2625m2-p2-ch2.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Important definitions (Foreign Contribution, Foreign Source, Foreign Hospitality), Prohibited persons & exemptions (Sec 3–4), Foreign hospitality (Sec 6), Prohibition on transfer (Sec 7), Administrative expenses cap (Sec 8), Registration, renewal, suspension & cancellation (Sec 11–16), FCRA Bank Account (Sec 17), Audit & Offences (Sec 18–41).",
    summaryNotes: [
      {
        title: "Foreign Contribution, Prohibited Recipients & Exemptions (Sec 2–6)",
        bullets: [
          "Foreign Contribution & Foreign Source (Sec 2(1)(h) & (j)): Includes delivery, transfer oritus of any article (unless given as personal gift of market value <= Rs. 1,00,000), currency (Indian or foreign), or security by a foreign source, including interest accrued or other income derived from such foreign contribution. Fees paid by foreign delegates/students and normal business transactions in ordinary course of international trade/commerce (Sec 4) are NOT treated as foreign contribution.",
          "Prohibited Persons (Sec 3): Candidate for election, correspondent/columnist/cartoonist/editor/owner/printer/publisher of a registered newspaper, Public Servant, Judge, Government servant or employee of any corporation/body controlled by Government, member of any Legislature, Political Party or office-bearer thereof, and organization of a political nature.",
          "Gifts from Relative & Foreign Hospitality (Sec 4(e) & Sec 6): Citizen of India can receive foreign contribution from a relative; however, if the aggregate amount exceeds Rs. 10,00,000 in a financial year (elevated from Rs. 1 Lakh), the recipient must inform Central Government in Form FC-1 within 3 months from date of receipt. Under Sec 6, no member of Legislature, office-bearer of political party, Judge, Government servant, or employee of corporation shall accept Foreign Hospitality without prior permission of Central Government (application at least 2 weeks in advance; exempt for emergent medical aid exceeding Rs. 1 Lakh if intimated within 1 month of receipt)."
        ]
      },
      {
        title: "Prohibition on Transfer, Administrative Expense Cap & FCRA Account (Sec 7, 8 & 17)",
        bullets: [
          "Absolute Prohibition on Transfer (Sec 7): No person who is registered and granted a certificate or has obtained prior permission under FCRA and receives any foreign contribution shall transfer such foreign contribution to ANY other person (whether registered or unregistered).",
          "Administrative Expenses Cap (Sec 8(1)(b)): A person receiving foreign contribution shall NOT defray more than 20% of such contribution received in a financial year to meet administrative expenses (reduced from 50%); defraying > 20% requires prior approval of Central Government.",
          "Mandatory Designated FCRA Bank Account (Sec 17): Every person granted certificate or prior permission shall receive foreign contribution ONLY in an account designated as 'FCRA Account' opened by him in the State Bank of India (SBI), New Delhi Main Branch (11, Sansad Marg). He may open one or more additional FCRA utilization accounts in any scheduled bank and link them to the SBI New Delhi Main Branch account."
        ]
      },
      {
        title: "Registration, Prior Permission, Suspension, Cancellation & Renewal (Sec 11–16)",
        bullets: [
          "Registration vs Prior Permission (Sec 11 & 12): Cultural/economic/educational/religious/social association must be in existence for 3 years and have spent >= Rs. 15,00,000 during last 3 FYs on its core activities (excluding administrative expenditure) for regular Registration. Newly formed associations can apply for Prior Permission for a specific project/purpose from a specific donor. Certificate is granted/rejected within 90 days and is valid for 5 years.",
          "Suspension (Sec 13), Cancellation (Sec 14) & Renewal (Sec 16): Central Government may suspend certificate for up to 180 days (+ further extension up to 180 days). During suspension, up to 25% of unutilized amount may be spent with prior approval of CG. Once a certificate is cancelled under Sec 14, such person shall NOT be eligible for registration or grant of prior permission for a period of 3 years from the date of cancellation. Application for renewal must be made within 6 months before the expiry of the 5-year certificate."
        ]
      }
    ],
    formulas: [
      {
        name: "FCRA Core Monetary & Percentage Thresholds",
        formula: "Personal Gift Exempt <= Rs. 1 Lakh | Relative Gift Intimation > Rs. 10 Lakh (within 3 Months) | Admin Expenses Cap <= 20% of FC Received",
        description: "Transfer of foreign contribution to any other person is 100% prohibited under Section 7."
      },
      {
        name: "FCRA Registration, Suspension & Cancellation Timelines (Sec 12–16)",
        formula: "Certificate Validity = 5 Years (Renew 6M prior) | Suspension <= 180 + 180 Days (25% Spend allowed) | Post-Cancellation Bar = 3 Years",
        description: "Primary FCRA receipt account must mandatorily be opened in SBI, New Delhi Main Branch (Sec 17)."
      }
    ]
  },
  {
    id: 114,
    name: "Module 2 (Part II) – Chapter 3: The Insolvency and Bankruptcy Code (IBC), 2016 (Up to Sec 33)",
    moduleCode: "Module 2 • Part II (Economic Laws)",
    officialPdfUrl: "https://resource.cdn.icai.org/88557bos-aps2625m2-p2-ch3.pdf",
    syllabusOverviewPdfUrl: "https://resource.cdn.icai.org/88558bos-aps2625-m2-ip.pdf",
    description: "Insolvency & Bankruptcy framework, Important definitions & Default threshold (Sec 3–5), Initiation of CIRP by Financial Creditor (Sec 7), Operational Creditor (Sec 8–9), and Corporate Applicant (Sec 10), Persons not entitled (Sec 11), CIRP Time-limit (Sec 12), Withdrawal (Sec 12A), Moratorium (Sec 14), IRP & CoC (Sec 16–24), Sec 29A Ineligibility, Resolution Plan (Sec 30–31), and Initiation of Liquidation (Sec 33).",
    summaryNotes: [
      {
        title: "Applicability, Default Threshold & Initiation of CIRP (Sec 4 & Sec 7–11)",
        bullets: [
          "Minimum Default Threshold (Sec 4): Minimum amount of default for initiating Corporate Insolvency Resolution Process (CIRP) under Part II is Rs. 1 Crore (Rs. 10 Lakhs for Pre-Packaged Insolvency Resolution Process - PPIRP for MSMEs under Chapter III-A). Code does NOT apply to Financial Service Providers (Banks, Insurance, Mutual Funds) unless specifically notified under Sec 227 (NBFCs with asset size >= Rs. 500 Crore are notified).",
          "Initiation by Financial Creditor (Sec 7): FC may file application singly or jointly. For real estate allottees or security-holders of a class, application must be filed jointly by not less than 100 of such creditors in the same class OR not less than 10% of the total number of such creditors in the same class, whichever is LESS. NCLT ascertains default within 14 days and allows 7 days to rectify defects.",
          "Initiation by Operational Creditor (Sec 8 & 9) & Corporate Applicant (Sec 10): OC must first deliver a Demand Notice/Invoice under Sec 8(1). Corporate Debtor has 10 days to pay or bring to notice an existing dispute (pending suit or arbitration initiated BEFORE receipt of demand notice). If unpaid and undisputed after 10 days, OC files Sec 9 application. Corporate Applicant (Sec 10) requires prior Special Resolution of shareholders (or 3/4th of total partners). Persons listed under Sec 11 (e.g., CD already undergoing CIRP, or completed CIRP within preceding 12 months, or against whom liquidation order has been made) cannot initiate CIRP."
        ]
      },
      {
        title: "CIRP Timelines, Withdrawal, Moratorium & Committee of Creditors (Sec 12–28)",
        bullets: [
          "CIRP Timeline (Sec 12) & Withdrawal (Sec 12A): Standard period = 180 days from admission. One-time extension up to 90 days granted by NCLT if instructed by CoC resolution passed with 66% voting share. Mandatory outer cap = 330 days (including extensions and legal proceedings). Under Sec 12A, NCLT may allow withdrawal of admitted application with approval of 90% voting share of CoC.",
          "Moratorium (Sec 14): Prohibits: (a) Institution or continuation of suits/proceedings against CD; (b) Transferring/encumbering/disposing of assets by CD; (c) Any action to foreclose, recover or enforce any security interest created by CD (including under SARFAESI Act, 2002); (d) Recovery of any property by an owner or lessor in occupation of CD. Essential goods and services (electricity, water, IT, telecom) cannot be terminated or suspended provided current dues during moratorium are paid. Moratorium does NOT apply to a surety in a contract of guarantee to a corporate debtor.",
          "IRP, CoC & RP (Sec 16–28): IRP appointed on Insolvency Commencement Date, constitutes CoC after collating claims. CoC (Sec 21) comprises all Financial Creditors of the Corporate Debtor EXCLUDING related parties of the CD (if CD has no FCs or all FCs are related parties, CoC consists of 18 largest operational creditors by value + 1 representative of workmen + 1 representative of employees). First CoC meeting within 7 days of constitution (notice >= 5 days, reducible to 24 hours, or 48 hours if E-voting). CoC voting thresholds: 66% for key decisions (appointing/replacing RP under Sec 22/27, Sec 12 extension, Sec 28 listed actions, approving Resolution Plan under Sec 30(4), or initiating Liquidation under Sec 33(2)); 51% for routine decisions; 90% for Sec 12A withdrawal."
        ]
      },
      {
        title: "Section 29A Ineligibility, Resolution Plan Approval & Liquidation Trigger (Sec 29A–33)",
        bullets: [
          "Persons Ineligible to be Resolution Applicant (Sec 29A): Undischarged insolvent, wilful defaulter, person whose account is classified as NPA for >= 1 year prior to commencement of CIRP (unless overdue amounts + interest/charges are paid before submission of plan), convicted of offence punishable with imprisonment >= 2 years (under 12th Schedule Acts) or >= 7 years (under any other law), disqualified to act as director under Companies Act, prohibited by SEBI, promoter/management of CD where preferential/undervalued/extortionate/fraudulent transaction order has been made, or guarantor whose guarantee has been invoked and remains unpaid.",
          "Resolution Plan & Initiation of Liquidation (Sec 30–33): Resolution Plan must provide for payment of insolvency resolution process costs in priority to all other debts, and payment of debts of operational creditors and dissenting financial creditors (not less than liquidation value under Sec 53(1)). Liquidation is initiated under Sec 33 if: (a) No resolution plan is received before expiry of maximum CIRP period; (b) NCLT rejects resolution plan for non-compliance; (c) CoC decides to liquidate CD by >= 66% vote at any time before confirmation of plan; or (d) Corporate Debtor contravenes an approved resolution plan."
        ]
      }
    ],
    formulas: [
      {
        name: "CIRP Duration & CoC Voting Matrix (Sec 12, 12A, 21 & 30)",
        formula: "Duration: 180 Days + 90 Days (66% CoC) <= 330 Days Max | Voting: Routine = 51% | Key/Plan/RP/Liquidation = 66% | Sec 12A Withdrawal = 90%",
        description: "Related-party Financial Creditors have ZERO right of representation, participation, or voting in the CoC."
      },
      {
        name: "Real Estate Allottees / Class Creditors Joint Filing Threshold (Sec 7(1) Proviso)",
        formula: "Minimum Joint Petitioners = Min(100 Creditors in Class, 10% of Total Creditors in Class)",
        description: "Minimum default amount under Section 4 is Rs. 1 Crore."
      }
    ]
  }
];
