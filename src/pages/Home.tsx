import { useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

import "../styles/auth.scss";


export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  };

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    
    if(!roomRef.exists()){
      alert("Room does not exists!")
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <button type="submit" className="button">Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  );
}
