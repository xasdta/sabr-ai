/* ==========================================================================
   SABR AI by SABR SYSTEMS — Database Field Mapping & AI Agent Reporting Logic
   We Map & Define Your Database Fields So AI Agents Can Use Your Data
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroVisualizer();
  initLLMSandbox();
  initROICalculator();
  initContactForms();
});

/* 1. Touch-Friendly Mobile Navigation Drawer */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isExpanded));
    drawer.classList.toggle('hidden');
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      if (iconOpen && iconClose) {
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    });
  });
}

/* 2. Hero Card — Before (Disjointed, Undefined Tables) vs. After (Mapped & AI-Ready) Toggle */
function initHeroVisualizer() {
  const buttons = document.querySelectorAll('.hero-state-btn');
  const panels = document.querySelectorAll('.hero-state-panel');
  const badge = document.getElementById('hero-state-badge');
  if (buttons.length === 0) return;

  function setHeroState(state) {
    buttons.forEach(b => {
      const isMatch = b.getAttribute('data-state') === state;
      if (isMatch) {
        b.className = state === 'sabr-ai'
          ? 'hero-state-btn flex-1 rounded-lg bg-teal-700 px-3 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all'
          : 'hero-state-btn flex-1 rounded-lg bg-rose-600 px-3 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all';
      } else {
        b.className = 'hero-state-btn flex-1 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-all';
      }
    });

    panels.forEach(p => {
      p.classList.toggle('hidden', p.getAttribute('data-panel') !== state);
    });

    if (badge) {
      if (state === 'sabr-ai') {
        badge.textContent = 'FIELDS MAPPED & DEFINED · AI AGENT READY';
        badge.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-800';
      } else {
        badge.textContent = 'DISJOINTED TABLES · AI CANNOT UNDERSTAND';
        badge.className = 'inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-rose-800';
      }
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setHeroState(btn.getAttribute('data-state'));
    });
  });
}

