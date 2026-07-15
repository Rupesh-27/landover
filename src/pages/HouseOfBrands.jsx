import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function HouseOfBrands() {
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [activeNotification, setActiveNotification] = useState(null);

  const columns = [
    {
      id: 'rangerover',
      title: 'Range Rover',
      subtitle: 'PEERLESS REFINEMENT AND LUXURY',
      bgImage: 'rangerover_column.png',
      link: '/rangerover',
      tagline: 'Leader by example.',
      isAvailable: true,
    },
    {
      id: 'defender',
      title: 'Defender',
      subtitle: 'EMBRACE THE IMPOSSIBLE since 1948',
      bgImage: 'defender_column.png',
      link: '/defender',
      tagline: 'Capability with composure.',
      isAvailable: true,
    },
    {
      id: 'discovery',
      title: 'Discovery',
      subtitle: 'VERSATILITY FOR EVERY ADVENTURE',
      bgImage: 'discovery_column.png',
      link: '/discovery',
      tagline: 'Designed for family journeys.',
      isAvailable: true,
    },
  ];

  const handleNonAvailableClick = (title) => {
    setActiveNotification(`${title} portal is currently being finalized. Proceed to the Defender portal for the active experience!`);
    setTimeout(() => setActiveNotification(null), 5000);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Toast Notification for coming soon portals */}
      {activeNotification && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            padding: '16px 28px',
            backgroundColor: 'rgba(12, 13, 18, 0.9)',
            border: '1px solid var(--jlr-accent)',
            borderRadius: '4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease-out forwards',
          }}
        >
          {activeNotification}
        </div>
      )}

      {/* Main Split-Screen Grid */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {columns.map((col) => {
          const isHovered = hoveredColumn === col.id;
          const isAnyHovered = hoveredColumn !== null;

          // Determine column width based on hover state
          let colWidth = '33.333%';
          if (isAnyHovered) {
            colWidth = isHovered ? '42%' : '29%';
          }

          return (
            <div
              key={col.id}
              onMouseEnter={() => setHoveredColumn(col.id)}
              onMouseLeave={() => setHoveredColumn(null)}
              style={{
                width: colWidth,
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '80px 40px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                borderRight: col.id !== 'discovery' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
              }}
            >
              {/* Background Image Container with Zoom effect */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
                  transition: 'transform 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Visual Dark Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: isHovered ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.7)',
                    transition: 'background-color 0.6s ease',
                    zIndex: 1,
                  }}
                />
                <img
                  src={col.bgImage}
                  alt={col.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Column Content */}
              {/* Top Section */}
              <div
                style={{
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  opacity: isAnyHovered ? (isHovered ? 1 : 0.4) : 0.7,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--jlr-accent)',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                  }}
                >
                  HOUSE OF BRANDS
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#fff',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  {col.tagline}
                </div>
              </div>

              {/* Middle Title Section */}
              <div
                style={{
                  zIndex: 2,
                  textAlign: 'center',
                  opacity: isAnyHovered ? (isHovered ? 1 : 0.3) : 0.8,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    color: 'var(--jlr-white)',
                    marginBottom: '12px',
                    textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    paddingLeft: '0.3em', /* Center alignment offset */
                  }}
                >
                  {col.title}
                </h1>
                <p
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--jlr-light-grey)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  {col.subtitle}
                </p>
              </div>

              {/* Bottom CTA Section */}
              <div
                style={{
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {col.isAvailable ? (
                  <Link
                    to={col.link}
                    className="cta-link-primary"
                    style={{
                      borderColor: 'var(--jlr-white)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.25em',
                    }}
                  >
                    ENTER PORTAL <ChevronRight size={14} />
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNonAvailableClick(col.title)}
                    className="cta-link-primary"
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: '2px solid var(--jlr-white)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      letterSpacing: '0.25em',
                      color: 'var(--jlr-white)',
                    }}
                  >
                    EXPLORE BRAND <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
