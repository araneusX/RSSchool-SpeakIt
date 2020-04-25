import { DIV, SPAN, CustomComponent } from '../../../my_modules/htmlComponents';
import stylizeWord from '../../stylizeElements/stylizeWord';
import style from './style.css';

/* 
   props = {
      list:
      mode:
      pronounced:
   }
*/
class Words extends CustomComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const content = this.props.list.map((word) => stylizeWord({}, [
      SPAN({}, [word.word]),
      SPAN({}, [word.transcription]),
    ]))
    return (
      DIV({ className: style.wrapper }, [
        ...content,
      ])
    );
  }
}

export default Words;
