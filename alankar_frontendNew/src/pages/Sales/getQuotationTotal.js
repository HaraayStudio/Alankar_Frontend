/**
 * Parse requirements and sum prices from PRINT_PRICES.
 * @param {string} requirements - Comma-separated or space-separated requirements.
 * @param {object} prices - The PRINT_PRICES object.
 * @param {string} clientType - "Cash" | "Online" | "Printers"
 * @param {string} orderType - eg. "Wide format printing"
 * @param {string} printType - eg. "Eco solvent"
 * @returns {number} - The calculated total.
 */
export function getQuotationTotal(requirements, prices, clientType, orderType, printType) {
  if (!requirements || !prices || !clientType || !orderType || !printType) return 0;
  // Defensive
  const group = prices.clientTypes[clientType]
    ?.orderTypes?.[orderType]
    ?.printTypes?.[printType];
  if (!group) return 0;
  // Split requirements: comma, and, or, newline, semicolon
  const reqArr = requirements
    .split(/,|and|or|\n|;/gi)
    .map(x => x.trim())
    .filter(Boolean);
  let total = 0;
  reqArr.forEach(req => {
    // Look in all keys: Media, Lamination, Mounting, Installation, Framing
    ["Media", "Lamination", "Mounting", "Installation", "Framing"].forEach(cat => {
      const arr = group[cat];
      if (!Array.isArray(arr)) return;
      arr.forEach(item => {
        // For UV Print, handle costCMYK/costCMYKW:
        if (item.name && req.toLowerCase().includes(item.name.toLowerCase())) {
          if (typeof item.cost === "number") total += item.cost;
          else if (typeof item.costCMYK === "number") total += item.costCMYK;
          // (If you want to handle CMYKW, you can add logic here)
        }
      });
    });
  });
  return total;
}
