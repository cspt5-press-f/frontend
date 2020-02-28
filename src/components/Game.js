import React from "react";

import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

import * as dat from "dat.gui";

import loopFile from "../assets/determination.mp3";
import flame from "../assets/flame1.png";

const Game = () => {
  let homeLoop;

  const phaserStuff = {
    initialize: true,
    game: {
      width: "50%",
      height: "50%",
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
          this.load.audio("homeLoop", loopFile);
          //this.load.plugin("filter",Fire, true);
        },
        create: function() {
          let particles = this.add.particles("fire");

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
            x: this.cameras.main.centerX,
            y: this.cameras.main.centerY
          });

          homeLoop = this.sound.add("homeLoop");
          homeLoop.play({ loop: true });
          //this.sound.setDecodedCallback(homeLoop, ()=>{}, this);

          this.helloWorld = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 50,
            "Press F",
            {
              font: "40px Arial",
              fill: "#ffffff"
            }
          );
          this.helloWorld.setOrigin(0.5);
          //emitter.startFollow(this.helloWorld);
          let gui = new dat.GUI();
          let s = gui.addFolder("Toggle Sound");

          s.add(this.sound, "mute").listen();
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
