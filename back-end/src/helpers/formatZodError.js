function formatZodError(error) {
  const formattedError = {}

  error.issues.forEach((err) => {
    const path = err.path[0]

    if (!formattedError[path]) {
      formattedError[path] = []
    }
    formattedError[path].push(err.message)
  })

  return formattedError
}

export default formatZodError