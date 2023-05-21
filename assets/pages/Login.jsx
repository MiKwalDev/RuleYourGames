import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import Form from "../components/Form"
import SubmitField from "../components/SubmitField"
import InputField from "../components/InputField"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [queryParamaters] = useSearchParams()
  const {
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [])

  const loginAction = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    let payload = {
      username: username,
      password: password,
    }
    axios
      .post("/api/login_check", payload, {
        withCredentials: true
      })
      .then((response) => {
        setIsSubmitting(false)
        axios
          .post("/api/auth")
          .then((response) => {
            localStorage.setItem("auth", JSON.stringify(response.data))
            setAuthUser(response.data)
            setIsLoggedIn(true)
            navigate("/")
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
        error.response.data.code == 401 && setMessage("Identifiant ou mot de passe invalide")
        setPassword("")
      })
      setIsSubmitting(false)
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
            Connexion
          </h2>
        </article>
        <article className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {queryParamaters.has("registersuccess") != "" && (
            <div className="flex">
              <small className="alert-success mx-auto text-center text-base">
                Inscription validée, veuillez vous authentifier
              </small>
            </div>
          )}
          {queryParamaters.has("accessdenied") != "" && (
            <div className="flex">
              <small className="alert-danger mx-auto text-center text-base">
                Veuillez vous authentifier pour accéder à cette page
              </small>
            </div>
          )}
          {message && (
            <div className="flex">
              <small className="alert-danger mx-auto text-center text-base">
                {message}
              </small>
            </div>
          )}
          <Form
            onSubmit={(e) => loginAction(e)}
            submitPart={
              <SubmitField
                validationLabel={"Se connecter"}
                canceLabel={"Annuler"}
                cancelUrl={"/"}
                disabled={isSubmitting}
              />
            }
          >
            <InputField
              onChange={(event) => {
                setUsername(event.target.value)
              }}
              label={"Nom d'utilisateur ou Email"}
              type={"text"}
              name={"username"}
              placeholder={"jane"}
              autoComplete={"username"}
              value={username}
            />
            <InputField
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              label={"Mot de passe"}
              type={"password"}
              name={"password"}
              value={password}
            />
          </Form>
        </article>
      </section>
    </Layout>
  )
}

export default Login
