'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['politic', 'angry'] },{ id: 2, url: 'img/2.jpg', keywords: ['dog', 'cute'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red'
        }
        ,
        {
            txt: 'I sometimes eat food lorem ipsutmlrkgjerge riigje',
            size: 30,
            color: 'pink'
        },
    ]
    
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme(){
    return gMeme
}



function deleteMeme(){

}

function updateMeme(){

}

function setLineTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt= txt
}

function getImgUrl(id){
    const img= gImgs.find(img => img.id === id)
    return img.url
}

function getImgs(){
    return gImgs
}

function setImg(id){
    gMeme.selectedImgId=id
}

function setLineColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color= color
}
function SetFontSize(diff){
    gMeme.lines[gMeme.selectedLineIdx].size+=diff
}

function addLine(){
    gMeme.lines.push(_createLine())
    gMeme.selectedLineIdx= gMeme.lines.length-1
}

function switchSelectedLine(){
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx= 0
}

function selectLine(idx){
    gMeme.selectedLineIdx= idx
}

function getSelectedLineTxt(){
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function _createLine(txt='Your text here'){
   return {
        txt,
        size: 30,
        color: 'pink'
    }
}

function _createImgs(){

}

function _createMeme(){

}