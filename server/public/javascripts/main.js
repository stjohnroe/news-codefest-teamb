var mediaConstraints = {
  audio: true,
  video: true
};

$(document).ready(function () {

  $('.js-start').on('click', function () {
    if (navigator.mozGetUserMedia) {
      navigator.mozGetUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
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
  multiStreamRecorder.mimeType = 'video/webm';
  multiStreamRecorder.videoWidth = 320;
  multiStreamRecorder.videoHeight = 240;
  multiStreamRecorder.ondataavailable = function (blob, anythingelse) {
      console.log(blob);
      //var blobURL = URL.createObjectURL(blob.video);
      //document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
      save('josh', blob.video);
      multiStreamRecorder.stop();
      $('video').hide();
  }
  multiStreamRecorder.start(10 * 1000);
}

function onMediaError(err) {
  console.log('Warning: ' + err);
}

function save(userName, blob) {
  var request = new XMLHttpRequest();
  request.open('PUT', window.sURL);
  request.setRequestHeader('Content-type','video/webm');
  request.setRequestHeader('Access-Control-Request-Method','PUT');
  request.send(blob);
}
