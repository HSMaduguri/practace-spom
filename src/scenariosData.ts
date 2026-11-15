export interface Question {
  id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  examinerWarning?: string;
}

export interface CaseScenario {
  id: string;
  title: string;
  chapterId: number;
  chapterName: string;
  scenarioText: string;
  questions: Question[];
}

export interface RevisionNoteSection {
  title: string;
  bullets: string[];
}

export interface FormulaItem {
  name: string;
  formula: string;
  description: string;
}

export interface Chapter {
  id: number;
  name: string;
  description: string;
  moduleCode?: string;
  officialPdfUrl?: string;
  syllabusOverviewPdfUrl?: string;
  summaryNotes?: RevisionNoteSection[];
  formulas?: FormulaItem[];
}

export const chapters: Chapter[] = [
  {
    "id": 1,
    "name": "Chapter 1: An Introduction to Strategic Cost Management",
    "description": "SCM vs. Traditional Cost Management, strategic positioning, cost driver analysis, Porter's Value Chain & Value System, and Value Shop Model.",
    "summaryNotes": [
      {
        "title": "Traditional Cost Management vs. Strategic Cost Management (SCM)",
        "bullets": [
          "Traditional Cost Management has a short-term, reactive, and internal focus. It emphasizes strict budget containment, standard cost variance tracking, and CVP analysis assuming static cost structures.",
          "Strategic Cost Management (SCM) focuses externally on competitor behavior, market dynamics, and customer values over the long-term. It views costs as a strategic enabler of value rather than an asset to be minimized.",
          "Traditional focuses primarily on internal production, whereas SCM analyzes the entire Value Chain from raw material inputs to post-sale customer support."
        ]
      },
      {
        "title": "Three Pillars of Strategic Cost Management",
        "bullets": [
          "Value Chain Analysis (VCA): Deconstructs the business into strategic activities to identify cost improvement opportunities, eliminate non-value-added steps, and maximize competitive advantage.",
          "Strategic Positioning Analysis: Evaluates the firm's choice between Cost Leadership (large volumes, low unit costs, process standardizations) and Product Differentiation (premium pricing, superior features, brand loyalty).",
          "Cost Driver Analysis: Moves beyond traditional volume-based cost drivers (like labor or machine hours) to evaluate Structural drivers (scale, scope, experience, technology limits) and Executional drivers (employee involvement, total quality management, plant layouts)."
        ]
      },
      {
        "title": "Michael Porter's Value Chain & Value System",
        "bullets": [
          "Primary Activities: Core physical flows of product production - Inbound Logistics (receiving/storage), Operations (conversion), Outbound Logistics (distribution), Marketing & Sales, and Post-sale Customer Service.",
          "Support Activities: Organizational pillars that reinforce primary flows - Firm Infrastructure (administration, finance), Human Resource Management, Technology Development, and Procurement (raw materials sourcing).",
          "Industry Value System: A comprehensive view showing linkages between upstream supplier chains, our internal firm value chain, and downstream distributor/customer value chains to discover mutual cost-saving linkages."
        ]
      },
      {
        "title": "Value Shop Model (VSM) & Service SCM",
        "bullets": [
          "Value Shop Model (or Service Value Chain) conceptualized by James D. Thompson (1967) and Stabell & Fjeldstad (1998) is oriented to mobilizing resources (man, machine, money, and knowledge) to solve problems for service sector firms.",
          "Rather than focusing on creating value sequentially, the value shop focuses on resolving customer hardships cyclicly (Problem Finding & Acquisition, Problem Solving, Choice, Execution, Control, and Evaluation).",
          "Denison Organizational Culture Survey (DOCS) highlights that high scores in Adaptability, Mission, Involvement, and Consistency have a strong positive correlation with ROI, ROE, and customer satisfaction."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Customer Value-to-Cost Focus Ratio",
        "formula": "Value-to-Cost Ratio = Customer Perceived Attribute Rating / Activity Cost Contribution %",
        "description": "Helps analyze if high-cost activities are generating proportional value attributes for customers."
      },
      {
        "name": "Structural Span of Control Relations (Graicunas' Formula)",
        "formula": "Number of Relations = [n * (n - 1)] / 2, Cross-Relations = n * (n - 1)",
        "description": "Evaluates the complexity of organization design or span of control 'n' in terms of vertical reporting relations."
      }
    ]
  },
  {
    "id": 2,
    "name": "Chapter 2: Modern Business Environment",
    "description": "Features of buyers' market, Cost of Quality (COQ) classification, Total Quality Management (TQM), Supply Chain Management, Service Level Agreements (SLA), Gain Sharing, Downsizing, and Outsourcing.",
    "summaryNotes": [
      {
        "title": "From a Sellers' Market to a Buyers' Market",
        "bullets": [
          "The modern business environment is transitioned from a seller’s market to a buyer’s market due to globalization, fierce competition, excess capacities, and high data accessibility.",
          "The supplier no longer dictates price (replaced by target pricing), response time, or quality; instead, these are dictated by customer expectations."
        ]
      },
      {
        "title": "Cost of Quality (COQ) & PAF Model",
        "bullets": [
          "Created by Juran and popularized by Crosby in 'Quality Is Free', COQ splits quality-related expenditure into two major categories: Cost of Conformance and Cost of Non-Conformance.",
          "Cost of Conformance (Good Costs): (1) Prevention Costs (quality engineering, training, planning, audits, design reviews) and (2) Appraisal Costs (inspecting materials, testing, packaging inspection, outside certification).",
          "Cost of Non-Conformance (Bad Costs): (1) Internal Failure Costs (scrap, rework, re-designing, re-testing, downtime) and (2) External Failure Costs (warranty claims, recalls, returns/allowances, repairs, customer dissatisfaction, lost market share).",
          "Optimal COQ is achieved where the combined cost of conformance and non-conformance is minimized."
        ]
      },
      {
        "title": "Total Quality Management (TQM) & Supply Chain Management",
        "bullets": [
          "TQM is an integrated system of planning and controlling all business functions so that products or services meet or exceed customer expectations. Pillars: Commitment, Culture, Continuous Improvement, Co-operation, Customer Focus, and Control (6 Cs). Deming's 14 points specify long-term planning, eliminating inspections through perfect process quality, and implementing PDCA cycle.",
          "Supply Chain Management (SCM) unifies upstream (SRM, e-procurement, e-purchasing) and downstream (relationship marketing, CRM, customer account profitability, CLV) segments under a Push or Pull model.",
          "Gain Sharing Arrangements are collaborative agreements where a supplier performs service with no initial fee guarantee but shares in the real cost-savings generated. Service Level Agreements (SLA) govern performance metrics."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Category COQ % Allocation",
        "formula": "Category COQ (%) = (Category Cost / Total Cost of Quality) * 100",
        "description": "Expresses conformance or non-conformance sub-costs as a percentage of total quality expenditure to highlight improvement priorities."
      },
      {
        "name": "COQ Conformance vs Non-Conformance Ratio",
        "formula": "Conformance COQ = Prevention + Appraisal Costs; Non-Conformance COQ = Internal + External Failures",
        "description": "Splits the cost of quality into proactive conformance expenditures and reactive failure-associated losses."
      },
      {
        "name": "Customer Lifetime Value (CLV)",
        "formula": "CLV = Sum of [t=1 to N] (Net Profit or Cash Flow from Customer in Year t) / (1 + r)^t",
        "description": "The discounted net present value of all future cash flows expected from a customer relationship over its lifetime."
      }
    ]
  },
  {
    "id": 3,
    "name": "Chapter 3: Lean System and Innovation",
    "description": "Operational excellence enablers: JIT, Kaizen, 5S workspace, TPM, OEE index, Cellular Manufacturing, King's algorithm, Six Sigma, and Process Innovation.",
    "summaryNotes": [
      {
        "title": "Lean Thinking & Seven Mudas",
        "bullets": [
          "Lean manufacturing aims to maximize customer value while eliminating processing waste (Muda).",
          "The 7 Wastes (TIM WOOD) are: Transportation, Inventory, Motion, Waiting, Overproduction, Over-processing, and Defects.",
          "Just-In-Time (JIT): A pull-based production and purchasing system triggered directly by customer demand. Relies on low variety, stable demand, high supplier reliability, zero-inventory philosophy, and backflushing accounting."
        ]
      },
      {
        "title": "Kaizen Costing, 5S, & Total Productive Maintenance (TPM)",
        "bullets": [
          "Kaizen Costing focuses on small, continuous, incremental cost reductions at the production stage of existing products, setting weekly/monthly targets based on real workshop participation.",
          "5S System: Seiri (Sort - select needed), Seiton (Set in order - neat arrangement), Seiso (Shine - clean & inspect), Seiketsu (Standardize - maintain), and Shitsuke (Sustain - discipline & audit).",
          "TPM aims for Zero breakdowns, Zero defects, and Zero accidents. Its performance is measured primarily through the Overall Equipment Effectiveness (OEE) index, tracking 6 big equipment losses."
        ]
      },
      {
        "title": "Cellular Manufacturing & Six Sigma",
        "bullets": [
          "Cellular Manufacturing groups different machines into U-shaped working cells to enable a single piece flow, reducing WIP, space, and material handling costs. Part-machine groupings are optimized using Rank Order Clustering (King's Algorithm).",
          "Six Sigma is a statistical quality method aiming for only 3.4 defects per million opportunities (99.99966% accuracy).",
          "DMAIC (Define, Measure, Analyze, Improve, Control) is used for existing products/processes, whereas DMADV (Define, Measure, Analyze, Design, Verify) is used for completely new processes."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Takt Time",
        "formula": "Takt Time = Available Production Time / Total Customer Demand Volume",
        "description": "The maximum time allowed to produce a unit in order to match the steady rate of customer demand. Guides factory pace."
      },
      {
        "name": "Overall Equipment Effectiveness (OEE)",
        "formula": "OEE (%) = Availability Rate × Performance Rate × Quality Rate",
        "description": "Comprehensive efficiency metric. World-class target is 85% (Availability > 90%, Performance > 95%, Quality > 99%)."
      },
      {
        "name": "OEE Availability Rate",
        "formula": "Availability = (Planned Production Time - Unplanned Downtime) / Planned Production Time",
        "description": "Planned production time excludes planned breaks or scheduled maintenance. Run time subtracts unplanned breakdowns."
      },
      {
        "name": "OEE Performance (Speed) Rate",
        "formula": "Performance = (Ideal Design Cycle Time per unit × Total Units Produced) / Actual Operating Run Time",
        "description": "Compares actual running speeds against ideal manufacturer design limits."
      },
      {
        "name": "OEE Quality (Yield) Rate",
        "formula": "Quality = First-Time-Right Good Units Produced / Total Units Produced",
        "description": "Measures quality conversion efficiency, dividing good units (excluding scrap/rework) by total produced quantity."
      },
      {
        "name": "Manufacturing Cycle Efficiency (MCE)",
        "formula": "MCE = Value-Added Process Time / Manufacturing Cycle Time (MCT)",
        "description": "Indicates non-value-added waste in production time. MCT represents total lead-time: Processing + Inspection + Moving + Queue/Waiting time."
      }
    ]
  },
  {
    "id": 4,
    "name": "Chapter 4: Specialist Cost Management Techniques",
    "description": "Cost Control vs. Cost Reduction, Target Costing, Life Cycle Costing, Theory of Constraints (TOC), and Environmental Management Accounting (EMA).",
    "summaryNotes": [
      {
        "title": "Cost Control vs. Cost Reduction",
        "bullets": [
          "Cost Control focuses on setting targets, analyzing variances of actual costs against standards, and taking corrective actions. It maintains the status quo.",
          "Cost Reduction is a continuous, dynamic effort to permanently reduce the unit cost of goods or services without impairing their utility. It challenges existing standards and standard cost structures."
        ]
      },
      {
        "title": "Target Costing & Life Cycle Costing",
        "bullets": [
          "Target Costing is a structured approach to determining the design-stage cost at which a product must be produced to achieve a desired profit margins at an anticipated market price. Over 80% of product costs are committed during the design phase through value engineering and value analysis.",
          "Life Cycle Costing identifies and accumulates all costs and revenues of a product over its entire lifespan (from R&D and design, through manufacturing and operations, to disposal and decommissioning) rather than single accounting periods."
        ]
      },
      {
        "title": "Theory of Constraints (TOC) & Environmental Management Accounting (EMA)",
        "bullets": [
          "TOC focuses on maximizing profit by identifying and exploiting the single bottleneck constraint. Goldratt's 5 focusing steps prioritize the throughput rate. Throughput Accounting (TA) treats only direct material costs as variable, and all other expenses as fixed factory overheads.",
          "EMA is the collection and analysis of environmental cost information for internal decisions. UNDSD (2003) classifies methods into: Input-Output Analysis (materials balance), Flow Cost Accounting, Life Cycle Costing, and Activity Based Costing.",
          "EMA helps distinguish between Environment-related costs (directly attributed to environmental centers like water treatment plants) and Environment-driven costs (hidden in general overheads, like increased raw material waste)."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Target Cost",
        "formula": "Target Cost = Expected Market Selling Price - Desired Target Profit Margin",
        "description": "Calculates the maximum allowable cost for the product design team."
      },
      {
        "name": "Cost Reduction Gap",
        "formula": "Target Cost Gap = Estimated Cost - Target Cost",
        "description": "The amount of cost reduction required during value engineering to release a profitable product."
      },
      {
        "name": "Total Life Cycle Costing",
        "formula": "Total Life Cycle Cost = R&D + Design or Prototyping + Manufacturing + Marketing & Distribution + Customer Support + Retirement & Disposal Costs",
        "description": "Accumulates costs across the entire life cycle of a product to evaluate cumulative long-term profitability."
      },
      {
        "name": "TOC Throughput (T)",
        "formula": "Throughput (T) = Sales Revenue - Truly Variable Costs (typically only Direct Materials)",
        "description": "The rate at which the system generates money through product sales, net of raw material costs."
      },
      {
        "name": "Throughput Accounting (TA) Ratio",
        "formula": "TA Ratio = (Throughput Contribution per Bottleneck Minute) / (Factory Cost per Bottleneck Minute)",
        "description": "A TA Ratio greater than 1.0 indicates that the product generates margins faster than the total operating costs of the bottleneck asset."
      },
      {
        "name": "Factory Cost per Bottleneck Minute",
        "formula": "Factory Cost per Minute = Total Operating Expenses (Labor + Overheads) / Total Constraint Minutes Available",
        "description": "Standard TOC rate for recovering fixed factory operating expenses across resource constraints."
      }
    ]
  },
  {
    "id": 5,
    "name": "Chapter 5: Management of Cost Strategically for Emerging Business Models",
    "description": "Change drivers, digital transformation technologies, business ecosystems, hypercompetition, transformations vs. disruptions, lean start-up, and emerging business models.",
    "summaryNotes": [
      {
        "title": "Change Drivers & Digital Transformation",
        "bullets": [
          "A dynamic business environment is shaped by change drivers such as digital technologies, business ecosystems, hypercompetition, and supply chain partnerships.",
          "Eleven key technologies for digital transformation are: IoT, Robotics, AI/Machine Learning, Cloud, Autonomous Vehicles, 3D printing (additive manufacturing), Digital Twins, Augmented Reality, Mobile Internet (5G), and Blockchain."
        ]
      },
      {
        "title": "Business Ecosystems & Hypercompetition",
        "bullets": [
          "A business ecosystem is a network of organizations involved in the joint delivery of a product or service through both competition and cooperation. Powered by three flywheels: Data flywheel, Growth flywheel, and Cost flywheel.",
          "Hypercompetition is characterized by intense rivalry and temporary competitive advantages. D’Aveni's 7S framework (Stakeholder satisfaction, Strategic soothsaying, Speed, Surprise, Signals, Shifting the rules, and Simultaneous thrust) guides firms to create a series of rapid short-term market disruptions."
        ]
      },
      {
        "title": "Transformations, Disruptions, & Lean Start-up",
        "bullets": [
          "Transformation shifts the basis of competition (e.g., UPI payments, cloud computing), whereas Disruption can be Low-end (low-cost business models starting at the bottom) or New-market (expanding the market by targeting non-users).",
          "Lean Start-up replaces traditional business plans with a hypothesis-driven loop (Build-Measure-Learn) to test scientific assumptions using a Minimum Viable Product (MVP) and the 'Five Whys' root-cause investigation.",
          "Intrapreneurship refers to encouraging entrepreneurial innovation within established organizations to counter growth stagnation."
        ]
      },
      {
        "title": "Emerging Business Models",
        "bullets": [
          "The Free Model: Includes Hidden Revenue/Advertising, Cross-subsidisation (Bait-and-hook/razorblade), and Open Source.",
          "The Subscription Model: Generates lock-in and predictable, recurring monthly revenues.",
          "The Freemium Model: Provides simple digital sampling with free basic tiers and premium paid upgrades.",
          "The Digital Platform/E-Commerce Model: Connects buyers and sellers (B2B, B2C, C2B, C2C) to extract platform commissions.",
          "The Hypermarket Model: Focuses on massive scale and low pricing (e.g., brick-and-mortar D-Mart or digital click models).",
          "The Access-Over-Ownership Model: Promotes collaborative asset sharing and rental networks."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Customer Acquisition Cost (CAC)",
        "formula": "CAC = Total Sales and Marketing Spend / Number of New Customers Acquired",
        "description": "Measures customer acquisition cost efficiency."
      },
      {
        "name": "Customer Churn Rate (%)",
        "formula": "Churn Rate (%) = (Customers Lost during Period / Customers at Start of Period) * 100",
        "description": "Indicates subscription business model customer defection rate."
      },
      {
        "name": "Platform Take Rate (%)",
        "formula": "Take Rate (%) = (Platform Commission Revenues / Gross Merchandise Value (GMV)) * 100",
        "description": "Measures monetization efficiency in digital aggregator or platform models."
      }
    ]
  },
  {
    "id": 6,
    "name": "Chapter 6: Strategic Revenue Management",
    "description": "CVP analysis, relevant costing for tactical decisions, pricing methods, pricing strategies, sensitivity analysis, and Kano's performance model.",
    "summaryNotes": [
      {
        "title": "Strategic CVP Analysis & Relevant Costing",
        "bullets": [
          "CVP Analysis investigates interrelationships between price, variable costs, and volume. Under JIT and advanced automated environments, fixed costs are higher, and CVP must integrate non-volume cost-drivers like setup and design hours.",
          "Relevant Costing is used for short-term tactical choices (make or buy, sell or process further, minimum price, keep or drop, special orders). Relevant costs are (1) future costs that (2) differ between alternatives. Sunk costs, historical costs, and allocated arbitrary overheads are excluded."
        ]
      },
      {
        "title": "Pricing Methods & Strategies for Products and Services",
        "bullets": [
          "Pricing Methods: (1) Cost-Based (markup pricing, target rate of return), (2) Competition-Based (going rate pricing, sealed-bid pricing), (3) Value-Based (True Economic Value - TEV, perceived value), (4) Psychological (ending with 99).",
          "Pricing Strategies: Price customization (demographics, time differentials, volume discounts), price discrimination, predatory pricing, and peak-load pricing.",
          "Services Pricing: Must accommodate intangibility, inseparability, variability, and perishability (no storage allowed, empty seats represent pure waste)."
        ]
      },
      {
        "title": "Kano's Performance Attributes",
        "bullets": [
          "Kano Model prioritizes product features to optimize strategic revenue: (1) Threshold attributes (Must-be qualities - taken for granted, e.g., touchscreen), (2) Performance attributes (One-dimensional - linear satisfaction multiplier), (3) Excitement attributes (Attractive features - delight the user), (4) Indifferent attributes, and (5) Reverse attributes."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Price Elasticity of Demand (PED)",
        "formula": "PED = (% Change in Qty Demanded) / (% Change in Price) = (dQ / dP) × (P / Q)",
        "description": "Measures the responsiveness of quantity demanded to price variations. Demand is elastic if |PED| > 1, inelastic if < 1."
      },
      {
        "name": "Marginal Revenue (MR) Equation",
        "formula": "MR = a - 2bQ",
        "description": "Defines incremental revenue per unit in linear markets P = a - bQ. Maximum profit is achieved by setting MR = MC."
      },
      {
        "name": "Activity-Based CVP Break-Even Point",
        "formula": "BEP (Units) = [Fixed Costs + Sum of (Cost Driver Quantity × Driver Rate)] / (Price - Unit Variable Cost)",
        "description": "Incorporates non-volume cost-drivers (batches, product-sustaining) into strategic CVP break-even computations."
      },
      {
        "name": "Profit Maximizing Price (Economic Model)",
        "formula": "Price (P) = a - bQ, where b = Change in Price / Change in Quantity",
        "description": "Linear price-demand curve mapping where profit is maximized by setting P such that Marginal Revenue (MR = a - 2bQ) equals Marginal Cost (MC)."
      },
      {
        "name": "True Economic Value (TEV)",
        "formula": "TEV = Cost of Next Best Alternative + Value of Performance Differential",
        "description": "Value-based pricing metric comparing our product's performance advantages against competitor offerings."
      }
    ]
  },
  {
    "id": 7,
    "name": "Chapter 7: Strategic Profit Management",
    "description": "Deconstruction of operating income variance into Growth, Price-Recovery, and Productivity components; Pareto defects analysis; ABC, ABM, and ABB.",
    "summaryNotes": [
      {
        "title": "Strategic Analysis of Operating Profit",
        "bullets": [
          "Strategic Profit Management splits annual shifts in operating profit into three separate, isolated components: Growth, Price-Recovery, and Productivity.",
          "Growth Component: Quantifies change in operating profit caused solely by changes in quantities sold. Sales prices, input usage rates, and unit resource costs are held constant at base-year levels.",
          "Price-Recovery Component: Examines the firm's pricing power relative to industry-wide cost spikes. It assesses whether selling price increases successfully offset raw material and utility input rate inflation.",
          "Productivity Component: Measures absolute operational efficiency. It isolates direct input rate reductions (raw materials, labor hours, manufacturing overheads) achieved by producing current outputs with less resources."
        ]
      },
      {
        "title": "Pareto Analysis & ABC/ABM/ABB",
        "bullets": [
          "Pareto Defect Analysis: Based on Juran's 80/20 rule, it isolates the 'vital few' defect categories (20%) which generate the majority of total failure costs (80%).",
          "Activity Based Costing (ABC) provides product-costing accuracy by assigning overheads based on operational activity consumption.",
          "Direct Product Profitability (DPP) is a retail costing tool that attributes purchase cost, storage volume, and handling activity directly to individual product lines to identify profit erosion.",
          "Activity Based Management (ABM) is divided into Operational ABM (doing things right - cost reduction) and Strategic ABM (doing the right things - product selection). Activity Based Budgeting (ABB) reverses the ABC process for planning."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Operating Profit Change Deconstruction",
        "formula": "Operating Income Change = Growth impact + Price-Recovery impact + Productivity impact",
        "description": "Reconciles change in profit over successive periods."
      },
      {
        "name": "DuPont Capital Return Analysis",
        "formula": "ROI = Net Profit Margin (%) × Asset Turnover = (EBIT / Sales) × (Sales / Capital Employed)",
        "description": "Deconstructs Return on Investment (ROI) into operating profitability margin and capital efficiency/utilisation rate."
      },
      {
        "name": "Revenue Impact from Growth Component",
        "formula": "Revenue Growth Impact = (Current Year Sales Volume - Base Year Sales Volume) × Base Year Selling Price",
        "description": "Measures profit contribution from sales volume expansion, assuming selling prices are fixed."
      },
      {
        "name": "Cost Impact from Growth Component",
        "formula": "Cost Growth Impact = (Input Qty required for Current Output under Base Productivity - Base Input Qty used) × Base Input Price",
        "description": "Tracks estimated change in variable costs from increasing volume under historical efficiency."
      },
      {
        "name": "Revenue Impact from Price-Recovery Component",
        "formula": "Price-Recovery Revenue Impact = (Current Year Selling Price - Base Year Selling Price) × Current Year Sales Volume",
        "description": "Measures direct sales-price-increase profits, testing market pricing power."
      },
      {
        "name": "Cost Impact from Price-Recovery Component",
        "formula": "Price-Recovery Cost Impact = (Current Year Input Price - Base Year Input Price) × Input Qty required for Current Year Output",
        "description": "Measures rate adjustments in raw materials and labor inputs on current year output bounds."
      },
      {
        "name": "Operating Productivity Component",
        "formula": "Productivity Component = (Input Qty required for Current Output under Base Productivity - Actual Input Qty Used) × Current Year Input Price",
        "description": "Isolates operational efficiency savings priced at current rates. Key metric for floor-level Lean controls."
      },
      {
        "name": "Direct Product Profitability (DPP)",
        "formula": "DPP = Selling Price - Purchase Price - Direct Product Costs (Warehouse + Transport + Retail Store)",
        "description": "Deducts directly attributable product handling overheads from gross margin to find true unit profit."
      }
    ]
  },
  {
    "id": 8,
    "name": "Chapter 8: An Introduction to Strategic Performance Management",
    "description": "Strategy alignment, McKinsey's 7S matrix, and corporate failure prediction models (Altman Z score, Beaver, Taffler & Tishaw, ZETA, and Argenti A-Score).",
    "summaryNotes": [
      {
        "title": "Strategic Performance & McKinsey's 7S Frame",
        "bullets": [
          "An effective performance management system must be aligned with overall corporate strategy, organizational structure, and culture to prevent strategic drift and sub-optimization.",
          "McKinsey's 7S Framework maps a constellation of seven interrelated factors divided into Hard Ss (Strategy, Structure, Systems - easily quantified and managed) and Soft Ss (Style, Staff, Skills, Shared Values).",
          "There is no hierarchy in the constellation; all elements are equally important, with Shared Values (Superordinate Goals) positioned in the center, guiding organizational behavior."
        ]
      },
      {
        "title": "Predicting & Preventing Corporate Failure",
        "bullets": [
          "Corporate failure is a reflection of deep-seated corporate shortcomings. Performance management plays a critical role in early prediction to allow corrective turnaround strategies.",
          "Quantitative Models: Rely on financial ratios (profitability, leverage, solvency) and statistical models. Key models: Altman Z-score, Beaver's univariate model, Taffler and Tishaw's PAS, ZETA model, and H Score (Company Watch).",
          "Qualitative Models: Rely on organizational risks and signs. Argenti's A-Score splits indicators into: defects (autocratic leadership, passive board, poor accounting), mistakes (high gearing, overtrading, single failed big project), and symptoms of trouble (deteriorating ratios, low morale, creative accounting)."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Altman Z-Score (Public Manufacturing Firms - 1968)",
        "formula": "Z-Score = 1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5",
        "description": "Combines five financial ratios: X1 = Working Capital/Total Assets, X2 = Retained Earnings/Total Assets, X3 = EBIT/Total Assets, X4 = Market Value of Equity/Total Liabilities, X5 = Sales/Total Assets. Safe Zone > 2.99; Grey Zone 1.81 - 2.99; Distress Zone < 1.81."
      },
      {
        "name": "Altman Z-Score (Private Manufacturing Firms - 1983)",
        "formula": "Z-Score = 0.717X1 + 0.847X2 + 3.107X3 + 0.420X4 + 0.998X5",
        "description": "Uses Book Value of Equity for X4. Safe Zone > 2.99; Grey Zone 1.23 - 2.99; Distress Zone < 1.23."
      },
      {
        "name": "Altman Z-Score (Non-Manufacturing / Emerging Markets)",
        "formula": "Z-Score = 6.56X1 + 3.26X2 + 6.72X3 + 1.05X4 (for emerging, add 3.25 constant)",
        "description": "Four-variable model minimizing asset turnover industry effects. Safe Zone > 2.6; Distress Zone < 1.1."
      },
      {
        "name": "Taffler's PAS / Z score formula",
        "formula": "Z = 3.2 + 12.18X1 + 2.50X2 - 10.68X3 + 0.029X4",
        "description": "X1 = PBT/Current Assets, X2 = Current Assets/Current Liabilities, X3 = Current Liabilities/Total Assets, X4 = no credit interval. Negative indicates potential bankruptcy."
      }
    ]
  },
  {
    "id": 9,
    "name": "Chapter 9: Strategic Performance Measures in Private Sector",
    "description": "Financial performance indicators (GP, ROCE, ROI, Residual Income, EPS, EVA, NPV), and non-financial frameworks (TBL, Balanced Scorecard, Performance Pyramid, and Building Block Model).",
    "summaryNotes": [
      {
        "title": "Financial Metrics & ROI Concerns",
        "bullets": [
          "Traditional financial performance relies on Gross Profit margin, Return on Capital Employed (ROCE), and divisional Return on Investment (ROI).",
          "Evaluating divisional managers on the basis of ROI can discourage capital investment and lead to sub-optimization (e.g. rejecting capital projects exceeding cost of capital if they drop the division's current above-average ROI).",
          "Residual Income (RI) overcomes ROI sub-optimization by using an absolute amount of excess profit over a capital charge."
        ]
      },
      {
        "title": "Economic Value Added (EVA) Adjustments",
        "bullets": [
          "Developed by Stern Stewart, EVA is a measure of economic profit that accounts for both option-cost of equity and debt.",
          "EVA adjusts Accounting Profit to combat distortion: (1) Research & Development and marketing costs are capitalized rather than expensed, (2) Non-cash provisions and standard depreciation are added back and replaced with economics/cash estimates, (3) Tax paid is adjusted for tax relief on interest."
        ]
      },
      {
        "title": "Non-Financial & Multidimensional Performance Frameworks",
        "bullets": [
          "Triple Bottom Line (TBL): Expands accounting beyond monetary profit to measure performance across three dimensions: People (social equity), Planet (environmental impact), and Profit (economic success).",
          "Balanced Scorecard: Translates corporate strategy into four active perspectives: Financial, Customer (retention, complaints, brand), Internal Business Processes (defects, setups), and Learning and Growth (training, morale).",
          "Performance Pyramid (Cross & Lynch): Links strategy to operations across four levels: Corporate Vision, SBU Market/Finance strategy, Business Operating Systems (flexibility, quality, productivity), and shopfloor Departments (waste, cycle time).",
          "Building Block Model (Fitzgerald & Moon): Tailor-made for service sector. Dimensions: Results (Financial Performance, Competitive Performance) & Determinants (Quality, Flexibility, Innovation, Resource Utilization). Standards: Equity, Ownership, Achievability. Rewards: Motivation, Clarity, Controllability."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Standard Return on Capital Employed (ROCE) %",
        "formula": "ROCE (%) = [ Profit Before Interest and Tax (PBIT) / Average Capital Employed ] * 100",
        "description": "Measures capital base productivity. Capital employed equals total assets less current liabilities."
      },
      {
        "name": "Residual Income (RI)",
        "formula": "RI = Controllable Profit - (Controllable divisional Net Assets × Cost of Capital / Hurdle Rate)",
        "description": "Measures excess cash generated beyond minimum acceptable hurdle rates."
      },
      {
        "name": "Economic Value Added (EVA)",
        "formula": "EVA = Net Operating Profit After Tax (NOPAT) - (Capital Employed × WACC)",
        "description": "Measures economic wealth generation. WACC is the weighted average cost of debt (adjusted for tax) and cost of equity."
      },
      {
        "name": "Earnings Per Share (EPS)",
        "formula": "EPS = Profit Attributable to Ordinary Shareholders / Weighted Average Number of Shares Outstanding",
        "description": "Measures divisional net earnings generated per standalone equity share."
      }
    ]
  },
  {
    "id": 10,
    "name": "Chapter 10: Strategic Performance Measures in the Non-For-Profit Organisations",
    "description": "Key characteristics of NPOs, cost-benefit trade-offs, Value for Money (VFM) framework (3Es, 5Es, and 5 elements), and the Adapted Balanced Scorecard.",
    "summaryNotes": [
      {
        "title": "Key Characteristics & Challenges of NPOs",
        "bullets": [
          "Non-for-profit organizations (NPOs) are established to perform non-economic societal, charitable, or welfare activities.",
          "They do not prioritize shareholder wealth creation; however, they have a strict fiduciary duty of trust to demonstrate to contributors that funds are applied efficiently toward stated purposes.",
          "Challenges: Costs and benefits are difficult to quantify due to behavioral/qualitative outcomes. NPOs typically have multiple, diverse, and sometimes conflicting stakeholder objectives."
        ]
      },
      {
        "title": "The Value for Money (VFM) Framework & 5Es",
        "bullets": [
          "The VFM framework establishes a measurable link between resources spent and the purpose attained. Based on 3Es: Economy (spend less - are inputs obtained at lowest cost?), Efficiency (spend well - is maximum output achieved per input?), and Effectiveness (spend wisely - are desired objectives met?).",
          "Modern VFM adds two more Es: Equity (spend fairly) and Ethics (spend properly).",
          "VFM relies on 5 core elements to be tracked properly: Input (resources), Process (operations), Output (direct quantities), Outcome (specific results), and Impact (long-term societal benefits)."
        ]
      },
      {
        "title": "Adapted Balanced Scorecard by Kaplan",
        "bullets": [
          "In 2001, Robert Kaplan suggested an Adapted Balanced Scorecard for NPOs.",
          "Since financial success is not the primary objective, the positioning of perspectives is switched: the mission statement is placed at the very top, and the Customer Perspective (satisfaction of beneficiaries) is prioritized over the Financial Perspective (fundraising and redistribution)."
        ]
      }
    ],
    "formulas": [
      {
        "name": "NPO Efficiency Ratio (Process KPI)",
        "formula": "Efficiency (%) = (Standard Input Resources Allowed for Actual Output / Actual Input Resources Used) * 100",
        "description": "Indicates how well NPO inputs are converted into output service quantities."
      },
      {
        "name": "VFM Capacity Utilization Index",
        "formula": "Vacancy Rent Lost Ratio (%) = (Rent Lost on Unoccupied properties / Total Gross Potential Rent) * 100",
        "description": "Tracks opportunity costs of unused public assets/service capacities to evaluate operational economy."
      }
    ]
  },
  {
    "id": 11,
    "name": "Chapter 11: Preparation of Performance Reports",
    "description": "Role of reports in responsibility accounting, steps of preparation, types of reports (Earned Value, Forecasting, Status, Trend, Variance), and external frameworks (TBL, GRI, ESG, and IR).",
    "summaryNotes": [
      {
        "title": "Responsibility Accounting & Reporting Steps",
        "bullets": [
          "Responsibility accounting assigns collection and reporting of cost and revenue data directly to individual managers held accountable for them.",
          "A performance report compares actual outcomes against budgets/standards, starting from the bottom up to inform managers of deviations.",
          "Six steps of preparation: (1) Understand user need, (2) Establish objectives in light of mission, (3) Add an Executive Summary, (4) Place actual performance assessment, (5) Refine layout with visual elements, (6) Cross-check details."
        ]
      },
      {
        "title": "Types of Reports & Sustainability Frameworks",
        "bullets": [
          "Common Report Types: Earned Value Report (scope, schedule, and cost integration), Forecasting Report, Progress Report, Status Report (snapshot of current time, cost, quality), Trend Report (peer time-series), and Variance Report.",
          "External reporting frameworks move beyond financial statements: (1) Triple Bottom Line (TBL), (2) Global Reporting Initiative (GRI - globally accepted sustainability standards), (3) ESG reporting (environmental, social, and governance disclosures), (4) Integrated Reporting (IR - concise value-creation message)."
        ]
      },
      {
        "title": "The Six Capitals of Integrated Reporting <IR>",
        "bullets": [
          "Value is created through capital inputs. The <IR> framework recognizes 6 categories of capital: (1) Financial, (2) Manufactured (physical assets), (3) Intellectual (knowledge, software, patents), (4) Human (staff skills, ethics), (5) Social & Relationship (brand trust, client relationships), and (6) Natural (environment resources, land, water)."
        ]
      }
    ],
    "formulas": [
      {
        "name": "EVM Cost Variance (CV)",
        "formula": "Cost Variance (CV) = Earned Value (EV) - Actual Cost (AC)",
        "description": "Standard reporting variance. Negative indicates that the project is operating over-budget."
      },
      {
        "name": "EVM Schedule Variance (SV)",
        "formula": "Schedule Variance (SV) = Earned Value (EV) - Planned Value (PV)",
        "description": "Measures project scheduling deviations in financial terms. Negative indicates timeline delays."
      },
      {
        "name": "EVM Cost Performance Index (CPI)",
        "formula": "CPI = Earned Value (EV) / Actual Cost (AC)",
        "description": "Indicates cost efficiency. CPI > 1.0 means spending is under budget, CPI < 1.0 means spending is over budget."
      },
      {
        "name": "EVM Schedule Performance Index (SPI)",
        "formula": "SPI = Earned Value (EV) / Planned Value (PV)",
        "description": "Indicates scheduling rate efficiency. SPI > 1.0 means ahead of timeline, SPI < 1.0 means behind timeline."
      },
      {
        "name": "EVM Project Estimate at Completion (EAC)",
        "formula": "EAC = Budget at Completion (BAC) / CPI",
        "description": "Predicts ultimate project costs assuming current operational variances continue until project close."
      }
    ]
  },
  {
    "id": 12,
    "name": "Chapter 12: Divisional Transfer Pricing",
    "description": "Decentralized divisions, goal congruence, transfer pricing methods, minimum/maximum bounds, divisional conflicts (Dual rate vs. Two-part pricing), and international taxation.",
    "summaryNotes": [
      {
        "title": "Goal Congruence & Transfer Pricing Utilities",
        "bullets": [
          "Transfer pricing is the value assigned to inter-divisional transfers of goods, services, or assets.",
          "Decentralized firms delegate decision-making to divisional managers. Goal Congruence is achieved when managers, taking actions in their own self-interest, also make decisions that maximize company-wide profitability.",
          "Utilities of TP: Performance evaluation (profit center accountability), resource allocation, employee motivation, tax minimization, and capital repatriation."
        ]
      },
      {
        "title": "Minimum and Maximum Transfer Prices",
        "bullets": [
          "Minimum Transfer Price (Supplying Division's Floor): Additional Outlay Cost per unit + Opportunity Cost per unit (the lost contribution margin of external retail sales that must be curtailed to accommodate the transfer). If excess capacity exists, opportunity cost is zero.",
          "Maximum Transfer Price (Purchasing Division's Ceiling): Lower of Net Marginal Revenue (final selling price minus further processing costs) and the external market buy-in price."
        ]
      },
      {
        "title": "Divisional Conflicts & Resolution Systems",
        "bullets": [
          "Divisional conflicts occur when transfer prices that achieve company-wide goal congruence result in a paper loss for one of the divisions, demotivating managers.",
          "Dual Rate transfer pricing: The Supplying Division is credited with full cost plus a normal profit margin (satisfying performance evaluation), while the Receiving Division is charged only marginal cost (inducing optimal volume decisions). Profits are reconciled at consolidation.",
          "Two-Part transfer pricing: Transfers are made at supplying marginal cost per unit sold plus a lump-sum fixed fee representing the capacity reserved, preventing marginal cost inflation."
        ]
      },
      {
        "title": "International Transfer Pricing & Taxes",
        "bullets": [
          "MNCs use transfer pricing strategically to reduce global tax impacts. High-tax countries are charged lower incoming transfer prices (or higher outgoing ones) to shift profits to lower-tax jurisdictions.",
          "Tax authorities regulate avoidance via arm's length price enforcement (regulated by Section 92A to 92F of Indian Income Tax Act, 1961)."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Minimum Transfer Price Formula",
        "formula": "Minimum TP = Variable Cost per unit + Opportunity Cost per unit",
        "description": "Establishes the absolute cost-recovery floor under different capacity settings."
      },
      {
        "name": "Supplying Division Opportunity Cost",
        "formula": "Opportunity Cost per unit = (Displaced External Sales × Contribution per External unit) / Total Units Transferred",
        "description": "Calculates the exact unit opportunity cost of displaced external sales. Equal to zero if the supplying division has excess capacity."
      },
      {
        "name": "Maximum Transfer Price Formula",
        "formula": "Maximum TP = Lower of (External Buy-in Price, Net Marginal Revenue)",
        "description": "The ceiling pricing range ensuring receiving division does not face paper operations deficits."
      },
      {
        "name": "Divisional Profit Split Ratio",
        "formula": "Allocable Profit Share (%) = (Divisional Costs Incurred / Total Combined Costs) * 100",
        "description": "Distributes final combined product profits back to divisions based on relative value addition (cost contribution)."
      }
    ]
  },
  {
    "id": 13,
    "name": "Chapter 13: Standard Costing",
    "description": "Advanced variances, Planning vs. Operational variances, ABC-based variances, relevant cost approach, learning curves, and sales mix/quantity and market size/share variances.",
    "summaryNotes": [
      {
        "title": "Planning (Revision) vs. Operational Variances",
        "bullets": [
          "In volatile business environments, traditional standard cost variances are inadequate because standards become outdated quickly.",
          "Advanced variance analysis splits traditional variances into: (1) Planning Variances (uncontrollable, compared revised standard to original standard) and (2) Operational Variances (controllable, compares actual results to the revised ex-post standard).",
          "Separation ensures managers are evaluated only on controllable operational realities (e.g. negotiation price savings) rather than uncontrollable planning errors or market movements (e.g. inflation)."
        ]
      },
      {
        "title": "Advanced Variances in ABC & Standard marginal costing",
        "bullets": [
          "Activity-Based Costing (ABC) Variances: Splits overhead variances into (1) Expenditure variance (paying more or less than standard for actual activities) and (2) Efficiency variance (the cost impact of undertaking more or less activity runs than standard).",
          "Under standard marginal costing, there is no fixed overhead volume variance (as fixed costs are treated as period costs). Only fixed overhead expenditure variance is calculated.",
          "Standard costing applies differently in service industries due to high overhead compositions, often utilizing McDonaldization (breaking processes into basic, standardized steps)."
        ]
      },
      {
        "title": "Advanced Sales, Mix, and Market Variances",
        "bullets": [
          "Sales Volume Variance is sub-divided into: (1) Sales Mix Variance (actual quantity sold in actual mix vs. budgeted mix) and (2) Sales Quantity Variance (budgeted mix vs. actual quantity in budgeted mix).",
          "Sales Quantity variance can be further split into: (1) Market Size Variance (changes in general industry demand) and (2) Market Share Variance (changes in our specific market share %)."
        ]
      }
    ],
    "formulas": [
      {
        "name": "Direct Material Planning Variance",
        "formula": "Planning Price Variance = (Original Standard Price - Revised Standard Price) × Revised Standard Quantity",
        "description": "Measures change in required standard costs due to external market revisions."
      },
      {
        "name": "Direct Material Operational Variance",
        "formula": "Operational Price Variance = (Revised Standard Price - Actual Price) × Actual Quantity Purchased",
        "description": "Controllable price variance evaluating purchasing department performance."
      },
      {
        "name": "Material Mix Variance",
        "formula": "Material Mix Variance = (Actual Quantity in Actual Mix - Actual Quantity in Standard Mix) × Standard Price per Unit",
        "description": "Calculates the financial impact of blending raw materials in proportions different from standard specifications."
      },
      {
        "name": "Material Yield Variance",
        "formula": "Material Yield Variance = (Actual Quantity in Standard Mix - Standard Quantity allowed for Actual Output) × Standard Price per Unit",
        "description": "Evaluates material yield efficiency, checking if total raw inputs consumed were higher/lower than standard allowance for actual output."
      },
      {
        "name": "Direct Labor Efficiency Variance",
        "formula": "Labor Efficiency Variance = (Actual Hours Worked - Standard Hours Allowed for Actual Output) × Standard Rate per Hour",
        "description": "Measures the cost impact of worker speed, comparing actual hours spent against standard hours allowed."
      },
      {
        "name": "ABC Overhead Efficiency Variance",
        "formula": "ABC Efficiency = (Standard allowed Cost Driver Units - Actual Cost Driver Units Used) × Standard Rate per Driver",
        "description": "Quantifies the profit/cost impact of activity rate efficiency."
      },
      {
        "name": "Sales Contribution Mix Variance",
        "formula": "Sales Mix Variance = (Actual Qty in actual mix - Actual Qty in budgeted mix) × Standard Contribution per unit",
        "description": "Measures impact on profits from shifting relative quantities of products sold."
      },
      {
        "name": "Sales Contribution Quantity Variance",
        "formula": "Sales Quantity Variance = (Actual Qty in budgeted mix - Budgeted Qty) × Standard Contribution per unit",
        "description": "Measures the impact on profits of changes in absolute sales volumes sold."
      },
      {
        "name": "Sales Market Size Variance",
        "formula": "Market Size Variance = Budgeted Market Share % × (Actual Industry Sales Qty - Budgeted Industry Sales Qty) × Average Standard Contribution",
        "description": "Isolates profit fluctuations due to growth or contraction of the overall market."
      },
      {
        "name": "Sales Market Share Variance",
        "formula": "Market Share Variance = (Actual Market Share % - Budgeted Market Share %) × Actual Industry Sales Qty × Average Standard Contribution",
        "description": "Measures profit changes caused by gaining or losing competitive market share."
      }
    ]
  }
];

export const caseScenarios: CaseScenario[] = [
  {
    id: "case-01",
    title: "ABC Garments: Value Chain Optimization & Quality Costs",
    chapterId: 1,
    chapterName: "Chapter 1: An Introduction to Strategic Cost Management",
    scenarioText: "ABC Ltd. is a leading manufacturer and exporter of readymade garments. It has a state-of-the-art manufacturing facility in Ludhiana, Punjab. Exports form a substantial portion of its revenue, with European Union markets and the United States being the primary markets. Quality of the product is a critical success factor for competing in the global markets. Inflationary conditions and geopolitical pressures have reduced profit margins in recent years.\n\nIn response to improve its competitiveness, the management of the company has launched a Value Chain Optimization study. Below is a detailed breakdown of the value chain:\n\n1. Upstream Management: Premium fabric and accessories sourced from a network of suppliers across India. Activities involved include handling, storage, and transportation of fabrics, ensuring that only high-grade inputs enter the production process.\n2. Core Manufacturing processes: Stitching, cutting, finishing, and packaging of garments. The management wants to ensure these activities are refined such that there is reduction in waste, rework, etc., that can eliminate defects. This will help them fulfill any warranty assurance given to customers.\n3. Global Distribution: Order processing, packaging, and distribution of finished garments to export markets form part of selling and distribution activities.\n\nThe company wishes to cement its market presence through promotion, pricing strategies, and effective channel management. In order to enhance customer experience, the company plans to improve the terms for product warranty, repairing, and replacement services.\n\nFollowing the study, the company implements several key measures:\n- Introduction of a new automated inventory tracking system to ensure availability of optimal quality raw material input at the required time on the shop floor.\n- Upgrading product warranty terms from 1 year to 2 years, planning to purchase more durable fabrics specifically to mitigate repair claims.\n- Comprehensive training given to employees regarding storing, handling, stitching, and packing of materials and the final product.",
    questions: [
      {
        id: "q-1-1",
        questionText: "The activity involving handling, storage, and transportation of fabrics and accessories from suppliers falls under which of the following primary activities of Porter's Value Chain?",
        options: {
          A: "Operations",
          B: "Outbound Logistics",
          C: "Inbound Logistics",
          D: "Service"
        },
        correctOption: "C",
        explanation: "Inbound logistics involves receiving, storing, and managing the flow of raw materials and inputs from suppliers into the production process prior to manufacturing."
      },
      {
        id: "q-1-2",
        questionText: "In ABC Ltd., stitching, cutting, finishing, and packaging of garments are classified under which primary value chain activity?",
        options: {
          A: "Operations",
          B: "Inbound Logistics",
          C: "Procurement",
          D: "Outbound Logistics"
        },
        correctOption: "A",
        explanation: "Operations deals with transforming the inputs (fabrics and accessories) into final finished products (ready-made garments) on the factory/shop floor."
      },
      {
        id: "q-1-3",
        questionText: "Order processing, packaging, and distribution of finished garments to international export markets represent examples of which primary activity?",
        options: {
          A: "Inbound Logistics",
          B: "Marketing and Sales",
          C: "Service",
          D: "Outbound Logistics"
        },
        correctOption: "D",
        explanation: "Outbound logistics deals with the storage, movement, and dispatch of finished goods from the manufacturing site to the final customers or global distribution retail outlets."
      },
      {
        id: "q-1-4",
        questionText: "The management’s decision to impart employee training regarding quality handling and stitching should be classified under which category in a Cost of Quality (COQ) report?",
        options: {
          A: "Internal Failure Cost",
          B: "External Failure Cost",
          C: "Prevention Cost",
          D: "Appraisal Cost"
        },
        correctOption: "C",
        explanation: "Employee training is a proactive measure undertaken before the product is manufactured to prevent errors, defects, and waste from occurring in the first place."
      }
    ]
  },
  {
    id: "case-02",
    title: "Nimbus Bike Limited: Standard Costing vs. Kaizen Costing",
    chapterId: 3,
    chapterName: "Chapter 3: Lean System and Innovation",
    scenarioText: "Nimbus Bike Limited (NBL) is a manufacturer of bikes in India. Demand is high on account of a growing youth population (age 18-30). NBL is the second largest bike manufacturer in India. Competition is stiff in a highly price-sensitive market.\n\nUntil now, the company has followed a standard costing methodology, where standard costs are reviewed once annually. However, despite MIS reports indicating that cost variances are favorable and under control, NBL's bikes are not cost-competitive in the market.Tarun Kumar, the CEO, wants to adopt the Kaizen Costing methodology. Currently, the manufacturing cost is ₹60,000 per bike. On adopting Kaizen, the management sets a goal of achieving a 1% cost reduction next month (July 2026).\n\nSuggestions received from employees during general discussions:\n1. Raj (Design Engineer): Redesign a particular part of the bike's engine, reducing assembly time by 0.1%.\n2. Stanley (Procurement Manager): Switch to another supplier who can supply the identical component at the same quality but at a lower price.\n3. Chatur (Production Manager): Revamp the entire production and assembly line with a massive capital layout to increase the scale of production substantially.\n4. Ankur (Paint Shop): Implement SMED (Single-Minute Exchange of Die) to reduce setup time when painting bikes of different colors.\n\nTo make Kaizen effective, NBL adopts the 5S methodology with the following measures:\n- Measure 1: Remove unnecessary items from the assembly line to reduce installing errors (Seiri / Sort).\n- Measure 2: Arrange tools in 'shadow boards' so workers gain instant access and know where they belong (Seiton / Set in Order).\n- Measure 3: Clean the workstation daily, inspect machinery for early warning signs of wear (Seiso / Shine).\n- Measure 4: Standardize processes into Standard Operating Procedures (Seiketsu / Standardize).\n- Measure 5: Conduct daily monitoring, staff training, and accountability to sustain standards (Shitsuke / Sustain).\n\nFollowing July 2026, the actual cost reduction achieved is ₹500 per bike.",
    questions: [
      {
        id: "q-2-1",
        questionText: "Which of the following statements is NOT a fundamental difference between Standard Costing (NBL's current practice) and Kaizen Costing (proposed)?",
        options: {
          A: "Standard costing is a cost control technique while Kaizen costing is a cost reduction technique.",
          B: "The frequency of setting and reviewing standards is less under Kaizen Costing than Standard Costing.",
          C: "Standard costing assumes stable current work conditions while Kaizen costing assumes continuous improvements.",
          D: "Standard costing focuses on meeting pre-set standards whereas Kaizen focuses on continuous modular reduction targets."
        },
        correctOption: "B",
        explanation: "Under Standard Costing, standards are typical set annually or semi-annually (NBL does it once a year). Under Kaizen, standard and target reductions are set much more frequently (often weekly or monthly) and updated continuously to lock in previous improvements. Thus, frequency is HIGHER under Kaizen."
      },
      {
        id: "q-2-2",
        questionText: "Which of the suggestions provided by NBL employees does NOT qualify as a core principle of Kaizen costing?",
        options: {
          A: "Raj's suggestion on part redesign to save 0.1% assembly time",
          B: "Stanley's suggestion to renegotiate the component price with a new supplier",
          C: "Chatur's suggestion to revamp the entire production and assembly line",
          D: "Ankur's suggestion on SMED setup time reduction"
        },
        correctOption: "C",
        explanation: "Chatur is proposing a Radical Process Redesign (essentially Business Process Re-engineering) which involves large-scale, capital-intensive overhauls of the system. Kaizen is strictly about small, incremental, continuous, employee-driven improvements inside current systems without massive capital layouts."
      },
      {
        id: "q-2-3",
        questionText: "How will the actual cost reduction of ₹500 achieved in July 2026 be analyzed under the Kaizen costing framework?",
        options: {
          A: "It will be compared with standard variance and the favorable difference credited to cost centers.",
          B: "It will be ignored since the amount (₹500 vs target 1% of ₹60,000 = ₹600) is close enough.",
          C: "The ₹100 per bike gap between the actual reduction (₹500) and target reduction (₹600) will be investigated and further analyzed.",
          D: "It will be charged to production staff as an adverse labor variance."
        },
        correctOption: "C",
        explanation: "The set goal was 1% of ₹60,000, which equals ₹600 per bike. The achieved cost reduction was ₹500. There remains a gap of ₹100 per bike. Under Kaizen, any gap between target and actual cost reduction is rigorously analyzed to determine the cause of under-achievement and plan corrective action."
      },
      {
        id: "q-2-4",
        questionText: "A shift from top-down management-approved mandates to bottom-up feedback models based on inputs from self-empowered shop-floor workers represents what kind of necessity for adopting Kaizen?",
        options: {
          A: "A strictly financial standard transition",
          B: "A critical organizational culture shift",
          C: "An automated software-defined workflow",
          D: "A product lifecycle extension phase"
        },
        correctOption: "B",
        explanation: "For Kaizen to be successful at NBL, it requires a cultural shift in employee management. Workers on the shop floor actually executing the process are the best source of continuous improvements and must be empowered to propose and implement adjustments."
      }
    ]
  },
  {
    id: "case-03",
    title: "Sigma Manufacturing: Total Productive Maintenance & OEE",
    chapterId: 3,
    chapterName: "Chapter 3: Lean System and Innovation",
    scenarioText: "Sigma Manufacturing Limited operates in a highly competitive, volume-driven environment where equipment reliability, process efficiency, and quality consistency are critical. Machinery X-272K-300, deployed on a continuous production line, operates on a 9-hour shift each day. During the shift, workers are entitled to three short breaks of 10 minutes each and a meal break of 45 minutes, resulting in a total planned downtime of 75 minutes. In addition, the machine experienced unplanned equipment downtime of 30 minutes, representing technical breakdowns.\n\nUnder standard operating conditions, the machine is designed to produce 30 parts per minute. During the shift, total output produced by the machine was 12,240 units, out of which 240 units were rejected due to defective manufacturing.\n\nManagement uses the Overall Equipment Effectiveness (OEE) metric to assess availability, speed efficiency, and quality rates to coordinate maintenance efforts under Total Productive Maintenance (TPM).",
    questions: [
      {
        id: "q-3-1",
        questionText: "What is the Net Available Time (Planned Production Time) for the shift, in minutes?",
        options: {
          A: "540 minutes",
          B: "465 minutes",
          C: "435 minutes",
          D: "510 minutes"
        },
        correctOption: "B",
        explanation: "Total shift time = 9 hours x 60 minutes = 540 minutes. Planned downtime (breaks) = 15 mins x 3 + 45 mins = 75 minutes. Net Available Time = 540 - 75 = 465 minutes."
      },
      {
        id: "q-3-2",
        questionText: "What represents the Availability loss in the given scenario?",
        options: {
          A: "Planned breaks and meal times of 75 minutes",
          B: "240 units of rejected parts",
          C: "30 minutes of unplanned equipment downtime",
          D: "The speed deficit of producing below design speed"
        },
        correctOption: "C",
        explanation: "Availability loss is represented by unplanned downtime such as equipment breakdowns or component failures (30 minutes in this case). Planned downtime (breaks) is excluded from Net Available Time."
      },
      {
        id: "q-3-3",
        questionText: "Calculate the Availability Rate and Performance Rate of Machinery X-272K-300.",
        options: {
          A: "Availability: 93.55%; Performance: 93.79%",
          B: "Availability: 92.47%; Performance: 98.04%",
          C: "Availability: 93.79%; Performance: 92.47%",
          D: "Availability: 93.55%; Performance: 98.04%"
        },
        correctOption: "A",
        explanation: "Net Available Time = 465 mins. Unplanned downtime = 30 mins. Net Operating Time = 465 - 30 = 435 mins. Availability = 435 / 465 = 93.55%. Ideal time for total output = 12,240 parts / 30 parts/min = 408 mins. Performance Rate = Ideal Operating Time / Net Operating Time = 408 / 435 = 93.79%."
      },
      {
        id: "q-3-4",
        questionText: "What is the Quality Rate of the process and the Overall Equipment Effectiveness (OEE) of the machinery?",
        options: {
          A: "Quality: 98.04%; OEE: 86.02%",
          B: "Quality: 96.12%; OEE: 84.45%",
          C: "Quality: 98.04%; OEE: 88.50%",
          D: "Quality: 95.00%; OEE: 86.02%"
        },
        correctOption: "A",
        explanation: "Good count = 12,240 - 240 = 12,000 units. Quality rate = Good Count / Total Count = 12,000 / 12,240 = 98.04%. OEE = Availability * Performance * Quality = 93.55% * 93.79% * 98.04% = 86.02%."
      }
    ]
  },
  {
    id: "case-04",
    title: "Precision Motors: Pareto Quality Defect Analysis",
    chapterId: 7,
    chapterName: "Chapter 7: Strategic Profit Management",
    scenarioText: "Precision Motors Pvt. Ltd., a leading manufacturer of automobile engine components, conducted a quality inspection over one month to identify the most frequent defects in its cylinder head production line. The inspection team recorded the following defect types and their instances of occurrence:\n\n- Surface scratches on metal: 110 cases\n- Rough edges after milling: 70 cases\n- Uneven surface grinding: 60 cases\n- Paint/Coating colour mismatch: 25 cases\n- Incorrect valve seat machining: 20 cases\n- Bolt hole misalignment: 10 cases\n- Oil stains on finished parts: 5 cases\n\nThe management intends to apply Pareto Analysis (the 80:20 rule) to identify the 'vital few' defect categories that contribute to the overwhelming majority of defects, allowing engineers to focus resources on the highest-payoff corrective measures.",
    questions: [
      {
        id: "q-4-1",
        questionText: "What is the total number of quality defects recorded during the monthly inspection period?",
        options: {
          A: "285 defects",
          B: "300 defects",
          C: "295 defects",
          D: "310 defects"
        },
        correctOption: "B",
        explanation: "Total defects = 110 (scratches) + 70 (edges) + 60 (grinding) + 25 (colour) + 20 (machining) + 10 (bolt hole) + 5 (stains) = 300 defects."
      },
      {
        id: "q-4-2",
        questionText: "In a cumulative Pareto chart for this data, what is the exact cumulative percentage after tackling the top two most frequent defects?",
        options: {
          A: "36.67%",
          B: "60.00%",
          C: "50.00%",
          D: "80.00%"
        },
        correctOption: "B",
        explanation: "Sum of top two defects = 110 (scratches) + 70 (rough edges) = 180. Cumulative percentage = (180 / 300) x 100 = 60.00%."
      },
      {
        id: "q-4-3",
        questionText: "If the engineering team applies Pareto Analysis, which three specific defect types must be prioritized to address exactly 80% of the total quality issues?",
        options: {
          A: "Surface scratches on metal, Rough edges after milling, Paint/Coating colour mismatch",
          B: "Surface scratches on metal, Rough edges after milling, Uneven surface grinding",
          C: "Rough edges after milling, Bolt hole misalignment, Paint/Coating colour mismatch",
          D: "Uneven surface grinding, Incorrect valve seat machining, Oil stains on finished parts"
        },
        correctOption: "B",
        explanation: "Top three defects = 110 + 70 + 60 = 240 defects. Cumulative percentage = (240 / 300) x 100 = 80.00%. These represent the 'vital few' categories."
      },
      {
        id: "q-4-4",
        questionText: "The Pareto Principle is based conceptually on which of the following economic or natural laws?",
        options: {
          A: "Law of Diminishing Returns",
          B: "Law of Demand and Supply",
          C: "Law of Increasing Marginal Utility",
          D: "Law of Variable Proportions"
        },
        correctOption: "A",
        explanation: "Pareto relies on the Law of Diminishing Returns. By ranking causes descendingly, managers focus efforts on the top-ranking items where action yields the highest initial payoff. Subsequent efforts on the remaining 'trivial many' yield progressively smaller benefits."
      }
    ]
  },
  {
    id: "case-05",
    title: "Readers Diary: Online Subscriptions & Freemium Canvas",
    chapterId: 5,
    chapterName: "Chapter 5: Management of Cost Strategically for Emerging Business Models",
    scenarioText: "Readers Diary is a popular weekly magazine published for school children. Distribution has historically been handled in bulk through schools, with parents paying an annual subscription of ₹5,200. Recently, access to open online information via social media has caused a drastic fall in physical readership. Founder Jay Pal observes children are passively consuming content and losing focus. To retain interest, he proposes adding interactive contests and puzzles with substantial cash prizes.\n\nAdditionally, he plan to launch an online edition. Any reader can create an account. The first 10 articles are free each year (excluding puzzle pages), after which readers must pay ₹6,240 per year to access the premium content. Jay Pal wants physical and digital subscriptions to remain the primary revenue streams, though local book publishers have shown interest in advertising space.\n\nTo manage this transition, the management uses Osterwalder's Business Model Canvas and Kano's customer satisfaction model.",
    questions: [
      {
        id: "q-5-1",
        questionText: "Which of the following describes the pricing models followed by Readers Diary for its print and proposed online editions?",
        options: {
          A: "Premium subscription model for both print and online editions.",
          B: "Traditional subscription model for print and a freemium model for the online edition.",
          C: "Freemium model for both print and online editions.",
          D: "Advertising-based hidden revenue model for both editions."
        },
        correctOption: "B",
        explanation: "For the print version, school children pay once annually (standard subscription). For the online version, they get basic features (10 free articles) and must pay a premium (₹6,240) to unlock full access, which is a classic freemium business model."
      },
      {
        id: "q-5-2",
        questionText: "What represents the most critical digital metric (Key Performance Indicator) to evaluate whether the online freemium model is successful?",
        options: {
          A: "Total number of accounts created on the website",
          B: "Number of readers reading the first 10 free articles",
          C: "Conversion rate of readers upgrading from free accounts to premium subscriptions",
          D: "Total cash prizes distributed to contest winners"
        },
        correctOption: "C",
        explanation: "Under a freemium model, success hinges on conversion. Financial sustainability depends on the percentage of free users who find enough value to upgrade to the paid premium tier."
      },
      {
        id: "q-5-3",
        questionText: "Relying on co-creation of content (e.g. encouraging subscribers to submit their own articles to be published) corresponds to which block of Osterwalder's Business Model Canvas?",
        options: {
          A: "Key Resources",
          B: "Channels",
          C: "Customer Relationships",
          D: "Cost Structure"
        },
        correctOption: "C",
        explanation: "Encouraging users to co-create content builds engagement and represents a personalized method of managing Customer Relationships."
      },
      {
        id: "q-5-4",
        questionText: "Under the Kano Model, how would exceptionally creative, interactive, and well-designed articles be classified?",
        options: {
          A: "Delight or Excitement attribute",
          B: "Threshold (Must-have) attribute",
          C: "Performance attribute",
          D: "Reverse attribute"
        },
        correctOption: "A",
        explanation: "While children and schools expect readable text (threshold), exceptionally creative, interactive puzzle design goes beyond linear expectations, 'wowing' the customer and acting as an excitement attribute."
      }
    ]
  },
  {
    id: "case-06",
    title: "Cellwell Technologies: Target Costing & Cost Gap",
    chapterId: 4,
    chapterName: "Chapter 4: Specialist Cost Management Techniques",
    scenarioText: "Cellwell Technologies Ltd. is planning to launch a new smartphone model called XXX21. High interest rates on their long-term loans have pressured management to keep a strict control on costs. Cellwell plans to retail the model at ₹30,000 per unit, Targeting a profit of 25% on the selling price.\n\nThe research and design department has provided the following actual cost estimates per unit:\n- Cost of core electronic components: ₹15,000\n- Labor assembly time: 0.6 hours at ₹5,000 per hour\n- Telephone-specific tooling & overheads: ₹2,500\n- Other customized materials: require 0.45 kg of specialty plastic per phone, which is supplied at a cost of ₹5,000 per kg. Production incurs a normal 10% substandard wastage rate (quantity of material is lost during molding).\n\nManagement wants to calculate the target cost, total actual cost, and assess any resulting cost gap.",
    questions: [
      {
        id: "q-6-1",
        questionText: "What is the Target Cost per unit that Cellwell must achieve for Model XXX21 to satisfy profit goals?",
        options: {
          A: "₹24,000 per unit",
          B: "₹22,500 per unit",
          C: "₹23,000 per unit",
          D: "₹20,000 per unit"
        },
        correctOption: "B",
        explanation: "Target selling price = ₹30,000. Required profit = 25% of ₹30,000 = ₹7,500. Target Cost = Selling Price - Desired Profit = 30,000 - 7,500 = ₹22,500 per unit."
      },
      {
        id: "q-6-2",
        questionText: "What is the standard input quantity and standard cost of 'other materials' per phone after accounting for normal wastage?",
        options: {
          A: "0.45 kg costing ₹2,250",
          B: "0.50 kg costing ₹2,500",
          C: "0.495 kg costing ₹2,475",
          D: "0.45 kg costing ₹2,500"
        },
        correctOption: "B",
        explanation: "Specialty plastic requires net 0.45 kg. Normal wastage is 10%. Standard input required = Output / (100% - Wastage%) = 0.45 / 0.9 = 0.50 kg per unit. Standard cost = 0.50 kg x ₹5,000/kg = ₹2,500 per unit."
      },
      {
        id: "q-6-3",
        questionText: "What is the total estimated actual cost of manufacturing the phone and the resulting 'cost gap' to be closed?",
        options: {
          A: "Actual Cost: ₹23,000; Cost Gap: ₹500",
          B: "Actual Cost: ₹22,750; Cost Gap: ₹250",
          C: "Actual Cost: ₹23,000; Cost Gap: Nil",
          D: "Actual Cost: ₹22,500; Cost Gap: Nil"
        },
        correctOption: "A",
        explanation: "Estimated Actual Cost = Components (₹15,000) + Labor (0.6 x 5,000 = ₹3,000) + Overheads (₹2,500) + Other materials (₹2,500) = ₹23,000. Target Cost = ₹22,500. Cost Gap = Actual Cost - Target Cost = 23,000 - 22,500 = ₹500 per unit."
      },
      {
        id: "q-6-4",
        questionText: "Which of the following costs should NOT be included in the product lifecycle cost calculation of Model XXX21?",
        options: {
          A: "Research and development costs of the automated upgrade feature",
          B: "Estimated disassembly and recycling cost at product retirement",
          C: "Finance interest costs incurred on general-purpose business loans",
          D: "Design and marketing launch promotional costs"
        },
        correctOption: "C",
        explanation: "General-purpose finance/interest costs are period costs and not traceable to a specific product. Product lifecycle costing only includes costs specifically traceable to the product's research, manufacturing, delivery, service, and disposal phases."
      }
    ]
  },
  {
    id: "case-07",
    title: "National Airlines: Flight Continual Relevant Costing",
    chapterId: 6,
    chapterName: "Chapter 6: Strategic Revenue Management",
    scenarioText: "National Airlines Limited (NAL) is a premium full-service carrier. Facing sustained pressure on margins, management is analyzing underperforming routes. They are considering discontinuing Flight 9S6313 on the Mumbai-Srinagar route.\n\nThe aircraft has a seating capacity of 100 passengers and operates at an average occupancy of 75% (75 passengers per flight). The ticket price is ₹25,000, and standard variable cost per passenger (catering, baggage handling, passenger taxes, etc.) is ₹15,000.\n\nRoute income statement details compiled for the flight include:\n- Aircraft Fuel: ₹2,50,000\n- Salaries - Flight Crew: ₹2,00,000 (pilots are paid fixed annual salaries)\n- Salaries - Flight Assistants: ₹1,50,000 (contractual, paid per flight)\n- Baggage loading and ground preparation: ₹70,000 (allocated overhead of ground services crew)\n- Overnight layover costs at Srinagar: ₹1,00,000 (accommodation and flight crew allowances)\n- Depreciation of aircraft: ₹75,000 (allocated based on annual obsolescence)\n- Liability insurance: ₹2,10,000 (1/3 represents a specific high-risk premium for this sector, while 2/3 represents fixed annual fleet-wide charges)\n- Route-specific promotion: ₹50,000\n- Destination hangar parking fee: ₹50,000 (fixed non-refundable airport lease fee)\n\nIf the flight is discontinued, NAL cannot replace it with another flight.",
    questions: [
      {
        id: "q-7-1",
        questionText: "Excluding the variable cost of ₹15,000 per passenger, what is the total relevant expense of operating Flight 9S6313?",
        options: {
          A: "₹9,05,000",
          B: "₹7,60,000",
          C: "₹6,20,000",
          D: "₹8,10,000"
        },
        correctOption: "C",
        explanation: "Relevant expenses must be incremental and avoidable if the flight stops. These are: Flight assistant pay (₹1,50,000) + Overnight costs (₹1,00,000) + Fuel (₹2,50,000) + Avoidable insurance 1/3 premium (₹70,000) + Route promotion (₹50,000) = ₹6,20,000. Sunk costs like depreciation, allotted ground cargo preparation, fixed crew salaries, and fixed airport leases are ignored."
      },
      {
        id: "q-7-2",
        questionText: "What is the true net financial gain or loss to National Airlines if they continue to operate Flight 9S6313?",
        options: {
          A: "Net Loss of ₹4,05,000",
          B: "Net Gain of ₹1,30,000",
          C: "Net Loss of ₹1,55,000",
          D: "Net Gain of ₹10,000"
        },
        correctOption: "B",
        explanation: "Passenger contribution margin = (₹25,000 fare - ₹15,000 variable) x 75 passengers = ₹7,50,000. Avoidable relevant route expenses = ₹6,20,000. Net relative incremental gain = 7,50,000 - 6,20,000 = ₹1,30,000 gain. If discontinued, NAL will lose this ₹1,30,000 inflow."
      },
      {
        id: "q-7-3",
        questionText: "Which of the following operational initiatives would reflect the implementation of lean thinking by NAL ground staff?",
        options: {
          A: "An across-the-board 30% reduction of ground staff to cut operating costs",
          B: "Using automated web-check-in systems to streamline boarding gate queues",
          C: "Utilizing larger aircraft during off-peak times to maximize potential capacity",
          D: "Charging passengers for baggage and seat selections to increase ARPU"
        },
        correctOption: "B",
        explanation: "Lean thinking focuses on eliminating waste. Queue waiting is a non-value-adding waste. Implementing web check-in to reduce waiting waste directly aligns with lean. Indiscriminate staff cuts or overproducing excess shipping capacity do not represent scientific lean principles."
      }
    ]
  },
  {
    id: "case-08",
    title: "Bhatia & Sharma: Fitzgerald-Moon Building Blocks",
    chapterId: 9,
    chapterName: "Chapter 9: Strategic Performance Measures in Private Sector",
    scenarioText: "Bhatia & Sharma LLP (BS LLP) is a leading accounting and corporate consultancy firm. BS LLP offers services across four domains: Accounting, Auditing, Tax Consultancy, and Business Advisory. Auditing and Accounting operate in mature, slow-growing markets (revenue growth of 2% and 6% respectively). Tax and Business Advisory are dynamic, fast-growing segments (revenue growth of 10% and 18% respectively).\n\nFor the coming year, the senior partners set an across-the-board revenue growth target of 10% for all four lines. Furthermore, and to encourage performance, the HR team designs a remuneration plan. Non-partner professionals receive variable bonuses dependent strictly on whether the entire firm meets its target global profitability.\n\nIn client feedback ratings (on a scale of 1 to 5), the scores are: Accounting: 3.2, Audits: 2.9, Tax: 3.4, Business Advisory: 4.6. Business Advisory also registered a net profit ratio of 12% and captured a 40% market share within its first year of operation.",
    questions: [
      {
        id: "q-8-1",
        questionText: "Based on Fitzgerald and Moon's Building Block Model, what is the core problem with the standards set for B&S LLP's service lines?",
        options: {
          A: "The standards are too lenient and fail to challenge the advisory division.",
          B: "The standards violate the 'Equity' criterion by setting a uniform 10% growth rate across heterogeneous mature and growing service lines.",
          C: "The standards focus too heavily on non-financial qualitative outcomes.",
          D: "The standards are set strictly by external regulatory agencies."
        },
        correctOption: "B",
        explanation: "Under the Building Block Model, Standards must be realistic, achievable, and equitable. Applying a flat 10% target to mature, slow-growing categories like Auditing (currently 2%) while under-budgeting Advisory (growing at 18%) is non-equitable and fails to adapt to line-specific market realities."
      },
      {
        id: "q-8-2",
        questionText: "What is the primary operational flaw in B&S LLP's non-partner reward/compensation structure?",
        options: {
          A: "It rewards employees with fixed contractual salaries rather than variable incentives.",
          B: "It fails to provide any clear definition of what constitutes profit.",
          C: "It violates the 'Controllability' principle by tying non-partners' variable bonuses to overall firm profitability, which they cannot directly influence.",
          D: "It creates excessive competition and conflict between employees of different lines."
        },
        correctOption: "C",
        explanation: " Tying rewards to factors outside an employee's control violates the controllability principle of the Building Block Model. Non-partners have no say in firm-level overhead allocations or strategic mergers, making global profitability a poor motivational lever."
      },
      {
        id: "q-8-3",
        questionText: "How should management interpret the 'Resource Utilization' dimension at B&S LLP based on the metrics provided?",
        options: {
          A: "Auditing has the best utilization because of high historical stability.",
          B: "Accounting has weak utilization since its revenue growth is restricted to 2%.",
          C: "Business Advisory demonstrates the most optimal resource utilization by delivering 12% net profit, a 40% market share, and a 4.6 client rating.",
          D: "None of the divisions show optimal utilization due to high partner salaries."
        },
        correctOption: "C",
        explanation: "Resource utilization measures how efficiently resources generate outstanding values. Delivering the highest profits, top customer satisfaction (4.6), and dominating 40% market share demonstrates brilliant, highly efficient deployment of human capital."
      }
    ]
  },
  {
    id: "case-09",
    title: "ConnectTel: Activity-Based CAP & Cost-to-Serve",
    chapterId: 7,
    chapterName: "Chapter 7: Strategic Profit Management",
    scenarioText: "ConnectTel Ltd. is a premier Indian telecom provider servicing over 120 million subscribers. Seeking rapid expansion, the company has heavily subsidized prepaid customer acquisitions, which constitute 75% of its user base. At a quarterly review, the CFO noted that despite high prepaid subscriber numbers, profitability per user is declining. Postpaid customers provide a substantially higher Average Revenue Per User (ARPU), but overall corporate margins are locked under pressure.\n\nTo identify the root cause, the CEO commissioned a Customer Account Profitability (CAP) study using Activity-Based Costing (ABC). Analysis of key activities mapped:\n- Prepaid users rely almost exclusively on automated digital self-service channels for recharge, query resolved, and billing checks, consuming negligible support resources.\n- Postpaid users frequently interact with physical call centers, demand customized billing investigation write-ups, require manual roaming configuration support, receive high retention rebates, and fail on timely credit limit payments, requiring manual debt recovery procedures.\n\nABC allocations show that a subset of high-volume postpaid users are highly unprofitable once activity-based billing and service costs are charged.",
    questions: [
      {
        id: "q-9-1",
        questionText: "What represents the main conceptual insight revealed by the ABC-based Customer Account Profitability (CAP) study?",
        options: {
          A: "Aggressively focusing on prepaid expansion is the only way to safeguard margins.",
          B: "High-revenue customers are not automatically the most profitable, as their associated 'cost-to-serve' can exceed their higher ARPU.",
          C: "Postpaid accounts must be terminated to eliminate credit monitoring costs.",
          D: "Traditional ARPU is an flawless, completely reliable metric for strategic success."
        },
        correctOption: "B",
        explanation: "CAP using ABC shifts the spotlight from gross revenue to net value. High ARPU postpaid customers require expensive manual service interventions (high cost-to-serve), whereas low-ARPU prepaid users utilize cheap automated links, often making the latter much more profitable on a net margin basis."
      },
      {
        id: "q-9-2",
        questionText: "Which of the following activities represent significant cost drivers for postpaid customers under the ABC framework?",
        options: {
          A: "Automated network routing and digital self-service recharges",
          B: "Manual billing adjustments, manual credit monitoring, and personalized call-center assistance",
          C: "SIM card plastic manufacturing and bulk automated text messaging",
          D: "None of the above represent significant cost drivers"
        },
        correctOption: "B",
        explanation: "Postpaid users consume expensive manually handled activities. These high-cost touchpoints are the distinct cost drivers that erode corporate profitability when postpaid customer margins are computed."
      },
      {
        id: "q-9-3",
        questionText: "What would be the most appropriate strategic response for ConnectTel based on the CAP findings?",
        options: {
          A: "Immediately terminate all postpaid subscription accounts and switch to 100% prepaid models.",
          B: "Redesign service level tiers and implement cost-aligned differentiated pricing based on cost-to-serve.",
          C: "Introduce uniform, blanket price increases for all 120 million customers.",
          D: "Avoid analyzing service activities and focus solely on acquiring more subscribers."
        },
        correctOption: "B",
        explanation: "Rather than abandoning market segments, strategic SCM suggests customizing rates—for example, charging a premium for manual bills or incentivizing postpaid users to shift to digital channels, aligning prices with the cost-to-serve."
      }
    ]
  },
  {
    id: "case-10",
    title: "Zenith Enterprises: Conflict in Transfer Pricing Decisions",
    chapterId: 12,
    chapterName: "Chapter 12: Divisional Transfer Pricing",
    scenarioText: "Zenith Enterprises has two independent divisions: Alpha Division (supplying) and Beta Division (receiving). Alpha Division manufactures a highly specialized component, Component X, which can either be sold to external customers or transferred to Beta Division. Beta Division uses Component X to manufacture standard Product Y, which it retails at ₹500 per unit.\n\nAlpha Division operates at a maximum capacity of 10,000 units of Component X per year. The cost structure for Alpha Division is:\n- Variable Manufacturing Cost per unit: ₹150\n- Variable Selling and Distribution overheads (external sales only): ₹10 per unit (this is entirely avoided for internal transfers to Beta Division due to automatic internal transport and direct warehouse handling)\n- Fixed Overheads: ₹5,000 per year\n- External Selling Price: ₹250 per unit\n- External Market Demand: 8,000 units.\n\nBeta Division requires 4,000 units of Component X for the upcoming year to satisfy its production goals of Product Y. Beta has the option to purchase the equivalent component from an external vendor for ₹245, but would prefer buying from Alpha to guarantee high quality control. The general manager of Zenith wishes to set an optimal transfer price that satisfies both division heads (Alpha and Beta) while promoting corporate profit maximization (Goal Congruence).",
    questions: [
      {
        id: "q-10-1",
        questionText: "What is Alpha Division's minimum transfer price per unit for the first 2,000 units transferred to Beta Division (which represents its currently unused capacity)?",
        options: {
          A: "₹150",
          B: "₹140",
          C: "₹250",
          D: "₹240"
        },
        correctOption: "B",
        explanation: "Since Alpha has 2,000 units of currently unused/idle capacity (10,000 capacity - 8,000 external demand = 2,000 units), transferring these 2,000 units does not sacrifice any external sales. The minimum Transfer Price represents the incremental variable cost of the transfer. Variable manufacturing cost is ₹150 and the variable distribution cost of ₹10 is saved, which makes the internal incremental cost = ₹150 - ₹10 = ₹140."
      },
      {
        id: "q-10-2",
        questionText: "To supply the full 4,000 units requested by Beta Division, Alpha Division has to sacrifice 2,000 units of external sales. What is Alpha's minimum transfer price per unit for these sacrificed 2,000 units?",
        options: {
          A: "₹240",
          B: "₹250",
          C: "₹140",
          D: "₹230"
        },
        correctOption: "D",
        explanation: "For the remaining 2,000 units, Alpha must sacrifice 2,000 units of external demand. The minimum transfer price is calculated as: Incremental cost of internal transfer + Opportunity cost of sacrificed external sales. Incremental cost of internal transfer is ₹140 (₹150 variable manufacturing cost less ₹10 saved selling cost). Opportunity cost is the lost contribution = External Selling Price (₹250) minus Variable External cost (₹160) = ₹90. Minimum TP = ₹140 + ₹90 = ₹230."
      },
      {
        id: "q-10-3",
        questionText: "What is the weighted average overall minimum transfer price per unit that Alpha Division would accept to supply all 4,000 units?",
        options: {
          A: "₹185 per unit",
          B: "₹190 per unit",
          C: "₹140 per unit",
          D: "₹230 per unit"
        },
        correctOption: "A",
        explanation: "Alpha's minimum Transfer Price for the first 2,000 units (idle capacity) is ₹140. For the next 2,000 units (sacrificed sales), the minimum is ₹230. Weighted Average Minimum Transfer price = [(2,000 * ₹140) + (2,000 * ₹230)] / 4,000 = (₹280,000 + ₹460,000) / 4,000 = ₹185 per unit."
      },
      {
        id: "q-10-4",
        questionText: "From Beta Division's perspective, what is the maximum transfer price they are willing to pay for Component X?",
        options: {
          A: "₹250 per unit",
          B: "₹245 per unit",
          C: "₹185 per unit",
          D: "₹140 per unit"
        },
        correctOption: "B",
        explanation: "Beta Division can purchase an equivalent component externally for ₹245 per unit. Therefore, they will never pay a transfer price higher than their external purchasing alternative of ₹245. Hence, maximum TP is ₹245."
      }
    ]
  },
  {
    id: "case-11",
    title: "Vervain Chemicals: Material Variance Reconciliation",
    chapterId: 13,
    chapterName: "Chapter 13: Standard Costing",
    scenarioText: "Vervain Chemicals Pvt. Ltd. manufactures a specialized industrial coating agent, Chem-Shield, using a precise formulation of two core chemical compounds, Compound X and Compound Y.\n\nThe standard recipe to produce 10 kg of finished Chem-Shield is:\n- Compound X: 6 kg @ standard price of ₹10 per kg\n- Compound Y: 4 kg @ standard price of ₹15 per kg\nStandard Output: 10 kg (No normal manufacturing weight loss is expected under perfect standards).\n\nDuring April 2026, Vervain Chemicals produced an actual output of 10,000 kg of finished Chem-Shield. The actual materials consumed and prices paid during the month were:\n- Compound X: 6,400 kg at an actual price of ₹10.50 per kg\n- Compound Y: 3,800 kg at an actual price of ₹14.00 per kg\nTotal actual material input of 10,200 kg was mixed to generate 10,000 kg of output. The CFO wants to perform a complete material cost, price, usage, mix, and yield variance reconciliation to pinpoint shop-floor inefficiencies.",
    questions: [
      {
        id: "q-11-1",
        questionText: "What are the Material Price Variances (MPV) for Compound X and Compound Y respectively?",
        options: {
          A: "X: ₹3,200 (Adverse); Y: ₹3,800 (Favorable)",
          B: "X: ₹3,200 (Favorable); Y: ₹3,800 (Adverse)",
          C: "X: ₹2,100 (Adverse); Y: ₹4,300 (Favorable)",
          D: "X: ₹3,120 (Adverse); Y: ₹4,080 (Favorable)"
        },
        correctOption: "A",
        explanation: "Material Price Variance (MPV) = (Standard Price - Actual Price) x Actual Quantity.\n- For Compound X: (₹10.00 - ₹10.50) x 6,400 kg = -₹3,200 or ₹3,200 (Adverse).\n- For Compound Y: (₹15.00 - ₹14.00) x 3,800 kg = +₹3,800 or ₹3,800 (Favorable)."
      },
      {
        id: "q-11-2",
        questionText: "What are the Material Usage Variances (MUV) for Compound X and Compound Y respectively?",
        options: {
          A: "X: ₹4,000 (Adverse); Y: ₹3,000 (Favorable)",
          B: "X: ₹4,200 (Favorable); Y: ₹2,800 (Adverse)",
          C: "X: ₹1,200 (Adverse); Y: ₹1,200 (Adverse)",
          D: "X: ₹4,000 (Favorable); Y: ₹3,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "Material Usage Variance (MUV) = (Standard Quantity for Actual Output - Actual Quantity) x Standard Price.\nStandard quantities (SQ) for 10,000 kg actual output are:\n- X: (6 / 10) * 10,000 = 6,000 kg\n- Y: (4 / 10) * 10,000 = 4,000 kg.\nMUV Calculations:\n- Compound X: (6,000 - 6,400) * ₹10 = -₹4,000 or ₹4,000 (Adverse).\n- Compound Y: (4,000 - 3,800) * ₹15 = +₹3,000 or ₹3,000 (Favorable)."
      },
      {
        id: "q-11-3",
        questionText: "What is the Material Mix Variance (MMV) for Vervain Chemicals, evaluating the actual mixture proportion against the standard ratio?",
        options: {
          A: "₹1,400 (Favorable)",
          B: "₹1,400 (Adverse)",
          C: "₹2,800 (Adverse)",
          D: "₹4,200 (Favorable)"
        },
        correctOption: "A",
        explanation: "Material Mix Variance (MMV) = (Revised Actual Quantity in standard ratio - Actual Quantity) x Standard Price.\nTotal Actual Input is 10,200 kg. Standard mix ratio is X : Y = 6 : 4 = 3 : 2.\nRevised Actual Quantities (RAQ):\n- X_RAQ = 10,200 x 3/5 = 6,120 kg\n- Y_RAQ = 10,200 x 2/5 = 4,080 kg\nMMV Calculation:\n- Compound X: (6,120 - 6,400) x ₹10 = ₹2,800 (Adverse)\n- Compound Y: (4,080 - 3,800) x ₹15 = ₹4,200 (Favorable)\nNet MMV = -₹2,800 + ₹4,200 = ₹1,400 (Favorable)."
      },
      {
        id: "q-11-4",
        questionText: "Calculate the Material Yield Variance (MYV) and reconcile with the total Material Usage Variance (MUV).",
        options: {
          A: "Yield Variance: ₹2,400 (Adverse); MUV = Mix Variance (₹1,400 F) + Yield Variance (₹2,400 A) = ₹1,000 (Adverse)",
          B: "Yield Variance: ₹1,000 (Adverse); MUV = Mix Variance (₹1,400 A) + Yield Variance (₹1,000 F) = ₹400 (Adverse)",
          C: "Yield Variance: ₹2,400 (Favorable); MUV = Mix Variance (₹2,800 A) + Yield Variance (₹2,400 F) = ₹400 (Adverse)",
          D: "Yield Variance: ₹1,200 (Adverse); MUV = Mix Variance (₹1,400 F) + Yield Variance (₹1,200 A) = ₹200 (Favorable)"
        },
        correctOption: "A",
        explanation: "Material Yield Variance (MYV) = (Standard Quantity for Actual Output - Revised Actual Quantity) x Standard Price.\n- Compound X: (6,000 - 6,120) x ₹10 = ₹1,200 (Adverse)\n- Compound Y: (4,000 - 4,080) x ₹15 = ₹1,200 (Adverse)\nNet MYV = -₹1,200 + -₹1,200 = ₹2,400 (Adverse).\nReconciliation check:\nMUV (₹1,000 Adverse) = Mix Variance (₹1,400 Favorable) + Yield Variance (₹2,400 Adverse) = ₹1,000 (Adverse). Perfectly reconciled!"
      }
    ]
  },
  {
    id: "case-12",
    title: "Aura Electronics: International Transfer Pricing & Tax Optimization",
    chapterId: 12,
    chapterName: "Chapter 12: Divisional Transfer Pricing",
    scenarioText: "Aura Electronics Group has two subsidiaries: Subsidiary S (located in South Africa, corporate tax rate 28%) and Subsidiary T (located in Texas, US, corporate tax rate 21%). Subsidiary S produces specialized solar power cell arrays. S operates at its full capacity of 5,000 units per year and can sell these cell arrays to independent local African installers for $180 per unit. S incurs $80 variable manufacturing cost and $10 variable shipping/handling cost for external local sales.\n\nAlternatively, S can transfer these solar cell arrays to Subsidiary T in Texas. Texas Subsidiary T packages the solar arrays into off-grid domestic energy systems and sells them in the US market for $450 per unit. Subsidiary T incurs additional local packaging, marketing, and installation variable costs of $120 per unit. Under the corporate internal transfer agreement, South Africa avoids the $10 external local shipping/handling costs. Subsidiary T requires 2,000 units of solar cell arrays for the upcoming year and can purchase similar arrays from an alternative Texan manufacturer for $195 per unit.\n\nThe global transfer pricing policy of Aura Electronics allows the transfer price to be negotiated between $100 and $200 per unit.",
    questions: [
      {
        id: "q-12-1",
        questionText: "What is Subsidiary S's minimum transfer price per unit for transferring 2,000 units to Subsidiary T, considering that it operates at full capacity?",
        options: {
          A: "$80 per unit",
          B: "$170 per unit",
          C: "$180 per unit",
          D: "$90 per unit"
        },
        correctOption: "B",
        explanation: "Since Subsidiary S operates at full capacity, transferring 2,000 units to T requires sacrificing 2,000 units of external local sales. Minimum Transfer Price = Incremental variable cost of internal transfer + Opportunity cost of lost external sale.\n1. Incremental variable cost of internal transfer is $80 (variable manufacturing cost of $80, as the $10 shipping/handling is avoided).\n2. Opportunity cost = Contribution Margin of external sales sacrificed = External Price ($180) - Total External Variable Cost ($80 + $10 shipping = $90) = $90.\nHence, Minimum Transfer Price = $80 + $90 = $170."
      },
      {
        id: "q-12-2",
        questionText: "What is the maximum transfer price that Subsidiary T is willing to pay to Subsidiary S for these solar cell arrays?",
        options: {
          A: "$195 per unit",
          B: "$330 per unit",
          C: "$450 per unit",
          D: "$170 per unit"
        },
        correctOption: "A",
        explanation: "The receiving division is willing to pay up to the lesser of: (a) Net Marginal Revenue from the finished product ($450 - $120 = $330) or (b) the external market acquisition price of equivalent arrays. Since Subsidiary T can purchase similar solar arrays from a Texan manufacturer for $195 per unit, Subsidiary T will never pay a transfer price higher than $195. Hence, Maximum TP = $195."
      },
      {
        id: "q-12-3",
        questionText: "If the transfer price is set at $190 instead of the minimum $170 per unit for the 2,000 units, what is the net corporate tax impact on Aura Electronics Group's total global tax liabilities?",
        options: {
          A: "Net global tax savings of $2,800",
          B: "Net global tax savings of $1,400",
          C: "Net global tax increase of $2,800",
          D: "No net tax change since it is an internal transfer"
        },
        correctOption: "C",
        explanation: "Increasing the transfer price by $20 ($190 instead of $170) shifts $20 per unit of taxable income from Subsidiary T (Texas, US - 21% tax rate) to Subsidiary S (South Africa - 28% tax rate).\n- Tax increase in South Africa: 2,000 units x $20 x 28% = $11,200.\n- Tax savings in Texas: 2,000 units x $20 x 21% = $8,400.\n- Net global tax impact: $11,200 - $8,400 = $2,800 (Net tax increase paid by the group overall)."
      },
      {
        id: "q-12-4",
        questionText: "To maximize overall group profit (minimizing global tax) while maintaining goal congruence and managerial satisfaction, at what price should the transfer be negotiated?",
        options: {
          A: "$170 per unit",
          B: "$195 per unit",
          C: "$180 per unit",
          D: "$120 per unit"
        },
        correctOption: "A",
        explanation: "To achieve goal congruence, the negotiated transfer price must fall within the range [Minimum TP of supplier, Maximum TP of buyer] = [$170, $195]. To optimize global group tax, the group should keep as much profit as possible in the lower-tax jurisdiction (Texas at 21% vs South Africa at 28%). Shifting profits to Texas means keeping the transfer price as low as possible. Thus, the transfer price should be set at the lowest end of the goal-congruent range, which is $170 per unit."
      }
    ]
  },
  {
    id: "case-13",
    title: "Apex Automotives: Advanced Labor Variance & Planning vs Operational Split",
    chapterId: 13,
    chapterName: "Chapter 13: Standard Costing",
    scenarioText: "Apex Automotives Ltd. uses a standard costing system to monitor direct labor performance for its premium electric motorcycle assembly line. The standard direct labor requirement for assembling one electric motorcycle is 40 hours at a standard labor rate of ₹250 per hour.\n\nFor the month of May 2026, Apex planned to manufacture 500 motorcycles. However, due to a severe global microchip shortage, a major redesign of the assembly process was introduced midway through the month, which permanently modified the standard assembly time to 42 hours per motorcycle. The corporate head office approved this revised standard retrospectively.\n\nDuring May 2026, the company actually manufactured 480 motorcycles. The actual direct labor hours recorded were 19,800 hours, and the actual rate paid was ₹265 per hour. The company's production manager wants to segregate the standard labor efficiency variance into Planning and Operational components to ensure fair, controllable performance evaluation.",
    questions: [
      {
        id: "q-13-1",
        questionText: "What is the Direct Labor Rate Variance (LRV) for Apex Automotives in May 2026?",
        options: {
          A: "₹297,000 (Adverse)",
          B: "₹297,000 (Favorable)",
          C: "₹300,000 (Adverse)",
          D: "₹288,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "Labor Rate Variance (LRV) = (Standard Rate - Actual Rate) x Actual Hours.\n- Standard Rate (SR) = ₹250\n- Actual Rate (AR) = ₹265\n- Actual Hours (AH) = 19,800\nLRV = (₹250 - ₹265) x 19,800 = -₹15 x 19,800 = ₹297,000 (Adverse)."
      },
      {
        id: "q-13-2",
        questionText: "What is the Labor Efficiency Planning Variance, which evaluates the impact of the non-controllable process redesign standard change?",
        options: {
          A: "₹240,000 (Adverse)",
          B: "₹240,000 (Favorable)",
          C: "₹250,000 (Adverse)",
          D: "₹120,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "Labor Efficiency Planning Variance measures the difference between original standard hours and revised standard hours for actual production, valued at the standard rate.\n- Original Standard Hours for actual production (480 units) = 480 x 40 = 19,200 hours.\n- Revised Standard Hours for actual production (480 units) = 480 x 42 = 20,160 hours.\nPlanning Variance = (Original Standard Hours - Revised Standard Hours) x Standard Rate\n= (19,200 - 20,160) x ₹250 = -960 hours x ₹250 = ₹240,000 (Adverse)."
      },
      {
        id: "q-13-3",
        questionText: "What is the Labor Efficiency Operational Variance, measuring the actual controllable shop-floor performance against the revised standard?",
        options: {
          A: "₹90,000 (Favorable)",
          B: "₹90,000 (Adverse)",
          C: "₹150,000 (Adverse)",
          D: "₹160,000 (Favorable)"
        },
        correctOption: "A",
        explanation: "Labor Efficiency Operational Variance measures actual hours against revised standard hours, valued at standard rate.\n- Revised Standard Hours for actual output = 20,160 hours.\n- Actual Hours recorded = 19,800 hours.\nOperational Variance = (Revised Standard Hours - Actual Hours) x Standard Rate\n= (20,160 - 19,800) x ₹250 = +360 hours x ₹250 = ₹90,000 (Favorable).\nThis shows that controllable shop floor operations were actually efficient, saving 360 hours relative to the revised design standard."
      },
      {
        id: "q-13-4",
        questionText: "Reconcile the Traditional Labor Efficiency Variance with the split Planning and Operational components.",
        options: {
          A: "Traditional Variance: ₹150,000 (Adverse); Planning: ₹240,000 (Adverse) + Operational: ₹90,000 (Favorable) = ₹150,000 (Adverse)",
          B: "Traditional Variance: ₹150,000 (Adverse); Planning: ₹240,000 (Favorable) + Operational: ₹90,000 (Adverse) = ₹150,000 (Favorable)",
          C: "Traditional Variance: ₹240,000 (Adverse); Planning: ₹150,000 (Adverse) + Operational: ₹90,000 (Favorable) = ₹60,000 (Adverse)",
          D: "Traditional Variance: ₹90,000 (Favorable); Planning: ₹240,000 (Adverse) + Operational: ₹150,000 (Favorable) = ₹90,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "Traditional Labor Efficiency Variance = (Original Standard Hours - Actual Hours) x Standard Rate\n= (19,200 - 19,800) x ₹250 = -600 hours x ₹250 = ₹150,000 (Adverse).\nReconciliation:\nLabor Efficiency Planning Variance: ₹240,000 (Adverse)\nLabor Efficiency Operational Variance: ₹90,000 (Favorable)\nTotal reconciled: ₹240,000 (Adverse) + ₹90,000 (Favorable) = ₹150,000 (Adverse). The standard split perfectly reconciles the traditional variance."
      }
    ]
  },
  {
    id: "case-14",
    title: "Apex Diagnostics: Balanced Scorecard Implementation & Strategy Mapping",
    chapterId: 9,
    chapterName: "Chapter 9: Strategic Performance Measures in Private Sector",
    scenarioText: "Apex Health Diagnostics (AHD) is a premium diagnostic laboratory network with 40 centers across Northern India. Historically, AHD operated strictly on financial metrics, evaluating center directors based on Net Profit Margins, Revenue Per Test, and Quarterly Sales Growth. Despite meeting short-term financial targets, AHD's customer loyalty index plummeted from 85% to 68% over two years, employee turnover reached an all-time high of 35%, and the laboratory experienced critical equipment down-time due to delayed preventive maintenance.\n\nTo rectify this, AHD's Board authorized the design and roll-out of a Balanced Scorecard (BSC) framework with four key perspectives and associated multi-tier KPIs:\n1. Financial: Focused on cost optimization, asset efficiency, and new revenue streams (e.g., home sample collection).\n2. Customer: Centering on turnaround time (TAT), safety compliance, and Net Promoter Score (NPS).\n3. Internal Business Processes: Streamlining clinical accuracy, diagnostic cycle times, and automated quality checks.\n4. Learning & Growth: Driving phlebotomist certification rates, continuous laboratory protocol training, and retaining critical clinical talent.\n\nInitial implementation data for FY 2025-26 shows the following results:\n- Average Turnaround Time (TAT) for reports decreased from 14 hours to 8.5 hours (Target: 8 hours).\n- Phlebotomist training hours increased to 45 hours per year (Target: 40 hours).\n- Net Profit margin rose by 1.5% while center staff attrition decreased to 18% (Target: <= 15%).\n- Customer NPS reached 74% (Target: 75%).\n- Real-time diagnostic equipment calibration error rates dropped from 2.4% to 0.4%.",
    questions: [
      {
        id: "q-14-1",
        questionText: "Which of the following correctly pairs a performance metric from AHD's Balanced Scorecard with its correct perspective and strategic objective?",
        options: {
          A: "Equipment calibration error rate -> Learning & Growth -> Retaining clinical talent",
          B: "Phlebotomist training hours -> Financial -> Maximizing asset efficiency",
          C: "Attrition Rate -> Learning & Growth Perspective -> Maintain & Retain Critical Talent",
          D: "Average Turnaround Time (TAT) -> Learning & Growth -> Improving safety compliance"
        },
        correctOption: "C",
        explanation: "Continuous learning and growth includes talent retention, which is monitored via the attrition rate. Phlebotomist training hours is Learning & Growth (not Financial). Calibration error is Internal Business Processes (not Learning & Growth). TAT is Customer or Internal Process (not Learning & Growth)."
      },
      {
        id: "q-14-2",
        questionText: "Strategic mapping is a key part of the Balanced Scorecard. Which of the following represents the correct logical 'cause-and-effect' sequence of objectives starting from Learning & Growth and culminating in Financial outcomes for AHD?",
        options: {
          A: "Increase Phlebotomist training -> Improve report Clinical Accuracy (Internal Processes) -> Achieve quicker TAT and higher NPS (Customer) -> Increase Market Share & Profit Margins (Financial)",
          B: "High Profit Margins -> Lower Equipment error rates -> Faster report Delivery -> Increased employee training hours",
          C: "Optimize Center Attrition -> Increase Report Prices -> Improve Customer Satisfaction -> Boost phlebotomist training hours",
          D: "Reduce report TAT -> Train phlebotomists -> Increase gross revenues -> Achieve error-free calibrations"
        },
        correctOption: "A",
        explanation: "A sound Balanced Scorecard is built on clear cause-and-effect links: Investing in employee training (Learning & Growth) improves clinical process accuracy (Internal Processes), which leads to quicker report deliveries (TAT) and better service ratings (Customer), which eventually boosts customer retention and higher profit margins (Financial)."
      },
      {
        id: "q-14-3",
        questionText: "AHD's Board noticed that despite phlebotomists exceeding training hours (45 hrs vs target 40 hrs), clinical report TAT objective was barely met, and customer NPS failed to hit the 75% target due to delayed sample pickup complaints. How should this scenario be interpreted?",
        options: {
          A: "The Balanced Scorecard is fundamentally broken and cannot be used for diagnostic networks.",
          B: "There is a disconnect in the strategy map; training hours is a 'lag' indicator that has no impact on 'lead' performance.",
          C: "Phlebotomist training is a 'lead' indicator of capability, but its lack of translation to TAT and NPS suggests a bottleneck elsewhere in the system, such as sample logistics/transportation, requiring operational review.",
          D: "Training hours is a financial metric and should be evaluated against capital expenditures."
        },
        correctOption: "C",
        explanation: "Phlebotomist training is an operational 'lead' indicator of staff capability. If it is achieved but the 'lag' indicators like customer NPS and TAT are not fully met, it suggests that other non-clinical elements of the process (like sample collection logistics or transport) are bottlenecked, indicating that the strategic map requires adjustment or broader operational intervention."
      },
      {
        id: "q-14-4",
        questionText: "To ensure the Balanced Scorecard drives long-term strategic success rather than tactical game-playing (gaming the metrics), AHD should avoid which of the following practices?",
        options: {
          A: "Cascading scorecard metrics down to individual center operations with appropriate weights.",
          B: "Linking employee bonuses strictly to single isolated metrics (e.g., maximizing TAT speed by sacrificing report accuracy).",
          C: "Periodically reviewing the validity of cause-and-effect assumptions in the strategy map.",
          D: "Using a combination of lead and lag indicators across all four dimensions."
        },
        correctOption: "B",
        explanation: "Linking rewards exclusively to a single operational metric can lead to strategic sub-optimization or 'metric gaming'. For example, forcing staff to prioritize speed (TAT) may cause them to skip vital calibration checks, severely eroding clinical report accuracy. Goal congruence implies a balanced, holistic evaluation."
      }
    ]
  },
  {
    id: "case-15",
    title: "Vantage Biotech: Advanced Direct Material & Sales Variances under Market Divergence",
    chapterId: 13,
    chapterName: "Chapter 13: Standard Costing",
    scenarioText: "Vantage Biotech Ltd. manufactures two types of high-grade diagnostic reagents used in standard immunity testing kits: Reagent Alfa and Reagent Beta. The company operates a standard costing and budgeting system.\n\nFor the first quarter of 2026, the company estimated the following standard direct material requirements and selling prices:\n- Reagent Alfa: Selling Price = ₹800 per vial. Material input per vial = 2 kg of Chemical X at a standard cost of ₹150 per kg.\n- Reagent Beta: Selling Price = ₹1,200 per vial. Material input per vial = 3 kg of Chemical Y at a standard cost of ₹200 per kg.\n\nFor Q1 2026, the company budgeted to produce and sell 10,000 vials of Reagent Alfa and 5,000 vials of Reagent Beta (a budgeted sales mix containing 2 vials of Alfa for every 1 vial of Beta).\n\nDuring the quarter, due to a sudden outbreak of a viral strain, demand shifted dramatically. The actual production and sales figures were:\n- Reagent Alfa: 8,000 vials were sold at ₹820 per vial.\n- Reagent Beta: 7,000 vials were sold at ₹1,150 per vial.\n\nThe actual direct materials utilized during the production of these quantities were:\n- Chemical X (for Reagent Alfa): 17,200 kg purchased and used at ₹145 per kg.\n- Chemical Y (for Reagent Beta): 20,500 kg purchased and used at ₹210 per kg.\n\nThe Executive Directors of Vantage Biotech require an in-depth breakdown of Direct Material Cost Variances and Sales Variances (separated into Sales Mix and Sales Quantity) to evaluate commercial and operational performance during this high-demand period.",
    questions: [
      {
        id: "q-15-1",
        questionText: "What is the Material Usage (Efficiency) Variance for Chemical X used in the production of Reagent Alfa?",
        options: {
          A: "₹180,000 (Adverse)",
          B: "₹180,000 (Favorable)",
          C: "₹86,000 (Adverse)",
          D: "₹174,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "1. Standard Quantity (SQ) of Chemical X allowed for actual output of 8,000 vials = 8,000 vials * 2 kg = 16,000 kg.\n2. Actual Quantity (AQ) used = 17,200 kg.\n3. Standard Price (SP) of Chemical X = ₹150 per kg.\nMaterial Usage Variance (MUV) = (SQ - AQ) * SP\n= (16,000 kg - 17,200 kg) * ₹150\n= -1,200 kg * ₹150 = ₹180,000 (Adverse)."
      },
      {
        id: "q-15-2",
        questionText: "What is the Material Price Variance (MPV) for Chemical Y used in the production of Reagent Beta?",
        options: {
          A: "₹205,000 (Favorable)",
          B: "₹205,000 (Adverse)",
          C: "₹102,500 (Adverse)",
          D: "₹200,000 (Adverse)"
        },
        correctOption: "B",
        explanation: "Material Price Variance (MPV) = (Standard Price - Actual Price) * Actual Quantity.\n1. Standard Price (SP) of Chemical Y = ₹200 per kg.\n2. Actual Price (AP) paid = ₹210 per kg.\n3. Actual Quantity (AQ) purchased and used = 20,500 kg.\nMPV = (₹200 - ₹210) * 20,500 kg\n= -₹10 * 20,500 kg = ₹205,000 (Adverse)."
      },
      {
        id: "q-15-3",
        questionText: "Calculate the Sales Mix Variance for Vantage Biotech in terms of Sales Margin (using Standard Profit Contribution as the weighting agent) to analyze the impact of the shift in product proportion.",
        options: {
          A: "₹200,000 (Favorable)",
          B: "₹200,000 (Adverse)",
          C: "₹1,200,000 (Favorable)",
          D: "₹1,000,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "1. Standard Profit Margin for Reagent Alfa = Selling Price (₹800) - Standard Material Cost (2 kg * ₹150 = ₹300) = ₹500 per vial.\nStandard Profit Margin for Reagent Beta = Selling Price (₹1,200) - Standard Material Cost (3 kg * * ₹200 = ₹600) = ₹600 per vial.\n2. Total Actual Sales Qty = 8,000 + 7,000 = 15,000 vials.\n3. Budgeted Sales Mix ratio = 2/3 Reagent Alfa, 1/3 Reagent Beta.\n4. Actual Sales in Budgeted Mix: Alfa = 10,000 vials, Beta = 5,000 vials.\n5. Sales Mix Variance = (Actual Quantity - Actual Qty in Budget Mix) * Standard Profit Margin\n- Reagent Alfa: (8,000 - 10,000) * ₹500 = -₹1,000,000 (Adverse)\n- Reagent Beta: (7,000 - 5,000) * ₹600 = +₹1,200,000 (Favorable)\nNet Sales Mix Variance = -₹1,000,000 + ₹1,200,000 = ₹200,000 (Favorable)."
      },
      {
        id: "q-15-4",
        questionText: "Calculate the Sales Quantity Variance in terms of Sales Margin (using Standard Profit Contribution) to evaluate the volume of sales overall irrespective of mix.",
        options: {
          A: "₹150,000 (Adverse)",
          B: "₹0",
          C: "₹200,000 (Favorable)",
          D: "₹1,000,000 (Adverse)"
        },
        correctOption: "B",
        explanation: "Sales Quantity variance measures the impact of change in total volume. Since total budgeted sales units was 15,000 units (10,000 Alfa + 5,000 Beta) and actual total sales units was also exactly 15,000 units (8,000 Alfa + 7,000 Beta), the overall sales quantity volume variance is ₹0.\nAll volume performance is generated through the favorable mix change of shifting sales toward the higher-margin Reagent Beta."
      }
    ]
  },
  {
    id: "case-16",
    title: "Sigma Engineering: Multi-tier Overhead Variance & Reconciliation",
    chapterId: 13,
    chapterName: "Chapter 13: Standard Costing",
    scenarioText: "Sigma Engineering Ltd. manufactures high-capacity industrial liquid heat exchangers. For the month of May 2026, the company established the following standard cost parameters for its single product line:\n- Budgeted production: 2,000 units\n- Standard direct labor hours required: 5 hours per unit\n- Budgeted Fixed Production Overheads: ₹5,000,000 per month\n- Budgeted Variable Production Overheads: ₹250 per direct labor hour\n- Standard Sales Price: ₹12,000 per unit\n\nFrom these parameters, the Standard Fixed Overhead Absorption Rate (FOAR) was calculated as ₹500 per direct labor hour (derived as ₹5,000,000 budget / (2,000 units * 5 hours = 10,000 budgeted direct labor hours)).\n\nDuring May 2026, the actual operations yielded the following results:\n- Actual production: 1,800 units\n- Actual sales: 1,750 units at ₹12,200 per unit\n- Actual labor hours worked: 9,200 hours\n- Actual Variable Production Overheads incurred: ₹2,484,000\n- Actual Fixed Production Overheads incurred: ₹4,850,000\n\nThe Finance Controller wishes to compute Variable Overhead Variances, Fixed Overhead Variances (Expenditure, Capacity, and Efficiency), and understand cost control performance feedback.",
    questions: [
      {
        id: "q-16-1",
        questionText: "What is the Variable Production Overhead Expenditure and Efficiency Variance for Sigma Engineering in May 2026?",
        options: {
          A: "Expenditure: ₹184,000 (Adverse); Efficiency: ₹50,000 (Adverse)",
          B: "Expenditure: ₹184,000 (Favorable); Efficiency: ₹50,000 (Favorable)",
          C: "Expenditure: ₹234,000 (Adverse); Efficiency: ₹0",
          D: "Expenditure: ₹50,000 (Adverse); Efficiency: ₹184,000 (Adverse)"
        },
        correctOption: "A",
        explanation: "1. Variable Overhead Expenditure Variance = (AH x Standard Rate) - Actual Cost\n= (9,200 hours x ₹250) - ₹2,484,000 = ₹2,300,000 - ₹2,484,000 = ₹184,000 (Adverse).\n2. Variable Overhead Efficiency Variance = (Standard Hours for actual output - Actual Hours) x Standard Rate\n= (1,800 units x 5 hours - 9,200 hours) x ₹250\n= (9,000 - 9,200) x ₹250 = -200 hours x ₹250 = ₹50,000 (Adverse).\nNet total VOH variance is ₹234,000 (Adverse)."
      },
      {
        id: "q-16-2",
        questionText: "What is the Fixed Overhead Expenditure Variance for May 2026?",
        options: {
          A: "₹150,000 (Adverse)",
          B: "₹150,000 (Favorable)",
          C: "₹500,000 (Adverse)",
          D: "₹350,000 (Adverse)"
        },
        correctOption: "B",
        explanation: "Fixed Overhead Expenditure Variance = Budgeted Fixed Overheads - Actual Fixed Overheads\n= ₹5,000,000 - ₹4,850,000 = ₹150,000 (Favorable).\nThis shows that spending on fixed items was kept ₹150,000 below the budgeted limit, resulting in a favorable spending feedback."
      },
      {
        id: "q-16-3",
        questionText: "Calculate the Fixed Overhead Volume Variance and split it into Capacity and Efficiency sub-variances.",
        options: {
          A: "Volume: ₹500,000 (Adv); Capacity: ₹400,000 (Adv); Efficiency: ₹100,000 (Adv)",
          B: "Volume: ₹500,000 (Fav); Capacity: ₹400,000 (Fav); Efficiency: ₹100,000 (Fav)",
          C: "Volume: ₹350,000 (Adv); Capacity: ₹300,000 (Adv); Efficiency: ₹50,000 (Adv)",
          D: "Volume: ₹500,000 (Adv); Capacity: ₹400,000 (Fav); Efficiency: ₹900,000 (Adv)"
        },
        correctOption: "A",
        explanation: "1. Fixed Overhead Volume Variance: (Standard Hours for Actual Output - Budgeted Hours) x FOAR\n= (9,000 - 10,000) x ₹500 = ₹500,000 (Adverse).\n2. Fixed Overhead Capacity Variance: (Actual Hours worked - Budgeted Hours) x FOAR\n= (9,200 - 10,000) x ₹500 = ₹400,000 (Adverse).\n3. Fixed Overhead Efficiency Variance: (Standard Hours for Actual Output - Actual Hours worked) x FOAR\n= (9,000 - 9,200) x ₹500 = ₹100,000 (Adverse).\nCheck: Capacity (₹400,000 Adv) + Efficiency (₹100,000 Adv) = Volume (₹500,000 Adv). Reconciles perfectly."
      },
      {
        id: "q-16-4",
        questionText: "How does the traditional Fixed Overhead Cost Variance reconcile with the Expenditure and Volume sub-variances?",
        options: {
          A: "Total FOB Cost Variance is ₹350,000 (Adverse); Reconciles as: Expenditure Variance ₹150,000 (Favorable) + Volume Variance ₹500,000 (Adverse) = ₹350,000 (Adverse)",
          B: "Total FOB Cost Variance is ₹650,050 (Adverse); Reconciles as: Expenditure Variance ₹250,000 (Adverse) + Volume Variance ₹400,000 (Adverse) = ₹650,000 (Adverse)",
          C: "Total FOB Cost Variance is ₹500,000 (Adverse); Reconciles as: Expenditure Variance ₹0 + Volume Variance ₹500,000 (Adverse)",
          D: "There is no direct mathematical reconciliation between volume, expenditure, and total cost variances under standard Absorption Costing"
        },
        correctOption: "A",
        explanation: "In standard absorption costing:\n- Total Fixed Overhead Cost Variance = Absorbed Overheads (9,000 standard hours x ₹500/hr) - Actual Overheads (₹4,850,000) = ₹4,500,000 - ₹4,850,000 = ₹350,000 (Adverse).\n- Reclaimed structure: Expenditure Variance ₹150,000 (Favorable) + Volume Variance ₹500,000 (Adverse) = ₹350,000 (Adverse). Perfect mathematical balance is achieved."
      }
    ]
  },
  {
    id: "case-17",
    title: "Apex Automotive: Lean Systems, Cellular Manufacturing & Takt Time",
    chapterId: 3,
    chapterName: "Chapter 3: Lean System and Innovation",
    scenarioText: "Apex Automotive Ltd. is a major Tier-1 manufacturer supplying customized precision engine valves to automotive companies. The factory operates a traditional functional shop floor layout, where similar machines are clustered together (e.g., all cutting lathes in Section A, grinding tools in Section B, heat treatment in Section C). Under this setup, materials travel long distances between phases, resulting in excessive Work-In-Progress (WIP) buffer stocks on the floor (averaging 12 days of production volume) and a customer lead time of 21 days.\n\nTo improve competitiveness, the Chief Operations Officer designs a Lean Manufacturing initiative to transition to Cellular Manufacturing. The production team designs logical U-shaped cells where cutting, grinding, and heat treatment assets are co-located in small, dedicated production clusters. Key operational parameters established for the new engine valve cell include:\n- Planned daily shift time: 8 hours (480 minutes).\n- Planned lunch break and machine maintenance downtime: 30 minutes per shift.\n- Daily customer demand requirement: 450 engine valves.\n- Process yield is expected to be 100% first-time-right without scrap.\n\nSimultaneously, Apex Automotive introduces a Kanban pull-system where production is triggered solely by physical cards sent upstream by downstream assembly requirements, rather than using historical push schedules. They also roll out 5S protocols to maintain clean, standardized operations across the new cells.",
    questions: [
      {
        id: "q-17-1",
        questionText: "What represents the 'Takt Time' required for the new engine valve production cell to match customer demand?",
        options: {
          A: "1.00 minute per unit",
          B: "1.07 minutes per unit",
          C: "1.20 minutes per unit",
          D: "0.94 minutes per unit"
        },
        correctOption: "A",
        explanation: "Takt Time is calculated as: Net Available Production Time / Customer Demand.\n- Total Shift Time = 480 minutes.\n- Planned Downtime = 30 minutes.\n- Net Available Production Time = 480 - 30 = 450 minutes per shift.\n- Daily Customer Demand = 450 units.\nTakt Time = 450 minutes / 450 units = 1.00 minute per unit.\nThis means a finished valve must emerge from the cell every 1 minute to perfectly satisfy demand."
      },
      {
        id: "q-17-2",
        questionText: "Which of the following is an operational advantage of using a U-shaped cellular layout instead of a traditional functional machine layout at Apex Automotive?",
        options: {
          A: "Decreased employee cross-training requirements as workers perform only one highly specialized step.",
          B: "Improved labor flexibility, minimized material handling distances, and rapid defect detection within the cell.",
          C: "Higher levels of work-in-progress (WIP) buffers to handle machine breakdowns safely.",
          D: "Lower initial process setup flexibility when shifting between different valve models."
        },
        correctOption: "B",
        explanation: "U-shaped cellular layouts bring machines of different functions together in sequence. This optimizes workspace layout, minimizes material travel distances, allows operators to be cross-trained to supervise multiple machines, and enables immediate detection of defects before they travel downstream."
      },
      {
        id: "q-17-3",
        questionText: "How does the proposed Kanban pull-system improve the financial performance and working capital metrics of Apex Automotive?",
        options: {
          A: "It maximizes Raw Material inventory to take advantage of supplier volume discounts.",
          B: "It schedules production based on long-term market forecasts to build substantial finished goods inventory.",
          C: "It eliminates unnecessary Work-In-Progress (WIP) and finished stock, releasing cash locked in operating working capital.",
          D: "It increases Factory Overhead allocations to spread fixed costs across a larger volume of safe buffer stock."
        },
        correctOption: "C",
        explanation: "Kanban is a key JIT enabler. By pulling production only when a consumption signal is received, it limits WIP build-up. This significantly reduces inventory holding costs, shortens cycle times, and releases cash that was previously locked up in physical inventories (improving Working Capital Turnover)."
      },
      {
        id: "q-17-4",
        questionText: "Under Lean systems, which of Shigeo Shingo's categories of waste (Muda) is considered the most critical to resolve because it directly triggers and hides other forms of waste?",
        options: {
          A: "Waste of Motion",
          B: "Waste of Overproduction",
          C: "Waste of In-transit Transportation",
          D: "Waste of Wait Time"
        },
        correctOption: "B",
        explanation: "Overproduction occurs when more goods are made than demanded. It is considered the most severe 'Muda' because it consumes resources prematurely, creates excessive inventory, requires additional storage/handling space (motion/transit), and obscures operational bottlenecks, which prevents continuous improvement."
      }
    ]
  },
  {
    id: "case-18",
    title: "SwiftGlow Cosmetics: Managing the 4Ps of Innovation Space",
    chapterId: 3,
    chapterName: "Chapter 3: Lean System and Innovation",
    scenarioText: "SwiftGlow Cosmetics Ltd. is a mid-sized beauty brand moving into the organic skin care sector. To build a robust strategic advantage, the Board decides to implement Bessant and Tidd's '4Ps of Innovation' framework to explore all areas of innovation (Product, Process, Position, and Paradigm).\n\nSwiftGlow structures its strategy across four discrete projects:\n1. Project Lotus (Product): Formulating and patenting a completely natural, plant-derived active ingredient that acts as a natural preservative, extending shelf life by 36 months without chemical additives.\n2. Project Streamline (Process): Rebuilding their manufacturing line, moving from batch-milling tanks to clean, continuous-pulse mixing reactors. This cuts chemical heating costs by 40% and improves the raw material yield rate from 92% to 99%.\n3. Project Green refill (Position): Relaunching the brand's positioning. Moving out of premium cosmetic boutiques and re-branding as an eco-friendly subscription refill pouch system delivered directly to customers' homes, targeting environmentally-conscious Gen-Z audiences.\n4. Project Co-Create (Paradigm): Redefining the business paradigm by transitioning from a standard beauty supplier to a personalized skincare consult network. Customers use an AI portal to upload skin attributes and collaborate with consulting chemists to co-formulate customized creams.\n\nTo fast-track Project Lotus, SwiftGlow partners under an Open Innovation model, licensing a green extraction patent from a state biotech university for an upfront royalty fee, rather than spending 3 years developing it in-house.",
    questions: [
      {
        id: "q-18-1",
        questionText: "Under Bessant and Tidd's 4Ps model, SwiftGlow's decision to shift from luxury boutique retail to an eco-friendly, direct-to-home subscription refill service represents which category of innovation?",
        options: {
          A: "Product Innovation",
          B: "Process Innovation",
          C: "Position Innovation",
          D: "Paradigm Innovation"
        },
        correctOption: "C",
        explanation: "Position Innovation represents shifts in the context or target market to which a product is introduced. By re-positioning cosmetics from boutique vanity purchases to sustainable direct-to-home subscriptions for eco-conscious users, the company is changing how the product is framed and targeted."
      },
      {
        id: "q-18-2",
        questionText: "How should Project Streamline (continuous-pulse mixing reactors reducing energy costs and boosting raw material yield) be classified under the strategic cost management paradigm?",
        options: {
          A: "Process Innovation that lowers structural and executional operational cost drivers.",
          B: "Product Innovation that increases customers' willingness to pay premium prices.",
          C: "Paradigm Innovation that shifts the corporate governance structures.",
          D: "Environmental regulatory risk mitigation that has no positive impact on financial yield."
        },
        correctOption: "A",
        explanation: "Project Streamline is a Process Innovation (improving how products are manufactured). Financially, it reduces structural cost drivers (energy usage) and improves material yields (reducing waste), directly lowering the Cost of Goods Sold (COGS) and improving operating margins."
      },
      {
        id: "q-18-3",
        questionText: "Henry Chesbrough defines Open Innovation as a model where companies use both inflow and outflow of ideas. SwiftGlow's partnership to license an extraction patent from a university is an example of:",
        options: {
          A: "Outbound Open Innovation, monetizing internal idle intellectual property.",
          B: "Inbound Open Innovation, importing external technology to accelerate internal innovation.",
          C: "Traditional Closed Innovation, relying solely on internal R&D experts.",
          D: "Risk-pooling alliance that violates fair-pricing standards."
        },
        correctOption: "B",
        explanation: "Inbound Open Innovation involves sourcing, licensing, or acquiring external expertise, patents, or technology from universities or startups to accelerate internal product development, bypassing long and expensive research cycles."
      },
      {
        id: "q-18-4",
        questionText: "Project Co-Create (redefining the company's identity from a product provider to a collaborative customer-chemist skincare co-formulator platform) is an example of:",
        options: {
          A: "Position Innovation",
          B: "Process Innovation",
          C: "Paradigm Innovation",
          D: "Product Innovation"
        },
        correctOption: "C",
        explanation: "Paradigm innovation involves a fundamental shift in the underlying mental models of what the business actually is (its purpose and how it operates). Moving from selling pre-packaged goods to acting as a collaborative, personalized skincare platform is a classic paradigm change."
      }
    ]
  },
  {
    id: "case-19",
    title: "CarShare: Digital Aggregator Model & Platform Economics",
    chapterId: 5,
    chapterName: "Chapter 5: Management of Cost Strategically for Emerging Business Models",
    scenarioText: "CarShare Ltd. is a modern mobile platform that acts as a peer-to-peer car aggregator in major metropolitan cities. The platform connects individual vehicle owners (suppliers with idle, depreciating assets) with urban commuters (customers seeking flexible, personal transportation without the burdens of car ownership, high maintenance, and parking costs).\n\nTo achieve Product-Market Fit, the company designs its business model using the Value Proposition Canvas (VPC) and Business Model Canvas (BMC). Key aspects of their model include:\n- Customer Jobs-to-be-Done: Getting safely and reliably from home to work.\n- Customer Pains: High expense of car purchases, annual insurance, periodic repair service, and high municipal parking fees.\n- Platform Value Proposition: Instant on-demand car rental near the user's location, insurance-covered rides, and hassle-free automated parking validation.\n\nIn FY 2025-26, CarShare's financial operations report the following data:\n- Gross Merchandise Value (GMV) of all bookings processed through the app: ₹50,000,000.\n- Total Booking Commissions retained by CarShare as revenue: ₹7,500,000.\n- Total marketing and sales expenses: ₹1,500,000 during which they acquired 1,250 new active platform users.\n- Customer Lifetime Value (CLV) is calculated to be ₹4,200 per user based on recurring average trip usages and an annual churn rate of 8%.",
    questions: [
      {
        id: "q-19-1",
        questionText: "What is CarShare's 'Take Rate' (%) and its 'Customer Acquisition Cost' (CAC) for FY 2025-26?",
        options: {
          A: "Take Rate: 15.0%; CAC: ₹1,200",
          B: "Take Rate: 7.5%; CAC: ₹1,500",
          C: "Take Rate: 15.0%; CAC: ₹1,500",
          D: "Take Rate: 12.0%; CAC: ₹1,200"
        },
        correctOption: "A",
        explanation: "1. Take Rate is the percentage of total transaction volume (GMV) the platform retains as revenue: (Booking Commission / GMV) * 100 = (₹7,500,000 / ₹50,000,000) * 100 = 15.0%.\n2. Customer Acquisition Cost (CAC) = Total Marketing Expenses / New Customers Acquired = ₹1,500,000 / 1,250 = ₹1,200."
      },
      {
        id: "q-19-2",
        questionText: "Analyze CarShare's CLV-to-CAC Ratio. Is the platform's current financial profile considered highly healthy and viable under standard digital platform guidelines?",
        options: {
          A: "CLV-to-CAC is 1.25x; This is highly vulnerable since the standard healthy threshold requires a minimum of 1.0x.",
          B: "CLV-to-CAC is 3.50x; This is highly viable and healthy, exceeding the standard digital platform benchmark threshold of 3:1.",
          C: "CLV-to-CAC is 0.28x; This suggests that marketing costs far exceed customer value, requiring a massive pricing overhaul.",
          D: "CLV-to-CAC is 2.80x; This suggests the platform is losing ₹280 on every customer acquired."
        },
        correctOption: "B",
        explanation: "CLV-to-CAC Ratio = Customer Lifetime Value / Customer Acquisition Cost = ₹4,200 / ₹1,200 = 3.50x.\nIn digital and SaaS-based platform economics, a CLV-to-CAC ratio of 3.0x or higher is considered a key healthy benchmark for commercial viability and sustainable scaling, which CarShare comfortably achieves."
      },
      {
        id: "q-19-3",
        questionText: "In the Value Proposition Canvas (VPC), how should CarShare's feature of providing 'insured, on-demand cars nearby' be mapped relative to the Customer Profile?",
        options: {
          A: "As a 'Customer Pain point' that the user wants to experience.",
          B: "As a 'Product & Service' that acts as a 'Pain Reliever' for users by alleviating expenses related to personal car ownership and maintenance.",
          C: "As a 'Customer Job-to-be-Done' representing raw movement.",
          D: "As a 'Gain Creator' that has no bearing on actual travel experiences."
        },
        correctOption: "B",
        explanation: "In the VPC, the 'Products & Services' (insured, on-demand vehicle booking) map directly to the Customer Profile's 'Pains' (managing ownership expenses/repairs). They act as a direct 'Pain Reliever' to solve the user's specific financial and operational headaches, contributing to Product-Market Fit."
      },
      {
        id: "q-19-4",
        questionText: "Which of the following describes the core business model of an 'Aggregator' like CarShare compared to a traditional physical vehicle rental company?",
        options: {
          A: "Aggregators own intensive fleets of physical vehicles, incurring massive upfront capital expenditures and depreciation costs.",
          B: "Aggregators operate an asset-light digital network, relying on standardized third-party supplier assets and taking commissions, enabling superior scaling speed with lower capital overheads.",
          C: "Aggregators have no control over branding, pricing, or customer service standards.",
          D: "Aggregators rely solely on B2B wholesale transactions with traditional car rental agencies."
        },
        correctOption: "B",
        explanation: "Digital aggregators operate as 'asset-light' platforms. Instead of purchasing and maintaining an expensive fleet of cars (high CapEx and high depreciation), they build a platform coordinating peer-to-peer inventories under a unified brand, extracting transactional commissions. This offers supreme scalability."
      }
    ]
  },
  {
    id: "case-20",
    title: "Shakti Engineering: Turnaround through the 5S Workplace Methodology",
    chapterId: 3,
    chapterName: "Chapter 3: Lean System and Innovation",
    scenarioText: "Shakti Engineering Ltd. manufactures customized heavy industrial pumps and fluid control valves. Over the past four years, the company's tooling and machine floor fell into visual and operational chaos. Technicians regularly complained that they spent a significant portion of their shifts searching for loose jigs, calibrated measuring verniers, and critical socket wrenches. Furthermore, oil leaks from major high-pressure hydraulic presses frequently went undetected, leading to chronic mechanical breakdowns and particulate contamination that resulted in a high scrap rate of 8.5% of raw foundry inputs.\n\nA newly appointed Plant Manager initiates a comprehensive 5S workplace organization initiative. The turnaround is executed systematically in five successive stages:\n\n1. Sort (Seiri): The team implements a formal 'Red Tag' system. They audit the tooling floor and identify 1,800 items. Of these, 950 obsolete dies and damaged jigs are tagged. 600 are sold for scrap metal, and 350 are moved to an off-site overflow warehouse, immediately saving 400 square meters of high-value factory floor space.\n\n2. Set in Order (Seiton): The remaining 850 active tools and components are organized. The team designs modular tool cabinets with tailored cutout safety 'shadow boards' and paints high-visibility green, yellow, and red boundary lanes on the shop floors. This layout maps perfect pathways for handcarts, reducing the average worker search time per task from 15 minutes to a mere 45 seconds.\n\n3. Shine (Seiso): Group deep-cleaning schedules are enforced at the end of each shift. Within three weeks of launching Seiso, operators cleaning a major high-pressure molding station discover a fine hairline structural crack on a critical pump cylinder that was previously concealed beneath accumulated grease and layout dust. Immediate preventative maintenance is scheduled, avoiding an imminent catastrophic failure that would have triggered 14 days of complete factory stoppage.\n\n4. Standardize (Seiketsu): To formalize these improvements, the plant issues visual laminated Standard Operating Procedures (SOPs) showing color-coded cleanup photos and assigns daily cleaning and sorting ownership checklists to specified workstations.\n\n5. Sustain (Shitsuke): Weekly autonomous team audits are established with a performance-linked recognition leaderboard. The plant manager establishes a quarterly audit review to monitor compliance.\n\nFrom a financial perspective, the 5S initiative delivers substantial cost savings:\n- Total labor search waste eliminated: 4,800 technician hours saved annually, valued at a fully loaded labor rate of ₹250 per hour.\n- Tool replacements saved: Tool damage from grease/contamination falls by ₹350,000 annually.\n- Avoided breakdowns: Preventative early fault detection (like the pump cylinder crack) saves an estimated ₹1,200,000 in repair replacement parts and logistics premiums.\n- Scrap reduction: The scrap rate on raw foundry inputs falls from 8.5% to 2.5% on annual raw material purchases of ₹15,000,000.",
    questions: [
      {
        id: "q-20-1",
        questionText: "What represents the total calculated annual cost savings directly generated by Shakti Engineering as a consequence of implementing the 5S initiative (excluding potential one-time breakdown avoidance)?",
        options: {
          A: "₹1,550,000",
          B: "₹3,350,000",
          C: "₹2,450,000",
          D: "₹2,100,000"
        },
        correctOption: "C",
        explanation: "1. Labor Search Time Savings: 4,800 hours × ₹250/hr = ₹1,200,000.\n2. Tool Replacements Saved: ₹350,000.\n3. Raw Material Scrap Reduction Savings:\n- Original Scrap Cost = 8.5% of ₹15,000,000 = ₹1,275,000.\n- New Scrap Cost = 2.5% of ₹15,000,000 = ₹375,000.\n- Scrap Savings = ₹1,275,000 - ₹375,000 = ₹900,000.\nTotal regular savings = ₹1,200,000 (Labor) + ₹350,000 (Tools) + ₹900,000 (Scrap) = ₹2,450,000. (The skipped breakdown cost of ₹1,200,000 represents an occasional one-time expense avoidance, rather than regular annual operational budget savings)."
      },
      {
        id: "q-20-2",
        questionText: "Under the 5S framework, how does the third pillar, 'Shine' (Seiso), function beyond simple aesthetic cleanliness in a high-fidelity industrial environment?",
        options: {
          A: "It concentrates on negotiating volume discounts for premium high-performance cleaning fluids.",
          B: "It acts as a primary tool for early-warning mechanical inspection, exposing subtle oil leaks, structural cracking, and alignment drift before they escalate into absolute equipment failures.",
          C: "It is a psychological tactic designed to convince union laborers to accept lower base wages.",
          D: "It eliminates the need for formal predictive and preventative maintenance schedules."
        },
        correctOption: "B",
        explanation: "In Lean and TPM systems, Seiso (Shine/Clean) is not just about keeping the workshop beautiful. Cleaning is inspection. While wiping down machines, technicians physically touch structural casings, gears, and hydraulic feeds, allowing them to spot loose bolts, micro-cracks, and oil seepages that would otherwise cause critical machine failure."
      },
      {
        id: "q-20-3",
        questionText: "What is the primary objective of the fourth pillar, 'Standardize' (Seiketsu), and how does it prevent shop floor deterioration?",
        options: {
          A: "Creating standardized pricing tables for all spare parts vendors.",
          B: "Establishing visual rules, clean pictures, checklists, and clear responsibilities so that the first 3S practices become a routine and repeatable habit.",
          C: "Replacing all human manual labor with automated robotic process tooling setups.",
          D: "Enforcing static output quotas for every machinery operator."
        },
        correctOption: "B",
        explanation: "Standardize (Seiketsu) focuses on keeping Sort, Set in Order, and Shine highly visible and repeatable. By using visual controls (like photos of how a station must look), clear checklists, and defined ownerships, it makes abnormalities immediately obvious and integrates 5S tasks into daily standard work."
      },
      {
        id: "q-20-4",
        questionText: "Which pillar of the 5S system is widely recognized as the most challenging to implement successfully over the long term, and what does it demand from the leadership team?",
        options: {
          A: "Sort (Seiri); demands heavy one-time investment in inventory tracking software.",
          B: "Sustain (Shitsuke); demands cultural integration, continuous reinforcement, standard audits, and non-punitive feedback to instil self-discipline.",
          C: "Shine (Seiso); demands outsourcing deep cleaning to external expert janitorial companies.",
          D: "Set in Order (Seiton); demands hiring specialized industrial space-planning architects."
        },
        correctOption: "B",
        explanation: "Sustain (Shitsuke) is the hardest 5S step. It requires turning 5S into a fundamental element of the operational culture so that the organization does not slip back into old cluttered habits. It calls for relentless leadership discipline, continuous self-auditing, visual tracking boards, and positive feedback loops."
      }
    ]
  },
  {
    id: "case-21",
    title: "Alpha Robotics: Porter's Value Chain & Industry Value System Linkages",
    chapterId: 1,
    chapterName: "Chapter 1: An Introduction to Strategic Cost Management",
    scenarioText: "Alpha Robotics Ltd. designs and integrates high-tech smart robotic arms for retail packaging assembly lines. The industry is highly competitive, and competitors are aggressively cutting prices. To protect its margins, the CFO decides to transition from a reactive 'cost-plus' philosophy to systematic Strategic Cost Management using Michael Porter's Value Chain Analysis (VCA) model.\n\nAlpha's internal operations and overheads are broken down into the following activities:\n- Strategic inbound component testing: Engineering inspects incoming micro-sensors upon arrival at the shipping docks.\n- Precision robotic assembly & firmware calibration: Machining raw links and loading micro-code (Operations).\n- Automated packaging-speed simulation: Stress-testing active robotic arms on simulated conveyor belts inside the plant (Operations).\n- Direct consultative corporate sales: Dedicated accounts specialists working with plant engineers to secure long-term purchase agreements.\n- Software upgrades & remote maintenance diagnostic support: Remote team pushing OTA patches and troubleshooting robotic errors (Post-sale service).\n- Component Sourcing & Supplier Contracting: Group procurement negotiating bulk purchases of optical lenses and steel gears.\n- Proprietary AI Trajectory Algorithms: R&D programmers coding continuous motion pathway optimization software (Technology Development).\n\nAdditionally, the CFO analyzes the wider 'Industry Value System' and uncovers an opportunity: by integrating Alpha's ERP tracking system directly with their core multi-sensor supplier's production queue, Alpha can share real-time manufacturing schedules. This linkage eliminates the need for expensive component storage buffers at Alpha's warehouse while letting the vendor streamline its raw material procurement. This shared linkage yields a mutual cost savings of ₹1,400 per sensor unit.",
    questions: [
      {
        id: "q-21-1",
        questionText: "According to Michael Porter's Value Chain formulation, how should 'Component Sourcing & Supplier Contracting' and 'Software upgrades & remote maintenance diagnostic support' be classified?",
        options: {
          A: "Both are Primary Activities essential to raw physical movement.",
          B: "Component Sourcing is a Support Activity (Procurement), while Software updates & remote diagnostics is a Primary Activity (Service).",
          C: "Component Sourcing is a Support Activity (Infrastructure), while Software updates & remote diagnostics is a Support Activity (HR).",
          D: "Component Sourcing is a Primary Activity (Inbound Logistics), while Software updates & remote diagnostics is a Primary Activity (Operations)."
        },
        correctOption: "B",
        explanation: "In Porter's Value Chain:\n- Sourcing components and negotiating vendor agreements falls under 'Procurement' (a Support Activity that secures resources for the firm).\n- Post-purchasing diagnostic services and remote maintenance upgrades fall under 'Service' (a Primary Activity aimed at maintaining and enhancing the product's value after sale)."
      },
      {
        id: "q-21-2",
        questionText: "What strategic concept is illustrated by the ERP system integration between Alpha Robotics and its core micro-sensor supplier?",
        options: {
          A: "Vertical Integration, absorbing the supplier's corporate legal entity into Alpha Robotics.",
          B: "Exploiting 'Upstream Linkages' within the Industry Value System to achieve mutual cost reductions and supply chain efficiencies.",
          C: "Exploiting 'Downstream Linkages' to bypass individual retail buyers completely.",
          D: "Creating a pricing cartel to restrict competitor access to high-grade micro-sensors."
        },
        correctOption: "B",
        explanation: "An Industry Value System includes the value chains of suppliers, the firm, and distributors. By creating systems linkages with upstream suppliers (e.g. sharing mutual ERP schedules), Alpha removes unnecessary safety stock buffers, lowers storage costs, and reduces supplier plan changes, capturing mutual cost advantages."
      },
      {
        id: "q-21-3",
        questionText: "How should the development of the 'Proprietary AI Trajectory Algorithms' be classified under the strategic cost management guidelines?",
        options: {
          A: "A volume-based structural cost driver that scales linearly with factory size.",
          B: "A Support Activity (Technology Development) that serves as a powerful differentiation driver by boosting robotic efficiency.",
          C: "An Inbound Logistics step aimed at receiving raw parts.",
          D: "A pure administrative expense with no direct strategic value."
        },
        correctOption: "B",
        explanation: "R&D and software algorithms fall under 'Technology Development' (a Support Activity). Strategically, this is a Differentiation Cost Driver. By writing proprietary trajectory algorithms that allow faster packaging, Alpha improves customer value and can charge a premium price, establishing high differentiation."
      },
      {
        id: "q-21-4",
        questionText: "What is a central principle of Porter's Value Chain analysis regarding cost allocation compared to traditional functional costing?",
        options: {
          A: "It aggregates all operational expenses into a single massive factory cost pool to simplify variance calculations.",
          B: "It deconstructs the firm into discrete, strategically relevant activities to understand cost behavior and identify distinct sources of differentiation.",
          C: "It ignores support activities and focuses solely on direct material and manufacturing labor variance analysis.",
          D: "It assumes that fixed administrative overheads are uncontrollable and should not be analyzed."
        },
        correctOption: "B",
        explanation: "Traditional systems group costs of different departments together into vague buckets (like rent, utilities, depreciation). Porter's Value Chain breaks the firm into distinct, strategically meaningful activities (Inbound, Operations, Marketing, HR, Technology, etc.) to evaluate their actual contribution to margins, costs, and customer premium value drivers."
      }
    ]
  },
  {
    id: "case-22",
    title: "MedTech Diagnostic: Porter's Five Forces & Generic Strategies of Strategic Positioning",
    chapterId: 1,
    chapterName: "Chapter 1: An Introduction to Strategic Cost Management",
    scenarioText: "MedTech Diagnostic Ltd. manufactures highly specialized molecular assay kits used by oncology research clinics to scan and identify early-stage cancer markers. MedTech's top-tier R&D team holds key patents on a proprietary biosensor chip that delivers results with 99.8% precision, compared to the industry average of 92.0%. This precision allows clinicians to design highly precise chemotherapy protocols, attracting high client satisfaction.\n\nThe regulatory landscape and market structure present specific competitive forces:\n1. Threat of New Entrants: High potential due to expiring generic patents, but countered by strict FDA/regulatory clearance hurdles and the high cost of specialized clean-room manufacturing equipment.\n2. Buyer Bargaining Power: High, because oncology clinics are increasingly being purchased by large purchasing networks (corporate hospital groups) that command substantial discount leverage.\n3. Pressure from Substitutes: Moderate-low, since radiological imagers are available but cannot detect cancer at the genetic cellular marker level.\n4. Supplier Bargaining Power: Extremely high for critical reagents, which are patented biological proteins sourced exclusively from two global biotechnology providers.\n5. Rivalry among Competitors: Intense, with three major multinational diagnostic firms spending billions on marketing and broad distribution networks.\n\nMedTech's executive committee is evaluating two strategic paths to defend margins in its new FY planning cycle:\n- Option A (Broad Cost Leadership): Standardize the molecular chip designs, outsource R&D, and construct high-volume automated packaging lines to distribute low-complexity kits to generic municipal health clinics. This would require cutting pricing by 50%.\n- Option B (Focused Product Differentiation): Retain high-end custom R&D, maximize biosensor sensitivity, and partner exclusively with top-tier private oncology networks, charging a 300% premium price supported by superior clinical metrics.\n\nThe COO warns that pursuing generic high-volume sales while maintaining an expensive boutique laboratory operation would land MedTech in Michael Porter's 'Stuck-in-the-Middle' trap.",
    questions: [
      {
        id: "q-22-1",
        questionText: "Analyze the bargaining power of buyers and suppliers in the molecular diagnostic market based on MedTech's operating scenario.",
        options: {
          A: "Buyer power is low because cancer testing is vital; supplier power is low because biological reagents are standard commodity inputs.",
          B: "Buyer power is high due to the consolidation of hospital networks; supplier power is extremely high because critical biological reagents are controlled by an exclusive biotechnology duopoly.",
          C: "Buyer power is high due to low switching costs to standard generic kits; supplier power is low because MedTech holds biosensor patents.",
          D: "Both buyer and supplier powers are irrelevant because MedTech commands a monopoly position globally."
        },
        correctOption: "B",
        explanation: "According to Porter's Five Forces:\n- Buyer power is high since large hospital networks pool purchases to command deep discounts.\n- Supplier power is extremely high because critical reagents are controlled by a tight oligopoly (only two global biotechnology suppliers), which limits MedTech's ability to negotiate down material costs."
      },
      {
        id: "q-22-2",
        questionText: "What strategic vulnerability does the COO seek to avoid when highlighting Michael Porter's 'Stuck-in-the-Middle' designation?",
        options: {
          A: "Being highly dependent on a single supplier of generic research reagents.",
          B: "Failing to build clear competitive advantage, resulting in high overheads of custom boutique operations combined with low volumes and poor commodity pricing power.",
          C: "Failing to secure sufficient bank financing to expand research operations into overseas territories.",
          D: "Operating with a zero-cost subscription service model that cannot cover basic factory scrap expenses."
        },
        correctOption: "B",
        explanation: "A firm becomes 'stuck in the middle' when it fails to commit to a clear strategic generic direction. Trying to compete on Cost Leadership (which requires thin margins and massive volume) while carrying the high fixed costs of a customized Differentiation strategy leads to high costs, low volumes, and poor brand identity, which destroys operating margins."
      },
      {
        id: "q-22-3",
        questionText: "For MedTech’s specialized diagnostic kits, which option represents the most strategic and profitable path to exploit its core competency, and why?",
        options: {
          A: "Option A; because standard municipal clinics hold the highest volume transaction capacity.",
          B: "Option B; because focusing on high differentiation leverages their patent equity and clinical precision, allowing them to pass high reagent costs down to premium buyers willing to pay high prices.",
          C: "Option A; because general research labs have very low switching costs to basic chemical reactants.",
          D: "Option B; because outsourcing sensor manufacturing to low-wage countries is the only way to protect patents."
        },
        correctOption: "B",
        explanation: "MedTech's core strengths are its high-end R&D team and patented 99.8% precision biosensors. A Focused Product Differentiation strategy (Option B) leverages these capabilities. High margin oncology centers will pay high premiums for superior clinical success. This premium margin shrugs off high reagent costs (exerted by high supplier power) in a way that low-cost commodity kits cannot."
      },
      {
        id: "q-22-4",
        questionText: "Which of the following describes why 'High Regulatory & FDA Clearances' act as a barrier to entry in Michael Porter's Five Forces model?",
        options: {
          A: "They increase supplier bargaining power of chemical reagents by setting price ceilings.",
          B: "They act as a structural entry barrier that increases upfront R&D lead times and compliance costs, protecting existing players from rapid market entry by copycat generic providers.",
          C: "They eliminate competitor rivalry by forcing firms to share patents openly.",
          D: "They increase buyer power by forcing companies to post their margin structures publicly."
        },
        correctOption: "B",
        explanation: "Government regulations and rigorous approval processes (like FDA clearance) act as high barriers to entry. They force potential entrants to spend immense capital and undergo years of testing before they can commercialize a rival kit. This protects the market share and pricing power of established incumbents like MedTech."
      }
    ]
  },
  {
    id: "case-23",
    title: "EcoCycle Chem: Material Flow Cost Accounting (MFCA) under ISO 14051",
    chapterId: 4,
    chapterName: "Chapter 4: Specialist Cost Management Techniques",
    scenarioText: "EcoCycle Chem Pvt. Ltd. manufactures a specialized agricultural biocide called Bio-Sust. The company uses Material Flow Cost Accounting (MFCA) under ISO 14051 to trace material inefficiencies across its two sequential Flow Centers: Flow Center 1 (Molding & Mixing) and Flow Center 2 (Purification & Packaging).\n\nDuring May 2026, the company entered 10,000 kg of primary raw material chemical (called Agent-Z) into Flow Center 1. Agent-Z is purchased at ₹80 per kg. In addition, Flow Center 1 incurred System (Labor) costs of ₹1,50,000 and Energy/Utility costs of ₹1,20,000.\n\nFlow Center 1 processing results show:\n1. 10% of raw inputs by weight are lost as chemical scrap and waste (Negative Product).\n2. The remaining 9,000 kg is categorized as Positive Product and transferred to Flow Center 2 for purification.\n3. In Flow Center 1, material, system, and energy costs are allocated to Positive and Negative Products strictly based on the physical weight balance of material output.\n\nFlow Center 2 processing results show:\n1. The 9,000 kg Positive Product from Flow Center 1 is received as the starting input.\n2. An additional 1,000 kg of liquid packaging solvents costing ₹120 per kg are added into the mix. This sets the total input weight balance in Flow Center 2 at 10,000 kg.\n3. Flow Center 2 incurs System costs of ₹2,00,000 and Energy/Utility costs of ₹1,80,000.\n4. During final filtration, 5% of the total 10,000 kg input (i.e., 500 kg) is lost as purification sludge (Negative Product).\n5. The remaining 9,500 kg of biocide is packaged and sold as finished Positive Product.\n6. In Flow Center 2, all costs (the transfer-in positive product cost from Flow Center 1, new packaging material, system, and energy costs) are allocated based on physical output weight (9,500 kg positive, 500 kg negative).",
    questions: [
      {
        id: "q-23-1",
        questionText: "What is the total cost of the 'Negative Product' (waste stream) generated in Flow Center 1, and the cost of the transferring 'Positive Product' to Flow Center 2?",
        options: {
          A: "Negative Product: ₹1,07,000; Positive Product: ₹9,63,000",
          B: "Negative Product: ₹80,000; Positive Product: ₹9,90,000",
          C: "Negative Product: ₹1,50,050; Positive Product: ₹10,20,000",
          D: "Negative Product: ₹1,20,000; Positive Product: ₹9,50,000"
        },
        correctOption: "A",
        explanation: "Total costs incurred in Flow Center 1 = Raw Material (10,000 kg x ₹80 = ₹8,00,000) + System (₹1,50,000) + Energy (₹1,20,000) = ₹10,70,000. Under MFCA physical weight balance allocation:\n- Negative Product (10% weight): 10% of ₹10,70,000 = ₹1,07,000.\n- Positive Product (90% weight): 90% of ₹10,70,000 = ₹9,63,000. This is the value transferred to Flow Center 2."
      },
      {
        id: "q-23-2",
        questionText: "What is the total accumulated input cost in Flow Center 2 before physical output weight allocations are performed?",
        options: {
          A: "₹15,50,000",
          B: "₹14,63,000",
          C: "₹13,50,000",
          D: "₹15,00,000"
        },
        correctOption: "B",
        explanation: "Cumulative input costs of Flow Center 2 are:\n- Transferred-in cost from Flow Center 1: ₹9,63,000\n- New material added (1,000 kg × ₹120): ₹1,20,000\n- Flow Center 2 System costs: ₹2,00,000\n- Flow Center 2 Energy costs: ₹1,80,000\nTotal cumulative input cost = ₹9,63,000 + ₹1,20,000 + ₹2,00,000 + ₹1,80,000 = ₹14,63,000."
      },
      {
        id: "q-23-3",
        questionText: "What are the final allocated values of the finished Positive Product and the Negative Product (filtration sludge) for Flow Center 2?",
        options: {
          A: "Positive Product: ₹13,89,850; Negative Product: ₹73,150",
          B: "Positive Product: ₹12,85,000; Negative Product: ₹1,78,000",
          C: "Positive Product: ₹14,00,000; Negative Product: ₹63,000",
          D: "Positive Product: ₹13,50,000; Negative Product: ₹1,13,000"
        },
        correctOption: "A",
        explanation: "The total input weight in Flow Center 2 is 10,000 kg. Output splits:\n- Negative Product (sludge): 5% weight = 500 kg\n- Positive Product (finished): 95% weight = 9,500 kg.\nAllocating the total accumulated cost of ₹14,63,000 based on weight:\n- Negative Product Cost: 5% of ₹14,63,000 = ₹73,150.\n- Positive Product Cost: 95% of ₹14,63,000 = ₹13,89,850.",
        examinerWarning: "ICAI Exam Trap: Many students try to allocate energy and system costs only to the Positive Product (good output) and allocate only raw material costs to the Negative Product (sludge). Remember, under ISO 14051, ALL cost categories (material, energy, and system costs) are pooled and allocated on the same solid physical weight balance basis (e.g., 5% to Negative, 95% to Positive)."
      },
      {
        id: "q-23-4",
        questionText: "From a strategic cost management perspective, what is the core advantage of ISO 14051 Material Flow Cost Accounting (MFCA) over traditional cost accounting systems?",
        options: {
          A: "It fully ignores non-conforming scrap so production managers are not penalized during performance appraisals.",
          B: "It makes the commercial cost of material losses visible as 'Negative Product Costs' (incorporating labor and energy), motivating engineers to implement design-stage waste reduction.",
          C: "It treats environmental clean-up fines as positive revenue streams for marketing promotions.",
          D: "It forces the finance team to classify all factory worker wages as environmental assets."
        },
        correctOption: "B",
        explanation: "Traditional systems fold material wastage costs into finished goods costs, which masks the true cash outflow. MFCA splits and assigns proportional processing, labor, and energy costs to raw scrap (Negative Product Costs). Underlining that ₹73,150 + ₹1,07,000 = ₹1,80,150 was spent generating waste streams makes the business case for waste reduction visually undeniable."
      }
    ]
  },
  {
    id: "case-24",
    title: "SolarNode Technologies: Product Life Cycle Costing & Multi-Year Hurdle Pricing",
    chapterId: 4,
    chapterName: "Chapter 4: Specialist Cost Management Techniques",
    scenarioText: "SolarNode Technologies Ltd. is developing a premium grid-interactive battery storage system, 'SolarNode-X', for commercial solar networks. Under standard ICAI lifecycle costing parameters, the product is expected to have a short 4-year lifecycle, after which it will be replaced by solid-state alternatives.\n\nEstimated lifecycle expenditures include:\n- Research & Design (Upstream): ₹45,00,000 in Year 0.\n- Pre-production Tooling & Robot Setup: ₹15,00,000 in Year 0.\n- Variable Manufacturing Cost per Unit: ₹1,55,000 of materials, plus 25 assembly hours at a cost of ₹1,000 per hour (inclusive of fringe benefits).\n- Fixed Manufacturing Overheads: ₹50,00,000 fixed per year for Years 1 to 4.\n- Marketing & Product Launch: ₹20,00,000 in Year 1 and ₹8,00,000 per year for Years 2 to 4.\n- Warranty Service & Customer Complaints (Year 1 to 4): SolarNode expects a 2.5% warranty claim rate on units sold. Resolving a warranty claim (requiring a service engineer visit and module swapping) costs ₹80,000 per claimed unit.\n- Decommissioning & Environmental Cleanup (Downstream): Under plastic and lithium disposal policies, SolarNode must establish a recycling trust of ₹12,000 per unit produced, payable at product retirement in Year 4.\n\nThe marketing team expects the following sales demand across the 4-year lifecycle:\n- Year 1: 50 units\n- Year 2: 150 units\n- Year 3: 200 units\n- Year 4: 100 units\nTotal lifetime volume = 500 units.\n\nSolarNode matches its corporate capital pricing strategy against a required lifecycle return on sales (ROS) profit margin of 20% flat on lifetime revenues.",
    questions: [
      {
        id: "q-24-1",
        questionText: "What is the total of Upstream (R&D + Tooling) and Downstream (Warranty + Decommissioning Disposal) costs across SolarNode-X's entire lifetime?",
        options: {
          A: "Upstream: ₹60,00,000; Downstream: ₹70,00,000",
          B: "Upstream: ₹60,00,000; Downstream: ₹85,00,000",
          C: "Upstream: ₹45,00,000; Downstream: ₹60,00,000",
          D: "Upstream: ₹50,00,000; Downstream: ₹60,00,000"
        },
        correctOption: "A",
        explanation: "Upstream costs (Year 0) = R&D (₹45,00,000) + Pre-production tooling (₹15,00,000) = ₹60,00,000.\nDownstream costs:\n- Warranty Resolver cost: 500 lifetime units x 2.5% claim rate = 12.5 claims. Total warranty cost = 12.5 claims x ₹80,000 = ₹10,00,000.\n- Environmental Cleanup: 500 produced units x ₹12,000 = ₹60,00,000.\nTotal Downstream costs = ₹10,00,000 + ₹60,00,000 = ₹70,00,000."
      },
      {
        id: "q-24-2",
        questionText: "What is the total lifetime cost of manufacturing (variable materials, labor, and fixed factory overheads) and marketing across all 4 operational years?",
        options: {
          A: "Manufacturing: ₹11,00,00,000; Marketing: ₹44,00,000",
          B: "Manufacturing: ₹9,00,00,000; Marketing: ₹44,00,000",
          C: "Manufacturing: ₹11,00,00,000; Marketing: ₹28,00,000",
          D: "Manufacturing: ₹12,00,00,000; Marketing: ₹50,00,000"
        },
        correctOption: "A",
        explanation: "Manufacturing cost calculations:\n- Variable cost per unit = ₹1,55,000 (materials) + (25 assembly hours × ₹1,000/hour = ₹25,000) = ₹1,80,000.\n- Total Variable manufacturing for 500 units = 500 × ₹1,80,000 = ₹9,00,00,000.\n- Total Fixed Overheads = ₹50,00,000/year × 4 years = ₹2,00,00,000.\n- Total Manufacturing = ₹9,00,00,000 + ₹2,00,00,000 = ₹11,00,00,000 (₹11 Crore).\nMarketing cost calculations:\n- Year 1 (Launch) = ₹20,05,000, wait, it is ₹20,00,000.\n- Years 2 to 4 = 3 years × ₹8,00,000 = ₹24,00,000.\n- Total Marketing = ₹44,00,000."
      },
      {
        id: "q-24-3",
        questionText: "What is the total accumulated product lifecycle cost per unit of preproduction, manufacturing, marketing, warranty, and disposal of SolarNode-X?",
        options: {
          A: "₹2,54,800 per unit",
          B: "₹2,20,000 per unit",
          C: "₹2,84,800 per unit",
          D: "₹2,60,000 per unit"
        },
        correctOption: "A",
        explanation: "Total lifecycle costs are:\n- Upstream (R&D and Setup): ₹60,00,000\n- Manufacturing (Variable + Fixed): ₹11,00,00,000\n- Marketing (Year 1 to 4): ₹44,00,000\n- Warranty claims: total is ₹10,00,000\n- Decommissioning trust: ₹60,00,000\nTotal accumulated costs = ₹60,00,000 + ₹11,00,00,000 + ₹44,05,000, wait, flat ₹44,00,000 + ₹10,00,000 + ₹60,00,000 = ₹12,74,00,000.\nUnits produced = 500 units.\nLifecycle unit cost = ₹12,74,00,000 / 500 = ₹2,54,800 per unit."
      },
      {
        id: "q-24-4",
        questionText: "Under target lifecycle costing, what target price per unit should SolarNode set to achieve its required Return on Sales (ROS) profit margin of 20%?",
        options: {
          A: "₹3,18,500 per unit",
          B: "₹3,05,760 per unit",
          C: "₹3,50,000 per unit",
          D: "₹3,25,000 per unit"
        },
        correctOption: "A",
        explanation: "Required profit margin is 20% on Sales Price, which means Lifecycle Cost represents 80% (100% - 20%) of the Sales Price. \nTarget Sales Price = Lifecycle Unit Cost / 0.8\n= ₹2,54,800 / 0.8 = ₹3,18,500 per unit.",
        examinerWarning: "Common Pitfall: Confusing Mark-up on Cost with Return on Sales (ROS) margin. A required ROS margin of 20% means cost is 80% of selling price (Price = Cost / 0.8), which is equivalent to a 25% cost mark-up (1/4 of cost). Do not multiply unit cost directly by 1.2, as that represents a 20% cost mark-up and would result in an incorrect selling price!"
      }
    ]
  },
  {
    id: "case-25",
    title: "Indo-Power Gears: Transfer Pricing under Shared SCM Bottlenecks & Shared Capacity Constraints",
    chapterId: 12,
    chapterName: "Chapter 12: Divisional Transfer Pricing",
    scenarioText: "Indo-Power Gears has two internal divisions under SCM: Division A (Gears Manufacturing) and Division B (Turbine Assembly). Division A specializes in precision forging, which is a key shared bottleneck capacity constraint. Over the upcoming year, Division A has a total ceiling of 12,000 skilled machine-tool hours.\n\nDivision A can produce two advanced items using these machines:\n1. Standard Gear-K (external sales option only):\n- Standard Selling Price: ₹6,500 per unit.\n- Variable Cost: ₹3,500 per unit.\n- Forging time needed: 2 machine hours per unit.\n- Maximum external demand: 4,000 units.\n\n2. Advanced Gear-V (can either be sold externally OR transferred internally to Division B to be packed inside custom geothermal turbines):\n- External Selling Price: ₹10,000 per unit.\n- Variable Cost (excluding local shipping): ₹5,000 per unit.\n- Specific external shipping/selling costs: ₹300 per unit (fully avoided for internal transfer).\n- Forging time needed: 3 machine hours per unit.\n- External demand: 3,000 units.\n\nDivision B wants to purchase 2,000 units of Advanced Gear-V internally from Division A. Division B will use Gear-V to produce Geothermal Turbines which it sells externally for ₹45,000, incurring other internal processing costs of ₹34,000. Division B can source an equivalent gear from an external supplier for ₹9,800 per unit.\n\nTo supply 2,000 units of Gear-V internally, Division A must utilize 6,000 machine hours (2,000 units x 3 hours per unit). Due to its aggregate capacity limit of 12,000 hours, Division A must optimize its production to maximize contribution. SCM rules dictate that Division A will prioritize highly profitable external sales before committing to internal transfers, needing to recover lost opportunity contributions.",
    questions: [
      {
        id: "q-25-1",
        questionText: "Under optimal autonomous positioning (ignoring internal transfers), what is Division A's profit-maximizing production schedule across its external products?",
        options: {
          A: "3,000 units of Gear-V (Rank 1) and 1,500 units of Gear-K (Rank 2); Unused capacity: Nil",
          B: "4,000 units of Gear-K and 1,333 units of Gear-V; Unused capacity: Nil",
          C: "1,500 units of Gear-V and 3,750 units of Gear-K; Unused capacity: Nil",
          D: "3,000 units of Gear-V and 3,000 units of Gear-K; Overtime required"
        },
        correctOption: "A",
        explanation: "To rank the products under capacity constraints, calculate contribution per bottleneck hour:\n- Gear-K: Contribution per unit = ₹6,500 - ₹3,500 = ₹3,000. Forging hours = 2. Contribution per hour = ₹3,000 / 2 = ₹1,500.\n- Gear-V (external): Contribution per unit = ₹10,000 - ₹5,000 Variable Mfg - ₹300 External Shipping = ₹4,700. Forging hours = 3. Contribution per hour = ₹4,700 / 3 = ₹1,566.67.\nRanking: Rank 1 is Gear-V, Rank 2 is Gear-K.\nFor 12,000 hours capacity:\n- Produce 3,000 units of Gear-V (uses 9,000 machine hours).\n- Remaining hours = 12,000 - 9,000 = 3,000 hours.\n- Allocate to Gear-K: 3,000 / 2 = 1,500 units of Gear-K. This utilizes 12,000 hours fully, leaving nil unused capacity."
      },
      {
        id: "q-25-2",
        questionText: "If Division A transfers 2,000 units of Gear-V internally to help Division B, what is the exact physical sacrifice of external products Division A has to make?",
        options: {
          A: "Sacrifice 1,500 units of external Gear-K and 1,000 units of external Gear-V",
          B: "Sacrifice 2,000 units of external Gear-V only",
          C: "Sacrifice 2,500 units of external Gear-K only",
          D: "Sacrifice 1,000 units of external Gear-K and 1,000 units of external Gear-V"
        },
        correctOption: "A",
        explanation: "Internal transfer of 2,000 units of Gear-V requires 2,000 × 3 hours = 6,000 machine hours.\nTo free up 6,000 hours from its current optimal schedule:\n- First cut the lowest ranking product, Gear-K (Rank 2). Entirely sacrificing 1,500 units of Gear-K frees up 1,500 × 2 = 3,000 machine hours.\n- Still need 3,000 hours (6,000 - 3,000). Free these up by cutting Gear-V (Rank 1): 3,000 hours / 3 hours per unit = 1,000 units of external Gear-V sacrificed.\nThus, Division A must sacrifice 1,500 units of external Gear-K and 1,000 units of external Gear-V."
      },
      {
        id: "q-25-3",
        questionText: "What is the total lost contribution (opportunity cost) suffered by Division A to fulfill the internal transfer of 2,000 units?",
        options: {
          A: "₹92,00,000",
          B: "₹85,00,000",
          C: "₹95,00,000",
          D: "₹80,00,000"
        },
        correctOption: "A",
        explanation: "Opportunity cost represents lost contribution from sacrificed external sales:\n- Lost contribution from 1,500 units of Gear-K = 1,500 × (₹6,500 - ₹3,505) = 1,500 × ₹3,000 = ₹45,00,000.\n- Lost contribution from 1,000 units of external Gear-V = 1,000 × (₹10,000 - ₹5,000 Variable Mfg - ₹300 Shipping) = 1,000 × ₹4,700 = ₹47,00,000.\nTotal lost opportunity cost = ₹45,00,000 + ₹47,00,000 = ₹92,00,000."
      },
      {
        id: "q-25-4",
        questionText: "What is the minimum Transfer Price per unit that Division A should charge for the 2,000 internal units to secure divisional goals?",
        options: {
          A: "₹9,600 per unit",
          B: "₹9,800 per unit",
          C: "₹8,500 per unit",
          D: "₹7,800 per unit"
        },
        correctOption: "A",
        explanation: "Minimum Transfer Price per unit = Incremental variable cost of internal transfer + Lost opportunity cost per transferred unit.\n- Direct incremental cost = Variable mfg cost of Gear-V (external shipping of ₹300 is avoided) = ₹5,000.\n- Lost opportunity cost per unit transferred = Total lost opportunity contribution / Units transferred = ₹92,00,000 / 2,000 units = ₹4,600 per unit.\nMinimum TP = ₹5,000 + ₹4,600 = ₹9,600 per unit.\nSince ₹9,600 is below the external gear market price of ₹9,800, setting the TP in the range [₹9,605, ₹9,800] satisfies both divisions (goal congruence) and boosts corporate surplus.",
        examinerWarning: "Examiner's Warning: Be careful when calculating the variable cost for internal transfers. If any specific selling/shipping cost (e.g. ₹300) is avoided for internal transfers, you MUST deduct it from the variable cost used in the minimum transfer price formula. Do not lazy-copy the full external variable cost of ₹5,300!"
      }
    ]
  },
  {
    id: "case-26",
    title: "Hyperion Global: Dual Impact of Corporate Income Taxes & Import Customs Duties",
    chapterId: 12,
    chapterName: "Chapter 12: Divisional Transfer Pricing",
    scenarioText: "Hyperion Global Corporation operates in two different tax jurisdictions: Manufacturing Division M (located in Germany, corporate tax rate 30%) and Assembly Division R (located in India, corporate tax rate 25%). Division M produces customized laser sensor chips at a variable manufacturing cost of €100 per unit, transferring them to Division R in India.\n\nIn India, Division R faces a 12% ad-valorem Import Customs Duty on all landed transfers, which is computed directly on the internal transfer price. Customs duty is a tax-deductible expense for calculating India corporate income tax.\n\nDivision R integrates the custom chips into premium medical diagnostic modules sold in the Indian healthcare market for €600 per unit, incurring separate local variable finishing costs of €150 per unit.\n\nThe global tax director of Hyperion is evaluating whether to set the internal transfer price as low as possible (at Division M's variable cost of €100) or at a market-justified high price of €200 to optimize the global post-tax cash flows of the group, based on an expected volume of 1,000 transferred units for the upcoming quarter.",
    questions: [
      {
        id: "q-26-1",
        questionText: "If the transfer price is set at the Low Option of €100 per unit, what is the combined tax and customs duty liability for Hyperion Global across both Germany and India?",
        options: {
          A: "€96,500",
          B: "€1,02,000",
          C: "€84,500",
          D: "€1,13,000"
        },
        correctOption: "A",
        explanation: "Low Transfer Price Option (€100):\n1. Germany Division M tax: Selling Price = €100, VC = €100. Profit = 0. Tax in Germany = 0.\n2. India Division R customs duty: 12% on €100 = €12 per unit. Total Customs Duty for 1,000 units = €12,000.\n3. India Division R income tax: Revenues = €600. Costs = TP (€100) + Finishing VC (€150) + Customs Duty (€12) = €262.\n- Taxable profit per unit = €600 - €262 = €338.\n- Total India profit = €3,38,000.\n- India Tax (25% rate) = 25% of €3,38,000 = €84,500.\nCombined Tax & Customs Liabilities = Germany tax (€0) + India Customs (€12,000) + India Tax (€84,500) = €96,500.",
        examinerWarning: "Common Pitfall: Remember that Import Customs Duty in India (12%) is computed directly on the Transfer Price of €100. However, when calculating India's taxable income, the Customs Duty itself is a tax-deductible expense. So the total deductible cost in India is: Transfer Price (€100) + finishing VC (€150) + customs duty paid (€12) = €262 per unit."
      },
      {
        id: "q-26-2",
        questionText: "If the transfer price is set at the High Option of €200 per unit, what is the combined tax and customs duty liability for Hyperion Global across both countries?",
        options: {
          A: "€1,10,500",
          B: "€1,20,500",
          C: "€96,500",
          D: "€1,05,000"
        },
        correctOption: "A",
        explanation: "High Transfer Price Option (€200):\n1. Germany Division M tax: Selling Price = €200, VC = €100. Profit per unit = €100.\n- Total Germany profit = 1,000 × €100 = €1,00,000.\n- Germany Tax (30% rate) = 30% of €1,00,000 = €30,000.\n2. India Division R customs duty: 12% on €200 = €24 per unit. Total Customs Duty for 1,000 units = €24,000.\n3. India Division R income tax: Revenues = €600. Costs = TP (€200) + Finishing VC (€150) + Customs Duty (€24) = €374.\n- Taxable profit per unit = €600 - €374 = €226.\n- Total India profit = €2,26,000.\n- India Tax (25% rate) = 25% of €2,26,000 = €56,500.\nCombined Tax & Customs Liabilities = Germany tax (€30,000) + India Customs (€24,000) + India Tax (€56,500) = €1,10,500."
      },
      {
        id: "q-26-3",
        questionText: "What is the net global post-tax cash advantage or disadvantage of choosing the Low transfer price (€100) instead of the High transfer price (€200)?",
        options: {
          A: "Net advantage of €14,000 by setting Low TP",
          B: "Net disadvantage of €8,000 by setting Low TP",
          C: "Net advantage of €24,005 by setting Low TP",
          D: "No difference since the internal transaction offsets internally"
        },
        correctOption: "A",
        explanation: "By setting the Low TP (€100), the combined tax and customs liability is €96,500. By setting the High TP (€200), the combined liability is €110,500.\nNet Post-Tax cash savings = €110,500 - €96,500 = €14,000.\nThus, adopting a Low TP yields a post-tax advantage of €14,000 for the group."
      },
      {
        id: "q-26-4",
        questionText: "Which of the following conditions would most likely compel Hyperion Global to choose the High transfer price of €200 despite paying higher import customs and taxes?",
        options: {
          A: "India introduces high dividend distribution taxes or repatriation restrictions on post-tax cash.",
          B: "Germany reduces its corporate tax rate below India's corporate tax rate.",
          C: "Both A and B are valid considerations.",
          D: "India increases its corporate tax rate to 50% while lowering customs duties to zero."
        },
        correctOption: "C",
        explanation: "If India restricts repatriation or imposes heavy dividend taxes, setting a High TP allows Hyperion to move earnings back to Germany under the guise of invoice costs, bypassing dividend blocks. Furthermore, if Germany's tax rate falls below India's, shifting profits to Germany by raising the TP can save more income tax than the customs duty penalty, justifying a high TP."
      }
    ]
  }
,

  {
    id: "case-27",
    title: "Apex Electronics: Cost of Quality (COQ) & Supply Chain Dynamics",
    chapterId: 2,
    chapterName: "Chapter 2: Modern Business Environment",
    scenarioText: "Apex Electronics (AE) is a premium manufacturer of smartphone display screens in the highly competitive buyers' market. The company recently launched its next-generation ultra-OLED screens. However, international customers have flagged a 12% rejection rate due to screen flicker defects.\n\nFaced with customer churn threat, the CEO, Rajesh, orders a complete audit. The finance division prepares a Cost of Quality (COQ) PAF ledger detailing past annual costs:\n1. Prevention Costs: ₹3,00,000 (spent on technical design reviews, supplier capability evaluation, and operator skill training).\n2. Appraisal Costs: ₹4,00,000 (spent on outgoing screening, screen testing equipment calibration, and supplier material inspections).\n3. Internal Failure Costs: ₹12,00,000 (spent on factory scrap, rebuild rework hours, and machinery downtime during rework loops).\n4. External Failure Costs: ₹21,00,000 (spent on international warranty replacement shipping, user helpdesks, processing raw returns, and brand goodwill allowances).\n\nRajesh implements a Total Quality Management (TQM) framework, prioritizing the Deming cycle to prevent errors rather than inspecting them out. To stabilize outward logistics, Rajesh also explores moving from a Push-based mass storage distribution model to a Pull-based JIT delivery model directly coupled with telecom customer orders.",
    questions: [
          {
                "id": "q-27-1",
                "questionText": "What are the Conformance Costs (good costs) and Non-Conformance Costs (bad costs) for Apex Electronics currently?",
                "options": {
                      "A": "Conformance: ₹3,00,000; Non-Conformance: ₹37,00,000",
                      "B": "Conformance: ₹7,00,000; Non-Conformance: ₹33,00,000",
                      "C": "Conformance: ₹15,00,000; Non-Conformance: ₹25,00,000",
                      "D": "Conformance: ₹19,00,000; Non-Conformance: ₹21,00,000"
                },
                "correctOption": "B",
                "explanation": "Conformance Costs represent spending to ensure quality is achieved, consisting of Prevention (₹3,0,000) + Appraisal (₹4,0,000) = ₹7,00,000. Non-Conformance Costs represent the failure aftermath, consisting of Internal Failure (₹12,0,000) + External Failure (₹21,0,000) = ₹33,00,000."
          },
          {
                "id": "q-27-2",
                "questionText": "Which of Apex Electronics' expenditures is correctly categorized under Prevention Costs?",
                "options": {
                      "A": "Outward screening and flicker calibration testing",
                      "B": "Warranty claims processing and screen salvage shipping",
                      "C": "Technical design reviews and worker skill training",
                      "D": "Factory scrap and raw material inspection and grading"
                },
                "correctOption": "C",
                "explanation": "Prevention costs are incurred to prevent defects from occurring in the first place, such as design-stage reviews, machine reviews, and employee skill training. Scrap is Internal Failure; inspections are Appraisal; warranty claims are External Failure."
          },
          {
                "id": "q-27-3",
                "questionText": "In shifting from a Push-based logistics system to a Pull-based JIT smartphone carrier system, which risk exposure is AE most likely to face?",
                "options": {
                      "A": "Extreme inventory obsolescence costs from massive finished warehouses",
                      "B": "Supply chain disruptions and delays when raw screen components are delayed",
                      "C": "Massive process scrap overruns inside steady state production",
                      "D": "Double-taxation on outbound custom duties from domestic transport logistics"
                },
                "correctOption": "B",
                "explanation": "A Pull-based JIT model relies on zero safety stock. This removes warehousing obsolescence liabilities, but exposes the factory to operational delays if upstream component deliveries are delayed or disrupted, since there are no buffer inventories."
          }
    ]
  },

  {
    id: "case-28",
    title: "Zeta Tech Limited: Corporate Turnaround & Failure Prediction",
    chapterId: 8,
    chapterName: "Chapter 8: An Introduction to Strategic Performance Management",
    scenarioText: "Zeta Tech Limited (ZTL) operates a brick-and-mortar retail computer parts chain. Over the last three years, ZTL has faced declining revenue on account of e-commerce aggregator disruptions. ZTL's leverage has increased because of large fixed retail rents. Due to liquidity pressure, ZTL has delayed payments to its creditors.\n\nThe CFO, Amit, performs a financial triage and runs an Altman Z-Score (private manufacturing and retail models) to measure corporate failure risk. The resulting score is Z = 1.45. Since Z is below the 1.81 threshold for public firms (or 1.23 for private), Amit flags high distress.\n\nTo provide qualitative backing, the CEO uses the Argenti A-Score model, yielding the following results:\n- Defects: Autocratic management where the founder takes unchecked unilateral choices, passive non-executive board, and a total lack of modern budgetary control and MIS dashboards (Scored: 12 points).\n- Mistakes: Extremely high financial gearing (overtrading) and capital budgeting commitments for a massive warehouse before e-commerce expansion (Scored: 15 points).\n- Symptoms of trouble: Window-dressed accounts to secure short-term working capital banking loans, and very low staff morale (Scored: 4 points).\n\nTotal Argenti A-Score = 31 points (with a critical threshold of 25). ZTL's advisory board recommends a strategic turnaround plan involving the rationalization of unprofitable outlets and launching an online subscription-based custom PC configure platform.",
    questions: [
          {
                "id": "q-28-1",
                "questionText": "What does Amit's calculated Altman Z-score of 1.45 imply for Zeta Tech Limited?",
                "options": {
                      "A": "ZTL has robust financial health and is fit to pursue massive capital acquisitions",
                      "B": "ZTL is in the 'Grey Zone', indicating minor but fully manageable short-term debt pressures",
                      "C": "ZTL is in the 'Distress Zone' and faces a high probability of technical insolvency or bankruptcy within 24 months",
                      "D": "ZTL is in the 'Safe Zone', but qualitative management defects are pulling down operational morale"
                },
                "correctOption": "C",
                "explanation": "Under the Altman Z-score framework for corporate failure, any score below the lower threshold (1.81 for public, or 1.23 for private) indicates that the firm is in the 'Distress (or Bankruptcy) Zone', implying severe insolvency risks in the immediate future."
          },
          {
                "id": "q-28-2",
                "questionText": "In the Argenti A-Score model compiled for Zeta Tech, which of the following is classified as a Defect rather than a Mistake?",
                "options": {
                      "A": "Extremely high financial gearing (over-leveraging)",
                      "B": "A total lack of modern budgetary control and MIS dashboards",
                      "C": "Window-dressed accounts to secure short-term working capital banking loans",
                      "D": "Overtrading by building an expensive massive warehousing facility"
                },
                "correctOption": "B",
                "explanation": "In Argenti's A-Score, Defects represent the structural, long-term weaknesses in management (such as autocratic leadership, passive board of directors, lacking cost-reporting systems or MIS). Mistakes (like overtrading, excess gearing, or failed big projects) are consequences of those defects. Window-dressed accounts are Symptoms of trouble."
          },
          {
                "id": "q-28-3",
                "questionText": "According to the corporate turnaround strategy, what is the best immediate step for ZTL to address its high rental leverage?",
                "options": {
                      "A": "Window-dress financial statements further to secure high-interest commercial banking overdrafts",
                      "B": "Divest and shut down unprofitable physical retail locations to reduce fixed lease burdens",
                      "C": "Increase inventory storage in physical retail outlets to achieve bulk-buy economies of scale",
                      "D": "Replace the entire retail board with academic experts specializing in standard variance costing"
                },
                "correctOption": "B",
                "explanation": "ZTL's leverage is heavily driven by lease rent liabilities for unprofitable physical stores. Rationalization or divestment of these stores directly addresses the root fixed expenditure problem, while transitioning to an asset-light digital subscription/platform model."
          }
    ]
  },

  {
    id: "case-29",
    title: "Charity Health Haven: Value for Money (VFM) & Adapted Scorecard",
    chapterId: 10,
    chapterName: "Chapter 10: Strategic Performance Measures in the Non-For-Profit Organisations",
    scenarioText: "Charity Health Haven (CHH) is a charitable trust operating free community clinics across public-access rural sector nodes. CHH receives annual government welfare grants alongside citizen donations. Unlike private hospital chains, CHH's goal is to maximize community healthcare benefits rather than shareholder profit.\n\nTo prove fiduciary efficiency and satisfy audit supervisors, CHH implements a Value for Money (VFM) performance framework to evaluate its 3Es:\n- Economy: Evaluates if CHH is purchasing medical supplies, drugs, and services at the lowest possible cost, consistent with high-quality standards. (CHH recently renegotiated its bulk generic drug contract, securing standard pharmaceutical ingredients 20% cheaper).\n- Efficiency: Evaluates the output generated per unit of input. Inside clinic nodes, this is tracked as: medical nurse/doctor hours worked relative to the count of patients treated.\n- Effectiveness: Evaluates if clinic outcomes meet CHH's objective. This is measured as patient cure rates, immunization coverage, and qualitative patient satisfaction surveys.\n\nIn addition, to translate trust strategies into action, CHH implements Kaplan's Adapted Balanced Scorecard, shifting the Mission and Customer (beneficiary) satisfaction perspectives to the top of the hierarchy, supporting operations through fundraising and asset stewardship.",
    questions: [
          {
                "id": "q-29-1",
                "questionText": "Securing high-quality generic medical formulas at a 20% lower rate from certified drug suppliers represents an improvement in which Value for Money (VFM) dimension?",
                "options": {
                      "A": "Efficiency",
                      "B": "Effectiveness",
                      "C": "Economy",
                      "D": "Equity"
                },
                "correctOption": "C",
                "explanation": "Economy focuses on spending less: minimizing the cost of resource inputs (such as materials, staff, or leasing equipment) while maintaining appropriate grade/quality specifications."
          },
          {
                "id": "q-29-2",
                "questionText": "The metric 'Number of patients fully immunized per ₹10,000 of clinic operational spend' belongs to which category of the VFM framework?",
                "options": {
                      "A": "Input Economy indicator",
                      "B": "Input-Output Efficiency indicator",
                      "C": "Qualitative Outcome Equity indicator",
                      "D": "Ethical Impact indicator"
                },
                "correctOption": "B",
                "explanation": "Efficiency is focused on 'spending well' - measuring the relationship between input resources (₹spent or hours worked) and output volumes (number of patients treated/immunized). This indicates output productivity per unit input."
          },
          {
                "id": "q-29-3",
                "questionText": "Why does Robert Kaplan suggest shifting the Customer and Mission perspective to the top of the Balanced Scorecard for NPOs like CHH?",
                "options": {
                      "A": "Because NPOs are not allowed to receive or track financial contributions or grant donations.",
                      "B": "Because financial metrics are completely useless inside public health clinics.",
                      "C": "Because NPOs exist to serve societal missions and satisfy beneficiaries, whereas financial success is a constraint rather than the ultimate goal.",
                      "D": "Because donor organizations require detailed ex-post variance planning cost reconciliation reports."
                },
                "correctOption": "C",
                "explanation": "For an NPO, financial profit is not the destination; rather, money is an enabler. The ultimate objective is fulfilling the mission for its beneficiaries/customers. Hence, the Mission and Customer satisfaction perspectives are placed at the absolute top of the scorecard."
          }
    ]
  },

  {
    id: "case-30",
    title: "BuildCon Infrastructure: Earned Value & Integrated Capital Reports",
    chapterId: 11,
    chapterName: "Chapter 11: Preparation of Performance Reports",
    scenarioText: "BuildCon Infrastructure Limited is a major contractor specializing in public-private partnership bridge constructions. At Month 6 of a strategic bridge build, the following project financials are reported to senior board executives:\n- Planned Value (PV): ₹50 Crore (the budgeted cost of work scheduled to be completed by Month 6).\n- Earned Value (EV): ₹40 Crore (the budgeted cost of actual physical work completed by Month 6).\n- Actual Cost (AC): ₹45 Crore (the real cash expenditure spent on the physical work completed by Month 6).\n\nTo move beyond typical cost constraints, the board decides to compile an Integrated Report <IR> following the International Integrated Reporting Framework, describing how the company creates value across the Six Capitals:\n- Human Capital: Safety training, worker health indices, technical engineering credentials.\n- Manufactured Capital: Concrete mixing machinery, construction trucks, the physical bridge assets.\n- Natural Capital: Water access, local river land, air purity surrounding the construction site.\n- Social & Relationship Capital: License trust from community planning leaders, municipal compliance, and supplier relationships.",
    questions: [
          {
                "id": "q-30-1",
                "questionText": "What are BuildCon's Cost Variance (CV) and Schedule Variance (SV) at Month 6, and what do they indicate?",
                "options": {
                      "A": "CV: +5 Crore (under-budget), SV: +10 Crore (ahead of schedule)",
                      "B": "CV: -5 Crore (over-budget), SV: -10 Crore (behind schedule)",
                      "C": "CV: -5 Crore (behind schedule), SV: -10 Crore (over-budget)",
                      "D": "CV: +5 Crore (over-budget), SV: -5 Crore (delayed timelines)"
                },
                "correctOption": "B",
                "explanation": "CV = EV - AC = 40 - 45 = -5 Crore. A negative CV indicates the project is operating over-budget relative to its earned status. SV = EV - PV = 40 - 50 = -10 Crore. A negative SV indicates the project is behind schedule in terms of planned timelines."
          },
          {
                "id": "q-30-2",
                "questionText": "An annual spend of ₹50 Lakhs on safety gears, crane-operator hazard certifications, and employee wellness audits at BuildCon directly enhances which IR Capital?",
                "options": {
                      "A": "Manufactured Capital",
                      "B": "Intellectual Capital",
                      "C": "Human Capital",
                      "D": "Social and Relationship Capital"
                },
                "correctOption": "C",
                "explanation": "Human Capital consists of the competencies, capabilities, skills, health, alignment to ethical and safety standards of the company's workforce."
          },
          {
                "id": "q-30-3",
                "questionText": "Which of the following is correctly classified under 'Natural Capital' for BuildCon's bridge construction ecosystem?",
                "options": {
                      "A": "The digital design blueprints for the arch structures",
                      "B": "The concrete truck fleets and temporary steel bridge arches",
                      "C": "The riverbed ecosystem, water clean-ratings, and environmental footprint boundaries",
                      "D": "The local municipal construction guidelines and planning approvals"
                },
                "correctOption": "C",
                "explanation": "Natural capital consists of all renewable and non-renewable environmental assets and services (such as water, land, forests, air, mineral reserves) that support the company's production."
          }
    ]
  }
];
