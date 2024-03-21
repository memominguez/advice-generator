/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import dice from "../assets/images/icon-dice.svg";
import desktopPattern from "../assets/images/pattern-divider-desktop.svg";
import mobilePattern from "../assets/images/pattern-divider-mobile.svg";
import spinner from "../assets/images/loading-gif.gif";
import styles from "./advice.module.css";

// Spinner image
// https://tenor.com/es/users/teej_14

const Advice = () => {
  const [advice, setAdvice] = useState({
    id: "",
    quote: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonclick, setButtonclick] = useState(0);
  const [buttonShadow, setButtonShadow] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) =>
        setAdvice({
          id: data.slip.id,
          quote: data.slip.advice,
        })
      )
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [buttonclick]);

  const getAdvice = () => {
    setButtonclick((prevState) => prevState + 1);
    setError(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {!isLoading ? (
          <>
            {error && <div className={styles.onError}>Error: {error}</div>}
            <header className={styles.id}>
              <p> ADVICE #{advice.id} </p>
            </header>
            <main>
              <article className={styles.quote}>
                <p>
                  <span className={styles.quotation}>&#8220;</span>
                  {advice.quote}
                  <span className={styles.quotation}>&#8221;</span>
                </p>
              </article>
            </main>
          </>
        ) : (
          <>
            {error && <div className={styles.onError}>Error: {error}</div>}
            <img src={spinner} alt="" className={styles.spinner} />
          </>
        )}

        <section className={styles.image}>
          <picture>
            <source media="(min-width: 577px)" srcSet={desktopPattern} />
            <source media="(max-width: 576px)" srcSet={mobilePattern} />
            <img src={desktopPattern} alt="Divider" />
          </picture>
        </section>
      </div>

      <footer>
        <button 
          disabled={isLoading} 
          onClick={getAdvice}
          onMouseEnter={() => setButtonShadow(true)}
          onMouseLeave={() => setButtonShadow(false)}
          onTouchStart={() => setButtonShadow(true)}
          onTouchEnd={() => setButtonShadow(false)}
          className={
            buttonShadow
              ? `${styles.aroundButton} ${styles.shadow}`
              : `${styles.aroundButton}`
          }
          >
          <img src={dice} alt="Dice" />
        </button>
      </footer>
    </div>
  );
};

export default Advice;
