function createDockableUI(thisObj) {
  var dialog =
      thisObj instanceof Panel
          ? thisObj
          : new Window("window", undefined, undefined, { resizeable: true });

  dialog.onResizing = dialog.onResize = function() {
      // Resize the layout whenever the dialog is resized
      this.layout.resize();
  };

  return dialog;
}

function showWindow(myWindow) {
  // If the input object is a Window, center and show it
  if (myWindow instanceof Window) {
      myWindow.center();
      myWindow.show();
  }

  // If the input object is a Panel, refresh the layout and resize it
  if (myWindow instanceof Panel) {
      myWindow.layout.layout(true);
      myWindow.layout.resize();
  }
}


function listThirdParty() {
  var effectNames = [];
  var proj = app.project;
  var excludedEffects = ["3D Channel Extract", "Cryptomatte", "Depth Matte", "Depth of Field", "Extractor", "Fog 3D", "ID Matte", "IDentifier", "Backwards", "Bass & Treble", "Delay", "Flange & Chorus", "High-Low Pass", "Modulator", "Parametric EQ", "Reverb", "Stereo Mixer", "Tone", "Bilateral Blur", "Camera Lens Blur", "Camera-Shake", "Deblur", "CC Cross Blur", "CC Radial Blur", "CC Radial Fast Blur", "CC Vector Blur", "Channel Blur", "Compound Blur", "Directional Blur", "Fast Box Blur", "Gaussian Blur", "Radial Blur", "Sharpen", "Smart Blur", "Unsharp Mask", "Mocha AE", "Arithmetic", "Blend", "Calculations", "CC Composite", "Channel Combiner", "Compound Arithmetic", "Invert", "Minimax", "Remove Color Matting", "Set Channels", "Set Matte", "Shift Channels", "Solid Composite", "CINEWARE", "Auto Color", "Auto Contrast", "Auto Levels", "Black & White", "Brightness & Contrast", "Broadcast Colors", "CC Color Neutralizer", "CC Color Offset", "CC Kernel", "CC Toner", "Change Color", "Change to Color", "Channel Mixer", "Color Balance", "Color Balance (HLS)", "Color Link", "Color Stabilizer", "Colorama", "Curves", "Equalize", "Exposure", "Gamma/Pedestal/Gain", "Hue/Saturation", "Leave Color", "Levels", "Levels (Individual Controls)", "Lumetri Color", "Photo Filter", "PS Arbitrary Map Selective Color", "Shadow/Highlight", "Tint", "Tritone", "Vibrance", "Video Limiter", "Bezier Warp Bulge", "CC Bend It", "CC Bender", "CC Blobbylize", "CC Flo Motion", "CC Griddler", "CC Lens", "CC Page Turn", "CC Power Pin", "CC Ripple Pulse", "CC Slant", "CC Smear", "CC Split", "CC Split 2", "CC Tiler", "Corner Pin", "Detail-preserving Upscale", "Displacement Map", "Liquify", "Magnify", "Mesh Warp", "Mirror", "Offset", "Optics Compensation", "Polar Coordinates", "Reshape", "Ripple", "Rolling Shutter Repair", "Smear", "Spherize", "Transform", "Turbulent Displace", "Twirl", "Warp", "Warp Stabilizer", "Wave Warp", "3D Point Control", "Angle Control", "Checkbox Control", "Color Control", "Dropdown Menu Control", "Layer Control", "Point Control", "Slider Control", "4-Color Gradient", "Advanced Lightning", "Audio Spectrum", "Audio Waveform", "Beam", "CC Glue Gun", "CC Light Burst 2.5", "CC Light Rays", "CC Light Sweep", "CC Threads", "Cell Pattern", "Checkerboard", "Circle", "Ellipse", "Eyedropper Fill", "Fill", "Fractal", "Gradient Ramp", "Grid", "Lens Flare", "Paint Bucket", "Radio Waves", "Scribble", "Stroke", "Vegas", "Write-on", "VR Blur", "VR Chromatic Aberrations", "VR Color Gradients", "VR Converter", "VR De-Noise", "VR Digital Glitch", "VR Fractal Noise", "VR Glow", "VR Plane to Sphere", "VR Rotate Sphere", "VR Sharpen", "VR Sphere to Plane", "Advanced Spill Suppressor", "CC Simple Wire Removal", "Color Difference Key", "Color Range", "Difference Matte", "Extract", "Inner/Outer Key", "Key Cleaner", "Keylight (1.2)", "Linear Color Key", "Matte Choker", "Mocha shape", "Refine Hard Matte", "Refine Soft Matte", "Simple Choker", "Add Grain", "Dust & Scratches", "Fractal Noise", "Match Grain", "Median", "Median (Legacy)", "Noise", "Noise Alpha", "Noise HLS", "Noise HLS Auto", "Remove Grain", "Turbulent Noise", "Basic 3D", "Basic Text", "Color Key", "Gaussian Blur (Legacy)", "Lightning", "Luma Key", "Path Text", "Reduce Interlace Flicker", "Spill Suppressor", "3D Camera Tracker", "3D Glasses", "Bevel Alpha", "Bevel Edges", "CC Cylinder", "CC Environment", "CC Sphere", "CC Spotlight", "Drop Shadow", "Radial Shadow", "Card Dance", "Caustics", "CC Ball Action", "CC Bubbles", "CC Drizzle", "CC Hair", "CC Mr. Mercury", "CC Particle Systems II", "CC Particle World", "CC Pixel Polly", "CC Rainfall", "CC Scatterize", "CC Snowfall", "CC Star Burst", "Foam", "Particle Playground", "Shatter", "Wave World", "Brush Strokes", "Cartoon", "CC Block Load", "CC Burn Flim", "CC Glass", "CC HexTile", "CC Kaleida", "CC Mr. Smoothie", "CC Plastic", "CC RepeTile", "CC Threshold", "CC Threshold RGB", "CC Vignette", "Color Emboss", "Emboss", "Find Edges", "Glow", "Mosaic", "Motion Tile", "Posterize", "Roughen Edges", "Scatter", "Strobe Light", "Texturize", "Threshold", "Numbers", "Timecode", "CC Force Motion Blur", "CC Wide Time", "Echo", "Pixel Motion Blur", "Posterize Time", "Time Difference", "Time Displacement", "Timewarp", "Block Dissolve", "Card Wipe", "CC Glass Wipe", "CC Grid Wipe", "CC Image Wipe", "CC Jaws", "CC Light Wipe", "CC Line Sweep", "CC Radial ScaleWipe", "CC Scale Wipe", "CC Twister", "CC WarpoMatic", "Gradient Wipe", "Iris Wipe", "Linear Wipe", "Radial Wipe", "Venetian Blinds"];

  // Loop through all the items in the project
  for (var i = 1; i <= proj.numItems; i++) {
    var item = proj.item(i);

    // Check if the item is a footage item or composition
    if (item instanceof FootageItem || item instanceof CompItem) {

      // Loop through all the layers in the item
      for (var j = 1; j <= item.layers.length; j++) {
        var layer = item.layers[j];

        // Loop through all the effects applied to the layer
        for (var k = 1; k <= layer.effect.numProperties; k++) {
          var effect = layer.effect(k);

          // Check if the effect is not in the excludedEffects array and not already in the effectNames array
          var excluded = false;
          for (var l = 0; l < excludedEffects.length; l++) {
            if (effect.name === excludedEffects[l]) {
              excluded = true;
              break;
            }
          }
          var found = false;
          for (var m = 0; m < effectNames.length; m++) {
            if (effectNames[m] === effect.name) {
              found = true;
              break;
            }
          }
          if (!excluded && !found) {
            effectNames.push(effect.name);
          }
        }
      }
    }
  }

  if (effectNames.length > 0) {
    output.text = ("The following 3rd-party effects are being used in the project:\n\n" + effectNames.join("\n"));
  } else {
    alert("No 3rd-party effects are being used in the project.");
  }
}

