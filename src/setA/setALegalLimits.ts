export interface LegalLimitItem {
  context: string;
  derivation: string;
  trigger: string;
}

export const SET_A_LEGAL_LIMITS: Record<string, LegalLimitItem> = {
  // Module 1 - Chapter 1: Appointment & Qualifications of Directors (Sec 149-172)
  "Woman Director Applicability Test (Sec 149(1) & Rule 3)": {
    context: "Module 1 Ch 1 — Section 149(1) Second Proviso read with Rule 3 of Companies (Appointment and Qualification of Directors) Rules, 2014.",
    derivation: "Mandatory for: (i) Every Listed Company; and (ii) Every other Public Company having Paid-up Share Capital >= Rs. 100 Crore OR Turnover >= Rs. 300 Crore as on the last date of latest audited financial statements.",
    trigger: "Intermittent vacancy of a Woman Director must be filled by the Board at the immediate next Board Meeting OR within 3 months from the date of such vacancy, whichever is LATER."
  },
  "Independent Director Unlisted Public Threshold (Sec 149(4) & Rule 4)": {
    context: "Module 1 Ch 1 — Section 149(4) read with Rule 4 for Board Independence in Public Companies.",
    derivation: "Every listed public company requires >= 1/3rd of total directors as IDs. Unlisted public companies require at least 2 IDs if: Paid-up Share Capital >= Rs. 10 Crore OR Turnover >= Rs. 100 Crore OR Aggregate Outstanding Loans, Debentures and Deposits > Rs. 50 Crore (strictly exceeding Rs. 50 Cr).",
    trigger: "Joint Ventures, Wholly Owned Subsidiaries (WOS), and Dormant Companies u/s 455 are exempt from appointing IDs even if they cross Rule 4 thresholds. Intermittent ID vacancy must be filled at immediate next BM or within 3 months, whichever is LATER."
  },
  "Rotational & Retiring Directors Calculation (Sec 152(6))": {
    context: "Module 1 Ch 1 — Section 152(6) & (7) Retirement by Rotation at Annual General Meetings of Public Companies.",
    derivation: "Step 1: Exclude Independent Directors (Sec 149(13)) and Nominee Directors appointed under special statute/agreement from Total Directors. Step 2: Rotational Pool = Not less than 2/3rd of remaining directors (any fraction is rounded UP to the next higher integer). Step 3: Directors retiring at AGM = 1/3rd of Rotational Pool (any fraction is rounded off to the NEAREST integer), longest in office retiring first.",
    trigger: "Private companies and 100% Government companies (where >= 51% paid-up capital is held by CG/SG) are exempt from Section 152(6) & (7)."
  },
  "Maximum Directorships Cap (Sec 165(1))": {
    context: "Module 1 Ch 1 — Section 165 Ceiling on Number of Directorships.",
    derivation: "A person shall not hold office as director (including alternate directorship) in more than 20 companies at the same time, out of which directorships in public companies (including private companies that are holding or subsidiary of a public company) shall not exceed 10.",
    trigger: "Directorships in Dormant Companies (Sec 455) and Section 8 (Non-Profit) Companies are EXCLUDED from the ceiling of 20. Penalty u/s 165(6): Rs. 2,000 per day after the first day, subject to maximum Rs. 2,00,000."
  },

  // Module 1 - Chapter 2: Appointment & Remuneration of Managerial Personnel (Sec 196-205)
  "Managerial Remuneration Profit Ceilings (Sec 197(1))": {
    context: "Module 1 Ch 2 — Section 197(1) Overall and Individual Managerial Remuneration Ceilings in Public Companies.",
    derivation: "Overall Cap: 11% of Net Profits calculated under Section 198 (Sitting fees up to Rs. 1,00,000 per meeting excluded). Sub-limits: (a) 1 MD/WTD/Manager: 5%; (b) More than 1 MD/WTD/Manager: 10% combined; (c) Non-Executive Directors (including IDs): 1% (if company has MD/WTD/Manager) or 3% (if no MD/WTD/Manager).",
    trigger: "Exceeding the 11% overall limit or the 5%/10%/1%/3% sub-limits requires approval by Special Resolution in General Meeting (plus prior approval of Bank/PFI/NCD holders if company has defaulted in repayment of dues)."
  },
  "Effective Capital Computation (Schedule V Explanation I)": {
    context: "Module 1 Ch 2 — Schedule V Part II Section II Slab Remuneration in case of Inadequate or No Profits.",
    derivation: "Effective Capital = [Paid-up Share Capital (excluding share application money/advances) + Share Premium + Reserves & Surplus (excluding Revaluation Reserve) + Long-Term Loans & Deposits repayable after 1 year (excluding working capital loans/overdrafts/interest due)] MINUS [Investments (except by investment company) + Accumulated Losses + Preliminary Expenses not written off].",
    trigger: "Computed as on the last date of the financial year preceding the financial year in which the appointment of managerial person is made. Slabs: < Rs. 5 Cr = Rs. 60L/12L; Rs. 5 Cr to < 100 Cr = Rs. 84L/17L; Rs. 100 Cr to < 250 Cr = Rs. 120L/24L; >= Rs. 250 Cr = Rs. 120L/24L + 0.01% of excess."
  },
  "Compensation for Loss of Office Cap (Sec 202(3))": {
    context: "Module 1 Ch 2 — Section 202 Payment of Compensation for Loss of Office.",
    derivation: "Eligible recipients: ONLY Managing Director, Whole-Time Director, or Manager (never ordinary NEDs). Maximum Quantum = Average Annual Remuneration actually earned during immediately preceding 3 years (or shorter period held) multiplied by the LOWER of: (i) Unexpired residue of his term, OR (ii) 3 years.",
    trigger: "No compensation is payable if the director resigns voluntarily (other than reconstruction/amalgamation), vacates office u/s 167, is guilty of fraud/breach of trust, or if winding up commences within 12 months of cessation and assets are insufficient to repay share capital."
  },
  "Secretarial Audit Applicability (Sec 204 & Rule 9)": {
    context: "Module 1 Ch 2 — Section 204 read with Rule 9 of Companies (Appointment and Remuneration of Managerial Personnel) Rules, 2014.",
    derivation: "Mandatory Secretarial Audit by a Practicing Company Secretary (Form MR-3 annexed to Board's Report) applies to: (1) Every Listed Company; (2) Every Public Company with Paid-up Share Capital >= Rs. 50 Crore; (3) Every Public Company with Turnover >= Rs. 250 Crore; or (4) Every Company (including a Private Company) having outstanding loans or borrowings from banks or public financial institutions >= Rs. 100 Crore.",
    trigger: "Financial thresholds are tested as on the last date of the latest audited financial statement. Penalty u/s 204(4): Rs. 2,00,000 on company, every officer, or the CS in practice."
  },

  // Module 1 - Chapter 3: Meetings of Board and its Powers (Sec 173-195)
  "Board Meeting Quorum Formula (Sec 174(1))": {
    context: "Module 1 Ch 3 — Section 174 Quorum for Meetings of Board of Directors.",
    derivation: "Standard Quorum = 1/3rd of Total Strength in office OR 2 Directors, whichever is HIGHER (any fraction is rounded off as ONE). Interested directors u/s 184(2) cannot be counted towards quorum for that item. If interested directors >= 2/3rd of total strength, remaining non-interested directors present (not being less than 2) shall be the quorum.",
    trigger: "For Section 8 (Non-Profit) Companies: Quorum is 8 Members OR 25% of its total strength, whichever is LESS, provided it shall not be less than 2 members."
  },
  "Section 180(1)(c) Borrowing Power Threshold": {
    context: "Module 1 Ch 3 — Section 180(1)(c) Restrictions on Powers of Board of Public Companies.",
    derivation: "Board cannot borrow money without prior Special Resolution where [Money to be Borrowed + Money Already Borrowed (excluding temporary loans obtained from company's bankers in the ordinary course of business)] EXCEEDS the aggregate of [Paid-up Share Capital + Free Reserves + Securities Premium].",
    trigger: "Temporary loans mean loans repayable on demand or within 6 months from the date of the loan (such as short-term cash credit/bill discounting), but exclude loans raised for capital expenditure. Private companies are completely exempt from Section 180."
  },
  "Section 186(2) Inter-Corporate Loan & Investment Ceiling": {
    context: "Module 1 Ch 3 — Section 186 Loan and Investment by Company.",
    derivation: "Aggregate of loans made, guarantees given, securities provided to any person/body corporate, and investments acquired in any body corporate shall not exceed the HIGHER of: (a) 60% of [Paid-up Share Capital + Free Reserves + Securities Premium Account]; OR (b) 100% of [Free Reserves + Securities Premium Account].",
    trigger: "Every loan/investment/guarantee requires UNANIMOUS consent of all directors present at a Board Meeting + prior approval of PFI (if term loan subsists and ceiling is crossed or default exists). Crossing the 60%/100% ceiling requires prior Special Resolution (loans/guarantees to WOS/JV and share acquisitions in WOS are exempt from SR). Rate of interest >= prevailing yield of 1/3/5/10-year G-Sec closest to tenor."
  },

  // Module 1 - Chapter 4: Inspection, Inquiry and Investigation (Sec 206-229)
  "Search & Seizure Book Retention Limit (Sec 209(2))": {
    context: "Module 1 Ch 4 — Section 209 Search and Seizure of Books and Papers by Registrar or Inspector.",
    derivation: "Registrar or Inspector must first obtain an order from the Special Court before entering, searching, and seizing books and papers. Seized books and papers must be returned as soon as may be, and in any case not later than 180th day after such seizure.",
    trigger: "The Registrar or Inspector may call for the books and papers again for a further period of 180 days by an order in writing if they are needed again, after taking extracts/copies before returning them."
  },
  "NCLT Asset Freezing & Security Restriction Cap (Sec 221 & 222)": {
    context: "Module 1 Ch 4 — Section 221 (Freezing of Assets) and Section 222 (Imposition of Restrictions upon Securities).",
    derivation: "During investigation or on reference/complaint by CG, creditor (>= Rs. 1 Lakh), or person having reasonable ground, the Tribunal (NCLT) may direct that removal, transfer, or disposal of funds/assets/properties shall not take place, or impose restrictions upon securities, for a specified period NOT exceeding 3 years.",
    trigger: "Any transfer/removal or issue/transfer of securities in contravention attracts a fine on the company of Rs. 1,00,000 to Rs. 25,00,000 and imprisonment up to 3 years and/or fine of Rs. 50,000 to Rs. 5,00,000 on every officer in default."
  },

  // Module 1 - Chapter 5: Compromises, Arrangements and Amalgamations (Sec 230-240)
  "Scheme Approval Dual Majority Test (Sec 230(6))": {
    context: "Module 1 Ch 5 — Section 230(6) Sanction of Compromise, Arrangement, or Amalgamation by NCLT.",
    derivation: "At the meeting ordered by NCLT, the scheme must be approved by a MAJORITY IN NUMBER (> 50% of persons present and voting) representing THREE-FOURTHS (>= 75%) IN VALUE of the creditors (or class of creditors) or members (or class of members), as the case may be, voting in person, by proxy, or by postal ballot.",
    trigger: "Compare with Fast-Track Merger u/s 233 (Small Companies / Holding & WOS / Start-ups): requires members holding >= 90% of TOTAL number of shares AND creditors representing >= 9/10th (90%) in value of TOTAL creditors."
  },
  "Objection Locus Standi Threshold (Sec 230(4))": {
    context: "Module 1 Ch 5 — Proviso to Section 230(4) Eligibility to Object to a Scheme of Compromise or Arrangement.",
    derivation: "Any objection to a compromise or arrangement shall be made ONLY by: (a) Persons holding not less than 10% of the shareholding; OR (b) Persons having outstanding debt amounting to not less than 5% of the total outstanding debt.",
    trigger: "Both the 10% shareholding and 5% debt thresholds are tested strictly as per the latest audited financial statement of the company."
  },
  "Section 235 Dissenting Squeeze-Out Timeline": {
    context: "Module 1 Ch 5 — Section 235 Power to Acquire Shares of Shareholders Dissenting from Scheme or Contract Approved by Majority.",
    derivation: "Step 1: Transferee company makes offer to transferor company's shareholders. Step 2: Within 4 months after making the offer, scheme is approved by holders of >= 9/10th (90%) in value of the shares whose transfer is involved (excluding shares already held by transferee/nominee/subsidiary). Step 3: Within 2 months after expiry of the 4 months, transferee gives notice in Form CAA-14 to acquire dissenting shares. Step 4: Dissenting shareholder may apply to NCLT within 1 month of notice.",
    trigger: "If NCLT does not order otherwise on dissenting shareholder's application within 1 month, transferee company is entitled and bound to acquire those shares on the same terms."
  },

  // Module 1 - Chapter 6: Prevention of Oppression and Mismanagement (Sec 241-246)
  "Section 244 Oppression Petition Eligibility": {
    context: "Module 1 Ch 6 — Section 244(1) Right to Apply under Section 241 for Oppression and Mismanagement.",
    derivation: "In the case of a company having a share capital: (i) Not less than 100 members of the company, OR (ii) Not less than 1/10th (10%) of the total number of its members, whichever is LESS; OR (iii) Any member or members holding not less than 1/10th (10%) of the issued share capital of the company (subject to the condition that applicant(s) has paid all calls and other sums due on his shares). In the case of a company NOT having a share capital: Not less than 1/5th (20%) of the total number of its members.",
    trigger: "The Tribunal (NCLT) may, on an application made to it in this behalf, waive all or any of the eligibility requirements under Proviso to Section 244(1). Joint holders of a share are counted as ONE member."
  },
  "Section 245 Class Action Suit Thresholds": {
    context: "Module 1 Ch 6 — Section 245(3) read with Rule 84 of NCLT Rules for Class Action Suits by Members or Depositors.",
    derivation: "For Members (company having share capital): >= 100 members OR >= 5% of total number of members, whichever is LESS; OR member(s) holding >= 5% of issued share capital (in case of an UNLISTED company) or >= 2% of issued share capital (in case of a LISTED company). For Depositors: >= 100 depositors OR >= 5% of total number of depositors, whichever is LESS; OR depositor(s) to whom the company owes >= 5% of total deposits.",
    trigger: "Section 245 does NOT apply to a Banking Company (Sec 245(9)). Frivolous or vexatious applications are rejected with a cost penalty up to Rs. 1,00,000 payable to the opposite party."
  },

  // Module 1 - Chapter 7: Winding Up (Sec 270-365)
  "Contributory Holding Period Requirement (Sec 272(2))": {
    context: "Module 1 Ch 7 — Section 272(2) Eligibility of a Contributory to Present a Winding-Up Petition.",
    derivation: "A contributory is entitled to present a petition for winding up (even if he is the holder of fully paid-up shares or the company has no surplus assets) ONLY IF: (a) Shares were originally allotted to him; OR (b) Shares have been held by him and registered in his name for at least 6 months during the 18 months immediately before the commencement of the winding up; OR (c) Shares have devolved on him through the death of a former holder.",
    trigger: "The Tribunal shall pass an order under Section 273(1) within 90 days from the date of presentation of the winding-up petition."
  },
  "Clawback Look-Back Periods in Winding Up (Sec 328, 329 & 332)": {
    context: "Module 1 Ch 7 — Sections 328 (Fraudulent Preference), 329 (Transfers Not in Good Faith), and 332 (Effect of Floating Charge).",
    derivation: "(1) Fraudulent Preference (Sec 328): Transaction favoring a creditor within 6 months before presentation of winding-up application. (2) Avoidance of Voluntary Transfer (Sec 329): Transfer of property/delivery of goods not in ordinary course of business or not in good faith for valuable consideration within 1 year before presentation of petition. (3) Floating Charge Invalidity (Sec 332): Floating charge created within 12 months immediately preceding commencement of winding up is invalid (unless company was solvent immediately after creation), except for cash actually paid at/subsequent to creation + interest @ 5% p.a.",
    trigger: "Overriding preferential payments u/s 326 cover workmen's dues for 24 months and secured creditors pari passu; Liquidator may disclaim onerous property u/s 333 within 12 months."
  },

  // Module 1 - Chapter 8: Miscellaneous Provisions (Sec 247-252, 394-406 & 447-470)
  "Section 252 Strike-Off Restoration Timelines": {
    context: "Module 1 Ch 8 — Section 252 Appeal to Tribunal for Restoration of Struck-Off Company Name.",
    derivation: "(1) Under Sec 252(1): Any person aggrieved by an order of the Registrar notifying a company as dissolved u/s 248 may file an appeal to the Tribunal within 3 years from the date of the order of the Registrar (Registrar may also apply within 3 years if struck off on incorrect information). (2) Under Sec 252(3): The company, or any member, creditor, or workman thereof feeling aggrieved may make an application to the Tribunal before the expiry of 20 years from the publication in the Official Gazette.",
    trigger: "Voluntary strike-off application in Form STK-2 u/s 248(2) requires extinguishing all liabilities and passing a Special Resolution (or consent of 75% members in terms of paid-up share capital), and is barred u/s 249 if name/registered office was changed or property disposed of within the preceding 3 months."
  },
  "Nidhi Company Core Statutory Ratios (Nidhi Rules, 2014)": {
    context: "Module 1 Ch 8 — Section 406 read with Nidhi Rules, 2014 (as amended).",
    derivation: "Minimum Paid-up Equity Capital = Rs. 10 Lakhs; Minimum Net Owned Funds (NOF) = Rs. 20 Lakhs; Minimum Members = 200 (Form NDH-4 filed within 120 days of incorporation); NOF to Deposits Ratio <= 1 : 20; Unencumbered Term Deposits >= 10% of outstanding deposits; Maximum Interest Rate on Loans = 7.5% above highest rate offered on deposits; Maximum Dividend = 25%; Locker Rent Income <= 20% of Gross Income.",
    trigger: "A Nidhi Director can hold office for up to 10 consecutive years and is eligible for re-appointment ONLY after a cooling-off period of 2 years. Individual Auditor: 1 term of 5 years; Audit Firm: max 2 terms of 5 consecutive years."
  },
  "Section 447 Fraud Severity Threshold": {
    context: "Module 1 Ch 8 — Section 447 Punishment for Fraud under Companies Act, 2013.",
    derivation: "Case A — Fraud involving an amount of at least Rs. 10,00,000 (Rs. 10 Lakh) OR 1% of the Turnover of the company, whichever is LOWER: Imprisonment of 6 months to 10 years (minimum 3 years if fraud involves public interest) AND Fine of 1x to 3x the amount involved in the fraud. Case B — Fraud involving < Rs. 10 Lakh or < 1% of Turnover (whichever is lower) AND NOT involving public interest: Imprisonment up to 5 years OR Fine up to Rs. 50,00,000 (Rs. 50 Lakh) OR with both.",
    trigger: "Offences under Section 447 are cognizable and non-bailable under Section 212(6)."
  },
  "Dormant Company Retention & Board Quotas (Sec 455)": {
    context: "Module 1 Ch 8 — Section 455 Dormant Company Status and Retention.",
    derivation: "An inactive company (not carrying on business/operation or no significant accounting transaction or non-filing of financial statements and annual returns during the last 2 financial years) may apply in Form MSC-1 after Special Resolution or consent of >= 3/4th shareholders in value. Minimum Directors: 3 (Public), 2 (Private), 1 (OPC). Annual return of financial position in Form MSC-3 (audited by CA in practice) must be filed within 30 days from the end of each financial year.",
    trigger: "Maximum tenure as a Dormant Company is 5 consecutive years; if a company remains dormant for more than 5 consecutive years, the Registrar shall strike off its name."
  },

  // Module 1 - Chapter 9: Adjudication, Special Courts, NCLT and Appellate Tribunal (Sec 407-454A)
  "NCLT -> NCLAT -> Supreme Court Appeal & Rectification Timelines": {
    context: "Module 1 Ch 9 — Sections 420(2), 421, 422, and 423 Appellate Hierarchy and Rectification.",
    derivation: "(1) Rectification of Mistake Apparent from Record by NCLT (Sec 420(2)): Within 2 years from date of order (if no appeal preferred). (2) Appeal from NCLT to NCLAT (Sec 421): Within 45 days from receipt of copy of order (+ up to 45 days extension by NCLAT on sufficient cause). (3) Appeal from NCLAT to Supreme Court on a question of law (Sec 423): Within 60 days from receipt of order (+ up to 60 days extension by Supreme Court on sufficient cause). (4) Target Disposal Period (Sec 422): 3 months (+ up to 90 days extension).",
    trigger: "No appeal lies to NCLAT from an order made by NCLT with the consent of the parties (Sec 421(2))."
  },
  "Compounding Jurisdiction & Summary Trial Limits (Sec 441 & 436)": {
    context: "Module 1 Ch 9 — Section 441 (Compounding of Certain Offences) and Section 436 (Summary Trial by Special Court).",
    derivation: "Compounding Jurisdiction (Sec 441): (i) Where maximum amount of fine which may be imposed does NOT exceed Rs. 25,00,000 (Rs. 25 Lakhs): Compounded by Regional Director or officer authorized by Central Government; (ii) Where maximum fine EXCEEDS Rs. 25,00,000: Compounded by the Tribunal (NCLT). Summary Trial by Special Court (Sec 436(2)): Applicable to offences punishable with fine only or imprisonment for a term not exceeding 3 years; maximum sentence of imprisonment in a summary trial is 1 year.",
    trigger: "Offences punishable with Imprisonment ONLY, or with Imprisonment AND Fine (mandatory imprisonment), or where an investigation has been initiated/is pending, or where a similar offence was compounded within the preceding 3 years, CANNOT be compounded."
  },
  "Section 446B Lesser Penalty & Section 454A Repeated Default": {
    context: "Module 1 Ch 9 — Sections 446B (Lesser Penalties), 454 (Adjudication), and 454A (Penalty for Repeated Default).",
    derivation: "(1) Lesser Penalty for OPC, Small Company, Start-up Company, or Producer Company (Sec 446B): Liable to a penalty not exceeding one-half (50%) of the penalty specified in such provisions, subject to a maximum cap of Rs. 2,00,000 for a company and Rs. 1,00,000 for an officer in default/other person. (2) Repeated Default (Sec 454A): Committing the same default again within 3 years from the date of order imposing penalty by Adjudicating Officer or RD attracts a penalty equal to TWICE (2x) the penalty provided for such default.",
    trigger: "Appeal against an order of the Adjudicating Officer (RoC) under Sec 454(6) lies to the Regional Director within 60 days from receipt of the order (+ up to 30 days on sufficient cause)."
  },

  // Module 1 - Chapter 10: e-Filing, MCA21 Version 3.0 & Case Studies Relating to Ethics (Sec 396-404)
  "XBRL Filing Mandatory Thresholds (Rule 3)": {
    context: "Module 1 Ch 10 — Section 398 read with Rule 3 of Companies (Filing of Documents and Forms in eXtensible Business Reporting Language) Rules, 2015.",
    derivation: "Mandatory filing of financial statements in Form AOC-4 XBRL applies to: (i) Companies listed with any stock exchange in India and their Indian subsidiaries; (ii) Companies having Paid-up Capital >= Rs. 5 Crore; (iii) Companies having Turnover >= Rs. 100 Crore; or (iv) All companies required to prepare financial statements in accordance with Companies (Indian Accounting Standards) Rules, 2015.",
    trigger: "Exempt Sectors: Non-Banking Financial Companies (NBFCs), Housing Finance Companies (HFCs), Banking Companies, and Insurance Companies. Once a company becomes covered under XBRL rules, it must continue to file in XBRL forever even if it subsequently falls below the thresholds."
  },
  "Section 403 Delayed Filing Additional Fee (Sec 92 & 137)": {
    context: "Module 1 Ch 10 — Section 403 Fee for Filing, etc., and Higher Additional Fees.",
    derivation: "If Annual Return (Sec 92) or Financial Statement (Sec 137) is not submitted within the prescribed time, it may be submitted after expiry on payment of an additional fee which shall NOT be less than Rs. 100 per day of default. Where there is default on 2 or more occasions in submitting, filing, registering, or recording the document, it may be filed on payment of a Higher Additional Fee which shall NOT be less than TWICE (2x) the normal additional fee.",
    trigger: "Payment of additional fees under Sec 403 does not absolve the company and its officers from adjudication penalties under Sec 92(5), Sec 137(3), or Sec 454 unless rectified within 30 days of RoC adjudication notice u/s 454(3) proviso."
  },

  // Module 2 (Part I - Sec B) - Chapter 1: SEBI Act & Regulations (LODR, ICDR, SAST, PIT)
  "SEBI (ICDR) Main Board IPO Eligibility (Reg 6(1) vs 6(2))": {
    context: "Module 2 Part I Ch 1 — Regulation 6(1) and 6(2) of SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018.",
    derivation: "Reg 6(1) Profitability Route: (a) Net Tangible Assets >= Rs. 3 Crore in each of preceding 3 full years (monetary assets <= 50% unless firm commitment); (b) Average Operating Profit >= Rs. 15 Crore during preceding 3 years with operating profit in each of those 3 years; (c) Net Worth >= Rs. 1 Crore in each of preceding 3 full years; (d) If name changed in last 1 year, >= 50% revenue from new-name activity. Reg 6(2) QIB Route (if Reg 6(1) not satisfied): Issue through Book-Building process with at least 75% of net offer allotted to Qualified Institutional Buyers (QIBs).",
    trigger: "Minimum Promoters' Contribution (Reg 14) = 20% of post-issue capital, locked in for 18 months (3 years if majority of issue proceeds is for capital expenditure); excess promoter holding locked in for 6 months (1 year if CapEx)."
  },
  "SEBI (SAST) Open Offer Triggers & Size (Reg 3 & 7)": {
    context: "Module 2 Part I Ch 1 — Regulations 3, 4, 6, and 7 of SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011.",
    derivation: "(1) Initial Trigger (Reg 3(1)): Acquirer + PACs acquiring shares/voting rights entitling them to exercise 25% or more voting rights in Target Company. (2) Creeping Acquisition Trigger (Reg 3(2)): Acquirer + PACs already holding >= 25% (but < 75%) acquiring more than 5% additional gross voting rights in any financial year. (3) Control Trigger (Reg 4): Acquiring control over Target Company irrespective of shareholding. Mandatory Open Offer Size (Reg 7(1)): At least 26% of total shares of the Target Company.",
    trigger: "For the 5% creeping acquisition limit under Reg 3(2), gross acquisitions alone are taken into account without netting off any disposal/sale of shares during the financial year."
  },
  "SEBI (PIT) Continual Disclosure & Penalty (Reg 7(2) & Sec 15G)": {
    context: "Module 2 Part I Ch 1 — Regulation 7(2) of SEBI (Prohibition of Insider Trading) Regulations, 2015 and Section 15G of SEBI Act, 1992.",
    derivation: "Continual Disclosure (Reg 7(2)): Every promoter, member of promoter group, designated person, and director must notify the company within 2 trading days of such transaction if the value of securities traded (whether in one transaction or a series of transactions) over any calendar quarter aggregates to a traded value in excess of Rs. 10,00,000 (Rs. 10 Lakhs); the company must notify the stock exchange within 2 trading days of receipt. Penalty for Insider Trading (Sec 15G): Minimum Rs. 10 Lakhs up to Rs. 25 Crore OR 3 times the amount of profits made out of insider trading, whichever is HIGHER.",
    trigger: "Trading Plan (Reg 5) requires a cool-off period of 120 calendar days (6 months) from public disclosure, minimum 12 months coverage, and is irrevocable once approved. Contra-trade restriction for designated persons = 6 months."
  },

  // Module 2 (Part II) - Chapter 1: FEMA, 1999
  "FEMA LRS & Corporate Consultancy Thresholds (Schedule III)": {
    context: "Module 2 Part II Ch 1 — Section 5 of FEMA, 1999 read with Schedule III of FEM (Current Account Transactions) Rules, 2000.",
    derivation: "(1) Individuals (Liberalised Remittance Scheme - LRS): Up to USD 250,000 per financial year for all permitted current and capital account transactions combined. (2) Non-Individuals (Corporates) requiring prior RBI approval above: (a) Donations > Min(1% of FX earnings in 3 preceding FYs, USD 5,000,000); (b) Commission to agents abroad for sale of residential flats/commercial plots in India > Max(USD 25,000, 5% of inward remittance); (c) Consultancy services procured from outside India > USD 10,000,000 per project (infrastructure) or > USD 1,000,000 per project (other projects); (d) Reimbursement of pre-incorporation expenses > Max(5% of investment brought into India, USD 100,000).",
    trigger: "Unused foreign exchange drawn for travel must be surrendered within 180 days from return to India (may retain up to USD 2,000 in notes/travellers' cheques and unlimited foreign coins). Export realization timeline = 9 months (15 months for overseas warehouse)."
  },
  "FEMA Section 13 Penalty & Section 15 Compounding Timeline": {
    context: "Module 2 Part II Ch 1 — Sections 13, 14, and 15 of the Foreign Exchange Management Act, 1999.",
    derivation: "Section 13(1) Penalty: Up to THREE TIMES (3x) the sum involved in such contravention where the amount is quantifiable, OR up to Rs. 2,00,000 where the amount is not quantifiable; and where such contravention is a continuing one, a further penalty up to Rs. 5,000 for every day after the first day. Section 15 Compounding: Any contravention under Sec 13 may be compounded within 180 days from the date of receipt of application by the Directorate of Enforcement or RBI.",
    trigger: "Failure to make full payment of penalty within 90 days from service of notice renders the defaulter liable to civil imprisonment under Section 14 (up to 6 months if demand <= Rs. 1 Crore; up to 3 years if demand > Rs. 1 Crore)."
  },

  // Module 2 (Part II) - Chapter 2: FCRA, 2010
  "FCRA Core Monetary & Percentage Thresholds": {
    context: "Module 2 Part II Ch 2 — Sections 2(1)(h), 4(e), 6, 7, 8(1)(b), and 12 of the Foreign Contribution (Regulation) Act, 2010.",
    derivation: "(1) Personal Gift Exemption (Sec 2(1)(h)): Market value in India <= Rs. 1,00,000 is not treated as foreign contribution. (2) Relative Gift Reporting (Rule 6): Foreign contribution from a relative exceeding Rs. 10,00,000 (Rs. 10 Lakhs) in a financial year must be intimated to Central Govt in Form FC-1 within 3 months. (3) Emergent Medical Aid Abroad (Sec 6): Intimate within 1 month if value > Rs. 1,00,000. (4) Administrative Expenses Cap (Sec 8(1)(b)): Maximum 20% of foreign contribution received in a FY (prior CG approval required above 20%). (5) Regular Registration Eligibility (Sec 12): 3 years existence + >= Rs. 15,00,000 spent on core activities.",
    trigger: "Section 7 imposes an ABSOLUTE (100%) prohibition on transferring foreign contribution to any other person (even if the recipient holds valid FCRA registration)."
  },
  "FCRA Registration, Suspension & Cancellation Timelines (Sec 12–16)": {
    context: "Module 2 Part II Ch 2 — Sections 12, 13, 14, 16, and 17 of FCRA, 2010.",
    derivation: "(1) Certificate Grant/Rejection (Sec 12): Within 90 days of application; Certificate Validity = 5 years. (2) Renewal Application (Sec 16): Within 6 months before expiry of certificate. (3) Suspension of Certificate (Sec 13): Up to 180 days (+ further extension up to 180 days); during suspension, up to 25% of unutilized amount may be spent with prior CG approval. (4) Cooling-Off Bar after Cancellation (Sec 14(3)): Ineligible for registration or prior permission for 3 years from the date of cancellation.",
    trigger: "Under Section 17(1), primary foreign contribution must be received EXCLUSIVELY in the designated 'FCRA Account' opened in State Bank of India (SBI), New Delhi Main Branch (11, Sansad Marg)."
  },

  // Module 2 (Part II) - Chapter 3: IBC, 2016
  "CIRP Duration & CoC Voting Matrix (Sec 12, 12A, 21 & 30)": {
    context: "Module 2 Part II Ch 3 — Sections 12, 12A, 21, 22, 27, 28, 30, and 33 of the Insolvency and Bankruptcy Code, 2016.",
    derivation: "CIRP Timeline (Sec 12): 180 days from insolvency commencement date + one-time extension up to 90 days (on 66% CoC vote) subject to a mandatory outer limit of 330 days (including extensions and legal proceedings). CoC Voting Share Matrix: (a) 51% Vote: Routine decisions (Sec 21(8)); (b) 66% Vote: Confirming/replacing IRP/RP (Sec 22/27), 90-day extension (Sec 12(2)), Section 28 non-routine actions, Approval of Resolution Plan (Sec 30(4)), and Initiation of Liquidation (Sec 33(2)); (c) 90% Vote: Withdrawal of admitted CIRP application (Sec 12A).",
    trigger: "Related-party Financial Creditors are completely excluded from participation, representation, or voting in the Committee of Creditors (Sec 21(2) Proviso). PPIRP for MSMEs (Sec 54D) must be completed within 120 days (plan submitted within 90 days)."
  },
  "Real Estate Allottees / Class Creditors Joint Filing Threshold (Sec 7(1) Proviso)": {
    context: "Module 2 Part II Ch 3 — Second Proviso to Section 7(1) and Section 4 of the Insolvency and Bankruptcy Code, 2016.",
    derivation: "Minimum Default Threshold (Sec 4): Rs. 1 Crore (Rs. 10 Lakhs for MSME PPIRP u/s 54A). For Financial Creditors who are allottees under a real estate project OR security/deposit holders of a class, an application for initiating CIRP against the Corporate Debtor shall be filed jointly by NOT LESS THAN 100 of such creditors in the same class OR NOT LESS THAN 10% of the total number of such creditors in the same class, whichever is LESS.",
    trigger: "For allottees under a real estate project, all 100 / 10% joint applicants must belong to the SAME real estate project."
  }
};
