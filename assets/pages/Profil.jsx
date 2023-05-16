import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profil = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (
      !localStorage.getItem("token")
    ) {
      navigate("/login?accessdenied=true")
    }
    getUserProfil()
  }, [])

  const getUserProfil = () => {
    axios
      .get("/api/profil", { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')} })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        error.response.data.code == 401 && navigate("/login?accessdenied=true")
      });
  }


  return (
    <Layout>
      <Header />
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <article className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Rule Your Games"
          />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-100">
            Profil
          </h2>
        </article>
      </section>
    </Layout>
  )
}

export default Profil