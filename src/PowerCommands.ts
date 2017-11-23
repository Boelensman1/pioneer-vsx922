/**
 * The class containing all the volume related functions
 */
export default class PowerCommands {
  constructor(private runCommand: Function) {}

  /**
   * Close the connection to the device
   */
  public get(): Promise<boolean> {
    return this.runCommand('powerQuery').then((pwr) => (
      // yes for some reason PWR0 = muted and PWR1 = unmuted
      /PWR([01])/.exec(pwr)![1] === '0'
    ));
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
