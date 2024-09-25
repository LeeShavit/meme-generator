'use strict'


function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => 
        `<img class="gallery-img" onclick="onSelectImg(${img.id})" src="${img.url}"></img>`
    )
    elGallery.innerHTML = strHTMLs.join('')
}

function onSelectImg(id){
    setImg(id)
    openMemeEditor()
    renderMeme()
}

function openMemeEditor(){
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')

}