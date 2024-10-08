'use strict'

var gMeme = _createMeme()
const KEY = 'saved-memes'
let gSavedMeme= {isSaved: false,id: null}



var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(id) {
    gMeme = _createMeme()
    gMeme.selectedImgId = id
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}
function SetFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setTextAlignment(align) {
    gMeme.lines[gMeme.selectedLineIdx].textAlign = align
}

function addLine(txt) {
    gMeme.lines.push(_createLine(txt))
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx= 0
}

function switchSelectedLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function selectLine(idx) {
    gMeme.selectedLineIdx = idx
}

function getSelectedLineTxt() {
    if(gMeme.selectedLineIdx=== -1) return ''
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function generateRandMeme() {
    gMeme = _createMeme(getRandomIntInclusive(1, 18), makeLorem())
}

function saveMeme() {
    let savedMemes = loadFromStorage(KEY)
    if (!savedMemes) savedMemes = []
    if(gSavedMeme.isSaved){
      savedMemes[gSavedMeme.id]=gMeme
    } else {
        savedMemes.push(gMeme)
    }
    saveToStorage(KEY, savedMemes)
}

function loadSavedMeme(id){
    const savedMemes= loadFromStorage(KEY)
    gMeme= savedMemes[id]
    gSavedMeme.isSaved= true
    gSavedMeme.id= id
}

function getSavedMemes() {
    return loadFromStorage(KEY)
}

function setlinesSize(diff){
    gMeme.lines.forEach(line=> line.size*=diff)
}


function _createMeme(imgId = 1, txt) {
    return {
        selectedImgId: imgId,
        selectedLineIdx: -1,
        lines: [_createLine(txt)]
    }
}

function _createLine(txt= 'Your Text Here') {
    return {
        txt,
        size: 40,
        color: 'pink',
        font: 'impact',
        textAlign: 'start'
    }
}