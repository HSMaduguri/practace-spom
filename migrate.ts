import fs from 'fs';

// Define the 13 new SCMPE chapters
const newChapters = [
  {
    id: 1,
    name: "Chapter 1: An Introduction to Strategic Cost Management",
    description: "SCM vs. Traditional Cost Management, strategic positioning, cost driver analysis, Porter's Value Chain & Value System, and Value Shop Model.",
    summaryNotes: [
      {
        title: "Traditional Cost Management vs. Strategic Cost Management (SCM)",
        bullets: [
          "Traditional Cost Management has a short-term, reactive, and internal focus. It emphasizes strict budget containment, standard cost variance tracking, and CVP analysis assuming static cost structures.",
          "Strategic Cost Management (SCM) focuses externally on competitor behavior, market dynamics, and customer values over the long-term. It views costs as a strategic enabler of value rather than an asset to be minimized.",
          "Traditional focuses primarily on internal production, whereas SCM analyzes the entire Value Chain from raw material inputs to post-sale customer support."
        ]
      },
      {
        title: "Three Pillars of Strategic Cost Management",
        bullets: [
          "Value Chain Analysis (VCA): Deconstructs the business into strategic activities to identify cost improvement opportunities, eliminate non-value-added steps, and maximize competitive advantage.",
          "Strategic Positioning Analysis: Evaluates the firm's choice between Cost Leadership (large volumes, low unit costs, process standardizations) and Product Differentiation (premium pricing, superior features, brand loyalty).",
          "Cost Driver Analysis: Moves beyond traditional volume-based cost drivers (like labor or machine hours) to evaluate Structural drivers (scale, scope, experience, technology limits) and Executional drivers (employee involvement, total quality management, plant layouts)."
        ]
      },
      {
        title: "Michael Porter's Value Chain & Value System",
        bullets: [
          "Primary Activities: Core physical flows of product production - Inbound Logistics (receiving/storage), Operations (conversion), Outbound Logistics (distribution), Marketing & Sales, and Post-sale Customer Service.",
          "Support Activities: Organizational pillars that reinforce primary flows - Firm Infrastructure (administration, finance), Human Resource Management, Technology Development, and Procurement (raw materials sourcing).",
          "Industry Value System: A comprehensive view showing linkages between upstream supplier chains, our internal firm value chain, and downstream distributor/customer value chains to discover mutual cost-saving linkages."
        ]
      },
      {
        title: "Value Shop Model (VSM) & Service SCM",
        bullets: [
          "Value Shop Model (or Service Value Chain) conceptualized by James D. Thompson (1967) and Stabell & Fjeldstad (1998) is oriented to mobilizing resources (man, machine, money, and knowledge) to solve problems for service sector firms.",
          "Rather than focusing on creating value sequentially, the value shop focuses on resolving customer hardships cyclicly (Problem Finding & Acquisition, Problem Solving, Choice, Execution, Control, and Evaluation).",
          "Denison Organizational Culture Survey (DOCS) highlights that high scores in Adaptability, Mission, Involvement, and Consistency have a strong positive correlation with ROI, ROE, and customer satisfaction."
        ]
      }
    ],
    formulas: [
      {
        name: "Customer Value-to-Cost Focus Ratio",
        formula: "Value-to-Cost Ratio = Customer Perceived Attribute Rating / Activity Cost Contribution %",
        description: "Helps analyze if high-cost activities are generating proportional value attributes for customers."
      },
      {
        name: "Structural Span of Control Relations (Graicunas' Formula)",
        formula: "Number of Relations = [n * (n - 1)] / 2, Cross-Relations = n * (n - 1)",
        description: "Evaluates the complexity of organization design or span of control 'n' in terms of vertical reporting relations."
      }
    ]
  },
  {
    id: 2,
    name: "Chapter 2: Modern Business Environment",
    description: "Features of buyers' market, Cost of Quality (COQ) classification, Total Quality Management (TQM), Supply Chain Management, Service Level Agreements (SLA), Gain Sharing, Downsizing, and Outsourcing.",
    summaryNotes: [
      {
        title: "From a Sellers' Market to a Buyers' Market",
        bullets: [
          "The modern business environment is transitioned from a seller’s market to a buyer’s market due to globalization, fierce competition, excess capacities, and high data accessibility.",
          "The supplier no longer dictates price (replaced by target pricing), response time, or quality; instead, these are dictated by customer expectations."
        ]
      },
      {
        title: "Cost of Quality (COQ) & PAF Model",
        bullets: [
          "Created by Juran and popularized by Crosby in 'Quality Is Free', COQ splits quality-related expenditure into two major categories: Cost of Conformance and Cost of Non-Conformance.",
          "Cost of Conformance (Good Costs): (1) Prevention Costs (quality engineering, training, planning, audits, design reviews) and (2) Appraisal Costs (inspecting materials, testing, packaging inspection, outside certification).",
          "Cost of Non-Conformance (Bad Costs): (1) Internal Failure Costs (scrap, rework, re-designing, re-testing, downtime) and (2) External Failure Costs (warranty claims, recalls, returns/allowances, repairs, customer dissatisfaction, lost market share).",
          "Optimal COQ is achieved where the combined cost of conformance and non-conformance is minimized."
        ]
      },
      {
        title: "Total Quality Management (TQM) & Supply Chain Management",
        bullets: [
          "TQM is an integrated system of planning and controlling all business functions so that products or services meet or exceed customer expectations. Pillars: Commitment, Culture, Continuous Improvement, Co-operation, Customer Focus, and Control (6 Cs). Deming's 14 points specify long-term planning, eliminating inspections through perfect process quality, and implementing PDCA cycle.",
          "Supply Chain Management (SCM) unifies upstream (SRM, e-procurement, e-purchasing) and downstream (relationship marketing, CRM, customer account profitability, CLV) segments under a Push or Pull model.",
          "Gain Sharing Arrangements are collaborative agreements where a supplier performs service with no initial fee guarantee but shares in the real cost-savings generated. Service Level Agreements (SLA) govern performance metrics."
        ]
      }
    ],
    formulas: [
      {
        name: "Category COQ % Allocation",
        formula: "Category COQ (%) = (Category Cost / Total Cost of Quality) * 100",
        description: "Expresses conformance or non-conformance sub-costs as a percentage of total quality expenditure to highlight improvement priorities."
      },
      {
        name: "Customer Lifetime Value (CLV)",
        formula: "CLV = Sum of [t=1 to N] (Net Profit or Cash Flow from Customer in Year t) / (1 + r)^t",
        description: "The discounted net present value of all future cash flows expected from a customer relationship over its lifetime."
      }
    ]
  },
  {
    id: 3,
    name: "Chapter 3: Lean System and Innovation",
    description: "Operational excellence enablers: JIT, Kaizen, 5S workspace, TPM, OEE index, Cellular Manufacturing, King's algorithm, Six Sigma, and Process Innovation.",
    summaryNotes: [
      {
        title: "Lean Thinking & Seven Mudas",
        bullets: [
          "Lean manufacturing aims to maximize customer value while eliminating processing waste (Muda).",
          "The 7 Wastes (TIM WOOD) are: Transportation, Inventory, Motion, Waiting, Overproduction, Over-processing, and Defects.",
          "Just-In-Time (JIT): A pull-based production and purchasing system triggered directly by customer demand. Relies on low variety, stable demand, high supplier reliability, zero-inventory philosophy, and backflushing accounting."
        ]
      },
      {
        title: "Kaizen Costing, 5S, & Total Productive Maintenance (TPM)",
        bullets: [
          "Kaizen Costing focuses on small, continuous, incremental cost reductions at the production stage of existing products, setting weekly/monthly targets based on real workshop participation.",
          "5S System: Seiri (Sort - select needed), Seiton (Set in order - neat arrangement), Seiso (Shine - clean & inspect), Seiketsu (Standardize - maintain), and Shitsuke (Sustain - discipline & audit).",
          "TPM aims for Zero breakdowns, Zero defects, and Zero accidents. Its performance is measured primarily through the Overall Equipment Effectiveness (OEE) index, tracking 6 big equipment losses."
        ]
      },
      {
        title: "Cellular Manufacturing & Six Sigma",
        bullets: [
          "Cellular Manufacturing groups different machines into U-shaped working cells to enable a single piece flow, reducing WIP, space, and material handling costs. Part-machine groupings are optimized using Rank Order Clustering (King's Algorithm).",
          "Six Sigma is a statistical quality method aiming for only 3.4 defects per million opportunities (99.99966% accuracy).",
          "DMAIC (Define, Measure, Analyze, Improve, Control) is used for existing products/processes, whereas DMADV (Define, Measure, Analyze, Design, Verify) is used for completely new processes."
        ]
      }
    ],
    formulas: [
      {
        name: "Takt Time",
        formula: "Takt Time = Available Production Time / Total Customer Demand Volume",
        description: "The maximum time allowed to produce a unit in order to match the steady rate of customer demand. Guides factory pace."
      },
      {
        name: "Overall Equipment Effectiveness (OEE)",
        formula: "OEE (%) = Availability Rate × Performance Rate × Quality Rate",
        description: "Comprehensive efficiency metric. World-class target is 85% (Availability > 90%, Performance > 95%, Quality > 99%)."
      },
      {
        name: "OEE Availability Rate",
        formula: "Availability = (Planned Production Time - Unplanned Downtime) / Planned Production Time",
        description: "Planned production time excludes planned breaks or scheduled maintenance. Run time subtracts unplanned breakdowns."
      },
      {
        name: "OEE Performance (Speed) Rate",
        formula: "Performance = (Ideal Design Cycle Time per unit × Total Units Produced) / Actual Operating Run Time",
        description: "Compares actual running speeds against ideal manufacturer design limits."
      },
      {
        name: "OEE Quality (Yield) Rate",
        formula: "Quality = First-Time-Right Good Units Produced / Total Units Produced",
        description: "Measures quality conversion efficiency, dividing good units (excluding scrap/rework) by total produced quantity."
      },
      {
        name: "Manufacturing Cycle Efficiency (MCE)",
        formula: "MCE = Value-Added Process Time / Manufacturing Cycle Time (MCT)",
        description: "Indicates non-value-added waste in production time. MCT represents total lead-time: Processing + Inspection + Moving + Queue/Waiting time."
      }
    ]
  },
  {
    id: 4,
    name: "Chapter 4: Specialist Cost Management Techniques",
    description: "Cost Control vs. Cost Reduction, Target Costing, Life Cycle Costing, Theory of Constraints (TOC), and Environmental Management Accounting (EMA).",
    summaryNotes: [
      {
        title: "Cost Control vs. Cost Reduction",
        bullets: [
          "Cost Control focuses on setting targets, analyzing variances of actual costs against standards, and taking corrective actions. It maintains the status quo.",
          "Cost Reduction is a continuous, dynamic effort to permanently reduce the unit cost of goods or services without impairing their utility. It challenges existing standards and standard cost structures."
        ]
      },
      {
        title: "Target Costing & Life Cycle Costing",
        bullets: [
          "Target Costing is a structured approach to determining the design-stage cost at which a product must be produced to achieve a desired profit margins at an anticipated market price. Over 80% of product costs are committed during the design phase through value engineering and value analysis.",
          "Life Cycle Costing identifies and accumulates all costs and revenues of a product over its entire lifespan (from R&D and design, through manufacturing and operations, to disposal and decommissioning) rather than single accounting periods."
        ]
      },
      {
        title: "Theory of Constraints (TOC) & Environmental Management Accounting (EMA)",
        bullets: [
          "TOC focuses on maximizing profit by identifying and exploiting the single bottleneck constraint. Goldratt's 5 focusing steps prioritize the throughput rate. Throughput Accounting (TA) treats only direct material costs as variable, and all other expenses as fixed factory overheads.",
          "EMA is the collection and analysis of environmental cost information for internal decisions. UNDSD (2003) classifies methods into: Input-Output Analysis (materials balance), Flow Cost Accounting, Life Cycle Costing, and Activity Based Costing.",
          "EMA helps distinguish between Environment-related costs (directly attributed to environmental centers like water treatment plants) and Environment-driven costs (hidden in general overheads, like increased raw material waste)."
        ]
      }
    ],
    formulas: [
      {
        name: "Target Cost",
        formula: "Target Cost = Expected Market Selling Price - Desired Target Profit Margin",
        description: "Calculates the maximum allowable cost for the product design team."
      },
      {
        name: "Cost Reduction Gap",
        formula: "Target Cost Gap = Estimated Cost - Target Cost",
        description: "The amount of cost reduction required during value engineering to release a profitable product."
      },
      {
        name: "TOC Throughput (T)",
        formula: "Throughput (T) = Sales Revenue - Truly Variable Costs (typically only Direct Materials)",
        description: "The rate at which the system generates money through product sales, net of raw material costs."
      },
      {
        name: "Throughput Accounting (TA) Ratio",
        formula: "TA Ratio = (Throughput Contribution per Bottleneck Minute) / (Factory Cost per Bottleneck Minute)",
        description: "A TA Ratio greater than 1.0 indicates that the product generates margins faster than the total operating costs of the bottleneck asset."
      },
      {
        name: "Factory Cost per Bottleneck Minute",
        formula: "Factory Cost per Minute = Total Operating Expenses (Labor + Overheads) / Total Constraint Minutes Available",
        description: "Standard TOC rate for recovering fixed factory operating expenses across resource constraints."
      }
    ]
  },
  {
    id: 5,
    name: "Chapter 5: Management of Cost Strategically for Emerging Business Models",
    description: "Change drivers, digital transformation technologies, business ecosystems, hypercompetition, transformations vs. disruptions, lean start-up, and emerging business models.",
    summaryNotes: [
      {
        title: "Change Drivers & Digital Transformation",
        bullets: [
          "A dynamic business environment is shaped by change drivers such as digital technologies, business ecosystems, hypercompetition, and supply chain partnerships.",
          "Eleven key technologies for digital transformation are: IoT, Robotics, AI/Machine Learning, Cloud, Autonomous Vehicles, 3D printing (additive manufacturing), Digital Twins, Augmented Reality, Mobile Internet (5G), and Blockchain."
        ]
      },
      {
        title: "Business Ecosystems & Hypercompetition",
        bullets: [
          "A business ecosystem is a network of organizations involved in the joint delivery of a product or service through both competition and cooperation. Powered by three flywheels: Data flywheel, Growth flywheel, and Cost flywheel.",
          "Hypercompetition is characterized by intense rivalry and temporary competitive advantages. D’Aveni's 7S framework (Stakeholder satisfaction, Strategic soothsaying, Speed, Surprise, Signals, Shifting the rules, and Simultaneous thrust) guides firms to create a series of rapid short-term market disruptions."
        ]
      },
      {
        title: "Transformations, Disruptions, & Lean Start-up",
        bullets: [
          "Transformation shifts the basis of competition (e.g., UPI payments, cloud computing), whereas Disruption can be Low-end (low-cost business models starting at the bottom) or New-market (expanding the market by targeting non-users).",
          "Lean Start-up replaces traditional business plans with a hypothesis-driven loop (Build-Measure-Learn) to test scientific assumptions using a Minimum Viable Product (MVP) and the 'Five Whys' root-cause investigation.",
          "Intrapreneurship refers to encouraging entrepreneurial innovation within established organizations to counter growth stagnation."
        ]
      },
      {
        title: "Emerging Business Models",
        bullets: [
          "The Free Model: Includes Hidden Revenue/Advertising, Cross-subsidisation (Bait-and-hook/razorblade), and Open Source.",
          "The Subscription Model: Generates lock-in and predictable, recurring monthly revenues.",
          "The Freemium Model: Provides simple digital sampling with free basic tiers and premium paid upgrades.",
          "The Digital Platform/E-Commerce Model: Connects buyers and sellers (B2B, B2C, C2B, C2C) to extract platform commissions.",
          "The Hypermarket Model: Focuses on massive scale and low pricing (e.g., brick-and-mortar D-Mart or digital click models).",
          "The Access-Over-Ownership Model: Promotes collaborative asset sharing and rental networks."
        ]
      }
    ],
    formulas: [
      {
        name: "Customer Acquisition Cost (CAC)",
        formula: "CAC = Total Sales and Marketing Spend / Number of New Customers Acquired",
        description: "Measures customer acquisition cost efficiency."
      },
      {
        name: "Customer Churn Rate (%)",
        formula: "Churn Rate (%) = (Customers Lost during Period / Customers at Start of Period) * 100",
        description: "Indicates subscription business model customer defection rate."
      },
      {
        name: "Platform Take Rate (%)",
        formula: "Take Rate (%) = (Platform Commission Revenues / Gross Merchandise Value (GMV)) * 100",
        description: "Measures monetization efficiency in digital aggregator or platform models."
      }
    ]
  },
  {
    id: 6,
    name: "Chapter 6: Strategic Revenue Management",
    description: "CVP analysis, relevant costing for tactical decisions, pricing methods, pricing strategies, sensitivity analysis, and Kano's performance model.",
    summaryNotes: [
      {
        title: "Strategic CVP Analysis & Relevant Costing",
        bullets: [
          "CVP Analysis investigates interrelationships between price, variable costs, and volume. Under JIT and advanced automated environments, fixed costs are higher, and CVP must integrate non-volume cost-drivers like setup and design hours.",
          "Relevant Costing is used for short-term tactical choices (make or buy, sell or process further, minimum price, keep or drop, special orders). Relevant costs are (1) future costs that (2) differ between alternatives. Sunk costs, historical costs, and allocated arbitrary overheads are excluded."
        ]
      },
      {
        title: "Pricing Methods & Strategies for Products and Services",
        bullets: [
          "Pricing Methods: (1) Cost-Based (markup pricing, target rate of return), (2) Competition-Based (going rate pricing, sealed-bid pricing), (3) Value-Based (True Economic Value - TEV, perceived value), (4) Psychological (ending with 99).",
          "Pricing Strategies: Price customization (demographics, time differentials, volume discounts), price discrimination, predatory pricing, and peak-load pricing.",
          "Services Pricing: Must accommodate intangibility, inseparability, variability, and perishability (no storage allowed, empty seats represent pure waste)."
        ]
      },
      {
        title: "Kano's Performance Attributes",
        bullets: [
          "Kano Model prioritizes product features to optimize strategic revenue: (1) Threshold attributes (Must-be qualities - taken for granted, e.g., touchscreen), (2) Performance attributes (One-dimensional - linear satisfaction multiplier), (3) Excitement attributes (Attractive features - delight the user), (4) Indifferent attributes, and (5) Reverse attributes."
        ]
      }
    ],
    formulas: [
      {
        name: "Activity-Based CVP Break-Even Point",
        formula: "BEP (Units) = [Fixed Costs + Sum of (Cost Driver Quantity × Driver Rate)] / (Price - Unit Variable Cost)",
        description: "Incorporates non-volume cost-drivers (batches, product-sustaining) into strategic CVP break-even computations."
      },
      {
        name: "Profit Maximizing Price (Economic Model)",
        formula: "Price (P) = a - bQ, where b = Change in Price / Change in Quantity",
        description: "Linear price-demand curve mapping where profit is maximized by setting P such that Marginal Revenue (MR = a - 2bQ) equals Marginal Cost (MC)."
      },
      {
        name: "True Economic Value (TEV)",
        formula: "TEV = Cost of Next Best Alternative + Value of Performance Differential",
        description: "Value-based pricing metric comparing our product's performance advantages against competitor offerings."
      }
    ]
  },
  {
    id: 7,
    name: "Chapter 7: Strategic Profit Management",
    description: "Deconstruction of operating income variance into Growth, Price-Recovery, and Productivity components; Pareto defects analysis; ABC, ABM, and ABB.",
    summaryNotes: [
      {
        title: "Strategic Analysis of Operating Profit",
        bullets: [
          "Strategic Profit Management splits annual shifts in operating profit into three separate, isolated components: Growth, Price-Recovery, and Productivity.",
          "Growth Component: Quantifies change in operating profit caused solely by changes in quantities sold. Sales prices, input usage rates, and unit resource costs are held constant at base-year levels.",
          "Price-Recovery Component: Examines the firm's pricing power relative to industry-wide cost spikes. It assesses whether selling price increases successfully offset raw material and utility input rate inflation.",
          "Productivity Component: Measures absolute operational efficiency. It isolates direct input rate reductions (raw materials, labor hours, manufacturing overheads) achieved by producing current outputs with less resources."
        ]
      },
      {
        title: "Pareto Analysis & ABC/ABM/ABB",
        bullets: [
          "Pareto Defect Analysis: Based on Juran's 80/20 rule, it isolates the 'vital few' defect categories (20%) which generate the majority of total failure costs (80%).",
          "Activity Based Costing (ABC) provides product-costing accuracy by assigning overheads based on operational activity consumption.",
          "Direct Product Profitability (DPP) is a retail costing tool that attributes purchase cost, storage volume, and handling activity directly to individual product lines to identify profit erosion.",
          "Activity Based Management (ABM) is divided into Operational ABM (doing things right - cost reduction) and Strategic ABM (doing the right things - product selection). Activity Based Budgeting (ABB) reverses the ABC process for planning."
        ]
      }
    ],
    formulas: [
      {
        name: "Operating Profit Change Deconstruction",
        formula: "Operating Income Change = Growth impact + Price-Recovery impact + Productivity impact",
        description: "Reconciles change in profit over successive periods."
      },
      {
        name: "Revenue Impact from Growth Component",
        formula: "Revenue Growth Impact = (Current Year Sales Volume - Base Year Sales Volume) × Base Year Selling Price",
        description: "Measures profit contribution from sales volume expansion, assuming selling prices are fixed."
      },
      {
        name: "Cost Impact from Growth Component",
        formula: "Cost Growth Impact = (Input Qty required for Current Output under Base Productivity - Base Input Qty used) × Base Input Price",
        description: "Tracks estimated change in variable costs from increasing volume under historical efficiency."
      },
      {
        name: "Revenue Impact from Price-Recovery Component",
        formula: "Price-Recovery Revenue Impact = (Current Year Selling Price - Base Year Selling Price) × Current Year Sales Volume",
        description: "Measures direct sales-price-increase profits, testing market pricing power."
      },
      {
        name: "Cost Impact from Price-Recovery Component",
        formula: "Price-Recovery Cost Impact = (Current Year Input Price - Base Year Input Price) × Input Qty required for Current Year Output",
        description: "Measures rate adjustments in raw materials and labor inputs on current year output bounds."
      },
      {
        name: "Operating Productivity Component",
        formula: "Productivity Component = (Input Qty required for Current Output under Base Productivity - Actual Input Qty Used) × Current Year Input Price",
        description: "Isolates operational efficiency savings priced at current rates. Key metric for floor-level Lean controls."
      },
      {
        name: "Direct Product Profitability (DPP)",
        formula: "DPP = Selling Price - Purchase Price - Direct Product Costs (Warehouse + Transport + Retail Store)",
        description: "Deducts directly attributable product handling overheads from gross margin to find true unit profit."
      }
    ]
  },
  {
    id: 8,
    name: "Chapter 8: An Introduction to Strategic Performance Management",
    description: "Strategy alignment, McKinsey's 7S matrix, and corporate failure prediction models (Altman Z score, Beaver, Taffler & Tishaw, ZETA, and Argenti A-Score).",
    summaryNotes: [
      {
        title: "Strategic Performance & McKinsey's 7S Frame",
        bullets: [
          "An effective performance management system must be aligned with overall corporate strategy, organizational structure, and culture to prevent strategic drift and sub-optimization.",
          "McKinsey's 7S Framework maps a constellation of seven interrelated factors divided into Hard Ss (Strategy, Structure, Systems - easily quantified and managed) and Soft Ss (Style, Staff, Skills, Shared Values).",
          "There is no hierarchy in the constellation; all elements are equally important, with Shared Values (Superordinate Goals) positioned in the center, guiding organizational behavior."
        ]
      },
      {
        title: "Predicting & Preventing Corporate Failure",
        bullets: [
          "Corporate failure is a reflection of deep-seated corporate shortcomings. Performance management plays a critical role in early prediction to allow corrective turnaround strategies.",
          "Quantitative Models: Rely on financial ratios (profitability, leverage, solvency) and statistical models. Key models: Altman Z-score, Beaver's univariate model, Taffler and Tishaw's PAS, ZETA model, and H Score (Company Watch).",
          "Qualitative Models: Rely on organizational risks and signs. Argenti's A-Score splits indicators into: defects (autocratic leadership, passive board, poor accounting), mistakes (high gearing, overtrading, single failed big project), and symptoms of trouble (deteriorating ratios, low morale, creative accounting)."
        ]
      }
    ],
    formulas: [
      {
        name: "Altman Z-Score (Public Manufacturing Firms - 1968)",
        formula: "Z-Score = 1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5",
        description: "Combines five financial ratios: X1 = Working Capital/Total Assets, X2 = Retained Earnings/Total Assets, X3 = EBIT/Total Assets, X4 = Market Value of Equity/Total Liabilities, X5 = Sales/Total Assets. Safe Zone > 2.99; Grey Zone 1.81 - 2.99; Distress Zone < 1.81."
      },
      {
        name: "Altman Z-Score (Private Manufacturing Firms - 1983)",
        formula: "Z-Score = 0.717X1 + 0.847X2 + 3.107X3 + 0.420X4 + 0.998X5",
        description: "Uses Book Value of Equity for X4. Safe Zone > 2.99; Grey Zone 1.23 - 2.99; Distress Zone < 1.23."
      },
      {
        name: "Altman Z-Score (Non-Manufacturing / Emerging Markets)",
        formula: "Z-Score = 6.56X1 + 3.26X2 + 6.72X3 + 1.05X4 (for emerging, add 3.25 constant)",
        description: "Four-variable model minimizing asset turnover industry effects. Safe Zone > 2.6; Distress Zone < 1.1."
      },
      {
        name: "Taffler's PAS / Z score formula",
        formula: "Z = 3.2 + 12.18X1 + 2.50X2 - 10.68X3 + 0.029X4",
        description: "X1 = PBT/Current Assets, X2 = Current Assets/Current Liabilities, X3 = Current Liabilities/Total Assets, X4 = no credit interval. Negative indicates potential bankruptcy."
      }
    ]
  },
  {
    id: 9,
    name: "Chapter 9: Strategic Performance Measures in Private Sector",
    description: "Financial performance indicators (GP, ROCE, ROI, Residual Income, EPS, EVA, NPV), and non-financial frameworks (TBL, Balanced Scorecard, Performance Pyramid, and Building Block Model).",
    summaryNotes: [
      {
        title: "Financial Metrics & ROI Concerns",
        bullets: [
          "Traditional financial performance relies on Gross Profit margin, Return on Capital Employed (ROCE), and divisional Return on Investment (ROI).",
          "Evaluating divisional managers on the basis of ROI can discourage capital investment and lead to sub-optimization (e.g. rejecting capital projects exceeding cost of capital if they drop the division's current above-average ROI).",
          "Residual Income (RI) overcomes ROI sub-optimization by using an absolute amount of excess profit over a capital charge."
        ]
      },
      {
        title: "Economic Value Added (EVA) Adjustments",
        bullets: [
          "Developed by Stern Stewart, EVA is a measure of economic profit that accounts for both option-cost of equity and debt.",
          "EVA adjusts Accounting Profit to combat distortion: (1) Research & Development and marketing costs are capitalized rather than expensed, (2) Non-cash provisions and standard depreciation are added back and replaced with economics/cash estimates, (3) Tax paid is adjusted for tax relief on interest."
        ]
      },
      {
        title: "Non-Financial & Multidimensional Performance Frameworks",
        bullets: [
          "Triple Bottom Line (TBL): Expands accounting beyond monetary profit to measure performance across three dimensions: People (social equity), Planet (environmental impact), and Profit (economic success).",
          "Balanced Scorecard: Translates corporate strategy into four active perspectives: Financial, Customer (retention, complaints, brand), Internal Business Processes (defects, setups), and Learning and Growth (training, morale).",
          "Performance Pyramid (Cross & Lynch): Links strategy to operations across four levels: Corporate Vision, SBU Market/Finance strategy, Business Operating Systems (flexibility, quality, productivity), and shopfloor Departments (waste, cycle time).",
          "Building Block Model (Fitzgerald & Moon): Tailor-made for service sector. Dimensions: Results (Financial Performance, Competitive Performance) & Determinants (Quality, Flexibility, Innovation, Resource Utilization). Standards: Equity, Ownership, Achievability. Rewards: Motivation, Clarity, Controllability."
        ]
      }
    ],
    formulas: [
      {
        name: "Standard Return on Capital Employed (ROCE) %",
        formula: "ROCE (%) = [ Profit Before Interest and Tax (PBIT) / Average Capital Employed ] * 100",
        description: "Measures capital base productivity. Capital employed equals total assets less current liabilities."
      },
      {
        name: "Residual Income (RI)",
        formula: "RI = Controllable Profit - (Controllable divisional Net Assets × Cost of Capital / Hurdle Rate)",
        description: "Measures excess cash generated beyond minimum acceptable hurdle rates."
      },
      {
        name: "Economic Value Added (EVA)",
        formula: "EVA = Net Operating Profit After Tax (NOPAT) - (Capital Employed × WACC)",
        description: "Measures economic wealth generation. WACC is the weighted average cost of debt (adjusted for tax) and cost of equity."
      },
      {
        name: "Earnings Per Share (EPS)",
        formula: "EPS = Profit Attributable to Ordinary Shareholders / Weighted Average Number of Shares Outstanding",
        description: "Measures divisional net earnings generated per standalone equity share."
      }
    ]
  },
  {
    id: 10,
    name: "Chapter 10: Strategic Performance Measures in the Non-For-Profit Organisations",
    description: "Key characteristics of NPOs, cost-benefit trade-offs, Value for Money (VFM) framework (3Es, 5Es, and 5 elements), and the Adapted Balanced Scorecard.",
    summaryNotes: [
      {
        title: "Key Characteristics & Challenges of NPOs",
        bullets: [
          "Non-for-profit organizations (NPOs) are established to perform non-economic societal, charitable, or welfare activities.",
          "They do not prioritize shareholder wealth creation; however, they have a strict fiduciary duty of trust to demonstrate to contributors that funds are applied efficiently toward stated purposes.",
          "Challenges: Costs and benefits are difficult to quantify due to behavioral/qualitative outcomes. NPOs typically have multiple, diverse, and sometimes conflicting stakeholder objectives."
        ]
      },
      {
        title: "The Value for Money (VFM) Framework & 5Es",
        bullets: [
          "The VFM framework establishes a measurable link between resources spent and the purpose attained. Based on 3Es: Economy (spend less - are inputs obtained at lowest cost?), Efficiency (spend well - is maximum output achieved per input?), and Effectiveness (spend wisely - are desired objectives met?).",
          "Modern VFM adds two more Es: Equity (spend fairly) and Ethics (spend properly).",
          "VFM relies on 5 core elements to be tracked properly: Input (resources), Process (operations), Output (direct quantities), Outcome (specific results), and Impact (long-term societal benefits)."
        ]
      },
      {
        title: "Adapted Balanced Scorecard by Kaplan",
        bullets: [
          "In 2001, Robert Kaplan suggested an Adapted Balanced Scorecard for NPOs.",
          "Since financial success is not the primary objective, the positioning of perspectives is switched: the mission statement is placed at the very top, and the Customer Perspective (satisfaction of beneficiaries) is prioritized over the Financial Perspective (fundraising and redistribution)."
        ]
      }
    ],
    formulas: [
      {
        name: "NPO Efficiency Ratio (Process KPI)",
        formula: "Efficiency (%) = (Standard Input Resources Allowed for Actual Output / Actual Input Resources Used) * 100",
        description: "Indicates how well NPO inputs are converted into output service quantities."
      },
      {
        name: "VFM Capacity Utilization Index",
        formula: "Vacancy Rent Lost Ratio (%) = (Rent Lost on Unoccupied properties / Total Gross Potential Rent) * 100",
        description: "Tracks opportunity costs of unused public assets/service capacities to evaluate operational economy."
      }
    ]
  },
  {
    id: 11,
    name: "Chapter 11: Preparation of Performance Reports",
    description: "Role of reports in responsibility accounting, steps of preparation, types of reports (Earned Value, Forecasting, Status, Trend, Variance), and external frameworks (TBL, GRI, ESG, and IR).",
    summaryNotes: [
      {
        title: "Responsibility Accounting & Reporting Steps",
        bullets: [
          "Responsibility accounting assigns collection and reporting of cost and revenue data directly to individual managers held accountable for them.",
          "A performance report compares actual outcomes against budgets/standards, starting from the bottom up to inform managers of deviations.",
          "Six steps of preparation: (1) Understand user need, (2) Establish objectives in light of mission, (3) Add an Executive Summary, (4) Place actual performance assessment, (5) Refine layout with visual elements, (6) Cross-check details."
        ]
      },
      {
        title: "Types of Reports & Sustainability Frameworks",
        bullets: [
          "Common Report Types: Earned Value Report (scope, schedule, and cost integration), Forecasting Report, Progress Report, Status Report (snapshot of current time, cost, quality), Trend Report (peer time-series), and Variance Report.",
          "External reporting frameworks move beyond financial statements: (1) Triple Bottom Line (TBL), (2) Global Reporting Initiative (GRI - globally accepted sustainability standards), (3) ESG reporting (environmental, social, and governance disclosures), (4) Integrated Reporting (IR - concise value-creation message)."
        ]
      },
      {
        title: "The Six Capitals of Integrated Reporting <IR>",
        bullets: [
          "Value is created through capital inputs. The <IR> framework recognizes 6 categories of capital: (1) Financial, (2) Manufactured (physical assets), (3) Intellectual (knowledge, software, patents), (4) Human (staff skills, ethics), (5) Social & Relationship (brand trust, client relationships), and (6) Natural (environment resources, land, water)."
        ]
      }
    ],
    formulas: [
      {
        name: "EVM Cost Variance (CV)",
        formula: "Cost Variance (CV) = Earned Value (EV) - Actual Cost (AC)",
        description: "Standard reporting variance. Negative indicates that the project is operating over-budget."
      },
      {
        name: "EVM Schedule Variance (SV)",
        formula: "Schedule Variance (SV) = Earned Value (EV) - Planned Value (PV)",
        description: "Measures project scheduling deviations in financial terms. Negative indicates timeline delays."
      }
    ]
  },
  {
    id: 12,
    name: "Chapter 12: Divisional Transfer Pricing",
    description: "Decentralized divisions, goal congruence, transfer pricing methods, minimum/maximum bounds, divisional conflicts (Dual rate vs. Two-part pricing), and international taxation.",
    summaryNotes: [
      {
        title: "Goal Congruence & Transfer Pricing Utilities",
        bullets: [
          "Transfer pricing is the value assigned to inter-divisional transfers of goods, services, or assets.",
          "Decentralized firms delegate decision-making to divisional managers. Goal Congruence is achieved when managers, taking actions in their own self-interest, also make decisions that maximize company-wide profitability.",
          "Utilities of TP: Performance evaluation (profit center accountability), resource allocation, employee motivation, tax minimization, and capital repatriation."
        ]
      },
      {
        title: "Minimum and Maximum Transfer Prices",
        bullets: [
          "Minimum Transfer Price (Supplying Division's Floor): Additional Outlay Cost per unit + Opportunity Cost per unit (the lost contribution margin of external retail sales that must be curtailed to accommodate the transfer). If excess capacity exists, opportunity cost is zero.",
          "Maximum Transfer Price (Purchasing Division's Ceiling): Lower of Net Marginal Revenue (final selling price minus further processing costs) and the external market buy-in price."
        ]
      },
      {
        title: "Divisional Conflicts & Resolution Systems",
        bullets: [
          "Divisional conflicts occur when transfer prices that achieve company-wide goal congruence result in a paper loss for one of the divisions, demotivating managers.",
          "Dual Rate transfer pricing: The Supplying Division is credited with full cost plus a normal profit margin (satisfying performance evaluation), while the Receiving Division is charged only marginal cost (inducing optimal volume decisions). Profits are reconciled at consolidation.",
          "Two-Part transfer pricing: Transfers are made at supplying marginal cost per unit sold plus a lump-sum fixed fee representing the capacity reserved, preventing marginal cost inflation."
        ]
      },
      {
        title: "International Transfer Pricing & Taxes",
        bullets: [
          "MNCs use transfer pricing strategically to reduce global tax impacts. High-tax countries are charged lower incoming transfer prices (or higher outgoing ones) to shift profits to lower-tax jurisdictions.",
          "Tax authorities regulate avoidance via arm's length price enforcement (regulated by Section 92A to 92F of Indian Income Tax Act, 1961)."
        ]
      }
    ],
    formulas: [
      {
        name: "Minimum Transfer Price Formula",
        formula: "Minimum TP = Variable Cost per unit + [ (Retail Units Displaced × Unit Retail Margin) / Total Units Transferred ]",
        description: "Establishes the absolute cost-recovery floor under restricted capacity settings."
      },
      {
        name: "Maximum Transfer Price Formula",
        formula: "Maximum TP = Lower of (External Buy-in Price, Net Marginal Revenue)",
        description: "The ceiling pricing range ensuring receiving division does not face paper operations deficits."
      },
      {
        name: "Divisional Profit Split Ratio",
        formula: "Allocable Profit Share (%) = (Divisional Costs Incurred / Total Combined Costs) * 100",
        description: "Distributes final combined product profits back to divisions based on relative value addition (cost contribution)."
      }
    ]
  },
  {
    id: 13,
    name: "Chapter 13: Standard Costing",
    description: "Advanced variances, Planning vs. Operational variances, ABC-based variances, relevant cost approach, learning curves, and sales mix/quantity and market size/share variances.",
    summaryNotes: [
      {
        title: "Planning (Revision) vs. Operational Variances",
        bullets: [
          "In volatile business environments, traditional standard cost variances are inadequate because standards become outdated quickly.",
          "Advanced variance analysis splits traditional variances into: (1) Planning Variances (uncontrollable, compared revised standard to original standard) and (2) Operational Variances (controllable, compares actual results to the revised ex-post standard).",
          "Separation ensures managers are evaluated only on controllable operational realities (e.g. negotiation price savings) rather than uncontrollable planning errors or market movements (e.g. inflation)."
        ]
      },
      {
        title: "Advanced Variances in ABC & Standard marginal costing",
        bullets: [
          "Activity-Based Costing (ABC) Variances: Splits overhead variances into (1) Expenditure variance (paying more or less than standard for actual activities) and (2) Efficiency variance (the cost impact of undertaking more or less activity runs than standard).",
          "Under standard marginal costing, there is no fixed overhead volume variance (as fixed costs are treated as period costs). Only fixed overhead expenditure variance is calculated.",
          "Standard costing applies differently in service industries due to high overhead compositions, often utilizing McDonaldization (breaking processes into basic, standardized steps)."
        ]
      },
      {
        title: "Advanced Sales, Mix, and Market Variances",
        bullets: [
          "Sales Volume Variance is sub-divided into: (1) Sales Mix Variance (actual quantity sold in actual mix vs. budgeted mix) and (2) Sales Quantity Variance (budgeted mix vs. actual quantity in budgeted mix).",
          "Sales Quantity variance can be further split into: (1) Market Size Variance (changes in general industry demand) and (2) Market Share Variance (changes in our specific market share %)."
        ]
      }
    ],
    formulas: [
      {
        name: "Direct Material Planning Variance",
        formula: "Planning Price Variance = (Original Standard Price - Revised Standard Price) × Revised Standard Quantity",
        description: "Measures change in required standard costs due to external market revisions."
      },
      {
        name: "Direct Material Operational Variance",
        formula: "Operational Price Variance = (Revised Standard Price - Actual Price) × Actual Quantity Purchased",
        description: "Controllable price variance evaluating purchasing department performance."
      },
      {
        name: "ABC Overhead Efficiency Variance",
        formula: "ABC Efficiency = (Standard allowed Cost Driver Units - Actual Cost Driver Units Used) × Standard Rate per Driver",
        description: "Quantifies the profit/cost impact of activity rate efficiency."
      },
      {
        name: "Sales Contribution Mix Variance",
        formula: "Sales Mix Variance = (Actual Qty in actual mix - Actual Qty in budgeted mix) × Standard Contribution per unit",
        description: "Measures impact on profits from shifting relative quantities of products sold."
      },
      {
        name: "Sales Contribution Quantity Variance",
        formula: "Sales Quantity Variance = (Actual Qty in budgeted mix - Budgeted Qty) × Standard Contribution per unit",
        description: "Measures the impact on profits of changes in absolute sales volumes sold."
      },
      {
        name: "Sales Market Size Variance",
        formula: "Market Size Variance = Budgeted Market Share % × (Actual Industry Sales Qty - Budgeted Industry Sales Qty) × Average Standard Contribution",
        description: "Isolates profit fluctuations due to growth or contraction of the overall market."
      },
      {
        name: "Sales Market Share Variance",
        formula: "Market Share Variance = (Actual Market Share % - Budgeted Market Share %) × Actual Industry Sales Qty × Average Standard Contribution",
        description: "Measures profit changes caused by gaining or losing competitive market share."
      }
    ]
  }
];

