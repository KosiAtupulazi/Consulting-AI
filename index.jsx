import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
  Target, 
  Rocket, 
  Calendar, 
  TrendingUp, 
  Users, 
  Zap,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react';

// CALENDLY LINK - Replace this placeholder with your actual Calendly link
const CALENDLY_LINK = "https://calendly.com/your-link-here";

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  
  // Animated counters
  const [meetings, setMeetings] = useState(0);
  const [days, setDays] = useState(0);
  const [cost, setCost] = useState(0);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Enhanced 3D background with floating geometric shapes
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
      new THREE.BoxGeometry(1.5, 1.5, 1.5)
    ];

    const colorPalette = [
      new THREE.Color('#7a306c'),
      new THREE.Color('#9d4d8f'),
      new THREE.Color('#c076b2'),
      new THREE.Color('#5a2350'),
    ];

    // Create 15 floating shapes
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        transparent: true,
        opacity: 0.15,
        wireframe: Math.random() > 0.5,
        flatShading: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 50;
      mesh.position.y = (Math.random() - 0.5) * 50;
      mesh.position.z = (Math.random() - 0.5) * 50;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      mesh.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };

      mesh.userData.floatSpeed = (Math.random() - 0.5) * 0.02;
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x7a306c, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xc076b2, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 80;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    sceneRef.current = { scene, camera, renderer, shapes, particles };

    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        
        shape.position.y += Math.sin(time + shape.userData.floatOffset) * 0.01;
      });

      // Animate particles
      particles.rotation.y += 0.0003;

      // Camera follows mouse smoothly
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setMeetings(Math.floor(10 + (5 * progress)));
      setDays(Math.floor(30 * progress));
      setCost(Math.floor(3 * progress));

      if (currentStep >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'what-we-do', 'how-it-works', 'who-we-work-with', 'pricing', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle CTA button clicks - Opens Calendly
  const handleCalendlyClick = () => {
    // TODO: Replace CALENDLY_LINK constant at the top of this file with your actual Calendly URL
    window.open(CALENDLY_LINK, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        :root {
          --primary: #7a306c;
          --primary-light: #9d4d8f;
          --primary-lighter: #c076b2;
          --primary-dark: #5a2350;
          --primary-darker: #3d1836;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #000;
          overflow-x: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--primary-light), var(--primary-lighter));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .glow-button {
          position: relative;
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          animation: colorCycle 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        @keyframes colorCycle {
          0%, 100% { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); }
          50% { background: linear-gradient(135deg, var(--primary-dark), var(--primary-darker)); }
        }

        .glow-button::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, var(--primary), var(--primary-light), var(--primary-lighter));
          border-radius: inherit;
          opacity: 0;
          filter: blur(15px);
          transition: opacity 0.3s;
          z-index: -1;
        }

        .glow-button:hover::before {
          opacity: 0.8;
        }

        .glow-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(122, 48, 108, 0.4);
        }

        .glow-border {
          border: 1px solid var(--primary);
          box-shadow: 0 0 20px rgba(122, 48, 108, 0.3);
        }

        .card-glow {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-glow:hover {
          box-shadow: 0 0 40px rgba(122, 48, 108, 0.6);
          transform: translateY(-12px) scale(1.02);
          border-color: var(--primary-lighter);
        }

        .energy-line {
          background: linear-gradient(90deg, 
            transparent 0%, 
            var(--primary) 25%, 
            var(--primary-light) 50%, 
            var(--primary-lighter) 75%, 
            transparent 100%
          );
          animation: energyFlow 3s linear infinite;
        }

        @keyframes energyFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .particle-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(122, 48, 108, 0.1), rgba(157, 77, 143, 0.05));
          border: 1px solid rgba(122, 48, 108, 0.3);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          background: linear-gradient(135deg, rgba(122, 48, 108, 0.2), rgba(157, 77, 143, 0.1));
          border-color: var(--primary);
          transform: translateX(8px);
        }
      `}</style>

      <canvas ref={canvasRef} className="particle-bg" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl glow-border border-t-0 border-x-0"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              SORREN AI
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'what-we-do', label: 'What We Do' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-primary-lighter border-b-2 border-primary-lighter'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              <span className="gradient-text">AI-Powered Outbound</span>
              <br />
              <span className="text-white">for Early-Stage B2B SaaS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              We book qualified sales meetings for seed-stage startups. <span className="text-primary-lighter font-bold">No SDR hire required.</span>
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalendlyClick}
              className="glow-button px-12 py-5 rounded-full text-white font-bold text-lg mb-16 inline-flex items-center gap-2"
            >
              Book a Call
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <StatCard
              icon={<TrendingUp className="w-8 h-8" />}
              value={`${meetings}–15`}
              label="Qualified Meetings Per Month"
              delay={0.9}
            />
            <StatCard
              icon={<Clock className="w-8 h-8" />}
              value={days}
              label="Days To First Results"
              delay={1.0}
            />
            <StatCard
              icon={<DollarSign className="w-8 h-8" />}
              value={`$${cost}k/mo`}
              label="vs $80k SDR Salary"
              delay={1.1}
            />
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <Section id="what-we-do" title="What We Do" subtitle="We handle your entire outbound process so you can focus on closing deals.">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary-dark/40 to-primary/30 rounded-2xl border border-primary/40 p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Zap className="w-6 h-6 text-primary-lighter" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">The Challenge</h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Early-stage startups need consistent lead flow, but hiring an SDR is expensive and slow. Most take 3-6 months to ramp up and cost $80k+ per year in salary and overhead.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary/40 to-primary-lighter/30 rounded-2xl border border-primary-lighter/40 p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary-lighter/20 rounded-xl">
                <Sparkles className="w-6 h-6 text-primary-lighter" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold gradient-text">The Solution</h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              We become your outbound team. Using Artificial Intelligence and human oversight, we find your ideal customers, write personalized outreach, and book qualified meetings directly in your calendar.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" title="How It Works" subtitle="Simple, transparent, results-driven." dark>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <HowItWorksCard
            number="01"
            title="Define Your ICP"
            description="We start with a 30-minute call to understand your ideal customer, value proposition, and what makes a qualified meeting."
            icon={<Target className="w-12 h-12" />}
            delay={0}
          />
          <HowItWorksCard
            number="02"
            title="We Build & Execute"
            description="Our AI finds and researches prospects matching your profile. We write personalized outreach and send 50 emails per day on your behalf."
            icon={<Rocket className="w-12 h-12" />}
            delay={0.2}
          />
          <HowItWorksCard
            number="03"
            title="You Close Deals"
            description="When prospects are interested, we book them in your calendar. You just show up to qualified meetings."
            icon={<Calendar className="w-12 h-12" />}
            delay={0.4}
          />
        </div>
      </Section>

      {/* Who We Work With Section - Enhanced */}
      <Section id="who-we-work-with" title="Built for Seed-Stage B2B SaaS" subtitle="We work with early-stage startups selling to other businesses.">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary-dark/40 to-primary/30 rounded-3xl border border-primary/50 p-8 md:p-12 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/30 rounded-xl">
                <Building2 className="w-8 h-8 text-primary-lighter" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Ideal Clients</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp className="w-5 h-5" />, text: 'Seed to Series A stage', color: 'primary' },
                { icon: <Sparkles className="w-5 h-5" />, text: 'B2B SaaS product', color: 'primary-light' },
                { icon: <Users className="w-5 h-5" />, text: 'Need consistent pipeline', color: 'primary-lighter' },
                { icon: <DollarSign className="w-5 h-5" />, text: "Can't afford or don't want to hire an SDR yet", color: 'primary' },
                { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Founder is still involved in sales', color: 'primary-light' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="feature-card rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg text-primary-lighter">
                      {item.icon}
                    </div>
                    <span className="text-gray-200 text-lg font-medium">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 p-6 bg-black/30 rounded-2xl border border-primary/30"
            >
              <p className="text-gray-300 text-center leading-relaxed">
                <span className="text-primary-lighter font-semibold">Perfect fit?</span> We help startups that need to scale outbound fast without the overhead of building an SDR team.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" title="Simple Pricing" subtitle="No long-term contracts. Cancel anytime." dark>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative bg-gradient-to-br from-primary-dark/50 to-primary/40 rounded-3xl border-2 border-primary/60 p-10 md:p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="energy-line absolute top-1/3 left-0 right-0 h-0.5" />
              <div className="energy-line absolute top-2/3 left-0 right-0 h-0.5" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-2 bg-primary/30 rounded-full text-primary-lighter text-sm uppercase tracking-wider font-semibold mb-6 border border-primary/50"
              >
                30-Day Pilot
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-7xl md:text-8xl font-black gradient-text mb-2"
              >
                $1,500
              </motion.div>
              
              <div className="text-gray-400 mb-8 text-lg">One-time pilot fee</div>

              <div className="bg-black/40 rounded-2xl p-6 mb-8 border border-primary/20">
                <div className="text-white font-bold mb-6 text-lg flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-lighter" />
                  What's Included
                </div>
                <div className="space-y-4 text-left">
                  {[
                    'Goal: 10-15 qualified meetings in 30 days',
                    'Custom prospect research & list building',
                    'Personalized outreach campaigns',
                    'Full reply management',
                    'Weekly performance reports',
                    'Continue at $3k/month if you\'re happy'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-gray-300">{item}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCalendlyClick}
                className="glow-button w-full px-8 py-5 rounded-full text-white font-bold text-lg mb-4 inline-flex items-center justify-center gap-2"
              >
                Start Your Pilot
                <Rocket className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* FAQ Section */}
      <Section id="faq" title="Frequently Asked Questions">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'How is this different from hiring an SDR?',
              a: 'An SDR costs $80k/year, takes 3-6 months to ramp, and requires management. We cost $3k/month, start delivering in 30 days, and require zero management from you.'
            },
            {
              q: 'How is this different from AI SDR tools like 11x or Artisan?',
              a: 'Those are self-service software tools - you set them up and manage them yourself. We\'re a done-for-you service. You give us your ICP, we handle everything, and you just show up to meetings.'
            },
            {
              q: 'What if I don\'t get results?',
              a: 'The pilot is designed to prove value in 30 days. If we don\'t book 10+ qualified meetings, we\'ll work with you to figure out why or part ways. No hard feelings.'
            },
            {
              q: 'How do you define a "qualified" meeting?',
              a: 'During onboarding, you tell us exactly what makes someone qualified (company size, industry, role, pain points, etc). We only book meetings with people who match your criteria.'
            },
            {
              q: 'Do I need to provide anything?',
              a: 'Just your time for the initial onboarding call (30 min) and showing up to the meetings we book. We handle everything else.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-dark/30 to-primary/20 rounded-xl border border-primary/30 overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: 'rgba(122, 48, 108, 0.15)' }}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-primary-lighter flex-shrink-0" />
                </motion.div>
              </motion.button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === index ? 'auto' : 0,
                  opacity: openFaq === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-300 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Ready to Build Your Pipeline?" subtitle="Book a 15-minute call to see if we're a good fit." dark>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.button
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCalendlyClick}
            className="glow-button px-14 py-6 rounded-full text-white font-bold text-xl mb-8 inline-flex items-center gap-3"
          >
            <Calendar className="w-6 h-6" />
            Schedule a Call
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400"
          >
            Or email us at{' '}
            <a href="mailto:hello@sorren.ai" className="text-primary-lighter hover:text-primary-light transition-colors font-medium">
              hello@sorren.ai
            </a>
          </motion.div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="relative border-t border-gray-900 py-12 px-6">
        <div className="absolute inset-0 opacity-5">
          <div className="energy-line absolute top-0 left-0 right-0 h-px" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center space-y-2">
          <div className="text-gray-500 text-sm">
            © 2025 Sorren AI. All rights reserved.
          </div>
          <div className="text-gray-600 text-sm">
            Contact:{' '}
            <a href="mailto:hello@sorren.ai" className="text-primary-lighter hover:text-primary-light transition-colors">
              hello@sorren.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-primary-dark/40 to-primary/30 rounded-2xl border border-primary/40 p-6 text-center backdrop-blur-sm"
    >
      <div className="flex justify-center mb-3 text-primary-lighter">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
        {value}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

// Reusable Section Component
function Section({ id, title, subtitle, children, dark = false }) {
  return (
    <section
      id={id}
      className={`relative py-24 px-6 ${dark ? 'bg-gradient-to-b from-black via-primary-darker/10 to-black' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

// How It Works Card Component
function HowItWorksCard({ number, title, description, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="card-glow relative bg-gradient-to-br from-primary-dark/50 to-primary/40 rounded-2xl border border-primary/50 p-8 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-black text-primary-light opacity-30"
        >
          {number}
        </motion.div>
        <div className="text-primary-lighter">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}