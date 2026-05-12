import styles from './SearchingScreen.module.css'

export default function SearchingScreen({ onCancel }) {
  return (
    <div className={styles.screen}>
      <div className={styles.pulse}>
        <div className={styles.ring} />
        <div className={styles.ring} style={{ animationDelay: '1s' }} />
        <div className={styles.dot} />
      </div>
      <p className={styles.label}>suche jemanden</p>
      <button className={styles.cancel} onClick={onCancel}>
        abbrechen
      </button>
    </div>
  )
}
