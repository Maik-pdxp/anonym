import styles from './EndedScreen.module.css'

export default function EndedScreen({ partnerLeft = false, onReset }) {
  return (
    <div className={styles.screen}>
      <div className={styles.mark}>—</div>
      <h2 className={styles.title}>chat beendet</h2>
      <p className={styles.sub}>
        {partnerLeft
          ? 'die andere person hat den chat geschlossen.'
          : 'du hast den chat geschlossen.'}
        <br />
        alle nachrichten wurden gelöscht.
        <br />
        nie gewesen.
      </p>
      <button className={styles.newBtn} onClick={onReset}>
        neu verbinden
      </button>
    </div>
  )
}
