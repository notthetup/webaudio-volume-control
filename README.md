# Webaudio Volume Control

_Avoid damaging the ears of your audience when you demo your WebAudio project_

## Extensions for master Volume Control of WebAudio

Extensions for Firefox and Chrome that adds a volume control slider in a dropdown from a toolbar button. The slider controls audio level (master gain) for all WebAudio based audio on a given page

## Builds

Packaged extensions are in the [build directory](/https://github.com/notthetup/webaudio-volume-control/tree/master/build)

## How does this work??

The extensions inject JavaScript in every page which takes adds a `GainNode` before every `AudioContext.destination`. It then wraps around the AudioContext contrustors and returns the `GainNode` for the `destination` property.

## Why??

Many times, especially when using HDMI projectors, local volume control on laptops get disabled (HDMI does the Audio I/O). So when demoing WebAudio based projects, the audio might be too loud, but there is no way to control it. With this extension you'll be able to control the audio level within the browser iteself.

## Issues

Because of the totally hackish way this is implemented this might break in some edge case scenarios. Please file issues and we can try to fix it.
