const showInputError = (formElement, inputElement, errorMessage, config) => {
	const errorElementSelector = config.errorElementSelector
		? config.errorElementSelector(inputElement)
		: `.${inputElement.id}-error`;
	const errorElement = formElement.querySelector(errorElementSelector);

	inputElement.classList.add(config.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
	const errorElementSelector = config.errorElementSelector
		? config.errorElementSelector(inputElement)
		: `.${inputElement.id}-error`;
	const errorElement = formElement.querySelector(errorElementSelector);
	if (!errorElement) return;

	inputElement.classList.remove(config.inputErrorClass);
	errorElement.textContent = "";
	errorElement.classList.remove(config.errorClass);
};

const isValid = (formElement, inputElement, config) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			config
		);
	} else {
		hideInputError(formElement, inputElement, config);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
	} else {
		buttonElement.disabled = false;
	}
};

function setEventListeners(formElement, config) {
	const inputList = Array.from(
		formElement.querySelectorAll(config.inputSelector)
	);
	const buttonElement = formElement.querySelector(
		config.submitButtonSelector
	);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			isValid(formElement, inputElement, config);
			toggleButtonState(inputList, buttonElement);
		});
	});
}

export function enableValidation(config) {
	const formList = Array.from(
		document.querySelectorAll(config.formSelector)
	);
	formList.forEach((formElement) => {
		setEventListeners(formElement, config);
	});
}

export function clearValidation(formElement, config) {
	const inputList = Array.from(
		formElement.querySelectorAll(config.inputSelector)
	);

	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, config);
	});
}
