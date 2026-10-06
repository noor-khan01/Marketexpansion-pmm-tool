/**
 * Country name → flag emoji, for UX-04 ("Country names always shown with
 * flag emoji"). Covers the seed launches (UK/Germany/France) plus a broad
 * set of markets a duplicated launch is likely to target. Falls back to a
 * neutral white flag when a country isn't in the table, rather than
 * guessing at an ISO code.
 */
const COUNTRY_FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  France: "🇫🇷",
  Ireland: "🇮🇪",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Portugal: "🇵🇹",
  Netherlands: "🇳🇱",
  Belgium: "🇧🇪",
  Luxembourg: "🇱🇺",
  Switzerland: "🇨🇭",
  Austria: "🇦🇹",
  Denmark: "🇩🇰",
  Sweden: "🇸🇪",
  Norway: "🇳🇴",
  Finland: "🇫🇮",
  Poland: "🇵🇱",
  "Czech Republic": "🇨🇿",
  Hungary: "🇭🇺",
  Romania: "🇷🇴",
  Greece: "🇬🇷",
  "United States": "🇺🇸",
  Canada: "🇨🇦",
  Mexico: "🇲🇽",
  Brazil: "🇧🇷",
  Argentina: "🇦🇷",
  Australia: "🇦🇺",
  "New Zealand": "🇳🇿",
  Japan: "🇯🇵",
  "South Korea": "🇰🇷",
  China: "🇨🇳",
  India: "🇮🇳",
  Singapore: "🇸🇬",
  "United Arab Emirates": "🇦🇪",
  "Saudi Arabia": "🇸🇦",
  Israel: "🇮🇱",
  "South Africa": "🇿🇦",
  Nigeria: "🇳🇬",
  Kenya: "🇰🇪",
  Turkey: "🇹🇷",
  Indonesia: "🇮🇩",
  Vietnam: "🇻🇳",
  Philippines: "🇵🇭",
  Thailand: "🇹🇭",
  Malaysia: "🇲🇾",
};

/** Looks up a country's flag emoji, falling back to a neutral white flag. */
export function getFlag(country: string): string {
  return COUNTRY_FLAGS[country] ?? "🏳️";
}
