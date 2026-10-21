/** Inlined in the document head so the form and hero paint without an extra stylesheet request. */
export const claimCriticalCss = `/* Stable, non-hashed CSS so Clarity recordings and in-app WebViews still see the form if a Next chunk fails. */
#claim .claim-form-shell {
  background: #fefefe;
  margin-inline: auto;
  text-align: left;
  width: 100%;
  max-width: 1100px;
  border-radius: 24px;
}

#claim .claim-form-shell[data-expanded="true"] {
  max-width: 1550px;
}

#claim .claim-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 72px;
  background: #fefefe;
}

#claim .claim-stepper-steps {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

#claim .claim-primary-btn,
#claim button[data-gtm^="claim_step"] {
  min-height: 44px;
  touch-action: manipulation;
}

#claim button:not(:disabled):active,
#claim [type="button"]:not(:disabled):active {
  filter: brightness(0.92);
}

#claim input[type="file"].claim-native-file {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

html.needs-cookie-banner footer,
body.has-cookie-banner footer {
  padding-bottom: var(--cookie-banner-offset, 0px);
}

/* Paint the hero before Tailwind arrives, so the white title is not sitting on white. */
.hero-lcp {
  position: relative;
  overflow: hidden;
  background-color: #1d53cd;
}

.hero-lcp-media,
.hero-lcp-media img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.hero-lcp-media {
  overflow: hidden;
  pointer-events: none;
}

.hero-lcp-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;
