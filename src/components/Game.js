import React from "react";
import { useHistory } from "react-router-dom";

import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

import * as dat from "dat.gui";

import loopFile from "../assets/determination.mp3";
import flame from "../assets/flame1.png";
import lamp from "../assets/LampStand.png";
import fortress from "../assets/fortress.png";
import wood from "../assets/rpg_gui_v1/woodBackground.png";

const Game = () => {
  let history = useHistory();
  let homeLoop;

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
          this.load.audio("homeLoop", loopFile);
          //this.load.plugin("filter",Fire, true);
        },
        create: function() {
          //let sceneManager = new Phaser.SceneManager(phaserStuff.game);
          /*let gui = new dat.GUI();
          let s = gui.addFolder("Toggle Sound");

          let soundController = s.add(this.sound, "mute");
          soundController.listen();*/

          this.add
            .image(0, 0, "fortress")
            .setOrigin(0)
            .setScale(1);
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

          homeLoop = this.sound.add("homeLoop");
          homeLoop.play({ loop: true, volume: 0.02 });
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

          //emitter.startFollow(this.helloWorld);
        },
        update: function() {}
      }
    }
  };

  return (
    <>
      <IonPhaser game={phaserStuff.game} initialize={phaserStuff.initialize} />
    </>
  );
};

export default Game;
