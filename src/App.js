import { BODY } from './my_modules/htmlComponents';
import Page from './components/Page';

const startState = {
  level: 0,
  page: 0,
  screen: 'start',
};


const startApp = (state) => {
  const appState = state;
  let App;

  const refreshApp = () => {
    App.refresh({...appState});
  };

  const onLevelChange = (level) => {
    appState.level = level;
    appState.page = 0;
    refreshApp();
  };

  const onPageChange = (page) => {
    appState.page = page;
    refreshApp();
  };

  const onStartClick = () => {
    appState.screen = 'main';
    refreshApp();
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