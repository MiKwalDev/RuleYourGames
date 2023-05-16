import React from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"

const Home = () => {

  return (
    <Layout>
      <Header/>
      <section className="px-3 lg:container lg:mx-auto lg:px-10">
        <h1 className="text-left text-3xl font-bold text-gray-100 py-8">Bienvenue dans un monde où c'est <i>Vous</i> qui dictez les règles de vos jeux</h1>
      </section>
    </Layout>
  )
}

export default Home