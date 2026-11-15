import React from 'react';
import { Layers, Clock, Coins } from 'lucide-react';
import { HighlightedText, highlightReactNode, getPlainChapterName } from './HighlightedText';

interface ChapterVisualizerProps {
  chapterId: number;
  chapterName: string;
  searchQuery?: string;
}

export interface SetATimeLimitRow {
  moduleChapter: string;
  sectionRef: string;
  provisionEvent: string;
  timeLimit: string;
  condonationException: string;
}

export interface SetAMonetaryLimitRow {
  moduleChapter: string;
  sectionRef: string;
  provisionSubject: string;
  monetaryNumericalThreshold: string;
  legalEffectException: string;
}

export const SET_A_TIME_LIMITS_DATA: SetATimeLimitRow[] = [
  // Module 1 - Ch 1: Directors (Sec 149-172)
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 149(1) & Rule 3 / Sec 149(4) & Rule 4",
    provisionEvent: "Filling intermittent vacancy of a Woman Director or an Independent Director",
    timeLimit: "Immediate next Board Meeting OR within 3 months from date of vacancy, whichever is LATER",
    condonationException: "Under SEBI (LODR) Reg 17(1E) / 25(6), listed entities must fill vacancy at immediate next BM or within 3 months, whichever is later."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 149(3)",
    provisionEvent: "Minimum stay in India by Resident Director",
    timeLimit: "Not less than 182 days during the financial year",
    condonationException: "For newly incorporated companies, the 182-day requirement applies proportionately at the end of the first financial year."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 149(10)–(11)",
    provisionEvent: "Term of office of an Independent Director & cooling-off period",
    timeLimit: "Up to 5 consecutive years per term (Max 2 consecutive terms = 10 years); 3-year cooling-off period",
    condonationException: "Re-appointment for 2nd term requires Special Resolution. During 3-year cooling-off, cannot be appointed or associated in any other capacity."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 151 & Rule 7",
    provisionEvent: "Notice by Small Shareholders & tenure of Small Shareholders' Director (SSD)",
    timeLimit: "Notice >= 14 days before meeting; Tenure <= 3 consecutive years (No retirement by rotation)",
    condonationException: "After expiry of 3-year tenure, ineligible for re-appointment and barred from association with the company for 3 years."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 152(5) & Rule 8 / Sec 170",
    provisionEvent: "Filing consent to act as director (Form DIR-2) & company filing return (Form DIR-12)",
    timeLimit: "DIR-2 on or before appointment; Company files Form DIR-12 with RoC within 30 days of appointment/change",
    condonationException: "Section 8 companies and Government companies (100% voting power held by CG/SG) are exempt from filing DIR-2 within 30 days."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 156",
    provisionEvent: "Director intimating DIN to company(ies) & company intimating RoC",
    timeLimit: "Director to Company: within 1 month of receipt of DIN; Company to RoC: within 15 days of receipt of intimation",
    condonationException: "Failure attracts penalty u/s 159 (up to Rs. 50,000 + Rs. 500/day)."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 160",
    provisionEvent: "Candidature notice for person other than retiring director & refund of Rs. 1 Lakh deposit",
    timeLimit: "Notice left at registered office at least 14 days before GM; Company informs members at least 7 days before GM",
    condonationException: "Deposit of Rs. 1,00,000 is exempted if recommended by NRC or Board. Refunded if elected or secures > 25% of total valid votes."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 161(1) & 161(2)",
    provisionEvent: "Tenure of Additional Director & minimum absence of original director for Alternate Director",
    timeLimit: "Additional Director: Up to date of next AGM (or last date AGM should have been held); Alternate Director: Absence from India >= 3 months",
    condonationException: "Person rejected at a General Meeting cannot be appointed as Additional Director by the Board."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 164(2) & Sec 167(1)(b)",
    provisionEvent: "Corporate default disqualification period & vacation for absence from Board Meetings",
    timeLimit: "Sec 164(2): Non-filing for 3 continuous FYs OR default in repayment >= 1 year (5-year disqualification); Sec 167(1)(b): Absent for 12 months",
    condonationException: "For a newly appointed director in a defaulting company, disqualification u/s 164(2) does not trigger for the first 6 months from appointment."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 168(1)",
    provisionEvent: "Resignation of Director — Filing Form DIR-12 by Company & Form DIR-11 by Director",
    timeLimit: "Company files Form DIR-12 within 30 days of receipt of notice; Director may file Form DIR-11 within 30 days",
    condonationException: "Resignation takes effect from the date notice is received by the company or the date, if any, specified by the director in the notice, whichever is LATER."
  },

  // Module 1 - Ch 2: Managerial Personnel & Remuneration (Sec 196-205)
  {
    moduleChapter: "M1 Ch 2: KMP & Remuneration",
    sectionRef: "Sec 196(2) & (4)",
    provisionEvent: "Maximum term of MD/WTD/Manager, earliest re-appointment window & filing Form MR-1",
    timeLimit: "Max Term: 5 years at a time; Re-appointment: Not earlier than 1 year before expiry; Form MR-1: Within 60 days of appointment",
    condonationException: "Government companies are exempt from Sec 196(2), (4) & (5)."
  },
  {
    moduleChapter: "M1 Ch 2: KMP & Remuneration",
    sectionRef: "Sec 197(9)–(10)",
    provisionEvent: "Refund of excess managerial remuneration & shareholder waiver by Special Resolution",
    timeLimit: "Refund within 2 years (or lesser period allowed by company); Waiver via Special Resolution within 2 years from sum becoming refundable",
    condonationException: "Prior approval of Bank/PFI/NCD holder/Secured Creditor mandatory before passing SR if company has defaulted in repayment of dues."
  },
  {
    moduleChapter: "M1 Ch 2: KMP & Remuneration",
    sectionRef: "Sec 203(4)",
    provisionEvent: "Filling casual vacancy in the office of any Whole-Time Key Managerial Personnel (KMP)",
    timeLimit: "Within 6 months from the date of such vacancy at a Board Meeting",
    condonationException: "For Government companies, Sec 203(4) does not apply to a Managing Director."
  },

  // Module 1 - Ch 3: Board Meetings & Powers (Sec 173-195)
  {
    moduleChapter: "M1 Ch 3: Board Meetings & Powers",
    sectionRef: "Sec 173(1) & (3)",
    provisionEvent: "First Board Meeting, gap between consecutive BMs & minimum notice period",
    timeLimit: "First BM: Within 30 days of incorporation; Subsequent: Min 4 BMs/year with max gap <= 120 days; Notice: >= 7 days in writing",
    condonationException: "OPC, Small Co, Dormant Co & Start-up Pvt Co: At least 1 BM in each half of a calendar year with minimum gap >= 90 days. Section 8 Co: 1 BM within every 6 calendar months."
  },
  {
    moduleChapter: "M1 Ch 3: Board Meetings & Powers",
    sectionRef: "Sec 188(3)",
    provisionEvent: "Ratification of unapproved Related Party Transaction (RPT) by Board / Shareholders",
    timeLimit: "Within 3 months from the date on which such contract or arrangement was entered into",
    condonationException: "If not ratified within 3 months, contract is voidable at the option of the Board/Shareholders and concerned director must indemnify the company."
  },
  {
    moduleChapter: "M1 Ch 3: Board Meetings & Powers",
    sectionRef: "Sec 189(1) & Sec 193",
    provisionEvent: "Placing Register of Contracts (MBP-4) before BM & informing RoC of OPC contract (MBP-3)",
    timeLimit: "Sec 189: Placed at the next meeting of the Board and signed by all directors present; Sec 193 (OPC): Inform RoC within 15 days of Board approval",
    condonationException: "Sec 189 does not apply to sale/purchase/supply of goods or services if aggregate value does not exceed Rs. 5,00,000 in any year."
  },

  // Module 1 - Ch 4: Inspection, Inquiry & Investigation (Sec 206-229)
  {
    moduleChapter: "M1 Ch 4: Inspection & Investigation",
    sectionRef: "Sec 209(2)",
    provisionEvent: "Maximum retention period of books and papers seized by Registrar or Inspector",
    timeLimit: "Not later than 180th day after seizure (+ further 180 days by written re-requisition order)",
    condonationException: "Prior order of the Special Court is mandatory before conducting search and seizure."
  },
  {
    moduleChapter: "M1 Ch 4: Inspection & Investigation",
    sectionRef: "Sec 218(2)–(3)",
    provisionEvent: "NCLT objection window on employee termination during investigation & appeal to NCLAT",
    timeLimit: "NCLT Objection Window: 30 days from receipt of application; Appeal to NCLAT against NCLT order: Within 30 days",
    condonationException: "If NCLT does not notify any objection within 30 days, the company may proceed with proposed action against the employee."
  },
  {
    moduleChapter: "M1 Ch 4: Inspection & Investigation",
    sectionRef: "Sec 221 & Sec 222",
    provisionEvent: "Freezing of corporate assets (Sec 221) or imposition of restrictions upon securities (Sec 222) by NCLT",
    timeLimit: "Maximum period not exceeding 3 years",
    condonationException: "Ordered during investigation or on reference by CG, creditor (>= Rs. 1 Lakh), or person having reasonable ground."
  },

  // Module 1 - Ch 5: Compromises, Arrangements & Amalgamations (Sec 230-240)
  {
    moduleChapter: "M1 Ch 5: Compromises & Mergers",
    sectionRef: "Sec 230(5) & Sec 232(5)",
    provisionEvent: "Representations by Regulatory Authorities (RBI, SEBI, IT, RoC, OL, CCI) & filing certified NCLT order",
    timeLimit: "Regulatory representations: Within 30 days from receipt of notice; Filing NCLT order with RoC: Within 30 days of receipt of certified copy",
    condonationException: "If authorities make no representation within 30 days, it is presumed they have no representations to make."
  },
  {
    moduleChapter: "M1 Ch 5: Compromises & Mergers",
    sectionRef: "Sec 233(1)–(5)",
    provisionEvent: "Fast-Track Merger — Notice to RoC/OL, filing scheme after approval & RD reference to NCLT",
    timeLimit: "RoC/OL objections: Within 30 days; Filing approved scheme: Within 7 days of conclusion of meeting; RD application to NCLT: Within 60 days",
    condonationException: "If RD does not file an application before NCLT within 60 days of receipt of scheme, it is deemed RD has no objection."
  },
  {
    moduleChapter: "M1 Ch 5: Compromises & Mergers",
    sectionRef: "Sec 235(1) & Sec 236(5)",
    provisionEvent: "Dissenting shareholder acquisition (Sec 235) & Minority Squeeze-Out disbursement (Sec 236)",
    timeLimit: "Sec 235: 90% approval within 4 months of offer -> Notice within next 2 months -> Dissenting application to NCLT within 1 month; Sec 236: Disbursement within 60 days",
    condonationException: "In Sec 236, transferor company acts as transfer agent and disburses amount to minority holders within 60 days."
  },

  // Module 1 - Ch 6: Oppression & Mismanagement (Sec 241-246)
  {
    moduleChapter: "M1 Ch 6: Oppression & Mismanagement",
    sectionRef: "Sec 242(2)(f) & Sec 243(1)(b)",
    provisionEvent: "Setting aside fraudulent preference agreement & 5-year bar on terminated MD/Director/Manager",
    timeLimit: "Agreement look-back: Within 3 months before date of application; Disqualification bar u/s 243: 5 years from date of order",
    condonationException: "NCLT may grant leave to serve before expiry of 5 years only after giving Central Government an opportunity of being heard."
  },

  // Module 1 - Ch 7: Winding Up (Sec 270-365)
  {
    moduleChapter: "M1 Ch 7: Winding Up",
    sectionRef: "Sec 271(d), Sec 272(2), Sec 273(1) & Sec 274(1)",
    provisionEvent: "Non-filing ground, Contributory holding period, NCLT Winding-Up order & Statement of Affairs",
    timeLimit: "Non-filing: 5 consecutive FYs; Contributory holding: >= 6 months in last 18 months; NCLT Order: Within 90 days; Statement of Affairs: Within 30 days (+30 days)",
    condonationException: "Liquidator files declaration of independence within 7 days of appointment (Sec 275) and preliminary report within 60 days of winding-up order (Sec 281)."
  },
  {
    moduleChapter: "M1 Ch 7: Winding Up",
    sectionRef: "Sec 326, 328, 329, 332, 333 & 356",
    provisionEvent: "Workmen dues priority, Fraudulent Preference, Voluntary Transfer, Floating Charge, Disclaimer & Void Dissolution",
    timeLimit: "Workmen Dues: 24 months (paid within 30 days of sale); Fraudulent Pref (Sec 328): 6 months; Voluntary Transfer (Sec 329): 1 year; Floating Charge (Sec 332): 12 months; Disclaimer (Sec 333): 12 months; Void Dissolution (Sec 356): 2 years",
    condonationException: "Floating charge u/s 332 is valid if company was solvent immediately after creation, or to the extent of cash paid + 5% p.a. interest."
  },

  // Module 1 - Ch 8: Miscellaneous Provisions (Sec 247-252, 394-406, 447-470)
  {
    moduleChapter: "M1 Ch 8: Miscellaneous",
    sectionRef: "Sec 247(2) & Rule 6",
    provisionEvent: "Registered Valuer independence cooling-off window & grant of registration certificate by IBBI",
    timeLimit: "No direct/indirect interest during 3 years prior to appointment OR 3 years after valuation; IBBI certificate: Within 60 days",
    condonationException: "The 60-day period for IBBI registration excludes time given by the authority for presenting additional documents (up to 21 days)."
  },
  {
    moduleChapter: "M1 Ch 8: Miscellaneous",
    sectionRef: "Sec 248(1), Sec 249(1) & Sec 252",
    provisionEvent: "Strike-off triggers, voluntary strike-off bar look-back & NCLT restoration appeal timelines",
    timeLimit: "Failure to commence business: 1 year; Inactive: 2 preceding FYs; Sec 249 Bar: 3 months look-back; Sec 252(1) Appeal: 3 years; Sec 252(3) Application: 20 years",
    condonationException: "Sec 252(1) 3-year period runs from date of RoC order; Sec 252(3) 20-year period runs from publication in Official Gazette."
  },
  {
    moduleChapter: "M1 Ch 8: Miscellaneous",
    sectionRef: "Sec 394, Sec 406 (Nidhi Rules) & Sec 455 (Dormant)",
    provisionEvent: "Govt Co Annual Report, Nidhi NDH-4 & Director/Auditor tenure, and Dormant Company MSC-3 & max tenure",
    timeLimit: "Govt Co Report: Within 3 months of AGM; Nidhi NDH-4: Within 120 days of incorporation (Director max 10 yrs + 2 yr cool-off); Dormant MSC-3: Within 30 days of FY end (Max dormant tenure: 5 consecutive years)",
    condonationException: "Nidhi branches allowed only after earning net profit after tax continuously during preceding 3 financial years."
  },

  // Module 1 - Ch 9: Adjudication, Special Courts, NCLT & NCLAT (Sec 407-454A)
  {
    moduleChapter: "M1 Ch 9: NCLT, Special Courts & Adjudication",
    sectionRef: "Sec 413, 420(2), 421, 422 & 423",
    provisionEvent: "NCLT/NCLAT term, Rectification of orders, Appeals to NCLAT & Supreme Court, and Disposal target",
    timeLimit: "Term: 5 years (re-appointable for 5 yrs); Rectification (Sec 420): 2 years; Appeal to NCLAT (Sec 421): 45 + 45 days; Appeal to SC (Sec 423): 60 + 60 days; Disposal (Sec 422): 3 months (+90 days)",
    condonationException: "No appeal lies to NCLAT from a consent order. Rectification u/s 420(2) is barred if an appeal has already been preferred."
  },
  {
    moduleChapter: "M1 Ch 9: NCLT, Special Courts & Adjudication",
    sectionRef: "Sec 441(2), Sec 442(5), Sec 454(3)–(6) & Sec 454A",
    provisionEvent: "Compounding bar, Mediation disposal, Adjudication appeal to RD & Repeated default window",
    timeLimit: "Compounding repeat bar: 3 years; Mediation (Sec 442): 3 months; Sec 92/137 cure window: 30 days of notice; Appeal to RD (Sec 454): 60 days (+30 days); Repeated Default (Sec 454A): Within 3 years",
    condonationException: "Repeated default within 3 years of prior penalty order by Adjudicating Officer or RD attracts TWICE (2x) the statutory penalty."
  },

  // Module 1 - Ch 10: e-Filing & Ethics (Sec 396-404)
  {
    moduleChapter: "M1 Ch 10: e-Filing & Ethics",
    sectionRef: "Sec 124, Sec 128(5), Sec 139(2) & Rule 9A(8)",
    provisionEvent: "Unpaid dividend transfer, preservation of books of account, auditor cooling-off & Form PAS-6 filing",
    timeLimit: "Dividend paid within 30 days -> Unpaid Dividend A/c within next 7 days (37 days total) -> IEPF after 7 years; Books preservation: 8 FYs; Auditor cooling-off: 5 years; Form PAS-6: Within 60 days of half-year end",
    condonationException: "Where an investigation has been ordered in respect of the company, the Central Government may direct books to be kept for longer than 8 years."
  },

  // Module 2 Part I - Ch 1: SEBI Act & Regulations (LODR, ICDR, SAST, PIT)
  {
    moduleChapter: "M2 Part I Ch 1: SEBI Laws",
    sectionRef: "SEBI Act Sec 15T & 15Z / LODR Reg 29 & 33",
    provisionEvent: "Appeal to SAT, Appeal to Supreme Court, Quarterly/Annual Results & Board Meeting prior intimation",
    timeLimit: "Appeal to SAT: 45 days; Appeal to SC: 60 days (+60 days); Quarterly Results: Within 45 days of quarter end (Annual: 60 days); BM Intimation: At least 5 days (Financial Results) / 2 working days (Buyback/Dividend/Fund raising)",
    condonationException: "SAT and Supreme Court may entertain appeals after expiry of 45 / 60 days if appellant shows sufficient cause."
  },
  {
    moduleChapter: "M2 Part I Ch 1: SEBI Laws",
    sectionRef: "SEBI (ICDR) Reg 16 & SEBI (PIT) Reg 5, 7(2) & Sch B",
    provisionEvent: "Promoters' Lock-in (ICDR), Trading Plan cool-off, Trading Window closure, Contra-trade & Continual Disclosure (PIT)",
    timeLimit: "MPC Lock-in: 18 months (3 yrs if CapEx); Excess holding: 6 months (1 yr if CapEx); PIT Trading Plan cool-off: 120 calendar days (min 12M coverage); Window opens: 48 hrs after results; Contra-trade: 6 months; Continual Disclosure (> Rs. 10L): 2 trading days",
    condonationException: "Structured Digital Database (SDD) under SEBI (PIT) Reg 3(5) must be preserved for at least 8 years after completion of transaction."
  },

  // Module 2 Part II - Ch 1: FEMA, 1999
  {
    moduleChapter: "M2 Part II Ch 1: FEMA, 1999",
    sectionRef: "Sec 2(v), Sec 7–8, Sec 14, Sec 15, Sec 17, 19 & 35",
    provisionEvent: "Residential stay, Export realization, Unused FX surrender, Penalty payment, Compounding & Appeals",
    timeLimit: "PRII Stay: > 182 days in preceding FY; Export Realization: 9 months (15 months for overseas warehouse); Unused FX Surrender: 180 days from return; Penalty payment before civil arrest: 90 days; Compounding (Sec 15): 180 days; Appeal to SD(A)/AT: 45 days; Appeal to HC (Sec 35): 60 + 60 days",
    condonationException: "High Court cannot condone delay beyond the additional 60 days under Section 35 (total outer cap = 120 days)."
  },

  // Module 2 Part II - Ch 2: FCRA, 2010
  {
    moduleChapter: "M2 Part II Ch 2: FCRA, 2010",
    sectionRef: "Sec 6, Rule 6, Sec 12, Sec 13, Sec 14 & Sec 16",
    provisionEvent: "Relative gift intimation, Foreign hospitality, Registration validity/renewal, Suspension & Cancellation bar",
    timeLimit: "Relative Gift (> Rs. 10L) Form FC-1: Within 3 months; Hospitality application: >= 2 weeks prior (Medical aid > Rs. 1L: report within 1 month); Certificate grant: 90 days; Validity: 5 years (Renew 6 months prior); Suspension: 180 + 180 days; Cancellation bar: 3 years",
    condonationException: "Regular registration u/s 12 requires the association to be in existence for 3 years with >= Rs. 15 Lakhs spent on core activities."
  },

  // Module 2 Part II - Ch 3: IBC, 2016
  {
    moduleChapter: "M2 Part II Ch 3: IBC, 2016",
    sectionRef: "Sec 7, 8, 9, 12, 16, 21, 22, 43, 46 & 54D",
    provisionEvent: "NCLT admission, OC Demand Notice, CIRP Timelines, CoC First Meeting, Avoidance Look-Back & MSME PPIRP",
    timeLimit: "NCLT ascertain default: 14 days (7 days defect cure); OC Demand Notice (Sec 8): 10 days; CIRP (Sec 12): 180 + 90 days <= 330 days max; First CoC Meeting: Within 7 days of constitution; Avoidance Look-Back (Sec 43/46): 2 years (Related Party) / 1 year (Unrelated Party); MSME PPIRP (Sec 54D): 90 days plan / 120 days total",
    condonationException: "Under Sec 11, a Corporate Debtor that has completed CIRP within the preceding 12 months is barred from initiating CIRP."
  }
];