/* 3. Interactive AI Agent Reporting Demo (Focused on Mapping Disjointed Database Fields) */
const SANDBOX_SCENARIOS = {
  margin: {
    question: '“Why did our Q3 net margin drop 2.4% in the Midwest region, and which product lines drove the change?”',
    dirtySource: 'Raw Tables: TBL_ORD_HDR, INV_COST_99, GL_POST_V2, REG_MAP_OLD',
    dirtyOutput: '“I found columns named AMT_1, AMT_2, and NET_VAL_B across three tables, but there is no definition of whether freight adjustments (ADJ_CD=7) are subtracted from gross revenue. Estimated margin is somewhere between 29.1% and 38.4%.”',
    dirtyError: 'WHY THE AI AGENT FAILED: Cryptic column names (AMT_1 vs NET_VAL_B), undocumented status codes (ADJ_CD=7), and no defined join path between your orders table and your general ledger table.',
    cleanSource: 'Sabr AI Mapped Layer: Orders Table ↔ Product Cost Table ↔ Regional Ledger (All Fields Defined)',
    cleanRule: 'Mapped `NET_VAL_B` → Verified Net Revenue | Linked `ORD_HDR.LOC_ID` → `REG_MAP.Region_Name` | Defined `ADJ_CD=7` → Cold-Chain Freight Surcharge',
    cleanOutput: '“Midwest Q3 net margin dropped 2.42% (from 36.80% to 34.38%) driven by two mapped factors: (1) -1.65% from cold-chain freight surcharges (`ADJ_CD=7` in `GL_POST_V2`) on Product Line BIO-400 in Chicago and Detroit, and (2) -0.77% from promotional tier discounts (`DISC_TIER_3`) in `TBL_ORD_HDR`.”',
    cleanMetrics: [
      { label: 'Tables Joined Accurately', val: '4 Disjointed Tables Linked' },
      { label: 'Cryptic Fields Mapped', val: '18 Columns Defined in Plain English' },
      { label: 'Report Generation Time', val: '1.4 Seconds (100% Verified)' }
    ]
  },
  customers: {
    question: '“Which enterprise customer accounts renewing next quarter had a drop in usage over the last 30 days?”',
    dirtySource: 'Raw Tables: CUST_MSTR_01, SUB_BILL_HIST, APP_EVT_LOG, ACCT_STATUS',
    dirtyOutput: '“Unable to connect SUB_BILL_HIST to APP_EVT_LOG because `CUST_NO` is an integer in billing while `WORKSPACE_UID` is a UUID string in the product usage table. Also unclear if `STAT_FLG = 2` means active or paused.”',
    dirtyError: 'WHY THE AI AGENT FAILED: The billing table and product usage table use completely different ID formats with no mapping bridge, and status flags (`STAT_FLG = 2`) are not defined.',
    cleanSource: 'Sabr AI Mapped Layer: Billing Subscriptions ↔ Product Telemetry ↔ Account Master',
    cleanRule: 'Bridged `CUST_NO` ↔ `WORKSPACE_UID` | Defined `STAT_FLG=2` → Active Renewal Pending | Defined Active Seat Usage Formula',
    cleanOutput: '“3 enterprise accounts ($1.84M combined ARR) renewing in the next 60 days had a >25% drop in active usage over the last 30 days: (1) GlobalTech ($740K ARR, renews Nov 24) — active seats down 34%; (2) Vantara Health ($620K ARR, renews Dec 8) — weekly logins down 29%; (3) Northstar ($480K ARR, renews Dec 19) — API volume down 31%.”',
    cleanMetrics: [
      { label: 'At-Risk Renewals Found', val: '$1.84M Across 3 Accounts' },
      { label: 'ID Mismatches Solved', val: 'Billing ID ↔ Product UUID Bridged' },
      { label: 'AI Agent Action', val: 'Auto-Scheduled Weekly Alert' }
    ]
  },
  operations: {
    question: '“Show our current inventory backlog by warehouse and flag any items where supplier lead time exceeds current stock days.”',
    dirtySource: 'Raw Tables: WH_STK_BAL, PO_LINE_ITEMS, VND_LEAD_TBL, SKU_XREF',
    dirtyOutput: '“Table `WH_STK_BAL` lists `QTY_A`, `QTY_B`, and `QTY_R`. It is not defined which column represents sellable stock on hand versus reserved or damaged inventory. Join to `PO_LINE_ITEMS` produced duplicate rows.”',
    dirtyError: 'WHY THE AI AGENT FAILED: Undocumented quantity columns (`QTY_A` vs `QTY_R`) and a many-to-many join trap between warehouse stock and open purchase orders.',
    cleanSource: 'Sabr AI Mapped Layer: Warehouse Stock ↔ Open Purchase Orders ↔ Supplier Lead Times',
    cleanRule: 'Defined `QTY_A - QTY_R` → Net Sellable Stock | Mapped `VND_LT_DAYS` → Verified Lead Time | Fixed 1-to-Many PO Join',
    cleanOutput: '“Across 4 warehouses, 14 high-velocity SKUs have fewer days of sellable stock (`QTY_A - QTY_R`) than their supplier’s current lead time: Dallas Warehouse has 6 SKUs at risk ($410K backlog exposure, 9 days stock vs. 18-day lead time), and Newark Warehouse has 8 SKUs at risk ($530K exposure).”',
    cleanMetrics: [
      { label: 'Stockout Risk Flagged', val: '14 SKUs ($940K Order Value)' },
      { label: 'Ambiguous Columns Fixed', val: 'QTY_A / QTY_B / QTY_R Defined' },
      { label: 'Join Accuracy', val: 'Zero Double-Counting' }
    ]
  },
  board: {
    question: '“Run our monthly Executive KPI Report comparing actuals vs. budget across Finance, Sales, and Operations.”',
    dirtySource: 'Raw Tables: FIN_GL_SUM, SLS_PIPE_RAW, OPS_KPI_2026, BUD_TARGET_TBL',
    dirtyOutput: '“Finance table `FIN_GL_SUM` reports October revenue as $4.86M (accrual), while `SLS_PIPE_RAW` reports $5.19M (bookings). Because fiscal calendar periods and revenue definitions are not mapped between tables, I cannot produce a unified variance report.”',
    dirtyError: 'WHY THE AI AGENT FAILED: Different department tables use different date calendars, different currency/unit scales, and unaligned KPI definitions.',
    cleanSource: 'Sabr AI Mapped Layer: Unified Company Data Dictionary Across Finance, Sales & Operations',
    cleanRule: 'Aligned Fiscal Calendar Across All Tables | Defined Recognized Revenue vs. Bookings | Mapped Budget Codes to GL Accounts',
    cleanOutput: '“October Recognized Revenue reached $4.86M (+18.4% YoY, +$112K above budget), New Bookings totaled $5.19M (106% of quota), and Operating Profit hit $1.28M (26.4% margin). Every figure is pulled directly from your mapped database tables using your official board formulas.”',
    cleanMetrics: [
      { label: 'Monthly Report Prep', val: 'Cut from 5 Days → Instant' },
      { label: 'KPI Definitions Locked', val: '100% Aligned Across Departments' },
      { label: 'Audit Trail', val: 'Every Number Traced to Exact Field' }
    ]
  }
};

