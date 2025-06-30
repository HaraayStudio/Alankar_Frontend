// src/utils/printUtils.js
import PRINT_PRICES from "../../printprices";

// Get the print groups (Media, Lamination, Mounting, etc.) for the current selection
export function getStepGroups(clientType, orderType, printType) {
  return (
    PRINT_PRICES.clientTypes?.[clientType]?.orderTypes?.[orderType]?.printTypes?.[printType] || {}
  );
}

// Get the option array for a group
export function getOptionsArray(stepGroups, group) {
  return stepGroups?.[group] || [];
}

// Get cost for a step group option
export function getOptionCost(stepGroups, group, option) {
  const arr = stepGroups[group];
  if (!Array.isArray(arr)) return 0;
  const found = arr.find((o) => o.name === option);
  if (!found) return 0;
  // Support CMYK if needed else just cost
  if (typeof found.cost === "number") return found.cost;
  if (typeof found.costCMYK === "number") return found.costCMYK;
  return 0;
}

// Build description: "Eco solvent + Vinyl - lamination:Matt + mounting:5mm foam sheet"
export function buildDesc(printType, selections) {
  let desc = printType;
  if (selections?.Media) {
    desc += " + " + selections.Media;
  }
  let reqArr = [];
  Object.entries(selections)
    .filter(([g]) => g !== "Media" && g !== "qty")
    .forEach(([group, value]) => {
      reqArr.push(`${group.toLowerCase()}:${value}`);
    });
  if (reqArr.length) desc += " - " + reqArr.join(" + ");
  return desc;
}

// Calculate total amount
export function calcAmount(stepGroups, selections, qty, unitPrice) {
  // if custom unitPrice given, multiply directly
  if (unitPrice && Number(unitPrice) > 0) return qty * unitPrice;
  let sum = 0;
  Object.entries(selections).forEach(([group, value]) => {
    if (!value) return;
    if (group === "qty") return;
    if (Array.isArray(value)) {
      value.forEach((v) => {
        sum += getOptionCost(stepGroups, group, v);
      });
    } else {
      sum += getOptionCost(stepGroups, group, value);
    }
  });
  return sum * qty;
}
