const parentLogBox = document.querySelector(".parent-log-box")

function  showLogBoxService(){

    parentLogBox.classList.remove('hidden')

}

function hideLogBoxService(){
    parentLogBox.classList.add('hidden')
}

export {showLogBoxService , hideLogBoxService}