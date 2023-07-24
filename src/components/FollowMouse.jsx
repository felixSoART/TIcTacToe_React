import { useState, useEffect } from "react";
//import cursorImage1 from '././assets/img/O.gif';

export const FollowMouse = ( {turn} ) => {
    // Crea los estados de actibacion|enabled para el efecto y
    // el estado para actualizar la posicion en el objeto {x,y}
    const [enabled, setEnabled] = useState(true)
    const [position, setPosition] = useState({x: 0, y: 0})
    // const cursorStyle = {
    //   cursor:`url(${cursorImage1}), auto` 
    // };
    console.log(turn)
    const handleContextMenu = (event) => {

      console.log('Seguir raton: '+ enabled)
      setEnabled(!enabled)
      
      event.preventDefault();
    };
    
    useEffect(() => {
      const handleMove = (event) => {
        const { clientX, clientY } = event;
        setPosition({ x: clientX, y: clientY });
      };

  window.addEventListener('contextmenu', handleContextMenu);
      
      if (enabled) {
        window.addEventListener('pointermove', handleMove);
        
      } else {
        window.removeEventListener('pointermove', handleMove);  
       
      }
  
      return () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('contextmenu', handleContextMenu);
      };
    }, [enabled]);

    const symbolClass = enabled ? '' : 'onContextMenuHidden';
    
    return (
      <>
        <div>
          <div className={`symbol ${symbolClass}${turn === 'x' ? ' reactColor ' : ''}` }  style={{ transform: ` translate(${position.x}px, ${position.y}px)` }} >{turn}</div>
        </div>
      </>
    );
  };