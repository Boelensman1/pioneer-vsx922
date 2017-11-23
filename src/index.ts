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

  public volume: VolumeCommands;
  public power: PowerCommands;

  constructor(
    private hostname: string,
    private port = 23) {
    this.client = teletype(hostname, port);
    this.volume = new VolumeCommands(this.runCommand.bind(this));
    this.power = new PowerCommands(this.runCommand.bind(this));
  }

  private runCommand(command: string): Promise<string> {
    return executeCommand(this.client, commands[command]);
  }


  public closeConnection(): Promise<number> {
    return this.client.close();
  }
}
