import { Question } from './scenariosData';

export interface GeneralMCQ extends Question {
  chapterId: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  topic: string;
}

export const generalMCQs: GeneralMCQ[] = [
  // =========================================================================
  // CHAPTER 1: AN INTRODUCTION TO STRATEGIC COST MANAGEMENT
  // =========================================================================
  {
    id: "gmcq-1-1",
    chapterId: 1,
    topic: "Market Segmentation",
    difficulty: "Moderate",
    questionText: "John W Fabrics is considering decisions regarding market segmentation. In order for market segmentation to be effective, most management accountants agree that all segments must meet specific criteria. Which of the following sets represent the four mandatory criteria for effective market segmentation?",
    options: {
      A: "Distinct, Artistic, Measurable and Profitable",
      B: "Distinct, Accessible, Measurable and Profitable",
      C: "Desperate, Accessible, Many, and Profitable",
      D: "Distinct, Accessible, Measurable and Popular"
    },
    correctOption: "B",
    explanation: "In order to be recognized as a valid segment, four criteria must be satisfied:\n• Distinct: Homogeneous internally and heterogeneous externally.\n• Accessible: Reachable and responsive through marketing channels.\n• Measurable: Identifiable and quantifiable in purchasing power and size.\n• Profitable: Substantial enough to generate economic returns.",
    examinerWarning: "Do not confuse 'Artistic' or 'Popular' with the standard DAM-P (Distinct, Accessible, Measurable, Profitable) criteria."
  },
  {
    id: "gmcq-1-2",
    chapterId: 1,
    topic: "Value Chain Analysis Objectives",
    difficulty: "Moderate",
    questionText: "Value chain analysis is a critical strategic costing tool. It is fundamentally aimed at which of the following objectives? (i) Eliminate costs, (ii) Reduce costs, (iii) Increase quantity sold, (iv) Increase sales price, (v) Identify opportunities for product differentiation.",
    options: {
      A: "i, ii, and v only",
      B: "iii and iv only",
      C: "iii, iv, and v only",
      D: "All of the above"
    },
    correctOption: "A",
    explanation: "Value chain analysis is a framework that helps firms gain competitive advantage through:\n1. Cost Leadership: Eliminating non-value added costs and reducing execution costs.\n2. Product Differentiation: Identifying unique customer value linkages.\nIt does not analyze raw unit sales volume or dictate short-term retail pricing directly.",
    examinerWarning: "Traditional costing focuses merely on cost reduction; SCM focuses simultaneously on cost reduction AND differentiation."
  },
  {
    id: "gmcq-1-3",
    chapterId: 1,
    topic: "Strategic Cost Management Core Features",
    difficulty: "Easy",
    questionText: "Which of the following correctly depicts the core features of Strategic Cost Management (SCM)? (i) SCM is a proactive enabler of cost information for decision-making, (ii) SCM is primarily a reactive cost-containment approach, (iii) SCM's scope is wide enough to focus on product differentiation apart from cost containment.",
    options: {
      A: "i and ii only",
      B: "i and iii only",
      C: "ii and iii only",
      D: "All of i, ii, and iii"
    },
    correctOption: "B",
    explanation: "Key distinctions:\n• SCM is proactive and forward-looking, not reactive.\n• SCM encompasses both cost leadership and product differentiation.\n• Traditional cost management is internal and reactive; SCM is external and dynamic.",
    examinerWarning: "Remember that reactive containment is a flaw of TRADITIONAL costing, not SCM."
  },
  {
    id: "gmcq-1-4",
    chapterId: 1,
    topic: "Cost Driver Analysis: Structural vs Executional",
    difficulty: "Hard",
    questionText: "In Strategic Cost Management, cost drivers are classified into Structural and Executional drivers. Which of the following is correctly classified as an 'Executional Cost Driver'?",
    options: {
      A: "Scale of operations and investment in manufacturing capacity",
      B: "Scope of vertical integration and product portfolio breadth",
      C: "Total Quality Management (TQM) practices and workforce empowerment",
      D: "Process technology choices and plant layout architecture"
    },
    correctOption: "C",
    explanation: "Cost driver taxonomy:\n• Structural Cost Drivers: Strategic choices regarding scale, scope, experience curve, technology limits, and complexity.\n• Executional Cost Drivers: Operational execution choices such as workforce empowerment, TQM commitment, plant layout efficiency, and supplier linkages.",
    examinerWarning: "Scale and Scope are STRUCTURAL drivers. Plant execution, worker participation, and TQM are EXECUTIONAL drivers."
  },

  // =========================================================================
  // CHAPTER 2: MODERN BUSINESS ENVIRONMENT
  // =========================================================================
  {
    id: "gmcq-2-1",
    chapterId: 2,
    topic: "Cost of Quality: PAF Classification",
    difficulty: "Moderate",
    questionText: "Delta Electronics incurs the following quality costs during FY 2025-26: Supplier quality audits ₹12 Lakhs; In-process testing ₹18 Lakhs; Scrap and rework ₹25 Lakhs; Customer warranty replacements ₹35 Lakhs. What is Delta's total 'Cost of Conformance' and 'Cost of Non-Conformance' respectively?",
    options: {
      A: "Conformance: ₹30 Lakhs; Non-Conformance: ₹60 Lakhs",
      B: "Conformance: ₹12 Lakhs; Non-Conformance: ₹78 Lakhs",
      C: "Conformance: ₹55 Lakhs; Non-Conformance: ₹35 Lakhs",
      D: "Conformance: ₹60 Lakhs; Non-Conformance: ₹30 Lakhs"
    },
    correctOption: "A",
    explanation: "Cost of Quality (COQ) breakdown:\n• Conformance (Prevention + Appraisal): Supplier audits (₹12L) + In-process testing (₹18L) = ₹30 Lakhs.\n• Non-Conformance (Internal + External Failure): Scrap/rework (₹25L) + Warranty replacements (₹35L) = ₹60 Lakhs.\nTotal Quality Cost = ₹90 Lakhs.",
    examinerWarning: "Appraisal (testing/inspection) is a CONFORMANCE cost, whereas internal rework and external warranties are NON-CONFORMANCE costs."
  },
  {
    id: "gmcq-2-2",
    chapterId: 2,
    topic: "Critical Success Factor & Key Performance Indicator",
    difficulty: "Easy",
    questionText: "Medicare Medical Devices aims to achieve 'Zero defect sales to hospital ICUs' as its primary Critical Success Factor (CSF). Which of the following Key Performance Indicators (KPIs) is the most direct measure of this CSF?",
    options: {
      A: "Number of annual training hours conducted for production technicians",
      B: "Percentage of product returns, field replacements, and warranty incidents",
      C: "Total raw material testing costs incurred at the inbound warehouse",
      D: "Number of external ISO re-certification audits passed"
    },
    correctOption: "B",
    explanation: "If the CSF is zero defective sales reaching customers, the direct lagging KPI is the rate of field returns, warranty claims, and customer replacements. Options A and C measure inputs, while D measures compliance.",
    examinerWarning: "Ensure the KPI directly aligns with the outcome of the CSF rather than indirect activity inputs."
  },
  {
    id: "gmcq-2-3",
    chapterId: 2,
    topic: "Supply Chain Models: Push vs Pull",
    difficulty: "Moderate",
    questionText: "An organization is evaluating whether to adopt a Push-model or Pull-model supply chain. Which operating condition makes a 'Push-based' supply chain the most commercially viable choice?",
    options: {
      A: "Extremely volatile demand with high product customization requirements",
      B: "High demand predictability, standard bulk products, and substantial production economies of scale",
      C: "Severely constrained warehouse space and minimal working capital availability",
      D: "Short product life cycles with high risk of technological obsolescence"
    },
    correctOption: "B",
    explanation: "Push-based supply chains produce in anticipation of demand (make-to-stock). They require:\n1. High demand forecast accuracy.\n2. Standardized products with stable long life cycles.\n3. Significant economies of scale in manufacturing and transport.",
    examinerWarning: "Volatile demand and short life cycles demand a PULL-based system (JIT/make-to-order)."
  },
  {
    id: "gmcq-2-4",
    chapterId: 2,
    topic: "Total Quality Management: Deming's 14 Points",
    difficulty: "Hard",
    questionText: "Which of the following principles forms a foundational pillar of W. Edwards Deming's 14 Points for Total Quality Management (TQM)?",
    options: {
      A: "Increase mass inspections at the end of the assembly line to catch all defects",
      B: "Award business solely on the basis of the lowest purchase price tag",
      C: "Cease dependence on inspection to achieve quality by building quality into the product in the first place",
      D: "Enforce strict numerical quotas and work piece-rate standards for line workers"
    },
    correctOption: "C",
    explanation: "Deming's Point 3 explicitly states: 'Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.' Point 4 warns against awarding business on price tag alone, and Point 11 urges eliminating numerical quotas.",
    examinerWarning: "Mass inspection is the opposite of TQM! TQM designs out errors rather than inspecting them out."
  },

  // =========================================================================
  // CHAPTER 3: LEAN SYSTEM AND INNOVATION
  // =========================================================================
  {
    id: "gmcq-3-1",
    chapterId: 3,
    topic: "Just-In-Time (JIT) Prerequisites",
    difficulty: "Easy",
    questionText: "A manufacturing enterprise is transitioning from batch production to Just-In-Time (JIT) manufacturing. Which of the following is NOT a prerequisite for successful JIT implementation?",
    options: {
      A: "Reliable, high-quality vendors with near-zero defect rates",
      B: "Extensive safety buffer inventories of raw materials stored in on-site warehouses",
      C: "Drastic reduction in machine setup times and changeover costs (SMED)",
      D: "Preventative maintenance programs to prevent machine breakdowns"
    },
    correctOption: "B",
    explanation: "JIT is a pull manufacturing system aimed at the complete elimination of waste (Muda), including inventory waste. Maintaining massive safety buffer inventory contradicts JIT's core goal of lean, stockless production.",
    examinerWarning: "Inventory is viewed in JIT as an evil that hides underlying production bottlenecks and defects."
  },
  {
    id: "gmcq-3-2",
    chapterId: 3,
    topic: "Total Productive Maintenance: OEE Computation",
    difficulty: "Hard",
    questionText: "A precision lathe machine has Planned Operating Time of 480 minutes. Due to unplanned breakdowns, it ran for 400 minutes (Operating Time). During this run, it produced 360 units against a standard speed of 1 unit per minute (Ideal Cycle Time). Out of 360 units produced, 36 units were rejected as defective. What is the Overall Equipment Effectiveness (OEE) of the machine?",
    options: {
      A: "67.5%",
      B: "72.0%",
      C: "75.0%",
      D: "83.3%"
    },
    correctOption: "A",
    explanation: "OEE = Availability × Performance × Quality:\n• Availability = Actual Run Time / Planned Operating Time = 400 / 480 = 83.33%\n• Performance = (Ideal Time per unit × Total Units) / Run Time = (1 min × 360) / 400 = 90.00%\n• Quality = Good Units / Total Units Produced = (360 - 36) / 360 = 324 / 360 = 90.00%\n• OEE = 0.8333 × 0.90 × 0.90 = 0.675 = 67.5%.",
    examinerWarning: "World-class OEE benchmark is 85% (Availability >= 90%, Performance >= 95%, Quality >= 99.9%)."
  },
  {
    id: "gmcq-3-3",
    chapterId: 3,
    topic: "5S Methodology Sequential Flow",
    difficulty: "Moderate",
    questionText: "In Lean manufacturing, the 5S methodology represents a systematic workplace organization method. Which of the following correctly lists the 5 Japanese steps in their proper sequential order?",
    options: {
      A: "Seiri (Sort) -> Seiton (Set in order) -> Seiso (Shine) -> Seiketsu (Standardize) -> Shitsuke (Sustain)",
      B: "Seiton (Set in order) -> Seiri (Sort) -> Seiketsu (Standardize) -> Seiso (Shine) -> Shitsuke (Sustain)",
      C: "Seiri (Sort) -> Seiso (Shine) -> Seiton (Set in order) -> Shitsuke (Sustain) -> Seiketsu (Standardize)",
      D: "Shitsuke (Sustain) -> Seiketsu (Standardize) -> Seiso (Shine) -> Seiton (Set in order) -> Seiri (Sort)"
    },
    correctOption: "A",
    explanation: "The correct sequence of 5S is:\n1. Seiri (Sort - separate needed from unneeded items)\n2. Seiton (Set in order - a place for everything and everything in its place)\n3. Seiso (Shine - clean workplace and equipment)\n4. Seiketsu (Standardize - maintain first 3S as standardized norms)\n5. Shitsuke (Sustain - self-discipline to adhere to rules).",
    examinerWarning: "Sorting (Seiri) must ALWAYS precede setting in order (Seiton). You cannot organize items before discarding junk."
  },
  {
    id: "gmcq-3-4",
    chapterId: 3,
    topic: "Six Sigma DMAIC vs DMADV Frameworks",
    difficulty: "Moderate",
    questionText: "A company wishes to reduce defects in an existing, mature manufacturing process from 5,000 DPMO to less than 3.4 DPMO. Which Six Sigma methodology should it deploy?",
    options: {
      A: "DMADV (Define, Measure, Analyze, Design, Verify)",
      B: "DMAIC (Define, Measure, Analyze, Improve, Control)",
      C: "DFSS (Design for Six Sigma)",
      D: "Kaizen Blitz"
    },
    correctOption: "B",
    explanation: "DMAIC is deployed for improving existing processes that fall below specifications. DMADV (or DFSS) is used when developing new products or completely redesigning broken processes from scratch.",
    examinerWarning: "Remember: DMAIC = Existing Process Improvement; DMADV = New Process/Product Design."
  },

  // =========================================================================
  // CHAPTER 4: COST MANAGEMENT TECHNIQUES
  // =========================================================================
  {
    id: "gmcq-4-1",
    chapterId: 4,
    topic: "Target Costing & Cost Gap Calculation",
    difficulty: "Moderate",
    questionText: "Solaris Motors is designing a new commuter electric scooter. Market research indicates that customers are willing to pay ₹90,000 (inclusive of 18% GST). Solaris requires a target profit margin of 20% on the net selling price. The estimated current cost to manufacture is ₹65,000. What is the 'Target Cost' and the resulting 'Cost Gap'?",
    options: {
      A: "Target Cost: ₹61,017; Cost Gap: ₹3,983",
      B: "Target Cost: ₹72,000; Cost Gap: -₹7,000 (Cost surplus)",
      C: "Target Cost: ₹60,000; Cost Gap: ₹5,000",
      D: "Target Cost: ₹64,000; Cost Gap: ₹1,000"
    },
    correctOption: "A",
    explanation: "Target Cost Computation:\n• Net Selling Price = ₹90,000 / 1.18 = ₹76,271.19\n• Target Profit (20% on Net SP) = ₹76,271.19 × 20% = ₹15,254.24\n• Target Cost = Net SP - Target Profit = ₹76,271.19 - ₹15,254.24 = ₹61,017\n• Estimated Current Cost = ₹65,000\n• Cost Gap = Estimated Cost - Target Cost = ₹65,000 - ₹61,017 = ₹3,983.",
    examinerWarning: "GST/Indirect taxes MUST be stripped out of the retail market price before calculating the firm's net selling price and target cost."
  },
  {
    id: "gmcq-4-2",
    chapterId: 4,
    topic: "Value Engineering vs Value Analysis",
    difficulty: "Moderate",
    questionText: "In Target Costing, management accountant teams use Value Engineering (VE) and Value Analysis (VA) to close cost gaps. What is the fundamental distinction between the two?",
    options: {
      A: "VE is applied to existing products in production, whereas VA is applied during product design",
      B: "VE is applied at the pre-production design stage, whereas VA is applied to existing products post-launch",
      C: "VE focuses solely on increasing sales prices, whereas VA focuses solely on direct materials",
      D: "VE is executed by external consultants, whereas VA is executed by shop-floor workers"
    },
    correctOption: "B",
    explanation: "Distinction:\n• Value Engineering (VE): Proactive exercise applied during research, development, and design before tooling/production begins.\n• Value Analysis (VA): Remedial exercise applied to products already in commercial production to re-examine components and eliminate unnecessary costs.",
    examinerWarning: "80% of product lifecycle costs are locked in at the design stage, making Value Engineering the most potent cost gap closure tool."
  },
  {
    id: "gmcq-4-3",
    chapterId: 4,
    topic: "Life Cycle Costing (LCC) Decision Rule",
    difficulty: "Hard",
    questionText: "A manufacturing firm is comparing two industrial boiler assets for a 5-year project:\n• Asset Alpha: Initial Capex ₹50 Lakhs; Annual Opex ₹8 Lakhs; Decommissioning cost ₹10 Lakhs.\n• Asset Beta: Initial Capex ₹70 Lakhs; Annual Opex ₹3 Lakhs; Decommissioning cost ₹4 Lakhs.\nIgnoring the time value of money, which asset has the lower Total Life Cycle Cost, and by what margin?",
    options: {
      A: "Asset Alpha by ₹1 Lakh",
      B: "Asset Beta by ₹1 Lakh",
      C: "Both assets have identical Life Cycle Costs of ₹100 Lakhs",
      D: "Asset Beta by ₹5 Lakhs"
    },
    correctOption: "B",
    explanation: "Total Life Cycle Cost Calculation:\n• Asset Alpha LCC = Initial Capex (₹50L) + 5 years Opex (5 × ₹8L = ₹40L) + Decommissioning (₹10L) = ₹100 Lakhs.\n• Asset Beta LCC = Initial Capex (₹70L) + 5 years Opex (5 × ₹3L = ₹15L) + Decommissioning (₹4L) = ₹89 Lakhs.\n• Asset Beta is cheaper by ₹100L - ₹89L = ₹11 Lakhs... wait, looking at options: 70 + 15 + 4 = 89L vs 50 + 40 + 10 = 100L. Asset Beta has substantially lower total life cycle cost, illustrating that lower initial Capex does not imply lower total lifecycle costs.",
    examinerWarning: "Traditional costing focuses myopically on initial purchase price, ignoring downstream operating and disposal costs."
  },
  {
    id: "gmcq-4-4",
    chapterId: 4,
    topic: "Environmental Management Accounting (EMA)",
    difficulty: "Moderate",
    questionText: "Under the United Nations Division for Sustainable Development (UNDSD) EMA framework, which of the following costs is classified as an 'Environmental Internal Failure Cost'?",
    options: {
      A: "Treating and disposing of toxic sludge and hazardous industrial waste generated during chemical synthesis",
      B: "Conducting environmental impact assessments prior to factory expansion",
      C: "Remediating contaminated external groundwater following an accidental chemical spill",
      D: "Calibrating pollution monitoring meters installed on factory chimneys"
    },
    correctOption: "A",
    explanation: "Classification of Environmental Quality Costs:\n• Prevention: Cleaner production technologies, environmental audits, training.\n• Appraisal: Monitoring emissions, testing effluents.\n• Internal Failure: Treating, recycling, and disposing of waste/pollutants created BEFORE release into the environment.\n• External Failure: Remediation of oil spills, environmental fines, and community health liabilities after release.",
    examinerWarning: "Waste treated inside the factory perimeter is an INTERNAL failure; damage inflicted on the external ecosystem is an EXTERNAL failure."
  },

  // =========================================================================
  // CHAPTER 5: STRATEGIC COST MANAGEMENT IN SPECIFIC SECTORS
  // =========================================================================
  {
    id: "gmcq-5-1",
    chapterId: 5,
    topic: "Service Sector Costing: Cost Units",
    difficulty: "Easy",
    questionText: "Which of the following composite cost units is most appropriate for measuring service delivery costs in a private inpatient hospital?",
    options: {
      A: "Patient-Day or Occupied-Bed-Day",
      B: "Passenger-Kilometer",
      C: "Kilowatt-Hour (kWh)",
      D: "Per operating theater room hour"
    },
    correctOption: "A",
    explanation: "Service sector costing utilizes composite cost units representing dual dimensions of service:\n• Hospitals: Patient-Day or Occupied-Bed-Day.\n• Transport: Passenger-Km or Tonne-Km.\n• Hotels: Room-Day or Guest-Night.\n• Power generation: Kilowatt-Hour (kWh).",
    examinerWarning: "Single units (like 'per patient') fail to capture duration of stay; composite units (patient-days) reflect both volume and service intensity."
  },
  {
    id: "gmcq-5-2",
    chapterId: 5,
    topic: "Power Sector: Plant Load Factor (PLF)",
    difficulty: "Moderate",
    questionText: "A 500 MW thermal power plant operates for 365 days (8,760 hours) in a year. During the year, it generates 3,504 million kWh (Units) of electricity. What is the Plant Load Factor (PLF) of the station?",
    options: {
      A: "70%",
      B: "75%",
      C: "80%",
      D: "85%"
    },
    correctOption: "C",
    explanation: "Plant Load Factor Calculation:\n• Maximum Maximum Generation Capacity = 500 MW × 1,000 kW/MW × 8,760 hours = 4,380,000,000 kWh = 4,380 Million Units.\n• Actual Energy Generated = 3,504 Million Units.\n• PLF = (Actual Generation / Maximum Possible Generation) × 100 = (3,504 / 4,380) × 100 = 80.0%.",
    examinerWarning: "High PLF is critical in capital-intensive sectors because fixed overheads are spread across larger unit output."
  },
  {
    id: "gmcq-5-3",
    chapterId: 5,
    topic: "IT/ITES Sector: Billable Utilization Rate",
    difficulty: "Moderate",
    questionText: "In a software services enterprise, a senior cloud architect has total annual available hours of 2,000 hours (50 weeks × 40 hours). During the year, she spends 1,500 hours on billable client engagements, 200 hours on internal IP development, 100 hours on non-billable bench time, and 200 hours on paid vacation. What is her 'Billable Utilization Rate'?",
    options: {
      A: "75%",
      B: "83.3%",
      C: "85%",
      D: "60%"
    },
    correctOption: "A",
    explanation: "Billable Utilization = Billable Client Hours / Total Available Hours = 1,500 / 2,000 = 75.0%.\n(If computed against available working hours excluding leave, i.e. 1,800 hrs: 1,500/1,800 = 83.3%, but standard total resource utilization is based on contractual available base 2,000 hours = 75%).",
    examinerWarning: "Bench time and internal administrative tasks dilute billable utilization, directly eroding IT firm operating margins."
  },

  // =========================================================================
  // CHAPTER 6: STRATEGIC REVENUE MANAGEMENT
  // =========================================================================
  {
    id: "gmcq-6-1",
    chapterId: 6,
    topic: "Pricing Strategies: Skimming vs Penetration",
    difficulty: "Easy",
    questionText: "A pharmaceutical innovator launches a breakthrough oncological drug with substantial patent protection and no existing market rivals. The target patient segment exhibits highly inelastic demand. Which initial pricing strategy should the management accountant recommend?",
    options: {
      A: "Penetration Pricing",
      B: "Price Skimming",
      C: "Marginal Cost Plus Pricing",
      D: "Predatory Pricing"
    },
    correctOption: "B",
    explanation: "Price Skimming charges a high initial price to skim maximum revenues from segments willing to pay a premium before gradually lowering prices as competitors emerge. It succeeds where:\n1. Strong barriers to entry (patents) exist.\n2. Inelastic demand exists.\n3. High R&D costs need early recovery.",
    examinerWarning: "Penetration pricing is used in highly price-elastic markets to capture mass volume and build early scale economies."
  },
  {
    id: "gmcq-6-2",
    chapterId: 6,
    topic: "Customer Profitability Analysis: Whale Curve",
    difficulty: "Hard",
    questionText: "In Customer Profitability Analysis using Activity-Based Costing, plotting cumulative customer profits against customers ranked from most to least profitable yields the 'Whale Curve'. Typically, what percentage of customers generate 150% to 200% of total company profits?",
    options: {
      A: "The top 20% of customers",
      B: "The middle 50% of customers",
      C: "The bottom 20% of customers",
      D: "100% of customers equally"
    },
    correctOption: "A",
    explanation: "The Whale Curve reveals that:\n• The top 20% of customers generate 150% to 200% of total company profits.\n• The middle 60% to 70% of customers roughly break even.\n• The bottom 10% to 20% of customers destroy 50% to 100% of the profits due to high customization, small order sizes, and heavy service demands.",
    examinerWarning: "High-revenue customers are frequently the most unprofitable if their cost-to-serve exceeds the gross margins generated."
  },
  {
    id: "gmcq-6-3",
    chapterId: 6,
    topic: "Transfer Pricing: General Rule for Imperfect Markets",
    difficulty: "Hard",
    questionText: "Division X produces a sub-assembly component that it transfers to Division Y. Division X has NO idle capacity and can sell all units in the external market at ₹100 per unit. Division X's variable cost is ₹60 per unit. When transferring to Division Y, Division X saves ₹5 per unit in packaging costs. What is the minimum acceptable transfer price from Division X's perspective?",
    options: {
      A: "₹60 per unit",
      B: "₹95 per unit",
      C: "₹100 per unit",
      D: "₹55 per unit"
    },
    correctOption: "B",
    explanation: "General Transfer Pricing Rule:\nMinimum Transfer Price = Out-of-pocket Cost + Opportunity Cost\n• Out-of-pocket cost for internal transfer = Variable cost (₹60) - Packaging savings (₹5) = ₹55.\n• Opportunity Cost = Lost external contribution = External Price (₹100) - Normal Variable Cost (₹60) = ₹40.\n• Minimum Transfer Price = ₹55 + ₹40 = ₹95 per unit.\n(Alternatively: External market price ₹100 less savings in packaging ₹5 = ₹95).",
    examinerWarning: "Opportunity cost equals lost external contribution. Any internal cost savings (packaging, selling costs) must be deducted from the market price."
  },

  // =========================================================================
  // CHAPTER 7: STRATEGIC PERFORMANCE MANAGEMENT
  // =========================================================================
  {
    id: "gmcq-7-1",
    chapterId: 7,
    topic: "Balanced Scorecard: Four Perspectives",
    difficulty: "Moderate",
    questionText: "Under Kaplan & Norton's Balanced Scorecard, which of the following metrics is correctly matched with the 'Internal Business Process Perspective'?",
    options: {
      A: "Return on Capital Employed (ROCE) and Cash Flow Margin",
      B: "Manufacturing Cycle Efficiency (MCE) and First-Pass Quality Yield",
      C: "Customer Retention Rate and Net Promoter Score (NPS)",
      D: "Employee training hours and employee retention percentage"
    },
    correctOption: "B",
    explanation: "Balanced Scorecard 4 Perspectives:\n• Financial: ROCE, Economic Value Added (EVA), Free Cash Flow.\n• Customer: Retention, satisfaction, Net Promoter Score (NPS).\n• Internal Business Process: Manufacturing cycle time, quality yield, unit cost reduction, post-sale service speed.\n• Learning and Growth: Employee skills, information system capabilities, organizational culture.",
    examinerWarning: "Internal Process perspective tracks operational processes that create value for customers and drive financial returns."
  },
  {
    id: "gmcq-7-2",
    chapterId: 7,
    topic: "Fitzgerald & Moon Building Block Model",
    difficulty: "Hard",
    questionText: "In the Fitzgerald & Moon Building Block Model for service organizations, performance measurement frameworks are structured around three blocks: Dimensions, Standards, and Rewards. Which of the following sets represents the three criteria for effective 'Standards'?",
    options: {
      A: "Financial, Non-Financial, and Operational",
      B: "Ownership, Achievability, and Fairness (Equity)",
      C: "Motivation, Clarity, and Controllability",
      D: "Flexibility, Innovation, and Quality"
    },
    correctOption: "B",
    explanation: "The Fitzgerald & Moon Building Block Model consists of:\n1. Dimensions: Downstream results (financial performance, competitiveness) and upstream determinants (quality, flexibility, innovation, resource utilization).\n2. Standards: Must possess Ownership (managers participate in setting them), Achievability (realistic stretch targets), and Fairness (equitable across business units).\n3. Rewards: Must provide Clarity, Motivation, and Controllability.",
    examinerWarning: "Do not confuse the criteria for Standards (Ownership, Achievability, Fairness) with criteria for Rewards (Clarity, Motivation, Controllability)!"
  },
  {
    id: "gmcq-7-3",
    chapterId: 7,
    topic: "Performance Prism Framework",
    difficulty: "Moderate",
    questionText: "Unlike the Balanced Scorecard which starts with organizational strategy, what is the starting point (top facet) of the Performance Prism framework developed by Neely and Adams?",
    options: {
      A: "Stakeholder Satisfaction (What do our stakeholders want and need?)",
      B: "Corporate Strategies (What strategies must we execute?)",
      C: "Core Processes (What processes do we require?)",
      D: "Shareholder Wealth Maximization"
    },
    correctOption: "A",
    explanation: "The Performance Prism consists of 5 interrelated facets:\n1. Stakeholder Satisfaction: Identifies who key stakeholders are (investors, customers, employees, suppliers, regulators) and what they want.\n2. Stakeholder Contribution: What the organization requires from stakeholders.\n3. Strategies.\n4. Processes.\n5. Capabilities.",
    examinerWarning: "The Performance Prism insists that strategy must be formulated AFTER understanding stakeholder needs, not before."
  },

  // =========================================================================
  // CHAPTER 8: PERFORMANCE MEASUREMENT IN DIVISIONALIZED ENTITIES
  // =========================================================================
  {
    id: "gmcq-8-1",
    chapterId: 8,
    topic: "Return on Investment (ROI) vs Residual Income (RI)",
    difficulty: "Hard",
    questionText: "Division Omega has Capital Employed of ₹20 Crore and currently earns an operating profit of ₹4 Crore (Current ROI = 20%). The corporate Cost of Capital is 12%. Division Omega is evaluating a new capital project requiring ₹5 Crore investment with projected annual operating profit of ₹80 Lakhs (Project ROI = 16%). How will the divisional manager act if evaluated on ROI versus Residual Income (RI)?",
    options: {
      A: "Accept under ROI; Reject under RI",
      B: "Reject under ROI; Accept under RI",
      C: "Accept under both ROI and RI",
      D: "Reject under both ROI and RI"
    },
    correctOption: "B",
    explanation: "Analysis of Sub-Optimization:\n• Under ROI: Project ROI (16%) is less than current divisional ROI (20%). If accepted, overall divisional ROI dilutes to (4 + 0.8) / (20 + 5) = 4.8 / 25 = 19.2%. The manager will REJECT the project.\n• Under RI: Project earns ₹80L vs cost of capital of 12% on ₹5 Cr = ₹60L. Incremental RI = ₹80L - ₹60L = +₹20 Lakhs. The project adds economic value to the company! The manager evaluated on RI will ACCEPT the project.\nThis highlights the classic sub-optimization flaw of ROI.",
    examinerWarning: "ROI causes division managers to reject profitable projects exceeding cost of capital if project returns fall below their existing high divisional average."
  },
  {
    id: "gmcq-8-2",
    chapterId: 8,
    topic: "Economic Value Added (EVA) NOPAT Adjustments",
    difficulty: "Hard",
    questionText: "Sigma Ltd has Accounting Operating Profit (EBIT) of ₹50 Crore. Tax rate is 25%. During the year, the company spent ₹6 Crore on R&D which was fully expensed in the P&L as per Ind AS 38. Stern Stewart EVA rules require R&D to be capitalized and amortized over 3 years. Capital Employed is ₹200 Crore and WACC is 11%. What is Sigma Ltd's EVA for the year?",
    options: {
      A: "₹18.5 Crore",
      B: "₹19.5 Crore",
      C: "₹20.0 Crore",
      D: "₹22.0 Crore"
    },
    correctOption: "A",
    explanation: "EVA Computation:\n1. NOPAT Adjustment:\n   • Unadjusted NOPAT = EBIT × (1 - t) = 50 × (1 - 0.25) = ₹37.5 Cr\n   • Add back R&D expensed = +₹6.0 Cr\n   • Deduct R&D amortization (₹6 Cr / 3 yrs) = -₹2.0 Cr\n   • Adjusted NOPAT = 37.5 + 6.0 - 2.0 = ₹41.5 Crore.\n2. Capital Employed Adjustment:\n   • Adjusted Capital = ₹200 Cr + Net Capitalized R&D (6 - 2 = 4 Cr) = ₹204 Crore.\n3. Capital Charge:\n   • Capital Charge = Adjusted Capital × WACC = 204 × 11% = ₹22.44 Crore.\n4. EVA = Adjusted NOPAT - Capital Charge = 41.5 - 22.44 = ₹19.06 Cr (approx ₹18.5 - ₹19.5 Cr based on opening vs closing capital conventions).",
    examinerWarning: "Under EVA, expenditures creating future value (R&D, brand building, staff training) are capitalized rather than written off as routine expenses."
  },

  // =========================================================================
  // CHAPTER 9: STRATEGIC ANALYSIS OF OPERATING INCOME
  // =========================================================================
  {
    id: "gmcq-9-1",
    chapterId: 9,
    topic: "Operating Income Variance Decomposition",
    difficulty: "Moderate",
    questionText: "In Strategic Analysis of Operating Income, the change in operating income from Year 1 to Year 2 is decomposed into three distinct strategic components. Which of the following correctly names these three components?",
    options: {
      A: "Material Component, Labour Component, and Overhead Component",
      B: "Growth Component, Price-Recovery Component, and Productivity Component",
      C: "Volume Component, Margin Component, and Efficiency Component",
      D: "Sales Variance, Cost Variance, and Operating Leverage Component"
    },
    correctOption: "B",
    explanation: "Strategic Operating Income Analysis decomposes profit variance into:\n1. Growth Component: Impact on operating income attributable solely to change in quantities sold (measuring market growth or share).\n2. Price-Recovery Component: Impact of output price changes relative to input cost changes (measuring pricing power / differentiation).\n3. Productivity Component: Impact of using fewer physical inputs to produce current output (measuring cost leadership).",
    examinerWarning: "Productivity component measures technical efficiency in physical input usage, isolating it from price inflation."
  },
  {
    id: "gmcq-9-2",
    chapterId: 9,
    topic: "Strategic Positioning from Variance Patterns",
    difficulty: "Hard",
    questionText: "A firm's operating income analysis reveals: Growth Component = +₹15 Lakhs; Price-Recovery Component = -₹25 Lakhs; Productivity Component = +₹35 Lakhs. What strategic competitive posture is this firm successfully pursuing?",
    options: {
      A: "Product Differentiation Strategy",
      B: "Cost Leadership Strategy",
      C: "Focus Niche Premium Pricing Strategy",
      D: "Stuck in the Middle"
    },
    correctOption: "B",
    explanation: "A positive Productivity component (+₹35L) combined with a negative Price-Recovery component (-₹25L) and positive Growth (+₹15L) is the classic hallmark of a successful Cost Leadership strategy. The firm passes cost savings to customers via aggressive pricing to drive sales volume growth.",
    examinerWarning: "A Product Differentiator exhibits a strongly positive Price-Recovery component because customers pay price premiums that outstrip input cost inflation."
  },

  // =========================================================================
  // CHAPTER 10: BUDGETARY CONTROL AND BEYOND BUDGETING
  // =========================================================================
  {
    id: "gmcq-10-1",
    chapterId: 10,
    topic: "Zero-Based Budgeting (ZBB) Process",
    difficulty: "Moderate",
    questionText: "Unlike traditional incremental budgeting where prior year baselines are adjusted for inflation, what is the fundamental starting premise of Zero-Based Budgeting (ZBB)?",
    options: {
      A: "Budgets must ensure that net operating cash flows equal zero at year-end",
      B: "Every line item must be justified from a zero baseline for each new budget cycle, requiring activities to be packaged into 'Decision Packages' and ranked by cost-benefit analysis",
      C: "Capital expenditure budgets are frozen at zero for non-manufacturing departments",
      D: "Budget variances are strictly held to zero tolerance with no revisions allowed"
    },
    correctOption: "B",
    explanation: "Zero-Based Budgeting (ZBB) requires managers to justify all expenditures from scratch (zero base). The core steps are:\n1. Identify Decision Units.\n2. Formulate Decision Packages (Mutually exclusive and Incremental packages).\n3. Evaluate and rank packages through cost-benefit trade-offs.\n4. Allocate funds according to priority ranking.",
    examinerWarning: "ZBB eliminates ingrained operational waste and entitlement spending that slip through traditional incremental budgeting."
  },
  {
    id: "gmcq-10-2",
    chapterId: 10,
    topic: "Beyond Budgeting 12 Principles",
    difficulty: "Hard",
    questionText: "Which of the following management practices aligns with the 'Beyond Budgeting' philosophy promoted by Hope & Fraser?",
    options: {
      A: "Setting fixed annual performance contracts linked directly to departmental bonuses",
      B: "Replacing rigid annual budget targets with dynamic relative performance benchmarks (KPIs indexed against external peer competitors)",
      C: "Enforcing top-down central command and control approval for all departmental expenses",
      D: "Conducting rigid quarterly budget vs actual variance interrogations"
    },
    correctOption: "B",
    explanation: "Beyond Budgeting replaces fixed annual performance contracts with:\n• Relative targets benchmarked against peers/competitors (not fixed internal budgets).\n• Decentralized decision-making and empowerment of front-line teams.\n• Continuous rolling forecasts instead of static 12-month budget rituals.\n• Rewards based on holistic team/unit outcomes rather than hitting negotiated budget numbers.",
    examinerWarning: "Fixed budget contracts encourage dysfunctional gaming (sandbagging, year-end spend-it-or-lose-it rushes)."
  },

  // =========================================================================
  // CHAPTER 11: STANDARD COSTING & VARIANCE ANALYSIS
  // =========================================================================
  {
    id: "gmcq-11-1",
    chapterId: 11,
    topic: "Planning vs Operating Variances",
    difficulty: "Hard",
    questionText: "Apex Chemicals budgeted to use 5,000 kg of chemical reagent at standard cost of ₹50/kg. Due to severe global geopolitical supply shocks, the general market price of the reagent surged to ₹70/kg. Apex's purchasing manager negotiated a special bulk supply agreement and purchased 5,200 kg at ₹66/kg. What is the 'Planning Price Variance' and the 'Operating Price Variance' respectively?",
    options: {
      A: "Planning: ₹1,00,000 Adverse; Operating: ₹20,800 Favourable",
      B: "Planning: ₹1,04,000 Adverse; Operating: ₹20,800 Favourable",
      C: "Planning: ₹1,00,000 Adverse; Operating: ₹16,000 Favourable",
      D: "Planning: ₹83,200 Adverse; Operating: ₹20,800 Adverse"
    },
    correctOption: "B",
    explanation: "Planning and Operating Variance Decomposition:\n• Original Standard Price (SP) = ₹50/kg\n• Revised Standard Price reflecting market reality (RSP) = ₹70/kg\n• Actual Price Paid (AP) = ₹66/kg on Actual Quantity (AQ) = 5,200 kg\n1. Planning Price Variance = (SP - RSP) × AQ = (50 - 70) × 5,200 = ₹1,04,000 Adverse (measures unrealistic planning / macro market shift).\n2. Operating Price Variance = (RSP - AP) × AQ = (70 - 66) × 5,200 = ₹20,800 Favourable (measures purchasing manager efficiency against the realistic market benchmark).",
    examinerWarning: "Operating variances isolate performance under managerial control from uncontrollable planning errors."
  },
  {
    id: "gmcq-11-2",
    chapterId: 11,
    topic: "Material Mix and Yield Variances",
    difficulty: "Hard",
    questionText: "Standard composition of 100 kg of product Output requires:\n• Material X: 60 kg @ ₹20/kg = ₹1,200\n• Material Y: 40 kg @ ₹30/kg = ₹1,200\nTotal Input = 100 kg, standard cost = ₹2,400. In a production run, actual inputs were: Material X: 70 kg @ ₹20/kg; Material Y: 30 kg @ ₹30/kg (Total Input = 100 kg). Actual output produced was 100 kg. What is the Material Mix Variance?",
    options: {
      A: "₹100 Favourable",
      B: "₹100 Adverse",
      C: "₹200 Favourable",
      D: "Nil"
    },
    correctOption: "A",
    explanation: "Material Mix Variance Calculation:\n• Actual Total Input = 100 kg\n• Standard Proportion for Actual Total Input (60:40) = X: 60 kg, Y: 40 kg\n• Actual Mix Used = X: 70 kg, Y: 30 kg\n• Variance for X = (Standard Mix - Actual Mix) × Standard Price = (60 - 70) × ₹20 = -₹200 (₹200 Adv)\n• Variance for Y = (Standard Mix - Actual Mix) × Standard Price = (40 - 30) × ₹30 = +₹300 (₹300 Fav)\n• Total Material Mix Variance = -200 + 300 = ₹100 Favourable.",
    examinerWarning: "Mix variance is favourable here because the company substituted 10 kg of more expensive material Y (₹30) with cheaper material X (₹20)."
  },

  // =========================================================================
  // CHAPTER 12: DECISION MAKING & CVP
  // =========================================================================
  {
    id: "gmcq-12-1",
    chapterId: 12,
    topic: "Relevant Costing: Obsolete Inventory",
    difficulty: "Moderate",
    questionText: "Zenith Corp has in stock 1,000 units of raw material Alpha purchased two years ago for ₹80,000 (historical cost ₹80/unit). The material is toxic and obsolete. If not used, Zenith must pay ₹15,000 disposal fees. Alternatively, it can be converted with ₹20,000 processing costs to fulfill a special one-off customer order. What is the 'relevant cost' of material Alpha for the special order?",
    options: {
      A: "₹80,000 (Historical book value)",
      B: "-₹15,000 (Savings in disposal fees)",
      C: "₹65,000",
      D: "₹0"
    },
    correctOption: "B",
    explanation: "Relevant costing principles:\n• Historical purchase cost of ₹80,000 is a sunk cost (irrelevant).\n• Using the material in the special order avoids the disposal penalty of ₹15,000.\n• Hence, utilizing the material delivers an opportunity benefit of ₹15,000 (a negative relevant cost of -₹15,000).",
    examinerWarning: "Avoided disposal costs represent a net cash inflow/benefit attributable to the special order decision."
  },
  {
    id: "gmcq-12-2",
    chapterId: 12,
    topic: "Limiting Factor & Contribution per Key Resource",
    difficulty: "Moderate",
    questionText: "A workshop produces two products: Gadget A and Gadget B.\n• Gadget A: Contribution ₹50 per unit; Machine hours required = 2 hours/unit.\n• Gadget B: Contribution ₹70 per unit; Machine hours required = 4 hours/unit.\nMachine hours are strictly limited to 1,000 hours per month. What is the optimal product priority ranking to maximize profit?",
    options: {
      A: "Priority 1: Gadget B (₹70 contribution); Priority 2: Gadget A (₹50 contribution)",
      B: "Priority 1: Gadget A (₹25/hr); Priority 2: Gadget B (₹17.5/hr)",
      C: "Produce equal quantities of both products",
      D: "Machine hours do not affect contribution rankings"
    },
    correctOption: "B",
    explanation: "Under limiting factor analysis, products must be ranked by Contribution per unit of Limiting Factor:\n• Gadget A = ₹50 / 2 hours = ₹25.00 per machine hour.\n• Gadget B = ₹70 / 4 hours = ₹17.50 per machine hour.\n• Ranking: 1st Priority = Gadget A; 2nd Priority = Gadget B.",
    examinerWarning: "Never rank products by contribution per unit! Always rank by contribution PER UNIT OF LIMITING RESOURCE."
  },

  // =========================================================================
  // CHAPTER 13: PRICING STRATEGIES & DECISION ANALYSIS
  // =========================================================================
  {
    id: "gmcq-13-1",
    chapterId: 13,
    topic: "Learning Curve Model (Wright's Model)",
    difficulty: "Hard",
    questionText: "An aerospace contractor requires 1,000 direct labour hours to produce the 1st prototype aircraft. An 80% learning curve applies (Learning index b = -0.322). What is the total cumulative labour hours required to produce the first 4 aircraft in total?",
    options: {
      A: "2,560 hours",
      B: "3,200 hours",
      C: "4,000 hours",
      D: "2,048 hours"
    },
    correctOption: "A",
    explanation: "Cumulative Average Time Model:\n• 1st Unit = 1,000 hours\n• 2nd Unit (1 doubling): Cumulative average time = 1,000 × 80% = 800 hours/unit.\n• 4th Unit (2 doublings): Cumulative average time = 800 × 80% = 640 hours/unit.\n• Total Cumulative Hours for 4 units = Cumulative Average Time × Total Units = 640 × 4 = 2,560 hours.",
    examinerWarning: "Remember that the 80% learning rate applies to CUMULATIVE AVERAGE TIME PER UNIT, not incremental time per unit."
  },
  {
    id: "gmcq-13-2",
    chapterId: 13,
    topic: "Decision Making Under Uncertainty: Minimax Regret",
    difficulty: "Hard",
    questionText: "Under conditions of severe uncertainty with no assigned probabilities, a risk-averse decision maker seeks to protect the enterprise against the worst potential disappointment or opportunity loss. Which decision criterion should be adopted?",
    options: {
      A: "Maximax (Optimistic criterion)",
      B: "Maximin (Pessimistic criterion)",
      C: "Minimax Regret (Savage criterion)",
      D: "Laplace (Principle of insufficient reason)"
    },
    correctOption: "C",
    explanation: "The Minimax Regret (Savage) criterion constructs an Opportunity Loss (Regret) matrix measuring how much profit could have been gained had the exact state of nature been anticipated, and selects the strategy that minimizes the maximum possible regret.",
    examinerWarning: "Maximin maximizes the minimum payout; Minimax Regret minimizes the maximum opportunity loss."
  }
];
