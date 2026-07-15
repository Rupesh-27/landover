import React, { useState } from 'react';

const COMPARISON_DATA = {
  defender: {
    accent: 'var(--jlr-accent)',
    columns: [
      { name: 'Defender 90', price: '₹ 97.00 Lakh', engine: '2.0L Turbo Petrol', power: '300 PS', speed: '6.0s', seats: '5 Seats', clearance: '225 mm', drive: 'AWD with Twin-speed transfer box' },
      { name: 'Defender 110', price: '₹ 1.04 Crore', engine: '3.0L Turbo Diesel', power: '300 PS', speed: '7.0s', seats: '5 - 7 Seats', clearance: '290 mm', drive: 'AWD with Electronic Air Suspension' },
      { name: 'Defender 130', price: '₹ 1.21 Crore', engine: '3.0L Turbo Petrol', power: '400 PS', speed: '6.6s', seats: '8 Seats', clearance: '290 mm', drive: 'AWD with Electronic Air Suspension' },
      { name: 'Defender OCTA', price: '₹ 2.65 Crore', engine: '4.4L Twin-Turbo V8', power: '635 PS', speed: '3.8s', seats: '5 Seats', clearance: '291 mm', drive: '6D Dynamics Air Suspension AWD' },
    ]
  },
  rangerover: {
    accent: 'var(--jlr-accent)',
    columns: [
      { name: 'RR Evoque', price: '₹ 67.90 Lakh', engine: '2.0L Diesel MHEV', power: '204 PS', speed: '8.5s', seats: '5 Seats', clearance: '212 mm', drive: 'All-Wheel Drive (AWD)' },
      { name: 'RR Velar', price: '₹ 94.30 Lakh', engine: '2.0L Petrol Turbo', power: '250 PS', speed: '7.5s', seats: '5 Seats', clearance: '213 mm', drive: 'All-Wheel Drive (AWD)' },
      { name: 'RR Sport', price: '₹ 1.40 Crore', engine: '3.0L Diesel MHEV', power: '350 PS', speed: '5.9s', seats: '5 Seats', clearance: '281 mm', drive: 'Dynamic Air Suspension AWD' },
      { name: 'Range Rover SV', price: '₹ 3.00 Crore', engine: '4.4L Twin-Turbo V8', power: '530 PS', speed: '4.6s', seats: '4 - 5 Seats', clearance: '295 mm', drive: 'Electronic Air Suspension AWD' },
    ]
  },
  discovery: {
    accent: '#68b284',
    columns: [
      { name: 'Discovery Sport', price: '₹ 72.00 Lakh', engine: '2.0L Petrol MHEV', power: '250 PS', speed: '7.8s', seats: '5 + 2 Seats', clearance: '212 mm', drive: 'All-Wheel Drive (AWD)' },
      { name: 'Discovery', price: '₹ 97.00 Lakh', engine: '3.0L Turbo Diesel', power: '300 PS', speed: '6.8s', seats: '7 Seats', clearance: '283 mm', drive: 'Electronic Air Suspension AWD' }
    ]
  }
};

export default function SpecsComparison({ brand = 'defender' }) {
  const data = COMPARISON_DATA[brand];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data) return null;

  const rows = [
    { label: 'Ex-Showroom Price', key: 'price' },
    { label: 'Powertrain / Engine', key: 'engine' },
    { label: 'Maximum Power', key: 'power' },
    { label: '0 - 100 km/h Sprint', key: 'speed' },
    { label: 'Seating Capacity', key: 'seats' },
    { label: 'Ground Clearance', key: 'clearance' },
    { label: 'Drivetrain System', key: 'drive' },
  ];

  return (
    <div 
      className="reveal-up"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ fontSize: '0.75rem', color: data.accent, letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
          Technical Specifications
        </span>
        <h2 style={{ fontSize: '2.2rem', letterSpacing: '0.15em', margin: 0 }}>
          Side-By-Side Comparison
        </h2>
        <p style={{ color: 'var(--jlr-light-grey)', fontSize: '0.9rem', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
          Evaluate dimensions, performance figures, and pricing specifications across the standard lineup to choose your ideal companion.
        </p>
      </div>

      <div 
        style={{ 
          overflowX: 'auto', 
          backgroundColor: '#0c0d12', 
          borderRadius: '6px', 
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        <table 
          style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            minWidth: brand === 'discovery' ? '600px' : '900px',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th 
                style={{ 
                  padding: '24px 30px', 
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: 'var(--jlr-light-grey)',
                  width: '25%',
                  backgroundColor: '#07080b',
                }}
              >
                SPECIFICATION
              </th>
              {data.columns.map((col, idx) => (
                <th 
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ 
                    padding: '24px 20px', 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: hoveredIndex === idx ? '#fff' : 'var(--jlr-white)',
                    borderLeft: '1px solid rgba(255,255,255,0.04)',
                    backgroundColor: hoveredIndex === idx ? 'rgba(255,255,255,0.02)' : 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ color: hoveredIndex === idx ? data.accent : 'inherit', transition: 'color 0.3s' }}>
                    {col.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                style={{ 
                  borderBottom: rowIdx === rows.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                }}
              >
                <td 
                  style={{ 
                    padding: '18px 30px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    letterSpacing: '0.1em', 
                    color: 'var(--jlr-light-grey)',
                    textTransform: 'uppercase',
                    backgroundColor: '#07080b',
                  }}
                >
                  {row.label}
                </td>
                {data.columns.map((col, idx) => (
                  <td 
                    key={idx}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ 
                      padding: '18px 20px', 
                      fontSize: '0.85rem', 
                      color: hoveredIndex === idx ? '#fff' : 'rgba(255,255,255,0.85)',
                      borderLeft: '1px solid rgba(255,255,255,0.04)',
                      backgroundColor: hoveredIndex === idx ? 'rgba(255,255,255,0.02)' : 'transparent',
                      fontWeight: row.key === 'price' ? 700 : 400,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {col[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
