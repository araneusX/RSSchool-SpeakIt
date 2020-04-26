import { getList } from '../../data';

import { DIV, CustomComponent } from '../../my_modules/htmlComponents';
import StartScreen from '../StartScreen';
import MainScreen from '../MainScreen';

import style from './style.css';

/* props = {
      screen: ,
      page: ,
      level: ,
      onPageChange: ,
      onLevelChange:,
  }
*/
class Page extends CustomComponent {
  constructor(props) {
    super(props);
  }

  refresh(newProps) {
    this.props = newProps;
    getList(this.props.level, this.props.page)
      .then((list) => {
        this.list = list;
        this.rerender();
      });
  }

  render() {
    return (
      DIV({ className: style.page }, [
        this.props.screen === 'start'
          ? new StartScreen({onStartClick: this.props.onStartClick})
          : new MainScreen({
            level: this.props.level,
            page: this.props.page,
            list: this.list || [],
            onLevelChange: this.props.onLevelChange,
            onPageChange: this.props.onPageChange,
            recognition: this.props.recognition,
          })
      ])
    );
  }
}

export default Page;
