const video = document.getElementById('video');

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.log("Erro ao acessar a webcam:", error);
    });
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function captureFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const pixel = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;

    if (pixel[0] > 60 && pixel[0] < 200 && pixel[1] > 40 && pixel[1] < 170 && pixel[2] > 20 && pixel[2] < 150) {
        console.log('Movimento detectado!');
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2, canvas.height / 2, 5, 5); 
}

setInterval(captureFrame, 100);
