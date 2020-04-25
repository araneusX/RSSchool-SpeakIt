import { BODY } from './my_modules/htmlComponents';
import Page from './components/Page';
//import getStartState from './data';

import { getList, getTranslate } from './data/getData'



BODY({style: 'min-height: 100vh'}, [
  new Page(),
]);

/*  startState = {
      mode: 'train',
      menu: 'close',
      current: 'main',
      categories = {
        main: [<categories>],
        <name>: {<category>},
      },
      data: [],
    };
*/

// const startApp = (state) => {
//   const appState = state;
//   let App;

//   const refreshApp = () => {
//     App.refresh(appState);
//   };

//   const onMenuClick = () => {
//     appState.menu = appState.menu === 'open' ? 'close' : 'open';
//     refreshApp();
//   };

//   const closeMenu = () => {
//     appState.menu = 'close';
//     refreshApp();
//   };

//   const onModeClick = () => {
//     appState.mode = appState.mode === 'train' ? 'play' : 'train';
//     refreshApp();
//   };

//   const onCategoryChange = (category) => {
//     appState.current = category;
//     appState.menu = 'close';
//     refreshApp();
//   };

//   appState.onMenuClick = onMenuClick;
//   appState.onModeClick = onModeClick;
//   appState.onCategoryChange = onCategoryChange;
//   appState.closeMenu = closeMenu;

//   App = new Page(appState);

//   BODY({}, [
//     App,
//   ]);
// };

// getStartState().then((startState) => {
//   startApp(startState);
// });
