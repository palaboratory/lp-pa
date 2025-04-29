document.addEventListener('DOMContentLoaded', function() {
    function createSlider() {
        const slider = document.createElement('div');
        slider.className = 'clients-slider';
        
        // Tenta carregar cada imagem da pasta
        for (let i = 1; i <= 20; i++) { // tenta até 20 imagens
            const slide = document.createElement('div');
            slide.className = 'slide';
            
            const img = document.createElement('img');
            img.src = `Clientes/cliente${i}.png`;
            
            // Adiciona classe especial para a imagem específica
            if (i === 6) { // Imagem número 6
                img.classList.add('special-client');
            } else if (i === 11) { // Imagem número 11
                img.classList.add('smaller-client');
            }
            
            // Se a imagem não existir, ela não será exibida
            img.onerror = () => slide.remove();
            
            slide.appendChild(img);
            slider.appendChild(slide);
        }
        
        return slider;
    }

    const clientsTrack = document.querySelector('.clients-track');
    if (clientsTrack) {
        // Criar apenas um slider
        const slider = createSlider();
        clientsTrack.innerHTML = ''; // Limpar conteúdo existente
        clientsTrack.appendChild(slider);

        // Clonar os primeiros slides e adicionar ao final para criar o efeito infinito
        setTimeout(() => {
            const slides = slider.querySelectorAll('.slide');
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                slider.appendChild(clone);
            });
        }, 100);
    }
}); 