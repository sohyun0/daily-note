import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>하루노트</h1>
      <p className={styles.brand}>DAILY NOTE</p>
    </main>
  );
}
