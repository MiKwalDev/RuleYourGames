import React, { useEffect } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"

const Home = () => {

  return (
    <Layout>
      <Header/>
      <section className="px-3 lg:px-60 container mx-auto">
        <h1 className="text-left text-base lg:text-xl font-bold text-gray-100 py-5">Bienvenue dans un monde où c'est <i>Vous</i> qui dictez les règles de vos jeux</h1>
      </section>
    </Layout>
  )
}

export default Home