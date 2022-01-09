"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://httpbin.org/post";
  const customerForm = document.querySelector(".customer-form");
  const messageContainer = document.querySelector(".message-container");
  const cardInput = document.querySelector(".card");

  customerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { target } = event;
    const inputsArray = [...target.querySelectorAll(".req")];
    let isValid = doValidate(inputsArray);
    if (isValid) {
      const dataForm = inputsArray.reduce((acc, element) => {
        acc[element.name] = element.value;
        return acc;
      }, {});
      sendDataToServer(url, dataForm);
    }
  });

  const doValidate = function (inputs) {
    let validationState = true;
    const errorArray = [...document.querySelectorAll(".tips-container")];
    deleteErrorTips(errorArray);

    inputs.forEach((element) => {
      let elementClassList = element.classList;
      elementClassList.remove("error");
      if (elementClassList.contains("card")) {
        if (!isCardValid(element.value)) {
          validationState = false;
          addInputErrorClassList(element);
          element.nextElementSibling.classList.add("show");
        }
      }
      if (elementClassList.contains("email")) {
        if (!isEmailValid(element.value)) {
          validationState = false;
          addInputErrorClassList(element);
          element.nextElementSibling.classList.add("show");
        }
      }
      if (elementClassList.contains("phone")) {
        if (!isPhoneNumberValid(element.value)) {
          validationState = false;
          addInputErrorClassList(element);
          element.nextElementSibling.classList.add("show");
        }
      }
      if (elementClassList.contains("name")) {
        if (!isNameValid(element.value)) {
          validationState = false;
          addInputErrorClassList(element);
          element.nextElementSibling.classList.add("show");
        }
      }
    });

    return validationState;
  };

  const isNameValid = function (name) {
    const regExp = /^([A-Z]|[А-Я])([a-z]|[а-я])+$/;
    return regExp.test(name);
  };

  const isPhoneNumberValid = function (phoneNumber) {
    const regExp = /^(\+380)\d{9}$/;
    return regExp.test(phoneNumber);
  };

  const isEmailValid = function (email) {
    const regExp =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regExp.test(email);
  };

  const isCardValid = function (cardNumber) {
    const regExp = /^\d{16}$/;
    return regExp.test(cardNumber);
  };

  const addInputErrorClassList = function (input) {
    input.classList.add("error");
  };

  const sendDataToServer = async function (baseUrl, data) {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (parseInt(response.status / 100) === 2) {
        showMessage("Form has been sent!", messageContainer);
      }
    } catch (error) {
      showMessage(`Something went wrong error!`, messageContainer);
    }
  };

  const showMessage = function (messageText, messageBlock) {
    messageBlock.firstChild.innerHTML = "";
    messageBlock.firstChild.textContent = messageText;
    messageBlock.classList.add("show");
    setTimeout(() => {
      messageBlock.classList.remove("show");
    }, 5000);
  };

  const deleteErrorTips = function (elementArray) {
    elementArray.forEach((element) => {
      element.classList.remove("show");
    });
  };
});
