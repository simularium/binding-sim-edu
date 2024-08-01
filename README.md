# Project name

Simularium binding affinity education module 

---

## Description

This app uses the Simularium Viewer to create live binding simulations that users can then collect data on and determine the binding affinity.


## Quick Start
### Do once
1. [Install bun](https://bun.sh/docs/installation)
2. `bun install` to install dependencies 
3. locally link the simularium viewer (see [CONTRIBUTING.md](CONTRIBUTING.md) for more info on why)
   1. clone the [viewer repo](https://github.com/simularium/simularium-viewer) 
   2. cd into the viewer repo 
   3. type `cat package.json`
   4. then `bun link`
   5. cd back to this repo
   6. type `bun link @aics/simularium-viewer`
   
### Do every time
4. type `bun dev` <= starts the server
5. Open at http://localhost:5173/

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for information related to developing the code.
