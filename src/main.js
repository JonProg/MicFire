const image = document.getElementById('madara-img');
const gif = document.getElementById('madara-gif');
let isGifDisplayed = false; // Adiciona uma variável para controlar se o GIF está sendo exibido

// Obtendo o áudio do usuário
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        // Configurando a análise de áudio
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Função para processar os dados de áudio
        function processAudio() {
            analyser.getByteFrequencyData(dataArray);
            let maxFrequency = Math.max(...dataArray);
            console.log(maxFrequency);
            if (maxFrequency >= 200) {
                if (!isGifDisplayed) {
                    isGifDisplayed = true;
                    image.style.display = 'none';
                    gif.style.display = 'block';
                    gif.src = gif.src; // Reinicia a animação do GIF
                    setTimeout(function() {
                        gif.style.display = 'none';
                        image.style.display = 'block';
                        isGifDisplayed = false;
                        processAudio(); // Chama a função novamente após o tempo determinado
                    }, 3000);
                }
            }
            // Chamando a função novamente de forma assíncrona
            setTimeout(processAudio, 100);
        }

        processAudio();
    })
    .catch(function(err) {
        console.error('Erro ao acessar o microfone: ' + err);
    });
