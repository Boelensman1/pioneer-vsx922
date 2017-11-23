// http://raymondjulin.com/2012/07/15/remote-control-your-pioneer-vsx-receiver-over-telnet/
const volumeMatch = /VOL\d\d\d/

export const commands = {
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
  muteQuery: {
    command: '?M',
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
