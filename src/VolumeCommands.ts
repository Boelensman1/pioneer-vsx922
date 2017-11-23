import * as zpad from 'zpad';

import { Command } from './interfaces';
import { volumeMatch } from './commands';

/**
 * The class containing all the volume related functions
 */
export default class VolumeCommands {
  constructor(private runCommand: Function) {}

  /**
   * Get the currentvolume of the device
   */
  public get(): Promise<number> {
    return this.runCommand('volumeQuery').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    ));
  }

  /**
   * Set the volume to a certain value (watch out for breaking your speakers)
   * @param desiredVolume What the volume should become
   */
  public set(desiredVolume: number): Promise<number> {
    // gonna need a custom command for this one
    const volumeCommand: Command = {
      // if needed add a 0 to the volume
      command: `${zpad(desiredVolume, 3)}VL`,
      match: volumeMatch,
    };

    return this.runCommand(volumeCommand).then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    ));
  }

  /**
   * Increase the volume by one or more
   * @param times How much to increase by
   */
  public increase(times = 1): Promise<number> {
    return this.runCommand('volumeUp').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    )).then((volume) => {
      if (times > 1) {
        return this.increase(times - 1);
      }
      else return volume;
    });
  }

  /**
   * Decrease the volume by one or more
   * @param times How much to decrease by
   */
  public decrease(times = 1): Promise<number> {
    return this.runCommand('volumeDown').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    )).then((volume) => {
      if (times > 1) {
        return this.decrease(times - 1);
      }
      else return volume;
    });
  }

  /**
   * Check if the device is muted (true = no sound)
   */
  public isMuted(): Promise<boolean> {
    return this.runCommand('muteQuery').then((muted) => (
      // yes for some reason MUT0 = muted and MUT1 = unmuted
      /MUT([01])/.exec(muted)![1] === '0'
    ));
  }

  /**
   * Set if the device is muted
   * @param desiredValue What the mutedstate should become (true = no sound)
   */
  public setMuted(desiredValue = true): Promise<boolean> {
    return this.isMuted().then((muted) => (
      muted === desiredValue ? desiredValue : this.toggleMuted()
    ));
  }

  /**
   * Toggle the mutestate of the device
   */
  public toggleMuted(): Promise<boolean> {
    return this.runCommand('volumeMute').then((muted) => (
      // yes for some reason MUT0 = muted and MUT1 = unmuted
      /MUT([01])/.exec(muted)![1] === '0'
    ));
  }
}
