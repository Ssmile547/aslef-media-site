
function showAndPlay() {
  const overlay = document.getElementById("video-overlay");
  const video = document.getElementById("myVideo");
  overlay.style.display = "flex";
  video.play();
}

function closeVideo() {
  const overlay = document.getElementById("video-overlay");
  const video = document.getElementById("myVideo");
  video.pause();
  video.currentTime = 0;
  overlay.style.display = "none";
}

function togglePlayPause() {
  const video = document.getElementById("myVideo");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}