const teletype = require('teletype')

import executeCommand from './executeCommand';
import { commands } from './commands';

export default class Pioneer {
  private client: any

  constructor(
    private hostname: string,
    private port = 23) {
    this.client = teletype(hostname, port)
  }

  private runCommand(command): Promise<any> {
    return executeCommand(this.client, commands[command])
  }

  public getVolume(): Promise<number> {
    return this.runCommand('volumeQuery').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    ))
  }

  public setVolume(desiredVolume: number): Promise<number> {
    return this.getVolume().then((curVolume) => {
      // see if we need to go up or down
      const difference = desiredVolume - curVolume
      if (difference > 0) {
        return this.increaseVolume(difference)
      }
      if (difference < 0) {
        return this.decreaseVolume(-difference)
      }
      // otherwise we just return
      return curVolume
    })
  }

  public increaseVolume(times=1): Promise<number> {
    return this.runCommand('volumeUp').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    )).then((volume) => {
      if (times > 1) {
        return this.increaseVolume(times - 1)
      }
      else return volume
    })
  }

  public decreaseVolume(times=1): Promise<number> {
    return this.runCommand('volumeDown').then((vol) => (
      Number(/VOL(\d{3})/.exec(vol)![1])
    )).then((volume) => {
      if (times > 1) {
        return this.decreaseVolume(times - 1)
      }
      else return volume
    })
  }

  public isMuted(): Promise<boolean> {
    return this.runCommand('muteQuery').then((muted) => (
      // yes for some reason MUT0 = muted and MUT1 = unmuted
      /MUT([01])/.exec(muted)![1] === '0'
    ))
  }

  public setMuted(desiredValue=true): Promise<boolean> {
    return this.isMuted().then((muted) => (
      muted === desiredValue ? desiredValue : this.toggleMuted()
    ))
  }

  public toggleMuted(): Promise<boolean> {
    return this.runCommand('volumeMute').then((muted) => (
      // yes for some reason MUT0 = muted and MUT1 = unmuted
      /MUT([01])/.exec(muted)![1] === '0'
    ))
  }

  public closeConnection(): Promise<number> {
    return this.client.close();
  }
}
