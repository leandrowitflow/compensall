"use client";

import { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CLAIM_CONTINUE_PENDING_CLASS, CLAIM_CONTINUE_QUERY } from "@/lib/claim-return";
import { COOKIE_BANNER_PENDING_CLASS, COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";

const earlyDocumentScript = `try{if(!localStorage.getItem(${JSON.stringify(COOKIE_CONSENT_STORAGE_KEY)}))document.documentElement.classList.add(${JSON.stringify(COOKIE_BANNER_PENDING_CLASS)})}catch(e){}try{if(new URLSearchParams(location.search).get(${JSON.stringify(CLAIM_CONTINUE_QUERY)})==="1")document.documentElement.classList.add(${JSON.stringify(CLAIM_CONTINUE_PENDING_CLASS)})}catch(e){}`;

/** Runs before paint, without a script tag inside the client React tree. */
export default function EarlyDocumentScripts() {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script dangerouslySetInnerHTML={{ __html: earlyDocumentScript }} />;
  });

  return null;
}
