const colors = ['black'];
const frame = document.getElementById('pixel-board');
const pixelFrame = document.getElementsByClassName('pixel');
const pixelFrameLess = document.getElementsByClassName('pixelLess');
const pallete = document.getElementById('color-palette');
const input = document.getElementById('board-size');
let colorSelected = 'black';
let unitPixelFrame = 5;

window.onload = () => {
  const boxSeleted = pallete.firstChild;
  boxSeleted.className = 'color selected shadow p-3 mb-5 rounded';
};

function makeRandomColors() {
  let color = '';
  for (let index = 0; index < 3; index += 1) {
    const fistNumber = Math.floor(Math.random() * 251);
    const secondNumber = Math.floor(Math.random() * 251);
    const thirdNumber = Math.floor(Math.random() * 251);
    color = `rgb(${fistNumber},${secondNumber},${thirdNumber})`;
    colors.push(color);
  }
}
makeRandomColors();

function selectColorPalette(e) {
  const boxPallete = pallete.children;
  for (let index = 0; index < boxPallete.length; index += 1) {
    boxPallete[index].classList.remove('selected');
  }
  e.target.classList += ' selected';
  colorSelected = e.target.style.backgroundColor;
}

function makePalette() {
  for (let index = 0; index < colors.length; index += 1) {
    const boxPallete = document.createElement('div');
    boxPallete.className = 'color shadow p-3 mb-5 rounded';
    boxPallete.style.backgroundColor = colors[index];
    pallete.appendChild(boxPallete);
    boxPallete.addEventListener('click', selectColorPalette);
  }
}
makePalette();

function putColor(e) {
  e.target.style.backgroundColor = colorSelected;
}

function makeColumnFrame(lineFrame, unitColumnPixel) {
  for (let index = 0; index < unitColumnPixel; index += 1) {
    const columnFrame = document.createElement('div');
    if (unitColumnPixel > 30) {
      columnFrame.className = 'pixelLess';
    } else {
      columnFrame.className = 'pixel';
    }
    lineFrame.appendChild(columnFrame);
    columnFrame.addEventListener('click', putColor);
  }
}

function makeLineFrame(unitLinePixel) {
  for (let index = 0; index < unitLinePixel; index += 1) {
    const lineFrame = document.createElement('div');
    lineFrame.className = 'line-frame';
    frame.appendChild(lineFrame);
    makeColumnFrame(lineFrame, unitLinePixel);
  }
}
makeLineFrame(unitPixelFrame);

function clearAllFrame() {
  const btnReset = document.getElementById('clear-board');
  btnReset.addEventListener('click', () => {
    let pixelOfClean = pixelFrame;
    if (pixelFrameLess.length > 0) {
      pixelOfClean = pixelFrameLess;
    }
    for (let index = 0; index < pixelOfClean.length; index += 1) {
      pixelOfClean[index].style.backgroundColor = 'White';
    }
  });
}
clearAllFrame();

function deletePixelAndLines(Checking) {
  if (Checking === '') {
    alert('Board inválido!');
  }
  const deleteLineFrame = frame.childElementCount;
  for (let index = 0; index < deleteLineFrame; index += 1) {
    const fistChild = frame.firstElementChild;
    fistChild.remove();
  }
}

function redefineFrame() {
  const btnRedefine = document.getElementById('generate-board');
  btnRedefine.addEventListener('click', () => {
    unitPixelFrame = input.value;
    deletePixelAndLines(unitPixelFrame);
    if (unitPixelFrame < 5) {
      unitPixelFrame = 5;
      makeLineFrame(unitPixelFrame);
    } else if (unitPixelFrame > 50) {
      unitPixelFrame = 50;
      makeLineFrame(unitPixelFrame);
    } else {
      makeLineFrame(unitPixelFrame);
    }
  });
}
redefineFrame();
