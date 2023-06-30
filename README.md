# KJSPKG Compatibility Layer

[![kjspkg-available](https://github-production-user-asset-6210df.s3.amazonaws.com/79367505/250114674-fb848719-d52e-471b-a6cf-2c0ea6729f1c.svg)](https://kjspkglookup.modernmodpacks.site/#kjspkg-compat-layer)

Backwards compatibility that Lat can only dream of :heh:

## Features

### onEvent sync

```js
// KJSPKG compat layer adds a function that acts like the old onEvent
// If used on Legacy, it will just redirect to the regular onEvent function
// If used with KJS6, it will find the correct event function and call that instead
global.kjspkgCompatLayer.legacyOnEvent("player.tick", event => {
    console.log("do stuff!")
})
```

## Forge event sync

```js
// You can do a similar thing with forge events
global.kjspkgCompatLayer.legacyForgeEvent("some.forge.event.class.name", event => {
    console.log("do more stuff!")
})
```

### Reflection sync

```js
// KJSPKG compat layer also adds a simliar redirect function for java reflection functions
// On legacy, it will call the java() function. On KJS6, it will call Java.loadClass()
const someJavaThing = global.kjspkgCompatLayer.legacyJava("super.cool.and.long.class.name")
```

### Getting the version ID

```js
// If you couldn't find a function that suits your needs, you can always just check the version you're running
// To do that, you can get the version id by simply checking the versionId variable
// 6 - 1.16.5, 8 - 1.18.2, 9 - 1.19.2
if (global.kjspkgCompatLayer.versionId<9) console.log("Legacy") 
else console.log("KJS6+") 
```
