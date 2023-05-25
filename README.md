# KJSPKG Compatibility Layer

Backwards compatibility that Lat can only dream of :heh:

## Features

### KJS6 and LegacyKJS onEvent sync

```js
// KubeJS 6 can now use the old onEvent function added by KubeJS Legacy
// To do that, simply use the global.kjspkgCompatLayer.legacyOnEvent event instead of the regular onEvent
// This function is also added to KubeJS Legacy, so you don't have to write two different cases for different versions
global.kjspkgCompatLayer.legacyOnEvent("player.tick", event => {
    console.log("do stuff!")
})
```
