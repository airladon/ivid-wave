# Introduction To Waves - An Interactive Video

This is an entry to the 3b1b SoME1 competition.

To view the video, go [here](https://airladon.github.io/ivid-wave/).

# What is an Interactive Video?

An interactive video is a video like experience where users can interact with elements in the video.

In this video, users can change diagrams to explore concepts, touch on equations and descriptions to step through their meaning and unlock extra information not in the main storyline.

# How to make Interactive Content

[FigureOne](https://github.com/airladon/FigureOne/) is a JavaScript library that allows creation of interactive web content. It is primarily a library for making animated and interactive figures and equations, but it also supports creating interactive slide shows and interactive videos like this one.

The repository has tutorials, examples and an API reference that can get you started.

An interactive video is essentially an interactive figure with aligned state transitions and audio. Therefore, it is probably best to start with simple interactive figures and build up to videos.

# Repository Organization

The interactive video is hosted using this GitHub pages. The repository can be split into files used for the webpage, and support files used to create it.

## Web page related files
* `index.html` - entry point for GitHub pages site.
* `assets/` - contains a local version of FigureOne, images, fonts and styles used by the website
* `src/` - contains all JavaScript code, video track and audio track for the interactive video

## Support files
Docker is used to create a development evironment to locally host the site, and lint and test the code.

* `./start_env.sh` - start the docker environment (bash script for mac/linux)
* `test/` - contains tests for the video
* `containers/` - various files for docker containers

## Deployment

The javascript files for creating the interactive video have not been bundled or minimized. For real deployments, this should be done (with something like WebPack) to reduce page load times.

# Interactive Video Trade-offs

Advantages:
* It's interactive video
* Small file sizes - compressed video files are usually 10-100 times smaller than a 64kbps mp3 audio file
* Resolution independent

Disadvantages:
* Performance on lower end systems demand real time animations and interactions not be too computationally complex
* No native full screen mode
* All programatic - can be more difficult to create than normal video


# More Examples of Interactive Videos
* [Trig Functions](https://airladon.github.io/FigureOne/examples/Interactive%20Video%20-%20Trig%201%20-%20Trig%20Functions/index.html)
* [Trig Names](https://airladon.github.io/FigureOne/examples/Interactive%20Video%20-%20Trig%202%20-%20Names/index.html) - not interactive, but demonstrates how you can make a video with very small bandwidth requirements
* [Trig Relationships](https://airladon.github.io/FigureOne/examples/Interactive%20Video%20-%20Trig%203%20-%20Relationships/index.html)
