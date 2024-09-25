'use strict'


function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => 
        `<img class="gallery-img" onclick="onSelectImg(${img.id})" src="${img.url}"></img>`
    )
    elGallery.innerHTML = strHTMLs.join()
}

function onSelectImg(id){
    setImg(id)
    renderMeme()
}