# Presentation API Shim

## What is it?

I was experimenting with the [Presentation API](https://w3c.github.io/presentation-api/) and
found that while Chrome seems to support it, the version of Chrome running
on the Chromecast doesn't seem to be exactly the same (the `navigator.presentation.receiver` object is null). However, the Chromecast Chrome SDK works absolutely fine, so there's some custom magic going on under there I'm not aware of.

With this in mind, I thought I'd make a quick shim that bakes the 
Chromecast API back down to the Presentation API. While there, I've also
made a version that uses popup windows, so that we can test out a
Presentation API implementation without having to deal with constant
disconnects/reconnects with a remote display device.