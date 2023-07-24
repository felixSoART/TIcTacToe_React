
import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";
import "../App.css";
export const TitleComponent = () => {
    return (      
  
      <div className="titulo">
        <h1><span className="colorAqua">Tic</span><span className="colorAzul">Tac</span><span className="colorCoral">Toe</span></h1>
        <h2><span className="reactColor">React</span> + <span style={{color: "white"}}>Vite</span></h2>
        <div>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </div>
      </div>

      )

}