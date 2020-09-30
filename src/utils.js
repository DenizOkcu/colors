import { median, mean, std } from "mathjs";
import { RGBToHSL } from "./colorFunctions";

function pixelDataArrayToimageDataData(pixels) {
  const result = [];

  pixels.forEach((pixel) => {
    result.push(pixel.r);
    result.push(pixel.g);
    result.push(pixel.b);
    result.push(pixel.a);
  });

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
      a: data[index + 3],
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

export function draw(image, name, canvas) {
  const canvasWidth = 480;
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

  // sort it
  let pixels = imageDataDataToPixelDataArray(imgData.data);

  // put the pixels into buckets
  pixels.forEach((pixel) => {
    if (pixel.h > 300 || pixel.h <= 60) {
      redPixels.push(pixel);
    } else if (pixel.h > 60 && pixel.h <= 180) {
      greenPixels.push(pixel);
    } else if (pixel.h > 180 && pixel.h <= 300) {
      bluePixels.push(pixel);
    }
  });

  const compare = (a, b) => {
    return b.h === a.h ? b.s - a.s : b.h - a.h;
  };

  let newImgData = pixelDataArrayToimageDataData([
    ...redPixels.sort(compare),
    ...greenPixels.sort(compare),
    ...bluePixels.sort(compare),
  ]);

  // set the data
  imgData.data.set(newImgData);

  // draw the altered image
  ctx.putImageData(imgData, imageWidth, 0);

  var outputObject = {
    name: name,
    redPixels: (redPixels.length / pixels.length).toFixed(3),
    redstd: std(
      redPixels.map((a) => {
        var val = parseInt(a.h, 10) - 300;
        return val < 0 ? val + 360 : val;
      })
    ).toFixed(3),
    redMean: mean(
      redPixels.map((a) => {
        var val = parseInt(a.h, 10) - 300;
        return val < 0 ? val + 360 : val;
      })
    ).toFixed(3),
    redMed: median(
      redPixels.map((a) => {
        var val = parseInt(a.h, 10) - 300;
        return val < 0 ? val + 360 : val;
      })
    ),
    greenPixels: (greenPixels.length / pixels.length).toFixed(3),
    greenstd: std(greenPixels.map((a) => parseInt(a.h, 10) - 60)).toFixed(3),
    greenMean: mean(greenPixels.map((a) => parseInt(a.h, 10) - 60)).toFixed(3),
    greenMed: median(greenPixels.map((a) => parseInt(a.h, 10) - 60)),
    bluePixels: (bluePixels.length / pixels.length).toFixed(3),
    bluestd: std(bluePixels.map((a) => parseInt(a.h, 10) - 180)).toFixed(3),
    blueMean: mean(bluePixels.map((a) => parseInt(a.h, 10) - 180)).toFixed(3),
    blueMed: median(bluePixels.map((a) => parseInt(a.h, 10) - 180)),
  };

  return outputObject;
}
