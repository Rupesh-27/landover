import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

const VEHICLES_DATA = {
  rangerover: {
    name: 'Range Rover',
    accentColor: 'var(--jlr-accent)',
    models: [
      { id: 'sv', name: 'Range Rover SV', desc: 'The Ultimate Expression of luxury and personalization', basePrice: 30000000, seats: 5, engine: '4.4L V8 Twin-Turbo (530 PS)' },
      { id: 'sport', name: 'Range Rover Sport', desc: 'Sleek power and exceptional sporting posture', basePrice: 14000000, seats: 5, engine: '3.0L Diesel Mild-Hybrid (350 PS)' },
      { id: 'velar', name: 'Range Rover Velar', desc: 'Modernist elegance and clean silhouette design', basePrice: 9430000, seats: 5, engine: '2.0L Petrol Turbo (250 PS)' },
      { id: 'evoque', name: 'Range Rover Evoque', desc: 'Compact luxury tailored for sophisticated cityscapes', basePrice: 6790000, seats: 5, engine: '2.0L Diesel Mild-Hybrid (204 PS)' },
    ],
    colors: [
      { id: 'gold', name: 'Sunset Gold Satin', price: 250000, hex: '#c5a880', img: 'rangerover_gold.png' },
      { id: 'black', name: 'Santorini Black', price: 150000, hex: '#111111', img: 'rangerover_black.png' },
      { id: 'silver', name: 'Hakuba Silver', price: 150000, hex: '#d2d5d8', img: 'rangerover_silver.png' },
      { id: 'white', name: 'Fuji White', price: 0, hex: '#ffffff', img: 'rangerover_white.png' },
    ],
    wheels: [
      { id: '21', name: '21" Style 5112, 5-Spoke Gloss Silver', price: 0, desc: 'Luxury standard silver profile' },
      { id: '22', name: '22" Style 7023, 7-Spoke Satin Charcoal', price: 240000, desc: 'Premium multi-spoke dark profile' },
      { id: '23', name: '23" Style 1075, 10-Spoke Gloss Black', price: 480000, desc: 'Sporty maximalist stance' },
    ],
    packs: [
      { id: 'technology', name: 'Technology Pack', price: 350000, desc: 'ClearSight digital rearview mirror, Head-Up Display, and 3D Surround Camera system.' },
      { id: 'blackpack', name: 'Exterior Black Pack', price: 180000, desc: 'Gloss Black badges, front grille side vents, bumper inserts, and mirror caps.' },
    ]
  },
  defender: {
    name: 'Defender',
    accentColor: 'var(--jlr-accent)',
    models: [
      { id: '90', name: 'Defender 90', desc: '3-Door Compact, Rugged Agility', basePrice: 9700000, seats: 5, engine: '2.0L Petrol (300 PS)' },
      { id: '110', name: 'Defender 110', desc: '5-Door Standard, Iconic Versatility', basePrice: 10400000, seats: 5, engine: '3.0L Diesel (300 PS)' },
      { id: '130', name: 'Defender 130', desc: '8-Seat Extended, Ultimate Adventure', basePrice: 12100000, seats: 8, engine: '3.0L Petrol (400 PS)' },
      { id: 'octa', name: 'Defender OCTA', desc: 'Twin-Turbo V8 High-Performance Hero', basePrice: 26500000, seats: 5, engine: '4.4L Twin-Turbo V8 (635 PS)' },
    ],
    colors: [
      { id: 'grey', name: 'Carpathian Grey', price: 120000, hex: '#44464a', img: 'defender_grey.png' },
      { id: 'blue', name: 'Tasman Blue', price: 120000, hex: '#1e2c3b', img: 'defender_blue.png' },
      { id: 'white', name: 'Fuji White', price: 0, hex: '#eceef0', img: 'defender_white.png' },
    ],
    wheels: [
      { id: '19', name: '19" Style 6010, 6-Spoke Gloss Silver', price: 0, desc: 'Rugged standard profile' },
      { id: '20', name: '20" Style 5098, 5-Spoke Satin Dark Grey', price: 180000, desc: 'Durable charcoal finish' },
      { id: '22', name: '22" Style 5098, 5-Spoke Gloss Black', price: 360000, desc: 'Sporty maximum stance' },
    ],
    packs: [
      { id: 'explorer', name: 'Explorer Pack', price: 280000, desc: 'Expedition roof rack, exterior side gear carrier, wheel arch protection, and front mudflaps.' },
      { id: 'adventure', name: 'Adventure Pack', price: 220000, desc: 'Integrated air compressor, portable rinse system, seat back backpack, and rear mudflaps.' },
    ]
  },
  discovery: {
    name: 'Discovery',
    accentColor: '#0b3c2c', // Emerald Accent for Discovery
    models: [
      { id: 'discovery', name: 'Discovery', desc: 'Luxurious full-size 7-seat family adventurer', basePrice: 9700000, seats: 7, engine: '3.0L Turbo Diesel (300 PS)' },
      { id: 'sport', name: 'Discovery Sport', desc: 'Versatile compact premium 5+2 adventurer', basePrice: 7200000, seats: 5, engine: '2.0L Mild-Hybrid Petrol (250 PS)' },
    ],
    colors: [
      { id: 'darkgrey', name: 'Eiger Grey', price: 110000, hex: '#52565c', img: 'discovery_darkgrey.png' },
      { id: 'bronze', name: 'Lantau Bronze', price: 110000, hex: '#7e746a', img: 'discovery_bronze.png' },
      { id: 'white', name: 'Fuji White', price: 0, hex: '#ffffff', img: 'discovery_white.png' },
    ],
    wheels: [
      { id: '20', name: '20" Style 5011, Gloss Sparkle Silver', price: 0, desc: 'Versatile standard silver profile' },
      { id: '21', name: '21" Style 5123, Satin Dark Charcoal', price: 160000, desc: 'Refined multi-spoke grey profile' },
      { id: '22', name: '22" Style 5124, Sporty Gloss Black', price: 320000, desc: 'Max stance gloss black wheels' },
    ],
    packs: [
      { id: 'family', name: 'Family Pack', price: 210000, desc: 'Third row seats, sliding/reclining second row, and multi-zone climate air vents.' },
      { id: 'dynamic', name: 'R-Dynamic Design Pack', price: 250000, desc: 'Gloss Black exterior grille details, badging, contrast roof linings, and metal sport pedals.' },
    ]
  }
};

