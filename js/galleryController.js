'use strict'

window.addEventListener('resize', () => {
    resizeSavedMemesCanvas()
})


function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')
    const imgs = getImgs()
    const strHTMLs = imgs.map(img =>
        `<img class="gallery-img" onclick="onSelectImg(${img.id})" src="${img.url}"></img>`
    )
    elGallery.innerHTML = strHTMLs.join('')
}

function renderSaveMemesGallery() {
    const elGallery = document.querySelector('.memes-container')
    const memes = getSavedMemes()
    const strHTMLs = memes.map((meme, idx) =>
        `<div class="saved-meme-container canvas-container-${idx}" onclick="onEditSavedMeme(${idx})">
                <canvas class="meme-canvas-${idx}" width="100" height="100"></canvas>
            </div>`
    )
    elGallery.innerHTML = strHTMLs.join('')

    memes.forEach((meme, idx) => {
        const elCanvas = document.querySelector(`.meme-canvas-${idx}`)
        const ctx = elCanvas.getContext('2d')
        renderMeme(meme, elCanvas, ctx)
    })
    resizeSavedMemesCanvas()
}

function resizeSavedMemesCanvas() {
    if (document.querySelector('.my-memes-gallery').classList.contains('hide')) return
    const memes = getSavedMemes()
    memes.forEach((meme, idx) => {
        const elContainer = document.querySelector(`.canvas-container-${idx}`)
        const elCanvas = document.querySelector(`.meme-canvas-${idx}`)
        elCanvas.height = elCanvas.width = elContainer.clientWidth - 10
        const ctx = elCanvas.getContext('2d')
        renderMeme(meme, elCanvas, ctx)
    })
}

function onSelectImg(id) {
    setImg(id)
    openMemeEditor()
    renderMeme()
}

function openMemeEditor() {
    resizeCanvas()
    document.querySelector('.my-memes-gallery').classList.add('hide')
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.remove('hide')


}

function onPresentRandomMeme() {
    generateRandMeme()
    renderMeme()
    openMemeEditor()
}

function onMyMemesView() {
    renderSaveMemesGallery()
    resizeSavedMemesCanvas()
    document.querySelector('body').classList.remove('menu-open')
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.my-memes-gallery').classList.remove('hide')

}

function onEditSavedMeme(idx) {
    loadSavedMeme(idx)
    openMemeEditor()
    renderMeme()
}

function onToggleMenu(){
    document.querySelector('body').classList.toggle('menu-open')
    console.log('click')
}
