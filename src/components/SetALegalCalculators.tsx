import { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw, Calculator, FileCheck } from 'lucide-react';

export default function SetALegalCalculators() {
  const [activeCalc, setActiveCalc] = useState<'csr' | 'board' | 'remuneration' | 'cirp'>('csr');

  // Calculator 1: CSR Applicability & Spend (Sec 135)
  const [csrParams, setCsrParams] = useState({
    netWorth: 450, // in Crores
    turnover: 950, // in Crores
    netProfit: 6.5, // in Crores (current FY)
    avgProfits3Yrs: 7.2 // in Crores
  });

  // Calculator 2: Board & Committee Composition (Sec 149 & 177)
  const [boardParams, setBoardParams] = useState({
    isListed: false,
    paidUpCapital: 12, // in Crores
    turnover: 110, // in Crores
    borrowings: 55, // in Crores
    totalDirectors: 8
  });

  // Calculator 3: Managerial Remuneration Ceilings (Sec 197)
  const [remParams, setRemParams] = useState({
    netProfitSec198: 25, // in Crores
    numMDs: 1,
    hasNEDs: true,
    proposedMDRemuneration: 1.4, // in Crores
    proposedNEDRemuneration: 0.2 // in Crores
  });

  // Calculator 4: IBC CIRP Default & Timeline (Sec 4 & 12)
  const [cirpParams, setCirpParams] = useState({
    defaultAmountLakhs: 120, // in Lakhs
    daysElapsed: 140,
    cocVoteForExtension: 70 // %
  });

  // Parse helper
  const num = (v: any) => {
    const val = parseFloat(v);
    return isNaN(val) ? 0 : val;
  };

  // Calculation 1: CSR
  const calcCSR = () => {
    const nw = num(csrParams.netWorth);
    const to = num(csrParams.turnover);
    const np = num(csrParams.netProfit);
    const avgP = num(csrParams.avgProfits3Yrs);

    const nwTrigger = nw >= 500;
    const toTrigger = to >= 1000;
    const npTrigger = np >= 5;
    const isApplicable = nwTrigger || toTrigger || npTrigger;

    const mandatorySpend = isApplicable ? Math.max(0, avgP * 0.02) : 0;
    const mandatorySpendLakhs = mandatorySpend * 100;

    return {
      nwTrigger,
      toTrigger,
      npTrigger,
      isApplicable,
      mandatorySpendCrores: mandatorySpend,
      mandatorySpendLakhs: mandatorySpendLakhs
    };
  };

  // Calculation 2: Board Composition
  const calcBoard = () => {
    const listed = boardParams.isListed;
    const cap = num(boardParams.paidUpCapital);
    const to = num(boardParams.turnover);
    const bor = num(boardParams.borrowings);
    const total = num(boardParams.totalDirectors);

    // Woman Director (Rule 3)
    const womanReq = listed || cap >= 100 || to >= 300;

    // Independent Directors (Rule 4 / Sec 149(4))
    let idReqCount = 0;
    let idApplicable = false;
    let idReason = "";

    if (listed) {
      idApplicable = true;
      idReqCount = Math.ceil(total / 3);
      idReason = "Listed Entity (At least 1/3rd of total Board strength under Sec 149(4) / SEBI LODR)";
    } else {
      const capHurdle = cap >= 10;
      const toHurdle = to >= 100;
      const borHurdle = bor > 50; // Note: Strictly > 50
      idApplicable = capHurdle || toHurdle || borHurdle;
      idReqCount = idApplicable ? 2 : 0;
      idReason = idApplicable 
        ? `Unlisted Public Meeting Thresholds (Capital: ${capHurdle ? '>=10' : 'No'}, Turnover: ${toHurdle ? '>=100' : 'No'}, Borrowings: ${borHurdle ? '>50' : 'No'})`
        : "Unlisted public company below all Rule 4 thresholds";
    }

    // Audit Committee (Sec 177)
    const auditCommReq = listed || cap >= 10 || to >= 100 || bor > 50;

    return {
      womanReq,
      idApplicable,
      idReqCount,
      idReason,
      auditCommReq
    };
  };

  // Calculation 3: Managerial Remuneration
  const calcRemuneration = () => {
    const np = num(remParams.netProfitSec198);
    const mds = num(remParams.numMDs);
    const hasN = remParams.hasNEDs;
    const propMD = num(remParams.proposedMDRemuneration);
    const propNED = num(remParams.proposedNEDRemuneration);

    // Caps
    const overallCap = np * 0.11;
    const mdPct = mds <= 1 ? 0.05 : 0.10;
    const mdCap = np * mdPct;
    const nedPct = mds > 0 ? 0.01 : 0.03;
    const nedCap = hasN ? (np * nedPct) : 0;

    const totalProposed = propMD + propNED;
    const isOverallCompliant = totalProposed <= overallCap;
    const isMDCompliant = propMD <= mdCap;
    const isNEDCompliant = propNED <= nedCap;

    return {
      overallCap,
      mdCap,
      mdPct: mdPct * 100,
      nedCap,
      nedPct: nedPct * 100,
      totalProposed,
      isOverallCompliant,
      isMDCompliant,
      isNEDCompliant
    };
  };

  // Calculation 4: IBC CIRP
  const calcCIRP = () => {
    const defLakhs = num(cirpParams.defaultAmountLakhs);
    const days = num(cirpParams.daysElapsed);
    const cocVote = num(cirpParams.cocVoteForExtension);

    const isThresholdMet = defLakhs >= 100; // >= 1 Crore
    const isBasePeriodActive = days <= 180;
    const isExtendedPeriodActive = days > 180 && days <= 270;
    const isBeyondOuterCap = days > 330;
    const cocExtensionApproved = cocVote >= 66;

    let status = "";
    let statusColor = "emerald";

    if (!isThresholdMet) {
      status = "Application Defective (Default is under Rs. 1 Crore threshold of Sec 4)";
      statusColor = "rose";
    } else if (days <= 180) {
      status = `Standard Initial CIRP Window (${180 - days} days remaining out of base 180 days)`;
      statusColor = "emerald";
    } else if (days <= 270) {
      if (cocExtensionApproved) {
        status = `Authorized Extended Window (${270 - days} days remaining of 90-day extension)`;
        statusColor = "sky";
      } else {
        status = "Extension Unauthorized (CoC vote under 66% required by Sec 12(2))";
        statusColor = "amber";
      }
    } else if (days <= 330) {
      status = `Discretionary / Litigation Window (${330 - days} days to mandatory Day 330 deadline)`;
      statusColor = "amber";
    } else {
      status = "CIRP Mandatorily Lapsed (Exceeded 330 days - Section 33 Liquidation mandatory)";
      statusColor = "rose";
    }

    return {
      isThresholdMet,
      status,
      statusColor,
      isBeyondOuterCap,
      cocExtensionApproved
    };
  };

  const csrRes = calcCSR();
  const boardRes = calcBoard();
  const remRes = calcRemuneration();
  const cirpRes = calcCIRP();

  return (
    <div className="space-y-6">
      {/* Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'csr', label: '1. CSR Applicability & Spend (Sec 135)' },
          { id: 'board', label: '2. Board Composition & Quotas (Sec 149)' },
          { id: 'remuneration', label: '3. Managerial Remuneration (Sec 197)' },
          { id: 'cirp', label: '4. IBC CIRP Default & Timeline (Sec 4 & 12)' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveCalc(t.id as any)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCalc === t.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CALCULATOR 1: CSR */}
      {activeCalc === 'csr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Scale size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Corporate Social Responsibility Parameters
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Net Worth (Rs. Crore)
                </label>
                <input
                  type="number"
                  value={csrParams.netWorth}
                  onChange={e => setCsrParams({ ...csrParams, netWorth: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Statutory threshold: &ge; Rs. 500 Crore</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Turnover (Rs. Crore)
                </label>
                <input
                  type="number"
                  value={csrParams.turnover}
                  onChange={e => setCsrParams({ ...csrParams, turnover: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Statutory threshold: &ge; Rs. 1,000 Crore</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Net Profit in Current FY (Rs. Crore)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={csrParams.netProfit}
                  onChange={e => setCsrParams({ ...csrParams, netProfit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Statutory threshold: &ge; Rs. 5 Crore</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Average Net Profit of Immediately Preceding 3 FYs (Rs. Crore)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={csrParams.avgProfits3Yrs}
                  onChange={e => setCsrParams({ ...csrParams, avgProfits3Yrs: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Basis for 2% mandatory spend</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Statutory Audit Verdict (Section 135)
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                csrRes.isApplicable ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700'
              }`}>
                {csrRes.isApplicable ? 'CSR Mandatorily Applicable' : 'CSR Not Applicable'}
              </span>
            </div>

            {/* Threshold Triad */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className={`p-3 rounded-lg border ${csrRes.nwTrigger ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'}`}>
                <div className="text-[10px] font-medium text-slate-500 uppercase">Net Worth</div>
                <div className="text-sm font-black font-mono mt-1 text-slate-900 dark:text-slate-100">Rs. {csrParams.netWorth} Cr</div>
                <div className={`text-[10px] font-bold mt-1 ${csrRes.nwTrigger ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                  {csrRes.nwTrigger ? 'Hurdle Met (>=500)' : 'Below 500 Cr'}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${csrRes.toTrigger ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'}`}>
                <div className="text-[10px] font-medium text-slate-500 uppercase">Turnover</div>
                <div className="text-sm font-black font-mono mt-1 text-slate-900 dark:text-slate-100">Rs. {csrParams.turnover} Cr</div>
                <div className={`text-[10px] font-bold mt-1 ${csrRes.toTrigger ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                  {csrRes.toTrigger ? 'Hurdle Met (>=1000)' : 'Below 1000 Cr'}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${csrRes.npTrigger ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'}`}>
                <div className="text-[10px] font-medium text-slate-500 uppercase">Net Profit</div>
                <div className="text-sm font-black font-mono mt-1 text-slate-900 dark:text-slate-100">Rs. {csrParams.netProfit} Cr</div>
                <div className={`text-[10px] font-bold mt-1 ${csrRes.npTrigger ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                  {csrRes.npTrigger ? 'Hurdle Met (>=5)' : 'Below 5 Cr'}
                </div>
              </div>
            </div>

            {/* Minimum Spend Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Mandatory 2% CSR Spend Requirement:</span>
                <span className="text-sm font-mono font-black text-blue-600 dark:text-blue-400">
                  Rs. {csrRes.mandatorySpendCrores.toFixed(3)} Crore ({csrRes.mandatorySpendLakhs.toFixed(1)} Lakhs)
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Calculated as 2% of Rs. {csrParams.avgProfits3Yrs} Crore average net profits. If the company fails to spend this amount, unspent amounts not relating to ongoing projects must be transferred to a Fund specified in Schedule VII within 6 months of FY close.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: BOARD COMPOSITION */}
      {activeCalc === 'board' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <FileCheck size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Company Structure & Capital Attributes
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-medium text-slate-700 dark:text-slate-300">Listed on Recognized Stock Exchange?</span>
                <input
                  type="checkbox"
                  checked={boardParams.isListed}
                  onChange={e => setBoardParams({ ...boardParams, isListed: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Paid-up Share Capital (Rs. Crore)
                </label>
                <input
                  type="number"
                  value={boardParams.paidUpCapital}
                  onChange={e => setBoardParams({ ...boardParams, paidUpCapital: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">ID Hurdle: &ge; 10 Cr | Woman Dir: &ge; 100 Cr</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Annual Turnover (Rs. Crore)
                </label>
                <input
                  type="number"
                  value={boardParams.turnover}
                  onChange={e => setBoardParams({ ...boardParams, turnover: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">ID Hurdle: &ge; 100 Cr | Woman Dir: &ge; 300 Cr</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Aggregate Borrowings, Loans, Debentures & Deposits (Rs. Crore)
                </label>
                <input
                  type="number"
                  value={boardParams.borrowings}
                  onChange={e => setBoardParams({ ...boardParams, borrowings: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">ID Hurdle: strictly &gt; 50 Cr</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Total Board Strength (Count of Directors)
                </label>
                <input
                  type="number"
                  value={boardParams.totalDirectors}
                  onChange={e => setBoardParams({ ...boardParams, totalDirectors: parseInt(e.target.value) || 3 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
              Mandatory Governance Quotas
            </h3>

            <div className="space-y-3">
              {/* Woman Director */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">1. Woman Director (Sec 149(1) & Rule 3)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {boardRes.womanReq ? 'Mandatory at least 1 Woman Director' : 'Exempt (Below 100 Cr capital and 300 Cr turnover)'}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  boardRes.womanReq ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {boardRes.womanReq ? 'REQUIRED' : 'NOT REQUIRED'}
                </span>
              </div>

              {/* Independent Directors */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">2. Independent Directors (Sec 149(4) & Rule 4)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{boardRes.idReason}</div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    boardRes.idApplicable ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {boardRes.idApplicable ? `MIN ${boardRes.idReqCount} ID` : 'NOT REQUIRED'}
                  </span>
                </div>
              </div>

              {/* Audit Committee */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start justify-between bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">3. Audit Committee (Sec 177)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {boardRes.auditCommReq ? 'Mandatory min 3 directors (IDs forming majority)' : 'Not statutorily required'}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  boardRes.auditCommReq ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {boardRes.auditCommReq ? 'MANDATORY' : 'EXEMPT'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 3: MANAGERIAL REMUNERATION */}
      {activeCalc === 'remuneration' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Calculator size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Section 198 Net Profits & Proposed Payout
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Net Profits under Section 198 (Rs. Crore)
                </label>
                <input
                  type="number"
                  value={remParams.netProfitSec198}
                  onChange={e => setRemParams({ ...remParams, netProfitSec198: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Number of Managing / Whole-Time Directors
                </label>
                <select
                  value={remParams.numMDs}
                  onChange={e => setRemParams({ ...remParams, numMDs: parseInt(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold"
                >
                  <option value={1}>1 MD / WTD (5% Statutory Cap)</option>
                  <option value={2}>2 or more MDs / WTDs (10% Combined Cap)</option>
                  <option value={0}>0 (No MD/WTD - Non-Exec Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Proposed MD/WTD Total Remuneration (Rs. Crore)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={remParams.proposedMDRemuneration}
                  onChange={e => setRemParams({ ...remParams, proposedMDRemuneration: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Proposed Non-Executive Directors Remuneration (Rs. Crore)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={remParams.proposedNEDRemuneration}
                  onChange={e => setRemParams({ ...remParams, proposedNEDRemuneration: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
              Statutory Ceiling Audit (Section 197)
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Overall Cap (11%)</span>
                <div className="text-sm font-mono font-black text-slate-900 dark:text-slate-100 mt-1">
                  Rs. {remRes.overallCap.toFixed(2)} Cr
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Proposed Total: Rs. {remRes.totalProposed.toFixed(2)} Cr</div>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                  remRes.isOverallCompliant ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {remRes.isOverallCompliant ? 'COMPLIANT' : 'EXCEEDS 11% (SR REQUIRED)'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">MD/WTD Cap ({remRes.mdPct}%)</span>
                <div className="text-sm font-mono font-black text-slate-900 dark:text-slate-100 mt-1">
                  Rs. {remRes.mdCap.toFixed(2)} Cr
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Proposed: Rs. {remParams.proposedMDRemuneration} Cr</div>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                  remRes.isMDCompliant ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {remRes.isMDCompliant ? 'COMPLIANT' : 'EXCEEDS CAP (SR REQUIRED)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 4: IBC CIRP */}
      {activeCalc === 'cirp' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Scale size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                IBC Default & Timeline Parameters
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Default Amount (in Rs. Lakhs)
                </label>
                <input
                  type="number"
                  value={cirpParams.defaultAmountLakhs}
                  onChange={e => setCirpParams({ ...cirpParams, defaultAmountLakhs: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Section 4 statutory floor: Rs. 100 Lakhs (1 Crore)</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  Days Elapsed Since Insolvency Commencement Date
                </label>
                <input
                  type="number"
                  value={cirpParams.daysElapsed}
                  onChange={e => setCirpParams({ ...cirpParams, daysElapsed: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Base: 180 days | Ext: 270 days | Outer Cap: 330 days</span>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1 font-medium">
                  CoC Voting Share in Favor of Extension (%)
                </label>
                <input
                  type="number"
                  value={cirpParams.cocVoteForExtension}
                  onChange={e => setCirpParams({ ...cirpParams, cocVoteForExtension: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono font-bold"
                />
                <span className="text-[10px] text-slate-500">Statutory threshold for Sec 12(2) extension: &ge; 66%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
              CIRP Legal Status Evaluation
            </h3>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Status Assessment:</div>
              <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {cirpRes.status}
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                Under Section 12, a resolution plan must be approved within 180 days (or 270 days with valid CoC 66% resolution). If 330 days elapse without an approved plan or approved extension, the Adjudicating Authority is statutorily mandated to order liquidation of the Corporate Debtor under Section 33.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
