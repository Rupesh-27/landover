import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import VehicleConfigurator from '../components/VehicleConfigurator';
import SpecsComparison from '../components/SpecsComparison';
import Chassis3DAnimation from '../components/Chassis3DAnimation';

const SHOWCASE_MODELS = [
  {
    name: 'DISCOVERY',
    tagline: 'THE ULTIMATE SEVEN-SEAT PREMIUM FAMILY SUV',
    price: '₹ 97,00,000*',
    image: 'discovery_darkgrey.png',
    power: '300 PS Turbo Diesel',
    acceleration: '6.8 seconds (0-100 km/h)',
    clearance: '283 mm Ground Clearance',
  },
  {
    name: 'DISCOVERY SPORT',
    tagline: 'VERSATILE COMPACT 5+2 ADVENTURE SUV',
    price: '₹ 72,00,000*',
    image: 'discovery_bronze.png',
    power: '250 PS Mild-Hybrid Petrol',
    acceleration: '7.8 seconds (0-100 km/h)',
    clearance: '212 mm Ground Clearance',
  },
];

const PARTNERSHIPS = [
  {
    title: 'TUSK TRUST WILDLIFE CONSERVATION',
    desc: 'Protecting endangered African wildlife, combating poaching, and funding local community education and habitat protection initiatives.',
    bg: '#081710'
  },
  {
    title: 'RED CROSS EMERGENCY SERVICES',
    desc: 'Supporting international humanitarian crisis response for over 65 years with specially equipped off-road response units.',
    bg: '#112218'
  },
  {
    title: 'LAND ROVER OFF-ROAD ACADEMIES',
    desc: 'Bespoke driving academies and survival clinics globally, teaching advanced recovery techniques and composition under stress.',
    bg: '#081710'
  }
];

