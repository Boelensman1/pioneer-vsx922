const teletype = require('teletype')
const client = teletype('10.0.0.117')

const volumeMatch = /VOL\d\d\d/

const commands = {
  // Volume
  volumeDown: {
    command: 'VD',
    match: volumeMatch,
  },
  volumeUp: {
    command: 'VU',
    match: volumeMatch,
  },
  volumeMute: {
    command: 'MZ',
    match: /MUT[01]/,
  },
  volumeQuery: {
    command: '?V',
    match: volumeMatch,
  },
  // Power control
  powerOff: {
    command: 'PF',
  },
  powerOn: {
    command: 'PO',
  },
  powerQuery: {
    command: '?P',
    match: /PWR[01]/,
  },
  // TODO: inputselection
}

function executeCommand(client, command) {
  if (command.match) {
    return client.exec(command.command, command.match)
  }
  return client.exec(command.command)
}

executeCommand(client, commands.powerOn).then((response) => {
  console.log(response)
})
