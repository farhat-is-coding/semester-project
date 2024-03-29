import Nav from "./components/nav";
import Gates from "./components/gates";
import GateLine from "./components/gateline";
import Menu from "./components/menu";
import MyForm from "./components/myform";
import { useState } from "react";
import GateLine2 from "./components/gateline2";
import ModalScreen from "./components/modal";
import { useEffect } from "react";
//importing  components for menu bar routing

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('resultMatrix', null);
      localStorage.setItem('resultMatrix2', null);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  const [status,setStatus]=useState(false);
  const [firstLineGates, setFirstLineGates] = useState([]); // stack of gates
  const [secondLineGates, setSecondLineGates] = useState([]); // stack of gates
  const [dataArray, setDataArray] = useState({ q1: "" });
  const [dataArray2, setDataArray2] = useState({ q2: "" });
  const [result, setResult] = useState([]);
  //for modal screen
  const [showInstructions, setShowInstructions] = useState(true);
  //showing onload message
  const handleStart = () => {
    setShowInstructions(false);
  };
  const clickhandler = (newData) => {
    setDataArray([...dataArray, newData]);
  };

  if(status==true){
      setFirstLineGates([]);
      setSecondLineGates([]);
      setDataArray({ q1: '' });
      setDataArray2({ q2: '' });
      setResult([]);
      localStorage.setItem('resultMatrix', null);
      localStorage.setItem('resultMatrix2', null);
      setStatus(false);
    
  }
  
  return (
    <>
      {showInstructions ? (
        <ModalScreen onStart={handleStart} />
      ) : (
        <>
          <Nav />

          <Gates
            secondLineGates={secondLineGates}
            firstLineGates={firstLineGates}
            setFirstLineGates={setFirstLineGates}
            setSecondLineGates={setSecondLineGates}
            setStatus={setStatus}
          />

          <GateLine
            dataarray={dataArray}
            setDataArray={setDataArray}
            gates={firstLineGates}
            setGates={setFirstLineGates}
          />
          <GateLine2
            dataarray={dataArray2}
            setDataArray={setDataArray2}
            gates={secondLineGates}
            setGates={setSecondLineGates}
          />
          <Menu
            setResult={setResult}
            gates={firstLineGates}
            gate2={secondLineGates}
            dataarray={dataArray}
            dataarray2={dataArray2}
          />
          <MyForm />
          <footer>
            <div class="footer-container">
              <div class="footer-info">
                <p>
                  &copy; 2023 Qubitrix. All rights reserved by FCAI Air
                  University,Islamabad.
                </p>
                <p>Supervised by: Mr Tariq Naeem </p>
                <p>Developed by: Saim , Moeed , Farhat </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
}

export default App;
