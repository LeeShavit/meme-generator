'use strict'

let gImgs

_createImgs()

function getImgUrl(id) {
    const img = gImgs.find(img => img.id === id)
    return img.url
}

function getImgs() {
    return gImgs
}

function _createImgs() {
    gImgs = [
        { id: 1, url: 'img/1.jpg', keywords: ['politic', 'angry'] },
        { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
        { id: 3, url: 'img/3.jpg', keywords: ['animal', 'baby', 'calm'] },
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