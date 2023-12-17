/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
navigator.mediaDevices.getUserMedia({
  audio: true
}).then(function (stream) {
  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  var microphone = audioContext.createMediaStreamSource(stream);
  microphone.connect(analyser);

  // Configurando a análise de áudio
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  // Função para processar os dados de áudio
  function processAudio() {
    analyser.getByteTimeDomainData(dataArray);

    // Aqui você pode processar os dados para obter a frequência fundamental
    // Por exemplo, você pode usar algoritmos de detecção de picos ou transformada de Fourier para calcular a frequência fundamental.

    // Depois de obter a frequência fundamental, você pode usá-la para determinar a altura da voz.
  }

  // Chamando a função de processamento de áudio periodicamente
  setInterval(processAudio, 100);
})["catch"](function (err) {
  console.error('Erro ao acessar o microfone: ' + err);
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map