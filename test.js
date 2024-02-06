

const width = 50;
const height = 30;
/**
 * 
 * @param {Number} ms miliseconds of delay 
 * @returns {Promise}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function movePlayer(player, deltaX, deltaY) {
  // Clear the console
  console.clear();

  // Move the player
  player.x += deltaX;
  player.y += deltaY;

  // Bounce back if hitting the borders
  if (player.x < 0 || player.x >= width) {
    deltaX *= -1;
    player.x += 2 * deltaX;
  }

  if (player.y < 0 || player.y >= height) {
    deltaY *= -1;
    player.y += 2 * deltaY;
  }

  // Draw the rectangle with the player
  drawRectangle(player);

  // Wait for a short duration to see the movement
  await sleep(200);
}

function drawRectangle(player) {
  for (let i = 0; i < height; i++) {
    let row = '';
    for (let j = 0; j < width; j++) {
      if (i === player.y && j === player.x) {
        row += '*';
      } else if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
        row += '#';
      } else {
        row += ' ';
      }
    }
    console.log(row);
  }
}

async function main() {
  const player = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };

  while (true) {
    const deltaX = [-1, 0, 1][Math.floor(Math.random() * 3)];
    const deltaY = [-1, 0, 1][Math.floor(Math.random() * 3)];

    await movePlayer(player, deltaX, deltaY);
  }
}

main();

