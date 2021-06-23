import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";


export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  };

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie Salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <Button className="create-room" onClick={handleCreateRoom}>
            <img src={googleImg} alt="Logo do google" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">Entre em uma sala</div>
          <form>
            <input type="text" placeholder="digite o código da sala" />
            <button type="submit">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
}
