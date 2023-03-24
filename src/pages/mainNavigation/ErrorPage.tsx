import MainNavigation from './MainNavigation'

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Wrong Url</h1>
        <p>page not found</p>
      </main>
    </>
  )
}
export default ErrorPage
