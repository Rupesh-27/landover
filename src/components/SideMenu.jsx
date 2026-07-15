import React, { useState } from 'react';
import { X, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SideMenu({ isOpen, toggleMenu, openConfigurator }) {
  const [currentLevel, setCurrentLevel] = useState('main'); // 'main' or 'vehicles'

  if (!isOpen) return null;

  const handleBackToMain = () => {
    setCurrentLevel('main');
  };

  const handleClose = () => {
    setCurrentLevel('main');
    toggleMenu();
  };

  const handleNavigate = () => {
    handleClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        display: 'flex',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Drawer */}
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#0c0d12',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '20px 0 50px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          animation: 'slideInLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        }}
      >
        {/* Header inside drawer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '30px 40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {currentLevel === 'vehicles' ? (
            <button
              onClick={handleBackToMain}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--jlr-white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'var(--jlr-accent)',
              }}
            >
              HOUSE OF BRANDS
            </div>
          )}

          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--jlr-white)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Content Panel (Sliding Layout) */}
        <div style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Main Menu Panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: currentLevel === 'main' ? 'translateX(0)' : 'translateX(-100%)',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setCurrentLevel('vehicles')}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: 'var(--jlr-white)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <span>Vehicles</span>
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => {
                handleClose();
                openConfigurator();
              }}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: 'var(--jlr-white)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              Build & Price
            </button>

            <Link
              to="/defender"
              onClick={handleNavigate}
              style={{
                color: 'var(--jlr-white)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'block',
              }}
            >
              Defender Experience
            </Link>

            <a
              href="#partnerships"
              onClick={handleNavigate}
              style={{
                color: 'var(--jlr-white)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'block',
              }}
            >
              Defender Partnerships
            </a>

            <a
              href="#footer"
              onClick={handleNavigate}
              style={{
                color: 'var(--jlr-white)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                paddingBottom: '12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'block',
              }}
            >
              Contact & Support
            </a>

            <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)', marginBottom: '16px', letterSpacing: '0.05em' }}>
                FIND A RETAILER
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--jlr-white)', fontWeight: 400 }}>
                Locate your nearest authorized JLR showroom in India.
              </p>
            </div>
          </div>

          {/* Vehicles Submenu Panel */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: currentLevel === 'vehicles' ? 'translateX(0)' : 'translateX(100%)',
              overflowY: 'auto',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em', uppercase: true }}>
              SELECT VEHICLE FAMILY
            </div>

            {/* Defender Model Family */}
            <Link
              to="/defender"
              onClick={handleNavigate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'var(--jlr-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '4px' }}>DEFENDER</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)' }}>Starting from ₹ 97 Lakhs*</p>
              </div>
              <ChevronRight size={16} color="var(--jlr-light-grey)" />
            </Link>

            {/* Range Rover Family */}
            <Link
              to="/rangerover"
              onClick={handleNavigate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'var(--jlr-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '4px' }}>RANGE ROVER</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)' }}>Starting from ₹ 2.3 Cr*</p>
              </div>
              <ChevronRight size={16} color="var(--jlr-light-grey)" />
            </Link>

            {/* Discovery Family */}
            <Link
              to="/discovery"
              onClick={handleNavigate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'var(--jlr-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '4px' }}>DISCOVERY</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)' }}>Starting from ₹ 95 Lakhs*</p>
              </div>
              <ChevronRight size={16} color="var(--jlr-light-grey)" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
