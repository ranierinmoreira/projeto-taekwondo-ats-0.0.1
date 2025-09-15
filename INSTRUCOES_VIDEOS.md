# 📹 Instruções para Adicionar Vídeos ao Site

## Estrutura de Pastas

Crie uma pasta chamada `videos` na raiz do projeto e adicione seus arquivos de vídeo:

```
projeto-taekwondo-ats-0.0.1/
├── videos/
│   ├── aula-iniciantes.mp4
│   ├── tecnicas-avancadas.mp4
│   ├── competicao.mp4
│   └── defesa-pessoal.mp4
├── index.html          (página principal)
├── videos.html         (página de vídeos)
├── styles.css          (estilos principais)
├── video-styles.css    (estilos específicos de vídeo)
├── script.js           (JavaScript principal)
└── video-player.js     (JavaScript do player de vídeo)
```

## Formatos de Vídeo Suportados

- **MP4** (recomendado) - Melhor compatibilidade
- **WebM** (opcional) - Para navegadores modernos
- **OGV** (opcional) - Para compatibilidade adicional

## Como Adicionar Novos Vídeos

### 1. Adicionar o Arquivo de Vídeo
Coloque o arquivo de vídeo na pasta `videos/` com um nome descritivo.

### 2. Atualizar o HTML
No arquivo `videos.html`, adicione um novo item na seção `.video-gallery`:

```html
<div class="video-item" 
     data-video-src="videos/SEU_VIDEO.mp4" 
     data-title="Título do Vídeo" 
     data-description="Descrição do vídeo">
    <div class="video-thumbnail">
        <img src="imagem/ats-tubaroes.jpg" alt="Título do Vídeo">
        <div class="play-overlay">
            <div class="play-icon-small">▶</div>
        </div>
    </div>
    <div class="video-meta">
        <h4>Título do Vídeo</h4>
        <p>Descrição curta</p>
        <span class="video-duration">15:30</span>
    </div>
</div>
```

### 3. Atualizar o JavaScript (Opcional)
Se quiser que o vídeo seja pré-carregado, adicione o caminho no array `criticalVideos` em `video-player.js`:

```javascript
const criticalVideos = [
    'videos/aula-iniciantes.mp4',
    'videos/tecnicas-avancadas.mp4',
    'videos/SEU_NOVO_VIDEO.mp4'  // Adicione aqui
];
```

## Otimizações Recomendadas

### Tamanho dos Vídeos
- **Resolução**: 1920x1080 (Full HD) ou 1280x720 (HD)
- **Duração**: Máximo 30 minutos por vídeo
- **Tamanho**: Máximo 100MB por arquivo

### Compressão
Use ferramentas como:
- **HandBrake** (gratuito)
- **FFmpeg** (linha de comando)
- **Adobe Media Encoder** (pago)

### Configurações de Compressão Recomendadas
```
Codec: H.264
Bitrate: 2-5 Mbps (dependendo da qualidade desejada)
Frame Rate: 30 fps
Profile: High
Level: 4.1
```

## Funcionalidades do Player

### Controles Disponíveis
- ▶️ **Play/Pause**: Clique no vídeo ou botão play
- ⏮️ **Anterior**: Botão "Anterior" ou seta esquerda
- ⏭️ **Próximo**: Botão "Próximo" ou seta direita
- ⛶ **Tela Cheia**: Botão "Tela Cheia" ou tecla F
- **Barra de Progresso**: Arraste para navegar
- **Volume**: Controle de volume nativo

### Atalhos de Teclado
- **Espaço**: Play/Pause
- **Seta Esquerda**: Vídeo anterior
- **Seta Direita**: Próximo vídeo
- **F**: Tela cheia

### Recursos Automáticos
- **Auto-play**: Próximo vídeo reproduz automaticamente após o atual
- **Lazy Loading**: Vídeos são carregados apenas quando visíveis
- **Preload**: Vídeos críticos são pré-carregados
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

## Solução de Problemas

### Vídeo Não Reproduz
1. Verifique se o arquivo existe na pasta `videos/`
2. Confirme se o caminho no HTML está correto
3. Teste o vídeo em um player externo
4. Verifique o console do navegador para erros

### Vídeo Lento para Carregar
1. Comprima o vídeo com menor bitrate
2. Reduza a resolução se necessário
3. Use formato MP4 otimizado
4. Considere usar um CDN para hospedagem

### Problemas de Compatibilidade
1. Forneça versões em diferentes formatos (MP4, WebM)
2. Teste em diferentes navegadores
3. Verifique se o servidor suporta streaming de vídeo

## Exemplo Completo

Para adicionar um vídeo de "Aula de Defesa Pessoal":

1. **Arquivo**: `videos/defesa-pessoal-aula.mp4`
2. **HTML**:
```html
<div class="video-item" 
     data-video-src="videos/defesa-pessoal-aula.mp4" 
     data-title="Aula de Defesa Pessoal" 
     data-description="Técnicas básicas de defesa pessoal baseadas no Taekwondo">
    <div class="video-thumbnail">
        <img src="imagem/ats-tubaroes.jpg" alt="Defesa Pessoal">
        <div class="play-overlay">
            <div class="play-icon-small">▶</div>
        </div>
    </div>
    <div class="video-meta">
        <h4>Aula de Defesa Pessoal</h4>
        <p>Técnicas básicas de proteção</p>
        <span class="video-duration">18:45</span>
    </div>
</div>
```

## Suporte

Para dúvidas ou problemas, verifique:
1. Console do navegador (F12)
2. Logs de erro no JavaScript
3. Compatibilidade do formato de vídeo
4. Tamanho e qualidade do arquivo
