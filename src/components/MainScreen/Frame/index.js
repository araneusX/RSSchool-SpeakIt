import { DIV, IMG, CustomComponent } from '../../../my_modules/htmlComponents';
import style from './style.css';


/* props = {
     current:,
     mode:,
   }
*/

class Frame extends CustomComponent {
  
  refresh(newProps) {
    if (newProps.current !== this.props.current) {
      this.props = newProps;
      this.rerender();
    }
  }
  
  render() {
    const list = this.props.list;
    const current = this.props.current;

    const imgSrc = this.props.current
      ? `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${list[current].image}`
      : '/assets/blank.jpg';

    return (
      DIV({ className: style.wrapper}, [
        DIV({ className: style.innerWrapper}, [
          IMG({className: style.image, src: imgSrc, width: '375px', height: '250px'}),
          DIV({ className: `flow-text ${style.textField}`}, [
            this.props.current ? list[this.props.current].translate : '',
          ]),
        ])
      ])
    );
  }
}

export default Frame;
