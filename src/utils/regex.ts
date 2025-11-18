/**
 * Removes any HTML tags such as <script>, <img>, <div>, etc.
 */
export const HTML_TAG_REGEX = /<[^>]*>?/gm;

/**
 * Matches any character that is NOT:
 *  - A–Z
 *  - a–z
 *  - 0–9
 *  - underscore (_)
 *  - hyphen (-)
 *  - space ( )
 */
export const NON_ALPHANUMERIC_BASIC_REGEX = /[^a-zA-Z0-9 _-]/g;
