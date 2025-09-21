export const apiConfig = {
	baseUrl: "https://nomoreparties.co/v1/cohort-mag-3",
	headers: {
		authorization: "bbf4b680-493e-48d0-acc5-e0b3baeafed8",
		"Content-Type": "application/json",
	},
};

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res);
};

export function getProfileData(config) {
    const request = new Request(config.baseUrl + "/users/me");
    const requestData = {
        method: "GET",
        headers: config.headers,
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }

export function editProfileData(config, name, about) {
    const request = new Request(config.baseUrl + "/users/me");
    const requestData = {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        }),
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }

export function addCard(config, name, link) {
    const request = new Request(config.baseUrl + "/cards");
    const requestData = {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }

export function removeCard(config, cardId) {
    const request = new Request(config.baseUrl + `/cards/${cardId}`);
    const requestData = {
        method: "DELETE",
        headers: config.headers,
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   
   }
export function getCards(config) {
    const request = new Request(config.baseUrl + "/cards");
    const requestData = {
        method: "GET",
        headers: config.headers,
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }

export function addLike(config, cardId) {
    const request = new Request(config.baseUrl + `/cards/likes/${cardId}`);
    const requestData = {
        method: "PUT",
        headers: config.headers,
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }

export function deleteLike(config, cardId) {
    const request = new Request(config.baseUrl + `/cards/likes/${cardId}`);
    const requestData = {
        method: "DELETE",
        headers: config.headers,
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }

export function updateAvatar(config, avatar) {
    const request = new Request(config.baseUrl + "/users/me/avatar");
    const requestData = {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    };

    return fetch(request, requestData)
    	.then(checkResponse);
   }