export default function DiscoveryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activePartnershipIndex, setActivePartnershipIndex] = useState(0);

  // Form states
  const [testDriveBooked, setTestDriveBooked] = useState(false);
  const [tdName, setTdName] = useState('');
  const [tdEmail, setTdEmail] = useState('');
  const [tdPhone, setTdPhone] = useState('');

  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [nlEmail, setNlEmail] = useState('');

  const modelShowcaseRef = useRef(null);

  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openConfigurator = () => setIsConfiguratorOpen(true);
  const closeConfigurator = () => setIsConfiguratorOpen(false);

  const handleNextModel = () => {
    setActiveModelIndex((prev) => (prev + 1) % SHOWCASE_MODELS.length);
  };

  const handlePrevModel = () => {
    setActiveModelIndex((prev) => (prev - 1 + SHOWCASE_MODELS.length) % SHOWCASE_MODELS.length);
  };

  const handleNextPartnership = () => {
    setActivePartnershipIndex((prev) => (prev + 1) % PARTNERSHIPS.length);
  };

  const handlePrevPartnership = () => {
    setActivePartnershipIndex((prev) => (prev - 1 + PARTNERSHIPS.length) % PARTNERSHIPS.length);
  };

  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    if (tdName && tdEmail && tdPhone) {
      setTestDriveBooked(true);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (nlEmail) {
      setNewsletterSubscribed(true);
    }
  };

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#000000', color: 'var(--jlr-white)', minHeight: '100vh', width: '100vw' }}>
      
      {/* 1. Top Notification Banner */}
      <div
        style={{
          backgroundColor: '#050c08',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '10px 40px',
          textAlign: 'center',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#34c759', // Green accent highlight
          position: 'relative',
          zIndex: 101,
        }}
      >
        ADVENTURE MEETS REFINEMENT. THE NEW DISCOVERY SPORT DYNAMIC PACKS ARE NOW LIVE.
      </div>

      {/* Navigation Headers */}
      <Header toggleMenu={toggleMenu} openConfigurator={openConfigurator} />
      
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        openConfigurator={() => {
          setIsMenuOpen(false);
          openConfigurator();
        }}
      />
      
      <VehicleConfigurator isOpen={isConfiguratorOpen} onClose={closeConfigurator} initialBrand="discovery" />

      {/* 2. Hero Banner Section */}
      <section
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: '100px',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        >
          {/* Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.9) 100%)',
              zIndex: 1,
            }}
          />
          <img
            src="discovery_hero.png"
            alt="Discovery Forest Crossing"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Text Details Overlay */}
        <div
          className="animate-fade-in"
          style={{
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '800px',
            padding: '0 20px',
          }}
        >
          <div style={{ fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#68b284', marginBottom: '8px' }}>
            VERSATILITY FOR EVERY ADVENTURE
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '3.5rem',
              fontWeight: 800,
              letterSpacing: '0.25em',
              marginBottom: '20px',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              paddingLeft: '0.25em',
            }}
          >
            DISCOVERY
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--jlr-light-grey)',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
              letterSpacing: '0.05em',
            }}
          >
            Configured for family escape. Clever storage designs, seating flexibility up to 7 adults, and exceptional utility on and off road.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => scrollToSection(modelShowcaseRef)}
              className="cta-btn-outline"
            >
              EXPLORE ADVENTURE
            </button>
            <button
              onClick={openConfigurator}
              className="cta-btn-filled"
              style={{ backgroundColor: '#0b3c2c', borderColor: '#0b3c2c', color: 'white' }}
            >
              BUILD YOURS
            </button>
          </div>
        </div>
      </section>

      {/* 3. Accolades Banner */}
      <section
        className="reveal-up"
        style={{
          backgroundColor: '#0c0d12',
          padding: '40px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '30px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>CAPACITY</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', marginTop: '6px', color: '#68b284' }}>UP TO SEVEN FULL-SIZE SEATS</div>
          </div>
          <div style={{ height: '30px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'none', md: 'block' }} />
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>INTERIOR FLEXIBILITY</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', marginTop: '6px' }}>INTELLIGENT SEAT FOLD HUD</div>
          </div>
          <div style={{ height: '30px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'none', md: 'block' }} />
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>TRACTION RATING</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', marginTop: '6px' }}>TERRAIN RESPONSE 2 CONTROL</div>
          </div>
        </div>
      </section>

      {/* 4. Model Showcase Slider Section */}
      <section
        ref={modelShowcaseRef}
        id="explore"
        style={{
          padding: '100px 0',
          backgroundColor: '#000000',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ padding: '0 40px', marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px' }}>
              CHOOSE YOUR SPACE REQUIREMENT
            </div>
            <h2 style={{ fontSize: '2rem', letterSpacing: '0.15em', margin: 0 }}>THE DISCOVERY FAMILY</h2>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--jlr-light-grey)', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em' }}>
              {activeModelIndex + 1} / {SHOWCASE_MODELS.length}
            </span>
            <button
              onClick={handlePrevModel}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#68b284'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextModel}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#68b284'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Frame */}
        <div style={{ overflow: 'hidden', padding: '0 40px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: `translateX(-${activeModelIndex * 100}%)`,
            }}
          >
            {SHOWCASE_MODELS.map((model, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '40px',
                  opacity: idx === activeModelIndex ? 1 : 0.3,
                  transition: 'opacity 0.6s ease',
                }}
              >
                {/* Car Image Preview */}
                <div style={{ flex: '1 1 450px', display: 'flex', justifyContent: 'center', backgroundColor: '#07080b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', padding: '40px 20px' }}>
                  <img
                    src={model.image}
                    alt={model.name}
                    style={{
                      width: '100%',
                      maxWidth: '560px',
                      height: 'auto',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </div>

                {/* Spec details Card */}
                <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.2em', fontWeight: 600 }}>
                      {model.tagline}
                    </span>
                    <h3 style={{ fontSize: '2.2rem', letterSpacing: '0.1em', marginTop: '6px', fontWeight: 700 }}>
                      {model.name}
                    </h3>
                    <p style={{ fontSize: '1.2rem', color: 'var(--jlr-white)', fontWeight: 500, marginTop: '8px' }}>
                      Price starting from <strong style={{ color: '#68b284' }}>{model.price}</strong>
                    </p>
                  </div>

                  {/* Specifications HUD */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '2px solid rgba(8, 23, 16, 0.6)', paddingLeft: '20px' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>ENGINE & POWER OUTPUT</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500, marginTop: '2px' }}>{model.power}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>ACCELERATION (0-100 KM/H)</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500, marginTop: '2px' }}>{model.acceleration}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.1em' }}>OFF-ROAD WADING / CLEARANCE</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 500, marginTop: '2px' }}>{model.clearance}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                    <button
                      onClick={openConfigurator}
                      className="cta-btn-filled"
                      style={{ backgroundColor: '#0b3c2c', color: '#fff', border: '1px solid #0b3c2c' }}
                    >
                      Build and Price
                    </button>
                    <button
                      onClick={openConfigurator}
                      className="cta-btn-outline"
                    >
                      Configure Options
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Comparison Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#07080b', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <SpecsComparison brand="discovery" />
      </section>

      {/* Engineering & Chassis Section */}
      <section className="reveal-up" style={{ padding: '100px 0', backgroundColor: '#000', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '60px' }}>
          <div style={{ flex: '1 1 400px' }}>
            <span style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.3em', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
              Family Capability
            </span>
            <h2 style={{ fontSize: '2.2rem', letterSpacing: '0.15em', marginBottom: '20px', textTransform: 'uppercase' }}>
              Aluminum Architecture
            </h2>
            <p style={{ color: 'var(--jlr-light-grey)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '20px' }}>
              The Discovery features an advanced lightweight aluminum body architecture. The monocoque body uses aerospace-style structural adhesive and rivets to deliver high strength and safety, preserving family travel security and maximizing fuel efficiency by saving up to 480kg.
            </p>
            <div style={{ borderLeft: '2px solid #68b284', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#fff' }}>Intelligent Seat Fold</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--jlr-light-grey)' }}>Configure second and third-row layouts seamlessly through the central touchscreen portal.</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9rem', color: '#fff' }}>900 mm Wading Depth</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--jlr-light-grey)' }}>Engineered to safely cross deep water streams during heavy family expeditions.</span>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 500px', width: '100%' }}>
            <Chassis3DAnimation activeColor="#68b284" brandTitle="Discovery Family Platform" />
          </div>
        </div>
      </section>

      {/* 5. Transactional CTAs (Build / Test Drive) */}
      <section className="reveal-up" style={{ backgroundColor: 'var(--jlr-charcoal)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
          
          {/* Box 1: Configurator */}
          <div
            style={{
              flex: '1 1 500px',
              padding: '80px 60px',
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '40px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
                CUSTOMIZE SEATS & FAMILY COMFORT
              </div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '0.15em', marginBottom: '20px' }}>BUILD AND ORDER</h2>
              <p style={{ color: 'var(--jlr-light-grey)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '500px' }}>
                Select row variants, active safety features, technology integrations, and travel packages tailored to your lifestyle requirements.
              </p>
            </div>
            <div>
              <button
                onClick={openConfigurator}
                className="cta-link-primary"
                style={{ color: '#68b284', borderColor: '#68b284' }}
              >
                Launch Builder <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Box 2: Test Drive Form */}
          <div
            style={{
              flex: '1 1 500px',
              padding: '80px 60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '40px',
              backgroundColor: '#060a08',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
                FEEL THE VERSATILE CONTROL
              </div>
              <h2 style={{ fontSize: '2rem', letterSpacing: '0.15em', marginBottom: '20px' }}>BOOK EXPERIENCE DRIVE</h2>
              <p style={{ color: 'var(--jlr-light-grey)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '500px', marginBottom: '24px' }}>
                Schedule a private road test or attend one of our Land Rover Experience driving clinics in India.
              </p>
              
              {testDriveBooked ? (
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: 'rgba(11, 60, 44, 0.1)',
                    border: '1px solid #68b284',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    animation: 'fadeIn 0.5s ease',
                  }}
                >
                  <strong>Experience Requested!</strong> Hello {tdName}, our Discovery Concierge Desk will contact you at {tdPhone} to confirm details.
                </div>
              ) : (
                <form onSubmit={handleTestDriveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={tdName}
                    onChange={(e) => setTdName(e.target.value)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'white',
                      padding: '12px 16px',
                      fontSize: '0.85rem',
                      outline: 'none',
                      borderRadius: '3px',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={tdEmail}
                      onChange={(e) => setTdEmail(e.target.value)}
                      style={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'white',
                        padding: '12px 16px',
                        fontSize: '0.85rem',
                        outline: 'none',
                        borderRadius: '3px',
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      required
                      value={tdPhone}
                      onChange={(e) => setTdPhone(e.target.value)}
                      style={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'white',
                        padding: '12px 16px',
                        fontSize: '0.85rem',
                        outline: 'none',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="cta-btn-outline"
                    style={{ width: '100%', padding: '12px', backgroundColor: 'var(--jlr-white)', color: '#000', fontWeight: 'bold' }}
                  >
                    SUBMIT REQUEST
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quick Grid Actions */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#000' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em' }}>
          <a
            href="#explore"
            style={{
              flex: '1 1 250px',
              padding: '30px 40px',
              textAlign: 'center',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#68b284'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
          >
            VEHICLE OPTIONS
          </a>
          <button
            onClick={openConfigurator}
            style={{
              background: 'none',
              border: 'none',
              flex: '1 1 250px',
              padding: '30px 40px',
              textAlign: 'center',
              color: 'inherit',
              cursor: 'pointer',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              letterSpacing: '0.15em',
              gap: '10px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#68b284'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
          >
            VIEW PRICING
          </button>
          <a
            href="#footer"
            style={{
              flex: '1 1 250px',
              padding: '30px 40px',
              textAlign: 'center',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#68b284'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
          >
            OUTDOOR GEAR CATALOG
          </a>
          <button
            onClick={() => handleTestDriveSubmit({ preventDefault: () => {} })}
            style={{
              background: 'none',
              border: 'none',
              flex: '1 1 250px',
              padding: '30px 40px',
              textAlign: 'center',
              color: 'inherit',
              cursor: 'pointer',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              letterSpacing: '0.15em',
              gap: '10px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#68b284'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
          >
            BOOK CLINIC SESSION ONLINE
          </button>
        </div>
      </section>

      {/* 7. Partnerships / Journeys Banner */}
      <section
        id="partnerships"
        style={{
          padding: '100px 0',
          backgroundColor: '#060d0a',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ padding: '0 40px', marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px' }}>
              GLOBAL CONSERVATION AND HUMANITARIAN DEPLOYMENTS
            </div>
            <h2 style={{ fontSize: '2rem', letterSpacing: '0.15em', margin: 0 }}>DISCOVERY PARTNERSHIPS</h2>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handlePrevPartnership}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextPartnership}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Partnership slide view */}
        <div style={{ padding: '0 40px' }}>
          <div
            style={{
              padding: '60px',
              backgroundColor: PARTNERSHIPS[activePartnershipIndex].bg,
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              minHeight: '260px',
              justifyContent: 'center',
              animation: 'fadeIn 0.5s ease',
              transition: 'background-color 0.5s ease',
            }}
            key={activePartnershipIndex} /* force animation trigger */
          >
            <span style={{ fontSize: '0.75rem', color: '#68b284', letterSpacing: '0.2em', fontWeight: 600 }}>
              ORGANIZATION ENGAGEMENT
            </span>
            <h3 style={{ fontSize: '1.8rem', letterSpacing: '0.1em', fontWeight: 700, margin: 0 }}>
              {PARTNERSHIPS[activePartnershipIndex].title}
            </h3>
            <p style={{ color: 'var(--jlr-light-grey)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '700px' }}>
              {PARTNERSHIPS[activePartnershipIndex].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Footer Section */}
      <footer
        id="footer"
        style={{
          backgroundColor: '#040806',
          padding: '80px 40px 40px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Top Footer Section */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '60px', marginBottom: '80px' }}>
          {/* Newsletter Input */}
          <div style={{ flex: '1 1 350px' }}>
            <h4 style={{ fontSize: '0.8rem', color: 'var(--jlr-white)', letterSpacing: '0.2em', marginBottom: '20px' }}>
              SEE WHAT’S COMING
            </h4>
            <p style={{ color: 'var(--jlr-light-grey)', fontSize: '0.85rem', marginBottom: '24px', lineHeight: '1.6' }}>
              Sign up for notifications regarding JLR Discovery utility launches, lifestyle expeditions, and gear boutique alerts.
            </p>

            {newsletterSubscribed ? (
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(11, 60, 44, 0.1)',
                  border: '1px solid #68b284',
                  borderRadius: '3px',
                  color: 'white',
                  fontSize: '0.85rem',
                }}
              >
                Thank you! You have been successfully added to our family explorer briefings.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: '12px 18px',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="cta-btn-outline"
                  style={{ border: '1px solid var(--jlr-white)', padding: '12px 24px' }}
                >
                  JOIN
                </button>
              </form>
            )}
          </div>

          {/* Site links */}
          <div style={{ flex: '2 1 500px', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--jlr-white)', letterSpacing: '0.15em', marginBottom: '18px' }}>VEHICLES</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--jlr-light-grey)' }}>
                <li><a href="#explore">Discovery</a></li>
                <li><a href="#explore">Discovery Sport</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--jlr-white)', letterSpacing: '0.15em', marginBottom: '18px' }}>OWNERSHIP</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--jlr-light-grey)' }}>
                <li><a href="#explore">Roadside Assistance</a></li>
                <li><a href="#explore">Book Service Online</a></li>
                <li><a href="#explore">Discovery Warranty</a></li>
                <li><a href="#explore">JLR Financials</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--jlr-white)', letterSpacing: '0.15em', marginBottom: '18px' }}>EXPERIENCE</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--jlr-light-grey)' }}>
                <li><a href="#partnerships">Off-Road Clinics</a></li>
                <li><a href="#partnerships">Tusk Trust Projects</a></li>
                <li><a href="#partnerships">Discovery Gear Shop</a></li>
                <li><a href="#partnerships">JLR Newsroom</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.06)', margin: '40px 0' }} />

        {/* Bottom Social / Legal */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--jlr-light-grey)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Jaguar Land Rover India Limited. Registered Office: Mumbai, Maharashtra.
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '20px', color: 'var(--jlr-light-grey)' }}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s', display: 'inline-flex' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jlr-white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--jlr-light-grey)'} aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s', display: 'inline-flex' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jlr-white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--jlr-light-grey)'} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s', display: 'inline-flex' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jlr-white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--jlr-light-grey)'} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s', display: 'inline-flex' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--jlr-white)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--jlr-light-grey)'} aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer block */}
        <div
          style={{
            marginTop: '40px',
            fontSize: '0.65rem',
            color: 'var(--jlr-light-grey)',
            lineHeight: '1.6',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '16px',
            backgroundColor: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '4px',
          }}
        >
          <ShieldAlert size={16} style={{ flexShrink: 0, color: '#68b284', marginTop: '2px' }} />
          <div>
            *Disclaimer: The prices shown here are Ex-Showroom prices and are subject to change. Registration, road tax, and local dealer charges are extra. Custom specification elements depend on supply chain availability. Range Rover, Defender, and Discovery are registered trademarks of Jaguar Land Rover Limited.
          </div>
        </div>
      </footer>
    </div>
  );
}
