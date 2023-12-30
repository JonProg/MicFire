export function processAudio(stream){
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    // Configurando a análise de áudio
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    // Aplicando a transformada de Fourier nos dados de áudio
    const buffer = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(buffer);
    const ac = autoCorrelate(buffer, audioContext.sampleRate);

    // A frequência fundamental está em ac.freq
    console.log('Frequência fundamental: ' + ac.freq);
}

// Função para calcular a autocorrelação
function autoCorrelate(buf, sampleRate) {
    const SIZE = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    const MIN_SAMPLES = 0;
    const best_offset = -1;
    const best_correlation = 0;
    const foundGoodCorrelation = false;
    const correlations = new Array(MAX_SAMPLES);

    for (let i = 0; i < SIZE; i++) {
        let sum = 0;
        for (let j = 0; j < SIZE - i; j++) {
        sum += (buf[j] - 128) * (buf[j + i] - 128);
        }
        correlations[i] = sum;
    }

    let lastCorrelation = 1;
    for (let offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
        let correlation = 0;
        for (let i = 0; i < MAX_SAMPLES; i++) {
            correlation += Math.abs((correlations[i] - 128) * (correlations[i + offset] - 128));
            }
            correlation = 1 - correlation / MAX_SAMPLES;
        if ((correlation > 0.9) && (correlation > lastCorrelation)) {
            foundGoodCorrelation = true;
        if (correlation > best_correlation) {
            best_correlation = correlation;
            best_offset = offset;
        }
        } else if (foundGoodCorrelation) {
            const T = (best_offset + (correlation - lastCorrelation) / (correlation * (1 - lastCorrelation))) / sampleRate;
            return { freq: 1 / T, confidence: correlation };
        }
        lastCorrelation = correlation;
    }
    if (best_correlation > 0.01) {
        const T = best_offset / sampleRate;
        return { freq: 1 / T, confidence: best_correlation };
    }
    return { freq: -1, confidence: 0 };
}