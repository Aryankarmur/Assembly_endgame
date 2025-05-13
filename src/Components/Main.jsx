import { useState } from "react";
import { languages } from "./Languages.js";
import {getFarewellText, newWord} from "./Utils.js";


const Main = () => {
  //state value
  const [word, setWord] = useState(() => newWord());
  // console.log(word);
  
  const [inputKeys, setInputKeys] = useState([]);

  //derived value
  const inputs = Array.from(word.slice("").toLocaleUpperCase());

  const wrongGuessCount = inputKeys.filter(
    (letter) => !inputs.includes(letter)
  ).length;

  const gameWon = inputs.every((letter) => inputKeys.includes(letter));
  const gameLost = wrongGuessCount >= languages.length - 1;
  const GameOver = gameWon || gameLost;
  const lastGuessLetter = inputKeys[inputKeys.length - 1];
  const GuessIncorect = lastGuessLetter && !inputs.includes(lastGuessLetter);

  // static value
  const keybord = "abcdefghijklmnopqrstuvwxyz";
  const keys = Array.from(keybord.slice("").toLocaleUpperCase());

  // for assembly languages
  const language = languages.map((lang, index) => {
    function langLost() {
      if (index < wrongGuessCount) {
        return "lost";
      }
    }

    const styles = {
      backgroundColor: lang.bgColor,
      color: lang.color,
      position: "relative",
    };

    return (
      <span key={index} style={styles} className={langLost()}>
        {lang.name}
      </span>
    );
  });

  // for input fields
  const words = inputs.map((word, index) => {
    const revelWord = gameLost || inputKeys.includes(word)
    function gameLoseClass() {
      if (gameLost && !inputKeys.includes(word)) {
        return "missed-word";
      }
    }
    return <span key={index} className={gameLoseClass()}>{revelWord ? word : ""}</span>;
  });

  // for keybord keys
  const handelKeys = (e) => {
    const keyVal = e.target.innerText;
    setInputKeys((prev) =>
      !inputKeys.includes(keyVal) ? [...prev, keyVal] : prev
    );
  };
  const keysbord = keys.map((key) => {
    function getColor() {
      if (inputKeys.includes(key) && inputs.includes(key)) {
        return "isin";
      } else if (inputKeys.includes(key) && !inputs.includes(key)) {
        return "isnot";
      } else {
        return "";
      }
    }
    const disableBtn = GameOver ? "disable" : "";

    return (
      <button
        key={key}
        disabled={GameOver}
        className={`${getColor()} ${disableBtn}`}
        onClick={handelKeys}
      >
        {key}
      </button>
    );
  });

  // game status
  const gameStatus = () => {
    if (gameWon) {
      return (
        <section aria-live="polite" role="status" className="status-sec win">
          <h2> You win </h2>
          <p> Well done! 🎉  </p>
        </section>
      );
    } else if (gameLost) {
      return (
        <section aria-live="polite" role="status" className="status-sec lost">
          <h2> Game over! </h2>
          <p> you lose! Better start learning Assembly 😭 </p>
        </section>
      );
    } else if (!GameOver && GuessIncorect) {
      return (
        <section
          className="status-sec wrongGuess"
        >
          <p> {getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        </section>
      );
    } else {
      return (
        <section
          aria-live="polite"
          role="status"
          className="status-sec"
        ></section>
      );
    }
  };

  // new game function
  const handelNewGame = () => {
    setWord(newWord())
    setInputKeys([])
  }

  return (
    <main>
      {gameStatus()}
      <section className="aslang">{language}</section>
      <section className="inputField">{words}</section>
      <section className="keybord">{keysbord}</section>
      {GameOver && (
        <section className="new_game-sec">
          <button className="new_game-btn" onClick={handelNewGame}> New Game </button>
        </section>
      )}
    </main>
  );
};

export default Main;
