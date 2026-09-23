/** Facebook / Instagram / other in-app browsers that host the page in a native WebView. */
export function isInAppBrowser(userAgent = ""): boolean {
  return /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|Twitter|LinkedInApp|Snapchat|Pinterest|BytedanceWebview|TikTok|musical_ly|; wv\)|WebView/i.test(
    userAgent,
  );
}

export function isWebViewBridgeNoise(message: string): boolean {
  return /java object is gone|java exception was raised|error invoking postmessage/i.test(message);
}
