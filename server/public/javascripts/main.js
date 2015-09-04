var mediaConstraints = {
  audio: true,
  video: true
};

$(document).ready(function () {

  $('.js-start').on('click', function () {
    if (navigator.webkitGetUserMedia) {
      navigator.webkitGetUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
      setInterval(function () {
        $('video').hide();
      }, 12 * 1000);
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
  multiStreamRecorder.mimeType = 'video/mp4';
  multiStreamRecorder.videoWidth = 320;
  multiStreamRecorder.videoHeight = 240;
  multiStreamRecorder.ondataavailable = function (blob) {
    save('josh', blob);
  }
  multiStreamRecorder.start(10 * 1000);
}

function onMediaError(err) {
  console.log('Warning: ' + err);
}

function save(userName, blob) {
  var fileType = 'video';
  var fileName = userName + '.mp4';

  var formData = new FormData();
  formData.append(fileType + '-filename', fileName);
  formData.append(fileType + '-blob', blob);

  var request = new XMLHttpRequest();
  request.open('PUT', window.sURL);
  request.setRequestHeader('Content-type','video/mp4');
  request.setRequestHeader('Access-Control-Request-Method','PUT');
  request.send(formData);
}
