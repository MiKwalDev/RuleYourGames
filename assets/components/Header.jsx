import React, { useEffect, useState } from "react"
import { Dialog, Popover } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Header = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth()

  const pageLinks = [
    {
      name: "Accueil",
      url: "/",
    },
    isLoggedIn && {
      name: "Profil",
      url: "/profil",
    },
  ]

  useEffect(() => {
    pageLinks.map((page) => {
      if (page.url == location.pathname) {
        document.title = page.name
      } else if (location.pathname == "/login") {
        document.title = "Connection"
      } else if (location.pathname == "/register") {
        document.title = "Inscription"
      }
    })
  }, [])

  const logoutAction = () => {
    localStorage.clear()
    setAuthUser(null)
    setIsLoggedIn(false)
  }

  return (
    <header className="bg-zinc-800">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/">
            <span className="sr-only">Rule Your Games</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {pageLinks.map((page, key) => {
            return (
              <Link
                to={page.url}
                key={key}
                className="items-center gap-x-1 text-xl font-semibold leading-6 text-white"
              >
                {page.name}
              </Link>
            )
          })}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:items-end">
          {isLoggedIn ? (
            <>
              {isLoggedIn ? (
                <span className="gap-x-1 text-xl font-semibold leading-6 text-white">
                  Connecté en tant que: {authUser.username}
                </span>
              ) : null}
              <Link
                onClick={() => logoutAction()}
                to={"/"}
                className="items-center gap-x-1 text-xl font-semibold leading-6 text-white"
              >
                Se déconnecter <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="items-center gap-x-1 text-xl font-semibold leading-6 text-white"
              >
                Connexion <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                to={"/register"}
                className="items-center gap-x-1 text-xl font-semibold leading-6 text-white"
              >
                S'inscrire <span aria-hidden="true">&rarr;</span>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-zinc-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Rule Your Games</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {pageLinks.map((page, key) => {
                  return (
                    <Link
                      to={page.url}
                      key={key}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-zinc-600"
                    >
                      {page.name}
                    </Link>
                  )
                })}
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <>
                    {isLoggedIn ? (
                      <span className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-10 text-white">
                        Connecté en tant que: {authUser.username}
                      </span>
                    ) : null}
                    <Link
                      onClick={() => logoutAction()}
                      to={"/"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-10 text-white hover:bg-zinc-600"
                    >
                      Se déconnecter
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-zinc-600"
                    >
                      Connexion
                    </Link>
                    <Link
                      to={"/register"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-zinc-600"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header
