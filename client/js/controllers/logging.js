import { hideLogBoxService, showLogBoxService } from "../service/logging.service.js"

const feeling = document.getElementById("emotion-log-input")
const thought = document.getElementById("thought-log-input")

const addLogBtn = document.getElementById("add-log-btn")
const exitLogBtn = document.getElementById("log-exit-button")

function init(){

addLogBtn.addEventListener("click" , handleShowLogBox)
exitLogBtn.addEventListener("click" , handleHideLogBox)

}

function handleShowLogBox(){
    showLogBoxService()
}

function handleHideLogBox(){
    hideLogBoxService()
}

init()

