import { useNavigate } from 'react-router-dom'
import styles from './LegalScreen.module.css'

export default function DatenschutzScreen() {
  const navigate = useNavigate()

  return (
    <div className={styles.screen}>
      <button className={styles.back} onClick={() => navigate('/')}>← zurück</button>
      <div className={styles.content}>
        <h1 className={styles.title}>Datenschutzerklärung</h1>

        <h2 className={styles.subtitle}>1. Datenschutz auf einen Blick</h2>

        <h3 className={styles.sub3}>Allgemeine Hinweise</h3>
        <p className={styles.text}>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

        <h3 className={styles.sub3}>Wer ist verantwortlich für die Datenerfassung?</h3>
        <p className={styles.text}>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" entnehmen.</p>

        <h3 className={styles.sub3}>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
        <p className={styles.text}>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht auf Berichtigung oder Löschung dieser Daten.</p>

        <h2 className={styles.subtitle}>2. Hosting</h2>
        <p className={styles.text}>Diese Website wird extern gehostet bei:</p>
        <p className={styles.text}>
          Vercel Inc.<br />
          440 N Barranca Avenue #4133<br />
          Covina, CA 91723<br />
          United States
        </p>
        <p className={styles.text}>Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).</p>

        <h2 className={styles.subtitle}>3. Allgemeine Hinweise</h2>

        <h3 className={styles.sub3}>Hinweis zur verantwortlichen Stelle</h3>
        <p className={styles.text}>
          Maik Patzwald-Feuerstein<br />
          Grünwalder Str. 53<br />
          81547 München<br />
          Telefon: +49 17624259558<br />
          E-Mail: maikpatzwald@web.de
        </p>

        <h3 className={styles.sub3}>Speicherdauer</h3>
        <p className={styles.text}>Nachrichten werden unwiderruflich gelöscht, sobald einer der Chatpartner den Chat beendet. Anonyme Nutzer-IDs werden für die Dauer der Session gespeichert.</p>

        <h3 className={styles.sub3}>Widerruf Ihrer Einwilligung</h3>
        <p className={styles.text}>Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.</p>

        <h3 className={styles.sub3}>Beschwerderecht</h3>
        <p className={styles.text}>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, zu.</p>

        <p className={styles.source}>Quelle: e-recht24.de</p>
      </div>
    </div>
  )
}