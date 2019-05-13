export default function({ store, route, redirect }) {
  if (process.server) {
    return
  }

  const urlRequiresAuth = [
    /^\/(\/|$)/,
    /^\/wallet\/assets(\/|$)/
  ].some(pathRegex => {
    return pathRegex.test(route.path)
  })

  const urlAllowsNonAuth = [
    ///^(\/it)?\/profile\/confirm/,
    /^\/(\/|$)/,
    /^\/create(\/|$)/,
  ].some(pathRegex => {
    return pathRegex.test(route.path)
  })

  if (!store.getters.isAuthorized && urlRequiresAuth && !urlAllowsNonAuth) {
    return redirect("/")
  }

  return Promise.resolve()
}
