import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFoundPage() {
  useDocumentMeta('Page Not Found · The Boulders', 'The requested page could not be found.')
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">404 · off the map</p>
        <h1 className="mt-5 font-display text-5xl font-semibold sm:text-7xl">That page isn’t here.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-graphite dark:text-stone-300">The route may have changed, or the address may have been typed incorrectly.</p>
        <ButtonLink to="/" className="mt-8">Return home</ButtonLink>
      </Container>
    </section>
  )
}
