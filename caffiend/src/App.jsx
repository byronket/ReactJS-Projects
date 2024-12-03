import Layout from "./components/Layout"
import Stats from "./components/Stats"
import History from "./components/History"
import CoffeeForm from "./components/CoffeeForm"
import Hero from "./components/Hero"


function App() {

  const isAuthenticated = false

  const authenticatedContent = (
    <>
    <Stats />
    <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isAuthenticated && (authenticatedContent)}

    </Layout>
  )
}

export default App
