export {showInputError, hideInputError, checkInputValidity, toggleButtonState, clearValidation, enableValidation}

// функция показа ошибки в форме
function showInputError(inputElement, errorMessage, validationConfig) {
    const errorElement = inputElement.closest(validationConfig.formSelector).querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    inputElement.classList.add(validationConfig.inputErrorClass);
}

// функция скрытия ошибки в форме
function hideInputError(inputElement, validationConfig) {
    const errorElement = inputElement.closest(validationConfig.formSelector).querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(validationConfig.inputErrorClass);
}
  

// функция проверки  на валидность формы в окне редактирования профиля 
function checkInputValidity(inputElement, validationConfig) {
    const value = inputElement.value.trim();
    if(!value) {
        showInputError(inputElement, 'Вы пропустили это поле', validationConfig);
    } else if(inputElement.validity.patternMismatch) {
        showInputError(inputElement, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы', validationConfig);
    } else if(!inputElement.validity.valid){
        showInputError(inputElement, inputElement.validationMessage, validationConfig);
    } else{
        hideInputError(inputElement, validationConfig);
    }
}

function enableValidation (validationConfig) {
    const forms = document.querySelectorAll(validationConfig.formSelector);
    forms.forEach(function(form){
        const inputs = form.querySelectorAll(validationConfig.inputSelector);
        const submitButton = form.querySelector(validationConfig.submitButtonSelector);
      
    inputs.forEach(function(input){
        input.addEventListener('input', function(){
        checkInputValidity(input, validationConfig);
        toggleButtonState(inputs, submitButton, validationConfig);
        })
        });
      
        toggleButtonState(inputs, submitButton, validationConfig);
      });
}

// Функция переключения кнопки submit
function toggleButtonState(inputs, submitButton, validationConfig) {
    const isValid = Array.from(inputs).every(function(input){
        return input.validity.valid;
    })

    if(isValid) {
        submitButton.disabled = false;
        submitButton.classList.remove(validationConfig.inactiveButtonClass);
    }else{
        submitButton.disabled = true;
        submitButton.classList.add(validationConfig.inactiveButtonClass);
    }
}

//функция очистки формы после закрытия
function clearValidation (form, validationConfig) {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);

    inputs.forEach(function(input){
        hideInputError(input, validationConfig);
        submitButton.disabled = true;
        submitButton.classList.add(validationConfig.inactiveButtonClass);
    })    
} 