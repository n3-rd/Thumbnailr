import express from 'express';
import { createCanvas } from 'canvas';
const app = express();

const createImage = (width, height, text, fontSize, fontFamily, bgColor, textColor) => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor || '#fff';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px ${fontFamily}` || '80px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor || '#000';
    const initials = text
        .toUpperCase()
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2) || 'JD';
    ctx.fillText(initials, width / 2, height / 2);
    return canvas.toBuffer();
};

app.get('/', (req, res) => {
    let bgColor = req.query.bgcolor || '#fff';
    let textColor = req.query.textcolor || '#000';
    const colorRegex = /^([0-9A-Fa-f]{3}){1,2}$/i;
    if (colorRegex.test(bgColor)) {
        bgColor = '#' + bgColor;
    }
    if (colorRegex.test(textColor)) {
        textColor = '#' + textColor;
    }
    const imageBuffer = createImage(200, 200, req.query.text || "John Doe", req.query.fontsize || 80, req.query.fontfamily || 'sans-serif', bgColor, textColor);
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
