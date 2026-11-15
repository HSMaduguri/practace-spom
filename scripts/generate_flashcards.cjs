const fs = require('fs');

const flashcards = [
  // ==========================================
  // CHAPTER 1: APPOINTMENT & QUALIFICATIONS OF DIRECTORS
  // ==========================================
  {
    id: "setA-fc-01",
    framework: "Section 149(1) & Rule 3: Woman Director Mandate & Thresholds",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "Which companies are statutorily required to appoint at least one Woman Director, and what is the legal timeline to fill an intermittent casual vacancy?",
    answer: [
      "Applicability Thresholds (Rule 3):",
      "• Every Listed Public Company: Mandatorily requires at least 1 Woman Director.",
      "• Every other Public Company having:",
      "  - Paid-up Share Capital >= Rs. 100 Crore; OR",
      "  - Turnover >= Rs. 300 Crore (as per latest audited financial statements).",
      "Intermittent Vacancy Timeline:",
      "• Must be filled by the Board at the earliest, but NOT LATER THAN:",
      "  - Immediate next Board Meeting; OR",
      "  - 3 months from the date of such vacancy, WHICHEVER IS LATER."
    ],
    examinerTrap: "Do not confuse the Woman Director threshold (Paid-up Capital >= 100 Cr OR Turnover >= 300 Cr) with the Independent Director threshold (Capital >= 10 Cr OR Turnover >= 100 Cr OR Borrowings > 50 Cr). Also remember the intermittent vacancy rule is 'whichever is LATER'.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-02",
    framework: "Section 149(4) & Rule 4: Independent Directors Applicability & Exemptions",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "What are the applicability thresholds for appointing at least 2 Independent Directors, and which classes of unlisted public companies are explicitly exempt?",
    answer: [
      "Applicability Thresholds (At least 2 Independent Directors):",
      "• Unlisted Public Companies fulfilling ANY of the following as per latest audited financials:",
      "  1. Paid-up Share Capital >= Rs. 10 Crore;",
      "  2. Turnover >= Rs. 100 Crore; OR",
      "  3. Outstanding Loans, Debentures & Deposits EXCEEDING Rs. 50 Crore.",
      "Statutory Exemptions (Rule 4 Proviso):",
      "• A Joint Venture (JV);",
      "• A Wholly Owned Subsidiary (WOS); and",
      "• A Dormant Company under Section 455."
    ],
    examinerTrap: "Borrowings must strictly EXCEED Rs. 50 Crore (> 50 Cr, not >= 50 Cr). If borrowings are exactly Rs. 50 Crore, the condition is NOT triggered. Furthermore, private companies and wholly owned subsidiaries are fully exempt.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-03",
    framework: "Section 149(6): Criteria of Independence & Pecuniary Limits",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "What are the core disqualifying relationships and pecuniary limits governing an Independent Director under Section 149(6)?",
    answer: [
      "Integrity & Expertise: In Board's opinion, a person of integrity possessing relevant expertise and experience.",
      "Promoter Disqualification: Is not, and was not, a promoter of the company, holding, subsidiary, or associate (HAS).",
      "Pecuniary Relationship (Self): No pecuniary relationship with HAS or promoters/directors, amounting to >= 10% of total income, during the current FY or 2 immediately preceding FYs (excluding director remuneration/sitting fees).",
      "Relatives' Financial Limits: Relative cannot hold security > 2% of paid-up capital, or be indebted > Rs. 50 Lakhs, or give guarantee > Rs. 50 Lakhs to HAS.",
      "Employment Bar: Neither self nor relative was an employee/KMP/auditor in HAS during any of the 3 preceding FYs (relative as non-KMP employee allowed)."
    ],
    examinerTrap: "Pecuniary relationship threshold for the candidate himself is strictly 10% of his total income (not the company's income). Directorship sitting fees are statutorily excluded from pecuniary relationships.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-04",
    framework: "Section 149(10) & 149(11): Independent Director Tenure & Cooling-Off Period",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "What is the maximum permissible tenure for an Independent Director, and what resolutions and cooling-off periods apply?",
    answer: [
      "First Term: Up to 5 consecutive years (Appointed by Ordinary Resolution).",
      "Second Term: Up to 5 consecutive years (Re-appointed by SPECIAL RESOLUTION + Board Report disclosure).",
      "Cumulative Cap: Maximum 2 consecutive terms (Total 10 years).",
      "Cooling-Off Period: Mandatorily 3 years after completing 2 terms before eligible for fresh appointment.",
      "Restrictions During Cooling Period: Must not be appointed in, or associated with, the company in ANY capacity (direct or indirect)."
    ],
    examinerTrap: "An Ordinary Resolution is sufficient ONLY for the first 5-year term. Re-appointment for the second consecutive term mandatorily requires a SPECIAL RESOLUTION. Failure to pass a Special Resolution renders the second-term appointment void ab initio.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-05",
    framework: "Section 151 & Rule 7: Small Shareholders' Director (SSD)",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "What are the eligibility, election conditions, and tenure restrictions for a Small Shareholders' Director (SSD)?",
    answer: [
      "Small Shareholder Definition: Holds shares of nominal (face) value NOT EXCEEDING Rs. 20,000.",
      "Requisition Threshold for Election:",
      "• Minimum 1,000 small shareholders; OR",
      "• 1/10th of the total number of small shareholders, WHICHEVER IS LOWER.",
      "Notice Period: At least 14 days' notice before meeting specifying candidate details, DIN, and non-disqualification.",
      "Tenure Restrictions:",
      "• Maximum tenure: Up to 3 consecutive years.",
      "• Non-renewable: Cannot be re-appointed upon expiry.",
      "• Cap: An SSD cannot hold office in more than 2 companies simultaneously (second company must not be in competing business)."
    ],
    examinerTrap: "The Rs. 20,000 threshold is based on NOMINAL (FACE) VALUE, never market value! A shareholder holding 1,000 shares of face value Rs. 10 (total face value Rs. 10,000) is a small shareholder even if market price is Rs. 5,000 per share.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-06",
    framework: "Section 161: Additional, Alternate, Nominee & Casual Vacancy Directors",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "Summarize the appointing authority, prerequisite, and tenure for the four classes of directors under Section 161.",
    answer: [
      "1. Additional Director [Sec 161(1)]:",
      "   • Authority: Articles must authorize Board. Cannot appoint person who failed election at GM.",
      "   • Tenure: Holds office up to date of next AGM or last date on which AGM should have been held.",
      "2. Alternate Director [Sec 161(2)]:",
      "   • Authority: Absence of original director from India for >= 3 months.",
      "   • Qualification: Cannot be alternate for another director in same company; must satisfy ID criteria if replacing ID.",
      "   • Tenure: Ceases when original director returns to India.",
      "3. Nominee Director [Sec 161(3)]: Appointed by Board per agreement, bank, or Central/State Govt.",
      "4. Casual Vacancy [Sec 161(4)]:",
      "   • Precondition: Vacancy of director appointed in GM before term expiry.",
      "   • Approval: Board meeting approval; subsequently approved by members in immediate next GM.",
      "   • Tenure: Unexpired period of the original director only."
    ],
    examinerTrap: "An Alternate Director is appointed for absence from INDIA (not just absence from Board meetings). If the original director returns to India even for a single day, the Alternate Director automatically vacates office.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-07",
    framework: "Section 164(1) & 164(2): Statutory Disqualifications for Directors",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "Distinguish personal disqualifications under Section 164(1) from corporate default disqualifications under Section 164(2).",
    answer: [
      "Personal Disqualifications [Sec 164(1)]:",
      "• (a) Unsound mind declared by competent court.",
      "• (b) Undischarged insolvent.",
      "• (c) Application for insolvency pending.",
      "• (d) Convicted of offence (moral turpitude or otherwise) with imprisonment >= 6 months (barred for 5 years from sentence expiry); OR >= 7 years (PERMANENT lifetime bar).",
      "• (e) Disqualification order passed by Court/NCLT in force.",
      "• (g) Connected party failure to pay share calls for 6 months.",
      "Corporate Default Disqualifications [Sec 164(2)] (Barred for 5 years):",
      "• Default A: Non-filing of Financial Statements OR Annual Returns for CONTINUOUS 3 FYs.",
      "• Default B: Failure to repay deposits, pay interest, redeem debentures, or pay declared dividend for >= 1 YEAR."
    ],
    examinerTrap: "Under Sec 164(2), a director appointed in a defaulting company gets a 6-month statutory grace period from date of appointment before disqualification hits. Conviction of >= 7 years is a PERMANENT lifetime disqualification, not 5 years.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-08",
    framework: "Section 165: Maximum Permissible Directorships",
    subtopic: "Corporate Laws - Directors (Chapter 1)",
    question: "What is the statutory ceiling on total directorships and public directorships that a person can hold simultaneously?",
    answer: [
      "Overall Ceiling: Maximum 20 companies simultaneously.",
      "Public Company Sub-Limit: Maximum 10 public companies.",
      "Inclusions in the 10 Public Companies Limit:",
      "• Alternate directorships in public companies count.",
      "• Private companies that are either holding or subsidiary of a public company count as public companies.",
      "Exclusions from the 20 Limit:",
      "• Dormant companies under Section 455.",
      "• Section 8 (non-profit) companies.",
      "Penalty for Contravention [Sec 165(6)]: Rs. 2,000 per day of default, subject to maximum of Rs. 2,00,000."
    ],
    examinerTrap: "A private company that is a subsidiary of a public company is deemed a public company under Sec 2(71), hence it counts toward BOTH the 20-company overall limit and the 10-public-company sub-limit.",
    difficulty: "Medium"
  },

  // ==========================================
  // CHAPTER 2: MEETINGS OF BOARD AND ITS POWERS
  // ==========================================
  {
    id: "setA-fc-09",
    framework: "Section 173: Board Meetings Frequency, Notice & Shorter Notice",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "What are the statutory mandates regarding the frequency of Board meetings, notice requirements, and conditions for shorter notice?",
    answer: [
      "Meeting Frequency Mandates:",
      "• First Board Meeting: Within 30 days of incorporation.",
      "• Regular Companies: Minimum 4 Board meetings every year; maximum gap between two consecutive meetings cannot exceed 120 days.",
      "• Small Company / OPC / Dormant: At least 1 meeting in each half of a calendar year; gap between two meetings must be >= 90 days.",
      "Notice Requirements:",
      "• Written notice to all directors at registered address at least 7 DAYS in advance by hand, post, or email.",
      "Shorter Notice Condition [Sec 173(3) Proviso]:",
      "• Permitted to transact urgent business provided at least ONE INDEPENDENT DIRECTOR is present.",
      "• If no Independent Director is present, decisions must be circulated and ratified by at least one Independent Director."
    ],
    examinerTrap: "The 120-day gap is measured between TWO CONSECUTIVE MEETINGS, not by dividing 365 by 4. If a company holds 4 meetings in Q1 and none for 150 days, it violates Section 173(1).",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-10",
    framework: "Section 174: Board Meeting Quorum Dynamics & Interested Directors",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "What constitutes a valid quorum for a Board Meeting, and how do interested directors impact the quorum calculation?",
    answer: [
      "Standard Quorum [Sec 174(1)]:",
      "• 1/3rd of the total strength of the Board (fraction rounded up to 1); OR",
      "• 2 Directors, WHICHEVER IS HIGHER.",
      "Participation: Physical presence or video conferencing (both count for quorum).",
      "Interested Directors Exclusion [Sec 174(3)]:",
      "• Interested directors do not count for quorum and cannot vote.",
      "• Exception Clause: If interested directors equal or exceed 2/3rd of total strength, the remaining disinterested directors (MINIMUM 2) form the quorum.",
      "Fall Below Minimum: If directors fall below statutory minimum, remaining directors can act ONLY to increase directors or summon a GM."
    ],
    examinerTrap: "Rounding rule under Section 174(1) for fraction is strictly UPWARD (e.g. 1/3rd of 7 = 2.33, rounded to 3 directors). But under Section 152(6) for rotational directors, 1/3rd is rounded to the NEAREST number.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-11",
    framework: "Section 177: Audit Committee Constitution, Duties & Vigil Mechanism",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "Which companies must constitute an Audit Committee, what is its composition, and who must establish a Vigil Mechanism?",
    answer: [
      "Applicability Thresholds:",
      "• Every Listed Public Company; AND",
      "• Unlisted Public Companies with Paid-up Capital >= Rs. 10 Cr, Turnover >= Rs. 100 Cr, or Borrowings > Rs. 50 Cr.",
      "Committee Composition [Sec 177(2)]:",
      "• Minimum 3 directors.",
      "• INDEPENDENT DIRECTORS MUST FORM A MAJORITY.",
      "• Majority of members (including Chairperson) must have ability to read and understand financial statements.",
      "Vigil Mechanism Applicability [Sec 177(9)]:",
      "• Every listed company;",
      "• Companies accepting deposits from the public; and",
      "• Companies having borrowings from banks/PFIs exceeding Rs. 50 Crore."
    ],
    examinerTrap: "Independent Directors must form a majority (> 50%) of the Audit Committee members, not merely 1/3rd! Also, the chairperson of the Audit Committee must be present at the AGM to answer shareholder queries.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-12",
    framework: "Section 180: Restrictions on Board Powers & Shareholder Approval",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "Which four corporate transactions require approval by Special Resolution in general meeting under Section 180?",
    answer: [
      "1. Sell, Lease or Dispose of Undertaking [Sec 180(1)(a)]:",
      "   • Undertaking = Investment > 20% of net worth OR generates > 20% of total income.",
      "2. Invest Compensation Received on Amalgamation/Merger in trust securities [Sec 180(1)(b)].",
      "3. Borrow Money in Excess of Limits [Sec 180(1)(c)]:",
      "   • Money to be borrowed + already borrowed (excluding temporary loans obtained from bankers in ordinary course) EXCEEDS Paid-up Share Capital + Free Reserves + Securities Premium.",
      "4. Remit or Give Time for Repayment of Debt Due from a Director [Sec 180(1)(d)].",
      "Note: Section 180 applies strictly to PUBLIC companies (private companies are fully exempt vide MCA notification)."
    ],
    examinerTrap: "Temporary loans from bankers (cash credit, overdraft, discounting bills <= 6 months) are EXCLUDED from Section 180(1)(c) calculations. But term loans for capital expenditure are NEVER temporary loans, even if duration is short.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-13",
    framework: "Section 184 & Section 188: Related Party Transactions (RPT) Thresholds",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "When is prior Ordinary Resolution required from shareholders for Related Party Transactions under Rule 15 of Meeting of Board Rules?",
    answer: [
      "Statutory Thresholds for Shareholder Prior Approval (Rule 15):",
      "• Sale, purchase or supply of goods/materials: >= 10% of annual turnover.",
      "• Selling or disposing of property of any kind: >= 10% of net worth.",
      "• Leasing of property of any kind: >= 10% of annual turnover.",
      "• Availing or rendering of any services: >= 10% of annual turnover.",
      "• Appointment to office or place of profit in company/subsidiary: Monthly remuneration exceeding Rs. 2.5 Lakhs.",
      "• Underwriting subscription of securities: Remuneration exceeding 1% of net worth.",
      "Exemption: Transactions entered into in the ORDINARY COURSE OF BUSINESS ON AN ARM'S LENGTH BASIS are completely exempt from Sec 188(1)."
    ],
    examinerTrap: "Arm's length transactions in ordinary course do NOT need Board or shareholder approval under Section 188! Furthermore, transactions between a holding company and its WHOLLY OWNED subsidiary are exempt from shareholder approval.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-14",
    framework: "Section 186: Loans, Guarantees, Security & Investments Matrix",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "What are the ceiling limits for corporate loans and investments under Section 186, and when is a Special Resolution mandatory?",
    answer: [
      "Ceiling Without Special Resolution [Sec 186(2)]:",
      "• Higher of:",
      "  - 60% of (Paid-up Capital + Free Reserves + Securities Premium); OR",
      "  - 100% of (Free Reserves + Securities Premium).",
      "Threshold Exceeded: Prior approval by SPECIAL RESOLUTION in general meeting.",
      "Mandatory Board Approval: UNANIMOUS consent of all directors present at Board meeting (regardless of amount).",
      "Prior PFI Approval: Required if term loan is subsisting AND default has occurred in repayment.",
      "Interest Rate Floor: Cannot be lower than prevailing yield of Govt security of equivalent maturity (1/3/5/10 yrs).",
      "Default Bar: Company in default of deposit repayment/interest cannot give loan/guarantee."
    ],
    examinerTrap: "Board approval must be UNANIMOUS (all directors present must vote in favor, circular resolution is void). But shareholder approval requires only a Special Resolution (75%).",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 3: APPOINTMENT & REMUNERATION OF MANAGERIAL PERSONNEL
  // ==========================================
  {
    id: "setA-fc-15",
    framework: "Section 196: Eligibility Conditions for Managing & Whole-Time Directors",
    subtopic: "Corporate Laws - Managerial Remuneration (Chapter 3)",
    question: "What are the statutory disqualifications and age limits governing appointment of Managing Directors, Whole-Time Directors, and Managers under Section 196?",
    answer: [
      "Maximum Tenure: Max 5 years at a time. No re-appointment earlier than 1 year before term expiry.",
      "Prohibition on Concurrent Offices: Cannot appoint both a Managing Director AND a Manager simultaneously.",
      "Age Thresholds [Sec 196(3)(a)]:",
      "• Minimum age: 21 years.",
      "• Maximum age: 70 years.",
      "• Exception: Person aged 70 or above can be appointed by passing a SPECIAL RESOLUTION with explanatory statement.",
      "Disqualifications [Sec 196(3)]:",
      "• Undischarged insolvent or adjudged insolvent.",
      "• Suspended or made composition with creditors.",
      "• Convicted by court of an offence and sentenced for imprisonment for a period of more than 6 months."
    ],
    examinerTrap: "Re-appointment can be made within 1 year before term expiry, NEVER earlier (e.g. re-appointing an MD after 3 years for another 5 years is invalid ab initio unless within the final 1 year).",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-16",
    framework: "Section 197(1): Overall Managerial Remuneration Percentage Matrix",
    subtopic: "Corporate Laws - Managerial Remuneration (Chapter 3)",
    question: "Detail the statutory percentages for managerial remuneration payable by a public company having adequate profits under Section 197.",
    answer: [
      "Overall Public Company Cap: 11% of Net Profits (calculated under Section 198) for all directors combined.",
      "Executive Directors Sub-Limits:",
      "• 1 Managing Director / Whole-Time Director / Manager: Max 5% of Net Profits.",
      "• More than one MD / WTD / Manager: Max 10% of Net Profits for all of them together.",
      "Non-Executive Directors (NEDs) Sub-Limits:",
      "• If company has an MD / WTD / Manager: Max 1% of Net Profits for all NEDs combined.",
      "• If company has NO MD / WTD / Manager: Max 3% of Net Profits for all NEDs combined.",
      "Exceeding Limits: Permissible on passing a SPECIAL RESOLUTION in general meeting."
    ],
    examinerTrap: "Sitting fees under Sec 197(5) (up to Rs. 1 Lakh per meeting) are EXCLUDED from the 11% / 5% / 1% caps! Sitting fees for women/independent directors cannot be lower than other directors.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-17",
    framework: "Schedule V (Part II, Section II): Remuneration in Case of Inadequate / Nil Profits",
    subtopic: "Corporate Laws - Managerial Remuneration (Chapter 3)",
    question: "What are the four Effective Capital tiers and annual remuneration ceilings under Schedule V for companies with nil or inadequate profits?",
    answer: [
      "Effective Capital Tier vs Annual Remuneration Cap (Per Person):",
      "1. Negative or < Rs. 5 Crore: Max Rs. 60 Lakhs per annum.",
      "2. Rs. 5 Crore to < Rs. 100 Crore: Max Rs. 84 Lakhs per annum.",
      "3. Rs. 100 Crore to < Rs. 250 Crore: Max Rs. 120 Lakhs per annum.",
      "4. Rs. 250 Crore and Above: Max Rs. 120 Lakhs + 0.01% of effective capital in excess of Rs. 250 Crore.",
      "Special Resolution Mechanism: Passing a Special Resolution DOUBLES all the above limits (e.g. Rs. 60L becomes Rs. 120L).",
      "No Central Government approval is required if Schedule V conditions and shareholder approvals are met."
    ],
    examinerTrap: "Effective capital excludes revaluation reserves and investments in other companies (unless investment company). Double limits require a Special Resolution passed by members.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-18",
    framework: "Section 203 & Rule 8 / 8A: Key Managerial Personnel (KMP) Mandate",
    subtopic: "Corporate Laws - Managerial Remuneration (Chapter 3)",
    question: "Which companies are statutorily required to appoint Whole-Time KMP, and what are the rules regarding Whole-Time Company Secretaries?",
    answer: [
      "Mandatory Full KMP Team [Sec 203 read with Rule 8]:",
      "• Applicability:",
      "  - Every Listed Company; AND",
      "  - Every Unlisted Public Company having Paid-up Share Capital >= Rs. 10 Crore.",
      "• Required Officers: (1) MD/CEO/Manager and in their absence WTD; (2) Company Secretary (CS); and (3) Chief Financial Officer (CFO).",
      "Rule 8A Company Secretary Mandate:",
      "• Every Private Company having Paid-up Share Capital >= Rs. 10 Crore must mandatorily appoint a Whole-Time Company Secretary.",
      "Intermittent Vacancy [Sec 203(4)]: Must be filled by the Board within 6 MONTHS from the date of vacancy."
    ],
    examinerTrap: "A Whole-time KMP cannot hold office in more than one company, except in its SUBSIDIARY company at the same time. The vacancy period is 6 MONTHS (not 3 months or next BM as in Independent Directors).",
    difficulty: "Medium"
  },

  // ==========================================
  // CHAPTER 4: INSPECTION, INQUIRY & INVESTIGATION
  // ==========================================
  {
    id: "setA-fc-19",
    framework: "Section 206: Power to Call for Information, Inspect Books & Conduct Inquiry",
    subtopic: "Corporate Laws - Inspection & Inquiry (Chapter 4)",
    question: "What are the escalating powers of the Registrar of Companies (RoC) to inspect books and call for explanations under Section 206?",
    answer: [
      "Stage 1 [Sec 206(1)]: Written notice calling for information/explanation on scrutiny of document filed.",
      "Stage 2 [Sec 206(3)]: If no information furnished or inadequate, RoC issues written order calling for books of account.",
      "Stage 3 [Sec 206(4)]: Inquiry conducted if business carried on for fraudulent/unlawful purpose or grievances not addressed.",
      "Stage 4 [Sec 206(5)]: Central Government may direct an inspector to carry out inspection of books of account.",
      "Penalties [Sec 206(7)]: Fine on company and officer in default up to Rs. 1,00,000 + Rs. 500 per day for continuing default."
    ],
    examinerTrap: "Before an inquiry is initiated under Section 206(4), the RoC MUST give the company a reasonable opportunity of being heard (audi alteram partem). Inquiry without hearing violates natural justice.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-20",
    framework: "Section 209: Search & Seizure Powers & Document Retention Periods",
    subtopic: "Corporate Laws - Inspection & Inquiry (Chapter 4)",
    question: "What procedure governs search and seizure of company records by an Inspector / RoC, and what is the maximum document retention period?",
    answer: [
      "Prerequisite: Reasonable ground to believe books/papers are likely to be destroyed, mutilated, altered, falsified or secreted.",
      "Judicial Warrant: RoC / Inspector MUST obtain prior order/warrant from the SPECIAL COURT.",
      "Seizure Powers: May enter and search place, seize books and papers deemed necessary.",
      "Retention Period Limits:",
      "• Initial period: Maximum 180 DAYS from the date of seizure.",
      "• Return: Must return books to company after 180 days, but can take copies/certified extracts.",
      "• Extension: Can call back books for another period not exceeding 180 DAYS if further required."
    ],
    examinerTrap: "An Inspector CANNOT search and seize on his own volition! He must obtain a prior order from the SPECIAL COURT (Magistrate), unlike Income Tax where tax authorities can authorize search internally.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-21",
    framework: "Section 210 vs Section 212: Central Govt Investigation vs SFIO Investigation",
    subtopic: "Corporate Laws - Inspection & Inquiry (Chapter 4)",
    question: "Differentiate the triggers for investigation under Section 210 from Serious Fraud Investigation Office (SFIO) investigation under Section 212.",
    answer: [
      "Investigation by Central Govt [Sec 210]:",
      "• Discretionary Triggers: (a) On report of RoC/inspector; (b) In public interest.",
      "• Mandatory Triggers: (a) On intimation of Special Resolution passed by company; (b) In satisfaction of Court/Tribunal order.",
      "Investigation by SFIO [Sec 212]:",
      "• Trigger: Central Govt forms opinion that investigation is necessary by SFIO due to complexity/public interest.",
      "• Exclusivity: Once matter is assigned to SFIO, NO OTHER investigating agency (CBI, Police, State Govt) can proceed with investigation.",
      "• Report: SFIO submits Interim Report if directed, and Final Investigation Report to Central Govt."
    ],
    examinerTrap: "Once SFIO takes over, all other state and central agency investigations into the same corporate offence are immediately stayed and records must be handed over to SFIO within a mandatory statutory window.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-22",
    framework: "Section 212(6): Twin Conditions for Bail in SFIO Prosecutions",
    subtopic: "Corporate Laws - Inspection & Inquiry (Chapter 4)",
    question: "What are the strict 'Twin Conditions' that must be satisfied before a court can grant bail to an accused in an SFIO investigation involving Section 447?",
    answer: [
      "Applicability: Any offence covered under Section 447 (Fraud) investigated by SFIO (cognizable offence).",
      "Twin Conditions for Bail [Sec 212(6)]:",
      "1. Condition 1: Public Prosecutor has been given an opportunity to oppose the application for bail.",
      "2. Condition 2: Where Public Prosecutor opposes, the Court is satisfied that:",
      "   - There are reasonable grounds for believing the accused is NOT GUILTY of the offence; AND",
      "   - He is NOT LIKELY TO COMMIT any offence while on bail.",
      "Statutory Exceptions (Court Discretion):",
      "• Person under age of 16 years; OR",
      "• A Woman; OR",
      "• Sick or infirm person."
    ],
    examinerTrap: "Twin conditions place the burden of proof on the accused to satisfy the Court of his innocence prima facie before bail can be granted. The conditions are conjunctive (both must be satisfied).",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 5: COMPROMISES, ARRANGEMENTS & AMALGAMATIONS
  // ==========================================
  {
    id: "setA-fc-23",
    framework: "Section 230(6): Scheme of Arrangement Approval Threshold",
    subtopic: "Corporate Laws - Mergers & Arrangements (Chapter 5)",
    question: "What dual voting majority is statutorily required under Section 230(6) to approve a Scheme of Compromise or Arrangement?",
    answer: [
      "The Dual Voting Majority Requirement:",
      "1. Numerical Majority: A majority in number (i.e. MORE THAN 50% of persons present and voting); AND",
      "2. Value Majority: Representing at least 3/4th IN VALUE (75% in value) of the creditors or class of creditors, or members or class of members.",
      "Calculation Base: Persons PRESENT AND VOTING (either in person, by proxy, or postal ballot/e-voting).",
      "NCLT Sanction: Scheme becomes legally binding on all creditors, members, and company only upon formal sanction order by NCLT under Section 230(7)."
    ],
    examinerTrap: "Both conditions must be met concurrently! For example, if 100 creditors attend and vote, at least 51 creditors must vote in favor (majority in number) AND their combined debt must equal at least 75% of total voted debt.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-24",
    framework: "Section 230(9): Dispensation with Creditors' Meeting",
    subtopic: "Corporate Laws - Mergers & Arrangements (Chapter 5)",
    question: "Under what specific condition can the National Company Law Tribunal (NCLT) dispense with convening a meeting of creditors under Section 230?",
    answer: [
      "Statutory Dispensation Threshold [Sec 230(9)]:",
      "• The Tribunal may dispense with calling a meeting of creditors or class of creditors IF:",
      "• Creditors having at least 90% IN VALUE agree and confirm to the scheme of compromise or arrangement.",
      "Form of Confirmation: Must be verified by way of an AFFIDAVIT.",
      "Note: NCLT has NO POWER to dispense with the meeting of shareholders/members under Section 230; dispensation is strictly for CREDITORS.",
      "Copy of Order: Sanction order must be filed with RoC within 30 days."
    ],
    examinerTrap: "Dispensation threshold is 90% in VALUE (not 75%). Furthermore, dispensation applies ONLY to creditors' meetings, never to shareholders' meetings.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-25",
    framework: "Section 233: Fast Track Merger Scheme for Small Companies & Startups",
    subtopic: "Corporate Laws - Mergers & Arrangements (Chapter 5)",
    question: "What companies are eligible for Fast Track Mergers, and what approval thresholds bypass the full NCLT route under Section 233?",
    answer: [
      "Eligible Classes (Bypassing NCLT):",
      "• Two or more Small Companies;",
      "• Holding Company and its Wholly Owned Subsidiary (WOS); OR",
      "• Two or more Startup companies, or an unlisted company with a startup.",
      "Approval Thresholds Required:",
      "1. Solvency Declaration filed by both companies with RoC in Form CAA.10.",
      "2. Members' Approval: At least 90% in total number of shares in general meeting.",
      "3. Creditors' Approval: 9/10th (90%) in value of creditors via meeting or written consent.",
      "Sanction Authority: Regional Director (RD) / Central Govt (NCLT approval not required unless RD objects)."
    ],
    examinerTrap: "Fast Track Merger requires 90% of TOTAL shares (not just present and voting), and 90% in value of creditors. It applies between Holding and WHOLLY OWNED subsidiary (not regular subsidiary).",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-26",
    framework: "Section 235: Squeeze-Out of Dissenting Shareholders in Takeover Schemes",
    subtopic: "Corporate Laws - Mergers & Arrangements (Chapter 5)",
    question: "What are the statutory timelines and thresholds for acquiring shares of dissenting shareholders in a scheme under Section 235?",
    answer: [
      "Offer Acceptance Threshold: Approved within 4 MONTHS after making offer by holders of at least 9/10th (90%) in value of the shares affected.",
      "Notice of Acquisition: Transferee company may, within 2 MONTHS after expiry of said 4 months, give notice in prescribed manner to dissenting shareholder.",
      "Right to Apply to NCLT: Dissenting shareholder has 1 MONTH from notice date to apply to NCLT against acquisition.",
      "Acquisition Completion: Unless NCLT orders otherwise, transferee company is entitled and bound to acquire dissenting shares on original scheme terms.",
      "Consideration Transit: Consideration received must be deposited in separate bank account held in trust."
    ],
    examinerTrap: "The 90% approval calculation EXCLUDES shares already held by the transferee company or its nominee/subsidiary at the date of the offer.",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 6: PREVENTION OF OPPRESSION & MISMANAGEMENT
  // ==========================================
  {
    id: "setA-fc-27",
    framework: "Section 244: Statutory Eligibility Thresholds for Filing Oppression Petition",
    subtopic: "Corporate Laws - Oppression & Mismanagement (Chapter 6)",
    question: "What numerical and shareholding thresholds confer locus standi on members to file an oppression & mismanagement petition under Section 241?",
    answer: [
      "Company Having Share Capital:",
      "• Numerical test: Not less than 100 MEMBERS; OR",
      "• Proportionate test: Not less than 1/10th of the TOTAL NUMBER of members, WHICHEVER IS LESS; OR",
      "• Capital test: Any member(s) holding not less than 1/10th (10%) of the ISSUED share capital (provided all calls paid).",
      "Company NOT Having Share Capital:",
      "• Not less than 1/5th (20%) of the total number of its members.",
      "Tribunal Waiver Power [Sec 244(1) Proviso]:",
      "• NCLT has discretionary power to WAIVE all or any of the above thresholds upon an application."
    ],
    examinerTrap: "The capital test is based on ISSUED SHARE CAPITAL, not paid-up capital! And joint holders of a share are counted as ONE single member for the numerical test.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-28",
    framework: "Section 245: Class Action Suit Application Thresholds",
    subtopic: "Corporate Laws - Oppression & Mismanagement (Chapter 6)",
    question: "Who can initiate a Class Action suit under Section 245, and against whom can remedies be claimed?",
    answer: [
      "Members' Requisition Thresholds:",
      "• Unlisted Company: Min 100 members OR 10% of total members (whichever less) OR holding 10% of issued capital.",
      "• Listed Company: Min 100 members OR 10% of total members OR holding 2% OF ISSUED SHARE CAPITAL.",
      "Depositors' Requisition Thresholds:",
      "• Min 100 depositors OR 10% of total depositors (whichever less) OR depositors to whom 10% of total deposits are owed.",
      "Against Whom Relief Lies: Company, Directors, Auditors/Audit Firm, or Experts/Advisors for misleading statements or fraudulent conduct.",
      "Exemption: Banking companies are completely exempt from Class Action suits."
    ],
    examinerTrap: "For listed companies, the share capital threshold is slashed to just 2% of issued share capital! Banking companies are statutorily excluded from Section 245 class actions.",
    difficulty: "Medium"
  },

  // ==========================================
  // CHAPTER 7: WINDING UP
  // ==========================================
  {
    id: "setA-fc-29",
    framework: "Section 271: Grounds for Winding Up by Tribunal (NCLT)",
    subtopic: "Corporate Laws - Winding Up (Chapter 7)",
    question: "What are the five statutory grounds on which the Tribunal may order winding up of a company under Section 271?",
    answer: [
      "1. Special Resolution: Company has resolved by Special Resolution that it be wound up by Tribunal [Sec 271(a)].",
      "2. Sovereignty & National Security: Acted against sovereignty, integrity of India, security of State, friendly relations, or public order [Sec 271(b)].",
      "3. Fraudulent Affairs on RoC Application: Affairs conducted in fraudulent manner or formation for fraudulent/unlawful purpose [Sec 271(c)].",
      "4. Default in Filing Returns: Default in filing Financial Statements OR Annual Returns with RoC for immediately preceding 5 CONSECUTIVE FINANCIAL YEARS [Sec 271(d)].",
      "5. Just and Equitable: Tribunal is of the opinion that it is just and equitable that the company should be wound up [Sec 271(e)]."
    ],
    examinerTrap: "'Inability to pay debts' is NO LONGER a ground under Section 271 of the Companies Act! Inability to pay commercial debt has been shifted entirely to the IBC, 2016.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-30",
    framework: "Section 326: Overriding Preferential Payments & Workmen's Dues",
    subtopic: "Corporate Laws - Winding Up (Chapter 7)",
    question: "Explain the concept of Overriding Preferential Payments under Section 326 and how workmen's portion is calculated against secured assets.",
    answer: [
      "Overriding Priority Status:",
      "• In winding up of a company, two debts are paid in PRIORITY TO ALL OTHER DEBTS:",
      "  1. Workmen's dues; AND",
      "  2. Debts due to secured creditors to the extent of 'Workmen's Portion' in the secured asset.",
      "Pari Passu Ranking: The above two claims rank equal among themselves (pari passu).",
      "Workmen's Dues Defined: Wages/salary for period NOT EXCEEDING 2 YEARS prior to winding up, accrued holiday remuneration, and compensation under Industrial Disputes Act.",
      "Mandatory 30-Day Payout: Workmen's dues must be paid within 30 days of sale of assets subject to funds."
    ],
    examinerTrap: "Workmen's wage priority under Section 326 is capped at 24 months (2 years) immediately preceding the winding up order. Any wages prior to 2 years fall into ordinary unsecured ranking.",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 8: SEBI ACT, 1992 & SEBI (LODR) REGULATIONS
  // ==========================================
  {
    id: "setA-fc-31",
    framework: "SEBI (LODR) Regulation 17: Board Composition Matrix for Listed Entities",
    subtopic: "Economic Laws - SEBI Regulations (Chapter 8)",
    question: "Detail the mandatory Board composition, Independent Director ratios, and quorum rules under Regulation 17 of SEBI (LODR).",
    answer: [
      "Minimum Board Size: Minimum 6 directors for Top 2,000 listed entities.",
      "Woman Director: At least 1 Independent Woman Director for Top 1,000 listed entities.",
      "Independent Directors Ratio:",
      "• If Chairperson is NON-EXECUTIVE: At least 1/3rd of the Board must be Independent Directors.",
      "• If Chairperson is EXECUTIVE or a PROMOTER / relative of promoter: At least HALF (50%) of the Board must be Independent Directors.",
      "Quorum for Top 2,000 Listed Entities: 1/3rd of total strength or 3 directors (whichever higher), including at least ONE INDEPENDENT DIRECTOR.",
      "Maximum Age for NED: Special Resolution required for appointing Non-Executive Director aged >= 75 years."
    ],
    examinerTrap: "If the Non-Executive Chairman is a promoter or relative of a promoter, the required Independent Director ratio jumps from 1/3rd to 50%! Furthermore, top 2,000 entities quorum requires at least 1 ID.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-32",
    framework: "SEBI (PIT) Regulation 3: Unpublished Price Sensitive Information (UPSI) & SDD",
    subtopic: "Economic Laws - SEBI Regulations (Chapter 8)",
    question: "What constitutes UPSI, what is the 'Legitimate Purpose' exception, and what are the rules for the Structured Digital Database (SDD)?",
    answer: [
      "UPSI Definition: Any information relating directly or indirectly to a company or its securities that is not generally available and which, upon becoming available, is likely to materially affect prices (e.g. financials, dividends, capital structure, M&A).",
      "Prohibition: No insider shall communicate, provide, or allow access to any UPSI.",
      "Exception: Communication in furtherance of 'Legitimate Purposes' (performance of duties or legal obligations).",
      "Structured Digital Database (SDD) Mandate:",
      "• Board must maintain digital database containing nature of UPSI, names and PAN of persons with whom UPSI is shared.",
      "• Must have robust time-stamping, audit trails, and non-tamperability.",
      "• Must be preserved for a period of NOT LESS THAN 8 YEARS."
    ],
    examinerTrap: "The Structured Digital Database (SDD) cannot be outsourced to a third-party cloud service without non-tamperable in-house control, and records must be preserved for minimum 8 YEARS.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-33",
    framework: "SEBI (SAST) Regulations, 2011: Takeover Code Triggers & Open Offer Obligations",
    subtopic: "Economic Laws - SEBI Regulations (Chapter 8)",
    question: "What are the two primary acquisition thresholds under SEBI (SAST) that trigger a mandatory Open Offer?",
    answer: [
      "Trigger 1: Initial Acquisition Threshold [Regulation 3(1)]:",
      "• Acquiring voting rights which (together with PAC) entitle the acquirer to 25% OR MORE of voting rights in target company.",
      "• Mandate: Triggers mandatory Public Announcement of an OPEN OFFER.",
      "Trigger 2: Creeping Acquisition Limit [Regulation 3(2)]:",
      "• An acquirer holding >= 25% but < 75% voting rights can acquire additional shares up to 5% OF VOTING RIGHTS in any financial year without open offer.",
      "• Exceeding 5% in a FY triggers mandatory open offer.",
      "Mandatory Open Offer Size: Minimum 26% of total voting capital of target company.",
      "Maximum Promoter Holding Cap: 75% (to maintain 25% Minimum Public Shareholding)."
    ],
    examinerTrap: "The 5% creeping acquisition limit is calculated on a GROSS basis in a single financial year (1st April to 31st March). Selling 2% does not permit buying 7% in the same FY.",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 9: FOREIGN EXCHANGE MANAGEMENT ACT (FEMA), 1999
  // ==========================================
  {
    id: "setA-fc-34",
    framework: "FEMA Section 2(v): Residential Status Determination Flowchart",
    subtopic: "Economic Laws - FEMA (Chapter 9)",
    question: "Walk through the statutory two-tier test for determining Person Resident in India (PRII) status for an individual under Section 2(v).",
    answer: [
      "Tier 1: Preceding Year Physical Stay Test:",
      "• Did the individual reside in India for > 182 DAYS during the PRECEDING financial year?",
      "  - If NO -> Person Resident Outside India (PROI).",
      "  - If YES -> Prima facie PRII (proceed to Tier 2).",
      "Tier 2: Departure / Arrival Exclusion Overrides:",
      "• Case A (Leaving India): Person leaves India (i) for employment, (ii) for business/vocation, or (iii) for uncertain stay -> Becomes PROI IMMEDIATELY upon departure.",
      "• Case B (Coming to India): Person comes to India otherwise than (i) for employment, (ii) for business/vocation, or (iii) for uncertain stay -> Remains PROI despite staying > 182 days in preceding year.",
      "Key Distinction: Income Tax Act looks at current FY stay; FEMA hinges on PRECEDING FY stay + purpose of travel."
    ],
    examinerTrap: "A person living in India for 30 years who departs on 10th May for a foreign job becomes PROI ON 10th MAY. His 365-day stay in preceding FY is overridden by the employment departure clause.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-35",
    framework: "FEM (CAT) Rules, 2000: Schedule I Prohibited Current Account Transactions",
    subtopic: "Economic Laws - FEMA (Chapter 9)",
    question: "Which eight foreign exchange transactions are completely prohibited under Schedule I of the Current Account Transactions Rules?",
    answer: [
      "Schedule I Prohibited Transactions (Absolute Bar - No Approval Can Validate):",
      "1. Remittance out of lottery winnings.",
      "2. Remittance of income from racing, riding, or any other hobby.",
      "3. Remittance for purchase of lottery tickets, sweepstakes, or banned magazines.",
      "4. Payment of commission on exports made towards equity investment in Joint Ventures/WOS abroad.",
      "5. Remittance of dividend by any company where dividend balancing requirement is applicable.",
      "6. Payment of commission on exports under Rupee State Credit Route (except up to 10% on tea/tobacco).",
      "7. Payment related to 'Call Back Services' of telephones.",
      "8. Remittance of interest income on funds held in Non-Resident Special Rupee (NRSR) Account."
    ],
    examinerTrap: "Schedule I transactions are PROHIBITED ABSOLUTELY. Neither the Reserve Bank of India nor the Central Government has legal authority to grant permission for Schedule I transactions.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-36",
    framework: "FEM (CAT) Rules: Schedule II (Govt Approval) vs Schedule III (RBI / LRS Limit)",
    subtopic: "Economic Laws - FEMA (Chapter 9)",
    question: "Differentiate transactions requiring Prior Central Government approval (Schedule II) from those requiring RBI approval under Schedule III.",
    answer: [
      "Schedule II Transactions (Prior Central Government Approval):",
      "• Cultural Tours -> Ministry of Human Resource Development.",
      "• Advertisement in foreign print media for non-tourism/export promotion -> Ministry of Finance.",
      "• Remittance of freight of chartered vessel -> Ministry of Surface Transport.",
      "• Multi-modal transport operators -> Director General of Shipping.",
      "Schedule III Transactions (RBI Approval Required if Exceeding LRS Limit):",
      "• Resident Individuals: Up to USD 250,000 per financial year under LRS freely allowed for: private visits, gifts, donations, employment abroad, emigration, medical, education.",
      "• Remittances EXCEEDING USD 250,000 require PRIOR RBI APPROVAL (unless based on initial doctor/university estimates)."
    ],
    examinerTrap: "Donations by corporate entities exceeding 1% of foreign exchange earnings or USD 5,000,000 (whichever less) require prior RBI approval under Schedule III.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-37",
    framework: "Liberalised Remittance Scheme (LRS) Ceiling, Eligible Persons & TCS Matrix",
    subtopic: "Economic Laws - FEMA (Chapter 9)",
    question: "What are the core parameters, permissible uses, and Tax Collected at Source (TCS) rules under LRS?",
    answer: [
      "Eligible Persons: Available ONLY to Resident Individuals (including minors with guardian consent). Corporate entities, partnership firms, and HUFs are NOT ELIGIBLE.",
      "Ceiling Limit: Maximum USD 250,000 per financial year (April to March) across all transactions combined.",
      "Permissible Transactions: Acquisition of foreign property, shares, opening foreign bank account, private travel, medical, education, gifts.",
      "Prohibited Under LRS: Remittance for trading in foreign exchange, binary options, lottery, or remittance to FATF non-cooperative countries.",
      "TCS Rates under Section 206C(1G):",
      "• Remittances > Rs. 7 Lakhs (General): 20% TCS without threshold limit.",
      "• Education via loan from financial institution: 0.5% TCS above Rs. 7 Lakhs.",
      "• Medical / Education self-funded: 5% TCS above Rs. 7 Lakhs."
    ],
    examinerTrap: "LRS is strictly for INDIVIDUALS. A company or LLP cannot remit USD 250,000 under LRS. Non-residents (PROI) also cannot remit from domestic Indian accounts under LRS.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-38",
    framework: "Overseas Direct Investment (ODI) vs Foreign Portfolio Investment (FPI) [FEM (OI) Rules 2022]",
    subtopic: "Economic Laws - FEMA (Chapter 9)",
    question: "How do the Foreign Exchange Management (Overseas Investment) Rules, 2022 distinguish ODI from FPI?",
    answer: [
      "Overseas Direct Investment (ODI) Criteria:",
      "• Acquisition of ANY unlisted equity capital of a foreign entity; OR",
      "• Holding 10% OR MORE of the paid-up equity capital of a LISTED foreign entity; OR",
      "• Investment with control rights in a listed foreign entity.",
      "Foreign Portfolio Investment (FPI) Criteria:",
      "• Investment in LISTED foreign securities representing LESS THAN 10% of paid-up capital without control.",
      "Financial Commitment Limit for Indian Entities:",
      "• Total financial commitment in all foreign entities combined cannot exceed 400% OF NET WORTH of the Indian entity as per last audited balance sheet (automatic route)."
    ],
    examinerTrap: "Investment in even 1 single share of an UNLISTED foreign company is statutorily classified as ODI (not FPI), regardless of percentage! The 10% threshold applies only to LISTED foreign securities.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-39",
    framework: "External Commercial Borrowings (ECB) Framework Parameters",
    subtopic: "Economic Laws - FEMA (Chapter 9)",
    question: "What are the borrowing limits, eligible borrowers, and Minimum Average Maturity Periods (MAMP) under the ECB framework?",
    answer: [
      "Eligible Borrowers: All entities eligible to receive FDI, plus Port Trusts, Units in SEZ, and SIDBI.",
      "Recognized Lenders: Must be resident of FATF or IOSCO compliant country.",
      "Automatic Route Ceiling: Up to USD 750 MILLION or equivalent per financial year.",
      "Minimum Average Maturity Period (MAMP):",
      "• General Rule: 3 YEARS for all ECBs.",
      "• Manufacturing sector entities borrowing up to USD 50 million: 1 YEAR MAMP.",
      "• Borrowing from foreign equity holder for working capital/general corporate: 5 YEARS MAMP.",
      "All-in-Cost Ceiling: Benchmark rate + 500 bps for foreign currency ECB; Benchmark + 450 bps for INR ECB.",
      "End-Use Restrictions: Real estate, equity investment, and speculative trading strictly prohibited."
    ],
    examinerTrap: "ECB proceeds cannot be utilized for real estate activities, investment in the capital market, or purchase of land, even under the approval route.",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 10: INSOLVENCY AND BANKRUPTCY CODE (IBC), 2016
  // ==========================================
  {
    id: "setA-fc-40",
    framework: "IBC Section 4 & Section 7: Minimum Default Threshold & Financial Creditor CIRP",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "What is the monetary default threshold under Section 4, and what procedure governs a Section 7 application by Financial Creditors?",
    answer: [
      "Monetary Threshold [Sec 4]: Minimum default of RS. 1 CRORE (increased from Rs. 1 Lakh vide MCA notification).",
      "Financial Creditor Application [Sec 7]:",
      "• Initiated for default of a FINANCIAL DEBT (either owed to applicant or another FC).",
      "• Special Class (Real Estate Allottees): Application must be filed jointly by at least 100 ALLOTTEES or 10% of total allottees in the same project, whichever is less.",
      "Admission Timeline [Sec 7(4)/(5)]:",
      "• NCLT must ascertain existence of default within 14 DAYS of receipt of application.",
      "• If default exists and application is complete -> Must admit; if incomplete -> 7 days' rectification notice."
    ],
    examinerTrap: "Under Section 7, the existence of a 'dispute' between the debtor and creditor is COMPLETELY IRRELEVANT. If debt and default are established through records of Information Utility (NeSL), NCLT must admit the petition.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-41",
    framework: "IBC Section 8 & Section 9: Operational Creditors & Pre-Existing Dispute Doctrine",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "What mandatory two-step procedure must an Operational Creditor follow, and why is a 'pre-existing dispute' fatal to Section 9?",
    answer: [
      "Step 1: Statutory Demand Notice [Sec 8(1)]:",
      "• Operational Creditor must serve a 10-DAY Demand Notice in Form 3 or invoice copy in Form 4 demanding payment of unpaid operational debt >= Rs. 1 Crore.",
      "Step 2: Debtor's Response Window [Sec 8(2)]:",
      "• Corporate Debtor has 10 DAYS from receipt of notice to bring to notice of creditor:",
      "  - Proof of payment; OR",
      "  - Existence of a DISPUTE or record of pending suit/arbitration filed BEFORE receipt of demand notice.",
      "Section 9 Admission / Rejection [Mobilox Doctrine]:",
      "• If a bona fide pre-existing dispute exists prior to notice receipt, NCLT MUST REJECT Section 9 application under Section 9(5)(ii)(d)."
    ],
    examinerTrap: "A dispute raised for the first time in response to the Section 8 notice is a 'spurious defence' and will be ignored. But any email, letter, or arbitration notice sent BEFORE notice receipt is a fatal pre-existing dispute.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-42",
    framework: "IBC Section 14: Moratorium Scope, Statutory Prohibitions & Exemptions",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "What four prohibitions are imposed during the Section 14 Moratorium, and which transactions are statutorily exempt?",
    answer: [
      "Commencement: Declared by NCLT on Insolvency Commencement Date; lasts until CIRP ends or liquidation is ordered.",
      "Four Prohibitions [Sec 14(1)]:",
      "• 1. Institution of suits or continuation of pending proceedings, execution of judgments/decrees.",
      "• 2. Transferring, encumbering, alienating, or disposing of corporate debtor's assets.",
      "• 3. Any action to foreclose, recover, or enforce security interest (including SARFAESI actions).",
      "• 4. Recovery of any property occupied by or in possession of corporate debtor by owner/lessor.",
      "Critical Exemptions [Sec 14(2)/(3)]:",
      "• Supply of ESSENTIAL goods or services (electricity, water, IT) cannot be terminated.",
      "• A SURETY in a contract of guarantee to the corporate debtor (guarantor assets are not protected).",
      "• Petroleum and aviation licenses/transactions notified by Central Govt."
    ],
    examinerTrap: "Moratorium does NOT protect personal guarantors! Financial creditors can proceed simultaneously against the corporate debtor in NCLT and personal guarantors under Section 60/94.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-43",
    framework: "IBC Section 21 & Section 28: Committee of Creditors (CoC) Voting Thresholds",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "What are the statutory voting thresholds for routine, critical, and withdrawal decisions within the Committee of Creditors?",
    answer: [
      "Composition: Comprises ALL Financial Creditors of the corporate debtor (excluding related parties).",
      "Voting Power: Proportionate to voting share based on financial debt owed.",
      "Three Tiers of Voting Thresholds:",
      "• Tier 1: Routine Administrative Decisions -> 51% Voting Share.",
      "• Tier 2: Critical Statutory Decisions -> 66% VOTING SHARE:",
      "  - Appointment of Resolution Professional [Sec 22(2)];",
      "  - Replacement of Resolution Professional [Sec 27(2)];",
      "  - Extension of CIRP period beyond 180 days [Sec 12(2)];",
      "  - Approval of Resolution Plan [Sec 30(4)];",
      "  - Creation of security, raising interim finance, modifying contracts [Sec 28].",
      "• Tier 3: Withdrawal of CIRP Application under Section 12A -> 90% VOTING SHARE."
    ],
    examinerTrap: "Approval of a Resolution Plan requires 66% of voting share (reduced from 75% by amendment). Withdrawal under Section 12A requires an extraordinary 90% voting share of the CoC.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-44",
    framework: "IBC Section 29A: Disqualifications of Resolution Applicants",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "List the key statutory disqualifiers that permanently bar a person from submitting a resolution plan under Section 29A.",
    answer: [
      "A person is ineligible to submit a Resolution Plan if such person (or PAC/connected person):",
      "• (a) Is an undischarged insolvent;",
      "• (b) Is a wilful defaulter in accordance with RBI guidelines;",
      "• (c) Has an NPA account under management/control for >= 1 YEAR prior to CIRP commencement and failed to pay overdue amounts with interest before submitting plan;",
      "• (d) Convicted for an offence with imprisonment >= 2 years (under Schedule XII) or >= 7 years (under any law);",
      "• (e) Disqualified to act as director under Companies Act, 2013;",
      "• (f) Prohibited by SEBI from trading in securities or accessing securities markets;",
      "• (g) Has been a promoter/manager of a company where preferential/fraudulent transaction occurred."
    ],
    examinerTrap: "Clause (c) (NPA bar) does NOT apply to a Financial Entity that is not a related party to the corporate debtor, nor does it apply if the applicant is an MSME corporate debtor submitting its own plan under Section 240A.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-45",
    framework: "IBC Section 53: Waterfall Mechanism of Liquidation Payout Priorities",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "Detail the strict statutory hierarchy (order of priority) for distribution of liquidation proceeds under Section 53.",
    answer: [
      "Statutory Distribution Order (Waterfall):",
      "1. CIRP costs and liquidation costs in full.",
      "2. Pari Passu Pool:",
      "   • Workmen's dues for period of 24 MONTHS preceding liquidation commencement; AND",
      "   • Debts due to SECURED CREDITORS who have relinquished security interest under Sec 52.",
      "3. Wages and unpaid dues owed to employees (other than workmen) for period of 12 MONTHS.",
      "4. Financial debts owed to UNSECURED CREDITORS.",
      "5. Pari Passu Pool:",
      "   • Central and State Government taxes/dues (up to 2 YEARS preceding liquidation); AND",
      "   • Unpaid balance of secured debt remaining unpaid following enforcement of security.",
      "6. Any remaining debts and dues.",
      "7. Preference shareholders, if any.",
      "8. Equity shareholders or partners."
    ],
    examinerTrap: "Government dues (tax, excise, GST) rank at Step 5, BEHIND unsecured financial creditors at Step 4! Furthermore, workmen get 24 months' priority, whereas ordinary employees get only 12 months.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-46",
    framework: "IBC Chapter III-A: Pre-Packaged Insolvency Resolution Process (PIRP)",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "What are the eligibility criteria, monetary thresholds, and process timelines governing PIRP under Section 54A?",
    answer: [
      "Eligible Entities: Corporate debtors classified as Micro, Small and Medium Enterprises (MSMEs) under MSMED Act, 2006.",
      "Monetary Default Threshold: Minimum default of RS. 10 LAKHS (not Rs. 1 Crore).",
      "Prerequisite Approvals:",
      "• Unrelated Financial Creditors representing >= 66% in value must approve PIRP initiation.",
      "• Shareholders approval: Special Resolution (75%) passed in general meeting.",
      "Debtor-in-Possession Model: Board of Directors / management retains control of operations during PIRP (RP oversees).",
      "Strict Timelines [Sec 54D]:",
      "• Total Process: Maximum 120 DAYS from PIRP commencement date.",
      "• Plan Submission: Resolution plan must be submitted to NCLT within 90 DAYS; NCLT has 30 days to approve."
    ],
    examinerTrap: "Unlike regular CIRP where management is suspended and RP runs the company, PIRP is a DEBTOR-IN-POSSESSION model where existing promoters remain in management unless fraud is proven.",
    difficulty: "Medium"
  },

  // ==========================================
  // CHAPTER 11: PREVENTION OF MONEY LAUNDERING ACT (PMLA), 2002
  // ==========================================
  {
    id: "setA-fc-47",
    framework: "PMLA Section 3 & Section 4: Definition & Rigorous Punishment Matrix",
    subtopic: "Economic Laws - Money Laundering (Chapter 11)",
    question: "How is the offence of money laundering defined under Section 3, and what are the imprisonment terms under Section 4?",
    answer: [
      "Offence Definition [Sec 3]:",
      "• Whosoever directly or indirectly attempts to indulge, or knowingly assists, or knowingly is a party, or is actually involved in ANY process or activity connected with PROCEEDS OF CRIME:",
      "  - Concealment; Possession; Acquisition; Use; Projecting as untainted property; OR Claiming as untainted property.",
      "Continuing Offence: Process/activity is a CONTINUING ACTIVITY till person reaches benefit of proceeds of crime.",
      "Punishment Matrix [Sec 4]:",
      "• Standard Offence: Rigorous imprisonment for minimum 3 YEARS up to maximum 7 YEARS, AND fine.",
      "• Aggravated Offence (Paragraph 2 of Part A of Schedule - NDPS Act offences): Maximum rigorous imprisonment extends up to 10 YEARS.",
      "No Maximum Cap on Fine: Court has full discretion to impose unlimited fine proportionate to proceeds."
    ],
    examinerTrap: "Merely possessing proceeds of crime without projecting it as untainted IS money laundering following the 2019 legislative clarification. The upper punishment limit jumps to 10 YEARS for NDPS-related crimes.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-48",
    framework: "PMLA Section 5: Provisional Attachment & Adjudication Pipeline",
    subtopic: "Economic Laws - Money Laundering (Chapter 11)",
    question: "What is the complete statutory pipeline for provisional attachment of proceeds of crime from issuance to confirmation?",
    answer: [
      "Authority: Director or officer not below Deputy Director authorized by Director.",
      "Threshold Requirement: Reason to believe (recorded in writing) that person is in possession of proceeds of crime and property is likely to be concealed/transferred.",
      "Provisional Attachment Period: Valid for a period NOT EXCEEDING 180 DAYS from order date.",
      "Adjudication Complaint: Authorized officer must file complaint before Adjudicating Authority within 30 DAYS of attachment.",
      "Show Cause Notice: Adjudicating Authority issues 30-day notice to person to indicate sources of income.",
      "Confirmation Order [Sec 8(3)]: Adjudicating Authority must confirm attachment within the 180-day window.",
      "Post-Confirmation: Attachment continues during trial; property is CONFISCATED to Central Govt upon conviction."
    ],
    examinerTrap: "The 180-day limitation period EXCLUDES any period during which proceedings are stayed by any court. If 180 days expire without confirmation or valid stay, attachment collapses automatically.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-49",
    framework: "PMLA Section 45: Cognizable Offence & Twin Bail Conditions",
    subtopic: "Economic Laws - Money Laundering (Chapter 11)",
    question: "Explain the application of Section 45 twin bail conditions under PMLA and the four statutory categories of discretionary relief.",
    answer: [
      "Legal Nature: Every offence punishable under PMLA is COGNIZABLE AND NON-BAILABLE.",
      "Mandatory Twin Bail Conditions [Sec 45(1)]:",
      "1. Opportunity to Prosecutor: Public Prosecutor must be given an opportunity to oppose bail application.",
      "2. Satisfaction of Court: Court must be satisfied that:",
      "   • There are reasonable grounds for believing the accused is NOT GUILTY of such offence; AND",
      "   • He is NOT LIKELY TO COMMIT any offence while on bail.",
      "Discretionary Proviso Exceptions (Special Court may grant bail if accused is):",
      "• 1. Under the age of 16 years;",
      "• 2. A Woman;",
      "• 3. Sick or Infirm; OR",
      "• 4. Accused of money laundering of amount LESS THAN RS. 1 CRORE."
    ],
    examinerTrap: "Following the Nikesh Tarachand Shah judgment and 2018 amendment, twin conditions apply to ALL PMLA offences. The monetary relief ceiling under the proviso is strictly LESS THAN RS. 1 CRORE.",
    difficulty: "Hard"
  },

  // ==========================================
  // CHAPTER 12: FOREIGN CONTRIBUTION (REGULATION) ACT (FCRA), 2010
  // ==========================================
  {
    id: "setA-fc-50",
    framework: "FCRA Section 3: Absolute Prohibition on Acceptance of Foreign Contributions",
    subtopic: "Economic Laws - Foreign Contribution (Chapter 12)",
    question: "Which nine categories of persons/entities are completely prohibited from accepting foreign contributions under Section 3?",
    answer: [
      "Absolute Bar on Acceptance of Foreign Contribution [Sec 3(1)]:",
      "1. Candidate for election.",
      "2. Correspondent, columnist, cartoonist, editor, owner, printer or publisher of a registered newspaper.",
      "3. Public servant, Judge, Government servant, or employee of any corporation owned/controlled by Government.",
      "4. Member of any Legislature (MP, MLA, MLC).",
      "5. Political party or office-bearer thereof.",
      "6. Organization of a political nature specified by Central Government.",
      "7. Association or company engaged in production or broadcast of audio news or audio-visual news.",
      "8. Correspondent or news reporter of such news broadcast organizations.",
      "9. Individuals or entities receiving on behalf of any of the above prohibited persons."
    ],
    examinerTrap: "'Public Servant' under Section 21 of IPC was added by the 2020 Amendment. Any officer, judge, or employee of a Govt-owned corporation or public university is strictly barred from receiving foreign contributions.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-51",
    framework: "FCRA Section 4: Exempted Transactions under Ordinary Course",
    subtopic: "Economic Laws - Foreign Contribution (Chapter 12)",
    question: "Under what circumstances does Section 3 prohibition NOT apply to payments received from a foreign source under Section 4?",
    answer: [
      "Permissible Receipts Notwithstanding Section 3:",
      "• 1. Salary, wages or other remuneration in ordinary course of business.",
      "• 2. Payment in the ordinary course of international trade or commerce.",
      "• 3. Agency business on behalf of foreign principal.",
      "• 4. Gift or presentation received as a member of Indian delegation (provided market value conform to rules).",
      "• 5. Remittance from Relative: Permitted up to RS. 10 LAKHS in a financial year without prior intimation to Central Govt.",
      "• Intimation Threshold: If relative's remittance exceeds Rs. 10 Lakhs in a FY, must intimate Central Govt in Form FC-1 within 3 MONTHS."
    ],
    examinerTrap: "The relative remittance limit was raised from Rs. 1 Lakh to Rs. 10 Lakhs by the 2022 Amendment Rules. Intimation window is 3 MONTHS (formerly 30 days) in Form FC-1.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-52",
    framework: "FCRA Section 7 & Section 8: Ban on Sub-Granting & 20% Administrative Cap",
    subtopic: "Economic Laws - Foreign Contribution (Chapter 12)",
    question: "What are the restrictions on sub-granting funds to other NGOs and the statutory ceiling on administrative expenses under FCRA?",
    answer: [
      "Total Ban on Sub-Granting [Sec 7]:",
      "• No person who is registered and granted certificate or prior permission shall TRANSFER foreign contribution to ANY OTHER PERSON.",
      "• Even if the recipient organization is also registered under FCRA, transfer/sub-granting is COMPLETELY BANNED.",
      "Administrative Expenses Cap [Sec 8]:",
      "• Maximum 20% of foreign contribution received in a financial year can be defrayed for administrative expenses (slashed from 50%).",
      "• Exceeding 20% requires PRIOR WRITTEN PERMISSION of the Central Government.",
      "Utilization Mandate: Foreign contribution must be utilized solely for the declared purpose."
    ],
    examinerTrap: "Earlier rules allowed transferring funds between two FCRA-registered entities. Section 7 now completely prohibits transferring foreign contributions to any other entity, registered or not! Admin cap is 20% (not 50%).",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-53",
    framework: "FCRA Section 17: Mandatory 'FCRA Account' at SBI New Delhi Main Branch",
    subtopic: "Economic Laws - Foreign Contribution (Chapter 12)",
    question: "What is the mandatory banking route for receiving foreign contributions under Section 17?",
    answer: [
      "The Exclusive Receiving Gateway [Sec 17(1)]:",
      "• Every person granted certificate or prior permission MUST receive foreign contribution ONLY in a designated account called 'FCRA Account'.",
      "• Sole Designated Branch: STATE BANK OF INDIA, MAIN BRANCH, 11 SANSAD MARG, NEW DELHI.",
      "• No funds other than foreign contribution can be deposited in this account.",
      "Secondary Utilization Accounts [Sec 17(1) Proviso]:",
      "• Entity may open one or more accounts in ANY scheduled commercial bank for UTILIZING the funds.",
      "• No direct foreign remittance can be received in secondary utilization accounts; funds must flow through the SBI New Delhi Main Branch account first."
    ],
    examinerTrap: "Receiving foreign contributions directly in any branch other than SBI Main Branch, 11 Sansad Marg, New Delhi is an incurable statutory violation leading to certificate suspension under Section 13.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-54",
    framework: "FCRA Section 12, 13 & 14: Validity, Suspension & Cancellation of Registration",
    subtopic: "Economic Laws - Foreign Contribution (Chapter 12)",
    question: "What is the validity period of FCRA registration, maximum suspension duration, and consequence of cancellation?",
    answer: [
      "Registration Certificate Validity: Valid for 5 YEARS from date of grant.",
      "Renewal Application: Must apply for renewal in Form FC-3C at least 6 MONTHS prior to expiry date.",
      "Suspension of Registration [Sec 13]:",
      "• Central Government may suspend registration for a period NOT EXCEEDING 180 DAYS.",
      "• Extension: Can extend suspension by an additional period up to 180 DAYS.",
      "• Restrictions During Suspension: Up to 25% of unutilized funds may be spent only with prior approval of Central Govt.",
      "Cancellation of Registration [Sec 14]:",
      "• Grounds: Incorrect statements, violation of terms, public interest.",
      "• Bar on Re-registration: Entity CANNOT BE RE-REGISTERED FOR 3 YEARS from cancellation date."
    ],
    examinerTrap: "During suspension, an organization cannot access its bank account freely; it can spend at most 25% of unutilized foreign contribution, and even that requires prior approval of the Central Government.",
    difficulty: "Hard"
  },

  // ==========================================
  // ADDITIONAL HIGH-YIELD STATUTORY FLASHCARDS
  // ==========================================
  {
    id: "setA-fc-55",
    framework: "Section 135 & CSR Rules: Mandatory CSR Spend & Unspent Account Timelines",
    subtopic: "Corporate Laws - Corporate Social Responsibility",
    question: "What are the applicability thresholds for CSR, and what are the strict timelines for dealing with ongoing vs non-ongoing unspent CSR funds?",
    answer: [
      "Applicability Thresholds (Preceding FY):",
      "• Net Worth >= Rs. 500 Crore; OR",
      "• Turnover >= Rs. 1,000 Crore; OR",
      "• Net Profit >= Rs. 5 Crore.",
      "Mandatory Spend: At least 2% of average net profits of preceding 3 financial years.",
      "Unspent CSR Funds Pipeline [Sec 135(5)/(6)]:",
      "• Non-Ongoing Projects: Must transfer unspent amount to a Fund specified in Schedule VII (PM CARES / Clean Ganga) within 6 MONTHS from the end of the financial year.",
      "• Ongoing Projects: Must transfer to a special 'Unspent CSR Account' in a scheduled bank within 30 DAYS of FY end; must spend within 3 FINANCIAL YEARS.",
      "• Failure after 3 years: Must transfer remaining unspent balance to Schedule VII fund within 30 DAYS of completion of 3rd year."
    ],
    examinerTrap: "For ongoing projects, the transfer to the special account must happen within 30 DAYS of FY end. For non-ongoing projects, the transfer to Schedule VII fund has a 6-MONTH window.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-56",
    framework: "Section 186(1): Two-Layer Restriction on Investment Subsidiaries",
    subtopic: "Corporate Laws - Board Powers (Chapter 2)",
    question: "What is the restriction on making investments through layers of investment companies under Section 186(1), and what are the two exceptions?",
    answer: [
      "General Rule: A company shall NOT make investment through MORE THAN TWO LAYERS of investment companies.",
      "Two Statutory Exceptions [Sec 186(1) Proviso]:",
      "1. Acquisition of an Overseas Company: Permitted to acquire any company incorporated outside India if such company has investment subsidiaries beyond 2 layers as per the laws of that foreign country.",
      "2. Statutory Compliance: Permitted for any subsidiary from having an investment subsidiary for the purpose of meeting requirements of any law or rule.",
      "Definition: Investment company means a company whose principal business is the acquisition of shares, debentures or other securities."
    ],
    examinerTrap: "The two-layer restriction applies specifically to INVESTMENT companies. It does not bar operating/manufacturing subsidiaries having multiple layers, provided they are not pure investment holding vehicles.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-57",
    framework: "Section 247: Registered Valuer Valuation Mandate",
    subtopic: "Corporate Laws - Valuations & Experts",
    question: "When is valuation by a Registered Valuer mandatory under the Companies Act, and what are the cooling-off restrictions?",
    answer: [
      "Mandatory Statutory Valuation Triggers:",
      "• Further issue of shares (sweat equity, preferential allotment) [Sec 62/54].",
      "• Compromises, arrangements, mergers and amalgamations [Sec 230/232].",
      "• Purchase of minority shareholding [Sec 236].",
      "• Submission of valuation in resolution plans under IBC [Sec 30(2)].",
      "Cooling-Off Restrictions [Sec 247(2)]:",
      "• A valuer shall NOT undertake valuation of any assets in which he has a direct or indirect interest or becomes so interested at any time during a period of 3 YEARS prior to appointment or 3 YEARS after valuation."
    ],
    examinerTrap: "A Registered Valuer cannot value assets if he had any interest in them during the prior 3 YEARS or acquires any interest in the succeeding 3 YEARS.",
    difficulty: "Medium"
  },
  {
    id: "setA-fc-58",
    framework: "IBC Section 66: Fraudulent Trading & Wrongful Trading Liability",
    subtopic: "Economic Laws - Insolvency & Bankruptcy Code (Chapter 10)",
    question: "Distinguish Fraudulent Trading under Section 66(1) from Wrongful Trading under Section 66(2) of the IBC.",
    answer: [
      "Fraudulent Trading [Sec 66(1)]:",
      "• Criterion: Business carried on with INTENT TO DEFRAUD creditors or for any fraudulent purpose.",
      "• Locus: Any person who was knowingly a party to the carrying on of the business.",
      "• Liability: Tribunal can order such person to make personal contribution to assets of corporate debtor (unlimited personal liability).",
      "Wrongful Trading [Sec 66(2)] (Director Due Diligence):",
      "• Criterion: Director knew or ought to have known before insolvency commencement date that there was NO REASONABLE PROSPECT of avoiding CIRP.",
      "• Defence: Director exercised DUE DILIGENCE in minimizing potential loss to creditors.",
      "• Liability: Personal contribution ordered on directors."
    ],
    examinerTrap: "Fraudulent trading requires mens rea (intent to defraud) and applies to ANY person. Wrongful trading requires NO fraudulent intent—merely failure by a director to exercise due diligence when insolvency was imminent.",
    difficulty: "Hard"
  },
  {
    id: "setA-fc-59",
    framework: "SEBI (ICDR) Regulations, 2018: Minimum Promoters' Contribution & Lock-In",
    subtopic: "Economic Laws - SEBI Regulations (Chapter 8)",
    question: "What are the rules regarding Minimum Promoters' Contribution and lock-in periods for an Initial Public Offering (IPO)?",
    answer: [
      "Minimum Promoters' Contribution:",
      "• Promoters must contribute at least 20% OF THE POST-ISSUE CAPITAL in the public issue.",
      "Lock-In Periods for Minimum 20% Contribution:",
      "• Locked in for a period of 18 MONTHS from date of allotment in public issue (reduced from 3 years if majority funds not for capex).",
      "• If project involves capital expenditure, 3-year lock-in applies.",
      "Lock-In for Promoter Holding Beyond 20%:",
      "• Locked in for a period of 6 MONTHS from date of allotment (reduced from 1 year).",
      "Pledge Restrictions: Promoters cannot pledge locked-in shares during the lock-in period except to banks/FIs as security for loan granted to the company."
    ],
    examinerTrap: "Minimum promoters' contribution is calculated as 20% of POST-ISSUE capital, not pre-issue capital. Lock-in for the minimum 20% is 18 months, while excess promoter holding is locked in for 6 months.",
    difficulty: "Hard"
  }
];

const fileContent = `// ICAI Official SPOM Set A: Corporate and Economic Laws - 59 Statutory Flashcards Deck
// High-Yield Statutory Rules, Numerical Limits, Subsections, and Examiner Traps
import { Flashcard } from '../flashcardData';

export const setAFlashcards: Flashcard[] = ${JSON.stringify(flashcards, null, 2)};
`;

fs.writeFileSync('src/setA/setAFlashcards.ts', fileContent);
console.log('Successfully generated 59 comprehensive Set A flashcards in src/setA/setAFlashcards.ts!');
