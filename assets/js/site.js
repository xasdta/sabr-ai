const D = [
 { q:"Why did our Q3 net margin drop in the Midwest region? Flag any product lines below our 30% target.",
   bs:"MySQL orders_db.tbl_ord_hdr + SQL Server finance_db.gl_post_v2",
   bo:"“Orders are in MySQL and ledger costs are in SQL Server, so I can’t query both at once. Columns AMT_1 and NET_VAL_B aren’t defined, and scanning 18M rows timed out on your production database.”",
   bw:"✗ Disjointed databases · undefined columns · row-by-row scan on production",
   gs:"Mapped catalog + analytical store (MySQL & SQL Server unified)",
   go:"“Midwest Q3 net margin fell 2.42 points (36.80% → 34.38%). The two drivers were cold-chain freight surcharges (ADJ_CD=7) on product line BIO-400 and tier-3 discounts.”",
   ga:"✓ 18.4M rows scanned in 42 ms · Agent opened a pricing review for 3 contracts below 30%" },
 { q:"Which accounts renewing next quarter had a 25%+ usage drop in the last 30 days? Start the account-save workflow.",
   bs:"PostgreSQL billing_db.sub_hist + MySQL app_prod.user_events",
   bo:"“I can’t join the subscription table with 90M event rows without timing out. CUST_NO (integer) doesn’t match WORKSPACE_UID (string), and STAT_FLG = 2 isn’t documented.”",
   bw:"✗ Mismatched IDs · undocumented status codes · 90M-row scan on production",
   gs:"Bridged CUST_NO ↔ WORKSPACE_UID · usage events streamed into the analytical store",
   go:"“3 accounts ($1.84M combined ARR) renewing in the next 60 days are down 29–34% on seats, logins or API calls.”",
   ga:"✓ 90M events scanned in 65 ms · Agent sent retention briefs to all 3 account owners" },
 { q:"Compare open orders with warehouse stock and draft purchase orders for items at risk of running out.",
   bs:"MySQL ecom_db.open_orders + SQL Server wms_db.wh_stk_bal",
   bo:"“Warehouse columns QTY_A, QTY_B and QTY_R aren’t defined, and open orders in MySQL can’t be compared with supplier lead times.”",
   bw:"✗ Undefined quantity columns · isolated databases · no action layer",
   gs:"Defined QTY_A − QTY_R = sellable stock · orders + warehouse joined",
   go:"“14 fast-moving SKUs across 2 warehouses have less stock than their supplier lead time ($940K order exposure).”",
   ga:"✓ Agent drafted 14 purchase orders for one-click manager approval" },
 { q:"Give every department head self-serve access to their KPIs and compile the monthly executive variance report.",
   bs:"SQL Server FIN_GL + PostgreSQL SLS_PIPE + MySQL APP_METRICS",
   bo:"“Each department uses different calendars, account IDs and revenue formulas. Direct AI access could expose restricted payroll and finance columns and overload production.”",
   bw:"✗ Conflicting formulas · no column-level security · production overload risk",
   gs:"Official KPI formulas locked · role-based column security · analytical store",
   go:"“October recognized revenue was $4.86M (+18.4% YoY, $112K above budget), and operating profit was $1.28M (26.4% margin).”",
   ga:"✓ Report compiled automatically · each department head sees only their permitted data" }
];
const $=id=>document.getElementById(id);
function show(i){const d=D[i];document.querySelectorAll('.tab').forEach(t=>t.setAttribute('aria-selected',t.dataset.i==i));
 $('d-q').textContent=d.q;$('d-bs').textContent=d.bs;$('d-bo').textContent=d.bo;$('d-bw').textContent=d.bw;
 $('d-gs').textContent=d.gs;$('d-go').textContent=d.go;$('d-ga').textContent=d.ga;}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>show(+t.dataset.i)));show(0);
// Contact form: opens the visitor's email app with their details pre-filled
const form=document.querySelector('.form');
form.addEventListener('submit',e=>{
 e.preventDefault();
 const f=form.elements,v=n=>f[n].value.trim();
 const body=['Name: '+v('name'),'Work email: '+v('email'),'Company: '+v('company'),'Role: '+v('role'),'Data today: '+v('data'),'','What we want AI agents to do:',v('goal')].join('\n');
 window.location.href='mailto:intake@sabrsystems.com?subject='+encodeURIComponent('Sabr AI 14-Day Audit Request: '+v('company'))+'&body='+encodeURIComponent(body);
 form.querySelector('.form-note').textContent='Your email app should open with your details filled in. If it doesn’t, email intake@sabrsystems.com directly.';
});
