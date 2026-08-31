const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Returns an absolute http(s) href, or null when the value is missing,
 * unparseable, or carries a scheme that would execute on click
 * (javascript:, data:). Link values come from the API, so the scheme is
 * never assumed.
 */
export function safeExternalHref(link: string | null | undefined) {
  if (!link) return null;

  try {
    const url = new URL(link);
    return SAFE_PROTOCOLS.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
