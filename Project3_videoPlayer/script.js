const video = document.querySelector('#video'); // get the dom for the video tag
const play = document.querySelector('#play'); // get the dom for the play button
const stop = document.querySelector('#stop'); // get the dom for the stop button
const progress = document.querySelector('#progress'); // get the dom for the progress bar
const timestamp = document.querySelector('#timestamp'); // get the dom for the timestamp span

// Functions

// Play and pause video
function toggleVideoStatus() { //whenever this function is called, the running state of the video will toggle from play to pause and vica-versa
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// update play/pause icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class = "fa fa-play fa-2x"></i>'; // if the video is paused, update the play icon to display the play icon from the font awesome library
    } else {
        play.innerHTML = '<i class = "fa fa-pause fa-2x"></i>'; // if the video is playing, update the play icon to display the pause icon from the font awesome library
    }
}

//  update progress and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100; //since in the html we have set each increment to be 0.1, the current position of the progress bar is obtained by its currenttime/totalduratation*100

    // Get minutes
    let mins = Math.floor(video.currentTime / 60); // we extract the current minutes passed in the video
    if (mins < 10) {
        mins = '0' + String(mins); // if the value is less then 10 we add 0 in front to maintain 2 digit uniformity
    }

    // Get seconds
    let secs = Math.floor(video.currentTime %60); // we extract the current seconds passed in the video
    if (secs < 10) {
        secs = '0' + String(secs); // if the value is less then 10 we add 0 in front to maintain 2 digit uniformity
    }

    // Updating the timestamp
    timestamp.innerHTML = `${mins}:${secs}`; // every time the function is called, the timestap value gets updated
}

// Set video time to progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop the video
function stopVideo() {
    video.currentTime = 0; // since the api does not contain a video.stop() persay, we overcome the problem by reverting the time back to the start of the video and pausing it
    video.pause();
}

// Event listners
video.addEventListener('click', toggleVideoStatus); // if the video screen is clicked, the video status is toggled
video.addEventListener('pause', updatePlayIcon); // if the pause action is carried out, the icons are updated
video.addEventListener('play', updatePlayIcon); // if the play action is carried out, the icons are updated
video.addEventListener('timeupdate', updateProgress); // if the timeupdate action is carried out, the progress bar is updated

play.addEventListener('click', toggleVideoStatus); // if the play button is clicked, the video state is toggled and the icon changes

stop.addEventListener('click', stopVideo); // if the stop button is clicked , the video is stopped and reverted to its original state

progress.addEventListener('change', setVideoProgress); // scrubbing through the progress bar or just updating its position updates the video according to it