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