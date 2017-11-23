export default function executeCommand(client, command): Promise<any> {
  if (command.match) {
    return client.exec(command.command, command.match)
  }
  return client.exec(command.command)
}
