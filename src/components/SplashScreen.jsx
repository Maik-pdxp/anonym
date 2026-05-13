import styles from './SplashScreen.module.css'

export default function SplashScreen({ onConnect }) {
  return (
    <div className={styles.screen}>
      <div className={styles.center}>
        <h1 className={styles.logo}>nix</h1>
        <p className={styles.tagline}>anonym · flüchtig · echt</p>
      </div>
      <div className={styles.bottom}>
        <button className={styles.connectBtn} onClick={onConnect}>
          verbinden
        </button>
        <p className={styles.note}>du bist anonym — wir speichern nichts</p>
        <div className={styles.legal}>
          <a href="/impressum" className={styles.legalLink}>Impressum</a>
          <span className={styles.legalDot}>·</span>
          <a href="/datenschutz" className={styles.legalLink}>Datenschutz</a>
        </div>
      </div>
    </div>
  )
}