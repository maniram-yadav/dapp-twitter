import { MetaMaskProvider } from "../context/MetaMaskContext";
import Home from "../components/Home";
export default function Main() {
  return (
    <div>
    <MetaMaskProvider>
      <Home></Home>    
    </MetaMaskProvider>
    </div>
  );
}
