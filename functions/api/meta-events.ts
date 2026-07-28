/**
 * R36, the server half of Meta CAPI, as a Cloudflare Pages Function.
 *
 * NO-OP SAFE BY DESIGN. When `META_PIXEL_ID` or `META_CAPI_ACCESS_TOKEN` is
 * missing from the Pages environment this returns 204 and does nothing. It
 * never throws, never fails the build, and never blocks a render. The client
 * fires this fire-and-forget, so even a 500 would be invisible, but we return
 * 204 anyway so the absence of tracking is not logged as an error.
 *
 * The `eventId` is generated in the browser and sent here unchanged, which is
 * what lets Meta dedupe the browser event against this server event.
 */

type Env = {
  META_PIXEL_ID?: string;
  META_CAPI_ACCESS_TOKEN?: string;
  META_TEST_EVENT_CODE?: string;
};

type Body = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
};

/** SHA-256 hex, the hashing Meta requires for any user identifier. */
async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Typed locally rather than via `PagesFunction<Env>` from
 * @cloudflare/workers-types. Pulling those globals into the Next tsconfig
 * collides with the DOM lib the app is compiled against, and this Function is
 * bundled by wrangler, not by Next, so the shared types buy nothing here.
 */
type PagesContext = { request: Request; env: Env };

export const onRequestPost = async ({
  request,
  env,
}: PagesContext): Promise<Response> => {
  const pixelId = env.META_PIXEL_ID;
  const token = env.META_CAPI_ACCESS_TOKEN;

  // the whole point of this rule: absent config is a silent skip, not a failure
  if (!pixelId || !token) {
    return new Response(null, { status: 204 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return new Response(null, { status: 204 });
  }

  const eventName = body.eventName || "PageView";
  const eventId = body.eventId;
  if (!eventId) return new Response(null, { status: 204 });

  try {
    const ip = request.headers.get("cf-connecting-ip") ?? "";
    const ua = request.headers.get("user-agent") ?? "";

    const payload: Record<string, unknown> = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: body.eventSourceUrl ?? request.headers.get("referer") ?? "",
          action_source: "website",
          user_data: {
            client_ip_address: ip,
            client_user_agent: ua,
            ...(ip ? { ph: [await sha256(ip)] } : {}),
          },
        },
      ],
    };

    if (env.META_TEST_EVENT_CODE) {
      payload.test_event_code = env.META_TEST_EVENT_CODE;
    }

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    // a rejected event is a tracking problem, never a visitor facing one
    return new Response(null, { status: res.ok ? 204 : 202 });
  } catch {
    return new Response(null, { status: 204 });
  }
};
