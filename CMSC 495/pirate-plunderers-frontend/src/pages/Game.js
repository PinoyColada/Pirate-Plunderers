import React, { useEffect, useState, useRef } from "react";
import cannonImage from '../images/cannon.png';
import enemyPirateImage from '../images/pirate_ship.png';
import logo2 from '../images/logo2.png';
import torch from '../images/torch.gif';
import PopUp from '../components/PopUp'
import photo from "../images/continue_button.png"
import classnames from 'classnames';


const Game = () => {

  // define state variables
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const canvasRef = useRef(null);

  // handle input change for name
  const handleNameChange = (event) => {
    // get the value from the input field
    const target = event.target.value;
    // update the name state
    setName(target);
  }

  // define CSS class based on name value
  const imageClass = classnames('back-button continue-button', {
    // apply 'disabled' class if name is empty
    disabled: name === ''
  });

  // this effect runs when the 'startGame' state is set to true
  // and creates the game
  useEffect(() => {


    if (startGame === true) {

      const canvas = canvasRef.current;
      const scoreC = document.querySelector('#scoreC')
      const c = canvas.getContext('2d')

      //player class for loading player in
      class Player {
        constructor() {
          //where player first spawns
          this.velocity = {
            x: 0,
            y: 0
          }
          //making player visible and loading image, what player will look like
          this.opacity = 1
          const image = new Image()
          image.src = cannonImage
          image.onload = () => {
            const size = .28
            this.image = image
            this.width = image.width * size
            this.height = image.height * size
            this.position = {
              //used to center player to the canvas
              x: canvas.width / 2 - this.width / 2,
              y: canvas.height - this.height - 20
            }
          }
        }

        //draw function. Used to move player vertically across screen. 
        draw() {
          c.save()
          //used for when player loses game.
          c.globalAlpha = this.opacity
          c.translate(user.position.x + user.width / 2, user.position.y + user.height / 2)
          c.translate(-user.position.x - user.width / 2, -user.position.y - user.height / 2)
          c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
          c.restore()
        }
        //Movement function, used to call draw to make movements smooth
        movement() {
          if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
          }
        }
      }

      //Ammo class. Used to create cannon balls for player. Uses draw and movement to create and move shots fired.
      class Ammo {
        constructor({ position, velocity }) {
          this.position = position
          this.velocity = velocity
          this.rad = 4
        }

        draw() {
          c.beginPath()
          c.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2)
          c.fillStyle = 'black'
          c.fill()
          c.closePath()
        }

        movement() {
          this.draw()
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
        }
      }

      //Explode class. Creates effect of enemies being hit, or player being hit.
      class Explode {
        constructor({ position, velocity, rad, color }) {
          this.position = position
          this.velocity = velocity
          this.rad = rad
          this.color = color
          this.opacity = 1

        }

        draw() {
          c.save()
          c.globalAlpha = this.opacity
          c.beginPath()
          c.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2)
          c.fillStyle = this.color
          c.fill()
          c.closePath()
          c.restore()
        }

        movement() {
          this.draw()
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
          this.opacity -= 0.01
        }
      }
      //PirateAmmo, basically ammo class, but changed for enemies shots being fired at player.
      class PirateAmmo {
        constructor({ position, velocity }) {
          this.position = position
          this.velocity = velocity
          this.width = 3
          this.height = 10

        }
        //Enemies shots are white rectangles, will probably change this.
        draw() {
          c.fillStyle = 'white'
          c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }

        movement() {
          this.draw()
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
        }
      }

      //Pirate class. Class that creates enemies that spawn in.
      class Pirate {
        constructor({ position }) {
          this.velocity = {
            x: 0,
            y: 0
          }

          const image = new Image()
          image.src = enemyPirateImage
          image.onload = () => {
            const size = .15
            this.image = image
            this.width = image.width * size
            this.height = image.height * size
            this.position = {
              x: position.x,
              y: position.y
            }
          }
        }


        //uses draw to call movement to make enemies move side to side while slowly moving veritcally towards player.
        draw() {
          c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }
        movement({ velocity }) {
          if (this.image) {
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y
          }
        }
        //Shoot function, creates array of PirateAmmo to have enemies shoot at player.
        shoot(pirateAmmo) {
          pirateAmmo.push(new PirateAmmo({
            position: {
              x: this.position.x + this.width / 2,
              y: this.position.y + this.height
            },
            velocity: {
              x: 0,
              y: 5
            }
          }))
        }

      }

      //Wave class. Randomly generates enemies to be spawned in using 2D array.
      class Wave {
        constructor() {
          this.position = {
            x: 0,
            y: 0
          }
          this.velocity = {
            x: 3,
            y: 0
          }

          this.pirates = []

          const cols = Math.floor(Math.random() * 10 + 5)
          const rows = Math.floor(Math.random() * 5 + 2)

          this.width = cols * 35

          for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {

              this.pirates.push(new Pirate({
                position: {
                  x: x * 35,
                  y: y * 40
                }
              })
              )
            }
          }
        }
        //Used for enemy movement, while keeping in bounds of game.
        movement() {
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
          this.velocity.y = 0

          if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 35
          }
        }
      }

      //Player object user, arrays for cannon balls from player, waves of enemies, ammo for enemies, and the explosion effects of hitting shots.
      const user = new Player()
      const cBalls = []
      const waves = []
      const pirateAmmo = []
      const explosions = []

      //Controls that are validated later with switch statements
      const controls = {
        a: {
          pressed: false
        },
        d: {
          pressed: false
        },
        w: {
          pressed: false
        }
      }

      //Used to generate random waves of enemies later.
      //Game over and active used to test for if player loses.
      //Score set to 0 at start of game.
      let frames = 0
      let randFrame = Math.floor(Math.random() * 500 + 500)
      let game = {
        over: false,
        active: true
      }
      let score = 0

      //Passed object and color so it can be used for both player and enemies when hit.
      function createExplosion({ object, color }) {
        for (let i = 0; i < 15; i++) {
          explosions.push(new Explode({
            position: {
              x: object.position.x + object.width / 2,
              y: object.position.y + object.height / 2
            },
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2
            },
            // Used || so it can work for both player and enemies. Radius is randomly generated to create more explosive effect. 
            rad: Math.random() * 3,
            color: color || '#5C4033'
          }))
        }
      }



      //Create function, used to create layout of game, tests if game is running,
      //has validations for shots being fired, enemies and players being hit.
      function create() {

        //testing for game running
        if (!game.active) return

        //calling create recursively
        requestAnimationFrame(create)

        //Layout of game
        c.fillStyle = "blue"
        c.fillRect(0, 0, canvas.width, canvas.height)

        //giving player ability to move
        user.movement()
        //iterates through explosions array, while doing garbage collection.
        explosions.forEach((explosion, i) => {
          if (explosion.opacity <= 0) {
            setTimeout(() => {
              explosions.splice(i, 1)
            }, 0)

          } else {
            explosion.movement()
          }
        })
        //iterates through ammo for enemies while validating hits and garbage collection for shots going off screen.
        pirateAmmo.forEach((pirateBall, index) => {
          if (pirateBall.position.y + pirateBall.height >= canvas.height) {
            setTimeout(() => {
              pirateAmmo.splice(index, 1)
            }, 0)
          } else pirateBall.movement()
          //validation checking all deminsons of enemy shots hitting player.
          if (pirateBall.position.y + pirateBall.height >= user.position.y
            && pirateBall.position.x + pirateBall.width >= user.position.x
            && pirateBall.position.x <= user.position.x + user.width) {
            //garbage collection of enemy shots.
            //ends game if player hit.
            setTimeout(() => {
              pirateAmmo.splice(index, 1)
              user.opacity = 0
              game.over = true
              // call to back-end once a user loses a game to send over their score and username
              fetch("https://pirate-plunderers-backend.onrender.com/score-update", {
                method: 'POST',
                body: JSON.stringify({
                  Player: name,
                  Score: score
                }),
                "Content-type": "application/json"
              }).then(response => response.json())
            }, 0)
            setGameOver(true);
            //waits 2 seconds if game is over.
            setTimeout(() => {
              game.active = false
            }, 2000)
            //player will disappear and explosion is left from player.
            createExplosion({
              object: user,
              color: 'white'
            })
          }
        })
        //iterates through array of shots fired by player while doing garbage collection.
        cBalls.forEach((ammo, index) => {
          if (ammo.position.y + ammo.rad <= 0) {
            setTimeout(() => {
              cBalls.splice(index, 1)
            }, 0)
          } else {
            ammo.movement()
          }
        })

        //randomly generates size of waves of enemies created
        waves.forEach((wave, waveIndex) => {
          wave.movement()

          if (frames % 100 === 0 && wave.pirates.length > 0)
            wave.pirates[Math.floor(Math.random() * wave.pirates.length)].shoot(pirateAmmo
            )
          wave.pirates.forEach((pirate, i) => {
            pirate.movement({ velocity: wave.velocity })
            //validation to check if enemy is hit by player shots.
            cBalls.forEach((cBall, j) => {
              if (cBall.position.y - cBall.rad <=
                pirate.position.y + pirate.height &&
                cBall.position.x + cBall.rad >= pirate.position.x &&
                cBall.position.x - cBall.rad <= pirate.position.x
                + pirate.width && cBall.position.y + cBall.rad >= pirate.position.y) {
                //if enemy is hit, score it logged enemy is removed and explosion is called.
                setTimeout(() => {
                  const priateFound = wave.pirates.find((pirate2) => pirate2 === pirate)
                  const cBallFound = cBalls.find(cBall2 => cBall2 === cBall)

                  if (priateFound && cBallFound) {
                    score += 100
                    scoreC.innerHTML = score
                    setScore(score)
                    // console.log(score)
                    createExplosion({
                      object: pirate
                    })
                    //garbage collection of array of enemies     
                    wave.pirates.splice(i, 1)
                    cBalls.splice(j, 1)
                    //used to measure size of wave to keep in bounds.
                    if (wave.pirates.length > 0) {
                      const firstPirate = wave.pirates[0]
                      const lastPirate = wave.pirates[wave.pirates.length - 1]

                      wave.width = lastPirate.position.x - firstPirate.position.x + lastPirate.width
                      wave.position.x = firstPirate.position.x

                    } else {
                      waves.splice(waveIndex, 1)
                    }
                  }
                }, 0)
              }
            })
          })
        })
        //speed at which player can move left or right when keys pressed, while keeping in bounds.
        if (controls.a.pressed && user.position.x >= 0) {
          user.velocity.x = -7
          user.rotation = -.15
        } else if (controls.d.pressed && user.position.x + user.width <= canvas.width) {
          user.velocity.x = 7
          user.rotation = .15
        } else {
          user.velocity.x = 0
          user.rotation = 0
        }

        //new wave randomly generated.
        if (frames % randFrame === 0) {
          waves.push(new Wave())
          randFrame = Math.floor(Math.random() * 500 + 500)
          frames = 0
        }
        frames++
      }
      create()

      const handleKeyDown = ({ key }) => {
        if (game.over) return;
        switch (key) {
          case 'a':
            console.log('left');
            controls.a.pressed = true;
            break;
          case 'd':
            console.log('right');
            controls.d.pressed = true;
            break;
          case 'w':
            console.log('shoot');
            cBalls.push(
              new Ammo({
                position: {
                  x: user.position.x + user.width / 2,
                  y: user.position.y,
                },
                velocity: {
                  x: 0,
                  y: -10,
                },
              })
            );
            break;
          default:
            break;
        }
      };

      const handleKeyUp = ({ key }) => {
        switch (key) {
          case 'a':
            controls.a.pressed = false;
            break;
          case 'd':
            controls.d.pressed = false;
            break;
          default:
            break;
        }
      };

      //Used to prevent space bar from moving screen down.
      window.onkeydown = function (e) {
        var elem = e.target.nodename;
        if (elem !== 'TEXTAREA' && elem !== 'INPUT') {
          return !(e.keyCode === 32)
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };

    }
  }, [startGame, name]);

  //cards for game instructions
  const [cards] = useState([
    {
      title: <font color="#d7de11">Controls</font>,
      text: 'Use the "A" and "D" keys to move from left to right. Use the "w" key to fire. '
    },
    {
      title: <font color="#d7de11">Scoring</font>,
      text: 'Destroy enemy ships to gain points. Your score will be tallied at the end of the game if your ship is destroyed.'
    },

    {
      title: <font color="#d7de11">Mechanics</font>,
      text: 'The enemy ships are descending from the top of the screen in waves. Maneuver the player controlled cannon to dodge and fire at the enemy ships. If enemy projectiles reach the cannon, its GAME OVER.'
    },
    {
      title: <font color="#d7de11">Tips</font>,
      text: 'Prioritize shooting ships that are closest to the cannon. Pay attention to the enemy projectiles and dodge as quickly as you can.'
    },

  ],)

  /*Loads the game section if startGame is true and gameOver is false*/
  if (startGame === true && gameOver !== true) {
    return (
      <section className="game-page">
        <div className="game-page-title">
          <img src={torch} alt="logo2" />
          <img src={logo2} className="game-logo" alt="logo2" />
          <img src={torch} alt="logo2" />
        </div>
        <div style={{ position: 'relative' }}>
          <p
            style={{
              position: 'absolute',
              zIndex: 10,
              color: 'white',
              left: '10px',
              top: '10px',
              margin: 0,
              fontFamily: 'sans-serif',
              fontSize: '14px',
            }}
          >
            <span>Score:</span> <span id="scoreC">0</span>
          </p>
          <canvas ref={canvasRef} width="1024" height="576" />
        </div>
      </section>
    )
    /*Loads the game over section if startGame is true and gameOver is true*/
  } else if (startGame === true && gameOver === true) {
    return (
      <section className="game-page">
        <PopUp score={score} name={name} />
      </section>
    )
  };
  /*Loads the instruction section by default*/
  return (
    <section className="game-page">
      <div className="game-page-title">
        <img src={torch} alt="logo2" />
        <img src={logo2} className="game-logo" alt="logo2" />
        <img src={torch} alt="logo2" />
      </div>
      <section className="cardSection">
        <div className="game-container">
          <h1>Instructions</h1>
          <h3>
            Objective: Your ship is under attack. Destroy the enemy ships.
          </h3>
          {/*Maps through each card section containing specific instructions about the game*/}
          <div className="cards">
            {
              cards.map((card, i) => (
                <div key={i} className="card">
                  <h3>
                    {card.title}
                  </h3>
                  <p>
                    {card.text}
                  </p>

                </div>
              ))
            }
          </div>
          <h3>
            To start the game, please enter your name.
          </h3>
          {/*Allows the user to enter their name, and disables the button until there is value
            present in the input box*/}
          <input className="user-input" placeholder="Enter your name here" type="text" name="Name" value={name} onChange={handleNameChange} />
          <button disabled={!name} id="button-container">
            <img disabled={!name} style={{ opacity: name === '' ? 0.5 : 1 }} className={imageClass} onClick={() => setStartGame(true)} src={photo} alt="continue button" />
          </button>
        </div>
      </section>
    </section>
  );
};

export default Game;