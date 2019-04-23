import React, { Component } from 'react';
// import callbellsVideo from '../video/callbellsVideo.mp4';

class VideoHome extends Component {
  render() {
    return (
      <>
        <div id="video" className="videoTag">
          <iframe
            frameBorder="0"
            allowFullScreen={''}
            scrolling="no"
            overlay="true"
            src="https://onelineplayer.com/player.html?autoplay=true&loop=true&autopause=false&muted=true&url=https%3A%2F%2Fwww.dropbox.com%2Fs%2F89bvemltdqvpgth%2FcallbellsVideo.mp4%3Fraw%3D1&poster=https%3A%2F%2Fwww.dropbox.com%2Fs%2Fa0n86gdel83942z%2Fposter.png%3Fraw%3D1&time=false&progressBar=false&playButton=false&overlay=false&muteButton=false&fullscreenButton=false&style=light&logo=false&quality=1080p"
            style={{ position: 'absolute', height: '100%', width: '100%', left: '0px', top: '0px' }}
            title="onelineplayer"
          />
        </div>
        {/* <video id="video" className="videoTag" autoPlay loop muted>
          <source src={callbellsVideo} type="video/mp4" />
        </video> */}
      </>
    );
  }
}

export default VideoHome;
