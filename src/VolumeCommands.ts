/**
 * The class containing all the volume related functions
 */
export default class VolumeCommands {
  constructor(private runCommand: Function) {}

  public get(): Promise<number> {
    return this.runCommand('volumeQuery').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    ));
  }

  public set(desiredVolume: number): Promise<number> {
    return this.get().then((curVolume) => {
      // see if we need to go up or down
      const difference = desiredVolume - curVolume;
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

  public isMuted(): Promise<boolean> {
    return this.runCommand('muteQuery').then((muted) => (
      // yes for some reason MUT0 = muted and MUT1 = unmuted
      /MUT([01])/.exec(muted)![1] === '0'
    ));
  }

  public setMuted(desiredValue= true): Promise<boolean> {
    return this.isMuted().then((muted) => (
      muted === desiredValue ? desiredValue : this.toggleMuted()
    ));
  }

  public toggleMuted(): Promise<boolean> {
    return this.runCommand('volumeMute').then((muted) => (
      // yes for some reason MUT0 = muted and MUT1 = unmuted
      /MUT([01])/.exec(muted)![1] === '0'
    ));
  }
}
