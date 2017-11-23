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
    return this.get().then((curVolume) => {
      // see if we need to go up or down
      const difference = desiredVolume - curVolume;
      // there does not seem to be any way to just set the volume
      // so we have to repeatedly increase/decrease
      // or at least I couldn't figure out the command to directly set
      if (difference > 0) {
        return this.increase(difference);
      }
      if (difference < 0) {
        return this.decrease(-difference);
      }
      // otherwise we just return
      return curVolume;
    });
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
