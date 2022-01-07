"use strict"

document.addEventListener('DOMContentLoaded', ()=>{
  const url = 'https://httpbin.org/post'
  const customerForm = document.querySelector('.customer-form')
  const messageContainer = document.querySelector('.message-container')
  customerForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const {target}= event
    const inputsArray = [...target.querySelectorAll('.req')]
    let isValid = doValidate(inputsArray)
    if(isValid){
      const dataForm = inputsArray.reduce((acc, element)=>{
        acc[element.name]= element.value
        return acc
      }, {})
      sendDataToServer(url, dataForm)

    }

  })
    
  

  const doValidate = function(inputs){
    let validationState = true;

    inputs.forEach((element)=>{
      let elementClassList = element.classList;
      elementClassList.remove('error')
      if(elementClassList.contains('card')){
        if(!isCardValid(element.value)){
          validationState = false;
          addInputErrorClassList(element)
          showMessage('Please input the correct card number. Length must be 16 numbers', messageContainer)
        }
      }
      if(elementClassList.contains('email')){
        if(!isEmailValid(element.value)){
          validationState = false;
          addInputErrorClassList(element)
          showMessage('Please input the correct email', messageContainer)
        }
      }
      if(elementClassList.contains('phone')){
        if(!isPhoneNumberValid(element.value)){
          validationState= false;
          addInputErrorClassList(element)
          showMessage('Please input your number follow the format: +380---------', messageContainer)
        }
      }
      if(elementClassList.contains('name')){
        if(!isNameValid(element.value)){
          validationState = false;
          addInputErrorClassList(element)
          showMessage('Please write you name with first capital letter and with the length more then 1 symbol', messageContainer)
        }
      }
    })

    return validationState
  }


  const isNameValid = function(name){
    const regExp = /^[A-Z][a-z]+?/
    return regExp.test(name)
  }

  const isPhoneNumberValid= function(phoneNumber){
    const regExp = /^(\+380)\d{9}$/
    return regExp.test(phoneNumber)
  }

  const isEmailValid = function(email){
    const regExp = /^\w+?[\.-\w]+?@\w+?\.[a-zA-z]+/
    return regExp.test(email)
  }

  const isCardValid = function(cardNumber){
    const regExp = /^\d{16}$/
    return regExp.test(cardNumber)
  }

  const addInputErrorClassList = function(input){
    input.classList.add('error')
  }

  const sendDataToServer = async function(baseUrl, data){
    try{
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json'
      }
    })

    if(parseInt(response.status/100) === 2){
      showMessage('You have just sent your form!', messageContainer)
    }

  } catch(error) {
    showMessage(`Something went wrong error!`, messageContainer)
  }
  }

  const showMessage = function(messageText, messageBlock){
    messageBlock.firstChild.innerHTML = ''
    messageBlock.firstChild.textContent = messageText
    messageBlock.classList.add('show')
    setTimeout(()=>{messageBlock.classList.remove('show')}, 5000)
  }
})
