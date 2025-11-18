import { HTML_TAG_REGEX, NON_ALPHANUMERIC_BASIC_REGEX } from "./regex.ts";

// Removes HTML tags and any unsafe character for payment ID search.
export const sanitizeInput = (value: string): string => {
  const noHtml = value.replace(HTML_TAG_REGEX, "");
  const sanitized = noHtml.replace(NON_ALPHANUMERIC_BASIC_REGEX, "");
  return sanitized.trim();
};