function listAll() {
  var effectNames = [];
  var proj = app.project;

  // Loop through all the items in the project
  for (var i = 1; i <= proj.numItems; i++) {
    var item = proj.item(i);

    // Check if the item is a footage item or composition
    if (item instanceof FootageItem || item instanceof CompItem) {

      // Loop through all the layers in the item
      for (var j = 1; j <= item.layers.length; j++) {
        var layer = item.layers[j];

        // Loop through all the effects applied to the layer
        for (var k = 1; k <= layer.effect.numProperties; k++) {
          var effect = layer.effect(k);

          // Check if the effect is not already in the effectNames array
          var found = false;
          for (var m = 0; m < effectNames.length; m++) {
            if (effectNames[m] === effect.name) {
              found = true;
              break;
            }
          }
          if (!found) {
            effectNames.push(effect.name);
          }
        }
      }
    }
  }

  if (effectNames.length > 0) {
    output.text = ("The following effects are being used in the project:\n\n" + effectNames.join("\n"));
  } else {
    alert("No effects are being used in the project.");
  }
}

// Create a dockable UI panel
var win = createDockableUI(this);
    win.text = "Display active plugins"; 
    win.preferredSize.width = 200; 
    win.preferredSize.height = 60; 
    win.orientation = "column"; 
    win.alignChildren = ["center","top"]; 
    win.spacing = 10; 
    win.margins = 16;

// Add a button that lists all 3rd-Party plugins in use
var button1 = win.add("button", undefined, undefined, {name: "button1"}); 
    button1.helpTip = "Lists all 3rd-Party plugins in use"; 
    button1.text = "List All 3rd-Party Plugins"; 
    button1.alignment = ["left","top"];
    button1.onClick = listThirdParty; // Assign the event handler

// Add a button that lists all plugins in use
var button2 = win.add("button", undefined, undefined, {name: "button2"}); 
    button2.helpTip = "Lists all plugins in use, including built in plugins"; 
    button2.text = "List All Plugins"; 
    button2.alignment = ["left","top"];
    button2.onClick = listAll; // Assign the event handler

var divider1 = win.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

var output = win.add('edittext {properties: {name: "output", readonly: true, multiline: true, scrollable: true}}'); 
    output.text = "List will output here."; 
    output.preferredSize.width = 200; 
    output.preferredSize.height = 200; 
    output.alignment = ["left","top"]; 
    
showWindow(win);