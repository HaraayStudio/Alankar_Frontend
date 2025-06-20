import PRINT_PRICES from "../../printprices";
/**
 * Get total price from presale.material, presale.requirements, and presale.clientType/orderType
 */
export function getQuotationTotalV2(material, requirements, PRINT_PRICES, clientType = "Cash", orderType = "Wide format printing") {
  let total = 0;
  // --- Parse Material: "Eco solvent + Vinyl" ---
  let printType = "";
  let media = "";
  if (material && typeof material === "string") {
    const parts = material.split(" + ");
    if (parts.length >= 2) {
      printType = parts[0].trim();
      media = parts[1].trim();
    }
  }
  // Get unit price for printType+media
  if (printType && media) {
    const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
    const mediaArr = ptObj?.Media || [];
    const mediaObj = mediaArr.find(item => item.name?.toLowerCase() === media.toLowerCase());
    if (mediaObj && mediaObj.cost) {
      total += Number(mediaObj.cost);
    }
  }
  // --- Parse Requirements ---
  // Example: "lamination: matt + mounting:3mm Foam sheet + installation:Drilling on wall + framing:No frame"
  if (requirements && typeof requirements === "string") {
    requirements.split("+").map(s => s.trim()).forEach(groupStr => {
      if (!groupStr) return;
      const [groupRaw, valueRaw] = groupStr.split(":").map(s => s.trim());
      const group = groupRaw.charAt(0).toUpperCase() + groupRaw.slice(1).toLowerCase(); // Lamination, Mounting, etc
      const value = valueRaw || "";
      if (printType && group && value) {
        const ptObj = PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType];
        const groupArr = ptObj?.[group] || [];
        const valObj = groupArr.find(item => item.name?.toLowerCase() === value.toLowerCase());
        if (valObj && valObj.cost) {
          total += Number(valObj.cost);
        }
      }
    });
  }
  return total;
}
