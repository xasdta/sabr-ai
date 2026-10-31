// Prints every audit request stored in the sabr-ai-leads Blob store, newest first.
// Usage: vercel env pull && npm run leads
import { get, list } from '@vercel/blob';

const blobs = [];
let cursor;
do {
  const page = await list({ prefix: 'leads/', cursor });
  blobs.push(...page.blobs);
  cursor = page.hasMore ? page.cursor : undefined;
} while (cursor);

blobs.sort((a, b) => b.pathname.localeCompare(a.pathname));
if (!blobs.length) console.log('No leads yet.');

for (const blob of blobs) {
  const res = await get(blob.pathname, { access: 'private' });
  const lead = JSON.parse(await new Response(res.stream).text());
  console.log(`\n${lead.receivedAt}  ${lead.company}  (${lead.id})`);
  console.log(`  ${lead.name} <${lead.email}> · ${lead.role}`);
  console.log(`  Data: ${lead.data}`);
  if (lead.goal) console.log(`  Goal: ${lead.goal.replace(/\n/g, '\n        ')}`);
}
