export default class SpeechModule {
  constructor() {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
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

  onResult(event) {
    const resultsArr = [];
    Array.from(event.results[event.results.length - 1]).forEach((result) => {
      const words = result.transcript.split(' ');
      words.forEach((word) => {
        if (!resultsArr.includes(word)) {
          resultsArr.push(word);
        }
      })
    });

    try {
      this.onGetResult(resultsArr);
    } catch (e) {
      console.log(e)
      this.recognition.stop();
    }
  }

  startAndDo(onGetResult, onEndEvent) {
    this.onGetResult = onGetResult;
    this.recognition.start();
    this.recognition.addEventListener('result', this.onResultFunc);
    this.isStart = true;
  }

  stop() {
    this.isStart = false;
    this.recognition.removeEventListener('result', this.onResultFunc);
    this.recognition.stop();
  }
}