// Define case scenarios remapping config
const caseMapping: Record<string, { id: number; name: string }> = {
  "case-01": { id: 1, name: "Chapter 1: An Introduction to Strategic Cost Management" },
  "case-02": { id: 3, name: "Chapter 3: Lean System and Innovation" },
  "case-03": { id: 3, name: "Chapter 3: Lean System and Innovation" },
  "case-04": { id: 7, name: "Chapter 7: Strategic Profit Management" },
  "case-05": { id: 5, name: "Chapter 5: Management of Cost Strategically for Emerging Business Models" },
  "case-06": { id: 4, name: "Chapter 4: Specialist Cost Management Techniques" },
  "case-07": { id: 6, name: "Chapter 6: Strategic Revenue Management" },
  "case-08": { id: 9, name: "Chapter 9: Strategic Performance Measures in Private Sector" },
  "case-09": { id: 7, name: "Chapter 7: Strategic Profit Management" },
  "case-10": { id: 12, name: "Chapter 12: Divisional Transfer Pricing" },
  "case-11": { id: 13, name: "Chapter 13: Standard Costing" },
  "case-12": { id: 12, name: "Chapter 12: Divisional Transfer Pricing" },
  "case-13": { id: 13, name: "Chapter 13: Standard Costing" },
  "case-14": { id: 9, name: "Chapter 9: Strategic Performance Measures in Private Sector" },
  "case-15": { id: 13, name: "Chapter 13: Standard Costing" },
  "case-16": { id: 13, name: "Chapter 13: Standard Costing" },
  "case-17": { id: 3, name: "Chapter 3: Lean System and Innovation" },
  "case-18": { id: 3, name: "Chapter 3: Lean System and Innovation" },
  "case-19": { id: 5, name: "Chapter 5: Management of Cost Strategically for Emerging Business Models" },
  "case-20": { id: 3, name: "Chapter 3: Lean System and Innovation" },
  "case-21": { id: 1, name: "Chapter 1: An Introduction to Strategic Cost Management" },
  "case-22": { id: 1, name: "Chapter 1: An Introduction to Strategic Cost Management" },
  "case-23": { id: 4, name: "Chapter 4: Specialist Cost Management Techniques" },
  "case-24": { id: 4, name: "Chapter 4: Specialist Cost Management Techniques" },
  "case-25": { id: 12, name: "Chapter 12: Divisional Transfer Pricing" },
  "case-26": { id: 12, name: "Chapter 12: Divisional Transfer Pricing" }
};

