/* ==========================================================================
   SABR AI by SABR SYSTEMS — Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initScrollReveal();
  initHeroVisualizer();
  initLLMSandbox();
  initROICalculator();
  initContactForms();
});

/* 1. Theme Toggle (Dark / Light) */
function initTheme() {
  const saved = localStorage.getItem('sabr_sabr-ai_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sabr_sabr-ai_theme', next);
    });
  });
}

/* 2. Mobile Navigation */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav-links');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

/* 3. Scroll Reveal Animations */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* 4. Flagship Hero Card — Before vs. After Sabr AI Interactive Visualizer */
function initHeroVisualizer() {
  const buttons = document.querySelectorAll('.kv-toggle-btn');
  const panels = document.querySelectorAll('.kv-stage-panel');
  const autoCycleIndicator = document.getElementById('kv-auto-status');
  if (buttons.length === 0) return;

  let userInteracted = false;

  function setHeroState(state) {
    buttons.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-state') === state);
    });
    panels.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-panel') === state);
    });
    if (autoCycleIndicator) {
      autoCycleIndicator.textContent = state === 'sabr-ai'
        ? 'STATE: SABR AI TIDIED · SEMANTIC + VECTOR + RBAC READY'
        : 'STATE: RAW ENTERPRISE SILOS · 73% RETRIEVAL FAILURE RISK';
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      userInteracted = true;
      setHeroState(btn.getAttribute('data-state'));
    });
  });

  // Gentle auto-toggle once after 5.5s if user hasn't clicked so they see the animation
  setTimeout(() => {
    if (!userInteracted) {
      const current = document.querySelector('.kv-toggle-btn.active')?.getAttribute('data-state');
      setHeroState(current === 'chaos' ? 'sabr-ai' : 'sabr-ai');
    }
  }, 5500);
}

