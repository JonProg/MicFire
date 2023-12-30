/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// Obtendo o áudio do usuário
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
    // Copiando os dados de frequência para dataArray
    analyser.getByteFrequencyData(dataArray);

    // Encontrando a frequência dominante
    var maxFrequency = Math.max.apply(Math, _toConsumableArray(dataArray));

    // Exibindo a frequência dominante no console
    console.log('Frequência dominante:', maxFrequency);

    // Chamando a função novamente de forma assíncrona
    setTimeout(processAudio, 100);
  }

  // Chamando a função pela primeira vez
  processAudio();
})["catch"](function (err) {
  console.error('Erro ao acessar o microfone: ' + err);
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map