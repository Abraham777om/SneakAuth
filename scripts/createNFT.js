const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const QRCode = require('qrcode');

// Tamaño fijo para el código QR
const qrCanvasSize = 100;

// Crear un lienzo (canvas) con las dimensiones deseadas
const canvas = createCanvas(504, 495);
const ctx = canvas.getContext('2d');

// Crear un lienzo adicional para el código QR en la memoria
const qrCanvas = createCanvas(qrCanvasSize, qrCanvasSize); // Tamaño del código QR

// Cargar una imagen de fondo
loadImage('../NFT/fondo.png').then(async (image) => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Definir estilos de texto, incluyendo la fuente "Red Hat Display"
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  function drawTextWithLetterSpacing(text, x, y, fontSize, letterSpacing) {
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      ctx.font = `${fontSize}px "Red Hat Display", sans-serif`;
      ctx.fillText(letter, x, y);
      ctx.strokeText(letter, x, y);
      x += ctx.measureText(letter).width + letterSpacing;
    }
  }

  drawTextWithLetterSpacing('Paris Saint-Germain', 240, 80, 14, 2);
  ctx.lineWidth = 0.4;
  drawTextWithLetterSpacing('12/50', 350, 150, 10, 2);
  drawTextWithLetterSpacing('Nike', 240, 150, 10, 2);
  drawTextWithLetterSpacing('10,000 ZENIQ', 240, 200, 10, 2);
  drawTextWithLetterSpacing('Black/White and Orange', 95, 280, 10, 2);
  drawTextWithLetterSpacing('11/05/2023', 285, 280, 10, 2);
  drawTextWithLetterSpacing('Washington DC', 95, 330, 10, 2);
  drawTextWithLetterSpacing('Gibrán Kizay Soto Reyes', 95, 380, 10, 2);
  drawTextWithLetterSpacing('AQ3366-601', 115, 220, 10, 2);

  // Generar el código QR en el lienzo adicional
  const qrCodeData = "0x1ae6194bee8b4d910cc71ed12f6b5a7c4b153d7b1fe52d36f09880e92de0a9bb"; // Datos que deseas codificar
  await QRCode.toCanvas(qrCanvas, qrCodeData);

  // Escalar el código QR para ajustarse al tamaño fijo
  const qrScale = qrCanvasSize / qrCanvas.width;
  ctx.drawImage(qrCanvas, 300, 300, qrCanvas.width * qrScale, qrCanvas.height * qrScale);

  // Cargar una imagen adicional
  const imagenAdicional = await loadImage('../NFT/Sneakers.png');

  // Redondear las esquinas de la imagen adicional
  const radioEsquinas = 10; // Ajusta el valor para redondear más o menos las esquinas
  const xImagen = 100;
  const yImagen = 60;
  const anchoImagen = 100;
  const altoImagen = 130;

  ctx.save();

  // Función para redondear las esquinas de un rectángulo
  ctx.beginPath();
  ctx.moveTo(xImagen + radioEsquinas, yImagen);
  ctx.lineTo(xImagen + anchoImagen - radioEsquinas, yImagen);
  ctx.arcTo(xImagen + anchoImagen, yImagen, xImagen + anchoImagen, yImagen + altoImagen - radioEsquinas, radioEsquinas);
  ctx.lineTo(xImagen + anchoImagen, yImagen + altoImagen);
  ctx.lineTo(xImagen, yImagen + altoImagen);
  ctx.lineTo(xImagen, yImagen + radioEsquinas);
  ctx.arcTo(xImagen, yImagen, xImagen + radioEsquinas, yImagen, radioEsquinas);
  ctx.closePath();
  ctx.clip();

  // Dibujar la imagen adicional dentro del área con esquinas redondeadas
  ctx.drawImage(imagenAdicional, xImagen, yImagen, anchoImagen, altoImagen);
  ctx.restore();

  // Agregar un borde redondeado alrededor de la imagen redondeada
  const bordeRadioEsquinas = 5; // Ajusta el valor para redondear las esquinas del borde
  ctx.lineWidth = 2; // Ancho del borde
  ctx.strokeStyle = 'black'; // Color del borde
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(xImagen + bordeRadioEsquinas, yImagen - 1);
  ctx.lineTo(xImagen + anchoImagen - bordeRadioEsquinas, yImagen - 1);
  ctx.arcTo(xImagen + anchoImagen + 1, yImagen - 1, xImagen + anchoImagen + 1, yImagen + altoImagen - bordeRadioEsquinas, bordeRadioEsquinas);
  ctx.lineTo(xImagen + anchoImagen + 1, yImagen + altoImagen + 1);
  ctx.lineTo(xImagen - 1, yImagen + altoImagen + 1);
  ctx.lineTo(xImagen - 1, yImagen + bordeRadioEsquinas);
  ctx.arcTo(xImagen - 1, yImagen - 1, xImagen + bordeRadioEsquinas, yImagen - 1, bordeRadioEsquinas);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // Guardar la imagen completa con texto, código QR, imagen adicional y borde
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('imagen_final.png', buffer);

  console.log('Imagen generada y guardada como "imagen_final.png"');
});