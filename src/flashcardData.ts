export interface Flashcard {
  id: string;
  framework: string;
  subtopic: string;
  question: string;
  answer: string[];
  examinerTrap: string;
  difficulty: "Medium" | "Hard";
}

export const flashcards: Flashcard[] = [
  {
    id: "fc-01",
    framework: "Fitzgerald-Moon Building Blocks Model",
    subtopic: "Performance Measurement (Chapter 6)",
    question: "What are the three components of the Fitzgerald-Moon Building Blocks model, and what specific blocks comprise each?",
    answer: [
      "Dimensions (What to measure): Split into Results (Financial Performance, Competitiveness) and Determinants (Quality, Flexibility, Resource Utilization, Innovation).",
      "Standards (How to set targets): Must be Ownership (employees participate), Achievability (realistic but challenging), and Equity (fair across business units).",
      "Rewards (How to motivate): Must possess Clarity (understandable), Motivation (linked to targets), and Controllability (only penalize/reward what managers control)."
    ],
    examinerTrap: "Students often confuse 'Results' and 'Determinants'. Remember: Results are historical lag metrics (e.g., profit margin, market share), while Determinants are active lead indicators (e.g., setup flex, resource uptime, customer-first quality) that drive those results.",
    difficulty: "Hard"
  },
  {
    id: "fc-02",
    framework: "Lynch-Cross Performance Pyramid",
    subtopic: "Performance Measurement / Strategic Alignment",
    question: "Walk through the hierarchy of the Lynch-Cross Performance Pyramid from top to bottom, including the cross-functional trade-off links.",
    answer: [
      "Level 1: Corporate Vision (Overall top-level strategic direction).",
      "Level 2: Business Unit Objectives (Split into Market-based and Financial-based targets).",
      "Level 3: Business Operating Systems (Focuses on Customer Satisfaction, Flexibility, and Productivity).",
      "Level 4: Operational Departments (Measures daily loops: Quality, Delivery, Cycle Time, Waste).",
      "Key Flow Direction: Objectives cascade down-ward, whereas metrics roll up-ward. Left branch represents external effectiveness; Right branch represents internal efficiency."
    ],
    examinerTrap: "Ensure you link 'Quality' and 'Delivery' to external market customer satisfaction, while 'Cycle Time' and 'Waste' map to internal productivity. The exam loves evaluating conflicts between speed (Cycle Time) and quality.",
    difficulty: "Hard"
  },
  {
    id: "fc-03",
    framework: "The 4Ps of Innovation Space",
    subtopic: "Lean System, Innovation & New Models (Chapter 3)",
    question: "What are the four dimensions (The 4Ps) that map out the space for innovation as outlined by Tidd and Bessant?",
    answer: [
      "Product Innovation: Changes in the products or services a company offers (e.g., shifting from gas engines to solid-state batteries).",
      "Process Innovation: Changes in the ways in which products are created or delivered (e.g., implementing cellular layout or robotic automated assembly).",
      "Position Innovation: Changes in the context or framing in which products are introduced (e.g., repositioning energy drinks from athletic endurance to night-shift cognitive focus).",
      "Paradigm Innovation: Changes in the underlying mental models/philosophy of the business (e.g., shifting from manufacturing diesel turbines to leasing power-by-the-hour)."
    ],
    examinerTrap: "In exam papers, changing a subscription system is often misclassified as process innovation. If it alters the core value philosophy and the customer relationship (e.g. software-as-a-service instead of selling licenses), it is Paradigm Innovation.",
    difficulty: "Medium"
  },
  {
    id: "fc-04",
    framework: "Material Flow Cost Accounting (ISO 14051)",
    subtopic: "Cost Management Techniques (Chapter 4)",
    question: "How does MFCA categorize costs, and how does it challenge traditional cost accounting for material wastage?",
    answer: [
      "Material Costs: Cost of active primary chemicals, substrates, or solvent inputs.",
      "System Costs: Proportional labor, wages, administrative, and processing overheads.",
      "Energy Costs: Thermal utilities, electricity, and water spent running the flow centers.",
      "Positive vs Negative Products: Traditional systems wrap waste into positive finished goods, hiding the loss. MFCA extracts proportional inputs allocated strictly by weight balance to make waste streams ('Negative Products') financially visible."
    ],
    examinerTrap: "When calculating negative product cost, students forget to allocate System (Labor) or Energy costs to the scrap. Under ISO 14051, ALL raw materials, system, and energy costs are allocated proportionally based on physical output weights.",
    difficulty: "Hard"
  },
  {
    id: "fc-05",
    framework: "The 5S Workplace Methodology",
    subtopic: "Modern Business Environment (Chapter 2)",
    question: "What are the five steps of the Japanese 5S workplace reorganization framework and their operational outcomes?",
    answer: [
      "1. Seiri (Sort): Eliminate all unnecessary tooling or items from the workplace floor.",
      "2. Seiton (Set in Order): Arrange all essential elements so they are easy to locate and access.",
      "3. Seiso (Shine): Regularly clean all machinery, floors, and workstations to spot leakage or tear.",
      "4. Seiketsu (Standardize): Establish written procedure cards and visual schedules for daily maintenance.",
      "5. Shitsuke (Sustain): Enforce self-discipline and schedule internal audits to keep the workplace optimized."
    ],
    examinerTrap: "Do not regard 5S of lean as a simple 'housekeeping' checklist. SCM requires linking 5S directly to operational efficiency: Sort and Set in Order directly reduce motion waste and process setup downtime.",
    difficulty: "Medium"
  },
  {
    id: "fc-06",
    framework: "Porter's Primary Value Chain Activities",
    subtopic: "Intro to Strategic Cost Management (Chapter 1)",
    question: "List and define the five Primary Activities of Michael Porter's Value Chain Model.",
    answer: [
      "Inbound Logistics: Receiving, storing, and distributing incoming material inputs (inventory queues, trucking logistics).",
      "Operations: Transforming incoming materials into the final product (milling, assembly, painting).",
      "Outbound Logistics: Distributing finished products to customers (warehouse storage, dispatch, shipping coordination).",
      "Marketing & Sales: Persuaded transactions and customer acquisitions (advertising, promotions, channel selection).",
      "Service: Enhancing or maintaining product value after-sale (warranties, installation support, spare parts)."
    ],
    examinerTrap: "Be careful with 'Procurement' and 'Technology Development'. These are Support/Secondary activities that help the primary activities, NOT primary activities themselves. A common exam distracter is treating supplier selection as Inbound Logistics.",
    difficulty: "Medium"
  },
  {
    id: "fc-07",
    framework: "The Six Sigma DMAIC cycle",
    subtopic: "Modern Business Environment (Chapter 2)",
    question: "Describe the five stages of the Six Sigma DMAIC defect-reduction methodology.",
    answer: [
      "Define: Map the project scope, customer critical-to-quality attributes (CTQs), and business goal.",
      "Measure: Collect baseline data on current process capabilities and failure frequencies.",
      "Analyze: Investigate root causes using tools like Ishikawa fishbone diagrams or Pareto defect analysis.",
      "Improve: Formulate and deploy innovative solutions to eliminate the source of process variation.",
      "Control: Implement error-proofing (Poka-Yoke), standard control charts, and monitor ongoing loops."
    ],
    examinerTrap: "A classic mistake is confusing 'Measure' and 'Analyze'. 'Measure' is purely quantitative—documenting what is currently happening (e.g. defect rate is 8.5%). 'Analyze' is qualitative and diagnostic—determining WHY it is happening.",
    difficulty: "Medium"
  },
  {
    id: "fc-08",
    framework: "Dual-Rate Transfer Pricing System",
    subtopic: "Transfer Pricing Decisions (Chapter 7)",
    question: "How does a Dual-Rate Transfer Pricing system operate, and what SCM problems does it solve?",
    answer: [
      "Buying Division Charge: Charged at the transfer-in marginal/variable cost of the selling division (to maintain goal congruence during final market quoting).",
      "Selling Division Credit: Credited at a full market price, or full cost-plus negotiating markup (to protect divisional profit performance and ROI appraisals).",
      "Accounting Reconciling Entry: A company-level credit variance adjustments account is created to offset the duplicate profit elements in consolidated statements."
    ],
    examinerTrap: "Dual-rate systems can lead to artificial profits if not consolidated properly. Since individual divisions record duplicated revenues, central finance must always declare a negative entry to eliminate double-counted margins before external filing.",
    difficulty: "Hard"
  },
  {
    id: "fc-09",
    framework: "Planning vs. Operational Variances",
    subtopic: "Standard Costing & Variance Analysis (Chapter 8)",
    question: "Under standard costing, what is the distinction between Planning and Operational Variances, and why is it strategically critical?",
    answer: [
      "Planning Variance: Exposes errors in setting the original standard (compares revised realistic standard under market shift vs. original outdated standard). Uncontrollable by managers.",
      "Operational Variance: Exposes active factory performance (compares actual results vs. revised realistic standard). Controllable by production superintendents.",
      "Formula: Variance = (Actual x Actual Price) - (Revised x Revised Price) splits. It prevents unfair evaluation when industry prices fluctuate wildly."
    ],
    examinerTrap: "Always calculate Operational Variances under the REVISED (realistic) standards, not original standards. Evaluating factory floor managers using an outdated master budget standard is an ICAI audit case favorite.",
    difficulty: "Hard"
  },
  {
    id: "fc-10",
    framework: "Theory of Constraints (Goldratt's 5 Steps)",
    subtopic: "Lean Tools & Modern Systems (Chapter 2)",
    question: "List and explain Eliyahu Goldratt's five focusing steps of the Theory of Constraints (ToC).",
    answer: [
      "1. Identify: Find the system's active bottleneck constraint (e.g., thermal chamber, paint-shop speed).",
      "2. Exploit: Achieve maximum possible output from the bottleneck process without major investments (zero idle time).",
      "3. Subordinate: Align all other non-bottleneck processes (keep them aligned with the speed of the bottleneck).",
      "4. Elevate: Invest capital or resources to expand bottleneck capacity (buy extra machinery, hire mechanics).",
      "5. Repeat (Prevent Inertia): Once solved, find the next sequential bottleneck and restart the loop."
    ],
    examinerTrap: "Subordinate means resisting the urge to run non-bottleneck machines at 100% capacity. Running non-bottlenecks at full rate creates massive work-in-process (WIP) storage piles and ties up working capital unnecessarily.",
    difficulty: "Hard"
  },
  {
    id: "fc-11",
    framework: "Yield Management & Spill-Spoil Dilemma",
    subtopic: "Strategic Revenue Management (Chapter 9)",
    question: "What are the Spill and Spoil effects in perishable inventory management, and how does yield management balance them?",
    answer: [
      "Spill Effect (Selling early/cheap): Occurs when a seller accepts low-rate discount bookings early in the cycle, filling up capacity and spilling over higher-rate, late-booking business demand.",
      "Spoil Effect (Holding too high): Occurs when capacity is held back for high-rate late buyers who never materialize, causing the perishable inventory to spoil (e.g., empty hotel rooms on check-in day).",
      "Reconciliation Approach: Yield models utilize cancellation probabilities and displacement cost calculations to reserve the exact volume of high-yield rooms or seats to balance both costs."
    ],
    examinerTrap: "In SCM-PE, when analyzing retail vs. bulk group bookings, always deduct total displacement margins of individual passengers from bulk revenues. Failing to calculate the opportunity cost of displaced normal-fare customers is a critical examiner pitfall.",
    difficulty: "Hard"
  },
  {
    id: "fc-12",
    framework: "Operating Income Variance Deconstruction",
    subtopic: "Strategic Profit Management (Chapter 10)",
    question: "What are the Growth, Price-Recovery, and Productivity components that explain operating income changes?",
    answer: [
      "Growth Component: Explains operating income changes caused purely by selling higher volumes of products, holding base-period sales prices and input use rates fixed.",
      "Price-Recovery Component: Explains changes earned by raising unit selling prices, offset by cost inflation rate increases of raw materials or direct labors.",
      "Productivity Component: Explains profit enhancements produced purely from utilizing less physical inputs (lean improvements or material waste reduction) to achieve current outputs, priced at current input rates."
    ],
    examinerTrap: "Remember that if productivity is high, but price-recovery is heavily negative (due to dropping retail prices to fight price wars), the firm is carrying out a Cost Leadership strategy. Ensure you connect these calculations to Porter's strategic posture.",
    difficulty: "Medium"
  }
];
