'use strict';
// Work-in-progress

function calculate(inputDirections) {
	let args = inputDirections.split(', ');
  let facing = 0;
  let coords = [0, 0];

  let right = 'R';
  let left = 'L';

  let previousLocations = {};

  args.some(function(item, ix) {
    item = item.toString();
    let direction = item.substring(0, 1);
    let blocks = parseInt(item.substring(1));

    // determine direction as an angle
    let angle = facing * 90;
    if (direction === right) {
      angle += 90;
    } else {
      angle -= 90;
    }
		
    // reset angle to be between 0, 90, 180, 270 on circle
    if (angle < 0) {
    	angle += 360;
    } else if (angle === 360) {
    	angle = 0;
    }
    facing = angle/90

    // even moves go horizontal, odd moves go vertical
    let moveDirection = facing < 2 ? 1 : -1;
    let coordsIx = ix % 2;
    
    coords[coordsIx] += moveDirection * blocks;

    if (previousLocations[coords[0]] && previousLocations[coords[0]].find(_ => _ == coords[1])) {
      return;
    } else {
      if (previousLocations[coords[0]]) {
        previousLocations[coords[0]].push(coords[1]);      
      } else {
        previousLocations[coords[0]] = [coords[1]];
      }
    }
    
  });
  return coords;
}

module.exports = calculate;