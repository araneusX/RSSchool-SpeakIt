import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import StartScreen from '../StartScreen';
import style from './style.css';

/* props = {
    mode: 'train'/'play',
    menu: 'close'/'open,
    current: 'main',
    onMenuClick,
    onModeClick
  }
*/
class Page extends CustomComponent {
  render() {
    return (
      DIV({ className: style.page }, [
        new StartScreen()

      ])
    );
  }
}

export default Page;
