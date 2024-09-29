'use strict'

let gElCanvas
let gCtx
let gElImg

let gLinesPos = []

let gLineDragIdx = -1
let gLastPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

let gUploadedImg

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
    const img = (gUploadedImg) ? gUploadedImg : getImg(meme.selectedImgId)
    ctx.drawImage(img, 0, 0, elCanvas.width, elCanvas.height)
    meme.lines.forEach((line, idx) => drawText(line, idx, meme.selectedLineIdx, elCanvas, ctx))
    if(meme.selectedLineIdx!== -1){
        document.querySelector('input[name="meme-txt"]').value = getSelectedLineTxt()
    }
}

function drawText(line, lineIdx, selectedLineIdx, elCanvas, ctx) {

    ctx.textAlign = line.textAlign
    const fontSize = line.size * (elCanvas.width / 300)
    ctx.font = fontSize + 'px ' + line.font
    ctx.textBaseline = 'top'
    ctx.fillStyle = line.color
    ctx.strokeStyle = 'black'

    //save pos if not found
    if (!gLinesPos[lineIdx]) {
        let diff = 10
        let posY = diff
        if (lineIdx === 1) {
            posY = elCanvas.height - line.size - diff
        } else if (lineIdx > 1) {
            posY = elCanvas.height / 2 - line.size / 2
        }
        gLinesPos[lineIdx] = {
            x: diff,
            y: posY,
            height: fontSize,
            width: ctx.measureText(line.txt).width+ 5
        }
    }

    const { x, y, height, width } = gLinesPos[lineIdx]
    ctx.fillText(line.txt, x, y, elCanvas.width - 20)
    ctx.strokeText(line.txt, x, y, elCanvas.width - 20)

    if (lineIdx === selectedLineIdx) {
        gCtx.beginPath()
        gCtx.strokeStyle = 'white'
        gCtx.rect(x - 2, y, width + 4, height + 2)
        gCtx.stroke()
    }
}

function onSetLineTxt() {
    const txt = document.querySelector('input[name="meme-txt"]').value
    setLineTxt(txt)
    const idx = getMeme().selectedLineIdx
    const line = getMeme().lines[idx]
    gLinesPos[idx].width = gCtx.measureText(line.txt).width
    renderMeme()
}

function onSetFontColor(elInput) {
    const color = elInput.value
    setLineColor(color)
    renderMeme()
}

function onSetFontSize(diff) {
    SetFontSize(diff)
    const idx = getMeme().selectedLineIdx
    const line = getMeme().lines[idx]
    gLinesPos[idx].width = gCtx.measureText(line.txt).width + 5
    gLinesPos[idx].height = line.size * (gElCanvas.width / 300)
    renderMeme()
}

function onAddLine(txt) {
    addLine(txt)
    renderMeme()
}

function onSwitchLine() {
    switchSelectedLine()
    renderMeme()
}

function findLineClicked(pos) {
    return gLinesPos.findIndex(linePos =>
        ((pos.x >= linePos.x) && (pos.x <= linePos.x + linePos.width)) &&
        ((pos.y >= linePos.y) && (pos.y <= linePos.y + linePos.height))
    )
}

function onDownloadMeme(elLink) {
    const meme= getMeme()
    const prevSelectedLine= meme.selectedLineIdx
    meme.selectedLineIdx=-1
    renderMeme(meme) 
    meme.selectedLineIdx= prevSelectedLine
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
    const currLineIdx = findLineClicked(pos)
    if (currLineIdx === -1) return
    selectLine(currLineIdx)
    renderMeme()
    gLineDragIdx = currLineIdx
    //* Save the pos we start from
    gLastPos = pos
    document.body.style.cursor = 'grabbing'
}

//to do
function onMove(ev) {
    if (gLineDragIdx === -1) return
    const pos = getEvPos(ev)

    const dx = pos.x - gLastPos.x
    const dy = pos.y - gLastPos.y

    gLinesPos[gLineDragIdx].x += dx
    gLinesPos[gLineDragIdx].y += dy

    gLastPos = pos
    renderMeme()
}

//to do
function onUp() {
    gLineDragIdx = -1
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
    resetUploadedImg()
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

function onAddSticker(elSticker) {
    addLine(elSticker.innerText)
    renderMeme()
}

function onShareToFB() {
    const canvasData = gElCanvas.toDataURL('image/jpeg')
    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)

    }
    uploadImg(canvasData, onSuccess)
}

function onImgInput(ev) {
    loadImageFromInput(ev, setNewImg)
}


function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
            onImageReady(img)
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function setNewImg(img) {
    gUploadedImg = img
    renderMeme()
    openMemeEditor()
}

function resetUploadedImg() {
    gUploadedImg = null
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    openMemeEditor()
}








