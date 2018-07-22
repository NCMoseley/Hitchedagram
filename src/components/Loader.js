import React from 'react';

export default class App extends React.Component {
  componentDidMount() {
    let cLeft = document.getElementById('cLeft'),
      cCenter = document.getElementById('cCenter'),
      cRight = document.getElementById('cRight');
    let currentAnimationTime = 0;
    const centreY = 75;
    const amplitude = 20;
    animate();
    function animate() {
      cLeft.setAttribute(
        'cy',
        centreY + amplitude * Math.sin(currentAnimationTime)
      );
      cCenter.setAttribute(
        'cy',
        centreY + amplitude * Math.sin(currentAnimationTime - 1)
      );
      cRight.setAttribute(
        'cy',
        centreY + amplitude * Math.sin(currentAnimationTime - 2)
      );
      currentAnimationTime += 0.15;
      requestAnimationFrame(animate);
    }
  }
  render() {
    return (
      <svg width="300" height="150">
        <circle id="cLeft" cx="120" cy="75" r="10" />
        <circle id="cCenter" cx="150" cy="75" r="10" />
        <circle id="cRight" cx="180" cy="75" r="10" />
      </svg>
    );
  }
}
