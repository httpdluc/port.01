export const initImageSlider = () => {
  const track = document.getElementById("image-track");
  const MAX_DELTA = window.innerWidth / 2;
  let mouseDownAt = 0;
  let prevPercentage = 0;

  const handleOnDown = e => mouseDownAt = e.clientX;

  const handleOnUp = () => {
    mouseDownAt = 0;
    prevPercentage = track.dataset.percentage || 0;
  }

  const handleOnMove = e => {
    if (mouseDownAt === 0) return;
    if (!e.target.matches('.image')) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const percentage = (mouseDelta / MAX_DELTA) * -100;
    const nextPercentageUnconstrained = parseFloat(prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    setTimeout(() => {
      track.animate(
        { transform: `translate(${nextPercentage}%, -5%)` },
        { duration: 800, fill: "forwards", easing: "ease-out" }
      );

      const images = track.getElementsByClassName("image");
      for (const image of images) {
        image.animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: 800, fill: "forwards", easing: "ease-out" }
        );
      }
    }, 0);
  }

  /* -- Had to add extra lines for touch events -- */

  window.addEventListener("mousedown", handleOnDown);

  window.addEventListener("touchstart", e => handleOnDown(e.touches[0]));

  window.addEventListener("mouseup", handleOnUp);

  window.addEventListener("touchend", e => handleOnUp(e.touches[0]));

  window.addEventListener("mousemove", handleOnMove);

  window.addEventListener("touchmove", e => handleOnMove(e.touches[0]));
}