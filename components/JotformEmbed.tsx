"use client";

import { useCallback } from "react";
import Script from "next/script";

const EMBED_HANDLER_SRC =
  "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
const JOTFORM_ORIGIN = "https://form.jotform.com/";

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, origin: string) => void;
  }
}

/**
 * Embeds a Jotform using Jotform's official embed handler, which listens for
 * height messages from the form and resizes the iframe to match. The `height`
 * below is only a first paint value — once the handler attaches, the iframe
 * grows and shrinks with the form, so multi-page forms are never clipped and
 * never leave dead space.
 *
 * next/script de-duplicates by `src`, so the handler is fetched once per page
 * no matter how many embeds render. `onReady` (rather than `onLoad`) fires on
 * every mount including cached-script mounts, which is what re-attaches the
 * handler on client-side navigation between form pages.
 */
export default function JotformEmbed({
  formId,
  title,
}: {
  formId: string;
  title: string;
}) {
  const iframeId = `JotFormIFrame-${formId}`;

  const attachHandler = useCallback(() => {
    window.jotformEmbedHandler?.(`iframe[id='${iframeId}']`, JOTFORM_ORIGIN);
  }, [iframeId]);

  return (
    <>
      <iframe
        id={iframeId}
        title={title}
        src={`${JOTFORM_ORIGIN}${formId}`}
        allow="geolocation; microphone; camera; fullscreen; payment"
        allowTransparency
        scrolling="no"
        className="block w-full border-0"
        style={{ minWidth: "100%", maxWidth: "100%", height: 539 }}
      />
      <Script
        src={EMBED_HANDLER_SRC}
        strategy="afterInteractive"
        onReady={attachHandler}
      />
    </>
  );
}
