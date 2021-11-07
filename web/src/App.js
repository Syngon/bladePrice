import React, {useState} from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';


import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import InputUrl from './components/InputUrl';
import StripeContainer from './components/StripeContainer';
import fotoProduto from './assets/jarlesfemea.png'






function App() {
  const { isLoading } = useAuth0();
  const [showItem, setShowItem] = useState(false);

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />

      <br/><br/><br/><br/><br/><br/>

      Insira seu link aqui: <InputUrl />





      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

      <div className="stripe">
        <h1> Produto </h1>
        {showItem ? 
          <StripeContainer/> : 
          <>
            <h3>$10,00</h3>
            <img src={fotoProduto} alt="Foto do produto"/>
            <button onClick={() => setShowItem(true)}>
              Purchase product
            </button>
          </> 
        }
      </div>
    </>
  );
}

export default App;