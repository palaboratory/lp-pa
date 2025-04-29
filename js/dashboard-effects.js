document.addEventListener('DOMContentLoaded', () => {
    // Gerar padrão geométrico
    const patternGrid = document.querySelector('.pattern-grid');
    if (patternGrid) {
        for (let i = 0; i < 64; i++) {
            const cell = document.createElement('div');
            cell.className = 'pattern-cell';
            cell.style.opacity = Math.random() * 0.5;
            patternGrid.appendChild(cell);
        }
    }

    // Gerar campo de partículas
    const particleField = document.querySelector('.particle-field');
    if (particleField) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.setProperty('--x', `${(Math.random() - 0.5) * 20}px`);
            particle.style.setProperty('--y', `${(Math.random() - 0.5) * 20}px`);
            particle.style.animation = `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`;
            particleField.appendChild(particle);
        }
    }

    // Gerar constelação
    const constellation = document.querySelector('.constellation');
    if (constellation) {
        // Criar estrelas
        const starPositions = [];
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.animation = `starPulse ${2 + Math.random() * 3}s ease-in-out infinite`;
            constellation.appendChild(star);
            starPositions.push({x, y});
        }

        // Criar conexões entre estrelas próximas
        starPositions.forEach((pos1, i) => {
            starPositions.slice(i + 1).forEach(pos2 => {
                const distance = Math.hypot(pos1.x - pos2.x, pos1.y - pos2.y);
                if (distance < 30) {
                    const connection = document.createElement('div');
                    connection.className = 'connection-line';
                    const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
                    connection.style.width = `${distance}%`;
                    connection.style.left = `${pos1.x}%`;
                    connection.style.top = `${pos1.y}%`;
                    connection.style.transform = `rotate(${angle}rad)`;
                    constellation.appendChild(connection);
                }
            });
        });
    }

    // Animar linhas de fluxo
    document.querySelectorAll('.flow-line').forEach(line => {
        line.style.animation = `flowAnimation ${3 + Math.random() * 2}s ease-in-out infinite`;
    });

    // Adicionar elementos decorativos a cada card
    document.querySelectorAll('.dashboard-card').forEach(card => {
        // Adicionar efeito de brilho
        const glow = document.createElement('div');
        glow.className = 'glow-effect';
        card.appendChild(glow);

        // Adicionar forma líquida
        const liquid = document.createElement('div');
        liquid.className = 'liquid-shape';
        card.appendChild(liquid);

        // Adicionar streams de dados
        for (let i = 0; i < 3; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.left = `${30 + i * 20}%`;
            stream.style.animationDelay = `${i * 1.5}s`;
            card.appendChild(stream);
        }

        // Adicionar visualização circular
        const circleViz = document.createElement('div');
        circleViz.className = 'circle-viz';
        card.appendChild(circleViz);

        // Adicionar container de ondas
        const waveContainer = document.createElement('div');
        waveContainer.className = 'wave-container';
        for (let i = 0; i < 2; i++) {
            const wave = document.createElement('div');
            wave.className = 'wave';
            wave.style.animationDelay = `${i * 2}s`;
            waveContainer.appendChild(wave);
        }
        card.appendChild(waveContainer);
    });

    // Função para criar efeito de movimento suave do mouse
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        document.querySelectorAll('.dashboard-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const distanceX = (clientX - cardCenterX) / window.innerWidth;
            const distanceY = (clientY - cardCenterY) / window.innerHeight;

            card.style.transform = `
                perspective(1000px)
                rotateX(${distanceY * 5}deg)
                rotateY(${distanceX * 5}deg)
                translateZ(10px)
            `;
        });

        document.querySelectorAll('.liquid-shape').forEach(shape => {
            shape.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
        });
    };

    // Adicionar evento de movimento do mouse
    document.addEventListener('mousemove', handleMouseMove);

    // Função para criar efeito de partículas flutuantes
    const createFloatingParticles = () => {
        const container = document.querySelector('.dashboard-background');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3}px;
                height: ${Math.random() * 3}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3});
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s linear infinite;
            `;
            container.appendChild(particle);
        }
    };

    createFloatingParticles();

    // Função para criar gráfico de barras
    const createBarChart = (container) => {
        const heights = [65, 85, 45, 95, 75, 55];
        heights.forEach(height => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${height}%`;
            container.appendChild(bar);
        });
    };

    // Função para criar gráfico de linha
    const createLineChart = (container) => {
        const linePath = document.createElement('div');
        linePath.className = 'line-path';
        container.appendChild(linePath);
    };

    // Função para criar gráfico de área
    const createAreaChart = (container) => {
        const areaPath = document.createElement('div');
        areaPath.className = 'area-path';
        container.appendChild(areaPath);
    };

    // Função para criar gráfico de satisfação circular
    const createSatisfactionChart = (container, percentage) => {
        const chart = document.createElement('div');
        chart.className = 'satisfaction-chart';
        
        const circle = document.createElement('div');
        circle.className = 'satisfaction-circle';
        circle.style.background = `conic-gradient(
            var(--primary) ${percentage}%,
            rgba(255, 255, 255, 0.1) ${percentage}%
        )`;
        
        const inner = document.createElement('div');
        inner.className = 'satisfaction-inner';
        
        circle.appendChild(inner);
        chart.appendChild(circle);
        container.appendChild(chart);
    };

    // Função para criar gráfico de dispersão
    const createScatterChart = (container) => {
        for (let i = 0; i < 20; i++) {
            const point = document.createElement('div');
            point.className = 'scatter-point';
            point.style.left = `${Math.random() * 100}%`;
            point.style.top = `${Math.random() * 100}%`;
            point.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(point);
        }
    };

    // Inicializar gráficos em cada card
    document.querySelectorAll('.dashboard-card').forEach((card, index) => {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'bar-chart';
        
        // Gerar dados aleatórios para as barras
        const numBars = 6;
        const values = Array.from({length: numBars}, () => Math.random() * 80 + 20);
        
        // Criar barras
        values.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${value}%`;
            bar.style.animationDelay = `${index * 0.1}s`;
            
            // Adicionar tooltip com o valor
            bar.setAttribute('title', `${Math.round(value)}%`);
            
            chartContainer.appendChild(bar);
        });
        
        // Substituir o gráfico circular pelo novo gráfico de barras
        const oldChart = card.querySelector('.satisfaction-chart, .progress-ring');
        if (oldChart) {
            oldChart.replaceWith(chartContainer);
        } else {
            card.appendChild(chartContainer);
        }
    });

    // Efeito de hover nos cards
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    const particles = document.querySelector('.particles');
    const animatedBackground = document.querySelector('.animated-background');
    
    // Criar linhas de fluxo
    const flowLines = document.createElement('div');
    flowLines.className = 'flow-lines';
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.className = 'flow-line';
        flowLines.appendChild(line);
    }
    animatedBackground.appendChild(flowLines);
    
    // Criar partículas dinâmicas
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            filter: blur(${Math.random()}px);
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
        `;
        particles.appendChild(particle);
    }

    // Efeito de movimento suave do mouse
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth * 30;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight * 30;
    });

    // Animação suave
    function animate() {
        // Interpolação suave
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        // Aplicar transformação com efeito parallax
        particles.style.transform = `translate(${currentX * 1.5}px, ${currentY * 1.5}px)`;
        document.querySelector('.gradient-overlay').style.transform = 
            `translate(${-currentX}px, ${-currentY}px) scale(1.1)`;
        flowLines.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;

        // Continuar animação
        requestAnimationFrame(animate);
    }
    animate();

    // Efeito de scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const header = document.querySelector('header');
        
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax no scroll
        animatedBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    });

    // Adicionar keyframes dinamicamente para animação float
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translate(0, 0);
            }
            33% {
                transform: translate(${Math.random() * 20}px, ${Math.random() * 20}px);
            }
            66% {
                transform: translate(${Math.random() * -20}px, ${Math.random() * 20}px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    document.head.appendChild(style);
}); 