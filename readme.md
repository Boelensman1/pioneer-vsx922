# Pioneer VSX 922 API
Just a simple interface to the telnet api of most pioneer receivers.
Only tested on the model I have (VSX922) but works on other models as well probably.

Based on http://raymondjulin.com/2012/07/15/remote-control-your-pioneer-vsx-receiver-over-telnet/

# Installing
Just `npm install pioneer-vsx922` should do the trick.

# Examples
Initialising the api
```
// require the lib ES5 style
const Pioneer = require('pioneer-vsx922').default;
// or ES6
import Pioneer from 'pioneer-vsx922';

// create a new instance, 10.0.0.100 and 23 are the ip and port of the receiver
// If you don't know them log in to your router to find the ip.
// 23 is the default telnet port, if it does not work try 8102
// If that also doesn't work I'd recommend using nmap
const pioneer = new Pioneer('10.0.0.100', 23);
```

Powering on the device
```
const pioneer = new Pioneer('10.0.0.100', 23);
pioneer.power.on().then(() => {
  // and close the connection
  pioneer.closeConnection();
})
```

Getting the volume
```
const pioneer = new Pioneer('10.0.0.100', 23);
pioneer.volume.get().then((volume) => {
  console.log(volume);
  // and close the connection
  pioneer.closeConnection();
})
```

# API
There are two working API's atm, source selection is coming.
In addition there is `pioneer.closeConnection` which closes the telnet connection.

### Volume
Everything related to volume
- **Get** `pioneer.volume.get()` Returns the current volume of the device.
- **Set** `pioneer.volume.set(30)` Set the volume of the device **(watch out for speaker damage)**
- **Increase** `pioneer.volume.increase(5)` Increases the volume of the device by the given number
- **Decrease** `pioneer.volume.decrease(5)` Decreases the volume of the device by the given number
- **IsMuted** `pioneer.volume.isMuted()` Returns if the device is muted (true = no sound)
- **SetMuted** `pioneer.volume.setMuted(true|false)` Mutes or unmutes to device
- **ToggleMuted** `pioneer.volume.toggleMuted()` Toggles whether or not the device is muted

#### Power
- **Get** `pioneer.power.get()` Returns whether or not the device is powered on
- **Set** `pioneer.power.set(true|false)` Sets whether or not the device is powered on
- **On** `pioneer.power.on()` Turns the device on
- **Off** `pioneer.power.off()` Turns the device on
