import React, { useRef, useState, useEffect } from "react";
import video from "./assets/corona-virus.mp4";
import payBtn from "./assets/play-button.png";
import pauseBtn from "./assets/pause-button.png";
import stopBtn from "./assets/stop-button.png";
import volumeBtn from "./assets/volume-button.png";
import muteBtn from "./assets/mute-button.png";
import backword from "./assets/backword-button.png";
import forword from "./assets/forword-button.png";
import "./assets/scss/base.scss";

function App() {
  const ref = useRef(null);
  const {current } = ref;
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0.0);
  const [volume, setVolume] = useState(0.7);
  const [volumeIcon, setVolumeIcon] = useState(volumeBtn);
  const [currentTime,setCurrentTime] = useState(0)

  const handlePlay = () => ref.current.play();
  const handlePause = () => ref.current.pause();
  const handleForward = () => (ref.current.currentTime += 0.5);
  const handleBackward = () => (ref.current.currentTime -= 0.5);
  const handleMute = () => {
    const mute = ref.current.muted ? ref.current.muted = false : ref.current.muted = true;
    return mute ? setVolumeIcon(muteBtn) : setVolumeIcon(volumeBtn)
  }

  const handleVideoDuration = (e) => {
    setProgress(e.target.value);
    return (ref.current.currentTime = e.target.value);
  };

  useEffect(
    () => (volume <= 0 ? setVolumeIcon(muteBtn) : setVolumeIcon(volumeBtn)),
    [volume]
  );

  useEffect(() => {
    const dt = setInterval(() => {
      setDuration(ref.current.duration);
      setProgress(ref.current.currentTime);
      setCurrentTime(`${parseInt(ref.current.currentTime / 60, 10)}:${(ref.current.currentTime % 60).toFixed(0)}`)
    }, 1000);
    return () => clearInterval(dt);
  }, [current]);

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
          <source src={video} type="video/mp4" />
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

         <span>{`${parseInt(duration / 60, 10)}:${(duration % 60).toFixed(0)}`}</span>

        </div>
      </div>
    </div>
  );
}

export default App;