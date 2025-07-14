import { MetaMaskProvider } from "../context/MetaMaskContext";
export default function Home() {
  return (
    <MetaMaskProvider>
      <div className="flex flex-row flex-cols-3 justify-center">
        <h1>Hello</h1>
      </div>
    </MetaMaskProvider>
  );
}
