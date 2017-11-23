/**
 * Execute a command on the telnet client
 * @param {object} client handle to the telnet client
 * @param {string} command The command (from the commandslist) tor un
 * @returns {Promise<string>} The response from the device
 */
export default function executeCommand(client, command): Promise<string> {
  if (command.match) {
    return client.exec(command.command, command.match);
  }
  return client.exec(command.command);
}