/* 5. Interactive Executive LLM Reporting Sandbox */
const SANDBOX_SCENARIOS = {
  margin: {
    question: '“Why did Q3 gross margin compress by 240 bps in our Midwest distribution centers, and which SKU contracts drove it?”',
    dirtySource: 'SAP ERP_INV_99 + 412 Unindexed PDF Freight Addendums + Legacy Snowflake',
    dirtyOutput: '“Based on Q1 budget planning documents and general warehouse logs, gross margin appears stable at ~34.1%. Freight surcharges may have increased in the Northeast or Midwest regions, though exact SKU-level contract overrides could not be resolved across tables.”',
    dirtyError: 'HALLUCINATION & STALE DOC MATCH: Matched Q1 PDF instead of Q3 signed carrier addendum; failed 6-table join between SAP_INV and SFDC_CONTRACT.',
    cleanSource: 'Sabr AI Canonical Ontology (Entity-Resolved SKU + Signed PDF Carrier Addendum #408 + Governed SQL Metric)',
    cleanSQL: 'SELECT d.depot_id, s.sku_family, SUM(f.fuel_surcharge_delta) AS margin_impact_bps FROM sabr-ai_semantic.fact_margin_v4 ...',
    cleanOutput: '“Midwest Q3 gross margin dipped -242 bps (from 36.8% to 34.38%) due to two verified root causes: (1) -165 bps from cold-chain reefer fuel surcharges triggered under Carrier Addendum #408 (signed Aug 14, PDF p.4) on SKU family BIO-400 in Chicago & Detroit depots, and (2) -77 bps from unbilled expedited rebates on Enterprise Account #10492 (Acme Health).”',
    cleanMetrics: [
      { label: 'Chicago Depot (ORD-02)', val: '-148 bps (Addendum #408)' },
      { label: 'Detroit Depot (DTW-01)', val: '-94 bps (SKU BIO-400)' },
      { label: 'Provenance Confidence', val: '99.6% · 4 Auditable Citations' }
    ]
  },
  churn: {
    question: '“Which enterprise accounts renewing in the next 60 days have unresolved P1 engineering tickets and declining seat utilization?”',
    dirtySource: 'Salesforce Opportunities + Zendesk Raw JSON + Jira Issues + Product Telemetry',
    dirtyOutput: '“Account "GlobalTech Inc" and "Global Tech LLC" have open support tickets. Utilization looks healthy at 88%. Recommend standard renewal outreach.”',
    dirtyError: 'ENTITY SPLIT & PERMISSION LEAK: Failed to merge "GlobalTech Inc" (SFDC) with "Global-Tech-Prod" (Jira P1 outage); surfaced restricted HR table.',
    cleanSource: 'Sabr AI Golden Account Graph (SFDC + Jira + Zendesk + Snowflake Telemetry · Okta RBAC Enforced)',
    cleanSQL: 'MATCH (a:GoldenAccount)-[:HAS_TICKET]->(t:JiraIssue {priority:"P1", status:"OPEN"}) WHERE a.renewal_days <= 60 ...',
    cleanOutput: '“3 Enterprise renewals ($1.84M combined ARR) require immediate executive intervention before Nov 30: (1) GlobalTech ($740K ARR, renews in 28d) — 2 open P1 SSO latency bugs (JIRA-8821) + -34% weekly active seats over 21 days; (2) Vantara Bio ($620K ARR, 41d) — 1 P1 data export ticket in Slack #ext-vantara; (3) Northstar Logistics ($480K ARR, 54d) — -29% API volume.”',
    cleanMetrics: [
      { label: 'At-Risk Renewal ARR Identified', val: '$1.84M across 3 Golden Entities' },
      { label: 'Cross-Silo Entity Resolution', val: '4 Systems Unified (SFDC/Jira/Slack/DW)' },
      { label: 'RBAC Policy Check', val: 'PASSED · RevOps Role Scoped' }
    ]
  },
  supply: {
    question: '“Which Tier-1 suppliers serve both our US and EU plants, had >3% lot rejection rates last quarter, and have force-majeure clauses?”',
    dirtySource: 'Oracle NetSuite POs + SharePoint Legal MSAs (Scanned PDFs) + Plant QMS CSVs',
    dirtyOutput: '“We found 14 supplier MSAs mentioning force majeure in SharePoint. However, supplier IDs in plant quality CSVs use local vendor codes that do not map to legal entity names in SharePoint.”',
    dirtyError: 'BROKEN JOIN & OCR FAILURE: Vector search retrieved generic legal boilerplate; could not join vendor code V-9921 to MSA counterparty.',
    cleanSource: 'Sabr AI Hybrid GraphRAG + Layout-Aware PDF Table Parser + Master Vendor Ontology',
    cleanSQL: 'SELECT v.canonical_vendor_name, q.lot_reject_pct, msa.force_majeure_notice_days FROM sabr-ai_graph.vendor_360 ...',
    cleanOutput: '“2 dual-region Tier-1 suppliers breach the >3% defect threshold and carry restrictive force-majeure terms: (1) RheinMetall Precision GmbH (Vendor V-9921 / EU-402) — 4.6% lot rejection in Q3 across Ohio & Munich plants; MSA §14.2 allows 15-day supply halt without penalty. (2) Apex Polymer Corp — 3.4% rejection rate; MSA §11.4 caps liability at 1x monthly PO.”',
    cleanMetrics: [
      { label: 'Dual-Region High-Risk Vendors', val: '2 Suppliers ($14.2M Annual Spend)' },
      { label: 'MSA Clause Extraction', val: 'Layout-Parsed PDF §14.2 & §11.4' },
      { label: 'Query Execution Latency', val: '1.18 sec (Hybrid Graph + SQL)' }
    ]
  },
  board: {
    question: '“Generate our Q3 Board Financial & Operational Variance Packet with auditable GL line items and executive narrative.”',
    dirtySource: 'NetSuite GL + 18 Departmental Excel Models + FP&A Google Slides',
    dirtyOutput: '“EBITDA was either $11.2M or $12.8M depending on whether departmental spreadsheet v4_final.xlsx or NetSuite trial balance is used. Definitions of Net Revenue Retention vary across 3 decks.”',
    dirtyError: 'METRIC DRIFT: 3 conflicting formulas for NRR and Adjusted EBITDA across FP&A spreadsheets and BI dashboards.',
    cleanSource: 'Sabr AI Governed Metric Store + Automated Board Narrative Compiler',
    cleanSQL: 'EXECUTE sabr-ai_board.compile_variance_packet(quarter => "2026-Q3", audit_trail => TRUE);',
    cleanOutput: '“Q3 2026 GAAP Revenue reached $48.62M (+18.4% YoY, +$1.12M vs. Plan), with Adjusted EBITDA of $12.84M (26.4% margin). Net Dollar Retention locked at 114.2% under canonical board definition (GL-4000-4999). All 24 variance commentary bullets are hyperlinked directly to underlying NetSuite journal entries and Salesforce closed-won contracts.”',
    cleanMetrics: [
      { label: 'Board Packet Prep Time', val: 'Reduced from 9 Days → 4 Minutes' },
      { label: 'Metric Formula Drift', val: '0% (Single Canonical YAML Spec)' },
      { label: 'GL-to-Slide Lineage', val: '100% Cell-Level Audit Trail' }
    ]
  }
};

