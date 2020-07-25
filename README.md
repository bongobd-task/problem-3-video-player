This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



![word flow](https://github.com/bongobd-task/problem-3-video-player/blob/master/src/assets/workflow.png)


# Pseudo Code
**Step -1:**

```
yarn create react-app problem-3-video-player
```

**Step -2:**

```
yarn start
```
**step -3:**
```
delete logo.svg, Ap.css and index.css
and also go to index.js and remove 

import "./index.css";


Go to App.js and delete this lines

import logo from './logo.svg';
import './App.css';




```
and also remove all code from App.js
and write Write this code 

```
import React from "react";

function App() {
  
  return (
   <div>Test</div>
  );
}

export default App;
```


**step-4:**
```
Create VideoPlayer component in  dir src/components/VideoPlayer.js
```
**Step 5:**

```
And write  VideoPlayer Component Code


import React, { useRef, useState, useEffect } from "react";
import propsTypes from "prop-types";
import payBtn from "../assets/play-button.png";
import pauseBtn from "../assets/pause-button.png";
import stopBtn from "../assets/stop-button.png";
import volumeBtn from "../assets/volume-button.png";
import muteBtn from "../assets/mute-button.png";
import backword from "../assets/backword-button.png";
import forword from "../assets/forword-button.png";
import "../assets/scss/base.scss";
import video from "../assets/corona-virus.mp4";
/** 
 * @function VideoPlayer
 * @props skipTime:number;
 * @props url:string
 * @props type:string
 * 
 * @default values
 * @props skipTime=0.5;
 * @props url=video[import Video from import video from "../assets/corona-virus.mp4";]
 * @props type= "video/mp4",
 * 
 * @react hooks 
 * useState,useEffect,useRef
 **/
const VideoPlayer = ({
  skipTime,
  url,
  type,
}) => {

  const ref = useRef(null);// video Reference

  const { current } = ref; // destructed current property from ref

  const [duration, setDuration] = useState(0); // useState use for setDuration time initial value is 0;

  const [progress, setProgress] = useState(0.0); //useState for setProgress initial value is 0.0

  const [volume, setVolume] = useState(0.7); // useState for setVolume initial value is 0.7

  const [volumeIcon, setVolumeIcon] = useState(volumeBtn); //useState for Change Volume Icon initial value is volumeBtn 

  const [currentTime, setCurrentTime] = useState(0); // useState for setCurrent Time initial value is 0

  // useEffect used for Change Volume and On change auto update volume state;
  useEffect(
    () => (volume <= 0 ? setVolumeIcon(muteBtn) : setVolumeIcon(volumeBtn)),
    [volume]
  );


  // useEffect used for duration bar on play video it's automatic update duration variable show duration time on hover duration bar
  useEffect(() => {
    const dt = setInterval(() => {
      setDuration(ref.current.duration);
      setProgress(ref.current.currentTime);
      setCurrentTime(
        `${parseInt(ref.current.currentTime / 60, 10)}:${(
          ref.current.currentTime % 60
        ).toFixed(0)}`
      );
    }, 1000);
    return () => clearInterval(dt);
  }, [current]);



  const handlePlay = () => ref.current.play();

  const handlePause = () => ref.current.pause();

  const handleForward = () => (ref.current.currentTime +=skipTime);

  const handleBackward = () => (ref.current.currentTime -=skipTime);

  const handleMute = () => {
    const mute = ref.current.muted
      ? (ref.current.muted = false)
      : (ref.current.muted = true);
    return mute ? setVolumeIcon(muteBtn) : setVolumeIcon(volumeBtn);
  };

  const handleVideoDuration = (e) => {
    setProgress(e.target.value);
    return (ref.current.currentTime = e.target.value);
  };
  const handleStop = () => {
    ref.current.pause();
    return (ref.current.currentTime = 0);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    ref.current.volume = volume;
  };

  return (
    <div id="wrapper">
      <div id="player_wrapper">
        <video id="video_player" ref={ref}>
          <source src={url} type={type} />
        </video>

        <input
          className="duration-bar"
          type="range"
          step={0.01}
          min="0"
          max={duration}
          value={progress}
          onChange={handleVideoDuration}
          title={currentTime}
        />

        <div id="player_controls">
          <input
            type="image"
            src={payBtn}
            onClick={handlePlay}
            id="play_button"
            alt="play"
            title="play"
          />
          <input
            type="image"
            src={pauseBtn}
            onClick={handlePause}
            id="pause_button"
            alt="pause"
            title="Pause"
          />
          <input
            type="image"
            src={stopBtn}
            onClick={handleStop}
            id="stop_button"
            alt="stop"
            title="Stop"
          />
          <input
            type="image"
            src={backword}
            onClick={handleBackward}
            id="backword"
            alt="backword"
            title="Rewind"
          />
          <input
            type="image"
            src={forword}
            onClick={handleForward}
            id="forword"
            alt="forword"
            title="Forward"
          />

          <input
            type="image"
            onClick={handleMute}
            src={volumeIcon}
            id="vol_img"
            alt="volume"
            title="Volume"
          />

          <input
            type="range"
            id="change_vol"
            onClick={handleVolumeChange}
            onChange={handleVolumeChange}
            step="0.05"
            min="0"
            max="1"
            value={volume}
            title={`${(volume / 1) * 100}%`}
          />

          <span>{`${parseInt(duration / 60, 10)}:${(duration % 60).toFixed(
            0
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

VideoPlayer.defaultProps = {
  skipTime:0.01,
  url:video,
  type: "video/mp4",
};

VideoPlayer.propTypes = {
  skipTime: propsTypes.number,
  url: propsTypes.string,
  type: propsTypes.string,
};

export default VideoPlayer;

```


**step-6:** 

Now Update the App.js Component with this code

```
import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import TopReactFrameWork from './assets/top-5-react-framework.mp4';
  /**
   * @component App
   * @typeof_component functional or stateless
   * @Number of Child 1
   * @child VideoPlyer
   * @return VideoPlayer
   **/
function App() {
  
  return (
    <VideoPlayer
      skipTime={0.3}
      url={TopReactFrameWork}
    />
  );
}

export default App; 
```


**Step-7:**

Write down scss styles for VideoPlayer component

```
@import "./range-slider";

body {
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    font-family: helvetica;
    background-color: #ffffff;
    font-size: 65.2%;
    #wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 5px 10px 18px #888888;
        overflow: hidden;
        border-radius: 10px;
        #player_wrapper {
            width: 70rem;
            height: 40rem;
            position: relative;
            #video_player {
                width: 100%;
            }
            .duration-bar {
                position: absolute;
                bottom: 6%;
                left: 50%;
                margin-left: -1px;
                transform: translate(-50%, -50%);
            }
            span{
                margin-right: 5px;
                margin-top: -5px;
                font-size: .7rem;
                color: #ffffff;
            }
            @include range-slider;

            #player_controls {
                bottom: 0;
                position: absolute;
                background-color: #000;
                width: 100%;
                padding: 0.5rem;
                box-sizing: border-box;
                display: flex;
                input[type="image"] {
                    height: 1.5rem;
                    margin-left: 0.2rem;
                    margin-right: 0.5rem;
                    margin-top: 0.2rem;
                }
                @include range_slider;
                #vol_img {
                    margin-top: 0.2rem;
                    height: 1.5rem;
                    margin-left: 55%;
                    width: 1.5rem;
                }
            }
        }
    }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 500px) and (-webkit-min-device-pixel-ratio: 2) {
    body {
        #wrapper {
            #player_wrapper {
                width: 100vw;
                .duration-bar {
                 bottom: 59%;
                }
                #player_controls {
                    bottom: 58%;
                    #vol_img {
                        display: inline;
                        margin-left: 0%;
                    }
                }
            }
        }
    }
}

