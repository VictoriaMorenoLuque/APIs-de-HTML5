//Ver si nuestro navegador es compatible
if (window.File && window.FileReader && window.FileList) {
    console.log('Todas las APIs soportadas');
    //Manejar el archivo de video local
    function handleFileSelect(e) {
        let file = e.target.files[0];

        let reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                let videoDiv = document.getElementsByClassName('video-container');

                if(videoDiv[0] != null) {
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }
                    
                let div = document.createElement('div'); //Lugar para colocar el video
                div.id = "video-div";
                div.className = "video-container";
                div.innerHTML = '<video controls id="video" src="' + e.target.result + '" title="'+ escape(theFile.name) + '"/>';

                document.getElementById('video-output').insertBefore(div, null);

                let loadingMessage = document.createElement('p');//Lugar para colocar los botones
                loadingMessage.id = "loading";
                loadingMessage.className = "loading-message";

                document.getElementById('video-output').insertBefore(loadingMessage, null);

                //Dar funcionalidades a los botones mediante DOM y los métodos de <video>
                let playButton = document.getElementById('play');
                playButton.addEventListener('click', () => {
                    document.getElementById('video').play();
                });

                let pauseButton = document.getElementById('pause');
                pauseButton.addEventListener('click', () => {
                    document.getElementById('video').pause();
                })

                let volumeUp = document.getElementById('up');
                volumeUp.addEventListener('click', () => {
                    document.getElementById('video').volume += 0.1;
                })

                let volumeDown = document.getElementById('down');
                volumeDown.addEventListener('click', () => {
                    document.getElementById('video').volume -= 0.1;
                })

                document.getElementById('video').addEventListener('canplay', () => {
                    let loadingMessage = document.getElementById('loading');

                    document.getElementById('video-output').removeChild(loadingMessage);

                    document.getElementById('video').style.visibility = "visible";

                    playButton.style.visibility = "visible";
                    pauseButton.style.visibility = "visible";
                    volumeUp.style.visibility = "visible";
                    volumeDown.style.visibility = "visible"; 
                });
            }
        }) (file);
        reader.readAsDataURL(file);
    } 
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
    alert('La API de FILE no es soportada en este navegador.');
}



