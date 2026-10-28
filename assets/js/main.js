/* ==========================================================================
   SABR AI by SABR SYSTEMS — Plain-English Mobile-First Interactive Logic
   We Clean & Organize Your Company's Databases & Documents So AI Works
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

/* 2. Hero Card — Before (Messy Databases & Docs) vs. After (Clean & AI-Ready) Toggle */
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
        badge.textContent = 'ORGANIZED & VERIFIED · READY FOR AI';
        badge.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-800';
      } else {
        badge.textContent = 'MESSY DATABASES & DOCS · AI GUESSES WRONG';
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

/* 3. Interactive Business Questions Sandbox (Strictly Databases & Documents) */
const SANDBOX_SCENARIOS = {
  margin: {
    question: '“Why did our profit margin drop 2.4% last quarter, and which client contracts or vendor agreements caused it?”',
    dirtySource: 'Company Financial Database + 400 Scanned PDF Vendor Contracts + Pricing Tables',
    dirtyOutput: '“Based on your Q1 database tables, profit margin looks steady around 34%. Shipping or vendor costs may have gone up, but I cannot match the scanned PDF agreements to your database rows.”',
    dirtyError: 'WHY STANDARD AI FAILED: Read an outdated Q1 report document instead of the active Q3 contract PDF, and could not connect pricing tables in PDFs to your database records.',
    cleanSource: 'Connected & Cleaned: Financial Database + Signed PDF Contracts + Pricing Tables',
    cleanRule: 'Matched 412 Signed PDF Contracts to Database Records · Verified Active Dates',
    cleanOutput: '“Q3 profit margin dropped 2.4% (from 36.8% to 34.4%) for two exact reasons: (1) A 1.65% increase from cold-storage surcharges in the signed Carrier Contract PDF (dated Aug 14, page 4), and (2) 0.75% from unbilled rush discounts recorded in your Q3 Orders Database for Acme Health.”',
    cleanMetrics: [
      { label: 'Reason #1 (PDF Contract)', val: '-1.65% (Aug 14 Contract PDF, p.4)' },
      { label: 'Reason #2 (Orders Database)', val: '-0.75% (Unbilled Rush Discounts)' },
      { label: 'Answer Accuracy', val: '99.6% · Links to Exact Records' }
    ]
  },
  customers: {
    question: '“Which of our top client accounts renewing next month have overdue invoices or special contract terms we need to review?”',
    dirtySource: 'Customer Database + Billing Database + Signed PDF Client Agreements',
    dirtyOutput: '“Client "GlobalTech Inc" and "Global Tech LLC" appear in your database with different balances. Standard renewal pricing applies.”',
    dirtyError: 'WHY STANDARD AI FAILED: Didn’t realize "GlobalTech Inc" in the customer database and "Global Tech LLC" on the signed PDF contract were the exact same client.',
    cleanSource: 'Unified Client View: Customer Database + Billing Tables + Signed PDF Contracts',
    cleanRule: 'Merged Duplicate Client Records Across Databases & Linked Signed PDF Addendums',
    cleanOutput: '“3 major accounts ($1.84M total value) renewing in the next 45 days need immediate review: (1) GlobalTech ($740K, renews in 28 days) — has $82K in overdue invoices in the billing database and a 5% price-cap clause in their 2025 PDF Addendum; (2) Vantara Health ($620K) — usage dropped 31% in the product database; (3) Northstar ($480K) — custom SLA document expires Nov 15.”',
    cleanMetrics: [
      { label: 'Renewals Flagged', val: '$1.84M Across 3 Client Accounts' },
      { label: 'Data Connected', val: 'Customer DB + Billing DB + PDF Contracts' },
      { label: 'Access Control', val: 'Verified · Executive & Finance Only' }
    ]
  },
  operations: {
    question: '“Across our vendor database and PDF agreements, which suppliers missed delivery targets and allow 15-day cancellation?”',
    dirtySource: 'Inventory & Operations Database + 1,200 Scanned PDF Vendor Agreements & SOPs',
    dirtyOutput: '“I found 14 PDF agreements mentioning cancellation clauses, but vendor IDs in your operations database use numeric codes that don’t match the company names on the PDFs.”',
    dirtyError: 'WHY STANDARD AI FAILED: Couldn’t link vendor ID "#9921" in your database to the legal company name written inside your scanned PDF contracts.',
    cleanSource: 'Connected Operations View: Vendor Database + Delivery Tables + Parsed PDF Contracts',
    cleanRule: 'Linked Database Vendor IDs to Legal PDF Agreements · Extracted Delivery & Penalty Clauses',
    cleanOutput: '“2 suppliers missed >3% of deliveries in your database last quarter and carry 15-day cancellation clauses in their PDF contracts: (1) Precision Parts Co. (DB ID #9921) — 4.6% late deliveries in Q3; Master Agreement PDF (§14.2) allows 15-day cancellation without penalty. (2) Apex Supply (DB ID #4082) — 3.4% late rate; PDF Addendum (§11.4) caps liability at 1x monthly order.”',
    cleanMetrics: [
      { label: 'Vendors Identified', val: '2 Suppliers ($1.4M Annual Spend)' },
      { label: 'Records Checked', val: 'Operations DB + 1,200 PDF Contracts' },
      { label: 'Time to Answer', val: '1.2 Seconds (vs. 3 Days Manual)' }
    ]
  },
  board: {
    question: '“Generate our monthly Executive Financial & Operations Report comparing actual database numbers against our budget documents.”',
    dirtySource: 'Accounting Database + Department Databases + Official Budget & Policy Documents',
    dirtyOutput: '“Monthly operating profit was either $1.12M or $1.28M depending on which database table or budget document is used. Department definitions of net retention do not match.”',
    dirtyError: 'WHY STANDARD AI FAILED: Different database tables and policy documents used conflicting formulas for the same business metric.',
    cleanSource: 'Single Company Standard: Governed Databases + Official Policy & Budget Documents',
    cleanRule: 'Locked One Official Formula for Every Business Metric · Linked Every Number to Its Source',
    cleanOutput: '“October Revenue reached $4.86M (+18.4% YoY, +$112K above budget), with Net Operating Profit of $1.28M (26.4% margin). Net Customer Retention is 114.2%. All 24 executive summary lines are automatically verified against your accounting database and linked directly to supporting contract and policy documents.”',
    cleanMetrics: [
      { label: 'Report Prep Time', val: 'Cut from 5 Days → 2 Minutes' },
      { label: 'Conflicting Numbers', val: 'Zero (One Company Standard)' },
      { label: 'Source Verification', val: '100% Linked to DB Rows & PDFs' }
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

/* 4. Interactive Business Time & Cost Savings Calculator */
function initROICalculator() {
  const sourcesInput = document.getElementById('roi-sources');
  const engineersInput = document.getElementById('roi-engineers');
  const docsInput = document.getElementById('roi-docs');
  const queriesInput = document.getElementById('roi-queries');

  if (!sourcesInput || !engineersInput) return;

  function updateROI() {
    const sources = parseInt(sourcesInput.value, 10) || 6;
    const engineers = parseInt(engineersInput.value, 10) || 5;
    const docsK = parseInt(docsInput?.value || '40', 10);
    const queriesK = parseInt(queriesInput?.value || '20', 10);

    const sVal = document.getElementById('roi-sources-val');
    const eVal = document.getElementById('roi-engineers-val');
    const dVal = document.getElementById('roi-docs-val');
    const qVal = document.getElementById('roi-queries-val');

    if (sVal) sVal.textContent = `${sources} Databases`;
    if (eVal) eVal.textContent = `${engineers} Staff / Analysts`;
    if (dVal) dVal.textContent = `${docsK.toLocaleString()}k Documents`;
    if (qVal) qVal.textContent = `${queriesK.toLocaleString()}k Reports & Queries/mo`;

    const annualEngSaved = Math.round(engineers * 165000 * 0.42);
    const contextComputeSaved = Math.round((queriesK * 12 * 1.45) + (sources * 6800) + (docsK * 290));
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
        outTier.textContent = 'Recommended Starting Point: Tier 1 (14-Day Database & Document Audit — $18,500)';
      } else if (sources <= 14) {
        outTier.textContent = 'Recommended Starting Point: 14-Day Audit → Tier 2 Complete Database & Document Cleanup ($75k–$125k)';
      } else {
        outTier.textContent = 'Recommended Starting Point: Full Company Data Transformation + Ongoing Monthly Support';
      }
    }
  }

  [sourcesInput, engineersInput, docsInput, queriesInput].forEach(el => {
    if (el) el.addEventListener('input', updateROI);
  });

  updateROI();
}

/* 5. Contact & Data Assessment Form Handler */
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
        engagementTier: formData.get('engagement_tier') || '14-Day Database & Document Assessment',
        primaryGoal: formData.get('primary_goal') || 'Clean Up Databases & Documents for AI Reporting',
        dataVolume: formData.get('data_volume') || '',
        dataSources: sources.length ? sources : ['Company Databases & Business Documents'],
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
                AI Readiness Fit Score: ${complexityScore}/100
              </span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              Thank you, ${escapeHtml(submission.fullName)} — Sabr Systems has received your inquiry.
            </h4>
            <p class="text-sm text-slate-700 leading-relaxed mb-4">
              A Senior Partner at Sabr Systems will review the database and document scope for <strong>${escapeHtml(submission.company)}</strong> (${escapeHtml(submission.dataSources.join(', '))}) and reach out to <strong>${escapeHtml(submission.workEmail)}</strong> within 4 business hours.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="mailto:intake@sabrsystems.com?subject=${encodeURIComponent('Sabr AI Database & Document AI Inquiry [' + submission.id + '] - ' + submission.company)}&body=${encodeURIComponent(
                'Reference ID: ' + submission.id + '\n' +
                'Name: ' + submission.fullName + ' (' + submission.role + ')\n' +
                'Company: ' + submission.company + '\n' +
                'Email: ' + submission.workEmail + '\n' +
                'Preferred Option: ' + submission.engagementTier + '\n' +
                'Main Goal: ' + submission.primaryGoal + '\n' +
                'Databases & Documents Selected: ' + submission.dataSources.join(', ') + '\n' +
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