export default function VehicleConfigurator({ isOpen, onClose, initialBrand = 'defender' }) {
  const [brand, setBrand] = useState(initialBrand);
  const [selectedModel, setSelectedModel] = useState(VEHICLES_DATA[initialBrand].models[0]);
  const [selectedColor, setSelectedColor] = useState(VEHICLES_DATA[initialBrand].colors[0]);
  const [selectedWheel, setSelectedWheel] = useState(VEHICLES_DATA[initialBrand].wheels[0]);
  const [selectedPacks, setSelectedPacks] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Update selection defaults when configurator is opened or initialBrand changes
  useEffect(() => {
    if (isOpen) {
      handleBrandChange(initialBrand);
    }
  }, [isOpen, initialBrand]);

  if (!isOpen) return null;

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    const data = VEHICLES_DATA[newBrand];
    setSelectedModel(data.models[0]);
    setSelectedColor(data.colors[0]);
    setSelectedWheel(data.wheels[0]);
    setSelectedPacks([]);
  };

  const togglePack = (pack) => {
    if (selectedPacks.find(p => p.id === pack.id)) {
      setSelectedPacks(selectedPacks.filter(p => p.id !== pack.id));
    } else {
      setSelectedPacks([...selectedPacks, pack]);
    }
  };

  const currentBrandData = VEHICLES_DATA[brand];

  // Pricing Calculation
  const packsPrice = selectedPacks.reduce((total, pack) => total + pack.price, 0);
  const totalPrice = selectedModel.basePrice + selectedColor.price + selectedWheel.price + packsPrice;

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (contactName && contactEmail) {
      setOrderPlaced(true);
    }
  };

  const handleDownloadTxt = () => {
    const packsTxt = selectedPacks.map(p => `  - ${p.name}: ${formatCurrency(p.price)}`).join('\n');
    const content = `=========================================
LAND ROVER CONFIGURATION SUMMARY
Generated on: ${new Date().toLocaleDateString()}
=========================================

Brand: ${currentBrandData.name}
Model: ${selectedModel.name}
Engine Specs: ${selectedModel.engine}
Base Price: ${formatCurrency(selectedModel.basePrice)}

Exterior Color: ${selectedColor.name} (${formatCurrency(selectedColor.price)})
Wheels & Rims: ${selectedWheel.name} (${formatCurrency(selectedWheel.price)})

Accessory Packages Selected:
${selectedPacks.length > 0 ? packsTxt : '  None'}

-----------------------------------------
TOTAL ESTIMATED COST: ${formatCurrency(totalPrice)}
-----------------------------------------
*Ex-showroom price estimate in INR.

Thank you for your configuration. Contact your local Land Rover Retailer for formal booking.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${brand.toLowerCase()}-${selectedModel.name.replace(/\s+/g, '-').toLowerCase()}-configuration.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 300,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Configurator Header */}
      <div
        className="no-print"
        style={{
          height: '70px',
          padding: '0 40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          backgroundColor: 'var(--jlr-charcoal)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
            }}
          >
            BUILD AND PRICE
          </div>
          <span style={{ height: '16px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          
          {/* Brand Switcher Tabs inside builder */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {Object.keys(VEHICLES_DATA).map((bKey) => (
              <button
                key={bKey}
                onClick={() => handleBrandChange(bKey)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: brand === bKey ? currentBrandData.accentColor : 'var(--jlr-light-grey)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: brand === bKey ? 700 : 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '4px 8px',
                  borderBottom: brand === bKey ? `2px solid ${currentBrandData.accentColor}` : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {VEHICLES_DATA[bKey].name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--jlr-white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.8,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
        >
          <X size={16} /> Close Configurator
        </button>
      </div>

      {/* Main Content Area */}
      {orderPlaced ? (
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            gap: '24px',
            animation: 'fadeIn 0.6s ease forwards',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: `2px solid ${currentBrandData.accentColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentBrandData.accentColor,
              marginBottom: '16px',
            }}
          >
            <Check size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', letterSpacing: '0.1em' }}>Adventure Awaits</h2>
          <p style={{ color: 'var(--jlr-light-grey)', fontSize: '0.95rem', lineHeight: '1.7' }}>
            Thank you, <strong>{contactName}</strong>. Your custom {currentBrandData.name} configuration has been registered. A Jaguar Land Rover retail specialist will contact you at <strong>{contactEmail}</strong> to review your specifications and schedule a private showroom walkthrough.
          </p>
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--jlr-dark-grey)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '4px',
              width: '100%',
              textAlign: 'left',
              marginTop: '16px',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              CONFIGURATION SUMMARY
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
              <span>{selectedModel.name}</span>
              <span>{formatCurrency(selectedModel.basePrice)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--jlr-light-grey)' }}>
              <span>Paint: {selectedColor.name}</span>
              <span>{selectedColor.price === 0 ? 'Included' : formatCurrency(selectedColor.price)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--jlr-light-grey)' }}>
              <span>Wheels: {selectedWheel.name}</span>
              <span>{selectedWheel.price === 0 ? 'Included' : formatCurrency(selectedWheel.price)}</span>
            </div>
            {selectedPacks.map(pack => (
              <div key={pack.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--jlr-light-grey)' }}>
                <span>{pack.name}</span>
                <span>{formatCurrency(pack.price)}</span>
              </div>
            ))}
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 600 }}>
              <span style={{ fontFamily: 'var(--font-heading)' }}>ESTIMATED PRICE</span>
              <span style={{ color: currentBrandData.accentColor }}>{formatCurrency(totalPrice)}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setSelectedPacks([]);
              onClose();
            }}
            className="cta-btn-filled"
            style={{ marginTop: '20px', width: '100%' }}
          >
            Back to Site
          </button>
        </div>
      ) : (
        <div
          className="no-print"
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            minHeight: 0,
          }}
        >
          {/* Left Visual Column */}
          <div
            style={{
              flex: '1 1 500px',
              backgroundColor: '#08090d',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              position: 'relative',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  margin: 0,
                }}
              >
                {selectedModel.name}
              </div>
              <div style={{ color: 'var(--jlr-light-grey)', fontSize: '0.85rem', marginTop: '4px' }}>
                {selectedModel.engine} • {selectedModel.seats} Seats
              </div>
            </div>

            {/* Vehicle Rendering Image */}
            <div
              style={{
                width: '100%',
                maxWidth: '650px',
                height: 'auto',
                aspectRatio: '16/9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <img
                src={selectedColor.img}
                alt={selectedColor.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  animation: 'fadeIn 0.8s ease forwards',
                }}
                key={selectedColor.id} /* force reload on change */
              />
            </div>

            {/* Stats Badge HUD */}
            <div
              style={{
                width: '100%',
                maxWidth: '600px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '24px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '4px',
                marginTop: '20px',
              }}
            >
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>TOP SPEED</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '4px', fontFamily: 'var(--font-heading)' }}>
                  {brand === 'rangerover' ? '250 km/h' : brand === 'discovery' ? '209 km/h' : '191 km/h'}
                </div>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>0-100 KM/H</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '4px', fontFamily: 'var(--font-heading)' }}>
                  {brand === 'rangerover' ? '4.6 sec' : brand === 'discovery' ? '6.8 sec' : '7.4 sec'}
                </div>
              </div>
              <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>WADING DEPTH</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '4px', fontFamily: 'var(--font-heading)' }}>
                  {brand === 'rangerover' ? '900 mm' : brand === 'discovery' ? '900 mm' : '900 mm'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Configuration Control Panel */}
          <div
            style={{
              flex: '1 1 400px',
              backgroundColor: 'var(--jlr-charcoal)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Options Body */}
            <div style={{ padding: '40px', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {/* Option 1: Model Choice */}
              <div>
                <h3 style={{ fontSize: '0.85rem', color: currentBrandData.accentColor, letterSpacing: '0.15em', marginBottom: '16px' }}>
                  1. SELECT MODEL VARIANT
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentBrandData.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      style={{
                        textAlign: 'left',
                        padding: '16px',
                        backgroundColor: selectedModel.id === model.id ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                        border: selectedModel.id === model.id ? `1px solid ${currentBrandData.accentColor}` : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{model.name}</span>
                        <span style={{ fontSize: '0.9rem', color: selectedModel.id === model.id ? currentBrandData.accentColor : 'var(--jlr-white)' }}>
                          {formatCurrency(model.basePrice)}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)', marginTop: '4px' }}>
                        {model.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Paint Choice */}
              <div>
                <h3 style={{ fontSize: '0.85rem', color: currentBrandData.accentColor, letterSpacing: '0.15em', marginBottom: '16px' }}>
                  2. EXTERIOR PAINT COATING
                </h3>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {currentBrandData.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        flex: '1 1 80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'inherit',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: color.hex,
                          border: selectedColor.id === color.id ? `3px solid ${currentBrandData.accentColor}` : '1px solid rgba(255,255,255,0.3)',
                          boxShadow: selectedColor.id === color.id ? `0 0 10px rgba(255, 255, 255, 0.15)` : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        {selectedColor.id === color.id && <Check size={16} color={color.hex === '#ffffff' ? '#000' : '#fff'} strokeWidth={3} />}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, textAlign: 'center' }}>{color.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)' }}>
                        {color.price === 0 ? 'Included' : `+ ${formatCurrency(color.price)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Wheel Choice */}
              <div>
                <h3 style={{ fontSize: '0.85rem', color: currentBrandData.accentColor, letterSpacing: '0.15em', marginBottom: '16px' }}>
                  3. WHEELS AND RIMS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentBrandData.wheels.map((wheel) => (
                    <button
                      key={wheel.id}
                      onClick={() => setSelectedWheel(wheel)}
                      style={{
                        textAlign: 'left',
                        padding: '14px',
                        backgroundColor: selectedWheel.id === wheel.id ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                        border: selectedWheel.id === wheel.id ? `1px solid ${currentBrandData.accentColor}` : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{wheel.name}</span>
                        <span style={{ fontSize: '0.8rem', color: selectedWheel.id === wheel.id ? currentBrandData.accentColor : 'var(--jlr-white)' }}>
                          {wheel.price === 0 ? 'Included' : `+ ${formatCurrency(wheel.price)}`}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)', marginTop: '4px' }}>
                        {wheel.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 4: Accessory Packs */}
              <div>
                <h3 style={{ fontSize: '0.85rem', color: currentBrandData.accentColor, letterSpacing: '0.15em', marginBottom: '16px' }}>
                  4. ACCESSORY PACKAGES
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentBrandData.packs.map((pack) => {
                    const isSelected = selectedPacks.find(p => p.id === pack.id);
                    return (
                      <button
                        key={pack.id}
                        onClick={() => togglePack(pack)}
                        style={{
                          textAlign: 'left',
                          padding: '14px',
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                          border: isSelected ? `1px solid ${currentBrandData.accentColor}` : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          color: 'inherit',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{pack.name}</span>
                          <span style={{ fontSize: '0.8rem', color: isSelected ? currentBrandData.accentColor : 'var(--jlr-white)' }}>
                            + {formatCurrency(pack.price)}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)', marginTop: '4px' }}>
                          {pack.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Checkout Action Panel */}
            <div
              style={{
                padding: '30px 40px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>TOTAL ESTIMATED COST</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: currentBrandData.accentColor,
                      marginTop: '4px',
                    }}
                  >
                    {formatCurrency(totalPrice)}
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)' }}>*Ex-showroom price</div>
              </div>

              {/* Export and Print Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }} className="no-print">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="cta-btn-outline"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    borderColor: 'rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  Print Specs
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="cta-btn-outline"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    borderColor: 'rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  Save Specs (.txt)
                </button>
              </div>

              {/* Consultation Booking Form */}
              <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: '10px 14px',
                      fontSize: '0.8rem',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: '10px 14px',
                      fontSize: '0.8rem',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="cta-btn-filled"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    backgroundColor: currentBrandData.accentColor,
                    border: `1px solid ${currentBrandData.accentColor}`,
                    color: brand === 'discovery' ? 'white' : 'black',
                    fontWeight: 700,
                  }}
                >
                  Request Consultation & Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Print-only template (renders clean specs invoice) */}
      <div className="print-only" style={{ display: 'none' }}>
        <div className="print-container">
          <div style={{ borderBottom: '3px solid #000', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#000', fontWeight: 800, letterSpacing: '0.1em' }}>
                LAND ROVER INDIA
              </h1>
              <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Official Configuration Spec Sheet
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{brand.toUpperCase()} CUSTOM BUILD</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Date: {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '6px', color: '#000', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                1. Vehicle Selection
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Model Name:</td>
                    <td style={{ padding: '8px 0', textAlign: 'right' }}>{selectedModel.name}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Engine:</td>
                    <td style={{ padding: '8px 0', textAlign: 'right' }}>{selectedModel.engine}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#333' }}>Base Price:</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(selectedModel.basePrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '6px', color: '#000', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                2. Design & Packages
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 0', fontWeight: 'bold', color: '#333' }}>Paint Option:</td>
                    <td style={{ padding: '6px 0', textAlign: 'right' }}>
                      {selectedColor.name} ({selectedColor.price === 0 ? 'Included' : formatCurrency(selectedColor.price)})
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', fontWeight: 'bold', color: '#333' }}>Wheels:</td>
                    <td style={{ padding: '6px 0', textAlign: 'right' }}>
                      {selectedWheel.name} ({selectedWheel.price === 0 ? 'Included' : formatCurrency(selectedWheel.price)})
                    </td>
                  </tr>
                  {selectedPacks.length > 0 ? (
                    <tr>
                      <td style={{ padding: '6px 0', fontWeight: 'bold', color: '#333', verticalAlign: 'top' }}>Accessories:</td>
                      <td style={{ padding: '6px 0', textAlign: 'right' }}>
                        {selectedPacks.map(p => `${p.name} (${formatCurrency(p.price)})`).join(', ')}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td style={{ padding: '6px 0', fontWeight: 'bold', color: '#333' }}>Accessories:</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', color: '#777' }}>None Selected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ borderTop: '2px solid #000', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#666', maxWidth: '60%' }}>
              *This specification sheet represents an ex-showroom pricing estimate in Indian Rupees (INR) for reference only. Taxes, registration, insurance, and dealership handling fees are not included.
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Estimated Cost</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#000', marginTop: '2px' }}>
                {formatCurrency(totalPrice)}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '50px', borderTop: '1px dashed #ccc', paddingTop: '20px', fontSize: '0.75rem', color: '#888', textAlign: 'center' }}>
            House of Brands - Range Rover • Defender • Discovery. Embrace the Impossible.
          </div>
        </div>
      </div>
    </div>
  );
}
