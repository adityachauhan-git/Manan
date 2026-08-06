import { addLogService, hideLogBoxService, showLogBoxService } from "../service/logging.service.js"

const feeling = document.getElementById("emotion-log-input")
const thought = document.getElementById("thought-log-input")

const addLogBtn = document.getElementById("add-log-btn")
const exitLogBtn = document.getElementById("log-exit-button")
const logBtn = document.querySelector(".log-submit-button")

function init(){

addLogBtn.addEventListener("click" , handleShowLogBox)
logBtn.addEventListener("click" , handleAddLog)
exitLogBtn.addEventListener("click" , handleHideLogBox)

}

function handleShowLogBox(){
    showLogBoxService()
}

function handleAddLog(){
    addLogService()
}

function handleHideLogBox(){
    hideLogBoxService()
}

init()

