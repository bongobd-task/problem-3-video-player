import React from 'react';
import { render } from '@testing-library/react';
// import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './VideoPlayer';

Enzyme.configure({ adapter: new Adapter() });


describe("Test VideoPlayer",()=>{
  test('Find initial time', () => {
    const wrapper = shallow(<VideoPlayer/>)
     expect(wrapper.find("span").text()).toContain('0:0')
  });

  test('Check Video Tag', () => {
    const wrapper = shallow(<VideoPlayer/>)
    console.log(wrapper.find('video').html())
    expect(wrapper.find('video').html()).toBe(`<video id="video_player"><source src="corona-virus.mp4" type="video/mp4"/></video>`);
  });

  test('Check Player Control', () => {
    const wrapper = shallow(<VideoPlayer/>)
    console.log(wrapper.find('#player_controls').html())
    expect(wrapper.find('#player_controls').html()).toBe(`<div id="player_controls"><input type="image" src="play-button.png" id="play_button" alt="play" title="play"/><input type="image" src="pause-button.png" id="pause_button" alt="pause" title="Pause"/><input type="image" src="stop-button.png" id="stop_button" alt="stop" title="Stop"/><input type="image" src="backword-button.png" id="backword" alt="backword" title="Rewind"/><input type="image" src="forword-button.png" id="forword" alt="forword" title="Forward"/><input type="image" src="volume-button.png" id="vol_img" alt="volume" title="Volume"/><input type="range" id="change_vol" step="0.05" min="0" max="1" value="0.7" title="70%"/><span>0:0</span></div>`);
  });

})
