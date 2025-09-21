export const apiConfig = {
	baseUrl: "https://nomoreparties.co/v1/cohort-mag-3",
	headers: {
		authorization: "bbf4b680-493e-48d0-acc5-e0b3baeafed8",
		"Content-Type": "application/json",
	},
};

export function getProfileData(config) {
	const request = new Request(config.baseUrl + "/users/me");
	const requestData = {
		method: "GET",
		headers: config.headers,
	};

	return fetch(request, requestData)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on get user data: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on get user data: ", err);
		});
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
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on edit user data: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on get user data: ", err);
		});
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
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on add card: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on add card: ", err);
		});
}

export function removeCard(config, cardId) {
    const request = new Request(config.baseUrl + `/cards/${cardId}`);
    const requestData = {
		method: "DELETE",
		headers: config.headers,
	};

    return fetch(request, requestData)
		.then((res) => {
			if (!res.ok) {
				return Promise.reject(`Error on delete card: ${res.status}`);
			}
            return res.json();
		})
		.catch((err) => {
			console.log("Error on delete card: ", err);
		});

}

export function getCards(config) {
	const request = new Request(config.baseUrl + "/cards");
	const requestData = {
		method: "GET",
		headers: config.headers,
	};

	return fetch(request, requestData)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on edit user data: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on get user data: ", err);
		});
}

export function addLike(config, cardId) {
	const request = new Request(config.baseUrl + `/cards/likes/${cardId}`);
	const requestData = {
		method: "PUT",
		headers: config.headers,
	};

	return fetch(request, requestData)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on add like: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on add like: ", err);
		});
}

export function deleteLike(config, cardId) {
	const request = new Request(config.baseUrl + `/cards/likes/${cardId}`);
	const requestData = {
		method: "DELETE",
		headers: config.headers,
	};

	return fetch(request, requestData)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on delete like: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on delete like: ", err);
		});
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
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Error on update avatar: ${res.status}`);
		})
		.then((result) => result)
		.catch((err) => {
			console.log("Error on update avatar: ", err);
		});
}
