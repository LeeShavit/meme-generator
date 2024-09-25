'use strict'

let gElCanvas
let gCtx
let gElImg

let gLinesPos = []

let lineIsDrag = false
let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gElImg = document.querySelector('.canvas-img')
    renderMeme()
    renderGallery()
    addListeners()
    document.querySelector('input[name="meme-txt"]').value = getSelectedLineTxt()
}

function renderMeme() {
    const meme = getMeme()
    gElImg.src = getImgUrl(meme.selectedImgId)
    gCtx.drawImage(gElImg, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => drawText(line, idx, meme.selectedLineIdx))
    document.querySelector('input[name="meme-txt"]').value = getSelectedLineTxt()
}

function drawText(line, lineIdx, selectedLineIdx) {
    let diff = 10
    let posY = diff
    if (lineIdx === 1) {
        posY = gElCanvas.height - line.size - diff
    } else if (lineIdx > 1) {
        posY = gElCanvas.height / 2 - line.size / 2
    }
    gCtx.textAlign = line.textAlign
    if (line.textAlign === 'center') {
        diff += gElCanvas.width / 2
    } else if (line.textAlign === 'right')
        diff = gElCanvas.width - diff
    gCtx.font = line.size + 'px ' + line.font
    gCtx.textBaseline = 'top'
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = 'black'
    //save pos
    if(!gLinesPos[lineIdx]){
        gLinesPos[lineIdx] = {
            x: diff,
            y: posY,
            width: gElCanvas.width - 20,
            height: line.size
        }
    }
    const {x,y,width,height}= gLinesPos[lineIdx]
    gCtx.fillText(line.txt, x, y, width)
    gCtx.strokeText(line.txt, x, y, width)

    if (lineIdx === selectedLineIdx) {
        gCtx.beginPath()
        gCtx.strokeStyle = 'white'
        gCtx.rect(10, y, width, height + 2)
        gCtx.stroke()
    }
}

function onSetLineTxt() {
    const txt = document.querySelector('input[name="meme-txt"]').value
    setLineTxt(txt)
    renderMeme()
}

function onSetFontColor(elInput) {
    const color = elInput.value
    setLineColor(color)
    renderMeme()
}

function onSetFontSize(diff) {
    SetFontSize(diff)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchSelectedLine()
    renderMeme()
}


function isLineClicked(pos) {
    return gLinesPos.findIndex(linePos =>
        ((pos.x >= linePos.x) && (pos.x <= linePos.x + linePos.width)) &&
        ((pos.y >= linePos.y) && (pos.y <= linePos.y + linePos.height))
    )
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.height = gElCanvas.width = elContainer.clientWidth - 10
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse screen dragging event
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.clientX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.clientY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const currLineIdx = isLineClicked(pos)
    console.log(currLineIdx)
    if (currLineIdx === -1) return
    selectLine(currLineIdx)
    renderMeme()
    lineIsDrag = true
    //* Save the pos we start from
    gLastPos = pos
    document.body.style.cursor = 'grabbing'
}

//to do
function onMove(ev) {
    if (!lineIsDrag) return

}

//to do
function onUp() {
    lineIsDrag = false
    document.body.style.cursor = 'grab'
}

function onChangeFont(elSelect) {
    const font = elSelect.value.toLowerCase()
    setFont(font)
    renderMeme()
}

function onChangeTextAlignment(align) {
    setTextAlignment(align)
    renderMeme()
}

function onMemeView() {
    document.querySelector('.gallery').classList.add('hide')
    document.querySelector('.editor').classList.add('hide')
}

function onGalleryView() {
    document.querySelector('.gallery').classList.remove('hide')
    document.querySelector('.editor').classList.add('hide')
}

function onSaveMeme() {
    saveMeme()
}

function onMoveLine(diff) {
    const idx=getMeme().selectedLineIdx
    gLinesPos[idx].y+= diff
    renderMeme()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}