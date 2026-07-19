export const leasingUnits = [
  { id: 'GF-08', level: 'Ground floor', wing: 'West wing', size: 64, use: 'Retail', status: 'Enquire' },
  { id: 'GF-17', level: 'Ground floor', wing: 'East wing', size: 118, use: 'Food-ready', status: 'Enquire' },
  { id: 'GF-K2', level: 'Ground floor', wing: 'Central court', size: 18, use: 'Kiosk', status: 'Enquire' },
  { id: 'L1-04', level: 'Level 1', wing: 'West wing', size: 92, use: 'Retail', status: 'Enquire' },
  { id: 'L1-12', level: 'Level 1', wing: 'East wing', size: 156, use: 'Retail', status: 'Enquire' },
  { id: 'L1-18', level: 'Level 1', wing: 'East wing', size: 238, use: 'Restaurant', status: 'Enquire' },
  { id: 'L1-K1', level: 'Level 1', wing: 'Central court', size: 14, use: 'Kiosk', status: 'Enquire' },
  { id: 'T-03', level: 'Terrace', wing: 'North terrace', size: 310, use: 'Restaurant', status: 'Enquire' },
]

export const leasingUses = ['All', ...new Set(leasingUnits.map((unit) => unit.use))]
