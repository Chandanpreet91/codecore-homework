const xAxis = '─'
const yAxis =  '│'
const origin =  '┼'
const turtle = '•'
const empty = ' '
class Turtle {
  constructor(xCoordinate, yCoordinate) {
    this.x = xCoordinate;
    this.y = yCoordinate;
    this.direction = 'east'
    this.moveCount = 0
    this.newArray = [[this.x, this.y]]
    this.resultString = ''
    return this
  }
  forward(numberOfSpaces) {
    this.moveCount = 0
    while (this.moveCount < numberOfSpaces) {
      if (this.direction === 'east') {
        this.x++
      } else if (this.direction === 'south') {
        this.y++
      } else if (this.direction === 'west') {
        this.x--
      } else if (this.direction === 'north') {
        this.y--
      }
      this.moveCount++
      this.newArray.push([this.x, this.y])
    }
    return this
  }
  right() {
    if (this.direction === 'east') {
      this.direction = 'south'
    } else if (this.direction === 'south') {
      this.direction = 'west'
    } else if (this.direction === 'west') {
      this.direction = 'north'
    } else {
      this.direction === 'east'
    }
    return this
  }
  left() {
    if (this.direction === 'east') {
      this.direction = 'north'
    } else if (this.direction === 'north') {
      this.direction = 'west'
    } else if (this.direction === 'west') {
      this.direction = 'south'
    } else {
      this.direction === 'east'
    }
    return this
  }
  allPoints() {
    console.log(this.newArray)
    return this.newArray
  }
  print() {
    const isArrayInThisArray = (arr, item) => {
      const item_as_string = JSON.stringify(item)
      const isItInside = arr.some(function (element) {
        return JSON.stringify(element) === item_as_string
      })
      return isItInside
    }
    const maxMovement = this.newArray.map(function (element) {
      return Math.max.apply(Math, element)
    })
    let maxPlusOne = Math.max.apply(null, maxMovement) + 1
    this.resultString += '-- BEGIN LOG\n'
    for (let j = -maxPlusOne; j <= maxPlusOne; j++) {
      for (let i = -maxPlusOne; i <= maxPlusOne; i++) {
        if (isArrayInThisArray(this.newArray, [i, j])) {
          this.resultString += turtle
        } else if (isArrayInThisArray([[0, 0]], [i, j])) {
         
          this.resultString += origin
        } else if (isArrayInThisArray([[0, j]], [i, j])) {
          
          this.resultString += yAxis
        } else if (isArrayInThisArray([[i, 0]], [i, j])) {
          
          this.resultString += xAxis
        } else {
          this.resultString += empty
        }
      }
      this.resultString += '\n'
    }
    this.resultString += '-- END LOG\n'
    console.log(this.resultString)
    return this.resultString
  }
} 




const turtleGraphics = new Turtle(2, 2)
  .forward(2)
  .right()
  .forward(7)
  .right()
  .forward(5)
  .right()
  .forward(2)
  .print()