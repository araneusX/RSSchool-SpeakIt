import { DIV, P, CustomComponent } from '../../my_modules/htmlComponents';
import stylizeButton from '../stylizeElements/stylizeButton';
import Navigation from './Navigation';
import Frame from './Frame';
import Words from './Words';
import style from './style.css';

/* props = {
    level:,
    page:,
    list:,
    onLevelChange:,
    onPageChange:,
  }
*/
class MainScreen extends CustomComponent {
  constructor(props) {
    super(props);
    this.current = this.props.list[0];
    this.pronounced = [];
    this.mode = 'train';

    this.node.addEventListener('click', (event) => {
      if (event.target.dataset.level && event.target.dataset.level !== this.props.level) {
        this.props.onLevelChange(event.target.dataset.level);
      } else if (event.target.dataset.page && event.target.dataset.page !== this.props.page) {
        console.log(event.target.dataset.page);
        
        this.props.onPageChange(event.target.dataset.page);
      }
    })
  }

  render() {
    return (
      DIV({ className: `valign-wrapper ${style.wrapper}` }, [
        DIV({ className: `container z-depth-1 ${style.container}`}, [
          new Navigation({
            page: this.props.page,
            level: this.props.level,
          }),
          new Frame({
            current: this.current || this.props.list[0],
            mode: this.mode || 'train',
          }),
          DIV({className: style.btnWrapper}, [
            stylizeButton({className: style.button, 'data-action': 'restart'}, [
              'restart',
            ]),
            stylizeButton({className: style.button, 'data-action': 'rec'}, [
              'hold the button pressed and speak the word',
            ]),
            stylizeButton({className: style.button, 'data-action': 'statistics'}, [
              'statistics',
            ]),
          ]),
          new Words({
            list: this.props.list,
            mode: this.mode || 'train',
            pronounced: this.props.pronounced || [],
          }),
        ])
      ])
    );
  }
}

export default MainScreen;
