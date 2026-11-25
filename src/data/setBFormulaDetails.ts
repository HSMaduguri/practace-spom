export interface FormulaDetail {
  context: string;
  derivation: string;
  trigger: string;
}

export const SET_B_FORMULA_DETAILS: Record<string, FormulaDetail> = {
  "Strategic Cost Gap Index (Conceptual Metric)": {
    context: "Strategic Cost Management (SCM) design stage tool.",
    derivation: "Divides the excess cost gap (Estimated Cost - Target Cost) by the Target Cost baseline. This indexes the relative scale of overrun to prioritize Value Engineering (VE) efforts across different products.",
    trigger: "Trigger VE when Index > 0. A higher index indicates severe cost overruns that threaten commercial launch."
  },
  "Customer Value-to-Cost Focus Ratio": {
    context: "Value Chain Analysis & Strategic Positioning.",
    derivation: "Divides Customer Perceived Importance of an attribute by the percentage of Total Activity Costs allocated to that attribute. Helps find matching customer value to resource usage.",
    trigger: "If Ratio < 1.0, the activity is over-engineered (costs exceed perceived value). If Ratio > 1.0, it is under-resourced."
  },
  "OEE (Overall Equipment Effectiveness)": {
    context: "Total Productive Maintenance (TPM) performance optimization.",
    derivation: "Multiplies Availability Rate (Uptime), Performance Rate (Speed), and Quality Rate (Yield). It combines all equipment losses into one unified metric.",
    trigger: "World-class manufacturer benchmark target is > 85%. Helps identify which of the 6 Major Losses requires immediate engineering focus."
  },
  "OEE Availability Rate": {
    context: "Uptime assessment and equipment breakdown tracking.",
    derivation: "Compares Actual Operating Run Time to Planned Production Time (excluding planned breaks/scheduled maintenance).",
    trigger: "Low rates indicate severe downtime losses from mechanical failure or slow setup adjustment times."
  },
  "OEE Performance (Speed) Rate": {
    context: "Speed losses, minor stops, and equipment performance degradation.",
    derivation: "Ideal Cycle Time per unit multiplied by the Total Units produced, divided by Actual Operating Run Time. Captures how close the machine ran to its theoretical design speed.",
    trigger: "Low rates indicate issues with motor wear, improper tooling feed speeds, or minor frequent jams."
  },
  "OEE Quality (Yield) Rate": {
    context: "Production precision and scrap control.",
    derivation: "Good Units Produced (First-Time-Right) divided by Total Units Entered into process.",
    trigger: "A lower rate indicates high rework costs, raw scrap, or machine calibration errors during warm-up."
  },
  "Throughput (T)": {
    context: "Theory of Constraints (TOC) short-term operations management.",
    derivation: "Sales Revenue minus Truly Variable Costs (typically strictly Direct Materials). Unlike absorption costing, standard labor and overheads are deemed operating expenses (fixed).",
    trigger: "Maximize short-term contribution (T) to recover fixed corporate Operating Expenses on constraint resources."
  },
  "Throughput Accounting (TA) Ratio": {
    context: "Syllabus standard for product viability under narrow capacity constraint bottlenecks (Goldratt's TOC).",
    derivation: "Throughput Contribution per Bottleneck Minute divided by Factory Operating Cost (Labor + Overhead) per Bottleneck Minute.",
    trigger: "Accept or prioritize products if TA Ratio > 1.0. If < 1.0, the product fails to recover its operating share of bottleneck capacity."
  },
  "Factory Cost per Bottleneck Minute/Hour": {
    context: "Constraint operations pricing and hourly factory run-rate cost.",
    derivation: "Total operating expenses of the factory (Direct labor, indirect wages, factory rent, depreciation, energy) divided by the total available bottleneck operating hours.",
    trigger: "Budget rate used as the hurdle of operating efficiency for processing through the bottleneck asset."
  },
  "Digital Platform Take Rate": {
    context: "Digital business model monetization efficiency.",
    derivation: "Platform transaction commission revenue divided by the network's Gross Merchandise Value (GMV).",
    trigger: "Typical aggregators target 10% - 25% depending on competitive moat and supplier fragmentations."
  },
  "Customer Acquisition Cost (CAC)": {
    context: "Marketing investment efficiency analysis for digital platform and SaaS subscriptions.",
    derivation: "Total sales, marketing, commissions, promotional, and onboarding expenses divided by the number of new Customers successfully acquired during that period.",
    trigger: "Used combined with CLV to evaluate if marketing acquisition channels are economically sustainable."
  },
  "Customer Lifetime Value (CLV)": {
    context: "Syllabus metric for subscriber base equity and valuation.",
    derivation: "Derived by multiplying Average Revenue per Customer (ARPU) by Gross Profit Margin %, then dividing by the customer Churn Rate %.",
    trigger: "Used to determine maximum customer acquisition budgets. High churn rates exponentially depress CLV."
  },
  "Customer Churn Rate (%)": {
    context: "Ecosystem retention and subscription health.",
    derivation: "Number of customers lost during a period divided by the starting customer base in that period, converted to a percentage.",
    trigger: "Critical performance KPI. Reducing Churn matches the leverage of acquiring several new customers."
  },
  "CLV-to-CAC Ratio (Hurdle Rate)": {
    context: "Platform economic health benchmark.",
    derivation: "Customer Lifetime Value divided by Customer Acquisition Cost. Standard indicator of unit investment returns.",
    trigger: "Sustainable platform models require a ratio of > 3.0 (or 3:1). A ratio of 1:1 indicates commercial failure."
  },
  "Target Cost": {
    context: "Proactive design-phase cost reduction and market-driven engineering.",
    derivation: "Target Market Selling Price minus Required Target Return Margin (derived from required Return on Sales or asset markup hurdles).",
    trigger: "Forces product design engineers to design out costs *before* factory tooling is set up."
  },
  "Required Profit Margin": {
    context: "Capital return requirements and investment hurdle mapping.",
    derivation: "Determined applying corporate return objectives (e.g., Target Profit Margin on Sale Price, or cost markups) to secure investor capital preservation.",
    trigger: "Derived from weighted cost of capital or segment payback expectations."
  },
  "Cost Gap": {
    context: "Variance analysis during design phases.",
    derivation: "Calculated as the Current Estimated Cost of Production minus the target allowable maximum cost limits.",
    trigger: "Must be systematically closed to zero via Value Engineering (VE) and Value Analysis (VA) before mass production begins."
  },
  "Product Lifecycle Cost per Unit": {
    context: "Whole-life asset evaluation covering design to disposal phases.",
    derivation: "Sum of Upstream Costs (R&D, design, prototyping) + Midstream Costs (operations, material) + Downstream Costs (warranty, cleanups, disposal) divided by lifetime units sold.",
    trigger: "Prevents short-sighted design choices that reduce manufacturing costs but multiply warranty or disposal expenses."
  },
  "Cost Reduction Index (CRI)": {
    context: "Commercially viable target costing index.",
    derivation: "Target Cost divided by Currently Estimated Cost of Production. Value of 1.0 represents exact hurdle achievement.",
    trigger: "If CRI < 1.0, the current design is not viable and must undergo Value Engineering."
  },
  "MFCA Positive Product Cost Allocation": {
    context: "ISO 14051 Material Flow Cost Accounting - Green manufacturing compliance.",
    derivation: "Calculates total chemical/material, system labor, and energy inputs allocated strictly to the proportion of physical weight inside salable finished products.",
    trigger: "Helps separate genuine product value-add from money spent creating waste streams."
  },
  "MFCA Negative Waste Cost Allocation": {
    context: "Green costing and material wastage transparency.",
    derivation: "Allocates a proportion of raw physical materials, system operating costs, and energy to the weight of physical scrap losses, water effluents, or emissions.",
    trigger: "Exposes the hidden cost of waste: it's not just disposal fees, but the lost purchase and processing cost of wasted inputs."
  },
  "Minimum Contract Bid Pricing Floor": {
    context: "Special non-routine contract pricing under Relevant Costing.",
    derivation: "Aggregates Incremental Out-of-Pocket Variable Costs + Specific Fixed Costs (e.g. custom tool lease) + Opportunity Cost of diverted resources.",
    trigger: "Represents the absolute economic break-even floor. Any price above this increases company profits."
  },
  "Scarce Resource Opportunity Cost per Unit": {
    context: "Operating decision under capacity constraints (labor/input shortage).",
    derivation: "Contribution margin lost from selling standard products on the open market, divided by the scarce resource units those products consume.",
    trigger: "Charged as an incremental cost to any custom job asking to use the scarce bottleneck resources."
  },
  "Price Elasticity of Demand (Ep)": {
    context: "Pricing strategy and market sensitivity analysis.",
    derivation: "Percentage change in demand quantity divided by corresponding percentage change in unit price.",
    trigger: "If |Ep| > 1, demand is elastic (price reductions grow revenue). If |Ep| < 1, demand is inelastic."
  },
  "Linear Demand Pricing Model": {
    context: "Demand curves and price setting pricing model.",
    derivation: "Price = a - bQ, where 'a' is the theoretical price when quantity requested is zero, and 'b' is the demand curve slope.",
    trigger: "Provides mathematical foundation for identifying exact pricing sweet spots for profitability."
  },
  "Slope factor of demand curve (b)": {
    context: "Quantifying demand price premium relationships.",
    derivation: "Change in Price divided by Change in Quantity demanded between two pricing options.",
    trigger: "Represents user willingness to pay relative to product quantity expansion."
  },
  "Marginal Revenue (MR) Equation": {
    context: "Economic profit maximization framework.",
    derivation: "Calculated as a - 2bQ. Found by taking the first derivative of the Total Revenue function with respect to Quantity.",
    trigger: "Used in combination with Marginal Cost (MC) models. Profit is maximized where MR = MC."
  },
  "Profit Maximizing Quantity (Q)": {
    context: "Industrial production output target.",
    derivation: "Set MR = MC and solve for Q: (a - MC) / 2b.",
    trigger: "The mathematically optimized output level that achieves peak corporate profit potential."
  },
  "Economic Value Added (EVA)": {
    context: "Value-based management aligning manager actions with shareholder value.",
    derivation: "Net Operating Profit After Tax (NOPAT) minus a capitalized Capital Charge (Capital Employed × WACC %).",
    trigger: "Promotes capital discipline. A project is wealth-creative only if EVA is positive."
  },
  "Adjusted NOPAT (Net Operating Profit After Tax)": {
    context: "Accounting adjustments required for true economic profits under Stern Stewart model.",
    derivation: "Operating profits before interest but after tax, adding back capitalized strategic intangibles like R&D, brand build, and training.",
    trigger: "Prevents managers from cutting R&D or marketing just to boost short-term earnings."
  },
  "Adjusted Capital Employed": {
    context: "Adjusting book assets for capital-based returns.",
    derivation: "Net assets (Equity + Debt) adjusted to add back capitalized R&D, brand development assets, and provision for warranties.",
    trigger: "Establishes the true asset base invested by shareholders, including key intangible investments."
  },
  "Weighted Average Cost of Capital (WACC)": {
    context: "Syllabus cost of corporate finance across debt and equity structures.",
    derivation: "Weighted average of the cost of equity (Ke) and tax-adjusted cost of debt (Kd) based on the target capital structure.",
    trigger: "Used as the absolute discount rate hurdle for capital budgeting and EVA capital charges."
  },
  "Residual Income (RI)": {
    context: "Divisional performance evaluation and anti-suboptimization metric.",
    derivation: "Divisional Operating Profit minus a cost of capital charge (Capital Employed × Corporate Hurdle Rate %).",
    trigger: "Avoids the Suboptimization trap of ROI (where managers decline profitable expansion because it lowers their average ROI)."
  },
  "Return on Investment (ROI)": {
    context: "Traditional divisional efficiency and capital yield percentage.",
    derivation: "Divisional Operating Profits divided by the Divisional Capital Employed base, converted to a percentage.",
    trigger: "Widely used but prone to Suboptimization. Managers might drop high-NPV projects if they are below current divisional ROI."
  },
  "Manufacturing Cycle Efficiency (MCE)": {
    context: "Continuous process waste tracking under Lean manufacturing.",
    derivation: "Value-Added Processing time divided by overall Manufacturing Cycle Lead Time (Process + Queue + Move + Inspect + Dwell times).",
    trigger: "For most traditional batch operations, MCE is below 10%. Continuous improvement goals aim for > 50%."
  },
  "General Minimum Transfer Price Rule (Seller Floor)": {
    context: "Internal pricing between autonomous divisions in a multi-segment group.",
    derivation: "Selling Division's out-of-pocket Variable Costs plus the Opportunity Cost of sacrificing external sales.",
    trigger: "Establishes the absolute supplier baseline that protects segment margins and divisional performance evaluation."
  },
  "Selling Division Opportunity Cost of Sacrificed Sales": {
    context: "Opportunity charge for internal resource allocations.",
    derivation: "External Retail Price minus Variable production and distribution costs, minus any Saved Logistics cost from trading internally.",
    trigger: "Quantifies exactly what corporate profit is given up on the retail market by shifting units inside."
  },
  "General Maximum Transfer Price Rule (Buyer Ceiling)": {
    context: "Buying division internal boundary condition.",
    derivation: "The lesser of: the current alternative external open market price, or the buyer's Net Marginal Revenue (NMR) on the finished product.",
    trigger: "Ensures the buying manager is never forced to import internally at a price that causes segment losses."
  },
  "Buyer Net Marginal Revenue (NMR)": {
    context: "Internal buying division maximum financial capacity assessment.",
    derivation: "Final Selling Price of finished product minus any variable costs incurred inside the buying division itself (packaging, assembly, labor).",
    trigger: "Upper economic limit on component purchase price before divisional contribution becomes negative."
  },
  "Company Consolidated Profit Net Impact": {
    context: "Group-wide financial optimization ignore transfer offsets.",
    derivation: "Finished retail revenue minus cumulative variable costs of manufacturing across all intermediate segments.",
    trigger: "Ensures corporate leadership guides overall congruence under capacity constraints."
  },
  "Material Price Variance (MPV)": {
    context: "Standard Costing standard procurement efficiency KPI.",
    derivation: "Actual Material Quantity Purchased multiplied by the rate difference: Standard Price per unit minus Actual Price per unit.",
    trigger: "Enables procurement tracking. Helpful to identify if material quality shortcuts led to downstream factory waste."
  },
  "Material Usage Variance (MUV)": {
    context: "Floor operations material conservation evaluation.",
    derivation: "Standard Unit Price multiplied by the physical variance: Standard quantity allowed for actual output minus Actual quantity used.",
    trigger: "Primary metric of scrap, spillages, and fabrication waste on the factory floor."
  },
  "Material Mix Variance (MMV)": {
    context: "Standard Costing material mix proportion analysis.",
    derivation: "Standard Price per unit multiplied by the variance: Revised standard quantity in the actual mix ratio minus Actual quantity used.",
    trigger: "Isolates savings or deficits arising purely from switching to a cheaper or more expensive ratio of raw materials."
  },
  "Material Yield Variance (MYV)": {
    context: "Recipe output yields extraction rating.",
    derivation: "Standard Unit Price multiplied by the variance: Standard input quantity allowed minus Revised standard quantity in the actual mix.",
    trigger: "Tracks chemical or conversion process yield losses when using standard mix recipes."
  },
  "Labor Efficiency Planning Variance": {
    context: "Planning vs. Operational standard adjustments.",
    derivation: "Standard Hourly Wage Rate multiplied by: Original Standard Hours minus Revised Standard Hours.",
    trigger: "Locks in and isolates uncontrollable planning shifts (e.g., changes in law or retrospective union wage rules) to keep operations feedback fair."
  },
  "Labor Efficiency Operational Variance": {
    context: "Operational labor performance of shift floor managers.",
    derivation: "Standard Hourly Wage Rate multiplied by: Revised Standard Hours allowed for actual output minus Actual hours paid.",
    trigger: "Accurate indicator of staff skill, shift pacing, and machine uptime influence on labor productivity."
  },
  "Sales Margin Mix Variance": {
    context: "Sales mix strategic market planning variance.",
    derivation: "Calculates the margin divergence that arises when products are sold in a ratio different from standard sales budget plans.",
    trigger: "Helps marketing leaders analyze if pushing certain low-margin products has cannibalized high-margin sales."
  },
  "Sales Margin Quantity Variance": {
    context: "Sales volume volume-based profit impact tracking.",
    derivation: "Measures general segment profit increases due purely to total aggregate sales volumes changes, assuming the standard mix remains constant.",
    trigger: "Standard metric highlighting marketing penetration and market share achievements."
  },
  "Fixed Overhead Standard Cost Variance": {
    context: "OAs standard absorption costing variance.",
    derivation: "Absorbed Fixed Overheads (Standard hours for actual output × FOAR) minus Actual Fixed Overheads incurred on the floor.",
    trigger: "Primary indicator of under-absorption or over-absorption of monthly factory capacity overheads."
  },
  "Fixed Overhead Expenditure Variance": {
    context: "Out-of-pocket fixed spending control.",
    derivation: "Budgeted Fixed Overheads minus Actual Fixed Overheads spent during the period.",
    trigger: "Indicates real cash overruns on rent, wages, insurance, or property taxes."
  },
  "Fixed Overhead Volume Variance": {
    context: "Under/Over absorption due to physical production volume changes.",
    derivation: "Standard FOAR multiplied by: Standard hours allowed for actual output minus Budgeted Hours.",
    trigger: "Highlights volume losses. If production falls below capacity plans, overhead costs cannot be fully absorbed."
  },
  "Fixed Overhead Capacity Variance": {
    context: "Asset utilization hours metrics.",
    derivation: "Standard FOAR multiplied by: Actual operating hours worked minus original Budgeted Hours.",
    trigger: "Tracks lost hours due to holidays, machine breakdowns, or labor shortages."
  },
  "Fixed Overhead Efficiency Variance": {
    context: "Labor efficiency impacts on overhead absorption.",
    derivation: "Standard FOAR multiplied by: Standard hours allowed for actual output minus Actual operating hours worked.",
    trigger: "Identifies whether running the plant slower or faster than standard times led to over-absorbing or under-absorbing overheads."
  },
  "Fixed Overhead Calendar Variance": {
    context: "Calendar days working variances.",
    derivation: "Standard daily rate multiplied by the difference: Actual working days run minus budgeted days.",
    trigger: "Traces overhead absorption variances caused by differences in working days during the month."
  },
  "COQ Conformance vs Non-Conformance Ratio": {
    context: "Chapter 2 PAF Cost of Quality framework.",
    derivation: "Divides COQ into Conformance (Prevention + Appraisal) and Non-Conformance (Internal + External Failures) categories to identify waste reduction opportunities.",
    trigger: "World-class organizations aim to reduce Failure costs to near-zero while optimizing Prevention and Appraisal investments."
  },
  "Total Life Cycle Costing": {
    context: "Chapter 4 life-cycle SCM calculations.",
    derivation: "Aggregates all costs incurred throughout a product's life cycle from R&D, product design, testing, manufacturing, distribution, customer sales, servicing, through to recycling/disposal.",
    trigger: "Enables long-term cost controls, ensuring that cheap product development does not lock in high warranty and disposal expenses."
  },
  "Price Elasticity of Demand (PED)": {
    context: "Chapter 6 pricing sensitivity and elasticity rules.",
    derivation: "Percentage change in quantity demanded divided by the percentage change in selling price.",
    trigger: "If |PED| > 1.0, demand is elastic. Dropping prices will increase total revenues."
  },
  "DuPont Capital Return Analysis": {
    context: "Chapter 7 divisional performance & DuPont deconstruction.",
    derivation: "Return on Investment (ROI) is deconstructed as Net Profit Margin % (operating profitability) multiplied by Asset Turnover ratio (capital velocity).",
    trigger: "Directly shows whether low returns are due to poor pricing/margins (profit margin) or sluggish asset utilization (capital turnover)."
  },
  "EVM Cost Performance Index (CPI)": {
    context: "Chapter 11 Earned Value project health controls.",
    derivation: "Earned Value (EV) divided by Actual Cost (AC) of work performed.",
    trigger: "A CPI > 1.0 is favorable (under-budget), while a CPI < 1.0 is unfavorable (over-budget)."
  },
  "EVM Schedule Performance Index (SPI)": {
    context: "Chapter 11 project timeline and speed tracking.",
    derivation: "Earned Value (EV) divided by Planned Value (PV) of work scheduled.",
    trigger: "An SPI > 1.0 is favorable (ahead of schedule), while an SPI < 1.0 is unfavorable (behind schedule)."
  },
  "EVM Project Estimate at Completion (EAC)": {
    context: "Chapter 11 project forecasting and budget-run-rate expectations.",
    derivation: "Calculates estimated ultimate cost of a project as Budget at Completion (BAC) divided by the Cost Performance Index (CPI).",
    trigger: "Allows project managers to forecast prospective budget overruns and apply immediate cost remediation actions."
  },
  "Supplying Division Opportunity Cost": {
    context: "Chapter 12 inter-divisional transfer boundary pricing.",
    derivation: "Calculated as (Displaced External Sales × Contribution per External unit) / Total Units Transferred. This represents lost retail contribution.",
    trigger: "Added to supplying divisional variable costs to determine the absolute minimum transfer pricing floor."
  },
  "Material Mix Variance": {
    context: "Chapter 13 Advanced Standard Costing proportions evaluation.",
    derivation: "Standard Unit Price multiplied by the change in input recipe: Revised Standard Quantity of inputs in actual mix proportions minus Actual quantity used.",
    trigger: "Exposes whether switching to a cheaper ingredient blend has generated favorable purchase savings."
  },
  "Material Yield Variance": {
    context: "Chapter 13 advanced materials conversion rate tracking.",
    derivation: "Standard Unit Price multiplied by: Standard input allowed for actual output minus Revised standard input quantity in standard mix proportions.",
    trigger: "Identifies whether process waste, shrinkage, scrap, or evaporation exceeded standard allowed recipes."
  },
  "Direct Labor Efficiency Variance": {
    context: "Chapter 13 operational labor speed accountability.",
    derivation: "Standard Hourly Wage Rate multiplied by: Standard hours allowed for actual output minus Actual hours worked.",
    trigger: "Evaluating floor managers' scheduling and staffing skill. Unfavorable variances indicate labor idle time, poor tooling, or training gaps."
  }
};
