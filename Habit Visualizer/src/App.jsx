/*Site layout app file*/
import Layout from "./components/Layout"
import Stats from "./components/Stats"
import History from "./components/History"
import HabitForm from "./components/HabitForm"
import Hero from "./components/Hero"
import { useAuth } from "./context/AuthContext"


function App() {

  const { globalUser, isLoading, globalData } = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length

  const authenticatedContent = (
    <>
    <Stats />
    <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <HabitForm isAuthenticated={isAuthenticated}/>
      {(isLoading && isAuthenticated) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent)}

    </Layout>
  )
}

export default App
