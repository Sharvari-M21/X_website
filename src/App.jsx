import React, { useEffect, useRef, useState } from "react";
import logoimage from "./assets/LOGO.jpeg"; 

export default function App() {
  const canvasRef = useRef(null);
  const [navActive, setNavActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  // Main effect for setup, animations, and event listeners
  useEffect(() => {
    // Inject CSS (keeps styling self-contained for single-file convenience)
    const style = document.createElement("style");
    style.innerHTML = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, #root { height: 100%; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; overflow-x: hidden; scroll-behavior: smooth; }
    #particles-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: linear-gradient(135deg, #19b9acff 0%, #3a989bff 100%); }

    /* Header and Navigation */
    header { background: rgba(51, 201, 193, 0.95); backdrop-filter: blur(10px); color: white; padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; box-shadow: 0 2px 20px rgba(0,0,0,0.2); transition: all 0.3s ease; }
    header.scrolled { padding: 0.5rem 0; background: rgba(12, 167, 159, 0.98); }
    nav { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 2rem; }
    .logo { display: flex; align-items: center; gap: 10px; font-size: 1.5rem; font-weight: bold; cursor: pointer; transition: transform 0.3s; }
    .logo:hover { transform: scale(1.05); }
    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a { color: white; text-decoration: none; transition: all 0.3s; position: relative; padding: 5px 0; }
    .nav-links a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: white; transition: width 0.3s; }
    .nav-links a:hover::after { width: 100%; }
    .mobile-menu-btn { display: none; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; z-index: 1001; }

    /* Hero Section */
    .hero { position: relative; color: white; padding: 180px 2rem 120px; text-align: center; margin-top: 60px; min-height: 600px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
    .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0; transform: translateY(30px); transition: all 0.8s ease 0.3s; }
    .hero p { font-size: 1.4rem; margin-bottom: 2rem; opacity: 0; transform: translateY(30px); max-width: 800px; transition: all 0.8s ease 0.6s; }
    .cta-button { background: white; color: #1f9e9eff; padding: 15px 40px; border: none; border-radius: 50px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; opacity: 0; transform: translateY(30px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.8s ease 0.9s; }
    .hero.visible h1, .hero.visible p, .hero.visible .cta-button { opacity: 1; transform: translateY(0); }
    .cta-button:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.4); background: #f0f0f0; }
    .scroll-indicator { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 30px; height: 50px; border: 2px solid white; border-radius: 20px; opacity: 0.7; cursor: pointer; }
    .scroll-indicator::before { content: ''; position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 6px; height: 6px; background: white; border-radius: 50%; animation: scroll 2s infinite; }
    @keyframes scroll { 0% { transform: translate(-50%, 0); opacity: 1; } 100% { transform: translate(-50%, 20px); opacity: 0; } }

    /* General Animation & Section Styles */
    .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    .section-title { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }

    /* Services Section (White Background) */
    .services { max-width: 1200px; margin: 80px auto; padding: 0 2rem; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.05);}
    .services .section-title { color: #238086ff; } /* Blue title on white background */
    .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .service-card { background: #fdfdff; padding: 2rem; border-radius: 15px; border: 1px solid #eef; box-shadow: 0 5px 20px rgba(0,71,171,0.05); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; position: relative; overflow: hidden; }
    .service-card::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(30, 144, 255, 0.08), transparent); transition: left 0.5s; }
    .service-card:hover::before { left: 100%; }
    .service-card:hover { transform: translateY(-15px) scale(1.02); box-shadow: 0 20px 50px rgba(0,71,171,0.2); }
    .service-icon { width: 70px; height: 70px; background: linear-gradient(135deg, #216f7cff 0%, #23737eff 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; margin-bottom: 1.5rem; transition: all 0.3s; }
    .service-card:hover .service-icon { transform: rotateY(360deg); }
    .service-card h3 { color: #208386ff; margin-bottom: 1rem; font-size: 1.4rem; }
    .service-card p { color: #666; line-height: 1.8; }

    /* Industries Section (White Background) */
    .industries { background: white; padding: 80px 2rem; margin: 80px 0; }
    .industries .section-title { color: #2d90a8ff; } /* Blue title on white background */
    .industry-list { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; text-align: center; }
    .industry-item { background: #f8f9fa; padding: 2rem; border-radius: 10px; border-left: 4px solid #0da591ff; color: #089e85ff; transition: all 0.3s ease; cursor: pointer; }
    .industry-item:hover { transform: translateY(-5px) scale(1.03); box-shadow: 0 10px 30px rgba(1, 143, 187, 0.2); }

    /* Footer */
    footer { background: #1a1a1a; color: white; padding: 40px 2rem 20px; }
    .footer-content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem; }
    .footer-section h4 { color: #218d91ff; margin-bottom: 1rem; }
    .footer-section ul { list-style: none; }
    .footer-section ul li { margin-bottom: 0.5rem; }
    .footer-section a { color: #ccc; text-decoration: none; transition: all 0.3s; }
    .footer-section a:hover { color: #30deebff; padding-left: 5px; }
    .footer-bottom { text-align: center; padding-top: 2rem; border-top: 1px solid #444; color: #999; }
    
    /* Utility */
    .back-to-top { position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: linear-gradient(135deg, #0047AB 0%, #1E90FF 100%); color: white; border: none; border-radius: 50%; font-size: 1.5rem; cursor: pointer; opacity: 0; transform: translateY(20px); transition: all 0.3s; z-index: 999; box-shadow: 0 5px 20px rgba(0,71,171,0.4); }
    .back-to-top.visible { opacity: 1; transform: translateY(0); }
    .back-to-top:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(27, 144, 173, 0.6); }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .hero p { font-size: 1.2rem; }
      .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background: rgba(0, 71, 171, 0.98); padding: 1rem 0; gap: 0; }
      .nav-links.active { display: flex; }
      .nav-links li { padding: 1rem 2rem; width: 100%; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .mobile-menu-btn { display: block; }
      .service-grid { grid-template-columns: 1fr; }
    }
    `;
    document.head.appendChild(style);

    // Canvas & particles setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - dist / 750})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      connectParticles();
      animationId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // Scroll & UI interaction listeners
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsBackToTopVisible(window.scrollY > 500);
    };

    // Animate on scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    // Hero animation is now CSS-driven on initial load
    document.querySelector('.hero')?.classList.add('visible');

    // Setup global event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);

    // Cleanup function on component unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once on mount.

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setNavActive(false);
    }
  };

  return (
    <div>
      <canvas id="particles-canvas" ref={canvasRef}></canvas>

      <header id="header" className={isScrolled ? "scrolled" : ""}>
        <nav>
          <div className="logo" onClick={scrollToTop}>
            <img
              src={logoimage} // Corrected variable name
              alt="Company Logo"
              style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
            />
            <span>Xenovate Intellitect</span>
          </div>

          <ul className={`nav-links ${navActive ? "active" : ""}`}>
            <li><a href="#services" onClick={handleNavClick}>Services</a></li>
            <li><a href="#industries" onClick={handleNavClick}>Industries</a></li>
            <li><a href="#about" onClick={handleNavClick}>About Us</a></li>
          </ul>

          <button className="mobile-menu-btn" onClick={() => setNavActive(!navActive)}>
            {navActive ? '✕' : '☰'}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <h1>Engineering Modern Business</h1>
          <p>We help organizations modernize technology, reimagine processes, and transform experiences.</p>
          <a href="#services" className="cta-button">Get Started</a>
          <a href="#services" className="scroll-indicator" title="Scroll Down"></a>
        </section>

        <section className="services" id="services">
          <h2 className="section-title fade-in">Our Services</h2>
          <div className="service-grid">
            <div className="service-card fade-in">
              <div className="service-icon">💼</div>
              <h3>Engineering</h3>
              <p>Frontend, Backend, and UI/UX Design solutions that drive growth and efficiency across your organization.</p>
            </div>
            <div className="service-card fade-in" style={{transitionDelay: '200ms'}}>
              <div className="service-icon">🤖</div>
              <h3>Data & AI</h3>
              <p>Leverage Data Science, Machine Learning (ML), and Deep Learning (DL) to unlock critical insights.</p>
            </div>
            <div className="service-card fade-in" style={{transitionDelay: '400ms'}}>
              <div className="service-icon">📈</div>
              <h3>Strategy</h3>
              <p>Expert Marketing and Business Consulting to protect your digital assets and guide your market strategy.</p>
            </div>
          </div>
        </section>

        <section className="industries" id="industries">
          <h2 className="section-title fade-in">Industries We Serve</h2>
          <div className="industry-list">
            <div className="industry-item fade-in"><h3>Banking & Financial Services</h3></div>
            <div className="industry-item fade-in" style={{transitionDelay: '100ms'}}><h3>Healthcare</h3></div>
            <div className="industry-item fade-in" style={{transitionDelay: '200ms'}}><h3>Retail & Consumer Goods</h3></div>
            <div className="industry-item fade-in" style={{transitionDelay: '300ms'}}><h3>Manufacturing</h3></div>
            <div className="industry-item fade-in" style={{transitionDelay: '400ms'}}><h3>Technology & Communications</h3></div>
            <div className="industry-item fade-in" style={{transitionDelay: '500ms'}}><h3>Energy & Utilities</h3></div>
          </div>
        </section>
        
        <footer id="about">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#about">Careers</a></li>
                <li><a href="#about">Investors</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Digital Business</a></li>
                <li><a href="#services">Cloud Services</a></li>
                <li><a href="#services">AI & Analytics</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Events</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Locations</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom"><p>© 2025 Xcompany. All rights reserved.</p></div>
        </footer>

        <button 
          className={`back-to-top ${isBackToTopVisible ? "visible" : ""}`} 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          
        </button>
      </main>
    </div>
  );
}