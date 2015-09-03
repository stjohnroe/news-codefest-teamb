var mediaConstraints = {
  audio: true,
  video: true
};

$(document).ready(function () {

  $('.js-start').on('click', function () {
    if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
      setInterval(function () {
        multiStreamRecorder.stop();
      }, 3 * 1000);
    } else {
        alert('Warning: Your Browser Doesnt support video replies')
    }
  });

  $('.js-stop').on('click', function () {
    $('video').hide();
    multiStreamRecorder.stop();
  });

});

function onMediaSuccess(stream) {
  var video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);

  var multiStreamRecorder = new MultiStreamRecorder(stream);
  multiStreamRecorder.video = document.querySelector('video');
  multiStreamRecorder.ondataavailable = function (blobs) {

  }
  multiStreamRecorder.start(300 * 1000);
}

function onMediaError(err) {
  console.log('Warning: ' + err);
}
