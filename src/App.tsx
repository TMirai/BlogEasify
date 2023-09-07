import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Routers } from './components/router/Routers';
import { RecoilRoot } from 'recoil';
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";

interface AuthData {
  isLoading: boolean;
  alias: string;
  signOut: () => void;
}
const useAuth = (): AuthData => {
  const [isLoading, setIsLoading] = useState(false);
  const [alias, setAlias] = useState("");

  const getAuthenticatedUser = async () => {
    try {
      const data = await Auth.currentAuthenticatedUser();
      setIsLoading(false);
      setAlias(data.attributes.name);
    } catch (e) {
      console.error(e);
      Auth.federatedSignIn();
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await Auth.signOut();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return { isLoading, alias, signOut };
};
const App = () => {
  const { isLoading, alias, signOut } = useAuth();
  return (
    <>
      {isLoading ? (
        <p>Now Loading...</p>
      ) : (
        <>
          {/* <img
            src={`https://internal-cdn.amazon.com/badgephotos.amazon.com/?uid=${alias}`}
            alt="alias"
          />
          <button onClick={signOut}>Sign Out</button> */}
          <RecoilRoot>
            <ChakraProvider>
              <Routers />
            </ChakraProvider>
          </RecoilRoot>
        </>
      )}
    </>
  );
}

// const App = () => {
//   return (
//     <RecoilRoot>
//       <ChakraProvider>
//           <Routers />
//       </ChakraProvider>
//     </RecoilRoot>
//   )
// }


export default App;


