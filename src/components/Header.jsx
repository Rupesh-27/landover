import React, { useState, useEffect } from 'react';
import { Menu, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ toggleMenu, openConfigurator }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDefenderPage = location.pathname === '/defender';
  const isRangeRoverPage = location.pathname === '/rangerover';
  const isDiscoveryPage = location.pathname === '/discovery';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        backgroundColor: isScrolled ? 'rgba(12, 13, 18, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      }}
    >
      {/* Left Menu Button */}
      <button
        onClick={toggleMenu}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--jlr-white)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
        onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
      >
        <Menu size={20} strokeWidth={1.5} />
        <span style={{ display: 'none', md: 'inline' }}>Menu</span>
      </button>

      {/* Center Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {isDefenderPage ? (
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--jlr-white)',
                paddingLeft: '0.35em', /* Adjust center offset for letter-spacing */
              }}
            >
              DEFENDER
            </div>
          ) : isRangeRoverPage ? (
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--jlr-accent)',
                paddingLeft: '0.35em',
              }}
            >
              RANGE ROVER
            </div>
          ) : isDiscoveryPage ? (
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#68b284',
                paddingLeft: '0.35em',
              }}
            >
              DISCOVERY
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid var(--jlr-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--jlr-accent)',
                }}
              >
                LR
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                LAND ROVER
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Right Search & Configurator Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--jlr-white)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
          onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
          aria-label="Search"
        >
          <Search size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={openConfigurator}
          className="cta-btn-outline"
          style={{
            padding: '8px 20px',
            fontSize: '0.65rem',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          Build & Price
        </button>
      </div>
    </header>
  );
}
