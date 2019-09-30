import { RGBToHSL } from "./colorFunctions";

function pixelDataArrayToimageDataData(pixels) {
  const result = [];

  for (let index = 0; index < pixels.length; index++) {
    result.push(pixels[index].r);
    result.push(pixels[index].g);
    result.push(pixels[index].b);
    result.push(pixels[index].a);
  }

  return result;
}

function imageDataDataToPixelDataArray(data) {
  const pixels = [];
  let index = 0;

  while (index < data.length) {
    let rawPixelObject = {
      r: data[index + 0],
      g: data[index + 1],
      b: data[index + 2],
      a: data[index + 3]
    };

    let hslArray = RGBToHSL(
      rawPixelObject.r,
      rawPixelObject.g,
      rawPixelObject.b
    );

    rawPixelObject.h = hslArray[0];
    rawPixelObject.s = hslArray[1];
    rawPixelObject.l = hslArray[2];

    pixels.push(rawPixelObject);
    index = index + 4;
  }

  return pixels;
}

export function draw(image, canvas) {
  const canvasWidth = 960;
  const imageWidth = canvasWidth / 2;
  const imageHeight = image.height / (image.width / imageWidth);
  const ctx = canvas.getContext("2d");

  const redPixels = [];
  const greenPixels = [];
  const bluePixels = [];

  canvas.width = canvasWidth;
  canvas.height = imageHeight;

  // draw the first/original image
  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

  // generate image data from the context
  let imgData = ctx.getImageData(0, 0, imageWidth, imageHeight);

  // change it
  let pixels = imageDataDataToPixelDataArray(imgData.data);

  for (let index = 0; index < pixels.length; index++) {
    let pixel = pixels[index];

    if (pixel.h > 300 || pixel.h <= 60) {
      redPixels.push(pixel);
    } else if (pixel.h > 60 && pixel.h <= 180) {
      greenPixels.push(pixel);
    } else if (pixel.h > 180 && pixel.h <= 300) {
      bluePixels.push(pixel);
    }
  }

  let newImgData = pixelDataArrayToimageDataData([
    ...redPixels.sort((a, b) => {
      if (b.r === a.r) {
        return b.l - a.l;
      }
      return b.r - a.r;
    }),
    ...greenPixels.sort((a, b) => {
      if (b.g === a.g) {
        return b.l - a.l;
      }
      return b.g - a.g;
    }),
    ...bluePixels.sort((a, b) => {
      if (b.b === a.b) {
        return b.l - a.l;
      }
      return b.b - a.b;
    })
  ]);

  // set the data
  imgData.data.set(newImgData);

  // draw the altered image
  ctx.putImageData(imgData, imageWidth, 0);
}
