'use strict'

let gImgs 
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your Text Here',
            size: 30,
            color: 'white',
            font:'impact',
            textAlign:'start'
        }
    ]
    
}

_createImgs()

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

function setFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font= font
}

function setTextAlignment(align){
    gMeme.lines[gMeme.selectedLineIdx].textAlign= align
}

function addLine(){
    gMeme.lines.push(_createLine())
    gMeme.selectedLineIdx= gMeme.lines.length-1
}

function deleteLine(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
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
        color: 'pink',
        font:'impact',
        textAlign:'start'
    }
}

function saveMeme(){

}

function _createImgs(){
     gImgs = [
     { id: 1, url: 'img/1.jpg', keywords: ['politic', 'angry'] },
     { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
     { id: 3, url: 'img/3.jpg', keywords: ['animal', 'baby','calm'] },
     { id: 4, url: 'img/4.jpg', keywords: ['animal', 'calm'] },
     { id: 5, url: 'img/5.jpg', keywords: ['baby', 'win'] },
     { id: 6, url: 'img/6.jpg', keywords: ['man', 'explain'] },
     { id: 7, url: 'img/7.jpg', keywords: ['baby', 'surprise'] },
     { id: 8, url: 'img/8.jpg', keywords: ['man', 'listening'] },
     { id: 9, url: 'img/9.jpg', keywords: ['baby', 'laugh'] },
     { id: 10, url: 'img/10.jpg', keywords: ['man', 'laugh'] },
     { id: 11, url: 'img/11.jpg', keywords: ['man', 'kiss'] },
     { id: 12, url: 'img/12.jpg', keywords: ['man', 'point'] },
     { id: 13, url: 'img/13.jpg', keywords: ['man', 'win'] },
     { id: 14, url: 'img/14.jpg', keywords: ['man', 'serious'] },
     { id: 15, url: 'img/15.jpg', keywords: ['man', 'explain'] },
     { id: 16, url: 'img/16.jpg', keywords: ['man', 'cry'] },
     { id: 17, url: 'img/17.jpg', keywords: ['politic', 'peach'] },
     { id: 18, url: 'img/18.jpg', keywords: ['toy', 'explain'] }]
}

function _createMeme(){

}