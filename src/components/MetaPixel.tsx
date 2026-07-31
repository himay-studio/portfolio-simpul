"use client";

import Script from "next/script";
import { useEffect } from "react";
import { SITE } from "@/lib/site";

/**
 * R36, Meta Pixel plus the client half of CAPI dedup.
 *
 * NO-OP SAFE IS THE POINT. When `NEXT_PUBLIC_META_PIXEL_ID` is absent this
 * component renders nothing, throws nothing, and blocks nothing. The build and
 * the deploy must never fail because a tracking env var was not set, which is
 * why every branch here exits early instead of asserting.
 *
 * The server half lives in `functions/api/meta-events.ts` and shares the same
 * `eventID` so Meta can dedupe the browser event against the server event.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** stable per pageview, shared with the server event for dedup */
function makeEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `evt-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return;

    const eventID = makeEventId();

    // HIM-356: same portfolio_category payload on both the Pixel PageView
    // params and the CAPI custom_data below, so a category-absent site sends
    // `{}` to both rather than an empty string or a literal "undefined".
    const categoryData: { portfolio_category?: string } = SITE.category
      ? { portfolio_category: SITE.category }
      : {};

    // browser side
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    w.fbq?.("track", "PageView", categoryData, { eventID });

    // server side, same eventID. Fire and forget, and swallow every failure:
    // a missing CAPI token returns 204 from the Function and must not surface.
    fetch("/api/meta-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        eventName: "PageView",
        eventId: eventID,
        eventSourceUrl: window.location.href,
        customData: categoryData,
      }),
      keepalive: true,
    }).catch(() => {
      /* tracking must never surface an error to the visitor */
    });
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');`}
    </Script>
  );
}
