export default class SpeechModule {
  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry you require a browser that supports speech recognition');
      this.startAndDo = () => {};
      this.stop = () => {};
    } else {
      const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 10;

      this.onGetResult = null;
      this.onResultFunc = this.onResult.bind(this);

      this.isStart = false;

      this.recognition.addEventListener('end', () => {
        if (this.isStart) {
          this.recognition.start();
        }
      });
    }
  }

  onResult(event) {
    const resultsArr = [];
    Array.from(event.results[event.results.length - 1]).forEach((result) => {
      const words = result.transcript.split(' ');
      words.forEach((word) => {
        if (!resultsArr.includes(word.toLowerCase())
            && word.length > 0
            && Number.isNaN(Number.parseInt(word, 10))
        ) {
          resultsArr.push(word.toLowerCase());
        }
      });
    });

    try {
      this.onGetResult(resultsArr);
    } catch (e) {
      console.log(e);
      this.recognition.stop();
    }
  }

  startAndDo(onGetResult) {
    this.onGetResult = onGetResult;
    this.recognition.start();
    this.recognition.addEventListener('result', this.onResultFunc);
    this.isStart = true;
  }

  stop() {
    if (this.isStart) {
      this.isStart = false;
      this.recognition.removeEventListener('result', this.onResultFunc);
      this.recognition.stop();
    }
  }
}
