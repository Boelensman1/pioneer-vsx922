/**
 * The class containing all the volume related functions
 */
export default class PowerCommands {
  constructor(private runCommand: Function) {}

  /**
   * Get whether or not the device is turned on
   */
  public get(): Promise<boolean> {
    return this.runCommand('powerQuery').then((pwr) => (
      // yes for some reason PWR0 = muted and PWR1 = unmuted
      /PWR([01])/.exec(pwr)![1] === '0'
    ));
  }

  /**
   * Set whether or not the device is turned on
   */
  public set(power: boolean): Promise<void> {
    if (power) {
      return this.on();
    }
    return this.off();
  }

  /**
   * Turn the device on
   */
  public on(): Promise<void> {
    return this.runCommand('powerOn');
  }

  /**
   * Turn the device off
   */
  public off(): Promise<void> {
    return this.runCommand('powerOff');
  }
}
