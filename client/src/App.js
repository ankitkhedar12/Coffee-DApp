import abi from "./contract/chai.json";
import {useState, useEffect} from 'react';
import { ethers } from "ethers";
import Buy from './components/Buy'
// import chai from './chai.png';
// import chai from './chai_video.mp4';
import chai from './chai_gif.gif';
import Memos from "./components/Memos";
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  const connectWallet = async () => {
    const contractAddress = "0xe26d2d91777c3817bE9911086Fd89533d256201f";
    const contractABI = abi.abi;
    try{
      const {ethereum} = window;
      if(ethereum){
        const account = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account);

        window.ethereum.on("chainChanged", ()=>{
          window.location.reload();
        })

        window.ethereum.on("accountsChanged", ()=>{
          window.location.reload();
        })

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setState({provider, signer, contract});
      }
      else{
        alert("Please configure Metamask");
      }
    }
    catch(error){
      console.log("Error in fetching contract info or meta info: ", error);
    }
  }

  useEffect(() => {
    connectWallet();
  }, [])
  console.log("State: ", state);
  return (
    // <div className="App">
    //   <Buy state={state} />
    //   <Memos state={state} />
    // </div>
    <div style={{ backgroundColor: "#EFEFEF", 
    height: "100%", 
    // background: 'rgb(34,193,195)', 
    // background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,0.41789215686274506) 100%)' 
    }}>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      {/* <video className="img-fluid" src={chai} width="100%" height="100%" loop autoPlay="true" /> */}
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px", textAlign:'center' }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
