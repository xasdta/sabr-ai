/* ==========================================================================
   SABR AI by SABR SYSTEMS — Database Mapping, Unified Query Engine & AI Agents
   We Map Your Database Fields & Deploy AI Agents That Query Across All Your DBs
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

/* 2. Hero Card — Before (Disjointed DBs) vs. After (Mapped + Unified Query Engine + AI Agent) Toggle */
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
        badge.textContent = 'UNIFIED QUERY ENGINE + AI AGENT LIVE';
        badge.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-800';
      } else {
        badge.textContent = 'DISJOINTED DATABASES · AI CANNOT QUERY';
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

/* 3. Interactive AI Agent Live Cross-Database Query Demo */
const SANDBOX_SCENARIOS = {
  margin: {
    question: '“Why did our Q3 net margin drop 2.4% in the Midwest region, and which product lines drove the change?”',
    dirtySource: 'Separate Databases: MySQL (`orders_db.tbl_ord_hdr`) + SQL Server (`finance_db.gl_post_v2`)',
    dirtyOutput: '“Orders live in MySQL and ledger costs live in SQL Server—I cannot run a single query across both databases. Also, MySQL column `AMT_1` and SQL Server column `NET_VAL_B` are not defined, and status code `ADJ_CD=7` is undocumented.”',
    dirtyError: 'WHY RAW AI FAILED: Your orders sit in MySQL while accounting sits in SQL Server with no cross-database query engine, plus cryptic column names (`AMT_1` vs `NET_VAL_B`) are undefined.',
    cleanSource: 'Sabr Unified Query Engine (MySQL + SQL Server Queried Together Live — Zero Data Copying)',
    cleanRule: 'SELECT r.region_name, p.product_line, (SUM(m.net_rev) - SUM(s.cogs) - SUM(s.freight_adj)) / SUM(m.net_rev) FROM mysql.orders_db.mapped_orders m JOIN sqlserver.finance_db.mapped_ledger s ON m.acct_id = s.acct_id ...',
    cleanOutput: '“Midwest Q3 net margin dropped 2.42% (from 36.80% to 34.38%). Our AI Agent queried MySQL Orders and SQL Server Finance simultaneously and identified two causes: (1) -1.65% from cold-chain freight surcharges (`ADJ_CD=7` in SQL Server) on Product Line BIO-400 in Chicago and Detroit, and (2) -0.77% from tier discounts (`DISC_TIER_3` in MySQL).”',
    cleanMetrics: [
      { label: 'Live Cross-DB Join', val: 'MySQL + SQL Server in 1 Query' },
      { label: 'Data Migration Required', val: 'Zero (Queried In-Place)' },
      { label: 'Execution Speed', val: '1.1 Seconds (Parallel Engine)' }
    ]
  },
  customers: {
    question: '“Which enterprise customer accounts renewing next quarter had a >25% drop in usage in our MySQL app database over the last 30 days?”',
    dirtySource: 'Separate Databases: PostgreSQL (`billing_db.sub_hist`) + MySQL (`app_prod.user_events`)',
    dirtyOutput: '“Unable to join PostgreSQL subscription records to MySQL product usage events because they are on different database servers, and `CUST_NO` (integer) does not match `WORKSPACE_UID` (string). Also unclear if `STAT_FLG = 2` means active.”',
    dirtyError: 'WHY RAW AI FAILED: Cannot join live PostgreSQL billing tables with MySQL application tables, and ID formats (`CUST_NO` vs `WORKSPACE_UID`) and status flags are unmapped.',
    cleanSource: 'Sabr Unified Query Engine (PostgreSQL Billing ↔ MySQL App Telemetry Bridged Live)',
    cleanRule: 'SELECT b.account_name, b.arr_usd, u.active_seat_delta_30d FROM postgres.billing.subscriptions b JOIN mysql.app_prod.workspace_bridge w ON b.cust_no = w.cust_no JOIN mysql.app_prod.usage_summary u ...',
    cleanOutput: '“3 enterprise accounts ($1.84M combined ARR) in PostgreSQL renewing in the next 60 days had a >25% drop in live MySQL app usage over the last 30 days: (1) GlobalTech ($740K ARR, renews Nov 24) — active seats down 34%; (2) Vantara Health ($620K ARR, renews Dec 8) — weekly logins down 29%; (3) Northstar ($480K ARR, renews Dec 19) — API calls down 31%.”',
    cleanMetrics: [
      { label: 'At-Risk Renewals Found', val: '$1.84M Across 3 Accounts' },
      { label: 'Databases Queried Live', val: 'PostgreSQL + MySQL Joined' },
      { label: 'AI Agent Action', val: 'Auto-Scheduled Weekly Alert' }
    ]
  },
  operations: {
    question: '“Compare live customer orders in MySQL against warehouse stock in SQL Server and flag any items where supplier lead time exceeds stock days.”',
    dirtySource: 'Separate Databases: MySQL (`ecom_db.open_orders`) + SQL Server (`wms_db.wh_stk_bal`)',
    dirtyOutput: '“Warehouse table `WH_STK_BAL` in SQL Server lists `QTY_A`, `QTY_B`, and `QTY_R`, which are not defined. Furthermore, open customer orders sit in MySQL and cannot be queried alongside SQL Server inventory without building an ETL pipeline.”',
    dirtyError: 'WHY RAW AI FAILED: Undocumented quantity columns (`QTY_A` vs `QTY_R`), no way to query MySQL and SQL Server together on the fly, and SKU codes differ across systems.',
    cleanSource: 'Sabr Unified Query Engine (MySQL Open Orders ↔ SQL Server Warehouse Inventory)',
    cleanRule: 'SELECT i.warehouse_loc, i.sku_code, (i.qty_on_hand - i.qty_reserved - o.open_order_qty) AS net_available, v.lead_time_days FROM sqlserver.wms.inventory i JOIN mysql.ecom.open_orders o ON i.sku_id = o.sku_id ...',
    cleanOutput: '“Across 4 warehouses, 14 high-velocity SKUs have fewer days of sellable stock (`QTY_A - QTY_R` in SQL Server minus open MySQL orders) than their supplier’s current lead time: Dallas Warehouse has 6 SKUs at risk ($410K order exposure, 9 days stock vs. 18-day lead time), and Newark Warehouse has 8 SKUs at risk ($530K exposure).”',
    cleanMetrics: [
      { label: 'Stockout Risk Flagged', val: '14 SKUs ($940K Order Value)' },
      { label: 'Cross-Database Join', val: 'MySQL Orders + SQL Server WMS' },
      { label: 'Read-Only Guardrail', val: 'Zero Load on Production DBs' }
    ]
  },
  board: {
    question: '“Run our monthly Executive KPI Report combining Finance (SQL Server), Sales Subscriptions (PostgreSQL), and Live App Activity (MySQL).”',
    dirtySource: 'Separate Databases: SQL Server (`FIN_GL`) + PostgreSQL (`SLS_PIPE`) + MySQL (`APP_METRICS`)',
    dirtyOutput: '“Each department stores data in a different database engine with different fiscal calendars, account IDs, and revenue definitions. Generating a combined report requires manual CSV exports and 5 days of spreadsheet reconciliation.”',
    dirtyError: 'WHY RAW AI FAILED: Three separate database engines (MySQL, PostgreSQL, SQL Server) with unmapped schemas and conflicting KPI formulas.',
    cleanSource: 'Sabr Unified Catalog & AI Agent Layer Across SQL Server, PostgreSQL & MySQL',
    cleanRule: 'EXECUTE sabr_agent.compile_executive_kpi_report(period => \'2026-10\', sources => [\'mysql\', \'postgres\', \'sqlserver\']);',
    cleanOutput: '“October Recognized Revenue (SQL Server) reached $4.86M (+18.4% YoY, +$112K above budget), New Bookings (PostgreSQL) totaled $5.19M (106% of quota), and Monthly Active Enterprise Seats (MySQL) grew +22.1%. Every figure was queried live in parallel across all three databases using your locked board formulas.”',
    cleanMetrics: [
      { label: 'Monthly Report Prep', val: 'Cut from 5 Days → 2 Seconds' },
      { label: 'Databases Unified', val: 'MySQL + Postgres + SQL Server' },
      { label: 'ETL Pipelines Needed', val: 'Zero (Federated Live Query)' }
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

/* 4. Interactive Database Mapping, Federated Query & AI Agent ROI Calculator */
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

    if (sVal) sVal.textContent = `${sources} Databases (MySQL, Postgres, etc.)`;
    if (eVal) eVal.textContent = `${engineers} Analysts / Engineers`;
    if (dVal) dVal.textContent = `${tablesCount.toLocaleString()} Disjointed Tables`;
    if (qVal) qVal.textContent = `${queriesK.toLocaleString()}k AI Agent Queries/mo`;

    const annualEngSaved = Math.round(engineers * 165000 * 0.44);
    // Savings from avoiding expensive ETL/data warehouse migration + instant reporting
    const etlAndQuerySaved = Math.round((queriesK * 12 * 1.45) + (sources * 9500) + (tablesCount * 320));
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
        outTier.textContent = 'Recommended Starting Point: Tier 1 (14-Day Database Mapping & AI Agent Audit — $18,500)';
      } else if (sources <= 14) {
        outTier.textContent = 'Recommended Starting Point: 14-Day Audit → Tier 2 Complete Field Mapping, Unified Query Architecture & AI Agents ($75k–$140k)';
      } else {
        outTier.textContent = 'Recommended Starting Point: Multi-Database Query Architecture + Custom AI Agents + Ongoing Support';
      }
    }
  }

  [sourcesInput, engineersInput, docsInput, queriesInput].forEach(el => {
    if (el) el.addEventListener('input', updateROI);
  });

  updateROI();
}

/* 5. Contact & Database Mapping / AI Agent Assessment Form Handler */
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
        engagementTier: formData.get('engagement_tier') || '14-Day Database Mapping & AI Agent Audit',
        primaryGoal: formData.get('primary_goal') || 'Map Database Fields, Set Up Unified Query Layer & Deploy AI Agents',
        dataVolume: formData.get('data_volume') || '',
        dataSources: sources.length ? sources : ['MySQL / PostgreSQL / SQL Server Databases'],
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
              A Senior Partner at Sabr Systems will review the database mapping and AI agent architecture scope for <strong>${escapeHtml(submission.company)}</strong> (${escapeHtml(submission.dataSources.join(', '))}) and reach out to <strong>${escapeHtml(submission.workEmail)}</strong> within 4 business hours.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="mailto:intake@sabrsystems.com?subject=${encodeURIComponent('Sabr AI Database Mapping & AI Agent Setup [' + submission.id + '] - ' + submission.company)}&body=${encodeURIComponent(
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
