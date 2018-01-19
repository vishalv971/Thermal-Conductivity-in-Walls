<p align="center"><img width="40%" src="https://www.denso.com/global/en/og_image1.png" /></p>

--------------------------------------------------------------------------------

### Introduction
This repo contains the codebase of the project done at Deno-Shaping the Future Hackathon.

--------------------------------------------------------------------------------

### Pre-requisites to run demo

- node.js
- npm
- express
- ejs
- Socket.io
- Arduino IDE
- Max6675 Library (https://github.com/adafruit/MAX6675-library)

--------------------------------------------------------------------------------

### Steps to run:

   - Clone the GitHub repository "https://github.com/patrasap0908/Denso".
   - Extract the given files.
   - Compile and Upload the .ino file to the Arduino Uno
   - Run "sudo npm install" to install all the node packages required.
   - Run "node index.js" and navigate to http://localhost:3000/
   - Select the type of material and specify the thickness of the material.
   - Place the sensor at the suitable position, and click on the "Click for Temperature" button, repeat the step again for another position.
   - Click on Submit.
   - The next page will brief you about, the current state of insulation of your wall, along with its R-value specified, and some tips to avoid future shortcomings.
   
--------------------------------------------------------------------------------

### Screenshots
<p align="center"><img width="80%" src="/Screenshots/Capture1.PNG" /></p><br>
<p align="center"><img width="80%" src="/Screenshots/Capture2.PNG" /></p>
