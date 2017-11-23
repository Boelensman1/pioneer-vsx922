const teletype = require('teletype');

import { Command } from './interfaces';
import { commands } from './commands';

import executeCommand from './executeCommand';

import VolumeCommands from './VolumeCommands';
import PowerCommands from './PowerCommands';

/**
 * The main class containing all the functions
 */
export default class Pioneer {
  /**
   * Handle to the telnet connection
   */
  private client: any;

  /** The commands related to volume */
  public volume: VolumeCommands;
  /** The commands related to power */
  public power: PowerCommands;

  constructor(
    private hostname: string,
    private port = 23) {
    this.client = teletype(hostname, port);
    this.volume = new VolumeCommands(this.runCommand.bind(this));
    this.power = new PowerCommands(this.runCommand.bind(this));
  }

  /**
   * Run a command on the device
   * @returns {string} The response of the device
   */
  private runCommand(command: string|Command): Promise<string> {
    if (typeof(command) === 'string') {
      return executeCommand(this.client, commands[command]);
    }
    // otherwise it's a custom command
    return executeCommand(this.client, command);
  }


  /**
   * Close the connection to the device
   */
  public closeConnection(): Promise<void> {
    return this.client.close();
  }
}