// 1. PERFORM MIGRATION FOR scenariosData.ts
let scenariosContent = fs.readFileSync('src/scenariosData.ts', 'utf-8');

// Replace standard chapters array
const chaptersStartMark = 'export const chapters: Chapter[] = [';
const chaptersEndMark = 'export const caseScenarios: CaseScenario[] = [';

const startIdx = scenariosContent.indexOf(chaptersStartMark);
const endIdx = scenariosContent.indexOf(chaptersEndMark);

if (startIdx !== -1 && endIdx !== -1) {
  const replacementText = `export const chapters: Chapter[] = ${JSON.stringify(newChapters, null, 2)};\n\n`;
  scenariosContent = scenariosContent.substring(0, startIdx) + replacementText + scenariosContent.substring(endIdx);
  console.log("Successfully replaced the chapters array in scenariosData.ts!");
} else {
  console.error("Failed to find chapters or caseScenarios boundaries in scenariosData.ts");
  process.exit(1);
}

// Map the individual case scenarios
// Find blocks inside caseScenarios array and adjust chapterId / chapterName
const casePatterns = /id:\s*"case-(\d+)"/g;
let match;
while ((match = casePatterns.exec(scenariosContent)) !== null) {
  const fullCaseId = `case-${match[1]}`;
  const mapped = caseMapping[fullCaseId];
  if (mapped) {
    // Find the surrounding block for this case and replace its specific chapterId and chapterName
    const idIndex = match.index;
    const blockText = scenariosContent.substring(idIndex, idIndex + 400); // look ahead 400 chars
    
    // Replace chapterId
    const currentChapterIdMatch = blockText.match(/chapterId:\s*\d+/);
    if (currentChapterIdMatch) {
      scenariosContent = scenariosContent.replace(
        scenariosContent.substring(idIndex, idIndex + 400),
        scenariosContent.substring(idIndex, idIndex + 400)
          .replace(/chapterId:\s*\d+/, `chapterId: ${mapped.id}`)
          .replace(/chapterName:\s*"[^"\n]+"/, `chapterName: "${mapped.name}"`)
          .replace(/chapterName:\s*'[^'\n]+'/, `chapterName: "${mapped.name}"`)
      );
    }
  }
}
fs.writeFileSync('src/scenariosData.ts', scenariosContent, 'utf-8');
console.log("Successfully updated all case scenarios' chapterId/chapterName in scenariosData.ts!");

