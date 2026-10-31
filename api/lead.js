// Audit request intake: validates the form, stores each lead as a private
// JSON file in the sabr-ai-leads Blob store, and optionally emails a
// notification when RESEND_API_KEY and LEAD_NOTIFY_EMAIL are configured.
import { put } from '@vercel/blob';

const LIMITS = { name: 120, email: 200, company: 160, role: 80, data: 120, goal: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function POST(request) {
  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot: real visitors never see or fill this field
  if (input.website) return json({ ok: true });

  const lead = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    lead[key] = String(input[key] ?? '').trim().slice(0, max);
  }
  if (!lead.name || !lead.company || !EMAIL_RE.test(lead.email)) {
    return json({ ok: false, error: 'Please include your name, a valid work email, and your company.' }, 400);
  }

  const now = new Date();
  const id = crypto.randomUUID().slice(0, 8);
  const record = {
    id,
    receivedAt: now.toISOString(),
    ...lead,
    userAgent: request.headers.get('user-agent') || '',
  };

  try {
    await put(`leads/${now.toISOString().slice(0, 10)}/${now.getTime()}-${id}.json`, JSON.stringify(record, null, 2), {
      access: 'private',
      contentType: 'application/json',
      addRandomSuffix: false,
    });
  } catch (err) {
    console.error('lead storage failed', err);
    return json({ ok: false, error: 'Could not save your request.' }, 500);
  }

  await notify(record).catch(err => console.error('lead notification failed', err));
  return json({ ok: true, id });
}

async function notify(record) {
  const { RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_NOTIFY_EMAIL) return;

  const text = [
    `New 14-Day Audit request (${record.id})`,
    '',
    `Name: ${record.name}`,
    `Work email: ${record.email}`,
    `Company: ${record.company}`,
    `Role: ${record.role}`,
    `Data today: ${record.data}`,
    '',
    'What they want AI agents to do:',
    record.goal || '(not provided)',
    '',
    `Received: ${record.receivedAt}`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL || 'Sabr AI Leads <onboarding@resend.dev>',
      to: LEAD_NOTIFY_EMAIL.split(',').map(s => s.trim()),
      reply_to: record.email,
      subject: `Audit request: ${record.company} (${record.name})`,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}