function initLLMSandbox() {
  const tabs = document.querySelectorAll('.sandbox-tab');
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
        <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(45,212,191,0.28);border-radius:8px;padding:0.55rem 0.75rem;">
          <div style="font-size:0.7rem;color:#94A3B8;font-family:var(--font-mono);">${m.label}</div>
          <div style="font-size:0.84rem;font-weight:700;color:#34D399;margin-top:0.15rem;">${m.val}</div>
        </div>
      `).join('');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderScenario(tab.getAttribute('data-scenario'));
    });
  });

  renderScenario('margin');
}

/* 6. Interactive Enterprise ROI & Data Readiness Savings Calculator */
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

    // Update slider labels
    const sVal = document.getElementById('roi-sources-val');
    const eVal = document.getElementById('roi-engineers-val');
    const dVal = document.getElementById('roi-docs-val');
    const qVal = document.getElementById('roi-queries-val');

    if (sVal) sVal.textContent = `${sources} Enterprise Systems`;
    if (eVal) eVal.textContent = `${engineers} Data / AI Engineers`;
    if (dVal) dVal.textContent = `${docsK.toLocaleString()}k Unstructured Docs`;
    if (qVal) qVal.textContent = `${queriesK.toLocaleString()}k Monthly Agent/LLM Queries`;

    // Model calculations based on 2026 Enterprise Benchmarks
    // Avg fully-loaded Data/AI Engineer = $215,000/yr; 48% time wasted on data janitoring & broken RAG debugging
    const annualEngSaved = Math.round(engineers * 215000 * 0.44);
    // Token & context pruning savings + executive reporting automation
    const contextComputeSaved = Math.round((queriesK * 12 * 1.45) + (sources * 6800) + (docsK * 290));
    const totalAnnualBenefit = annualEngSaved + contextComputeSaved;

    // Estimated Sabr AI investment (Audit + Turnkey Transformation amortized)
    const estInvestment = 85000 + (sources * 4500);
    const netROI = Math.round(((totalAnnualBenefit - estInvestment) / estInvestment) * 100);
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
        outTier.textContent = 'Recommended Start: Tier 1 (14-Day Data Readiness Audit — $18,500) → Core Sabr AI Foundation';
      } else if (sources <= 14) {
        outTier.textContent = 'Recommended Start: Tier 1 Diagnostic Sprint → Tier 2 Turnkey Sabr AI Transformation ($75k–$125k)';
      } else {
        outTier.textContent = 'Recommended Start: Enterprise Multi-Domain Sabr AI Transformation + Tier 3 Managed Stewardship';
      }
    }
  }

  [sourcesInput, engineersInput, docsInput, queriesInput].forEach(el => {
    if (el) el.addEventListener('input', updateROI);
  });

  updateROI();
}

/* 7. Multi-Page Contact & Data Readiness Intake Form Handler */
function initContactForms() {
  const forms = document.querySelectorAll('.sabr-contact-form');
  if (forms.length === 0) return;

  // Populate from query string if present (e.g. ?tier=audit)
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

      // Save locally so user can inspect or export submissions
      const existing = JSON.parse(localStorage.getItem('sabr_sabr-ai_leads') || '[]');
      existing.unshift(submission);
      localStorage.setItem('sabr_sabr-ai_leads', JSON.stringify(existing));

      // Compute instant readiness preview score
      const complexityScore = Math.min(96, 62 + (sources.length * 4));

      const feedbackBox = form.querySelector('.form-submission-result');
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.innerHTML = `
          <div style="background:rgba(16,185,129,0.12);border:1px solid rgba(45,212,191,0.45);border-radius:14px;padding:1.5rem;margin-top:1.25rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;margin-bottom:0.75rem;">
              <span style="font-family:var(--font-mono);font-size:0.78rem;color:#34D399;font-weight:700;">
                ✓ INTAKE BRIEF RECEIVED · REF #${submission.id}
              </span>
              <span style="font-family:var(--font-mono);font-size:0.75rem;background:rgba(99,102,241,0.2);color:#A5B4FC;padding:0.2rem 0.6rem;border-radius:999px;">
                Est. ROI Fit Score: ${complexityScore}/100
              </span>
            </div>
            <h4 style="font-size:1.12rem;margin-bottom:0.45rem;color:var(--text-primary);">
              Thank you, ${escapeHtml(submission.fullName)} — Sabr Systems Engineering has queued your Data Readiness Dossier.
            </h4>
            <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:1rem;">
              A Senior Partner (Ivy League Data & AI Architecture Lead) will review your <strong>${escapeHtml(submission.company)}</strong> stack (${escapeHtml(submission.dataSources.join(', '))}) and respond to <strong>${escapeHtml(submission.workEmail)}</strong> within 4 business hours with a custom architecture schematic and 14-Day Sprint scope.
            </p>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
              <a href="mailto:intake@sabrsystems.com?subject=${encodeURIComponent('Sabr AI Data Readiness Inquiry [' + submission.id + '] - ' + submission.company)}&body=${encodeURIComponent(
                'Reference ID: ' + submission.id + '\n' +
                'Name: ' + submission.fullName + ' (' + submission.role + ')\n' +
                'Company: ' + submission.company + '\n' +
                'Email: ' + submission.workEmail + '\n' +
                'Preferred Engagement: ' + submission.engagementTier + '\n' +
                'Primary Objective: ' + submission.primaryGoal + '\n' +
                'Data Sources: ' + submission.dataSources.join(', ') + '\n' +
                'Notes: ' + submission.notes
              )}" class="btn btn-primary btn-sm">
                Open Pre-Filled Direct Email to Sabr Systems →
              </a>
              <button type="button" class="btn btn-secondary btn-sm" onclick="downloadIntakeBrief('${submission.id}')">
                Download JSON Intake Receipt
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