@media only screen and (min-device-width: 500px) and (max-device-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
    body {
        #wrapper {
            #player_wrapper {
                width: 100vw;
                .duration-bar{
                    bottom: 59%;
                }
                #player_controls {
                    bottom: 58%;
                    #vol_img {
                        display: inline;
                        margin-left: 25%;
                    }
                }
            }
        }
    }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 900px) and (-webkit-min-device-pixel-ratio: 2) {
    body {
        #wrapper {
            #player_wrapper {
                width: 100vw;
                #player_controls {
                    #vol_img {
                        display: inline;
                        margin-left: 55%;
                    }
                }
            }
        }
    }
}
@media only screen and (min-device-width: 900px) and (max-device-width: 1200px) and (-webkit-min-device-pixel-ratio: 2) {
    body {
        #wrapper {
            #player_wrapper {
                width: 100vw;
                #player_controls {
                    #vol_img {
                        display: inline;
                        margin-left: 65%;
                    }
                }
            }
        }
    }
}
```


**Step 8:**

Make a mixin for VideoPlayer and import it base.scss

```
@mixin range_slider {
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: 1px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    margin-top: -5px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  input[type="range"]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 15px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }

  /* All the same stuff for IE */
  input[type="range"]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 15px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.5px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #e74c3c;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #e74c3c;
  }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.5px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #e74c3c;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    height: 8.5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: #e74c3c;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #e74c3c;
  }
  input[type="range"]::-ms-fill-upper {
    background: #e74c3c;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #e74c3c;
  }
}
```


**Step 9:**

```
save all or ctrl+s

Then

yarn start

if you want to build then run 

yarn build
```
### End



