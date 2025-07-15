const  Navbar = ({account,connect}) => {
  return (<div className="flex flex-row justify-center
     gap-4 p-1 h-15 items-center bg-black text-white">
        <div>
            
            {account ? (account):(<button
            className="p-2 pl-6 pr-6 bg-green-700 rounded-md hover:bg-green-800
                hover:cursor-pointer text-white" onClick={connect}
            > Connect Wallet</button>)}
    
        </div>
    </div>
    );

};

export default Navbar;