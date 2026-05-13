import { Link } from 'react-router-dom'
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
          <Link to="/impressum" className={styles.legalLink}>Impressum</Link>
          <span className={styles.legalDot}>·</span>
          <Link to="/datenschutz" className={styles.legalLink}>Datenschutz</Link>
        </div>
      </div>
    </div>
  )
}