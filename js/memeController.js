'use strict'

let gCanvas
let gCtx
let gElImg


function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    gElImg= document.querySelector('.canvas-img')
    renderMeme()
    renderGallery()
}

function renderMeme(){
    const meme= getMeme()
    gElImg.src= getImgUrl(meme.selectedImgId)
    gCtx.drawImage(gElImg, 0, 0, gCanvas.width, gCanvas.height)
    meme.lines.forEach((line, idx)=> drawText(line, idx))
}

function drawText(line, lineIdx){
    const diff= 10
    let posY= line.size + diff
    if(lineIdx===1){
        posY= gCanvas.height- diff
    }else if(lineIdx > 1){
        posY= gCanvas.height/2 - line.size/2
    }
    gCtx.font= `${line.size}px impact`
    gCtx.textAlign= 'start'
    gCtx.fillStyle= line.color
    gCtx.strokeStyle= 'black'
    gCtx.fillText(line.txt, 0,posY ,gCanvas.width)
    gCtx.strokeText(line.txt, 0, posY, gCanvas.width);
}

function onSetLineTxt(line=0){
    const txt= document.querySelector('input[name="meme-txt"]').value
    setLineTxt(line,txt)
    renderMeme()
}




function onDownloadCanvas(elLink) {
    const dataUrl = gCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-img'
}