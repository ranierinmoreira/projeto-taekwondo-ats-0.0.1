// Sistema de Player de Vídeo - ATS Tubarões
// Arquivo específico para funcionalidades de vídeo

document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayer();
});

// Sistema de Player de Vídeo
function initVideoPlayer() {
    const mainVideo = document.getElementById('mainVideo');
    const playButton = document.getElementById('playButton');
    const videoOverlay = document.querySelector('.video-overlay');
    const videoItems = document.querySelectorAll('.video-item');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    let currentVideoIndex = 0;
    let videoList = [];
    
    // Inicializar lista de vídeos
    videoItems.forEach((item, index) => {
        const videoData = {
            src: item.dataset.videoSrc,
            title: item.dataset.title,
            description: item.dataset.description,
            element: item
        };
        videoList.push(videoData);
        
        // Adicionar evento de clique para cada item de vídeo
        item.addEventListener('click', () => {
            loadVideo(index);
        });
    });
    
    // Função para carregar vídeo
    function loadVideo(index) {
        if (index < 0 || index >= videoList.length) return;
        
        currentVideoIndex = index;
        const video = videoList[index];
        
        // Atualizar fonte do vídeo
        const sources = mainVideo.querySelectorAll('source');
        sources[0].src = video.src;
        sources[1].src = video.src.replace('.mp4', '.webm');
        
        // Atualizar informações do vídeo
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        
        // Carregar o vídeo
        mainVideo.load();
        
        // Destacar vídeo selecionado
        videoItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Mostrar overlay de play
        videoOverlay.classList.remove('hidden');
        
        // Atualizar controles
        updateVideoControls();
        
        // Scroll suave para o player
        document.getElementById('video-player').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Função para reproduzir vídeo
    function playVideo() {
        mainVideo.play().then(() => {
            videoOverlay.classList.add('hidden');
        }).catch(error => {
            console.error('Erro ao reproduzir vídeo:', error);
            showVideoError();
        });
    }
    
    // Função para pausar vídeo
    function pauseVideo() {
        mainVideo.pause();
    }
    
    // Função para mostrar erro de vídeo
    function showVideoError() {
        videoTitle.textContent = 'Erro ao carregar vídeo';
        videoDescription.textContent = 'O vídeo selecionado não pôde ser reproduzido. Verifique se o arquivo existe.';
    }
    
    // Função para atualizar controles
    function updateVideoControls() {
        prevBtn.disabled = currentVideoIndex === 0;
        nextBtn.disabled = currentVideoIndex === videoList.length - 1;
    }
    
    // Event listeners
    playButton.addEventListener('click', playVideo);
    
    mainVideo.addEventListener('click', () => {
        if (mainVideo.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    });
    
    mainVideo.addEventListener('play', () => {
        videoOverlay.classList.add('hidden');
    });
    
    mainVideo.addEventListener('pause', () => {
        videoOverlay.classList.remove('hidden');
    });
    
    mainVideo.addEventListener('ended', () => {
        videoOverlay.classList.remove('hidden');
        // Auto-play próximo vídeo se disponível
        if (currentVideoIndex < videoList.length - 1) {
            setTimeout(() => {
                loadVideo(currentVideoIndex + 1);
            }, 2000);
        }
    });
    
    mainVideo.addEventListener('error', (e) => {
        console.error('Erro no vídeo:', e);
        showVideoError();
    });
    
    // Controles de navegação
    prevBtn.addEventListener('click', () => {
        if (currentVideoIndex > 0) {
            loadVideo(currentVideoIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentVideoIndex < videoList.length - 1) {
            loadVideo(currentVideoIndex + 1);
        }
    });
    
    // Controle de tela cheia
    fullscreenBtn.addEventListener('click', () => {
        if (mainVideo.requestFullscreen) {
            mainVideo.requestFullscreen();
        } else if (mainVideo.webkitRequestFullscreen) {
            mainVideo.webkitRequestFullscreen();
        } else if (mainVideo.msRequestFullscreen) {
            mainVideo.msRequestFullscreen();
        }
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return; // Não interferir com inputs
        }
        
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (mainVideo.paused) {
                    playVideo();
                } else {
                    pauseVideo();
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (currentVideoIndex > 0) {
                    loadVideo(currentVideoIndex - 1);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentVideoIndex < videoList.length - 1) {
                    loadVideo(currentVideoIndex + 1);
                }
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                fullscreenBtn.click();
                break;
        }
    });
    
    // Aplicar otimizações ao vídeo principal
    optimizeVideoPlayback(mainVideo);
    
    // Inicializar com o primeiro vídeo se disponível
    if (videoList.length > 0) {
        loadVideo(0);
    }
    
    // Preload de vídeos críticos
    preloadCriticalVideos();
}

// Função para preload de vídeos críticos
function preloadCriticalVideos() {
    const criticalVideos = [
        'videos/aula-iniciantes.mp4',
        'videos/tecnicas-avancadas.mp4'
    ];
    
    criticalVideos.forEach(videoSrc => {
        preloadVideo(videoSrc);
    });
}

// Função para preload de vídeos
function preloadVideo(src) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = src;
    video.style.display = 'none';
    document.body.appendChild(video);
    
    // Remover após carregar
    video.addEventListener('loadedmetadata', () => {
        document.body.removeChild(video);
    });
    
    video.addEventListener('error', () => {
        console.warn(`Não foi possível carregar o vídeo: ${src}`);
        document.body.removeChild(video);
    });
}

// Função para otimizar reprodução de vídeo
function optimizeVideoPlayback(videoElement) {
    // Configurações de performance
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('webkit-playsinline', '');
    
    // Pausar vídeos quando não estão visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Vídeo está visível - pode reproduzir
                if (videoElement.dataset.shouldPlay === 'true') {
                    videoElement.play().catch(e => console.log('Auto-play bloqueado:', e));
                }
            } else {
                // Vídeo não está visível - pausar
                if (!videoElement.paused) {
                    videoElement.pause();
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(videoElement);
}

// Lazy loading para itens de vídeo
function initVideoLazyLoading() {
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    // Preload apenas quando o vídeo estiver visível
                    if (video.dataset.videoSrc && !video.dataset.loaded) {
                        preloadVideo(video.dataset.videoSrc);
                        video.dataset.loaded = 'true';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observar itens de vídeo para preload
        document.querySelectorAll('.video-item').forEach(item => {
            videoObserver.observe(item);
        });
    }
}

// Inicializar lazy loading quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initVideoLazyLoading();
});
