// NEUINN - Enhanced Quantum Interactions
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Splitting.js if available
    const initTextSplitting = () => {
        if (typeof Splitting === 'function') {
            try {
                Splitting();
            } catch (e) {
                console.warn('Text splitting failed:', e);
            }
        }
    };
    initTextSplitting();

    // 2. Theme Management System
    const initThemeSystem = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const getPreferredTheme = () => {
            const stored = localStorage.getItem('theme');
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark' : 'light';
        };

        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeToggle.setAttribute('aria-pressed', theme === 'dark');
        };

        setTheme(getPreferredTheme());

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light'
                ? 'dark' : 'light';
            setTheme(newTheme);
        });

        // Sync with OS theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    };
    initThemeSystem();

    // 3. Advanced Magnetic Effects
    const initMagneticEffects = () => {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        if (!magneticElements.length) return;

        magneticElements.forEach(el => {
            const strength = parseFloat(el.getAttribute('data-magnetic-strength')) || 0.2;
            let targetX = 0, targetY = 0;
            let currentX = 0, currentY = 0;
            const friction = 0.2;

            const animate = () => {
                currentX += (targetX - currentX) * friction;
                currentY += (targetY - currentY) * friction;

                el.style.transform = `translate(${currentX}px, ${currentY}px)`;
                requestAnimationFrame(animate);
            };
            animate();

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                targetX = (e.clientX - rect.left - rect.width / 2) * strength;
                targetY = (e.clientY - rect.top - rect.height / 2) * strength;
            });

            el.addEventListener('mouseleave', () => {
                targetX = targetY = currentX = currentY = 0;
            });
        });
    };
    initMagneticEffects();

    // 4. Optimized Scroll Animations
    const initScrollAnimations = () => {
        const scrollElements = document.querySelectorAll('[data-scroll]');
        if (!scrollElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(el => observer.observe(el));
    };
    initScrollAnimations();

    // 5. Enhanced 3D Tilt Effects
    const initTiltEffects = () => {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        if (!tiltElements.length) return;

        tiltElements.forEach(el => {
            const maxTilt = parseFloat(el.dataset.tiltMax) || 10;
            const perspective = parseFloat(el.dataset.tiltPerspective) || 1000;
            const scale = parseFloat(el.dataset.tiltScale) || 1;

            const handleMove = (clientX, clientY) => {
                const rect = el.getBoundingClientRect();
                const x = (clientX - rect.left) / rect.width;
                const y = (clientY - rect.top) / rect.height;

                const tiltX = (maxTilt / 2 - x * maxTilt).toFixed(2);
                const tiltY = (y * maxTilt - maxTilt / 2).toFixed(2);

                el.style.transform = `perspective(${perspective}px) 
                    rotateX(${tiltY}deg) 
                    rotateY(${tiltX}deg) 
                    scale(${scale})`;
            };

            el.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
            el.addEventListener('touchmove', (e) => handleMove(
                e.touches[0].clientX,
                e.touches[0].clientY
            ));

            el.addEventListener('mouseleave', () => {
                el.style.transform = `perspective(${perspective}px) rotateX(0) rotateY(0) scale(1)`;
            });
        });
    };
    initTiltEffects();

    // 6. High-Performance Particle Network
    const initParticleNetwork = () => {
        const canvas = document.querySelector('.particle-network-animation');
        if (!canvas) return;

        try {
            // Setup canvas
            const ctx = canvas.getContext('2d');
            let width = canvas.offsetWidth;
            let height = canvas.offsetHeight;
            const DPR = window.devicePixelRatio || 1;

            // Particle system
            const particles = [];
            const maxParticles = Math.min(Math.floor(width * height / 5000), 300);
            const connectionDistance = 150;
            const primaryHue = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-hue') || 210;

            // Initialize particles
            for (let i = 0; i < maxParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    hue: parseInt(primaryHue) + Math.random() * 30 - 15
                });
            }

            // Animation loop
            let animationId;
            const animate = () => {
                ctx.clearRect(0, 0, width, height);

                // Update and draw particles
                particles.forEach(p => {
                    // Movement
                    p.x += p.speedX;
                    p.y += p.speedY;

                    // Boundary check
                    if (p.x < 0 || p.x > width) p.speedX *= -1;
                    if (p.y < 0 || p.y > height) p.speedY *= -1;

                    // Draw particle
                    ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.8)`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Draw connections
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p1 = particles[i];
                        const p2 = particles[j];
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < connectionDistance) {
                            ctx.strokeStyle = `hsla(${primaryHue}, 80%, 60%, ${1 - distance / connectionDistance})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }

                animationId = requestAnimationFrame(animate);
            };

            // Handle resize
            const handleResize = () => {
                width = canvas.offsetWidth;
                height = canvas.offsetHeight;
                canvas.width = width * DPR;
                canvas.height = height * DPR;
                ctx.scale(DPR, DPR);
            };

            window.addEventListener('resize', () => {
                cancelAnimationFrame(animationId);
                handleResize();
                animate();
            });

            handleResize();
            animate();
        } catch (e) {
            console.error('Particle system error:', e);
            canvas.style.display = 'none';
        }
    };
    initParticleNetwork();

    // 7. Smooth Counting Animation
    const initCounters = () => {
        const stats = document.querySelectorAll('.stat-value[data-count]');
        if (!stats.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-count'));
                    const duration = 1500;
                    const startTime = performance.now();
                    const startValue = 0;
                    const easing = t => t * (2 - t); // Ease-out

                    const animateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easing(progress);
                        const value = Math.floor(easedProgress * endValue);

                        target.textContent = value.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        }
                    };

                    requestAnimationFrame(animateCount);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    };
    initCounters();

    // 8. Product Modal System
    /*const initProductModals = () => {
        const modal = document.getElementById('featureModal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.close-modal');

        // Product data - replace with your actual product details
        const products = {
            "Green Guard-Mosquito Trapper": {
                //image: "images/mosquito-trapper.jpg",
                fallbackImage: "https://via.placeholder.com/600x400?text=Mosquito+Trapper",
                description: "Our eco-friendly mosquito control system uses UV light and natural attractants to effectively reduce mosquito populations without harmful chemicals.",
                features: [
                    "UV light technology attracts mosquitoes",
                    "Natural CO2 emission mimics human breath",
                    "Whisper-quiet operation (<25dB)",
                    "Covers up to 50 square meters",
                    "Energy efficient (5W power consumption)"
                ]
            },
            "Smart Notification Bell": {
                //image: "images/smart-bell.jpg",
                fallbackImage: "https://via.placeholder.com/600x400?text=Smart+Bell",
                description: "Our IoT-enabled bell system sends instant notifications to your phone when someone rings.",
                features: [
                    "WiFi/Bluetooth connectivity",
                    "Mobile app notifications",
                    "Customizable ringtones",
                    "Battery life: 6 months",
                    "Weather resistant design"
                ]
            },
            "Smart Power Supply Unit": {
                //image: "images/power-supply.jpg",
                fallbackImage: "https://via.placeholder.com/600x400/e74c3c/ffffff?text=Smart+Power+Supply",
                description: "Intelligent power distribution with real-time monitoring and remote control capabilities.",
                features: [
                    " 6 smart outlets with individual control",
                    " Real-time energy consumption tracking",
                    " Mobile app control (iOS/Android)",
                    " Programmable scheduling & timers",
                    " WiFi & Bluetooth connectivity",
                    " USB-C PD 60W fast charging ports",
                    " Energy usage reports & analytics",
                    " Overload protection & surge suppression",
                    " Voice control (Alexa/Google Assistant)",
                    " Energy-saving auto-shutdown mode"
                ]
            },
            "Travel Friend": {
                //image: "images/travel-companion.jpg",
                fallbackImage: "https://via.placeholder.com/600x400/3498db/ffffff?text=Travel+Friend",
                description: "Your AI-powered travel companion with health monitoring, safety features, and global connectivity",
                features: [
                    " Multi-network eSIM (100+ countries)",
                    " Real-time location sharing with trusted contacts",
                    " Smart medication reminders with timezone adjustment",
                    " Hospital finder with multilingual medical phrases",
                    " Offline maps with danger zone alerts",
                    " 30-day battery + solar charging",
                    " IP68 waterproof & dustproof",
                    " WiFi hotspot (up to 10 devices)",
                    " Emergency button (connects to local authorities)",
                    " Flight/hotel tracking with auto-checkins"
                ]
            },
            "Herd-I-Tech": {
                //image: "images/herd-itech.jpg",
                fallbackImage: "https://via.placeholder.com/600x400/27ae60/ffffff?text=Herd-I-Tech",
                description: "End-to-end IoT and AI livestock management system for precision sheep/goat farming",
                features: [
                    " RFID ear tag monitoring (2000+ animal capacity)",
                    " Pasture climate stations (temp/humidity/NDVI)",
                    " Autonomous drone mustering with AI pathfinding",
                    " Smart water troughs with quality sensors",
                    " Methane emission tracking per animal",
                    " LoRaWAN gateways (10km ranch coverage)",
                    " Early disease detection via gait analysis",
                    " Pregnancy monitoring with 95% accuracy",
                    " Solar-powered nodes (5-year battery life)",
                    " FaaS (Farming-as-a-Service) analytics portal"
                ]
            },
            "Cattle Guard": {
                //image: "images/cattle-guard.jpg",
                fallbackImage: "https://via.placeholder.com/600x400/8e44ad/ffffff?text=Cattle+Guard",
                description: "Solar-powered insect elimination system protecting livestock from disease-carrying pests",
                features: [
                    " UV+CO2+Octenol triple-attractant technology",
                    " 20W solar panel with 72hr battery backup",
                    " 360° vortex trapping (500m² coverage)",
                    " LoRaWAN connectivity for herd monitoring",
                    " IP67 waterproof ranch-grade housing",
                    " AI insect counting with species identification",
                    " Non-toxic operation (no pesticides)",
                    " Auto-cleaning mechanism (weekly cycles)",
                    " Moonlight mode for nocturnal operation",
                    " NEUINN Ranch app integration",
                ]
            }
            // Add similar data for all 6 products
        };

        // Click handler for feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent.trim();
                const product = products[title];

                if (product) {
                    document.getElementById('modalTitle').textContent = title;
                    const img = document.getElementById('modalImage');
                    img.src = product.image;
                    img.onerror = () => { img.src = product.fallbackImage };
                    document.getElementById('modalDescription').textContent = product.description;
                    document.getElementById('modalFeatures').innerHTML =
                        product.features.map(f => `<li>${f}</li>`).join('');

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close handlers
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };
    initProductModals();*/

    // 9. Cleanup and Performance
    let animationFrameId;
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
    });

    // Add to your JS file
    function initVisionAnimation() {
        const vision = document.querySelector('.vision-text');
        if (vision) {
            vision.innerHTML = vision.textContent.split('').map(letter =>
                `<span class="vision-letter">${letter}</span>`
            ).join('');

            gsap.to('.vision-letter', {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                scrollTrigger: {
                    trigger: '.vision-statement',
                    start: 'top 80%'
                }
            });
        }
    }
    document.addEventListener('DOMContentLoaded', initVisionAnimation);




    const products = {
        "Green Guard-Mosquito Trapper": {
            images: [
                ,
                "g3.jpg", "g4.jpg", "g5.jpg", "g7.jpg", "g8.jpg",
                // Add 8 more image paths
            ],
            description: [
                "<strong> PROBLEM STATEMENT</strong><br><br> Mosquitoes are not only a nuisance but also a significant public health concern as they are vectors for diseases such as malaria, dengue fever, Zika virus, and chikungunya. Traditional mosquito control methods, such as chemical repellents, insecticides, and mosquito coils, often pose health risks to humans and animals, cause environmental damage, and can lead to mosquito resistance over time. Additionally, many of these solutions are not sustainable or effective in the long term, especially in residential and commercial settings.",
                "<strong> GreenGuard Mosquito Trapper</strong> aims to address these challenges by offering a safe, environmentally friendly, and effective solution for mosquito control.",
                "<strong> Key Problems Addressed:</strong><br> 1. Health Risks <br> 2. Environmental Impact <br> 3. Resistance <br> 4. Limited Accessibility <br> 5. Ineffectiveness",
                "<strong> Technical Specification:</strong><br><br> 1. UV light source:  PWM tech <br> 2. Suction fan <br> 3. Case material: MDF, Acrylic ",
                "<strong> Product costing:</strong><br><br> <strong> Prototype cost:</strong> INR 300 per unit <br><strong>Expected MVP cost per unit:</strong>  INR 590 (MOQ: 5000 pieces)",
                "<strong> The Green Gourd-Mosquito Trapper and its competitors,<strong>Moskitrap GM966</strong> and <strong>GM965</strong>, share identical core features: all three devices cover up to <strong>1,000 sq. ft.</strong>, use eco-friendly UV technology, are odor-free, and safe for households with children. However, their pricing varies drastically. The <strong>Green Gourd</strong> stands out as the most affordable option, priced between <strong>₹600–₹750</strong>, making it ideal for budget-conscious buyers. In contrast, the <strong>Moskitrap GM966</strong> and <strong>GM965</strong> are priced significantly higher at <strong>₹3,990</strong> and <strong>₹6,590</strong>, respectively, likely due to brand positioning, unlisted premium features (e.g., durability, certifications), or market segmentation. While the Green Gourd offers exceptional value, its lower price may raise questions about long-term reliability compared to the Moskitrap models, which could appeal to users prioritizing brand trust or additional assurances. For most households, the Green Gourd’s cost-effectiveness makes it a compelling choice, whereas the Moskitrap variants may cater to niche markets willing to pay a premium for perceived quality or support.",
                "<strong> SIZE OF MARKET: GREEN GAURD- MOSQUITO TRAPPER</strong><br><br>  Mosquito Trap Market Outlook 2024 to 2034: The global mosquito trap market is anticipated to grow from US$ 397.9 million in 2023 to US$ 421 million in 2024, showing significant improvement in the market. By 2034, the market is expected to grow by 6.30%, with a valuation of US$ 775.5 million.",

                // Add 8 more description paragraphs
            ],

            specs: {

                // Add more specs
            }
        },
        // Add other products in same format
        "Smart Socket": {
            images: ["ss1.jpg", "ss2.jpg", "ss3.jpg", "ss4.jpg", "ss5.jpg", /*...*/],
            description: ["<strong>Your Home. Smarter. Simpler.<br><br></strong>",
                "<strong>Description:</strong><br><br>Take full control of your appliances with the <strong>Smart Socket</strong> – a sleek, dual-outlet powerhouse that connects seamlessly to your mobile device. Whether you’re at home or on the go, manage your energy usage, schedule power cycles, or switch devices on/off right from your smartphone. ",
                "<strong>Key Features:</strong><br><br> <strong>→ Dual Socket:</strong> Control two device independently.<br><strong>→ App-Controllled:</strong> Full remote access via mobile app. <br><strong>→ Energy Efficient:</strong> Schedule usage to save power. <br><strong>→ Plug & Play:</strong> Easy setup,no tech skills needed. <br><strong>→ Compact Design:</strong> Fits any standard outlet without blocking others. ",
            ],
            specs: {/*...*/ }
        },
        "Smart Power Supply Unit": {
            images: ["sps1.jpg", "sps2.jpg", "sps3.jpg", "sps4.jpg", "sps5.jpg","sps6.jpg",/*...*/],
            description: ["<strong>Precision Power. Perfect Control.<br><br></strong>",
                "<strong>Description:</strong><br><br>Meet the <strong>Smart Power Supply</strong> – a compact and powerful tool designed for engineers, makers, and innovators. With support for variable output from 3V to 30V and handling up to 5 Amps, it's the ideal solution for testing circuits, powering prototypes, or any low-voltage high precision task. ",
                "<strong>Key Features:</strong><br><br> <strong>→ Voltage Range:</strong> 3V to 30V (variable).<br><strong>→ High Current Output:</strong> Support up to 5 Amps. <br><strong>→ Stable & Reliable:</strong> Built for consistent performance. <br><strong>→ Ideal for Labs & DIY:</strong> Great for testing and prototyping.  ",
            ], specs: {/*...*/ }
        },
        "Travel Friend": {
            images: ["img/bell1.jpg", "img/bell2.jpg", /*...*/],
            description: [,],
            specs: {/*...*/ }
        },
        "Herd-I-Tech": {
            images: ["img/bell1.jpg", "img/bell2.jpg", /*...*/],
            description: ["<strong>1. Advanced UV Technology</strong><br>Detailed paragraph explaining how the UV light attracts mosquitoes...",
                "<strong>2. Eco-Friendly Design</strong><br>Paragraph about chemical-free operation...",
                "<strong>1. Advanced UV Technology</strong><br>Detailed paragraph explaining how the UV light attracts mosquitoes...",
                "<strong>1. Advanced UV Technology</strong><br>Detailed paragraph explaining how the UV light attracts mosquitoes...",
                "<strong>2. Eco-Friendly Design</strong><br>Paragraph about chemical-free operation...",],
            specs: {/*...*/ }
        },
        "Cattle Guard": {
            images: ["img/bell1.jpg", "img/bell2.jpg", /*...*/],
            description: ["<strong>1. Advanced UV Technology</strong><br>Detailed paragraph explaining how the UV light attracts mosquitoes...",
                "<strong>2. Eco-Friendly Design</strong><br>Paragraph about chemical-free operation...",
                "<strong>1. Advanced UV Technology</strong><br>Detailed paragraph explaining how the UV light attracts mosquitoes...",
                "<strong>2. Eco-Friendly Design</strong><br>Paragraph about chemical-free operation...",
                "<strong>1. Advanced UV Technology</strong><br>Detailed paragraph explaining how the UV light attracts mosquitoes...",
                "<strong>2. Eco-Friendly Design</strong><br>Paragraph about chemical-free operation...",],
            specs: {/*...*/ }
        },
        "Robotic Mobile Holder": {
            images: ["mh1.jpg", "mh2.jpg", "mh3.jpg", "mh4.jpg", "mh5.jpg", "mh6.jpg" /*...*/],
            description: ["<strong>Precision Power. Perfect Control.<br><br></strong>",
                "<strong>Description:</strong><br><br>Meet the <strong>Smart Power Supply</strong> – a compact and powerful tool designed for engineers, makers, and innovators. With support for variable output from 3V to 30V and handling up to 5 Amps, it's the ideal solution for testing circuits, powering prototypes, or any low-voltage high precision task. ",
                "<strong>Key Features:</strong><br><br> <strong>→ Voltage Range:</strong> 3V to 30V (variable).<br><strong>→ High Current Output:</strong> Support up to 5 Amps. <br><strong>→ Stable & Reliable:</strong> Built for consistent performance. <br><strong>→ Ideal for Labs & DIY:</strong> Great for testing and prototyping.  ",
            ], specs: {/*...*/ }
        }

    };


    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function () {
            const productName = this.querySelector('h3').textContent;
            openProductModal(productName);
        });
    });


    function openProductModal(productName) {
        const product = products[productName];
        const modal = document.getElementById('productModal');
        const container = modal.querySelector('.modal-scroll-container');

        container.innerHTML = `
          <h2>${productName}</h2>
          <div class="product-images-grid">
            ${product.images.map(img => `<img src="${img}" class="product-image">`).join('')}
          </div>
          <div class="modal-description">
            ${product.description.map(p => `<p>${p}</p>`).join('')}
          </div>
          <div class="tech-specs">
            <h3>Specifications</h3>
            <ul>
              ${Object.entries(product.specs).map(([key, value]) =>
            `<li><strong>${key}:</strong> ${value}</li>`
        ).join('')}
            </ul>
          </div>
        `;

        modal.classList.add('active');

        // Close modal
        modal.querySelector('.modal-close').onclick = () => modal.classList.remove('active');
        modal.onclick = (e) => e.target === modal && modal.classList.remove('active');
    }


    // Lazy load videos for better performance
    document.addEventListener("DOMContentLoaded", function () {
        const videoContainers = document.querySelectorAll('.video-container');

        const lazyLoadVideo = (container) => {
            const iframe = container.querySelector('iframe');
            iframe.src = iframe.dataset.src;
        };

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    lazyLoadVideo(entry.target);
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        videoContainers.forEach(container => {
            videoObserver.observe(container);
        });
    });

    // Form Submission Handling
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });

        // Show success message
        alert('Thank you for your message! We\'ll get back to you soon.');

        // Reset form
        this.reset();
    });

    // Animate form elements on scroll
    const formGroups = document.querySelectorAll('.form-group');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    formGroups.forEach(group => {
        group.style.opacity = 0;
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.5s ease';
        observer.observe(group);
    });
    // Team Member Animation
    function initTeamAnimation() {
        // GSAP animations for each card
        gsap.utils.toArray('.team-card').forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Magnetic effect for social links
        document.querySelectorAll('.social-links a').forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(link, {
                    x: x * 10,
                    y: y * 10,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', initTeamAnimation);




});