function initLLMSandbox() {
  const tabs = document.querySelectorAll('.sandbox-tab-btn');
  if (tabs.length === 0) return;

  function renderScenario(key) {
    const data = SANDBOX_SCENARIOS[key];
    if (!data) return;

    const qEl = document.getElementById('sb-question');
    const dSource = document.getElementById('sb-dirty-source');
    const dOut = document.getElementById('sb-dirty-output');
    const dErr = document.getElementById('sb-dirty-error');
    const cSource = document.getElementById('sb-clean-source');
    const cSql = document.getElementById('sb-clean-sql');
    const cOut = document.getElementById('sb-clean-output');
    const cMetrics = document.getElementById('sb-clean-metrics');

    if (qEl) qEl.textContent = data.question;
    if (dSource) dSource.textContent = data.dirtySource;
    if (dOut) dOut.textContent = data.dirtyOutput;
    if (dErr) dErr.textContent = data.dirtyError;
    if (cSource) cSource.textContent = data.cleanSource;
    if (cSql) cSql.textContent = data.cleanRule;
    if (cOut) cOut.textContent = data.cleanOutput;

    if (cMetrics) {
      cMetrics.innerHTML = data.cleanMetrics.map(m => `
        <div class="rounded-xl border border-teal-200 bg-white p-3 shadow-sm">
          <div class="font-mono text-[11px] font-medium text-slate-500">${m.label}</div>
          <div class="mt-0.5 text-xs sm:text-sm font-bold text-teal-800">${m.val}</div>
        </div>
      `).join('');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.className = 'sandbox-tab-btn rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-left text-xs sm:text-sm font-semibold text-slate-600 transition-all hover:border-teal-600 hover:text-slate-900';
      });
      tab.className = 'sandbox-tab-btn rounded-xl border-2 border-teal-700 bg-teal-50/70 px-3.5 py-2.5 text-left text-xs sm:text-sm font-bold text-teal-900 shadow-sm transition-all';
      renderScenario(tab.getAttribute('data-scenario'));
    });
  });

  renderScenario('margin');
}

/* 4. Interactive Database Mapping & Reporting ROI Calculator */
function initROICalculator() {
  const sourcesInput = document.getElementById('roi-sources');
  const engineersInput = document.getElementById('roi-engineers');
  const docsInput = document.getElementById('roi-docs');
  const queriesInput = document.getElementById('roi-queries');

  if (!sourcesInput || !engineersInput) return;

  function updateROI() {
    const sources = parseInt(sourcesInput.value, 10) || 6;
    const engineers = parseInt(engineersInput.value, 10) || 5;
    const tablesCount = parseInt(docsInput?.value || '80', 10);
    const queriesK = parseInt(queriesInput?.value || '20', 10);

    const sVal = document.getElementById('roi-sources-val');
    const eVal = document.getElementById('roi-engineers-val');
    const dVal = document.getElementById('roi-docs-val');
    const qVal = document.getElementById('roi-queries-val');

    if (sVal) sVal.textContent = `${sources} Databases`;
    if (eVal) eVal.textContent = `${engineers} Analysts / Engineers`;
    if (dVal) dVal.textContent = `${tablesCount.toLocaleString()} Disjointed Tables`;
    if (qVal) qVal.textContent = `${queriesK.toLocaleString()}k AI Reports & Queries/mo`;

    const annualEngSaved = Math.round(engineers * 165000 * 0.42);
    const contextComputeSaved = Math.round((queriesK * 12 * 1.45) + (sources * 6800) + (tablesCount * 310));
    const totalAnnualBenefit = annualEngSaved + contextComputeSaved;

    const estInvestment = 85000 + (sources * 4500);
    const paybackMonths = Math.max(1.4, (estInvestment / (totalAnnualBenefit / 12))).toFixed(1);

    const outSavings = document.getElementById('roi-out-savings');
    const outEngHours = document.getElementById('roi-out-hours');
    const outPayback = document.getElementById('roi-out-payback');
    const outMultiple = document.getElementById('roi-out-multiple');
    const outTier = document.getElementById('roi-recommended-tier');

    if (outSavings) outSavings.textContent = '$' + totalAnnualBenefit.toLocaleString();
    if (outEngHours) outEngHours.textContent = Math.round(engineers * 2080 * 0.42).toLocaleString() + ' hrs/yr';
    if (outPayback) outPayback.textContent = paybackMonths + ' Months';
    if (outMultiple) outMultiple.textContent = (totalAnnualBenefit / estInvestment).toFixed(1) + 'x First-Year Return';

    if (outTier) {
      if (sources <= 5) {
        outTier.textContent = 'Recommended Starting Point: Tier 1 (14-Day Database Field Mapping Audit — $18,500)';
      } else if (sources <= 14) {
        outTier.textContent = 'Recommended Starting Point: 14-Day Mapping Audit → Tier 2 Complete Database Mapping & AI Agent Setup ($75k–$125k)';
      } else {
        outTier.textContent = 'Recommended Starting Point: Full Multi-Database Mapping + Ongoing Schema Maintenance';
      }
    }
  }

  [sourcesInput, engineersInput, docsInput, queriesInput].forEach(el => {
    if (el) el.addEventListener('input', updateROI);
  });

  updateROI();
}