// 2. PERFORM MIGRATION FOR generalMCQs.ts
let mcqsContent = fs.readFileSync('src/generalMCQs.ts', 'utf-8');

function getNewChapterId(oldId: number, topic: string): number {
  if (oldId === 1) return 1;
  if (oldId === 2) {
    const t = (topic || "").toLowerCase();
    if (t.includes("quality") || t.includes("coq") || t.includes("tqm") || t.includes("deming") || t.includes("supply chain") || t.includes("outsourcing") || t.includes("offshoring") || t.includes("downsizing") || t.includes("gain") || t.includes("relation")) {
      return 2;
    }
    return 3; // JIT, 5S, TPM, OEE, Cellular, etc.
  }
  if (oldId === 3) {
    const t = (topic || "").toLowerCase();
    if (t.includes("lean") || t.includes("six sigma") || t.includes("5s")) {
      return 3;
    }
    return 5; // Emerging business models, aggregator, subscription, etc.
  }
  if (oldId === 4) return 4; // Specialist cost management
  if (oldId === 5) return 6; // Revenue management (Pricing, Relevant Costing, learning curve)
  if (oldId === 6) {
    const t = (topic || "").toLowerCase();
    if (t.includes("pareto")) return 7; // Strategic Profit Management
    if (t.includes("argenti") || t.includes("failure") || t.includes("z-score")) return 8; // Performance Management Intro
    if (t.includes("value for money") || t.includes("vfm") || t.includes("npo") || t.includes("non-profit")) return 10; // NPOs
    if (t.includes("report") || t.includes("accounting") || t.includes("gri") || t.includes("esg") || t.includes("integrated")) return 11; // Preparation of Reports
    return 9; // Private sector performance (Balanced Scorecard, Building Block, Performance Pyramid, TBL)
  }
  if (oldId === 7) return 12; // Transfer pricing
  if (oldId === 8) return 13; // Standard costing
  if (oldId === 9) return 6; // Revenue management (Yield management, overbooking)
  if (oldId === 10) {
    const t = (topic || "").toLowerCase();
    if (t.includes("dupont") || t.includes("return") || t.includes("roce") || t.includes("roi") || t.includes("eva")) return 9; // Private sector performance
    return 7; // Operating income variance (Strategic Profit Management)
  }
  return oldId;
}

// We can read each GMCQ block inside generalMCQs array and adjust chapterId
const mcqPatterns = /id:\s*"gmcq-(\d+)-(\d+)"/g;
let m;
while ((m = mcqPatterns.exec(mcqsContent)) !== null) {
  const originalChapterId = parseInt(m[1], 10);
  const qIndex = m.index;
  const blockText = mcqsContent.substring(qIndex, qIndex + 400); // look ahead 400 chars
  
  // Extract topic
  const topicMatch = blockText.match(/topic:\s*"([^"\n]+)"/);
  const topic = topicMatch ? topicMatch[1] : "";
  
  const newChapterId = getNewChapterId(originalChapterId, topic);
  
  // Replace chapterId within the block
  mcqsContent = mcqsContent.replace(
    mcqsContent.substring(qIndex, qIndex + 400),
    mcqsContent.substring(qIndex, qIndex + 400)
      .replace(/chapterId:\s*\d+/, `chapterId: ${newChapterId}`)
  );
}

fs.writeFileSync('src/generalMCQs.ts', mcqsContent, 'utf-8');
console.log("Successfully migrated all general MCQs' chapterIds in generalMCQs.ts!");
