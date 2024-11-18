let cars = []
let raceInProgress = true
let finishLine = 500

function setup() {
  createCanvas(800, 400)

  cars.push(new Car(50, 100, 2, "red"))
  cars.push(new Car(50, 200, 1.5, "blue"))
  cars.push(new Car(50, 300, 1, "green"))
}

function draw() {
  background(100, 200, 100)

  fill(150);
  rect(0, 80, width, 80)
  rect(0, 180, width, 80)
  rect(0, 280, width, 80)

  stroke(255);
  for (let y = 160; y <= 320; y += 100) {
    for (let x = 0; x < width; x += 40) {
      line(x, y, x + 20, y)
    }
  }

  stroke(0);
  line(finishLine, 80, finishLine, height - 20)
  fill(0)
  textSize(16)
  textAlign(CENTER)
  text("Finish Line", finishLine + 20, 70)

  for (let car of cars) {
    car.display()
    if (raceInProgress) {
      car.move()
    }
  }

  for (let car of cars) {
    if (car.x > finishLine) {
      raceInProgress = false
      textSize(24)
      fill(0)
      text("Race Finished!", width / 2, height / 2)
    }
  }
}

class Car {
  constructor(x, y, speed, color) {
    this.x = x
    this.y = y
    this.speed = speed
    this.color = color
    this.boostPower = 1
  }


  move() {
    this.x += this.speed
  }

  display() {
    fill(this.color)
    noStroke()

    rect(this.x, this.y - 20, 50, 20)

    fill(0)
    ellipse(this.x + 10, this.y, 10, 10)
    ellipse(this.x + 40, this.y, 10, 10)
  }

  boost() {
    this.x += this.boostPower * 30
  }

  isClicked(mx, my) {
    return mx > this.x && mx < this.x + 50 && my > this.y - 20 && my < this.y
  }
}

function mousePressed() {
  for (let car of cars) {
    if (car.isClicked(mouseX, mouseY)) {
      car.boost()
    }
  }
}
