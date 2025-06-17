// // src/data/printPrices.js
// const PRINT_PRICES = {
//   clientTypes: {
//     Cash: {
//       printTypes: {
//         "Eco solvent": {
//           Media: [
//             { name: "Vinyl", cost: 30 },
//             { name: "Cast Vinyl", cost: 80 },
//             { name: "Clear vinyl", cost: 30 },
//             { name: "One way vision", cost: 40 },
//             { name: "Frosted Film", cost: 50 },
//             { name: "Translite Film", cost: 70 },
//             { name: "Fabric cloth", cost: 80 },
//             { name: "Backlit fabric", cost: 100 },
//             { name: "2 year Vinyl", cost: 100 },
//             { name: "Canvas Eco", cost: 100 },
//             { name: "Texture Vinyl", cost: 80 },
//             { name: "PP vinyl", cost: 40 },
//             { name: "Wallpaper", cost: 80 },
//             { name: "Glossy Photo paper", cost: 50 },
//             { name: "Radium", cost: 80 },
//             { name: "Retro Chinese", cost: 60 },
//             { name: "Retro 3M", cost: 150 },
//             { name: "Star flex eco", cost: 25 }
//           ],
//           Lamination: [
//             { name: "No lamination", cost: 0 },
//             { name: "Matt", cost: 10 },
//             { name: "Glossy", cost: 10 },
//             { name: "Sparkle", cost: 15 },
//             { name: "Two year outdoor", cost: 20 },
//             { name: "Both side gumming", cost: 30 },
//             { name: "Floor Lamination", cost: 70 }
//           ],
//           Mounting: [
//             { name: "3mm Foam sheet", cost: 20 },
//             { name: "5mm foam sheet", cost: 25 },
//             { name: "8mm foam sheet", cost: 120 },
//             { name: "10mm foam sheet", cost: 150 },
//             { name: "Bubble guard", cost: 20 },
//             { name: "Acrylic 3mm", cost: 150 },
//             { name: "Acrylic 5mm", cost: 200 },
//             { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
//             { name: "Sunpack 5MM", cost: 20 },
//             { name: "ACP sheet", cost: 70 },
//             { name: "Poly carbonate clear sheet", cost: 70 },
//             { name: "Poly carbonate white sheet", cost: 80 },
//             { name: "Bubbleguard sheet 600gsm", cost: 20 },
//             { name: "Bubbleguard sheet 900gsm", cost: 25 }
//           ],
//           Installation: [
//             { name: "Drilling on wall", cost: "30 PER SQFT" },
//             { name: "Pasting on site", cost: "20 PER SQFT" },
//             { name: "Rolled prints only", cost: "-" }
//           ],
//           Framing: [
//             { name: "No frame", cost: 0 },
//             { name: "Half inch frame", cost: "150 per sqft" },
//             { name: "1inch frame", cost: "170 per sqft" },
//             { name: "2inch Frame", cost: "230 per sqft" }
//           ]
//         },
//         "Solvent": {
//           Media: [
//             { name: "Vinyl", cost: 20 },
//             { name: "Star flex", cost: 20 },
//             { name: "Black back flex", cost: 15 },
//             { name: "Flex", cost: 12 }
//           ],
//           Lamination: [
//             { name: "No lamination", cost: 0 },
//             { name: "Matt", cost: 10 },
//             { name: "Glossy", cost: 10 }
//           ],
//           Mounting: [
//             { name: "3mm Foam sheet", cost: 20 },
//             { name: "5mm foam sheet", cost: 25 },
//             { name: "Metal frame", cost: 50 }
//           ]
//         },
//         "UV Print": {
//           Media: [
//             { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
//             { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
//             { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
//             { name: "One way vision", costCMYK: 60, costCMYKW: null },
//             { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
//             { name: "Translite Film", costCMYK: 100, costCMYKW: null },
//             { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
//             { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
//             { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
//             { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
//             { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
//             { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
//             { name: "Radium", costCMYK: 120, costCMYKW: 150 },
//             { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
//             { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
//             { name: "ACP", costCMYK: 100, costCMYKW: 150 },
//             { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
//             { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
//             { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
//             { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
//             { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
//             { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
//             { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
//             { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
//           ],
//           Lamination: [
//             { name: "No lamination", cost: 0 },
//             { name: "Matt", cost: 10 },
//             { name: "Glossy", cost: 10 },
//             { name: "Sparkle", cost: 15 },
//             { name: "Two year outdoor", cost: 30 },
//             { name: "Both side gumming", cost: 30 },
//             { name: "Floor Lamination", cost: 70 }
//           ],
//           Installation: [
//             { name: "Drilling on wall", cost: "30 PER SQFT" },
//             { name: "Pasting on site", cost: "20 PER SQFT" },
//             { name: "Rolled prints only", cost: "-" }
//           ],
//           Framing: [
//             { name: "No frame", cost: 0 },
//             { name: "Half inch frame", cost: "150 per sqft" },
//             { name: "1inch frame", cost: "170 per sqft" },
//             { name: "2inch Frame", cost: "230 per sqft" }
//           ]
//         },
//         "Canon 12 colour": {
//           Media: [
//             { name: "PP vinyl canon", cost: 50 },
//             { name: "Glossy photo paper", cost: 60 },
//             { name: "Pro luster paper", cost: 70 },
//             { name: "Matt photo paper", cost: 60 },
//             { name: "Canvas", cost: 150 }
//           ],
//           Lamination: [
//             { name: "No lamination", cost: 0 },
//             { name: "Matt", cost: 10 },
//             { name: "Glossy", cost: 10 },
//             { name: "Sparkle", cost: 15 }
//           ],
//           Mounting: [
//             { name: "3mm Foam sheet", cost: 20 },
//             { name: "5mm foam sheet", cost: 25 },
//             { name: "8mm foam sheet", cost: 120 },
//             { name: "10mm foam sheet", cost: 150 },
//             { name: "Bubble guard", cost: 20 }
//           ],
//           Installation: [
//             { name: "Drilling on wall", cost: "30 PER SQFT" },
//             { name: "Pasting on site", cost: "20 PER SQFT" },
//             { name: "Rolled prints only", cost: "-" }
//           ],
//           Framing: [
//             { name: "No frame", cost: 0 },
//             { name: "Half inch frame", cost: "150 per sqft" },
//             { name: "1inch frame", cost: "170 per sqft" },
//             { name: "2inch Frame", cost: "230 per sqft" }
//           ]
//         }
//       }
//     },
//     Online: {
//       // Copy data from Cash if same, or add different pricing if needed
//     },
//     Printers: {
//       // Copy data from Cash if same, or add different pricing if needed
//     }
//   }
// };
// export default PRINT_PRICES;
// src/data/printPrices.js
const PRINT_PRICES = {
  clientTypes: {
    Cash: {
      orderTypes: {
        "Wideformat Printing": {
          printTypes: {
            "Eco solvent": {
              Media: [
                { name: "Vinyl", cost: 30 },
                { name: "Cast Vinyl", cost: 80 },
                { name: "Clear vinyl", cost: 30 },
                { name: "One way vision", cost: 40 },
                { name: "Frosted Film", cost: 50 },
                { name: "Translite Film", cost: 70 },
                { name: "Fabric cloth", cost: 80 },
                { name: "Backlit fabric", cost: 100 },
                { name: "2 year Vinyl", cost: 100 },
                { name: "Canvas Eco", cost: 100 },
                { name: "Texture Vinyl", cost: 80 },
                { name: "PP vinyl", cost: 40 },
                { name: "Wallpaper", cost: 80 },
                { name: "Glossy Photo paper", cost: 50 },
                { name: "Radium", cost: 80 },
                { name: "Retro Chinese", cost: 60 },
                { name: "Retro 3M", cost: 150 },
                { name: "Star flex eco", cost: 25 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 20 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 },
                { name: "Acrylic 3mm", cost: 150 },
                { name: "Acrylic 5mm", cost: 200 },
                { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
                { name: "Sunpack 5MM", cost: 20 },
                { name: "ACP sheet", cost: 70 },
                { name: "Poly carbonate clear sheet", cost: 70 },
                { name: "Poly carbonate white sheet", cost: 80 },
                { name: "Bubbleguard sheet 600gsm", cost: 20 },
                { name: "Bubbleguard sheet 900gsm", cost: 25 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Solvent": {
              Media: [
                { name: "Vinyl", cost: 20 },
                { name: "Star flex", cost: 20 },
                { name: "Black back flex", cost: 15 },
                { name: "Flex", cost: 12 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "Metal frame", cost: 50 }
              ]
            },
            "UV Print": {
              Media: [
                { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "One way vision", costCMYK: 60, costCMYKW: null },
                { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
                { name: "Translite Film", costCMYK: 100, costCMYKW: null },
                { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
                { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
                { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
                { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
                { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
                { name: "Radium", costCMYK: 120, costCMYKW: 150 },
                { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
                { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
                { name: "ACP", costCMYK: 100, costCMYKW: 150 },
                { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
                { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
                { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
                { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
                { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
                { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
                { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
                { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 30 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Canon 12 colour": {
              Media: [
                { name: "PP vinyl canon", cost: 50 },
                { name: "Glossy photo paper", cost: 60 },
                { name: "Pro luster paper", cost: 70 },
                { name: "Matt photo paper", cost: 60 },
                { name: "Canvas", cost: 150 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            }
          }
        },
        "Digital Printing": {
          printTypes: {
            "Eco solvent": {
              Media: [
                { name: "Vinyl", cost: 30 },
                { name: "Cast Vinyl", cost: 80 },
                { name: "Clear vinyl", cost: 30 },
                { name: "One way vision", cost: 40 },
                { name: "Frosted Film", cost: 50 },
                { name: "Translite Film", cost: 70 },
                { name: "Fabric cloth", cost: 80 },
                { name: "Backlit fabric", cost: 100 },
                { name: "2 year Vinyl", cost: 100 },
                { name: "Canvas Eco", cost: 100 },
                { name: "Texture Vinyl", cost: 80 },
                { name: "PP vinyl", cost: 40 },
                { name: "Wallpaper", cost: 80 },
                { name: "Glossy Photo paper", cost: 50 },
                { name: "Radium", cost: 80 },
                { name: "Retro Chinese", cost: 60 },
                { name: "Retro 3M", cost: 150 },
                { name: "Star flex eco", cost: 25 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 20 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 },
                { name: "Acrylic 3mm", cost: 150 },
                { name: "Acrylic 5mm", cost: 200 },
                { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
                { name: "Sunpack 5MM", cost: 20 },
                { name: "ACP sheet", cost: 70 },
                { name: "Poly carbonate clear sheet", cost: 70 },
                { name: "Poly carbonate white sheet", cost: 80 },
                { name: "Bubbleguard sheet 600gsm", cost: 20 },
                { name: "Bubbleguard sheet 900gsm", cost: 25 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Solvent": {
              Media: [
                { name: "Vinyl", cost: 20 },
                { name: "Star flex", cost: 20 },
                { name: "Black back flex", cost: 15 },
                { name: "Flex", cost: 12 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "Metal frame", cost: 50 }
              ]
            },
            "UV Print": {
              Media: [
                { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "One way vision", costCMYK: 60, costCMYKW: null },
                { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
                { name: "Translite Film", costCMYK: 100, costCMYKW: null },
                { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
                { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
                { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
                { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
                { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
                { name: "Radium", costCMYK: 120, costCMYKW: 150 },
                { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
                { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
                { name: "ACP", costCMYK: 100, costCMYKW: 150 },
                { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
                { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
                { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
                { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
                { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
                { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
                { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
                { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 30 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Canon 12 colour": {
              Media: [
                { name: "PP vinyl canon", cost: 50 },
                { name: "Glossy photo paper", cost: 60 },
                { name: "Pro luster paper", cost: 70 },
                { name: "Matt photo paper", cost: 60 },
                { name: "Canvas", cost: 150 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            }
          }
        }
      }
    },
    Online: {
      orderTypes: {
        "Wideformat Printing": {
          printTypes: {
            "Eco solvent": {
              Media: [
                { name: "Vinyl", cost: 30 },
                { name: "Cast Vinyl", cost: 80 },
                { name: "Clear vinyl", cost: 30 },
                { name: "One way vision", cost: 40 },
                { name: "Frosted Film", cost: 50 },
                { name: "Translite Film", cost: 70 },
                { name: "Fabric cloth", cost: 80 },
                { name: "Backlit fabric", cost: 100 },
                { name: "2 year Vinyl", cost: 100 },
                { name: "Canvas Eco", cost: 100 },
                { name: "Texture Vinyl", cost: 80 },
                { name: "PP vinyl", cost: 40 },
                { name: "Wallpaper", cost: 80 },
                { name: "Glossy Photo paper", cost: 50 },
                { name: "Radium", cost: 80 },
                { name: "Retro Chinese", cost: 60 },
                { name: "Retro 3M", cost: 150 },
                { name: "Star flex eco", cost: 25 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 20 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 },
                { name: "Acrylic 3mm", cost: 150 },
                { name: "Acrylic 5mm", cost: 200 },
                { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
                { name: "Sunpack 5MM", cost: 20 },
                { name: "ACP sheet", cost: 70 },
                { name: "Poly carbonate clear sheet", cost: 70 },
                { name: "Poly carbonate white sheet", cost: 80 },
                { name: "Bubbleguard sheet 600gsm", cost: 20 },
                { name: "Bubbleguard sheet 900gsm", cost: 25 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Solvent": {
              Media: [
                { name: "Vinyl", cost: 20 },
                { name: "Star flex", cost: 20 },
                { name: "Black back flex", cost: 15 },
                { name: "Flex", cost: 12 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "Metal frame", cost: 50 }
              ]
            },
            "UV Print": {
              Media: [
                { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "One way vision", costCMYK: 60, costCMYKW: null },
                { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
                { name: "Translite Film", costCMYK: 100, costCMYKW: null },
                { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
                { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
                { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
                { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
                { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
                { name: "Radium", costCMYK: 120, costCMYKW: 150 },
                { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
                { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
                { name: "ACP", costCMYK: 100, costCMYKW: 150 },
                { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
                { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
                { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
                { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
                { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
                { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
                { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
                { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 30 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Canon 12 colour": {
              Media: [
                { name: "PP vinyl canon", cost: 50 },
                { name: "Glossy photo paper", cost: 60 },
                { name: "Pro luster paper", cost: 70 },
                { name: "Matt photo paper", cost: 60 },
                { name: "Canvas", cost: 150 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            }
          }
        },
        "Digital Printing": {
          printTypes: {
            "Eco solvent": {
              Media: [
                { name: "Vinyl", cost: 30 },
                { name: "Cast Vinyl", cost: 80 },
                { name: "Clear vinyl", cost: 30 },
                { name: "One way vision", cost: 40 },
                { name: "Frosted Film", cost: 50 },
                { name: "Translite Film", cost: 70 },
                { name: "Fabric cloth", cost: 80 },
                { name: "Backlit fabric", cost: 100 },
                { name: "2 year Vinyl", cost: 100 },
                { name: "Canvas Eco", cost: 100 },
                { name: "Texture Vinyl", cost: 80 },
                { name: "PP vinyl", cost: 40 },
                { name: "Wallpaper", cost: 80 },
                { name: "Glossy Photo paper", cost: 50 },
                { name: "Radium", cost: 80 },
                { name: "Retro Chinese", cost: 60 },
                { name: "Retro 3M", cost: 150 },
                { name: "Star flex eco", cost: 25 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 20 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 },
                { name: "Acrylic 3mm", cost: 150 },
                { name: "Acrylic 5mm", cost: 200 },
                { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
                { name: "Sunpack 5MM", cost: 20 },
                { name: "ACP sheet", cost: 70 },
                { name: "Poly carbonate clear sheet", cost: 70 },
                { name: "Poly carbonate white sheet", cost: 80 },
                { name: "Bubbleguard sheet 600gsm", cost: 20 },
                { name: "Bubbleguard sheet 900gsm", cost: 25 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Solvent": {
              Media: [
                { name: "Vinyl", cost: 20 },
                { name: "Star flex", cost: 20 },
                { name: "Black back flex", cost: 15 },
                { name: "Flex", cost: 12 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "Metal frame", cost: 50 }
              ]
            },
            "UV Print": {
              Media: [
                { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "One way vision", costCMYK: 60, costCMYKW: null },
                { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
                { name: "Translite Film", costCMYK: 100, costCMYKW: null },
                { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
                { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
                { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
                { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
                { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
                { name: "Radium", costCMYK: 120, costCMYKW: 150 },
                { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
                { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
                { name: "ACP", costCMYK: 100, costCMYKW: 150 },
                { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
                { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
                { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
                { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
                { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
                { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
                { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
                { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 30 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Canon 12 colour": {
              Media: [
                { name: "PP vinyl canon", cost: 50 },
                { name: "Glossy photo paper", cost: 60 },
                { name: "Pro luster paper", cost: 70 },
                { name: "Matt photo paper", cost: 60 },
                { name: "Canvas", cost: 150 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            }
          }
        }
      }
    },
    Printers: {
      orderTypes: {
        "Wideformat Printing": {
          printTypes: {
            "Eco solvent": {
              Media: [
                { name: "Vinyl", cost: 30 },
                { name: "Cast Vinyl", cost: 80 },
                { name: "Clear vinyl", cost: 30 },
                { name: "One way vision", cost: 40 },
                { name: "Frosted Film", cost: 50 },
                { name: "Translite Film", cost: 70 },
                { name: "Fabric cloth", cost: 80 },
                { name: "Backlit fabric", cost: 100 },
                { name: "2 year Vinyl", cost: 100 },
                { name: "Canvas Eco", cost: 100 },
                { name: "Texture Vinyl", cost: 80 },
                { name: "PP vinyl", cost: 40 },
                { name: "Wallpaper", cost: 80 },
                { name: "Glossy Photo paper", cost: 50 },
                { name: "Radium", cost: 80 },
                { name: "Retro Chinese", cost: 60 },
                { name: "Retro 3M", cost: 150 },
                { name: "Star flex eco", cost: 25 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 20 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 },
                { name: "Acrylic 3mm", cost: 150 },
                { name: "Acrylic 5mm", cost: 200 },
                { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
                { name: "Sunpack 5MM", cost: 20 },
                { name: "ACP sheet", cost: 70 },
                { name: "Poly carbonate clear sheet", cost: 70 },
                { name: "Poly carbonate white sheet", cost: 80 },
                { name: "Bubbleguard sheet 600gsm", cost: 20 },
                { name: "Bubbleguard sheet 900gsm", cost: 25 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Solvent": {
              Media: [
                { name: "Vinyl", cost: 20 },
                { name: "Star flex", cost: 20 },
                { name: "Black back flex", cost: 15 },
                { name: "Flex", cost: 12 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "Metal frame", cost: 50 }
              ]
            },
            "UV Print": {
              Media: [
                { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "One way vision", costCMYK: 60, costCMYKW: null },
                { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
                { name: "Translite Film", costCMYK: 100, costCMYKW: null },
                { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
                { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
                { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
                { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
                { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
                { name: "Radium", costCMYK: 120, costCMYKW: 150 },
                { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
                { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
                { name: "ACP", costCMYK: 100, costCMYKW: 150 },
                { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
                { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
                { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
                { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
                { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
                { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
                { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
                { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 30 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Canon 12 colour": {
              Media: [
                { name: "PP vinyl canon", cost: 50 },
                { name: "Glossy photo paper", cost: 60 },
                { name: "Pro luster paper", cost: 70 },
                { name: "Matt photo paper", cost: 60 },
                { name: "Canvas", cost: 150 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            }
          }
        },
        "Digital Printing": {
          printTypes: {
            "Eco solvent": {
              Media: [
                { name: "Vinyl", cost: 30 },
                { name: "Cast Vinyl", cost: 80 },
                { name: "Clear vinyl", cost: 30 },
                { name: "One way vision", cost: 40 },
                { name: "Frosted Film", cost: 50 },
                { name: "Translite Film", cost: 70 },
                { name: "Fabric cloth", cost: 80 },
                { name: "Backlit fabric", cost: 100 },
                { name: "2 year Vinyl", cost: 100 },
                { name: "Canvas Eco", cost: 100 },
                { name: "Texture Vinyl", cost: 80 },
                { name: "PP vinyl", cost: 40 },
                { name: "Wallpaper", cost: 80 },
                { name: "Glossy Photo paper", cost: 50 },
                { name: "Radium", cost: 80 },
                { name: "Retro Chinese", cost: 60 },
                { name: "Retro 3M", cost: 150 },
                { name: "Star flex eco", cost: 25 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 20 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 },
                { name: "Acrylic 3mm", cost: 150 },
                { name: "Acrylic 5mm", cost: 200 },
                { name: "Rollup standy (ONLY APPLIES TO STAR FLEX)", cost: 850 },
                { name: "Sunpack 5MM", cost: 20 },
                { name: "ACP sheet", cost: 70 },
                { name: "Poly carbonate clear sheet", cost: 70 },
                { name: "Poly carbonate white sheet", cost: 80 },
                { name: "Bubbleguard sheet 600gsm", cost: 20 },
                { name: "Bubbleguard sheet 900gsm", cost: 25 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Solvent": {
              Media: [
                { name: "Vinyl", cost: 20 },
                { name: "Star flex", cost: 20 },
                { name: "Black back flex", cost: 15 },
                { name: "Flex", cost: 12 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "Metal frame", cost: 50 }
              ]
            },
            "UV Print": {
              Media: [
                { name: "Vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "Cast Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Clear vinyl", costCMYK: 70, costCMYKW: 90 },
                { name: "One way vision", costCMYK: 60, costCMYKW: null },
                { name: "Frosted Film", costCMYK: 80, costCMYKW: 120 },
                { name: "Translite Film", costCMYK: 100, costCMYKW: null },
                { name: "Fabric cloth", costCMYK: 100, costCMYKW: null },
                { name: "Backlit fabric", costCMYK: 110, costCMYKW: 150 },
                { name: "Canvas", costCMYK: 120, costCMYKW: 150 },
                { name: "2 year Vinyl", costCMYK: 120, costCMYKW: 150 },
                { name: "Texture Vinyl", costCMYK: 80, costCMYKW: 100 },
                { name: "Wallpaper", costCMYK: 70, costCMYKW: 90 },
                { name: "Radium", costCMYK: 120, costCMYKW: 150 },
                { name: "Retro Chinese", costCMYK: 90, costCMYKW: null },
                { name: "Retro 3M", costCMYK: 150, costCMYKW: null },
                { name: "ACP", costCMYK: 100, costCMYKW: 150 },
                { name: "Acrylic 3mm", costCMYK: 200, costCMYKW: 250 },
                { name: "Curtain", costCMYK: 80, costCMYKW: 150 },
                { name: "Acrylic 5mm", costCMYK: 250, costCMYKW: 300 },
                { name: "3mm Foam sheet", costCMYK: 60, costCMYKW: 90 },
                { name: "5mm foam sheet", costCMYK: 70, costCMYKW: 100 },
                { name: "Bubble guard", costCMYK: 70, costCMYKW: 90 },
                { name: "Sunpack 3mm", costCMYK: 50, costCMYKW: null },
                { name: "Sunpack 5mm", costCMYK: 60, costCMYKW: null }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 },
                { name: "Two year outdoor", cost: 30 },
                { name: "Both side gumming", cost: 30 },
                { name: "Floor Lamination", cost: 70 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            },
            "Canon 12 colour": {
              Media: [
                { name: "PP vinyl canon", cost: 50 },
                { name: "Glossy photo paper", cost: 60 },
                { name: "Pro luster paper", cost: 70 },
                { name: "Matt photo paper", cost: 60 },
                { name: "Canvas", cost: 150 }
              ],
              Lamination: [
                { name: "No lamination", cost: 0 },
                { name: "Matt", cost: 10 },
                { name: "Glossy", cost: 10 },
                { name: "Sparkle", cost: 15 }
              ],
              Mounting: [
                { name: "3mm Foam sheet", cost: 20 },
                { name: "5mm foam sheet", cost: 25 },
                { name: "8mm foam sheet", cost: 120 },
                { name: "10mm foam sheet", cost: 150 },
                { name: "Bubble guard", cost: 20 }
              ],
              Installation: [
                { name: "Drilling on wall", cost: "30 PER SQFT" },
                { name: "Pasting on site", cost: "20 PER SQFT" },
                { name: "Rolled prints only", cost: "-" }
              ],
              Framing: [
                { name: "No frame", cost: 0 },
                { name: "Half inch frame", cost: "150 per sqft" },
                { name: "1inch frame", cost: "170 per sqft" },
                { name: "2inch Frame", cost: "230 per sqft" }
              ]
            }
          }
        }
      }
    }
  }
};
export default PRINT_PRICES;