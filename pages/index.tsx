import { useAuth } from "../context/auth";
import Image from "next/image";

const Home = () => {
    const { user, login, logout } = useAuth();

    return (
        <div>
            <h1>Next.js + Firebase Auth</h1>
            <div>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
            <div> {user != null ? <img src={user?.photoURL} height={300} width={300}/> : <span>Sem imagem</span>}
                <br />
                <button onClick={login}>login Google</button> 
                <br />
                <button onClick={logout}>logout</button>
            </div>
        </div>
    )
}

export default Home;