import { useNavigate } from 'react-router-dom'
import styles from './LegalScreen.module.css'

export default function ImpressumScreen() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <button className={styles.back} onClick={() => navigate('/')}>← zurück</button>
      <div className={styles.content}>
        <h1 className={styles.title}>Impressum</h1>

        <p className={styles.text}>
          Maik Patzwald-Feuerstein<br />
          Grünwalder Str. 54<br />
          81547 München
        </p>

        <h2 className={styles.subtitle}>Kontakt</h2>
        <p className={styles.text}>
          Telefon: +49 176 24259558<br />
          E-Mail: maikpatzwald@web.de
        </p>

        <h2 className={styles.subtitle}>Umsatzsteuer-ID</h2>
        <p className={styles.text}>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE999999999
        </p>

        <h2 className={styles.subtitle}>Verbraucherstreitbeilegung</h2>
        <p className={styles.text}>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <p className={styles.source}>Quelle: e-recht24.de</p>
      </div>
    </div>
  )
}