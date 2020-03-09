import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import store from "../redux/store";

import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

//import * as dat from "dat.gui";

//import loopFile from "../assets/determination.mp3";
import flame from "../assets/flame1.png";
import lamp from "../assets/LampStand.png";
import fortress from "../assets/fortress.png";
import wood from "../assets/rpg_gui_v1/woodBackground.png";
//import diamonds from "../assets/diamonds32x24x5.png";
import portrait from "../assets/oracles_0.png";

const token = localStorage.getItem("mud_token");

const Game = ({ responses, playerCoords, map, location }) => {
  let history = useHistory();
  //let homeLoop;
  //let responsesText;
  console.log(history);

  const phaserStuff = {
    initialize: true,
    game: {
      width: "50%",
      height: "100vh",
      type: Phaser.AUTO,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 }
        }
      },
      scene: {
        init: function() {
          this.cameras.main.setBackgroundColor("#24252A");
        },
        preload: function() {
          this.load.image("fire", flame);
          this.load.image("lamp", lamp);
          this.load.image("fortress", fortress);
          this.load.image("wood", wood);
          //this.load.audio("homeLoop", loopFile);
          this.load.image("portrait", portrait);
          // Some files, like spritesheets, require an external link, otherwise you get a Data URI error... -_-'
          this.load.spritesheet(
            "map",
            "https://raw.githubusercontent.com/cspt5-press-f/frontend/staging/src/assets/map.png",
            { frameWidth: 32, frameHeight: 32 }
          );
          //this.load.plugin("filter",Fire, true);
        },
        create: function() {
          //let sceneManager = new Phaser.SceneManager(phaserStuff.game);
          /*let gui = new dat.GUI();
          let s = gui.addFolder("Toggle Sound");

          let soundController = s.add(this.sound, "mute");
          soundController.listen();*/

          // !! Need to figure out how to get this fortress image to stretch based on the game's window
          this.add
            .image(0, 0, "fortress")
            .setOrigin(0)
            .setScale(1);

          let group;
          let fakeMap;
          let flippedMap;
          if (token) {
            //console.log("creating!");
            let mapMaker = () => {
              fakeMap = store.getState().movement.map; // get map from backend
              fakeMap[2][2] = "player"; // add player to center of map
              console.log("fakeMap", fakeMap);
              flippedMap = fakeMap.reverse().flat()//.reverse(); // flatten array
              /*
              [[1,2,3]]


              */


              console.log("flippedMap", flippedMap)
              let renderMap = flippedMap.map(item => {
                //return row.map(item => {
                  if (item === "player") {
                    // render the player sprite
                    return this.add.sprite(0, 0, "map", [2]).setOrigin(0.5);
                  } else if (item) {
                    // if there is a room, render open space
                    return this.add.sprite(0, 0, "map", [0]).setOrigin(0.5);
                  } else if (!item) {
                    // if there is no room, render a bush
                    return this.add.sprite(0, 0, "map", [1]).setOrigin(0.5);
                  }
                //});
              });

              if (group) {
                group.removeAll(true);
              } else {
                group = this.add.container();
                /*let mask = this.add.graphics(0, 0);

                //	Shapes drawn to the Graphics object must be filled.
                mask.fillStyle(0xffffff);
            
                //	Here we'll draw a circle
                mask.fillCircle(10, 10, 100);
            
                //	And apply it to the Sprite
                group.setMask(mask);*/
              } // if the map already exists, clear it before updating it
              
              group.add(renderMap);
              Phaser.Actions.GridAlign(group.getAll(), {
                width: 5,
                height: 5,
                cellWidth: 32,
                cellHeight: 32,
                x: this.cameras.main.centerX - 80, // these coords tell phaser where to place the first item, to center align we'll shift by 80 pixels... 32px*5 sprites = 160px
                y: this.cameras.main.centerY - 80
              });
            };

            store.subscribe(() => {
              if (store.getState().movement.map.length) mapMaker(); // only run the map making function if there's any map data in the store
            });

            let portraitImage = this.add
              .image(0, this.game.canvas.height, "portrait")
              .setScale(0.3)
              .setOrigin(0.1, 1)
              .setFlipX(true)
              .setAlpha(0.5);
            /*console.log(
              "portrait height",
              portraitImage.displayWidth,
              portraitImage.displayHeight
            );*/
            // console.log("game size", this);
          }
          //console.log("diamonds group center coords", group.x, group.y);

          if (!token) {
            let particles = this.add.particles("fire");
            let lamp_image = this.add.image(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "lamp"
            );
            let lamp_vectors = lamp_image.getTopCenter();

            let emitter = particles.createEmitter({
              alpha: { start: 1, end: 0 },
              scale: { start: 0.5, end: 1.5 },
              //tint: { start: 0xff945e, end: 0xff945e },
              speed: 15,
              accelerationY: -50,
              angle: { min: -85, max: -95 },
              //rotate: { min: -180, max: 180 },
              lifespan: { min: 1000, max: 1100 },
              blendMode: "ADD",
              frequency: 65,
              //maxParticles: 10,
              x: lamp_vectors.x,
              y: lamp_vectors.y + 27
            });

            /*homeLoop = this.sound.add("homeLoop");
            homeLoop.play({ loop: true, volume: 0.02 });*/
            //this.sound.setDecodedCallback(homeLoop, ()=>{}, this);

            let buttonImage = this.add
              .image(
                this.cameras.main.centerX,
                this.cameras.main.centerY + 75,
                "wood"
              )
              .setOrigin(0.5)
              .setScale(0.35, 0.2)
              .setAlpha(0.7);

            let loginButton = this.add.text(
              this.cameras.main.centerX,
              this.cameras.main.centerY + 50,
              "Login",
              {
                font: "40px Arial",
                fill: "#aaaaaa"
              }
            );
            loginButton.setOrigin(0.5);
            loginButton
              .setInteractive()
              .on("pointerdown", () => {
                history.push("/login");
              })
              .on("pointerover", () =>
                loginButton.setStyle({ fill: "#ffffff", font: "40px Arial" })
              )
              .on("pointerout", () =>
                loginButton.setStyle({ fill: "#aaaaaa", font: "40px Arial" })
              );

            let registerButton = this.add.text(
              this.cameras.main.centerX,
              this.cameras.main.centerY + 100,
              "Register",
              {
                font: "40px Arial",
                fill: "#aaaaaa"
              }
            );
            registerButton.setOrigin(0.5);
            registerButton
              .setInteractive()
              .on("pointerdown", () => {
                history.push("/registration");
              })
              .on("pointerover", () =>
                registerButton.setStyle({ fill: "#ffffff", font: "40px Arial" })
              )
              .on("pointerout", () =>
                registerButton.setStyle({ fill: "#aaaaaa", font: "40px Arial" })
              );
          }
        },
        update: function() {
          //console.log("updating!")
          // constantly hitting the redux store ends up being really bad for performance... the code below is an attempt at that
          // responses = store.getState().responses.responses;
          // //console.log("responses",responses);
          // if (responsesText) {
          //   //console.log("responsesText exists")
          //   if (responsesText.text != responses[responses.length - 1]) {
          //     responsesText.setText(responses[responses.length - 1]);
          //   }
          // } else if (responses.length > 0) {
          //   console.log("we did it");
          //   responsesText = this.add
          //     .text(
          //       this.cameras.main.centerX,
          //       this.cameras.main.centerY + 150,
          //       responses[responses.length - 1],
          //       {
          //         font: "30px Arial",
          //         fill: "black"
          //       }
          //     )
          //     .setOrigin(0.5);
          // }
        }
      }
    }
  };

  return (
    <>
      <IonPhaser game={phaserStuff.game} initialize={phaserStuff.initialize} />
    </>
  );
};

const mapStateToProps = state => {
  const responses = state.responses;
  const map = state.movement.map;
  const playerCoords = state.movement.coords;
  return { responses, map, playerCoords };
};

export default connect(mapStateToProps)(Game);
