import { DIV, IMG, CustomComponent } from '../../../my_modules/htmlComponents';
import style from './style.css';


/* props = {
     current:,
     mode:,
   }
*/

class Frame extends CustomComponent {
  
  refresh(newProps) {
    this.props = newProps;
    this.rerender();
  }
  
  render() {
    const list = this.props.list;
    const current = !Number.isNaN(Number.parseInt(this.props.current))
      ? Number.parseInt(this.props.current) 
      : this.props.current;
    
    const imgSrc = Number.isInteger(current)
      ? `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${list[current].image}`
      : '/assets/blank.jpg';

    let text = Number.isInteger(current)
      ? this.props.isGame ? list[current].word : list[current].translation
      : current;
      
    const classRight = Number.isInteger(current) ? 'cyan-text text-lighten-4' : 'deep-orange-text text-accent-2';

    return (
      DIV({ className: style.wrapper}, [
        DIV({ className: style.innerWrapper}, [
          IMG({className: style.image, src: imgSrc, width: '375px', height: '250px'}),
          DIV({ className: `flow-text ${style.textField} ${classRight}`}, [
            text
          ]),
        ])
      ])
    );
  }
}

export default Frame;
