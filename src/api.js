export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-3',
  headers: {
    authorization: 'bbf4b680-493e-48d0-acc5-e0b3baeafed8',
    'Content-Type': 'application/json'
  }
}

export function getProfileData(config) {
    const request = new Request(config.baseUrl + "/users/me")
    const requestData = {
        method: 'GET',
        headers: config.headers,
    }

    return fetch(request, requestData)
    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error on get user data: ${res.status}`)
    })
    .then(result => result)
    .catch((err) => {
        console.log('Error on get user data: ', err);
    })
}

export function editProfileData(config, name, about) {
    const request = new Request(config.baseUrl + "/users/me")
    const requestData = {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(
            {
                name: name,
                about: about
            }
        )
    }

    return fetch(request, requestData)
     .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error on edit user data: ${res.status}`)
    })
    .then(result => result)
    .catch((err) => {
        console.log('Error on get user data: ', err);
    })
}

export function getCards(config) {
 const request = new Request(config.baseUrl + "/cards")
    const requestData = {
        method: 'GET',
        headers: config.headers,
    }

     return fetch(request, requestData)
     .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error on edit user data: ${res.status}`)
    })
    .then(result => result)
    .catch((err) => {
        console.log('Error on get user data: ', err);
    })

}