export const SET_A_MONETARY_LIMITS_DATA: SetAMonetaryLimitRow[] = [
  // Module 1 - Ch 1: Directors (Sec 149-172)
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 149(1) & Rule 3",
    provisionSubject: "Mandatory Appointment of at least 1 Woman Director",
    monetaryNumericalThreshold: "Every Listed Company OR Public Company with Paid-up Share Capital >= Rs. 100 Crore OR Turnover >= Rs. 300 Crore",
    legalEffectException: "Tested as on the last date of latest audited financial statements. Private companies are exempt."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 149(4) & Rule 4",
    provisionSubject: "Mandatory Appointment of Independent Directors (IDs)",
    monetaryNumericalThreshold: "Listed Public Co: >= 1/3rd of Board | Unlisted Public Co (Min 2 IDs): Paid-up Capital >= Rs. 10 Cr OR Turnover >= Rs. 100 Cr OR Outstanding Loans, Debentures & Deposits > Rs. 50 Cr",
    legalEffectException: "Note: Borrowings must strictly EXCEED Rs. 50 Cr. Joint Ventures, Wholly Owned Subsidiaries (WOS), and Dormant Companies are exempt."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 149(6)(c)–(d)",
    provisionSubject: "Pecuniary Relationship & Relative Indebtedness/Transaction Disqualification for ID",
    monetaryNumericalThreshold: "Director's Pecuniary Relationship (other than remuneration): <= 10% of his total income | Relative's Indebtedness/Guarantee/Security: < Rs. 50 Lakhs | Relative's Commercial Transactions: < 2% of gross turnover or total income",
    legalEffectException: "Tested during the 2 immediately preceding financial years or during the current financial year."
  },
  {
    moduleChapter: "M1 Ch 1: Directors",
    sectionRef: "Sec 151, Sec 160 & Sec 165",
    provisionSubject: "Small Shareholders' Director (SSD), Candidature Deposit & Maximum Directorships",
    monetaryNumericalThreshold: "SSD Share Nominal Value: <= Rs. 20,000 (Notice by Min(1,000 small shareholders, 1/10th of total SSDs)) | Sec 160 Deposit: Rs. 1,00,000 | Sec 165 Max Directorships: 20 (Max 10 in Public Companies)",
    legalEffectException: "Sec 160 deposit refunded if elected or gets > 25% valid votes (no deposit if recommended by NRC/Board). Dormant & Sec 8 companies excluded from 20 cap."
  },

  // Module 1 - Ch 2: Managerial Personnel & Remuneration (Sec 196-205)
  {
    moduleChapter: "M1 Ch 2: KMP & Remuneration",
    sectionRef: "Sec 197(1) & Sec 197(5)",
    provisionSubject: "Managerial Remuneration Profit Ceilings & Sitting Fees Cap",
    monetaryNumericalThreshold: "Overall Cap: <= 11% of Net Profits u/s 198 | 1 MD/WTD/Manager: <= 5% | > 1 MD/WTD: <= 10% | NEDs: <= 1% (with MD) or <= 3% (no MD) | Sitting Fee: <= Rs. 1,00,000 per Board/Committee meeting",
    legalEffectException: "Exceeding 11% or sub-limits requires Special Resolution. Sitting fees for IDs and Woman Directors cannot be less than other directors."
  },
  {
    moduleChapter: "M1 Ch 2: KMP & Remuneration",
    sectionRef: "Schedule V Part II Sec II",
    provisionSubject: "Remuneration Slabs in case of Inadequate or No Profits (Based on Effective Capital)",
    monetaryNumericalThreshold: "(i) < Rs. 5 Cr: Rs. 60L (MD/WTD) / Rs. 12L (NED) | (ii) Rs. 5 Cr to < Rs. 100 Cr: Rs. 84L / Rs. 17L | (iii) Rs. 100 Cr to < Rs. 250 Cr: Rs. 120L / Rs. 24L | (iv) >= Rs. 250 Cr: Rs. 120L + 0.01% / Rs. 24L + 0.01% of excess",
    legalEffectException: "Passing a Special Resolution (with 3-year validity) allows paying remuneration in excess of Schedule V slabs."
  },
  {
    moduleChapter: "M1 Ch 2: KMP & Remuneration",
    sectionRef: "Sec 203 (Rules 8/8A) & Sec 204 (Rule 9)",
    provisionSubject: "Mandatory Whole-Time KMP, Whole-Time CS & Secretarial Audit (Form MR-3)",
    monetaryNumericalThreshold: "Whole-Time KMP (Sec 203): Listed Co OR Public Co with Paid-up Capital >= Rs. 10 Cr | Whole-Time CS (Rule 8A): Any Co with Paid-up Capital >= Rs. 10 Cr | Secretarial Audit (Sec 204): Listed Co OR Public Co [PSC >= Rs. 50 Cr OR Turnover >= Rs. 250 Cr] OR Any Co [Bank/PFI Borrowings >= Rs. 100 Cr]",
    legalEffectException: "Rule 8A requires even a Private Company with Paid-up Capital >= Rs. 10 Cr to appoint a full-time Company Secretary."
  },

  // Module 1 - Ch 3: Board Meetings & Powers (Sec 173-195)
  {
    moduleChapter: "M1 Ch 3: Board Meetings & Powers",
    sectionRef: "Sec 174, Sec 177 & Sec 178",
    provisionSubject: "Board Quorum, Audit Committee, Nomination & Remuneration Committee (NRC) & SRC",
    monetaryNumericalThreshold: "Quorum: Max(2, 1/3rd of Total Strength) [Sec 8 Co: Min(8, 25% of Strength), min 2] | Audit Committee & NRC: Listed Co OR Public Co [PSC >= Rs. 10 Cr OR Turnover >= Rs. 100 Cr OR Borrowings > Rs. 50 Cr] | SRC (Sec 178(5)): > 1,000 security holders",
    legalEffectException: "Audit Committee: Min 3 directors with majority IDs. NRC: Min 3 Non-Executive Directors with >= 50% IDs."
  },
  {
    moduleChapter: "M1 Ch 3: Board Meetings & Powers",
    sectionRef: "Sec 180(1)(a) & (c), Sec 181 & Sec 182",
    provisionSubject: "Undertaking Disposal, Borrowing Powers, Charitable & Political Contributions",
    monetaryNumericalThreshold: "Undertaking (Sec 180(1)(a)): >= 20% of Net Worth OR generates >= 20% of Total Income (Substantially the whole = 20% of undertaking's value) | Borrowing (Sec 180(1)(c)): > [PSC + Free Reserves + Sec Premium] | Charity (Sec 181): > 5% of 3-yr avg net profits requires OR | Political (Sec 182): Co >= 3 FYs old (No % cap)",
    legalEffectException: "Private companies are exempt from Sec 180. Political contributions u/s 182 must be approved at a BM (no circular resolution) and paid only via non-cash mode."
  },
  {
    moduleChapter: "M1 Ch 3: Board Meetings & Powers",
    sectionRef: "Sec 186(2), Sec 188 (Rule 15) & Sec 192",
    provisionSubject: "Inter-Corporate Loans/Investments Ceiling, Related Party Transactions (RPT) & Non-Cash Transactions",
    monetaryNumericalThreshold: "Sec 186 Ceiling: Higher of 60% of [PSC + FR + SP] OR 100% of [FR + SP] | RPT Ordinary Resolution (Rule 15): Goods/Property/Services/Leasing >= 10% of Turnover (or Net Worth for property); Office of profit > Rs. 2.5 Lakh/month; Underwriting > 1% of Net Worth | Non-Cash Assets (Sec 192): > 10% of Net Worth AND > Rs. 5 Lakhs (or > Rs. 10 Lakhs)",
    legalEffectException: "Sec 186 requires unanimous Board approval for ALL loans/investments and G-Sec yield floor. Sec 188 does not apply to ordinary course + arm's length transactions."
  },

  // Module 1 - Ch 4, 5 & 6: Investigation, Compromises/Mergers & Oppression (Sec 206-246)
  {
    moduleChapter: "M1 Ch 4–6: Investigation, Mergers & Oppression",
    sectionRef: "Sec 213, Sec 230(4), (6), (9), Sec 233 & Sec 235–236",
    provisionSubject: "Tribunal Investigation, Scheme Majority, Objection Locus, Dispensation, Fast-Track & Squeeze-Out",
    monetaryNumericalThreshold: "Sec 213: >= 100 Members OR >= 10% Voting Power (No Share Cap: >= 20% Members) | Sec 230(6) Approval: > 50% in Number AND >= 75% in Value present & voting | Sec 230(4) Objection: >= 10% Shareholding OR >= 5% Total Debt | Sec 230(9) Creditor Dispensation: >= 90% Value by Affidavit | Fast-Track (Sec 233): >= 90% Total Shares AND >= 90% Value of Creditors | Sec 235/236 Squeeze-Out: >= 90%",
    legalEffectException: "Notice in Sec 230(6) requires > 50% in number + >= 75% in value of those present & voting, whereas Sec 233 requires >= 90% of TOTAL shares/creditors."
  },
  {
    moduleChapter: "M1 Ch 6: Oppression & Mismanagement",
    sectionRef: "Sec 244(1) & Sec 245(3)",
    provisionSubject: "Eligibility for Oppression/Mismanagement Petition (Sec 244) & Class Action Suits (Sec 245)",
    monetaryNumericalThreshold: "Sec 244(1): Min(100 Members, 10% of Total Members) OR >= 10% of Issued Share Capital (No Share Cap: >= 20% Members) | Sec 245(3) Members: Min(100 Members, 5% of Total Members) OR >= 5% Issued Capital (Unlisted) / >= 2% Issued Capital (Listed) | Sec 245(3) Depositors: Min(100 Depositors, 5% of Total Depositors) OR >= 5% Total Deposits",
    legalEffectException: "NCLT has power to waive Sec 244(1) thresholds. Frivolous Class Action suit u/s 245(8) attracts cost up to Rs. 1,00,000. Banking companies exempt from Sec 245."
  },

  // Module 1 - Ch 7, 8, 9 & 10: Winding Up, Misc, NCLT/Compounding & XBRL (Sec 247-470)
  {
    moduleChapter: "M1 Ch 7–10: Winding Up, Nidhi, Fraud, Compounding & XBRL",
    sectionRef: "Sec 287, Sec 406 (Nidhi), Sec 441, Sec 446B, Sec 447 & XBRL Rule 3",
    provisionSubject: "Advisory Committee, Nidhi Ratios, Fraud Threshold, Compounding Jurisdiction, Lesser Penalty & XBRL",
    monetaryNumericalThreshold: "Winding-Up Advisory Committee (Sec 287): Max 12 Members | Nidhi Co: Min Equity >= Rs. 10L, NOF >= Rs. 20L, Members >= 200, NOF:Deposits <= 1:20, Unencumbered Deposits >= 10%, Max Loan Spread +7.5%, Max Dividend 25% | Fraud (Sec 447): >= Min(Rs. 10 Lakh, 1% of Turnover) | Compounding (Sec 441): Max Fine <= Rs. 25 Lakh (RD) vs > Rs. 25 Lakh (NCLT) | Sec 446B Cap: 50% Penalty (Max Rs. 2L Co / Rs. 1L Officer) | XBRL (Rule 3): Listed OR PSC >= Rs. 5 Cr OR Turnover >= Rs. 100 Cr OR Ind AS",
    legalEffectException: "Fraud below Sec 447 threshold without public interest: Imprisonment up to 5 years OR Fine up to Rs. 50 Lakhs OR both. NFRA penalty u/s 132(4): Min Rs. 1L ( up to 5x fees) for CA; Min Rs. 5L (up to 10x fees) for Audit Firm."
  },

  // Module 2 Part I - Ch 1: SEBI Act & Regulations (LODR, ICDR, SAST, PIT)
  {
    moduleChapter: "M2 Part I Ch 1: SEBI Laws",
    sectionRef: "SEBI Act Sec 15G/15HA, LODR Reg 17–23, ICDR Reg 6 & 14, SAST Reg 3 & 7, PIT Reg 7",
    provisionSubject: "SEBI Penalties, LODR Board/RPT, ICDR IPO Eligibility, SAST Open Offer & PIT Disclosure",
    monetaryNumericalThreshold: "Sec 15G/15HA Penalty: Rs. 10 Lakh to Rs. 25 Crore OR 3x Profits (whichever is higher) | LODR Reg 17–23: >= 50% NEDs; IDs >= 1/3rd (or >= 50% if Exec/Promoter Chair); Quorum Max(3, 1/3rd) with >= 1 ID; Audit Comm >= 2/3rd IDs; Material RPT > Min(Rs. 1,000 Cr, 10% Consolidated Turnover) | ICDR Reg 6(1): NTA >= Rs. 3 Cr, Avg Op Profit >= Rs. 15 Cr, Net Worth >= Rs. 1 Cr (3 yrs) [Else Reg 6(2): >= 75% QIB]; MPC >= 20% | SAST: Initial >= 25%, Creeping > 5%/FY (between 25%–75%), Offer Size >= 26% | PIT Reg 7(2): Traded value > Rs. 10 Lakhs/quarter",
    legalEffectException: "General Corporate Purposes in IPO cannot exceed 25% of amount raised. Under SAST Reg 6, Voluntary Open Offer requires minimum 10% offer size."
  },

  // Module 2 Part II - Ch 1, 2 & 3: FEMA, FCRA & IBC
  {
    moduleChapter: "M2 Part II Ch 1: FEMA, 1999",
    sectionRef: "Schedule II & III, ECB Framework & Sec 13–14",
    provisionSubject: "LRS Limit, Corporate Remittances, Currency Retention, ECB Limit & FEMA Penalties",
    monetaryNumericalThreshold: "Individual LRS: USD 250,000 / FY | Corp Donations: <= Min(1% of 3-yr FX earnings, USD 5,000,000) | Flat Sale Commission: <= Max(USD 25,000, 5% inward remittance) | Consultancy: <= USD 10,000,000 (Infra) / USD 1,000,000 (Others) | Pre-Incorporation: <= Max(5% investment, USD 100,000) | Retention on Return: <= USD 2,000 (Notes/TC) | ECB Automatic Route: <= USD 750 Million/FY (MAMP 3 yrs) | Sec 13 Penalty: <= 3x Sum (Quantifiable) or <= Rs. 2 Lakh (+ Rs. 5,000/day)",
    legalEffectException: "Importing Indian currency notes into India from Nepal/Bhutan: Notes of denomination > Rs. 100 are prohibited (up to Rs. 25,000 allowed in <= Rs. 100 notes)."
  },
  {
    moduleChapter: "M2 Part II Ch 2 & 3: FCRA, 2010 & IBC, 2016",
    sectionRef: "FCRA Sec 2, 4, 6, 7, 8, 12 & IBC Sec 4, 7, 12A, 21, 22, 30, 33, 54A",
    provisionSubject: "FCRA Gift/Admin/Registration Thresholds & IBC Default/CoC Voting Thresholds",
    monetaryNumericalThreshold: "FCRA: Personal Gift Exempt <= Rs. 1 Lakh; Relative Gift Form FC-1 > Rs. 10 Lakhs/FY; Medical Aid Intimation > Rs. 1 Lakh; Transfer to others = 0% (100% Prohibited u/s 7); Admin Expense Cap <= 20%; Registration Core Spend >= Rs. 15 Lakhs (3 yrs); Spend during Suspension <= 25% | IBC: CIRP Default >= Rs. 1 Crore (MSME PPIRP >= Rs. 10 Lakhs); Class/Allottees Joint Petition >= Min(100, 10% of class); CoC Voting: Routine = 51%, RP/Extension/Sec 28/Resolution Plan/Liquidation = 66%, Sec 12A Withdrawal = 90%",
    legalEffectException: "Where Corporate Debtor has no FCs or all FCs are related parties, CoC consists of 18 largest operational creditors by value + 1 workmen rep + 1 employee rep."
  }
];

