
import "../App.css";
import "../index.css";


export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'is-selected ' : ' '}${children === 'x' ? 'reactColor' : ''}`
    let arrayColoresTabl = ['square colorAzulBorde', 'square colorAquaBorde','square colorCoralBorde','square colorCoralBorde','square colorAzulBorde','square colorAquaBorde','square colorAzulBorde', 'square colorAquaBorde','square colorCoralBorde']

    const handleClick = () => {
      updateBoard(index) 
      console.log('hola' + children)
    }
    return (<div onClick={handleClick}  className={className + ' ' + arrayColoresTabl[index]}>{children}</div>) 
    
  };    