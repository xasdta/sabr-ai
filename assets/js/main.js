/* ==========================================================================
   SABR AI by SABR SYSTEMS — Mobile-First Interactive Logic
   Architectural Clarity for Enterprise Data & Executive LLM Reporting
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

  // Close mobile drawer when a link is tapped
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

/* 2. Hero Card — Before (Raw Data Chaos) vs. After (Sabr AI Structured) Toggle */
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
        badge.textContent = 'VERIFIED · 99.4% CITED ACCURACY';
        badge.className = 'inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-800';
      } else {
        badge.textContent = 'UNSTRUCTURED SILOS · 73% FAILURE RISK';
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

/* 3. Interactive Executive AI LLM Reporting Sandbox */
const SANDBOX_SCENARIOS = {
  margin: {
    role: 'CFO / Finance & Margin',
    question: '“Why did Q3 gross margin compress by 240 bps in our Midwest distribution centers, and which SKU contracts drove it?”',
    dirtySource: 'SAP ERP_INV_99 + 412 Unindexed PDF Freight Addendums + Legacy Snowflake',
    dirtyOutput: '“Based on Q1 budget planning documents and general warehouse logs, gross margin appears stable at ~34.1%. Freight surcharges may have increased in the Northeast or Midwest regions, though exact SKU-level contract overrides could not be resolved across tables.”',
    dirtyError: 'HALLUCINATION & STALE DOC MATCH: Retrieved a superseded Q1 PDF instead of the signed Q3 carrier addendum; failed 6-table join between SAP_INV and SFDC_CONTRACT.',
    cleanSource: 'Sabr AI Canonical Ontology (Entity-Resolved SKU + Signed PDF Carrier Addendum #408 + Governed SQL Metric)',
    cleanSQL: 'SELECT d.depot_id, s.sku_family, SUM(f.fuel_surcharge_delta) AS margin_impact_bps FROM sabr-ai_semantic.fact_margin_v4 WHERE quarter = \'2026-Q3\' GROUP BY 1, 2;',
    cleanOutput: '“Midwest Q3 gross margin dipped -242 bps (from 36.8% to 34.38%) due to two verified root causes: (1) -165 bps from cold-chain reefer fuel surcharges triggered under Carrier Addendum #408 (signed Aug 14, PDF p.4) on SKU family BIO-400 in Chicago & Detroit depots, and (2) -77 bps from unbilled expedited rebates on Enterprise Account #10492 (Acme Health).”',
    cleanMetrics: [
      { label: 'Chicago Depot (ORD-02)', val: '-148 bps (Addendum #408)' },
      { label: 'Detroit Depot (DTW-01)', val: '-94 bps (SKU BIO-400)' },
      { label: 'Provenance Confidence', val: '99.6% · 4 Auditable Citations' }
    ]
  },
  churn: {
    role: 'CRO / Renewal Risk',
    question: '“Which enterprise accounts renewing in the next 60 days have unresolved P1 engineering tickets and declining seat utilization?”',
    dirtySource: 'Salesforce Opportunities + Zendesk Raw JSON + Jira Issues + Product Telemetry',
    dirtyOutput: '“Account "GlobalTech Inc" and "Global Tech LLC" have open support tickets. Overall seat utilization looks healthy at 88%. Recommend standard renewal outreach.”',
    dirtyError: 'ENTITY SPLIT & PERMISSION LEAK: Failed to merge "GlobalTech Inc" (Salesforce) with "Global-Tech-Prod" (Jira P1 outage); surfaced restricted HR table.',
    cleanSource: 'Sabr AI Golden Account Graph (Salesforce + Jira + Zendesk + Snowflake Telemetry · Okta RBAC Enforced)',
    cleanSQL: 'MATCH (a:GoldenAccount)-[:HAS_TICKET]->(t:JiraIssue {priority:"P1", status:"OPEN"}) WHERE a.renewal_days <= 60 AND a.seat_delta_30d < -0.20 RETURN a;',
    cleanOutput: '“3 Enterprise renewals ($1.84M combined ARR) require immediate executive intervention before Nov 30: (1) GlobalTech ($740K ARR, renews in 28d) — 2 open P1 SSO latency bugs (JIRA-8821) + -34% weekly active seats over 21 days; (2) Vantara Bio ($620K ARR, 41d) — 1 P1 data export ticket in Slack #ext-vantara; (3) Northstar Logistics ($480K ARR, 54d) — -29% API volume.”',
    cleanMetrics: [
      { label: 'At-Risk Renewal ARR', val: '$1.84M across 3 Golden Entities' },
      { label: 'Cross-Silo Entity Links', val: '4 Systems Unified (SFDC/Jira/Slack/DW)' },
      { label: 'RBAC Policy Check', val: 'PASSED · RevOps Role Scoped' }
    ]
  },
  supply: {
    role: 'COO / Supply Chain',
    question: '“Which Tier-1 suppliers serve both our US and EU plants, had >3% lot rejection rates last quarter, and carry force-majeure clauses?”',
    dirtySource: 'Oracle NetSuite POs + SharePoint Legal MSAs (Scanned PDFs) + Plant QMS CSVs',
    dirtyOutput: '“We found 14 supplier MSAs mentioning force majeure in SharePoint. However, supplier IDs in plant quality CSVs use local vendor codes that do not map to legal entity names.”',
    dirtyError: 'BROKEN JOIN & OCR FAILURE: Vector search retrieved generic legal boilerplate; could not join plant vendor code V-9921 to MSA counterparty.',
    cleanSource: 'Sabr AI Hybrid GraphRAG + Layout-Aware PDF Table Parser + Master Vendor Ontology',
    cleanSQL: 'SELECT v.canonical_vendor_name, q.lot_reject_pct, msa.force_majeure_notice_days FROM sabr-ai_graph.vendor_360 WHERE q.lot_reject_pct > 0.03;',
    cleanOutput: '“2 dual-region Tier-1 suppliers breach the >3% defect threshold and carry restrictive force-majeure terms: (1) RheinMetall Precision GmbH (Vendor V-9921 / EU-402) — 4.6% lot rejection in Q3 across Ohio & Munich plants; MSA §14.2 allows 15-day supply halt without penalty. (2) Apex Polymer Corp — 3.4% rejection rate; MSA §11.4 caps liability at 1x monthly PO.”',
    cleanMetrics: [
      { label: 'High-Risk Dual Vendors', val: '2 Suppliers ($14.2M Annual Spend)' },
      { label: 'MSA Clause Extraction', val: 'Layout-Parsed PDF §14.2 & §11.4' },
      { label: 'Query Execution Latency', val: '1.18 sec (Hybrid Graph + SQL)' }
    ]
  },
  board: {
    role: 'CEO / Board Packet',
    question: '“Compile our Q3 Board Financial & Operational Variance Summary with auditable GL line items and executive narrative.”',
    dirtySource: 'NetSuite GL + 18 Departmental Excel Models + FP&A Slide Decks',
    dirtyOutput: '“EBITDA was either $11.2M or $12.8M depending on whether departmental spreadsheet v4_final.xlsx or NetSuite trial balance is used. Definitions of Net Revenue Retention vary across 3 decks.”',
    dirtyError: 'METRIC DRIFT: 3 conflicting formulas for NRR and Adjusted EBITDA across FP&A spreadsheets and departmental dashboards.',
    cleanSource: 'Sabr AI Governed Metric Store + Automated Board Narrative Compiler',
    cleanSQL: 'EXECUTE sabr-ai_board.compile_variance_packet(quarter => \'2026-Q3\', audit_trail => TRUE);',
    cleanOutput: '“Q3 2026 GAAP Revenue reached $48.62M (+18.4% YoY, +$1.12M vs. Plan), with Adjusted EBITDA of $12.84M (26.4% margin). Net Dollar Retention locked at 114.2% under canonical board definition (GL-4000-4999). All 24 variance commentary bullets are linked directly to underlying NetSuite journal entries and Salesforce closed-won contracts.”',
    cleanMetrics: [
      { label: 'Board Packet Prep Time', val: 'Reduced from 9 Days → 4 Minutes' },
      { label: 'Metric Formula Drift', val: '0% (Single Canonical YAML Spec)' },
      { label: 'GL-to-Slide Lineage', val: '100% Cell-Level Audit Trail' }
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
    if (cSql) cSql.textContent = data.cleanSQL;
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

/* 4. Interactive Enterprise ROI & Data Readiness Savings Calculator */
function initROICalculator() {
  const sourcesInput = document.getElementById('roi-sources');
  const engineersInput = document.getElementById('roi-engineers');
  const docsInput = document.getElementById('roi-docs');
  const queriesInput = document.getElementById('roi-queries');

  if (!sourcesInput || !engineersInput) return;

  function updateROI() {
    const sources = parseInt(sourcesInput.value, 10) || 8;
    const engineers = parseInt(engineersInput.value, 10) || 6;
    const docsK = parseInt(docsInput?.value || '50', 10);
    const queriesK = parseInt(queriesInput?.value || '25', 10);

    const sVal = document.getElementById('roi-sources-val');
    const eVal = document.getElementById('roi-engineers-val');
    const dVal = document.getElementById('roi-docs-val');
    const qVal = document.getElementById('roi-queries-val');

    if (sVal) sVal.textContent = `${sources} Systems`;
    if (eVal) eVal.textContent = `${engineers} Engineers`;
    if (dVal) dVal.textContent = `${docsK.toLocaleString()}k Docs`;
    if (qVal) qVal.textContent = `${queriesK.toLocaleString()}k Queries/mo`;

    const annualEngSaved = Math.round(engineers * 215000 * 0.44);
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
    if (outEngHours) outEngHours.textContent = Math.round(engineers * 2080 * 0.44).toLocaleString() + ' hrs/yr';
    if (outPayback) outPayback.textContent = paybackMonths + ' Months';
    if (outMultiple) outMultiple.textContent = (totalAnnualBenefit / estInvestment).toFixed(1) + 'x Year-1 ROI';

    if (outTier) {
      if (sources <= 5) {
        outTier.textContent = 'Recommended Track: Tier 1 (14-Day Data Readiness Audit — $18,500) → Core Sabr AI Foundation';
      } else if (sources <= 14) {
        outTier.textContent = 'Recommended Track: Tier 1 Diagnostic Sprint → Tier 2 Turnkey Sabr AI Transformation ($75k–$125k)';
      } else {
        outTier.textContent = 'Recommended Track: Enterprise Multi-Domain Sabr AI Transformation + Tier 3 Managed Stewardship';
      }
    }
  }

  [sourcesInput, engineersInput, docsInput, queriesInput].forEach(el => {
    if (el) el.addEventListener('input', updateROI);
  });

  updateROI();
}

/* 5. Contact & Data Readiness Intake Form Handler */
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
        engagementTier: formData.get('engagement_tier') || '14-Day Data Readiness Audit',
        primaryGoal: formData.get('primary_goal') || 'Clean & Structure Data + LLM Reporting',
        dataVolume: formData.get('data_volume') || '',
        dataSources: sources.length ? sources : ['ERP / CRM / Unstructured Docs'],
        notes: formData.get('project_notes') || ''
      };

      const existing = JSON.parse(localStorage.getItem('sabr_sabr-ai_leads') || '[]');
      existing.unshift(submission);
      localStorage.setItem('sabr_sabr-ai_leads', JSON.stringify(existing));

      const complexityScore = Math.min(96, 64 + (sources.length * 4));
      const feedbackBox = form.querySelector('.form-submission-result');

      if (feedbackBox) {
        feedbackBox.classList.remove('hidden');
        feedbackBox.innerHTML = `
          <div class="mt-6 rounded-2xl border-2 border-teal-600 bg-teal-50/90 p-5 sm:p-6 text-slate-900 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-teal-800">
                ✓ INTAKE BRIEF RECEIVED · REF #${submission.id}
              </span>
              <span class="rounded-full bg-white border border-teal-300 px-3 py-0.5 font-mono text-xs font-semibold text-teal-900">
                Readiness Fit Score: ${complexityScore}/100
              </span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              Thank you, ${escapeHtml(submission.fullName)} — Sabr Systems Engineering has queued your Data Readiness Dossier.
            </h4>
            <p class="text-sm text-slate-700 leading-relaxed mb-4">
              A Sabr Systems Principal Partner (Ivy League Data &amp; AI Architecture Lead) will review your <strong>${escapeHtml(submission.company)}</strong> stack (${escapeHtml(submission.dataSources.join(', '))}) and respond to <strong>${escapeHtml(submission.workEmail)}</strong> within 4 business hours with a custom architecture schematic and 14-Day Sprint scope.
            </p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a href="mailto:intake@sabrsystems.com?subject=${encodeURIComponent('Sabr AI Data Readiness Inquiry [' + submission.id + '] - ' + submission.company)}&body=${encodeURIComponent(
                'Reference ID: ' + submission.id + '\n' +
                'Name: ' + submission.fullName + ' (' + submission.role + ')\n' +
                'Company: ' + submission.company + '\n' +
                'Email: ' + submission.workEmail + '\n' +
                'Preferred Engagement: ' + submission.engagementTier + '\n' +
                'Primary Objective: ' + submission.primaryGoal + '\n' +
                'Data Sources: ' + submission.dataSources.join(', ') + '\n' +
                'Notes: ' + submission.notes
              )}" class="btn-primary text-center">
                Send Direct Email to Sabr Systems →
              </a>
              <button type="button" class="btn-secondary text-center" onclick="downloadIntakeBrief('${submission.id}')">
                Download JSON Scope Receipt
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
  a.download = `${item.id}-Sabr-Systems-Sabr AI-Brief.json`;
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