/* 5. Contact & Database Mapping Assessment Form Handler */
function initContactForms() {
  const forms = document.querySelectorAll('.sabr-contact-form');
  if (forms.length === 0) return;

  const params = new URLSearchParams(window.location.search);
  const tierParam = params.get('tier');
  if (tierParam) {
    const tierSelect = document.querySelector('select[name="engagement_tier"]');
    if (tierSelect) {
      for (const opt of tierSelect.options) {
        if (opt.value.toLowerCase().includes(tierParam.toLowerCase())) {
          opt.selected = true;
          break;
        }
      }
    }
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const sources = [];
      form.querySelectorAll('input[name="data_sources"]:checked').forEach(cb => {
        sources.push(cb.value);
      });

      const submission = {
        id: 'SABR AI-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        timestamp: new Date().toISOString(),
        fullName: formData.get('full_name') || '',
        workEmail: formData.get('work_email') || '',
        company: formData.get('company') || '',
        role: formData.get('role') || '',
        engagementTier: formData.get('engagement_tier') || '14-Day Database Field Mapping Assessment',
        primaryGoal: formData.get('primary_goal') || 'Map Disjointed Database Fields & Connect AI Agent for Reporting',
        dataVolume: formData.get('data_volume') || '',
        dataSources: sources.length ? sources : ['Company Databases & Disjointed Tables'],
        notes: formData.get('project_notes') || ''
      };

      const existing = JSON.parse(localStorage.getItem('sabr_sabr-ai_leads') || '[]');
      existing.unshift(submission);
      localStorage.setItem('sabr_sabr-ai_leads', JSON.stringify(existing));

      const complexityScore = Math.min(98, 72 + (sources.length * 4));
      const feedbackBox = form.querySelector('.form-submission-result');

      if (feedbackBox) {
        feedbackBox.classList.remove('hidden');
        feedbackBox.innerHTML = `
          <div class="mt-6 rounded-2xl border-2 border-teal-600 bg-teal-50/90 p-5 sm:p-6 text-slate-900 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-teal-800">
                ✓ REQUEST RECEIVED · REF #${submission.id}
              </span>
              <span class="rounded-full bg-white border border-teal-300 px-3 py-0.5 font-mono text-xs font-semibold text-teal-900">
                AI Agent Readiness Score: ${complexityScore}/100
              </span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              Thank you, ${escapeHtml(submission.fullName)} — Sabr Systems has received your inquiry.
            </h4>
            <p class="text-sm text-slate-700 leading-relaxed mb-4">
              A Senior Partner at Sabr Systems will review the database mapping scope for <strong>${escapeHtml(submission.company)}</strong> (${escapeHtml(submission.dataSources.join(', '))}) and reach out to <strong>${escapeHtml(submission.workEmail)}</strong> within 4 business hours.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="mailto:intake@sabrsystems.com?subject=${encodeURIComponent('Sabr AI Database Mapping & AI Agent Inquiry [' + submission.id + '] - ' + submission.company)}&body=${encodeURIComponent(
                'Reference ID: ' + submission.id + '\n' +
                'Name: ' + submission.fullName + ' (' + submission.role + ')\n' +
                'Company: ' + submission.company + '\n' +
                'Email: ' + submission.workEmail + '\n' +
                'Preferred Option: ' + submission.engagementTier + '\n' +
                'Main Goal: ' + submission.primaryGoal + '\n' +
                'Databases Selected: ' + submission.dataSources.join(', ') + '\n' +
                'Notes: ' + submission.notes
              )}" class="btn-primary text-center">
                Send Direct Email to Sabr Systems →
              </a>
              <button type="button" class="btn-secondary text-center" onclick="downloadIntakeBrief('${submission.id}')">
                Download Summary Receipt
              </button>
            </div>
          </div>
        `;
        feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

window.downloadIntakeBrief = function(refId) {
  const leads = JSON.parse(localStorage.getItem('sabr_sabr-ai_leads') || '[]');
  const item = leads.find(l => l.id === refId) || leads[0];
  if (!item) return;
  const blob = new Blob([JSON.stringify(item, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.id}-Sabr-Systems-Sabr AI-Summary.json`;
  a.click();
  URL.revokeObjectURL(url);
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
