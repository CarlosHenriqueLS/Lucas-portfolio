function createVideoModal(video) {
    const modal = document.createElement("dialog");
    modal.id = video.id;
    
    const header = document.createElement("div");
    header.className = "dialog-titulo";

    // Criar um container para o título e a empresa
    const tituloContainer = document.createElement("div");
    tituloContainer.className = "titulo-container";
    tituloContainer.innerHTML = `<h2>${video.title}</h2><p>${video.company}</p>`;

    // Botão de fechar
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    closeButton.className = "close-modal";
    closeButton.addEventListener("click", () => modal.close());
    
    // Adiciona o título e a empresa ao header, e o botão de fechar ao lado
    header.appendChild(tituloContainer);
    header.appendChild(closeButton);
    
    modal.appendChild(header);
    
    // Iframe para o vídeo
    const iframe = document.createElement("iframe");
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = video.youtubeUrl;
    iframe.title = "YouTube video player";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");
    modal.appendChild(iframe);
    
    const summaryHeader = document.createElement("h3");
    summaryHeader.textContent = video.summary;
    modal.appendChild(summaryHeader);
    
    const infoDiv = document.createElement("div");
    infoDiv.className = "informacoes-modal";
    const ul = document.createElement("ul");
    
    video.info.forEach(item => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = `<span class="linha">-----------------------------</span> ${item.label}`;
        const span = document.createElement("span");
        span.className = "texto-cinza";
        span.textContent = item.value;
        li.appendChild(p);
        li.appendChild(span);
        ul.appendChild(li);
        
        const hr = document.createElement("hr");
        ul.appendChild(hr);
    });
    
    infoDiv.appendChild(ul);
    modal.appendChild(infoDiv);
    
    document.body.appendChild(modal);
    
    return modal;
}

const videoContainer = document.getElementById("video-container");

// Após carregar os vídeos e criar os modais...
fetch('videos-modal.json')
  .then(response => response.json())
  .then(videos => {
    // Cria os modais para cada vídeo
    videos.forEach(video => {
      createVideoModal(video);
    });
    
    // Associa o evento de clique em cada container de imagem
    document.querySelectorAll('.image-wrapper').forEach(wrapper => {
      wrapper.addEventListener("click", () => {
        const videoId = wrapper.getAttribute("data-video-id");
        const modal = document.getElementById(videoId);
        if (modal) {
          modal.showModal();
        }
      });
    });
  })
  .catch(err => console.error("Erro ao carregar os vídeos:", err));
