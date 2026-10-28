/* ==========================================================================
   SABR AI by SABR SYSTEMS — End-to-End AI Data Readiness, High-Speed Analytical
   Architecture & AI Agent Automation
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

/* 2. Hero Card — 3-Mode Interactive Architecture Inspector
      (1: Raw Disjointed DBs | 2: Mapped & Unified Query | 3: High-Speed AI Analytical Engine + Agents) */
function initHeroVisualizer() {
  const buttons = document.querySelectorAll('.hero-state-btn');
  const panels = document.querySelectorAll('.hero-state-panel');
  const badge = document.getElementById('hero-state-badge');
  if (buttons.length === 0) return;

  function setHeroState(state) {
    buttons.forEach(b => {
      const isMatch = b.getAttribute('data-state') === state;
      if (isMatch) {
        b.className = state === 'chaos'
          ? 'hero-state-btn flex-1 rounded-lg bg-rose-600 px-3 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all'
          : 'hero-state-btn flex-1 rounded-lg bg-teal-700 px-3 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all';
      } else {
        b.className = 'hero-state-btn flex-1 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-all';
      }
    });

    panels.forEach(p => {
      p.classList.toggle('hidden', p.getAttribute('data-panel') !== state);
    });

    if (badge) {
      if (state === 'sabrai') {
        badge.textContent = 'AI-READY ARCHITECTURE · SUB-SECOND QUERIES';
        badge.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-800';
      } else {
        badge.textContent = 'RAW DATABASES · NOT READY FOR AI LLMs';
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

/* 3. Interactive AI LLM Reporting & Corporate Automation Demo */
const SANDBOX_SCENARIOS = {
  margin: {
    question: '“Why did our Q3 net margin drop 2.4% in the Midwest region, and automatically flag any product lines falling below our 30% target?”',
    dirtySource: 'Separate Databases: MySQL (`orders_db.tbl_ord_hdr`) + SQL Server (`finance_db.gl_post_v2`)',
    dirtyOutput: '“Orders live in MySQL and ledger costs live in SQL Server—I cannot query across both databases at once. Also, MySQL column `AMT_1` and SQL Server column `NET_VAL_B` are not defined, and scanning 18M rows timed out on your production DB.”',
    dirtyError: 'WHY RAW AI FAILED: Disjointed database engines, undefined column names (`AMT_1` vs `NET_VAL_B`), and slow row-by-row scanning that bogged down production servers.',
    cleanSource: 'Sabr Mapped Catalog + High-Speed Columnar Analytical Engine (MySQL & SQL Server Unified)',
    cleanRule: 'Mapped Fields + Transformed into High-Speed Analytical Store → Scanned 18.4M Rows in 42ms with Zero Production DB Load',
    cleanOutput: '“Midwest Q3 net margin dropped 2.42% (from 36.80% to 34.38%). Our AI Agent scanned 18.4M transactions in 42 milliseconds and identified two causes: (1) -1.65% from cold-chain freight surcharges (`ADJ_CD=7`) on Product Line BIO-400 in Chicago and Detroit, and (2) -0.77% from tier discounts (`DISC_TIER_3`). Automated Action: Triggered a pricing review task for 3 BIO-400 contracts below 30% margin.”',
    cleanMetrics: [
      { label: 'Query Speed (18.4M Rows)', val: '42 Milliseconds (Sub-Second)' },
      { label: 'Production DB Impact', val: '0% Load (Dedicated AI Store)' },
      { label: 'Corporate Automation', val: 'Auto-Flagged 3 Low-Margin SKUs' }
    ]
  },
  customers: {
    question: '“Which enterprise accounts renewing next quarter had a >25% drop in usage over the last 30 days, and trigger an account-save workflow?”',
    dirtySource: 'Separate Databases: PostgreSQL (`billing_db.sub_hist`) + MySQL (`app_prod.user_events`)',
    dirtyOutput: '“Unable to join PostgreSQL subscription tables with 90M rows of MySQL product event logs without timing out. Furthermore, `CUST_NO` (integer) does not match `WORKSPACE_UID` (string), and status `STAT_FLG = 2` is undocumented.”',
    dirtyError: 'WHY RAW AI FAILED: Cannot join PostgreSQL billing with 90M MySQL event rows on the fly, and ID formats and status codes are unmapped.',
    cleanSource: 'Sabr Unified Query & High-Speed Analytical Engine (Postgres Billing + MySQL Events)',
    cleanRule: 'Bridged `CUST_NO` ↔ `WORKSPACE_UID` | Pre-Aggregated 90M Usage Events in Real Time | Connected to Renewal AI Agent',
    cleanOutput: '“3 enterprise accounts ($1.84M combined ARR) renewing in the next 60 days had a >25% drop in usage over the last 30 days: (1) GlobalTech ($740K ARR, renews Nov 24) — active seats down 34%; (2) Vantara Health ($620K ARR, renews Dec 8) — weekly logins down 29%; (3) Northstar ($480K ARR, renews Dec 19) — API calls down 31%. Automated Action: Created executive retention briefs for all 3 account owners.”',
    cleanMetrics: [
      { label: 'At-Risk Revenue Protected', val: '$1.84M Across 3 Accounts' },
      { label: '90M Event Scan Time', val: '65 Milliseconds' },
      { label: 'Automated Workflow', val: '3 Retention Briefs Dispatched' }
    ]
  },
  operations: {
    question: '“Compare live customer orders against warehouse stock across all locations and automatically draft purchase orders for items at risk of stockout.”',
    dirtySource: 'Separate Databases: MySQL (`ecom_db.open_orders`) + SQL Server (`wms_db.wh_stk_bal`)',
    dirtyOutput: '“Warehouse table `WH_STK_BAL` in SQL Server lists `QTY_A`, `QTY_B`, and `QTY_R`, which are not defined. Open customer orders sit in MySQL and cannot be compared against supplier lead times automatically.”',
    dirtyError: 'WHY RAW AI FAILED: Undocumented quantity columns (`QTY_A` vs `QTY_R`), isolated MySQL and SQL Server databases, and no automated action layer.',
    cleanSource: 'Sabr Mapped Catalog + Real-Time Analytical Engine + Operations AI Agent',
    cleanRule: 'Defined `QTY_A - QTY_R` → Sellable Stock | Joined MySQL Orders + SQL Server WMS | Connected to PO Automation Agent',
    cleanOutput: '“Across 4 warehouses, 14 high-velocity SKUs have fewer days of sellable stock than their supplier’s current lead time: Dallas Warehouse has 6 SKUs at risk ($410K order exposure, 9 days stock vs. 18-day lead time), and Newark Warehouse has 8 SKUs at risk ($530K exposure). Automated Action: Drafted 14 restock purchase orders for manager one-click approval.”',
    cleanMetrics: [
      { label: 'Stockouts Prevented', val: '14 SKUs ($940K Order Value)' },
      { label: 'Cross-Database Join', val: 'MySQL Orders + SQL Server WMS' },
      { label: 'Automated Action', val: '14 Draft POs Generated' }
    ]
  },
  board: {
    question: '“Give every department head self-serve AI access to their live KPIs and compile our monthly Executive Variance Report automatically.”',
    dirtySource: 'Separate Databases: SQL Server (`FIN_GL`) + PostgreSQL (`SLS_PIPE`) + MySQL (`APP_METRICS`)',
    dirtyOutput: '“Each department stores data in a different database with different calendars, account IDs, and revenue formulas. Giving employees direct AI access risks exposing restricted payroll/financial columns and overloading production servers.”',
    dirtyError: 'WHY RAW AI FAILED: Conflicting department formulas, no role-based column security, and production databases that cannot handle company-wide AI queries.',
    cleanSource: 'Sabr High-Speed Analytical Engine + Role-Governed Self-Serve AI Portal',
    cleanRule: 'Locked Official KPI Formulas | Enforced Role-Based Column Security | Sub-Second Analytical Store for Company-Wide Access',
    cleanOutput: '“October Recognized Revenue reached $4.86M (+18.4% YoY, +$112K above budget), New Bookings totaled $5.19M (106% of quota), and Operating Profit hit $1.28M (26.4% margin). Finance, Sales, and Operations teams now have instant, role-secured AI access to their live metrics with zero load on production databases.”',
    cleanMetrics: [
      { label: 'Monthly Report Prep', val: 'Cut from 5 Days → Instant' },
      { label: 'Employee AI Access', val: 'Role-Secured & Sub-Second' },
      { label: 'KPI Formula Alignment', val: '100% Unified Company-Wide' }
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

/* 4. Interactive ROI & Engineering Savings Calculator */
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
    const queriesK = parseInt(queriesInput?.value || '25', 10);

    const sVal = document.getElementById('roi-sources-val');
    const eVal = document.getElementById('roi-engineers-val');
    const dVal = document.getElementById('roi-docs-val');
    const qVal = document.getElementById('roi-queries-val');

    if (sVal) sVal.textContent = `${sources} Databases`;
    if (eVal) eVal.textContent = `${engineers} Analysts / Engineers`;
    if (dVal) dVal.textContent = `${tablesCount.toLocaleString()} Tables / Datasets`;
    if (qVal) qVal.textContent = `${queriesK.toLocaleString()}k AI Queries & Automations/mo`;

    const annualEngSaved = Math.round(engineers * 165000 * 0.44);
    const etlAndQuerySaved = Math.round((queriesK * 12 * 1.55) + (sources * 9500) + (tablesCount * 320));
    const totalAnnualBenefit = annualEngSaved + etlAndQuerySaved;

    const estInvestment = 85000 + (sources * 4500);
    const paybackMonths = Math.max(1.3, (estInvestment / (totalAnnualBenefit / 12))).toFixed(1);

    const outSavings = document.getElementById('roi-out-savings');
    const outEngHours = document.getElementById('roi-out-hours');
    const outPayback = document.getElementById('roi-out-payback');
    const outMultiple = document.getElementById('roi-out-multiple');
    const outTier = document.getElementById('roi-recommended-tier');

    if (outSavings) outSavings.textContent = '$' + totalAnnualBenefit.toLocaleString();
    if (outEngHours) outEngHours.textContent = Math.round(engineers * 2080 * 0.44).toLocaleString() + ' hrs/yr';
    if (outPayback) outPayback.textContent = paybackMonths + ' Months';
    if (outMultiple) outMultiple.textContent = (totalAnnualBenefit / estInvestment).toFixed(1) + 'x First-Year Return';

    if (outTier) {
      if (sources <= 5) {
        outTier.textContent = 'Recommended Starting Point: Tier 1 (14-Day Data Readiness & AI Architecture Audit — $18,500)';
      } else if (sources <= 14) {
        outTier.textContent = 'Recommended Starting Point: 14-Day Audit → Tier 2 Complete Data-to-AI Architecture & Agent Setup ($75k–$140k)';
      } else {
        outTier.textContent = 'Recommended Starting Point: Full High-Speed AI Data Engine + Custom AI Agents + Ongoing Support';
      }
    }
  }

  [sourcesInput, engineersInput, docsInput, queriesInput].forEach(el => {
    if (el) el.addEventListener('input', updateROI);
  });

  updateROI();
}

/* 5. Contact & Data Readiness / AI Architecture Intake Form Handler */
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
        dataState: formData.get('data_state') || 'Mix of unmapped and clean databases',
        engagementTier: formData.get('engagement_tier') || '14-Day Data & AI Architecture Audit',
        primaryGoal: formData.get('primary_goal') || 'Get Data Ready for AI LLMs, Reporting & Automation',
        dataVolume: formData.get('data_volume') || '',
        dataSources: sources.length ? sources : ['Company Databases (MySQL, Postgres, SQL Server, etc.)'],
        notes: formData.get('project_notes') || ''
      };

      const existing = JSON.parse(localStorage.getItem('sabr_ai_leads') || '[]');
      existing.unshift(submission);
      localStorage.setItem('sabr_ai_leads', JSON.stringify(existing));

      const complexityScore = Math.min(98, 74 + (sources.length * 4));
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
                AI Architecture Fit Score: ${complexityScore}/100
              </span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              Thank you, ${escapeHtml(submission.fullName)} — Sabr Systems has received your inquiry.
            </h4>
            <p class="text-sm text-slate-700 leading-relaxed mb-4">
              A Senior Partner at Sabr Systems will review the data readiness and AI architecture scope for <strong>${escapeHtml(submission.company)}</strong> (${escapeHtml(submission.dataSources.join(', '))}) and reach out to <strong>${escapeHtml(submission.workEmail)}</strong> within 4 business hours.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="mailto:intake@sabrsystems.com?subject=${encodeURIComponent('Sabr AI AI Data Readiness & Architecture Inquiry [' + submission.id + '] - ' + submission.company)}&body=${encodeURIComponent(
                'Reference ID: ' + submission.id + '\n' +
                'Name: ' + submission.fullName + ' (' + submission.role + ')\n' +
                'Company: ' + submission.company + '\n' +
                'Email: ' + submission.workEmail + '\n' +
                'Current Data State: ' + submission.dataState + '\n' +
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
  const leads = JSON.parse(localStorage.getItem('sabr_ai_leads') || '[]');
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
