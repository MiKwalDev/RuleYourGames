import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import Form from "../components/Form"
import InputField from "../components/InputField"
import SubmitField from "../components/SubmitField"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errors, setErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (
      localStorage.getItem("token") != "" &&
      localStorage.getItem("token") != null
    ) {
      navigate("/")
    }
  }, [])

  const registerAction = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    let payload = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    }
    axios
      .post("/api/register", payload)
      .then((response) => {
        // console.log(response)
        setIsSubmitting(false)
        if (response.data.errors) {
          setErrors(response.data.errors)
        }
        if (response.data.success) {
          navigate("/login?registersuccess=true")
        }
      })
      .catch((error) => {
        setIsSubmitting(false)
        console.log(error)
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
            S'inscrire
          </h2>
        </article>
        <article className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errors.length != 0 &&
            errors.map((error, key) => {
              return (
                <div key={key} className="flex">
                  <small className="alert-danger mx-auto text-center text-base">
                    {error.message}
                  </small>
                </div>
              )
            })}
          <Form
            onSubmit={(e) => registerAction(e)}
            submitPart={
              <SubmitField
                validationLabel={"S'inscrire"}
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
              label={"Nom d'utilisateur"}
              type={"text"}
              name={"username"}
              placeholder={"Jane"}
              autoComplete={"username"}
            />
            <InputField
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              label={"Email"}
              type={"email"}
              name={"email"}
              placeholder={"jane.smith@mail.com"}
              autoComplete={"email"}
            />
            <InputField
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              label={"Mot de passe"}
              type={"password"}
              name={"password"}
            />
            <em className="text-gray-100">
              Au moins 8 caractères, une minuscule, une majuscule, un chiffre et
              un caractère spécial
            </em>
            <InputField
              onChange={(event) => {
                setPasswordConfirm(event.target.value)
              }}
              label={"Confirmation mot de passe"}
              type={"password"}
              name={"password_confirm"}
            />
          </Form>
        </article>
      </section>
    </Layout>
  )
}

export default Register