export function SetATimeLimitsChart({ searchQuery = "" }: { searchQuery?: string }) {
  const q = searchQuery.toLowerCase().trim();
  const filteredRows = q
    ? SET_A_TIME_LIMITS_DATA.filter(
        r =>
          r.moduleChapter.toLowerCase().includes(q) ||
          r.sectionRef.toLowerCase().includes(q) ||
          r.provisionEvent.toLowerCase().includes(q) ||
          r.timeLimit.toLowerCase().includes(q) ||
          r.condonationException.toLowerCase().includes(q)
      )
    : SET_A_TIME_LIMITS_DATA;

  if (filteredRows.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-left" id="set-a-time-limits-chart">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
          <Clock size={18} className="text-blue-600 shrink-0" />
          <span>Set-A Master Statutory Time Limits Chart (All 14 Chapters)</span>
        </h3>
        <span className="text-xs font-mono font-bold text-slate-500">
          {filteredRows.length} Statutory Timelines
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white font-mono uppercase text-[10px] tracking-wider">
              <th className="p-3 rounded-tl-xl border-b border-slate-800 w-36">Chapter</th>
              <th className="p-3 border-b border-slate-800 w-36">Section / Rule</th>
              <th className="p-3 border-b border-slate-800">Statutory Event / Compliance Action</th>
              <th className="p-3 border-b border-slate-800 w-56">Prescribed Time Limit</th>
              <th className="p-3 rounded-tr-xl border-b border-slate-800">Condonation / Proviso / Exception</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {filteredRows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                <td className="p-3 font-bold text-slate-900 align-top">
                  {getPlainChapterName(row.moduleChapter)}
                </td>
                <td className="p-3 font-mono font-bold text-blue-700 align-top">
                  <HighlightedText text={row.sectionRef} searchQuery={searchQuery} boldPrefix={false} />
                </td>
                <td className="p-3 font-medium text-slate-800 align-top leading-relaxed">
                  <HighlightedText text={row.provisionEvent} searchQuery={searchQuery} boldPrefix={false} />
                </td>
                <td className="p-3 font-extrabold text-emerald-700 font-mono align-top leading-relaxed">
                  <HighlightedText text={row.timeLimit} searchQuery={searchQuery} boldPrefix={false} />
                </td>
                <td className="p-3 text-slate-600 align-top leading-relaxed">
                  <HighlightedText text={row.condonationException} searchQuery={searchQuery} boldPrefix={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SetAMonetaryLimitsChart({ searchQuery = "" }: { searchQuery?: string }) {
  const q = searchQuery.toLowerCase().trim();
  const filteredRows = q
    ? SET_A_MONETARY_LIMITS_DATA.filter(
        r =>
          r.moduleChapter.toLowerCase().includes(q) ||
          r.sectionRef.toLowerCase().includes(q) ||
          r.provisionSubject.toLowerCase().includes(q) ||
          r.monetaryNumericalThreshold.toLowerCase().includes(q) ||
          r.legalEffectException.toLowerCase().includes(q)
      )
    : SET_A_MONETARY_LIMITS_DATA;

  if (filteredRows.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-left" id="set-a-monetary-limits-chart">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
          <Coins size={18} className="text-amber-600 shrink-0" />
          <span>Set-A Master Monetary & Numerical Thresholds Chart (All 14 Chapters)</span>
        </h3>
        <span className="text-xs font-mono font-bold text-slate-500">
          {filteredRows.length} Statutory Thresholds
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white font-mono uppercase text-[10px] tracking-wider">
              <th className="p-3 rounded-tl-xl border-b border-slate-800 w-36">Chapter</th>
              <th className="p-3 border-b border-slate-800 w-36">Section / Rule</th>
              <th className="p-3 border-b border-slate-800 w-52">Provision / Applicability Subject</th>
              <th className="p-3 border-b border-slate-800">Monetary / Percentage / Numerical Limit</th>
              <th className="p-3 rounded-tr-xl border-b border-slate-800 w-64">Exemptions & Key Legal Nuances</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {filteredRows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                <td className="p-3 font-bold text-slate-900 align-top">
                  {getPlainChapterName(row.moduleChapter)}
                </td>
                <td className="p-3 font-mono font-bold text-blue-700 align-top">
                  <HighlightedText text={row.sectionRef} searchQuery={searchQuery} boldPrefix={false} />
                </td>
                <td className="p-3 font-bold text-slate-800 align-top leading-relaxed">
                  <HighlightedText text={row.provisionSubject} searchQuery={searchQuery} boldPrefix={false} />
                </td>
                <td className="p-3 font-extrabold text-amber-800 font-mono align-top leading-relaxed">
                  <HighlightedText text={row.monetaryNumericalThreshold} searchQuery={searchQuery} boldPrefix={false} />
                </td>
                <td className="p-3 text-slate-600 align-top leading-relaxed">
                  <HighlightedText text={row.legalEffectException} searchQuery={searchQuery} boldPrefix={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ChapterVisualizer({ chapterId, chapterName, searchQuery }: ChapterVisualizerProps) {
  const plainChapterName = getPlainChapterName(chapterName);
  return (
    <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4 text-left shadow-sm font-sans" id={`concept-visualizer-ch-${chapterId}`}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-3">
        <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5 uppercase font-mono tracking-wider" id="visualizer-header-title">
          <Layers size={16} className="text-indigo-600" />
          {chapterId >= 101
            ? `Statutory Blueprint — ${plainChapterName}`
            : `Concept Blueprint — ${plainChapterName}`}
        </h4>
      </div>

      {highlightReactNode(
      <div className="space-y-4">
        {/* ========================================================================= */}
        {/* SET B (CHAPTERS 1–13): HIGH-YIELD POINT-WISE CONCEPT BLUEPRINTS           */}
        {/* ========================================================================= */}

        {chapterId === 1 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Strategic Cost Management (SCM) — Three Core Pillars</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Value Chain Analysis (Porter, 1985):</strong> Views the firm as a linked sequence of value-creating activities rather than isolated departments; distinguishes Internal Linkages (between primary and support activities inside the firm) and Vertical/External Linkages (with upstream suppliers and downstream channels).</li>
              <li><strong>Strategic Positioning Analysis:</strong> Aligns cost management systems with Porter's generic strategies — Cost Leadership (rigorous standard costing, target costing, budgetary variance control, economies of scale) vs. Product Differentiation (R&D innovation, Customer Value-to-Cost Ratio, flexible budgeting, brand equity metrics).</li>
              <li><strong>Cost Driver Analysis (Riley's Taxonomy):</strong> Structural Cost Drivers (determined by strategic choices: Scale of investment, Scope of vertical integration, Experience/learning curve, Technology process, and Product line complexity) vs. Executional Cost Drivers (determined by operational execution: Workforce participation, TQM commitment, Capacity utilization, Plant layout efficiency, Product configuration, and Supplier/Customer linkages).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Value Chain Activities, Value Shop & Value Network</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Primary Activities (5):</strong> Inbound Logistics (receiving, warehousing, material handling) &rarr; Operations (machining, assembly, testing) &rarr; Outbound Logistics (order processing, finished goods distribution) &rarr; Marketing & Sales (pricing, channel selection, promotion) &rarr; Service (installation, warranty repair, spare parts).</li>
              <li><strong>Support Activities (4):</strong> Firm Infrastructure (general management, legal, finance, quality assurance), Human Resource Management (recruiting, training, reward systems), Technology Development (R&D, process automation, product design), and Procurement (purchasing inputs across all activities).</li>
              <li><strong>Value Shop (Stabell & Fjeldstad):</strong> Mobilizes resources and specialist expertise to solve unique, non-standardized client problems (e.g., hospitals, law/CA firms, engineering consultancies); characterized by cyclical, iterative problem-finding and problem-solving rather than linear material flow.</li>
              <li><strong>Value Network:</strong> Creates value by facilitating exchange and network mediation among distributed users (e.g., telecom operators, retail banks, insurance companies, digital two-sided marketplaces).</li>
            </ul>
          </div>
        )}

        {chapterId === 2 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Cost of Quality (COQ) & Total Quality Management (TQM)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Prevention Costs (Conformance):</strong> Incurred prior to production to prevent defects from occurring (quality engineering, supplier certification, preventive equipment maintenance, quality circles, employee quality training, Poka-Yoke design).</li>
              <li><strong>Appraisal Costs (Conformance):</strong> Incurred to inspect and test conformity to quality standards (incoming material inspection, in-process statistical quality control, calibration of test equipment, field testing).</li>
              <li><strong>Internal Failure Costs (Non-Conformance):</strong> Incurred when defects are detected BEFORE shipment to the customer (scrap, rework, re-inspection, downtime due to quality defects, downgrading off-spec units).</li>
              <li><strong>External Failure Costs (Non-Conformance):</strong> Incurred when defects reach the customer AFTER delivery (warranty repairs/replacements, product recalls, product liability litigation, customer complaint handling, lost future sales/reputation). Optimal COQ shifts spending toward Prevention to drive total COQ down.</li>
              <li><strong>TQM 6 Cs & PDCA Cycle:</strong> Commitment, Culture, Continuous Improvement, Co-operation, Customer Focus, and Control; Deming's Plan-Do-Check-Act (PDCA) cycle institutionalizes iterative process improvement.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Theory of Constraints (TOC) & Supply Chain Management</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Goldratt's Three Operational Measures:</strong> (1) Throughput Contribution (Sales Revenue minus Totally Variable/Direct Material Costs; labour and factory overheads are treated as fixed period Operating Expenses); (2) Investment/Inventory (money tied up in raw materials, WIP, finished goods, R&D, and equipment); (3) Operating Expense (all non-material costs required to turn inventory into throughput).</li>
              <li><strong>Throughput Accounting Ratio (TAR):</strong> TAR = (Throughput Return per Bottleneck Hour) / (Total Factory Operating Cost per Bottleneck Hour). Products with TAR &gt; 1.0 generate net value; multi-product production priority is ranked strictly by highest Throughput per unit of Bottleneck Resource.</li>
              <li><strong>Drum-Buffer-Rope (DBR) & Supply Chain Integration:</strong> The bottleneck is the 'Drum' setting the beat; a time/inventory 'Buffer' protects the bottleneck from upstream starvation; the 'Rope' ties material release at the first workstation to the bottleneck's consumption rate. Push vs. Pull supply chains, Vendor Managed Inventory (VMI), and Customer Lifetime Value (CLV) drive end-to-end profitability.</li>
            </ul>
          </div>
        )}

        {chapterId === 3 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Just-in-Time (JIT), Cellular Manufacturing & Kaizen</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>JIT Production & Purchasing:</strong> Pull-based Kanban production triggered by actual downstream consumption; eliminates raw material/WIP buffers, requires zero-defect vendor deliveries directly to the shop floor, reduces vendor base to long-term certified partners, and utilizes Backflush Costing (delaying journal entries until finished goods completion or sale).</li>
              <li><strong>Takt Time, Cycle Time & Cellular Layout:</strong> Takt Time = Available Net Operating Time per Shift / Customer Demand per Shift (synchronizes production pace with market demand); Cycle Time = Total Production Time / Units Produced. U-shaped manufacturing cells group dissimilar machines by product family to eliminate inter-departmental material handling and enable multi-skilled worker flexing.</li>
              <li><strong>Single Minute Exchange of Die (SMED) & Kaizen Costing:</strong> SMED converts internal setup steps (performed while machine is stopped) into external setup steps (performed while machine is running) to enable economic batch sizes of one; Kaizen Costing applies continuous, incremental cost-reduction targets during the active manufacturing phase.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. 5S, 7 Wastes (TIMWOOD), TPM & OEE</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>5S Methodology:</strong> Seiri (Sort — red-tag and eliminate unneeded items), Seiton (Set in Order — ergonomic, labeled storage), Seiso (Shine — daily cleaning as inspection), Seiketsu (Standardize — visual SOPs and color coding), and Shitsuke (Sustain — self-discipline and regular 5S audits).</li>
              <li><strong>Total Productive Maintenance (TPM) — 8 Pillars & 6 Big Losses:</strong> Autonomous Maintenance (Jishu Hozen) empowers operators for daily lubrication/cleaning. OEE = Availability % (excludes Breakdown & Setup/Adjustment losses) × Performance % (excludes Idling/Minor Stoppages & Reduced Speed losses) × Quality % (excludes Process Defects/Scrap & Reduced Yield/Startup losses). World-class OEE benchmark &ge; 85%.</li>
              <li><strong>Business Process Re-engineering (BPR):</strong> Fundamental rethinking and radical redesign of end-to-end business processes (Hammer & Champy) to achieve dramatic, quantum leaps in cost, quality, service, and speed (contrasted with incremental Kaizen).</li>
            </ul>
          </div>
        )}

        {chapterId === 4 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Target Costing, Value Engineering & Life Cycle Costing</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Target Costing Process:</strong> Market-driven pricing sets the Target Selling Price &rarr; Deduct Desired Target Profit Margin = Allowable Target Cost &rarr; Compare with Current Estimated Cost to quantify the Cost Gap &rarr; Apply Value Engineering (design stage) and Functional Analysis to close the Cost Gap before locking in production specifications.</li>
              <li><strong>Value Engineering (VE) vs. Value Analysis (VA):</strong> VE is applied during new product R&D/design (where 80%–90% of life-cycle costs are committed); Distinguishes Use Value (functional performance) from Esteem Value (prestige/aesthetics) and eliminates components that add cost without enhancing customer-perceived value.</li>
              <li><strong>Product Life Cycle Costing (4 Stages):</strong> Tracks all upstream (R&D, prototyping, design), manufacturing, and downstream (marketing, distribution, warranty, decommissioning) costs across Introduction, Growth, Maturity, and Decline to evaluate true cradle-to-grave product profitability.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Pareto Analysis & Environmental Management Accounting (EMA)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Pareto (80:20) Analysis Applications:</strong> Product portfolio pruning (20% of SKUs generating 80% of contribution), Customer Profitability Analysis (identifying top 20% profit-generating vs. bottom loss-making customers), Quality Control (20% of root causes causing 80% of defects), and Activity-Based Costing driver concentration.</li>
              <li><strong>Environmental Management Accounting (EMA):</strong> Combines physical flow accounting (kilograms of raw materials, kilowatt-hours of energy, cubic meters of water, and hazardous waste mass balance) with monetary environmental cost classification (Hanson & Mendoza: Environmental Prevention, Detection, Internal Failure, and External Failure costs; US EPA: Conventional, Potentially Hidden, Contingent, and Image/Relationship costs).</li>
              <li><strong>EMA Allocation Techniques:</strong> Input-Outflow Analysis (mass balance equation: Input = Priced Output + Unpriced Waste), Flow Cost Accounting (tracks material, system, and delivery/disposal costs across positive products vs. negative material losses), Activity-Based EMA, and Life-Cycle Assessment (LCA).</li>
            </ul>
          </div>
        )}

        {chapterId === 5 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Digital Platforms, SaaS Metrics & Service Sector Costing</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Digital Platform & SaaS Unit Economics:</strong> Gross Merchandise Value (GMV), Platform Take Rate (Commission Revenue / GMV), Monthly Recurring Revenue (MRR), Average Revenue Per User (ARPU), Monthly Churn Rate %, Customer Lifetime Value (LTV = [ARPU × Gross Margin %] / Churn Rate), and Customer Acquisition Cost (CAC). Viable scaling requires LTV / CAC &ge; 3.0 and CAC Payback Period &le; 12 months.</li>
              <li><strong>Service Sector Costing & Composite Units:</strong> Addresses Intangibility, Perishability (unused capacity is lost forever), Inseparability, and Heterogeneity; utilizes composite cost units (e.g., Passenger-Km, Tonne-Km, Room-Day, Patient-Bed-Day, Server-Instance-Hour) to normalize variable and fixed cost absorption.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Power Sector & Agricultural Sector Cost Management</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Power Sector Availability Based Tariff (ABT):</strong> Three-part tariff mechanism: (1) Capacity Charge (linked to Declared Plant Availability vs. Normative Target Availability, recovering fixed depreciation, interest on loan, RoE, and O&M); (2) Energy Charge (variable fuel cost based on Normative Station Heat Rate, Specific Secondary Fuel Oil Consumption, and GCV of coal); and (3) Unscheduled Interchange (UI) / Deviation Settlement Mechanism (DSM) penalty/incentive linked to real-time grid frequency.</li>
              <li><strong>Agricultural Sector Costing:</strong> Incorporates biological asset transformation, seasonal crop cycles, valuation of joint products and by-products (e.g., grain vs. straw/bagasse), imputed value of family labour and owned land (Cost Concepts A1, A2, B1, B2, C1, C2, C3), and cold-chain post-harvest wastage control.</li>
            </ul>
          </div>
        )}

        {chapterId === 6 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Relevant Costing Rules for Short-Run Decision Making</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Direct Materials Valuation Matrix:</strong> (a) If material is in regular use and must be replaced: Relevant Cost = Current Replacement Cost; (b) If material is obsolete/not in regular use and has no alternative use: Relevant Cost = Net Realizable (Scrap) Value; (c) If material is not in regular use but can substitute another material in production: Relevant Cost = Higher of Net Realizable Value or Savings in alternative material.</li>
              <li><strong>Direct Labour & Overheads Valuation:</strong> Permanent/salaried labour with spare capacity has ZERO relevant cost; if permanent labour is working at full capacity and diverted from regular production, Relevant Cost = Hourly Wage Rate paid + Contribution Lost per hour on displaced product (unless overtime is cheaper). Absorbed general fixed overheads and sunk historical costs are strictly irrelevant; only incremental specific fixed costs are relevant.</li>
              <li><strong>Make-or-Buy & Limiting Factor Ranking:</strong> With no constraint, buy externally if External Supplier Price &lt; Internal Incremental Variable + Specific Fixed Cost per unit. With a limiting resource (machine hours/skilled labour), compute Cost Saved by Making per unit of Limiting Factor = (Outside Purchase Price - Internal Variable Cost) / Limiting Resource per unit; manufacture highest-ranked items internally and outsource the rest.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Pricing Theory, Elasticity & Strategic Pricing Models</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Profit-Maximizing Price Equation:</strong> Demand function P = a - bQ &rArr; Total Revenue TR = aQ - bQ² &rArr; Marginal Revenue MR = a - 2bQ. Equate MR = Marginal Cost (MC) to solve for optimal quantity Q*, where b = (Change in Price) / (Change in Quantity) and a = P₀ + bQ₀.</li>
              <li><strong>Strategic Pricing Frameworks:</strong> Market Skimming (high price for patented/differentiated launch with low price elasticity and high entry barriers) vs. Penetration Pricing (low initial price where demand is highly elastic and strong economies of scale/network effects exist). Also covers Peak-Load Pricing, Price Discrimination (1st, 2nd, and 3rd degree), Predatory Pricing, and Freemium/Bundling strategies.</li>
            </ul>
          </div>
        )}

        {chapterId === 7 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. DuPont ROI, Residual Income (RI) & Goal Congruence</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>DuPont Return on Investment (ROI):</strong> ROI = Controllable Operating Profit (EBIT) / Capital Employed = Operating Profit Margin (EBIT / Sales) × Capital Turnover (Sales / Capital Employed). Distinguishes Controllable Profit (evaluates divisional manager) from Traceable Profit (evaluates economic viability of the division itself).</li>
              <li><strong>Dysfunctional ROI Sub-Optimization vs. Residual Income (RI):</strong> A division currently earning 24% ROI will reject a new capital project yielding 18% even when company WACC is 12%, destroying corporate wealth. Residual Income = Controllable EBIT - (Capital Employed × Imputed Cost of Capital %); accepts all projects where project return &gt; Cost of Capital, restoring goal congruence (though RI is an absolute measure and cannot directly compare divisions of different sizes).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Economic Value Added (EVA), SVA & Triple Bottom Line (TBL)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Economic Value Added (Stern Stewart Model):</strong> EVA = NOPAT - (WACC % × Adjusted Invested Capital). NOPAT = EBIT × (1 - Tax Rate) + Accounting Adjustments (add back expensed R&D/brand building/training less economic amortization, add back non-cash provisions/deferred tax changes, add back operating lease interest, replace accounting depreciation with economic depreciation).</li>
              <li><strong>Shareholder Value Added (SVA — Rappaport's 7 Value Drivers):</strong> (1) Rate of Sales Growth, (2) Operating Profit Margin, (3) Cash Income Tax Rate, (4) Incremental Working Capital Investment, (5) Incremental Fixed Capital Investment, (6) Weighted Average Cost of Capital (WACC), and (7) Competitive Advantage Period (Value Growth Duration).</li>
              <li><strong>Triple Bottom Line (Elkington — 3 Ps):</strong> Expands corporate reporting beyond financial Profit (economic value) to include People (labour fairness, community health, workplace safety) and Planet (carbon footprint, energy efficiency, circular waste reduction).</li>
            </ul>
          </div>
        )}

        {chapterId === 8 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Quantitative Corporate Distress Prediction Models</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Altman's Z-Score (Listed Manufacturing Firms):</strong> Z = 1.2 X₁ + 1.4 X₂ + 3.3 X₃ + 0.6 X₄ + 1.0 X₅, where X₁ = Working Capital / Total Assets (liquidity), X₂ = Retained Earnings / Total Assets (cumulative profitability/age), X₃ = EBIT / Total Assets (operating productivity — highest weight 3.3), X₄ = Market Value of Equity / Book Value of Total Liabilities (solvency/leverage), and X₅ = Sales / Total Assets (asset turnover). Cut-offs: Z &gt; 2.99 = Safe Zone; 1.81 &le; Z &le; 2.99 = Grey Zone; Z &lt; 1.81 = Distress Zone.</li>
              <li><strong>Altman Z'-Score (Private Manufacturing) & Z''-Score (Non-Manufacturing / Emerging Markets):</strong> Private Manufacturing Z' = 0.717 X₁ + 0.847 X₂ + 3.107 X₃ + 0.420 X₄ (Book Value of Equity / Total Liabilities) + 0.998 X₅ (Safe &gt; 2.90, Distress &lt; 1.23). Non-Manufacturing Z'' omits X₅: Z'' = 6.56 X₁ + 3.26 X₂ + 6.72 X₃ + 1.05 X₄ (Safe &gt; 2.60, Distress &lt; 1.10).</li>
              <li><strong>NCAER & L.C. Gupta Models:</strong> NCAER evaluates three parameters (Cash Profit to Sales/Assets, Net Worth to Total Debt, Working Capital position); L.C. Gupta highlights EBDIT / Sales and Operating Cash Flow / Total Tangible Assets as the most reliable early-warning indicators of industrial sickness.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Qualitative Corporate Failure Model — Argenti's A-Score</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Stage 1 — Defects (Max 43 Marks; Danger Threshold &gt; 10):</strong> Management weaknesses (Autocratic Chief Executive = 8, CEO also Chairman = 4, Passive Board = 2, Unbalanced Board skills = 2, Weak Finance Director = 2, Lack of middle management depth = 1) + Accounting deficiencies (No budgetary control = 3, No cash flow forecast = 3, No costing system = 3) + Failure to respond to change (15).</li>
              <li><strong>Stage 2 — Mistakes Made as a Result of Defects (Max 45 Marks; Danger Threshold &gt; 15):</strong> High Gearing / Leverage (15), Overtrading — expanding sales faster than working capital can support (15), and Failure of a Big Project that cripples solvency (15).</li>
              <li><strong>Stage 3 — Symptoms of Approaching Failure (Max 12 Marks):</strong> Financial signs / deteriorating Z-score (4), Creative accounting / window dressing (4), Non-financial signs like frozen salaries, delayed maintenance, high staff turnover (3), and Terminal signs (1). Total Possible Score = 100; Overall A-Score &gt; 25 (with Defects &gt; 10 and Mistakes &gt; 15) signals severe risk of collapse.</li>
            </ul>
          </div>
        )}

        {chapterId === 9 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Kaplan & Norton's Balanced Scorecard & Strategy Maps</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Four Integrated Perspectives:</strong> (1) Learning & Growth (Leading: employee capability, IT systems, organizational culture) &rarr; drives (2) Internal Business Processes (Leading: innovation cycle, MCE, OEE, defect rate) &rarr; drives (3) Customer Perspective (Lagging/Leading: on-time delivery, NPS, customer retention, market share) &rarr; drives (4) Financial Perspective (Lagging: ROCE, EVA, cash flow, revenue growth).</li>
              <li><strong>Cause-and-Effect Strategy Linkage:</strong> Every non-financial KPI on a Balanced Scorecard must form part of a testable cause-and-effect chain culminating in long-term financial performance; avoids metric overload (typically 4–5 core KPIs per perspective).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Building Block Model, Performance Pyramid & Performance Prism</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Fitzgerald & Moon Building Block Model (Service Organizations):</strong> (1) Six Dimensions — divided into 2 Downstream Results (Financial Performance, Competitiveness) and 4 Upstream Determinants (Quality of Service, Flexibility, Resource Utilization, Innovation); (2) Three Standards Criteria (Ownership, Achievability, Equity); and (3) Three Rewards Criteria (Clarity, Motivation, Controllability).</li>
              <li><strong>Lynch & Cross Performance Pyramid (Smart Pyramid):</strong> Top-down cascade of Objectives and bottom-up flow of Measures across 4 tiers: Corporate Vision &rarr; Business Units (Market & Financial) &rarr; Business Operating Systems (Customer Satisfaction, Flexibility, Productivity) &rarr; Departments & Workcentres (Quality, Delivery, Cycle Time, Waste). Left side = External Effectiveness; Right side = Internal Efficiency.</li>
              <li><strong>Neely & Adams Performance Prism (5 Interrelated Facets):</strong> (1) Stakeholder Satisfaction (who are our stakeholders and what do they want?), (2) Stakeholder Contribution (what do we want and need from our stakeholders in return?), (3) Strategies, (4) Processes, and (5) Capabilities. Explicitly rejects the idea that performance measures should be derived solely from strategy; strategy exists to deliver stakeholder value.</li>
            </ul>
          </div>
        )}

        {chapterId === 10 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Value for Money (VFM) — The 3Es & 4Es Framework</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Economy (Input Focus — "Spending Less"):</strong> Acquiring human, physical, and material input resources of the specified quality and quantity at the lowest possible cost (e.g., bulk procurement of generic medicines or school textbooks through competitive tendering without compromising quality standards).</li>
              <li><strong>Efficiency (Input-to-Output Ratio — "Spending Well"):</strong> Maximizing the volume of outputs produced per unit of input resource consumed, or minimizing inputs for a given output (e.g., patients treated per doctor-hour, cost per student educated, or emergency fire-engine dispatch response time).</li>
              <li><strong>Effectiveness (Output-to-Outcome Alignment — "Spending Wisely"):</strong> The extent to which the outputs produced actually achieve the organization's stated social, policy, or mission objectives (e.g., actual disease cure/survival rates, post-graduation employment rates, or reduction in fire casualties).</li>
              <li><strong>Equity (4th E — Fairness of Access):</strong> Ensuring public or charitable services reach disadvantaged target beneficiaries fairly across geographical and socio-economic segments.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Performance Measurement Challenges & Adapted BSC in NPOs</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Unique NPO Complexities:</strong> No single bottom-line profit measure; benefits are qualitative, long-term, and external to the funding body; multiple principals with conflicting priorities (donors vs. beneficiaries vs. regulators); and fund-accounting legal restrictions that prevent reallocating surplus across programs.</li>
              <li><strong>Adapted Balanced Scorecard for NPOs:</strong>Elevates Mission / Social Impact to the pinnacle of the Scorecard, flanked by dual Customer perspectives — the Donor/Taxpayer Perspective (resource provider) and the Beneficiary/Citizen Perspective (service recipient) — supported by Internal Processes and Learning & Growth.</li>
            </ul>
          </div>
        )}

        {chapterId === 11 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Earned Value Management (EVM) Core Equations</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Baseline Metrics:</strong> Budget at Completion (BAC) = Total authorized project budget; Planned Value (PV or BCWS) = Scheduled % complete × BAC; Earned Value (EV or BCWP) = Actual physical % complete × BAC; Actual Cost (AC or ACWP) = Actual expenditure incurred for work performed to date.</li>
              <li><strong>Cost & Schedule Variances:</strong> Cost Variance (CV) = EV - AC (CV &gt; 0 is Favorable / Under Budget; CV &lt; 0 is Adverse / Cost Overrun). Schedule Variance (SV) = EV - PV (SV &gt; 0 is Favorable / Ahead of Schedule; SV &lt; 0 is Adverse / Behind Schedule).</li>
              <li><strong>Efficiency Indices:</strong> Cost Performance Index (CPI) = EV / AC (CPI &gt; 1.0 indicates earning more value per rupee spent). Schedule Performance Index (SPI) = EV / PV (SPI &gt; 1.0 indicates progressing faster than planned schedule).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Forecasting EAC, ETC, VAC & To-Complete Performance Index (TCPI)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Estimate at Completion (EAC) Three Scenarios:</strong> (1) Future work performed at budgeted rate (atypical/one-off current variance): EAC = AC + (BAC - EV); (2) Future work performed at current CPI efficiency (typical variance): EAC = BAC / CPI; (3) Both CPI and SPI influence remaining work: EAC = AC + [(BAC - EV) / (CPI × SPI)].</li>
              <li><strong>Estimate to Complete (ETC) & Variance at Completion (VAC):</strong> ETC = EAC - AC; VAC = BAC - EAC.</li>
              <li><strong>To-Complete Performance Index (TCPI):</strong> TCPI (to meet original BAC) = Remaining Work / Remaining Budget = (BAC - EV) / (BAC - AC). If original BAC is no longer achievable, TCPI (to meet revised EAC) = (BAC - EV) / (EAC - AC). A TCPI &gt; 1.0 means stringent cost efficiency improvement is required on remaining tasks.</li>
            </ul>
          </div>
        )}

        {chapterId === 12 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Divisional Transfer Pricing Boundaries & Goal Congruence</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Supplying Division's Minimum Transfer Price (Floor):</strong> Minimum TP = Incremental Marginal/Variable Cost per unit + Opportunity Cost per unit of internal transfer (Contribution foregone on external sales displaced due to capacity constraint) minus Selling/Packing/Delivery Cost saved on internal transfers.</li>
              <li><strong>Buying Division's Maximum Transfer Price (Ceiling):</strong> Maximum TP = Lower of: (a) External Market Purchase Price from outside vendor (less any internal inspection/freight advantage), OR (b) Net Marginal Revenue from final downstream product (Final Selling Price minus Buying Division's own further processing & selling variable costs).</li>
              <li><strong>Capacity & Bottleneck Application:</strong> When Supplying Division has idle capacity, Opportunity Cost = 0 (Floor = Variable Cost). When Supplying Division is at 100% capacity producing multiple products on a shared bottleneck machine, Opportunity Cost per unit of internal transfer = (Bottleneck Hours required per transferred unit) × (Contribution per Bottleneck Hour of the least-profitable displaced external product).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Advanced & Multinational Transfer Pricing Mechanisms</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Two-Part Tariff & Dual-Rate Transfer Pricing:</strong> Two-Part Tariff transfers units at Marginal Cost (promoting optimal volume choice by Buyer) plus a periodic Lump-Sum Fixed Fee to reimburse Supplier's fixed capacity costs and profit. Dual-Rate credits Supplier at Market Price and debits Buyer at Variable Cost (eliminating corporate head-office subsidy at consolidation).</li>
              <li><strong>International Transfer Pricing Optimization:</strong> Evaluates overall group post-tax profit by balancing Differential Corporate Income Tax Rates across countries, Import Tariffs/Customs Duties on declared transfer value, Withholding Taxes on dividends/royalties, Foreign Exchange Controls, and OECD Arm's Length Principle compliance.</li>
            </ul>
          </div>
        )}

        {chapterId === 13 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Planning & Operational Variances (Ex-Ante vs. Ex-Post Standards)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Conceptual Separation:</strong> Traditional variance analysis compares Original Standard (Ex-Ante) directly with Actual Results, unfairly penalizing or rewarding operational managers for uncontrollable external market shifts. Planning & Operational analysis inserts a Revised Standard (Ex-Post) reflecting uncontrollable general market conditions at the time of operation.</li>
              <li><strong>Material Price & Usage Planning vs. Operational Formulas:</strong> Material Price Planning Variance = (Original Standard Price - Revised Market Price) × Actual Quantity (or Revised Std Qty under strict Hulbert convention); Material Price Operational Variance = (Revised Market Price - Actual Price Paid) × Actual Quantity Purchased/Used. Material Usage Planning Variance = (Original Std Qty - Revised Std Qty for Actual Output) × Original Standard Price; Material Usage Operational Variance = (Revised Std Qty - Actual Qty) × Revised Market Price (or Original Std Price to reconcile to Total Traditional Variance).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Mix & Yield, Market Size/Share & Reconciliation Variances</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Material / Labour Mix & Yield Variances:</strong> Mix Variance = (Actual Input in Standard Mix Proportions - Actual Input in Actual Mix) × Standard Input Price. Yield Variance = (Actual Output Yield - Standard Output Expected from Total Actual Input) × Standard Cost per unit of Output. Abnormal Idle Time is always Adverse and excluded from Actual Hours Worked before computing Labour Mix (Gang) and Labour Sub-Efficiency (Yield) variances.</li>
              <li><strong>Sales Margin Volume Decomposition (Market Size vs. Market Share):</strong> Sales Margin Volume Variance = Sales Margin Mix Variance + Sales Margin Quantity Variance. Quantity Variance splits into: (a) Market Size Variance = [Budgeted Market Share % × (Actual Industry Volume - Budgeted Industry Volume)] × Budgeted Average Standard Margin per unit (Uncontrollable Planning variance); and (b) Market Share Variance = [(Actual Market Share % - Budgeted Market Share %) × Actual Industry Volume] × Budgeted Average Standard Margin per unit (Controllable Operational variance).</li>
              <li><strong>Absorption vs. Marginal Reconciliation:</strong> Under Marginal Costing, Profit Reconciliation uses Sales Margin (Contribution) Variances and omits Fixed Overhead Volume Variance (Efficiency + Capacity + Calendar). Difference between Absorption and Marginal Operating Statements equals (Change in Inventory Units × Standard Fixed Overhead Absorption Rate per unit).</li>
            </ul>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SET A (CHAPTERS 101–114): HIGH-YIELD POINT-WISE STATUTORY BLUEPRINTS      */}
        {/* ========================================================================= */}

        {chapterId === 101 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Board Composition, Resident, Woman & Independent Directors (Sec 149–151)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Minimum & Maximum Directors [Sec 149(1)]:</strong> Min 3 (Public), 2 (Private), 1 (OPC); Max 15 directors. Appointing &gt; 15 directors requires a Special Resolution (Section 8 companies and Government companies are exempt from the 15-director cap and Special Resolution requirement).</li>
              <li><strong>Resident Director [Sec 149(3)]:</strong> Every company (including OPC and Private Co) must have at least 1 director who stays in India for a total period of not less than 182 days during the financial year (proportionate for newly incorporated companies).</li>
              <li><strong>Woman Director [Sec 149(1) 2nd Proviso & Rule 3]:</strong> Mandatory for every listed company and every public company having Paid-up Share Capital &ge; Rs. 100 Crore OR Turnover &ge; Rs. 300 Crore (as per latest audited financials). Intermittent vacancy must be filled at the immediate next Board Meeting OR within 3 months from the date of vacancy, whichever is LATER.</li>
              <li><strong>Independent Directors [Sec 149(4)–(13) & Rule 4]:</strong> Listed Public Co: &ge; 1/3rd of total directors. Unlisted Public Co: At least 2 IDs if Paid-up Capital &ge; Rs. 10 Cr OR Turnover &ge; Rs. 100 Cr OR Aggregate Outstanding Loans, Debentures & Deposits &gt; Rs. 50 Cr. Exempt Unlisted Public Cos: Joint Venture (JV), Wholly Owned Subsidiary (WOS), and Dormant Company u/s 455. Tenure: Up to 5 consecutive years per term; max 2 consecutive terms (2nd term via Special Resolution), followed by 3-year cooling-off period. IDs are not entitled to ESOPs and are not liable to retire by rotation.</li>
              <li><strong>Small Shareholders' Director [Sec 151 & Rule 7]:</strong> Listed company may appoint upon notice (&ge; 14 days before meeting) of not less than 1,000 small shareholders or 1/10th of total small shareholders, whichever is LOWER (Small Shareholder = holding shares of nominal value &le; Rs. 20,000). Tenure: Max 3 consecutive years, non-retiring by rotation, ineligible for re-appointment, and can hold SSD office in max 2 companies (provided second company does not compete).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Rotational Retirement, Additional/Alternate/Casual Directors, Disqualifications & Vacation (Sec 152–172)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Rotational Directors [Sec 152(6)–(7)]:</strong> In a public company, at least 2/3rd of total directors (excluding IDs and statutory nominee directors) must be rotational directors (fraction rounded UP to next integer); out of the rotational pool, 1/3rd (or number nearest to 1/3rd) who have been longest in office retire at every AGM. Unlisted 100% Government companies (where &ge; 51% paid-up capital is held by CG/SG) and their subsidiaries are exempt from Sec 152(6)–(7).</li>
              <li><strong>Candidature of Non-Retiring Person [Sec 160]:</strong> Requires written notice at least 14 days before GM + deposit of Rs. 1,00,000 (refunded if elected OR gets &gt; 25% of total valid votes cast; deposit is EXEMPT if recommended by NRC or Board).</li>
              <li><strong>Board Appointments [Sec 161]:</strong> (a) Additional Director [Sec 161(1)]: Appointed if authorised by AoA; holds office up to next AGM (person who failed to get appointed at a GM cannot be appointed as Additional Director); (b) Alternate Director [Sec 161(2)]: Appointed during original director's absence from India for &ge; 3 months (alternate for an ID must also qualify as an ID; cannot hold alternate directorship for 2 directors in same company); (c) Casual Vacancy [Sec 161(4)]: Filled at a Board Meeting (no circular resolution), subsequently approved by members in immediate next GM, and holds office only for the unexpired term of original director.</li>
              <li><strong>Disqualifications [Sec 164] & Vacation [Sec 167]:</strong> Under Sec 164(2), a director of a company that fails to file financial statements OR annual returns for any continuous period of 3 FYs, OR fails to repay deposits/debentures/interest or redeem preference shares/pay declared dividend and such failure continues for 1 year or more, is disqualified for 5 years (office vacates immediately u/s 167(1)(a) in all OTHER companies, except the defaulting company itself; newly appointed director gets a 6-month grace window). Vacation u/s 167(1)(b) triggers if a director absents himself from all Board Meetings held during a period of 12 months with or without seeking leave of absence.</li>
              <li><strong>Maximum Directorships [Sec 165], Resignation [Sec 168] & Removal [Sec 169]:</strong> Max 20 companies (max 10 public companies, including private companies that are holding/subsidiary of a public company; Dormant & Sec 8 companies excluded). Resignation takes effect from date notice is received by company or date specified in notice, whichever is LATER (even if all directors resign/vacate, promoter or CG appoints required number of directors). Removal u/s 169 requires Ordinary Resolution on Special Notice (except ID re-appointed for 2nd term, who requires Special Resolution; directors appointed by Tribunal u/s 242 and directors appointed by proportional representation u/s 163 cannot be removed u/s 169).</li>
            </ul>
          </div>
        )}

        {chapterId === 102 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Appointment of MD, WTD, Manager & Key Managerial Personnel (Sec 196 & 203)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>MD/WTD/Manager Tenure & Eligibility [Sec 196 & Schedule V Part I]:</strong> A company cannot employ both a Managing Director and a Manager simultaneously. Max term = 5 years at a time; re-appointment cannot be made earlier than 1 year before expiry of current term. Age limits: Minimum 21 years and less than 70 years (appointing a person aged &ge; 70 years requires a Special Resolution, or Ordinary Resolution + Central Govt approval if votes in favour exceed votes against). Return of appointment in Form MR-1 must be filed within 60 days.</li>
              <li><strong>Schedule V Part I Conditions:</strong> Must not have been sentenced to imprisonment or fine &gt; Rs. 1,000 under 19 specified Economic/Corporate Acts; must not have been detained under COFEPOSA; must be a Resident of India (stayed in India for &ge; 182 days during preceding 12 months — relaxed for SEZ companies). If Schedule V Part I conditions are not met, Central Government approval is mandatory.</li>
              <li><strong>Mandatory Whole-Time KMP [Sec 203 & Rules 8/8A]:</strong> Every Listed Company and every Public Company with Paid-up Share Capital &ge; Rs. 10 Crore must have whole-time KMP: (i) MD, CEO, or Manager (and in their absence, a WTD); (ii) Company Secretary; and (iii) Chief Financial Officer. Under Rule 8A, every Private Company with Paid-up Share Capital &ge; Rs. 10 Crore must appoint a whole-time Company Secretary. Same individual cannot be Chairperson and MD/CEO unless AoA provides otherwise OR company does not carry multiple businesses. Whole-time KMP can hold office in only 1 company (plus its subsidiary), though a company may appoint a person who is MD/Manager of ONE other company as its MD via unanimous Board resolution with specific notice. KMP vacancy must be filled at a BM within 6 months.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Managerial Remuneration Ceilings, Schedule V Slabs, Loss of Office & Secretarial Audit (Sec 197–205)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Profit-Based Remuneration Caps [Sec 197(1)]:</strong> Total managerial remuneration in a public company &le; 11% of Net Profits calculated u/s 198 (Sitting fees up to Rs. 1,00,000 per meeting excluded). Sub-ceilings: 1 MD/WTD/Manager &le; 5%; &gt; 1 MD/WTD/Manager &le; 10% combined; Non-Executive Directors (including IDs) &le; 1% (if company has MD/WTD/Manager) or &le; 3% (if no MD/WTD/Manager). Exceeding 11% or any sub-ceiling requires Special Resolution (and prior approval of Bank/PFI/NCD holder/Secured Creditor if company is in default). Professional fees are excluded from caps if director possesses requisite qualification and NRC/Board certifies.</li>
              <li><strong>Inadequate or No Profits [Sec 197(3) & Schedule V Part II Sec II]:</strong> Based on Effective Capital: (i) Negative or &lt; Rs. 5 Cr: Max Rs. 60 Lakhs p.a. (MD/WTD/Manager) / Rs. 12 Lakhs p.a. (NED); (ii) Rs. 5 Cr to &lt; Rs. 100 Cr: Rs. 84 Lakhs / Rs. 17 Lakhs; (iii) Rs. 100 Cr to &lt; Rs. 250 Cr: Rs. 120 Lakhs / Rs. 24 Lakhs; (iv) &ge; Rs. 250 Cr: Rs. 120 Lakhs + 0.01% of Effective Capital above Rs. 250 Cr / Rs. 24 Lakhs + 0.01%. Can be exceeded by passing a Special Resolution (valid for max 3 years). Sitting fees [Sec 197(5)]: Max Rs. 1,00,000 per meeting. Insurance premium for D&O liability is not treated as remuneration unless person is proven guilty.</li>
              <li><strong>Recovery, Waiver, Clawback, Loss of Office & Secretarial Audit [Sec 197(9)–(10), 199, 202, 204]:</strong> Excess remuneration must be refunded within 2 years; waiver requires Special Resolution within 2 years (+ secured creditor consent if in default). Restatement of financials due to fraud/non-compliance triggers clawback from past/present MD/WTD/Manager/CEO u/s 199. Compensation for Loss of Office u/s 202 is payable ONLY to MD, WTD, or Manager, capped at Average Remuneration of last 3 years × Min(Unexpired Residue of Term, 3 Years). Secretarial Audit in Form MR-3 u/s 204 applies to every Listed Co, Public Co with Paid-up Capital &ge; Rs. 50 Cr OR Turnover &ge; Rs. 250 Cr, and ANY Co with outstanding Bank/PFI borrowings &ge; Rs. 100 Cr.</li>
            </ul>
          </div>
        )}

        {chapterId === 103 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Board Meetings, Quorum, Circulation & Board Committees (Sec 173–178)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Frequency & Notice of Board Meetings [Sec 173]:</strong> First BM within 30 days of incorporation; thereafter min 4 BMs every year with max gap of 120 days. OPC (with &gt;1 director), Small Co, Dormant Co & Start-up Pvt Co: At least 1 BM in each half of a calendar year with min gap of 90 days. Section 8 Co: At least 1 BM within every 6 calendar months. Notice: At least 7 days in writing to every director (shorter notice valid for urgent business if at least 1 ID is present, or circulated to all directors and ratified by at least 1 ID).</li>
              <li><strong>Quorum [Sec 174] & Resolution by Circulation [Sec 175]:</strong> Quorum = Higher of 1/3rd of total strength in office (fraction rounded up to 1) OR 2 directors. Interested directors u/s 184(2) are excluded from quorum; if interested directors &ge; 2/3rd of total strength, remaining non-interested directors present (&ge; 2) form quorum. Section 8 Co Quorum = Lower of 8 members OR 25% of total strength (min 2). Resolution by circulation requires approval by majority of directors in India entitled to vote, unless &ge; 1/3rd of total directors demand it be decided at a physical/VC meeting.</li>
              <li><strong>Audit Committee [Sec 177], NRC & SRC [Sec 178]:</strong> Audit Committee & NRC mandatory for Listed Public Cos and Unlisted Public Cos with Paid-up Capital &ge; Rs. 10 Cr OR Turnover &ge; Rs. 100 Cr OR Aggregate Borrowings &gt; Rs. 50 Cr (JV, WOS & Dormant exempt). Audit Committee: Min 3 directors with majority IDs (SEBI LODR requires &ge; 2/3rd IDs for listed). Vigil Mechanism [Sec 177(9)]: Mandatory for Listed Cos, companies accepting public deposits, and companies with borrowings from banks/PFIs &gt; Rs. 50 Cr. Stakeholders Relationship Committee (SRC) [Sec 178(5)]: Mandatory if &gt; 1,000 security holders at any time during the FY (chaired by NED).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Board Powers, Restrictions, Contributions, Loans & RPTs (Sec 179–193)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Restrictions on Powers of Board [Sec 180] (Private Cos Exempt):</strong> Special Resolution required to: (a) Sell, lease, or dispose of whole/substantially whole of undertaking (Undertaking = investment &gt; 20% of Net Worth OR generates &ge; 20% of Total Income; Substantially the whole = &ge; 20% of value of undertaking); (b) Invest merger compensation (except in trust securities); (c) Borrow money where proposed + existing long-term borrowings (excluding temporary loans repayable on demand/within 6 months) exceed [Paid-up Share Capital + Free Reserves + Securities Premium]; (d) Remit or give time for repayment of any debt due from a director.</li>
              <li><strong>Contributions [Sec 181–183]:</strong> Bona fide Charitable Funds [Sec 181]: Prior Ordinary Resolution required if aggregate contribution in a FY exceeds 5% of average net profits of 3 immediately preceding FYs. Political Contributions [Sec 182]: Government companies and companies in existence for &lt; 3 FYs are completely barred; other companies may contribute any amount via resolution passed at a Board Meeting (no circular resolution) and strictly via non-cash mode (a/c payee cheque, bank draft, ECS, or electoral scheme). National Defence Fund [Sec 183]: No monetary limit; approved by Board or person/committee authorised.</li>
              <li><strong>Loans to Directors [Sec 185], Inter-Corporate Loans [Sec 186] & RPTs [Sec 188]:</strong> Sec 185(1) prohibits loans/guarantees/security to a director of the company or its holding company, or his partner/relative, or a firm in which he/relative is partner. Sec 185(2) permits loan/guarantee/security to an entity in which director is interested ONLY via Special Resolution AND if utilized by borrowing company for its principal business activities (Exemptions u/s 185(3): MD/WTD service condition or employee scheme via SR, ordinary course lending at &ge; RBI bank rate, or Holding Co to WOS / guarantee for subsidiary's bank loan utilized for principal business). Sec 186 requires unanimous Board resolution for all loans/investments, G-Sec yield floor for interest, and prior Special Resolution if exceeding Higher of 60% of [PSC + FR + SP] OR 100% of [FR + SP]. Related Party Transactions u/s 188 require Board + Ordinary Resolution (above Rule 15 limits) unless entered into in the ordinary course of business AND on an arm's length basis.</li>
            </ul>
          </div>
        )}

        {chapterId === 104 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Inspection, Inquiry, Search & Seizure by Registrar / Inspector (Sec 206–209)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Call for Information, Inspection & Inquiry [Sec 206–208]:</strong> RoC may by written notice call for information/explanation or production of documents (past officers must also furnish information to the best of their knowledge). If business is carried on for a fraudulent/unlawful purpose or grievances of investors are not being addressed, RoC conducts inquiry u/s 206(4); Central Govt or RD may also direct inspection. Conviction of a director or officer u/s 207(4) results in automatic vacation of office from the date of conviction AND disqualification from holding office in any company.</li>
              <li><strong>Search and Seizure [Sec 209]:</strong> Where RoC or Inspector has reasonable ground to believe books and papers relating to the company/KMP/director/auditor/CS are likely to be destroyed, mutilated, altered, falsified, or secreted, he may enter, search, and seize them ONLY after obtaining an order from the Special Court. Seized books can be retained for a maximum of 180 days, and may be called again for a further period of 180 days by an order in writing.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Central Govt Investigation, SFIO, NCLT Investigation, Employee Protection & Asset Freeze (Sec 210–229)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Central Government Investigation [Sec 210] vs. SFIO [Sec 211–212]:</strong> CG may order investigation (Discretionary) on: (a) RoC/Inspector report u/s 208; (b) Special Resolution passed by company; or (c) In public interest. CG SHALL order investigation (Mandatory) when directed by an order of a Court or the Tribunal (NCLT). Once CG assigns a case to the Serious Fraud Investigation Office (SFIO) u/s 212, no other investigating agency of CG/SG can proceed with investigation under this Act and must transfer all relevant records to SFIO. Offences u/s 447 are cognizable and non-bailable subject to twin bail conditions (Exempt from twin conditions: person aged &lt; 16 years, woman, or sick/infirm person).</li>
              <li><strong>Investigation by Tribunal [Sec 213] & Related Companies [Sec 219]:</strong> Application to NCLT u/s 213 by &ge; 100 members OR members holding &ge; 1/10th of total voting power (or &ge; 1/5th of members if no share capital), OR by any other person showing circumstances suggesting fraud, unlawful purpose, oppression, or misconduct. With prior approval of CG, an Inspector can also investigate related bodies corporate (subsidiary/holding/common MD/Manager) u/s 219.</li>
              <li><strong>Protection of Employees [Sec 218] & Freezing of Assets / Securities [Sec 221–222]:</strong> During pendency of investigation (under Sec 210, 212, 213, or 219) or proceeding under Chapter XVI (Oppression & Mismanagement), company cannot discharge, dismiss, suspend, or punish any employee without applying to NCLT; if NCLT raises no objection within 30 days, company may proceed (Appeal to NCLAT lies within 30 days). NCLT may freeze transfer/removal of funds/assets [Sec 221] or impose restrictions on securities [Sec 222] for a period not exceeding 3 years.</li>
            </ul>
          </div>
        )}

        {chapterId === 105 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Scheme of Compromise, Arrangement, Merger & Amalgamation (Sec 230–232)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Application, Disclosures & Meeting Dispensation [Sec 230(1)–(9)]:</strong> Application to NCLT by company, creditor, member, or Liquidator (if in winding up), accompanied by affidavit disclosing material facts, reduction of capital, corporate debt restructuring (CDR consented by &ge; 75% secured creditors in value), valuation report, and Auditor's certificate on compliance with Sec 133 Accounting Standards. NCLT may dispense with calling a meeting of creditors if creditors holding &ge; 90% in value agree and confirm by way of affidavit [Sec 230(9)].</li>
              <li><strong>Statutory Approval Majority [Sec 230(6)], Objections [Sec 230(4)] & Regulatory Notice [Sec 230(5)]:</strong> Scheme must be approved by a majority in number (&gt; 50%) representing 3/4th (&ge; 75%) in value of the creditors/class of creditors or members/class of members present and voting (in person, by proxy, or by postal ballot). Objection locus standi [Sec 230(4)]: Only persons holding &ge; 10% of shareholding OR having outstanding debt &ge; 5% of total debt as per latest audited financials. Notice u/s 230(5) gives regulatory authorities (CG, RBI, SEBI, IT, RoC, OL, CCI) 30 days to make representations.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Fast-Track Merger, Cross-Border Merger, Dissenting Squeeze-Out & Public Interest (Sec 233–240)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Fast-Track Merger [Sec 233]:</strong> Applicable to mergers between: (i) Two or more Small Companies; (ii) A Holding Company and its Wholly-Owned Subsidiary (WOS); or (iii) Two or more Start-up companies (or Start-up with Small Company). Requires Declaration of Solvency (Form CAA-10) + approval by members holding &ge; 90% of TOTAL number of shares + approval by majority representing &ge; 9/10th (90%) in value of TOTAL creditors. Registered by Regional Director (if RD considers scheme not in public/creditors' interest, RD must apply to NCLT within 60 days).</li>
              <li><strong>Cross-Border Merger [Sec 234] & Dissenting/Minority Squeeze-Out [Sec 235–236]:</strong> Inbound and Outbound mergers with foreign companies in notified jurisdictions require prior approval of RBI (deemed approved if complied with FEMA Cross-Border Merger Regulations, 2018). Under Sec 235, if transfer offer is approved within 4 months by holders of &ge; 9/10th (90%) in value of shares (excluding shares already held by transferee/nominee/subsidiary), transferee may give notice within next 2 months to acquire dissenting shares (dissenting holder has 1 month to apply to NCLT). Under Sec 236, when acquirer/PAC holds &ge; 90% of issued equity capital, minority shares are valued by Registered Valuer and proceeds disbursed within 60 days.</li>
              <li><strong>Public Interest Amalgamation [Sec 237] & Books Preservation [Sec 239]:</strong> Central Govt may by order in Official Gazette order amalgamation of two or more companies in public interest (Appeal to NCLT within 30 days of publication). Books and papers of an amalgamated/transferor company cannot be disposed of without prior permission of Central Government [Sec 239]. Past officers remain liable for offences committed prior to merger [Sec 240].</li>
            </ul>
          </div>
        )}

        {chapterId === 106 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Relief against Oppression & Mismanagement and Locus Standi (Sec 241–244)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Statutory Grounds [Sec 241(1) & (2)]:</strong> (a) Affairs of the company are being conducted in a manner prejudicial to public interest OR oppressive to any member(s) OR prejudicial to the interests of the company; OR (b) Material change has taken place in management or control (alteration in Board, manager, or ownership of shares/membership, not being a change brought about by or in the interests of any creditors) and by reason of such change, it is likely that affairs will be conducted prejudicially. Central Govt may also apply u/s 241(2) or refer conduct of managerial personnel u/s 241(3).</li>
              <li><strong>Eligibility Thresholds [Sec 244(1)]:</strong> (i) Company having Share Capital: Not less than 100 members OR not less than 1/10th (10%) of total number of members, whichever is LESS, OR any member(s) holding not less than 1/10th (10%) of issued share capital (provided all calls and other sums due on their shares have been paid). (ii) Company NOT having Share Capital: Not less than 1/5th (20%) of total number of members. Joint holders of shares are counted as ONE member.</li>
              <li><strong>NCLT Waiver & Maintainability Rules:</strong> Under Proviso to Sec 244(1), NCLT may waive all or any of the eligibility requirements in exceptional circumstances. Maintainability is tested on the date of filing the petition; subsequent transfer of shares or withdrawal of consent by some consenting members does not defeat the petition. Legal heirs/representatives of a deceased member whose name is still on the register of members have locus standi to file u/s 241 (Worldwide Agencies v. Margaret T. Desor).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Powers of NCLT, Agreement Termination Consequences & Class Action Suits (Sec 242, 243 & 245)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Powers of Tribunal [Sec 242] & 5-Year Disqualification Bar [Sec 243]:</strong> NCLT can regulate conduct of affairs, order buyout of shares (and consequent capital reduction), restrict transfer/allotment, remove MD/director/manager, recover undue gains, or set aside/modify agreements (fraudulent preference look-back = 3 months prior to application). Under Sec 243, where an agreement with MD/WTD/Manager/Director is terminated or set aside u/s 242, no compensation for loss of office is payable AND such person cannot serve as MD/Director/Manager of the company for 5 years without leave of NCLT.</li>
              <li><strong>Class Action Suits [Sec 245 & Rule 84]:</strong> Filed by members or depositors before NCLT seeking damages/compensation or restraining ultra vires/breach actions against the company, directors, auditors (audit firm AND individual partners jointly and severally), or experts/advisors. Member Threshold: Min(100 members, 5% of total members) OR holding &ge; 5% of issued share capital (Unlisted Co) / &ge; 2% of issued share capital (Listed Co). Depositor Threshold: Min(100 depositors, 5% of total depositors) OR owed &ge; 5% of total deposits. Banking companies are exempt [Sec 245(9)]. Frivolous application rejected with cost up to Rs. 1,00,000 [Sec 245(8)].</li>
            </ul>
          </div>
        )}

        {chapterId === 107 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Circumstances, Petitioners, NCLT Powers & Liquidator in Winding Up (Sec 270–290)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>5 Grounds for Winding Up by Tribunal [Sec 271]:</strong> (a) Special Resolution passed by company; (b) Acting against sovereignty & integrity of India, security of State, friendly foreign relations, public order, decency or morality; (c) On application by RoC or person authorised by CG, NCLT is of opinion that affairs have been conducted fraudulently or company was formed for fraudulent/unlawful purpose; (d) Default in filing financial statements OR annual returns with RoC for immediately preceding 5 consecutive financial years; (e) NCLT is of opinion that it is just and equitable that the company be wound up (Note: Inability to pay debts is governed under IBC, 2016).</li>
              <li><strong>Eligible Petitioners [Sec 272] & Timelines [Sec 273–274]:</strong> Petition may be presented by: (1) The Company (with Statement of Affairs); (2) Any Contributory (even if holding fully paid-up shares or no surplus assets, provided shares were originally allotted OR held & registered for &ge; 6 months during last 18 months OR inherited on death); (3) The Registrar (with previous sanction of CG); (4) Person authorised by CG; (5) CG or State Govt. NCLT passes order within 90 days of presentation [Sec 273(1)]. Statement of Affairs filed within 30 days (+ up to 30 days extension) [Sec 274].</li>
              <li><strong>Company Liquidator [Sec 275 & 281] & Advisory Committee [Sec 287]:</strong> Appointed from IBBI panel of Insolvency Professionals; files conflict-of-interest declaration within 7 days of appointment and submits preliminary report within 60 days of winding-up order. Advisory Committee has maximum 12 members (creditors & contributories) chaired by Company Liquidator.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Overriding Preferential Payments, Avoidance Look-Backs & Dissolution (Sec 326–356)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Overriding Preferential Payments [Sec 326] & Preferential Payments [Sec 327]:</strong> Sec 326 ranks FIRST in priority over all other debts: (a) Workmen's dues (wages/salary/accrued holiday/compensation/PF/pension/gratuity for up to 2 years preceding winding-up order, payable within 30 days of sale of assets); and (b) Debts due to secured creditors (to the extent of workmen's portion / unrealized security) — ranking pari passu. Immediately after Sec 326 come Sec 327 Preferential Payments: Govt taxes/revenues due within 12 months, employee wages/salary (other than workmen) for up to 4 months within preceding 12 months, accrued holiday remuneration, and ESI/Workmen's Compensation dues.</li>
              <li><strong>Avoidance Transactions & Look-Back Periods [Sec 328–333]:</strong> (i) Fraudulent Preference [Sec 328]: 6 months before presentation of winding-up application; (ii) Voluntary Transfer not in ordinary course of business or not in good faith [Sec 329]: 1 year before presentation of petition; (iii) Effect of Floating Charge [Sec 332]: Floating charge created within 12 months before commencement of winding up is invalid (unless company was solvent immediately after creation), except for cash actually paid at/after creation + interest @ 5% p.a.; (iv) Disclaimer of Onerous Property [Sec 333]: Within 12 months of commencement of winding up.</li>
              <li><strong>Dissolution [Sec 302] & Power to Declare Dissolution Void [Sec 356]:</strong> Liquidator sends copy of dissolution order to RoC within 30 days. NCLT may declare dissolution void on an application made by Company Liquidator or any other interested person within 2 years from the date of dissolution [Sec 356].</li>
            </ul>
          </div>
        )}

        {chapterId === 108 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Registered Valuer, Strike Off / Removal of Name & Restoration (Sec 247–252)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Registered Valuer [Sec 247 & Valuation Rules, 2017]:</strong> Appointed by Audit Committee or, in its absence, by the Board of Directors. Valuer shall NOT undertake valuation of any assets in which he has a direct or indirect interest at any time during 3 years prior to appointment OR 3 years after valuation is conducted. Authority (IBBI) grants registration certificate within 60 days of application (excluding up to 21 days given for additional documents). Foreign residents cannot act as Registered Valuers.</li>
              <li><strong>Strike Off by RoC [Sec 248(1)] & Voluntary Strike Off [Sec 248(2)–249]:</strong> RoC strike-off grounds: (a) Failure to commence business within 1 year of incorporation; (b) Not carrying on business for 2 immediately preceding FYs without applying for Dormant status u/s 455; (c) Subscribers not paying subscription within 180 days u/s 10A; (d) Physical verification shows no business. Voluntary application in Form STK-2 requires extinguishing all liabilities AND passing a Special Resolution (or consent of 75% members in paid-up capital), and is barred u/s 249 if in the preceding 3 months the company changed its name, shifted registered office to another State, or disposed of property/rights for value.</li>
              <li><strong>Appeal & Restoration by NCLT [Sec 252]:</strong> (1) Aggrieved person (or RoC if struck off on incorrect info) may appeal to NCLT within 3 years from the date of RoC's order [Sec 252(1)]; (2) The company, or any member, creditor, or workman aggrieved may apply to NCLT before the expiry of 20 years from publication in the Official Gazette [Sec 252(3)].</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Government Companies, Nidhi Companies, Section 447 Fraud & Dormant Companies (Sec 394–455)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Government Companies [Sec 2(45) & Sec 394–395]:</strong> Company in which &ge; 51% of paid-up share capital (or 'total voting power' where DVR shares are issued) is held by Central Govt, State Govt(s), or partly by CG and SG(s), including a subsidiary of a Government company. Annual Report prepared within 3 months of AGM where C&AG audit report is placed and laid before both Houses of Parliament / State Legislature.</li>
              <li><strong>Nidhi Companies [Sec 406 & Nidhi Rules, 2014]:</strong> Public company with min Paid-up Equity Capital &ge; Rs. 10 Lakhs; applies in Form NDH-4 within 120 days of incorporation with &ge; 200 members and Net Owned Funds (NOF) &ge; Rs. 20 Lakhs; NOF to Deposits ratio &le; 1:20; Unencumbered term deposits &ge; 10% of outstanding deposits; max interest rate on loans = 7.5% above highest deposit rate; max dividend = 25%; locker rent income &le; 20% of gross income; Director max consecutive tenure = 10 years (+ 2-year cooling-off). Cannot issue preference shares/debentures, open current accounts, or admit bodies corporate/trusts as members.</li>
              <li><strong>Punishment for Fraud [Sec 447] & Dormant Company [Sec 455]:</strong> Fraud involving &ge; Min(Rs. 10 Lakh, 1% of Turnover): Imprisonment 6 months to 10 years (min 3 years if public interest) AND Fine 1x to 3x of fraud amount. Fraud &lt; Min(Rs. 10 Lakh, 1% of Turnover) without public interest: Imprisonment up to 5 years OR Fine up to Rs. 50 Lakh OR both. Dormant Company u/s 455: Inactive company (no business/significant accounting transaction/filing for last 2 FYs) applies in Form MSC-1 via SR or 3/4th shareholders in value; min directors = 3 (Public), 2 (Private), 1 (OPC); files Form MSC-3 within 30 days of FY end; max dormant tenure = 5 consecutive years.</li>
            </ul>
          </div>
        )}

        {chapterId === 109 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. NCLT & NCLAT Tenure, Rectification, Appeals & Special Courts (Sec 407–439)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>NCLT & NCLAT Term and Age Limits [Sec 413]:</strong> Term = 5 years (eligible for re-appointment for another 5 years); Minimum appointment age = 50 years. Max retirement age: NCLT President = 67 years, NCLT Member = 65 years; NCLAT Chairperson = 70 years, NCLAT Member = 67 years. Expeditious disposal target [Sec 422]: Within 3 months (+ up to 90 days extension).</li>
              <li><strong>Rectification of Orders [Sec 420(2)] & Appellate Timelines [Sec 421 & 423]:</strong> NCLT may within 2 years from the date of order rectify any mistake apparent from the record (provided no appeal has been preferred). Appeal from NCLT to NCLAT [Sec 421]: Within 45 days of receipt of order (+ up to 45 days extension on sufficient cause; no appeal lies from a consent order). Appeal from NCLAT to Supreme Court on a question of law [Sec 423]: Within 60 days of receipt of order (+ up to 60 days extension).</li>
              <li><strong>Special Courts [Sec 435–436] & Non-Cognizable Offences [Sec 439]:</strong> Special Court consists of: (a) Sessions Judge or Additional Sessions Judge for offences punishable with imprisonment of 2 years or more; and (b) Metropolitan Magistrate or JMFC for all other offences. Summary Trial [Sec 436(2)]: Permitted for offences punishable with fine only or imprisonment not exceeding 3 years (maximum sentence of imprisonment in summary trial = 1 year). Under Sec 439, every offence under the Act EXCEPT Sec 212(6) (Sec 447 Fraud) is non-cognizable (cognizance only on written complaint of RoC, shareholder/member, or person authorised by CG/SEBI).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Compounding, Mediation, Lesser Penalties & Adjudication of Penalties (Sec 441–454A)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Compounding of Offences [Sec 441] & Mediation Panel [Sec 442]:</strong> Offences punishable with fine only, imprisonment OR fine, or imprisonment or fine or both are compoundable by: (i) Regional Director / CG officer (where maximum fine &le; Rs. 25,00,000); or (ii) NCLT (where maximum fine &gt; Rs. 25,00,000). Non-Compoundable: Offences punishable with Imprisonment ONLY, or with Imprisonment AND Fine (mandatory imprisonment), or where investigation is pending, or where similar offence was compounded within preceding 3 years. Mediation & Conciliation Panel [Sec 442] must dispose of matter within 3 months.</li>
              <li><strong>Lesser Penalties [Sec 446B], Adjudication [Sec 454] & Repeated Default [Sec 454A]:</strong> Under Sec 446B, if an OPC, Small Company, Start-up Company, or Producer Company defaults, the penalty shall not exceed 1/2 (50%) of the specified penalty, subject to a maximum cap of Rs. 2,00,000 (Company) and Rs. 1,00,000 (Officer in default). Under Sec 454(3) Proviso, if non-filing default u/s 92(4) or 137(1)/(2) is rectified prior to or within 30 days of RoC adjudication notice, NO penalty shall be imposed. Appeal against RoC adjudication order lies to Regional Director within 60 days (+30 days). Under Sec 454A, repeating the same default within 3 years of a prior penalty order attracts TWICE (2x) the normal penalty.</li>
            </ul>
          </div>
        )}

        {chapterId === 110 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. e-Filing Framework, MCA21 Version 3.0, Additional Fees & XBRL Rules (Sec 396–404)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Electronic Filing Mandate & Additional Fees [Sec 398–403]:</strong> Every valid electronic filing generates a unique Service Request Number (SRN) (sending forms like ADT-3 via email is invalid). Under Sec 403, delayed filing of Annual Return (Sec 92) or Financial Statement (Sec 137) attracts an additional fee of at least Rs. 100 per day of default; default on 2 or more occasions attracts a Higher Additional Fee of not less than TWICE (2x) the normal additional fee.</li>
              <li><strong>MCA21 Version 3.0 Five Modules:</strong> (1) e-Scrutiny (Central Scrutiny Cell scrutinising Straight Through Process forms), (2) e-Adjudication (online RoC/RD adjudication hearings), (3) e-Consultation (AI sentiment analysis on public comments), (4) Compliance Management System — CMS (automated rule-based show-cause notices), and (5) MCA Lab.</li>
              <li><strong>Mandatory XBRL Filing [Rule 3 of XBRL Rules, 2015]:</strong> Applies in Form AOC-4 XBRL to: (i) Listed companies in India and their Indian subsidiaries; (ii) Companies with Paid-up Capital &ge; Rs. 5 Crore; (iii) Companies with Turnover &ge; Rs. 100 Crore; or (iv) All companies required to prepare financial statements under Ind AS Rules. Once covered, XBRL continues to apply forever. Exempt Sectors: Banking, Insurance, Housing Finance Companies (HFCs), and NBFCs.</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Corporate & Audit Ethics, NFRA Action & Rule 9A Dematerialisation</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>ICAI Code of Ethics — 5 Fundamental Principles & 5 Threats:</strong> Fundamental Principles: Integrity, Objectivity, Professional Competence & Due Care, Confidentiality, and Professional Behaviour. Threats to Independence: Self-Interest, Self-Review, Advocacy, Familiarity, and Intimidation.</li>
              <li><strong>NFRA Disciplinary Jurisdiction [Sec 132(4)] & SA 550 Related Party Audits:</strong> NFRA holds exclusive jurisdiction over listed companies and large unlisted public companies; penalty for proven misconduct is Rs. 1 Lakh to 5x fees (Individual CA) and Rs. 5 Lakhs to 10x fees (Audit Firm) + debarment from audit/internal audit/Sec 247 valuation for 6 months to 10 years. Failing to verify arm's length documentation for related-party sales or inter-corporate loan diversions u/s 186 constitutes gross negligence under Second Schedule Part I Clauses (5)–(8).</li>
              <li><strong>Unlisted Public Company Dematerialisation [Rule 9A]:</strong> Every unlisted public company (including a private company that is a subsidiary of a public company — Deemed Public Co u/s 2(71)) must issue/transfer securities only in dematerialised form, ensure 100% of promoter/director/KMP holdings are dematerialised prior to any issue/buyback/bonus/rights offer, and file Form PAS-6 within 60 days of each half-year end. Exempt under Rule 9A(11): Nidhi Company, Government Company, and Wholly Owned Subsidiary (WOS).</li>
            </ul>
          </div>
        )}

        {chapterId === 111 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. SEBI Act, 1992, SEBI (LODR) Regulations, 2015 & SEBI (ICDR) Regulations, 2018</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>SEBI Act Penalties & Appeals [Sec 15A–15Z]:</strong> Insider Trading [Sec 15G] and Fraudulent & Unfair Trade Practices [Sec 15HA]: Penalty from Rs. 10 Lakhs to Rs. 25 Crore OR 3 times the amount of profits made, whichever is HIGHER. Residual penalty [Sec 15HB]: Rs. 1 Lakh to Rs. 1 Crore. Appeal to SAT [Sec 15T]: Within 45 days; Appeal from SAT to Supreme Court on a question of law [Sec 15Z]: Within 60 days (+60 days).</li>
              <li><strong>SEBI (LODR) Regulations, 2015 [Reg 17–33]:</strong> Board [Reg 17]: &ge; 50% NEDs; &ge; 1 Woman Director (Independent Woman Director for top 1000 listed); IDs &ge; 1/3rd (if non-executive non-promoter Chair) or &ge; 50% (if executive or promoter/related Chair); min 6 directors for top 2000 listed; Quorum = Max(3, 1/3rd) including &ge; 1 ID; max age 75 for NED unless SR passed. Audit Committee [Reg 18]: Min 3 directors, &ge; 2/3rd IDs, chaired by ID; meets &ge; 4 times/year (max gap 120 days), quorum = Max(2, 1/3rd) with &ge; 2 IDs. Material RPT [Reg 23]: Exceeds Lower of Rs. 1,000 Crore OR 10% of annual consolidated turnover. Financial Results [Reg 33]: Quarterly within 45 days; Annual within 60 days.</li>
              <li><strong>SEBI (ICDR) Regulations, 2018 [Reg 6, 14 & 16]:</strong> Main Board IPO Eligibility [Reg 6(1)]: Net Tangible Assets &ge; Rs. 3 Cr in each of last 3 years (&le; 50% in monetary assets), Average Operating Profit &ge; Rs. 15 Cr during last 3 years (with profit in each year), Net Worth &ge; Rs. 1 Cr in each of last 3 years, and &ge; 50% revenue from new-name activity if name changed in last 1 year. If Reg 6(1) not met, Reg 6(2) requires Book-Built IPO with &ge; 75% net offer allotted to QIBs. General Corporate Purposes cap &le; 25% of issue size. Minimum Promoters' Contribution (MPC) &ge; 20% of post-issue capital, locked in for 18 months (3 years if majority for CapEx); excess holding locked in for 6 months (1 year if CapEx).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. SEBI (SAST) Regulations, 2011 & SEBI (PIT) Regulations, 2015</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>SEBI (SAST) Open Offer Triggers & Size [Reg 3, 4, 6 & 7]:</strong> (1) Initial Trigger [Reg 3(1)]: Acquirer + PACs acquiring shares/voting rights entitling them to exercise &ge; 25% voting rights in Target Co; (2) Creeping Acquisition [Reg 3(2)]: Acquirer + PACs holding 25% to &lt; 75% acquiring &gt; 5% additional gross voting rights in any financial year (gross acquisitions counted without netting sales); (3) Acquisition of Control [Reg 4]. Mandatory Open Offer Size [Reg 7(1)]: At least 26% of total shares of Target Co (Voluntary Open Offer u/r 6 requires min 10% offer size for shareholders holding &ge; 25%).</li>
              <li><strong>SEBI (PIT) Regulations, 2015 [Reg 3, 5, 7 & Schedule B]:</strong> Sharing of UPSI prohibited except for legitimate purpose (recorded in Structured Digital Database preserved for &ge; 8 years) or open-offer/due-diligence obligations [Reg 3]. Trading Plan [Reg 5]: Cool-off period of 120 calendar days (6 months) from public disclosure, min 12 months coverage, barred during trading window closure, and irrevocable once approved. Trading Window closed from end of every quarter till 48 hours after declaration of financial results. Contra-trade bar for designated persons = 6 months. Continual Disclosure [Reg 7(2)]: Within 2 trading days if traded value exceeds Rs. 10 Lakhs in a calendar quarter.</li>
            </ul>
          </div>
        )}

        {chapterId === 112 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Residential Status & Current Account Transactions (Sec 2(v), Sec 5 & Schedules I–III)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Person Resident in India — PRII [Sec 2(v)]:</strong> Resided in India for &gt; 182 days during the PRECEDING financial year, BUT excludes any person who leaves India for employment, business/vocation, or uncertain stay abroad (becomes PROI from the day of departure), and includes any person who comes to India for employment, business/vocation, or uncertain stay in India. Any body corporate registered/incorporated in India or branch/office in India controlled by a PROI is a PRII. Citizenship is irrelevant under FEMA.</li>
              <li><strong>Schedule I (Prohibited) & Schedule II (Prior CG Ministry Approval):</strong> Schedule I completely bars remittance of lottery winnings, racing/riding income, purchase of lottery tickets/banned magazines/football pools, call-back services, and export commission towards equity investment in JV/WOS abroad (or under Rupee State Credit Route except up to 10% for tea & tobacco). Schedule II requires prior approval of the concerned Central Govt Ministry (e.g., cultural tours, PSU foreign print ads &gt; USD 10,000, sports prize money/sponsorship &gt; USD 100,000 to non-international/national/state bodies).</li>
              <li><strong>Schedule III — LRS for Individuals & Corporate Remittance Ceilings (Prior RBI Approval above limits):</strong> Resident individuals (including minors) can remit up to USD 250,000 per FY under the Liberalised Remittance Scheme (LRS) for all permitted current and capital account transactions combined (medical treatment, studies abroad, and emigration allowed above USD 250,000 if supported by official estimate). Corporate Schedule III limits: (a) Donations &le; Min(1% of 3-yr FX earnings, USD 5,000,000); (b) Flat/plot sale agent commission &le; Max(USD 25,000, 5% of inward remittance); (c) Consultancy services &le; USD 10,000,000/project (infrastructure) or &le; USD 1,000,000/project (others); (d) Pre-incorporation expenses &le; Max(5% of investment brought in, USD 100,000).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Capital Account, ECB, Exports, Surrender, Penalties & Appeals (Sec 6–38)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Capital Account [Sec 6], ECB, Export Realisation [Sec 7] & Surrender of FX:</strong> Under Sec 6(4), a PRII can continue to hold/invest in foreign currency, foreign security, or foreign immovable property if acquired while he was a PROI or inherited from a PROI. External Commercial Borrowings (ECB): Up to USD 750 Million per FY under Automatic Route; standard Minimum Average Maturity Period (MAMP) = 3 years (1 year for manufacturing companies up to USD 50M/FY; 5 years from foreign equity holder for working capital/general corporate/repayment of Rupee loans; 7 years for repayment of other Rupee capex loans; 10 years for working capital/general corporate Rupee loans). Export proceeds must be realized within 9 months of export (15 months for overseas warehouse). Unused travel FX must be surrendered within 180 days of return (can retain up to USD 2,000 in notes/TCs and unlimited coins).</li>
              <li><strong>Penalties [Sec 13], Enforcement [Sec 14], Compounding [Sec 15] & Appeals [Sec 17, 19 & 35]:</strong> Penalty u/s 13(1): Up to 3x the sum involved (if quantifiable) or up to Rs. 2,00,000 (if not quantifiable) + up to Rs. 5,000/day for continuing default. Holding foreign assets in contravention of Sec 4 exceeding Rs. 1 Crore attracts seizure of equivalent Indian value + imprisonment up to 5 years [Sec 13(1A)–(1C)]. Civil imprisonment u/s 14 triggers if penalty remains unpaid for &gt; 90 days (up to 6 months if demand &le; Rs. 1 Cr; up to 3 years if demand &gt; Rs. 1 Cr). Compounding u/s 15 within 180 days. Appeal to Special Director (Appeals) / Appellate Tribunal within 45 days; Appeal to High Court on question of law within 60 days (+ max 60 days extension).</li>
            </ul>
          </div>
        )}

        {chapterId === 113 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Foreign Contribution Scope, Prohibited Persons, Relative Gifts & Hospitality (Sec 2–6)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Foreign Contribution Definition & Exclusions [Sec 2(1)(h) & Sec 4]:</strong> Includes delivery, transfer, oritus of any article (EXCEPT personal gifts of market value in India &le; Rs. 1,00,000), currency (whether Indian or foreign), or security by a foreign source, plus any interest or income accrued thereon. Commercial receipts by way of fee/cost in ordinary course of international business, trade, or commerce (or fees paid by foreign students/delegates) are excluded u/s 4.</li>
              <li><strong>Persons Prohibited from Accepting Foreign Contribution [Sec 3]:</strong> Election candidates, correspondents/columnists/cartoonists/editors/owners/printers/publishers of registered newspapers, Public Servants, Judges, Government servants, employees of Government-controlled corporations, members of any Legislature, Political Parties and their office-bearers, and organizations of a political nature (also covers broadcast/electronic media producing current affairs programmes).</li>
              <li><strong>Gifts from Relative [Sec 4(e) & Rule 6] & Foreign Hospitality [Sec 6]:</strong> Any citizen receiving foreign contribution from a relative exceeding Rs. 10,00,000 (Rs. 10 Lakhs) in a financial year must inform Central Government in Form FC-1 within 3 months from date of receipt. Under Sec 6, Legislators, Political Party office-bearers, Judges, Government servants, and PSU employees cannot accept Foreign Hospitality (non-casual travel/boarding/lodging/medical cost abroad) without prior MHA permission (application &ge; 2 weeks in advance; exempt for emergent medical aid, which must be reported within 1 month if value &gt; Rs. 1,00,000).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Transfer Prohibition, Admin Cap, SBI FCRA Account & Registration Lifecycle (Sec 7–17)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>100% Prohibition on Transfer [Sec 7] & 20% Administrative Expense Cap [Sec 8(1)(b)]:</strong> Under Sec 7, no person who is registered and granted a certificate or prior permission under FCRA shall transfer such foreign contribution to ANY other person (even if the other person holds valid FCRA registration). Under Sec 8(1)(b), foreign contribution cannot be used for speculative business, and administrative expenses cannot exceed 20% of foreign contribution received in that financial year without prior Central Government approval.</li>
              <li><strong>Mandatory Designated 'FCRA Account' [Sec 17]:</strong> Every registered/prior-permission recipient must receive all foreign contributions EXCLUSIVELY in a single designated 'FCRA Account' opened at the State Bank of India (SBI), New Delhi Main Branch (11, Sansad Marg); one or more additional FCRA utilization accounts may be opened in any scheduled bank for utilization.</li>
              <li><strong>Registration, Prior Permission, Suspension, Cancellation & Renewal [Sec 11–16]:</strong> Regular Registration [Sec 12] requires 3 years' active existence and &ge; Rs. 15,00,000 spent on core activities during the last 3 FYs (excluding admin expenses); Prior Permission is granted to newly formed associations for a specific project and specific donor. Certificate is granted/rejected within 90 days and is valid for 5 years (renewal application filed within 6 months before expiry u/s 16). Suspension [Sec 13]: Up to 180 days (+ extendable by up to 180 days; up to 25% of unutilized funds spendable with prior CG approval). Cancellation [Sec 14]: Triggers a 3-year cooling-off bar on re-registration or prior permission.</li>
            </ul>
          </div>
        )}

        {chapterId === 114 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900">1. Applicability, Default Threshold, CIRP Initiation & Moratorium (Sec 4–15)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>Default Threshold [Sec 4] & Financial Service Providers [Sec 227]:</strong> Minimum default for initiating CIRP is Rs. 1 Crore (Rs. 10 Lakhs for Pre-Packaged Insolvency Resolution Process — PPIRP for corporate MSMEs u/s 54A). IBC does not apply to Financial Service Providers (Banks, Insurance) unless notified u/s 227 (NBFCs/HFCs with asset size &ge; Rs. 500 Crore are notified with RBI as Appropriate Regulator).</li>
              <li><strong>Initiation by FC [Sec 7], OC [Sec 8–9], Corporate Applicant [Sec 10] & Sec 11 Bar:</strong> Financial Creditor files u/s 7 (for real estate allottees or class creditors, joint application requires lower of 100 creditors or 10% of total creditors in the same class/project). Operational Creditor serves a 10-day Demand Notice u/s 8(1); if unpaid and no pre-existing dispute (suit/arbitration filed BEFORE receipt of demand notice) is notified within 10 days, OC files u/s 9. Corporate Applicant files u/s 10 after Special Resolution (or 3/4th partners). Under Sec 11, a CD undergoing CIRP/PPIRP, or having completed CIRP within the preceding 12 months, or against whom a liquidation order has been made, is barred from initiating CIRP.</li>
              <li><strong>CIRP Timelines [Sec 12], Withdrawal [Sec 12A] & Moratorium [Sec 14]:</strong> Standard CIRP period = 180 days from Insolvency Commencement Date (date of admission) + one-time extension up to 90 days (on 66% CoC vote) &le; 330 days mandatory outer limit including legal proceedings. Admitted application can be withdrawn u/s 12A with 90% CoC voting share. Moratorium u/s 14 prohibits suits, asset transfers, SARFAESI enforcement, and property recovery by lessors (Essential supplies cannot be terminated if current moratorium dues are paid; Moratorium does NOT apply to a surety/guarantor in a contract of guarantee to a Corporate Debtor).</li>
            </ul>
            <h5 className="font-bold text-slate-900 pt-1">2. Committee of Creditors (CoC), Sec 29A Ineligibility, Resolution Plan & Waterfall (Sec 16–54P)</h5>
            <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
              <li><strong>CoC Constitution & Voting Matrix [Sec 21, 22, 27, 28, 30 & 33]:</strong> CoC comprises all Financial Creditors EXCLUDING related parties of the CD (conversion of debt to equity prior to insolvency commencement date removes related-party bar only if not done to circumvent the proviso; if no FCs or all FCs are related, CoC comprises 18 largest OCs by value + 1 workmen rep + 1 employee rep). First CoC meeting within 7 days of constitution. CoC Voting Thresholds: 51% for routine decisions; 66% for appointing/replacing RP (Sec 22/27), 90-day extension (Sec 12), Sec 28 listed actions, approving Resolution Plan (Sec 30(4)), and initiating Liquidation (Sec 33(2)); 90% for Sec 12A withdrawal.</li>
              <li><strong>Section 29A Ineligibility & Resolution Plan [Sec 29A–31]:</strong> Bars undischarged insolvents, wilful defaulters, persons holding NPA accounts for &ge; 1 year (unless overdue amounts + interest are paid before submitting plan), persons convicted for &ge; 2 years (12th Schedule Acts) or &ge; 7 years (other laws), disqualified directors, SEBI-debarred persons, promoters of CD with avoidance transaction orders, and invoked unpaid guarantors (and their connected persons) from submitting a resolution plan. Approved plan must pay CIRP costs in full priority and pay OCs and dissenting FCs at least their liquidation value u/s 53(1).</li>
              <li><strong>Section 53 Liquidation Waterfall & Avoidance Look-Back [Sec 43–54P]:</strong> Priority Order u/s 53: (1) CIRP & Liquidation costs in full; (2) Pari passu: Workmen's dues for 24 months + Secured creditors who relinquished security u/s 52; (3) Employee wages/dues (other than workmen) for 12 months; (4) Unsecured financial creditors; (5) Pari passu: Central/State Govt dues for preceding 2 years + Unpaid debt of secured creditor after security enforcement; (6) Remaining debts (including operational creditors); (7) Preference shareholders; (8) Equity shareholders. Preferential/Undervalued look-back: 2 years (Related Party) / 1 year (Unrelated Party). MSME Pre-Pack (PPIRP): Debtor-in-Possession model; requires prior approval of &ge; 66% unrelated FCs; plan within 90 days; total completion within 120 days.</li>
            </ul>
          </div>
        )}

      </div>,
      searchQuery
      )}
    </div>
  );
}
