import Grid from "./Grid.js"
import Tile from "./Tile.js" 

const gameBoard = document.getElementById("game-board");
const grid = new Grid (gameBoard)


grid.randomEmptyCell ().tile = new Tile(gameBoard)
grid.randomEmptyCell ().tile = new Tile(gameBoard)
setupInput()
 console.log (grid.cellsByColumn)
function setupInput() {
    window.addEventListener("keydown" , handleInput , {once: true}) 
    
    
}

async function handleInput(e) {
    console.log(e.key) 
    switch(e.key) { 
        case "ArrowUp": 
            await moveUp()
            break; 
        case "ArrowDown":
           await moveDown()
            break;
        case "ArrowLeft":
           await moveLeft()
            break;
        case "ArrowRight":
          await  moveRight()
            break; 
        default: 
            setupInput ()
            return
    }
    // grid.cells.forEach(cell => cell.mergeTiles()) // the tiles are being merged together 
    // if (!canMoveUp() && !canMoveDown() && !canMoveLeft() &&!canMoveRight()) { 
    //   newTile.waitForTransition(true).then(() => {
    //     alert("You lose")
    //   }) 
    //   return 
    // }
    const newTile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = newTile

    

        
    
    setupInput() 
}

function moveUp() {
    slideTiles(grid.cellsByColumn)
}

function moveDown() {
    slideTiles(grid.cellsByColumn.map(column => [...column].reverse())) 
}

function moveRight() {
    slideTiles(grid.cellsByRow.map(row => [...row].reverse())) 
}

function moveLeft() {
    slideTiles(grid.cellsByRow) 
}

function slideTiles(cells) {
    return Promise.all(
      cells.flatMap(group => {
        const promises = []
        for (let i = 1; i < group.length; i++) {
          const cell = group[i]
          if (cell.tile == null) continue
          let lastValidCell
          for (let j = i - 1; j >= 0; j--) {
            const moveToCell = group[j]
            if (!moveToCell.canAccept(cell.tile)) break
            lastValidCell = moveToCell
          }
  
          if (lastValidCell != null) {
            promises.push(cell.tile.waitForTransition()) 
            if (lastValidCell.tile != null) {
              lastValidCell.mergeTile = cell.tile
            } else {
              lastValidCell.tile = cell.tile
            }
            cell.tile = null
          }
        }
        return promises
      })
    )
  } 