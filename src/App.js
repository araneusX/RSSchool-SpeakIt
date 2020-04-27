import SpeechModule from './SpeechModule';

import { BODY } from './my_modules/htmlComponents';
import Page from './components/Page';

const startState = {
  level: 0,
  page: 0,
  screen: 'start',
  recognition: new SpeechModule,
};


const startApp = (state) => {
  const appState = state;
  let App;

  const refreshApp = () => {
    App.refresh({ ...appState });
  };

  const onLevelChange = (level) => {
    appState.level = level;
    appState.page = 0;
    appState.recognition.stop();
    refreshApp();
  };

  const onPageChange = (page) => {
    appState.page = page;
    appState.recognition.stop();
    refreshApp();
  };

  const onStartClick = () => {
    appState.screen = 'main';
    refreshApp();
    const audio = new Audio('https://wooordhunt.ru/data/sound/word/us/mp3/hello.mp3');
    audio.play();
  }

  appState.onLevelChange = onLevelChange;
  appState.onPageChange = onPageChange;
  appState.onStartClick = onStartClick;

  App = new Page({...appState});

  BODY({}, [
    App,
  ]);
};

startApp(startState);