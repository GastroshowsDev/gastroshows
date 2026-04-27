/**
 * Mailrelay API v2 client
 *
 * Env vars required:
 *   MAILRELAY_API_KEY   — API key from Mailrelay → Integrations → API
 *   MAILRELAY_BASE_URL  — e.g. https://myaccount.ipzmarketing.com
 *   MAILRELAY_GROUP_ID  — numeric ID of the subscriber group/list
 */

const API_KEY = process.env.MAILRELAY_API_KEY ?? "";
const BASE_URL = (process.env.MAILRELAY_BASE_URL ?? "").replace(/\/$/, "");
const GROUP_ID = process.env.MAILRELAY_GROUP_ID ? Number(process.env.MAILRELAY_GROUP_ID) : null;

function isConfigured(): boolean {
  return !!(API_KEY && BASE_URL && GROUP_ID);
}

function apiHeaders(): Record<string, string> {
  return { "X-AUTH-TOKEN": API_KEY, "Content-Type": "application/json" };
}

type MailrelaySubscriber = { id: number; email: string; name: string; status: string };

async function findByEmail(email: string): Promise<MailrelaySubscriber | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v2/subscribers?email=${encodeURIComponent(email)}`,
      { headers: apiHeaders() },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as MailrelaySubscriber[];
    return data[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Subscribe a contact to the default Mailrelay group.
 * Idempotent: reactivates if already unsubscribed; no-ops if already active.
 */
export async function mailrelaySubscribe(
  email: string,
  name: string,
  customFields?: Record<string, any>
): Promise<void> {
  if (!isConfigured()) {
    console.warn("[mailrelay] Not configured — skipping subscribe for", email);
    return;
  }
  try {
    const existing = await findByEmail(email);
    if (existing) {
      if (existing.status !== "active") {
        await fetch(`${BASE_URL}/api/v2/subscribers/${existing.id}`, {
          method: "PUT",
          headers: apiHeaders(),
          body: JSON.stringify({
            status: "active",
            packages_group_ids: [GROUP_ID],
            ...(customFields && { custom_fields: customFields }),
          }),
        });
      }
      return;
    }
    await fetch(`${BASE_URL}/api/v2/subscribers`, {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({
        email,
        name,
        status: "active",
        packages_group_ids: [GROUP_ID],
        ...(customFields && { custom_fields: customFields }),
      }),
    });
  } catch (err) {
    console.error("[mailrelay] subscribe error:", err);
  }
}

/**
 * Unsubscribe a contact by email.
 */
export async function mailrelayUnsubscribe(email: string): Promise<void> {
  if (!isConfigured()) return;
  try {
    const existing = await findByEmail(email);
    if (!existing) return;
    await fetch(`${BASE_URL}/api/v2/subscribers/${existing.id}`, {
      method: "PUT",
      headers: apiHeaders(),
      body: JSON.stringify({ status: "unsubscribed" }),
    });
  } catch (err) {
    console.error("[mailrelay] unsubscribe error:", err);
  }
}
