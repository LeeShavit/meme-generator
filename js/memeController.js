'use strict'

let gElCanvas
let gCtx
let gElImg

let gLinesPos = []

let lineIsDrag = false
let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('.main-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElImg = document.querySelector('.canvas-img')
    renderMeme()
    resizeCanvas()
    renderGallery()
    addListeners()
    document.querySelector('input[name="meme-txt"]').value = getSelectedLineTxt()
}

function renderMeme(meme = getMeme(), elCanvas = gElCanvas, ctx = gCtx) {
    const elImg = new Image()
    elImg.src = getImgUrl(meme.selectedImgId)
    ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height)
    meme.lines.forEach((line, idx) => drawText(line, idx, meme.selectedLineIdx, elCanvas, ctx))
    document.querySelector('input[name="meme-txt"]').value = getSelectedLineTxt()
}

function drawText(line, lineIdx, selectedLineIdx, elCanvas, ctx) {
    let diff = 10
    let posY = diff
    if (lineIdx === 1) {
        posY = elCanvas.height - line.size - diff
    } else if (lineIdx > 1) {
        posY = elCanvas.height / 2 - line.size / 2
    }
    ctx.textAlign = line.textAlign
    const fontSize = line.size * (elCanvas.width / 300)

    ctx.font = fontSize + 'px ' + line.font
    ctx.textBaseline = 'top'
    ctx.fillStyle = line.color
    ctx.strokeStyle = 'black'
    //save pos if not found
    if (!gLinesPos[lineIdx]) {
        gLinesPos[lineIdx] = {
            x: diff,
            y: posY,
            height: fontSize
        }
    }
    const { x, y, height } = gLinesPos[lineIdx]
    ctx.fillText(line.txt, x, y, elCanvas.width - 20)
    ctx.strokeText(line.txt, x, y, elCanvas.width - 20)

    if (lineIdx === selectedLineIdx) {
        gCtx.beginPath()
        gCtx.strokeStyle = 'white'
        gCtx.rect(10, y, elCanvas.width - 20, height + 2)
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
    console.log(gLinesPos, pos)
    return gLinesPos.findIndex(linePos =>
        ((pos.x >= linePos.x) && (pos.x <= linePos.x + gElCanvas.width - 20)) &&
        ((pos.y >= linePos.y) && (pos.y <= linePos.y + gElCanvas.width - 20))
    )
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function resizeCanvas() {
    if (document.querySelector('.editor').classList.contains('hide')) return
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.height = gElCanvas.width = elContainer.clientWidth - 10
    const { selectedLineIdx, lines } = getMeme()
    const lineHeight = lines[selectedLineIdx].size * (gElCanvas.width / 300)
    gLinesPos[selectedLineIdx].height = lineHeight
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
    document.body.style.cursor = 'auto'
}

function onChangeFont(elSelect) {
    const font = elSelect.value.toLowerCase()
    setFont(font)
    renderMeme()
}

function onChangeTextAlignment(align) {
    setTextAlignment(align)
    const idx = getMeme().selectedLineIdx
    let diff = 10
    if (align === 'center') {
        diff += gElCanvas.width / 2
    } else if (align === 'right') {
        diff = gElCanvas.width - diff
    }
    gLinesPos[idx].x = diff
    renderMeme()
}

function onGalleryView() {
    document.querySelector('body').classList.remove('menu-open')
    document.querySelector('.editor').classList.add('hide')
    document.querySelector('.my-memes-gallery').classList.add('hide')
    document.querySelector('.gallery').classList.remove('hide')
}

function onSaveMeme() {
    saveMeme()
}

function onMoveLine(diff) {
    const idx = getMeme().selectedLineIdx
    gLinesPos[idx].y += diff
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}