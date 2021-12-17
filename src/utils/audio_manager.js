export default class AudioManager {
  static scene;
  static sounds = [];
  static playSoundIdle;
  static init(scene, sounds) {
    AudioManager.scene = scene;
    if (sounds) {
      for (var i = 0; i < sounds.length; i++) {
        AudioManager.addSound(sounds[i]);
        //AudioManager.sounds[sounds[i]] = AudioManager.scene.sound.add(sounds[i]);
      }
    }
  }

  static addSound(soundKey) {
    AudioManager.sounds[soundKey] = AudioManager.scene.sound.add(soundKey);
  }

  static stopSound(soundKey) {
    if (AudioManager.sounds[soundKey]) {
      AudioManager.sounds[soundKey].stop();
    }
  }

  static async toggleSound(toggle) {
    if (Array.isArray(this.playSoundIdle)) {
      for (let index = 0; index < this.playSoundIdle.length; index++) {
        const voKey = this.playSoundIdle[index];
        this.stopSound(voKey);
        await this.playSound(voKey);
      }
    } else {
      this.stopSound(this.playSoundIdle);
      this.playSound(this.playSoundIdle);
    }
  }

  static playSound(soundKey) {
    return new Promise((resolve, reject) => {
      if (AudioManager.sounds[soundKey]) {
        AudioManager.sounds[soundKey].play();
        AudioManager.sounds[soundKey].once("complete", resolve);
      } else {
        resolve();
      }
    });
  }
  static playBgSound(soundKey) {
    AudioManager.sounds[soundKey].play();
    AudioManager.sounds[soundKey].setLoop(true);
    AudioManager.sounds[soundKey].setVolume(0.05);
  }
}
