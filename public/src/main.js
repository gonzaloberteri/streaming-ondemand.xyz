const videos = document.getElementsByClassName('video');

window.onload = function () {
    for (let video of videos) {
        video.addEventListener('mouseover', function () {
            this.play();
        });

        video.addEventListener('mouseout', function () {
            this.pause();
            this.currentTime = 0;
        });

        video.addEventListener('touchstart', function () {
            this.play();
        });

        video.addEventListener('touchend', function () {
            this.pause();
        });
    }

    //console.log(videos);
};
