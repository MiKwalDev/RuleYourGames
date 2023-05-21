import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

const Profil = () => {
  const navigate = useNavigate()
  const [userProfil, setUserProfil] = useState({})
  const {
    setAuthUser,
    setIsLoggedIn
  } = useAuth()

  useEffect(() => {
    getUserProfil()
  }, [])

  const getUserProfil = () => {
    axios
      .post("/api/profil")
      .then((response) => {
        // console.log(response)
        setUserProfil(response.data)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.code == 401){
          localStorage.clear()
          setAuthUser(null)
          setIsLoggedIn(false)
          navigate("/login?accessdenied=true")
        }
      })
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
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
            Profil
          </h2>
        </article>
        <article className="mt-5 px-4 sm:px-0 md:mx-auto md:w-full md:max-w-sm">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-100">
              Informations de profil
            </h3>
          </div>
          <div className="mt-5 border-t border-gray-400">
            <dl className="divide-y divide-gray-600">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-200">
                  Nom d'utilisateur
                </dt>
                <dd className="mt-1 px-2 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                  {userProfil.username}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-200">
                  Email
                </dt>
                <dd className="mt-1 px-2 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                  {userProfil.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium leading-6 text-gray-200">
                  Membre depuis
                </dt>
                <dd className="mt-1 px-2 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0">
                  {new Date(userProfil.createdAt).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </section>
    </Layout>
  )
}

export default Profil
