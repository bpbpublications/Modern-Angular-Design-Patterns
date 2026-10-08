abstract class Bird {
  abstract move(): void;
}

class FlyingBird extends Bird {
  move() {
    console.log('Flying');
  }
}

class SwimmingBird extends Bird {
  move() {
    console.log('Swimming');
  }
}

function moveBird(bird: Bird) {
  bird.move();
}

export { Bird, FlyingBird, SwimmingBird, moveBird };
