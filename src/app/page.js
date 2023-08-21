import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>OpenAI API Samples</h1>
      <ul className={styles.index}>
      <li><Link href="/chatgpt-bot">chatgpt-bot</Link></li>
      <li><Link href="/chatgpt-what-does-this-code-do">chatgpt-what-does-this-code-do</Link></li>
      <li><Link href="/dall-e-image-generator">dall-e-image-generator</Link></li>
      </ul>
    </main>
  )
}
