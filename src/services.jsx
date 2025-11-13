import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Globe, Code, ArrowRight, Sparkles } from 'lucide-react';

export default function ServicesShowcase() {
  const [activeProject, setActiveProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Smart IoT Home System",
      category: "IoT",
      icon: <Wifi className="w-8 h-8" />,
      description: "Intelligent home automation system with real-time monitoring and control capabilities.",
      features: [
        "Remote device control via mobile app",
        "Energy consumption analytics",
        "Voice command integration",
        "Automated schedules and routines"
      ],
      tech: ["Arduino", "MQTT", "Node.js", "React Native"],
      color: "from-cyan-500 to-blue-600",
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      category: "Website",
      icon: <Globe className="w-8 h-8" />,
      description: "Full-featured online shopping platform with secure payment integration and inventory management.",
      features: [
        "Product catalog with search & filters",
        "Secure payment gateway",
        "Order tracking system",
        "Admin dashboard for inventory"
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      color: "from-cyan-400 to-teal-500",
      gradient: "bg-gradient-to-br from-cyan-400/20 to-teal-500/20"
    },
    {
      id: 3,
      title: "Portfolio & Blog Website",
      category: "Website",
      icon: <Code className="w-8 h-8" />,
      description: "Modern, responsive portfolio website with integrated blog and content management system.",
      features: [
        "Responsive design for all devices",
        "Dynamic blog with CMS",
        "SEO optimized pages",
        "Contact form with email integration"
      ],
      tech: ["Next.js", "Tailwind CSS", "Contentful", "Vercel"],
      color: "from-cyan-600 to-blue-700",
      gradient: "bg-gradient-to-br from-cyan-600/20 to-blue-700/20"
    }
  ];

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white py-20 px-4 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* MouseFollower Glow */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm">Premium Services</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-300">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Delivering cutting-edge solutions across IoT and web development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.2}s both`
              }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${project.gradient}`} />
              
              <div
                className={`relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 cursor-pointer ${
                  hoveredCard === project.id
                    ? 'border-cyan-400/80 shadow-2xl shadow-cyan-500/50 -translate-y-2'
                    : 'border-cyan-500/20 hover:border-cyan-400/50'
                }`}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400/50 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with pulse effect */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${project.color} mb-4 transition-all duration-300 ${
                  hoveredCard === project.id ? 'scale-110 animate-pulse' : ''
                }`}>
                  {project.icon}
                </div>

                {/* Category Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-sm mb-3 transition-all duration-300 ${
                  hoveredCard === project.id 
                    ? 'bg-cyan-500/30 text-cyan-200 scale-105' 
                    : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {project.category}
                </span>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Expandable Details */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  activeProject === project.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-cyan-500/30 space-y-4">
                    {/* Features */}
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        Key Features:
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start hover:text-cyan-300 transition-colors duration-200">
                            <span className="text-cyan-400 mr-2">▸</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded text-xs border border-cyan-500/30 hover:bg-cyan-500/20 hover:scale-105 transition-all duration-200 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand Indicator with animation */}
                <div className={`mt-4 text-center text-sm text-cyan-400 transition-all duration-300 ${
                  hoveredCard === project.id ? 'opacity-100' : 'opacity-70'
                }`}>
                  <span className="inline-flex items-center gap-2">
                    {activeProject === project.id ? (
                      <>▲ Click to collapse</>
                    ) : (
                      <>▼ Click to expand</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="relative bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 max-w-3xl mx-auto backdrop-blur-sm overflow-hidden group">
            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Project?</h2>
              <p className="text-gray-300 mb-6">
                Let's collaborate to bring your ideas to life with innovative solutions
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70 inline-flex items-center gap-2 group">
                Get In Touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .bg-300 {
          background-size: 300%;
        }
      `}</style>
    </div>
  );
}