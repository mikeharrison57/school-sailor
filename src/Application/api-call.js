const secureKey = process.env.REACT_APP_SCHOOLS_API_KEY;

const fetchSchoolsInfo = (state) => {
  return fetch(`https://api.data.gov/ed/collegescorecard/v1/schools.json?school.state=${state}&api_key=${secureKey}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
}

export { fetchSchoolsInfo }