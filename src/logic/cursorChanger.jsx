import React from 'react';

export const CursorChanger = ({ cursorImage1, cursorImage2 }) => {


  const cursorStyle = {
    cursor:`url(${cursorImage1}), auto` 
  };

  return (
    <div style={cursorStyle} className=''>
      {/* Contenido del componente */}
    </div>
  );
};

export default CursorChanger;
