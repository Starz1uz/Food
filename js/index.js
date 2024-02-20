let open_buttons = document.querySelectorAll('[data-modal]')
let close_buttons = document.querySelectorAll('[data-close]')
let modal = document.querySelector('.modal')


function open_close_modal(arr, open) {
    arr.forEach(button => {
        button.onclick = () => {
            modal.classList[open ? "add" : "remove"]('show', 'fade')
            document.body.style.overflow = open ? "hidden" : "scroll"
        }
    })
}

open_close_modal(open_buttons, true)
open_close_modal(close_buttons, false)


const slides = document.querySelectorAll('.offer__slide')
const next_button = document.querySelector('.offer__slider-next')
const prev_button = document.querySelector('.offer__slider-prev')
const current = document.querySelector('#current')
const total = document.querySelector('#total')

let slidesIndex = 0
total.innerHTML = slides.length < 10 ? `0${slides.length}` : slides.length

slidesShow()

function slidesShow(n) {
    if (n >= slides.length) {
        slidesIndex = 0
    }

    if (n < 0) {
        slidesIndex = slides.length - 1
    }


    slides.forEach(slide => slide.classList.add('hide', 'fade'))
    slides[slidesIndex].classList.remove('hide')

    current.innerHTML = slidesIndex + 1 < 10 ? `0${slidesIndex + 1}` : slidesIndex + 1
}


next_button.onclick = () => {
    slidesIndex++
    slidesShow(slidesIndex)
}
prev_button.onclick = () => {
    slidesIndex--
    slidesShow(slidesIndex)
}

const tab_btns = document.querySelectorAll('.tabheader__item')
const tabcontent = document.querySelectorAll('.tabcontent')


function showTabs(idx) {
    tabcontent.forEach(slide => slide.classList.add('hide', 'fade'))
    tabcontent[idx].classList.remove('hide')
}
showTabs(0)

tab_btns.forEach((btn, idx) => {
    btn.onclick = () => {
        tab_btns.forEach(el => el.classList.remove('tabheader__item_active'))
        btn.classList.add('tabheader__item_active')
        showTabs(idx)
    }
})



let user = {
    gender: 'woman'
}

const gender_btns = document.querySelectorAll('#gender div')
const inputs = document.querySelectorAll('.calculating__choose_medium input')
const cardio_btns = document.querySelectorAll('.calculating__choose_big div')
const result_view = document.querySelector('#result_view')



gender_btns.forEach(btn => {
    btn.onclick = () => {
        gender_btns.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

        user.gender = btn.getAttribute('data-g')
    }
})

inputs.forEach(inp => {
    inp.oninput = () => {
        user[inp.id] = inp.value
    }
})


cardio_btns.forEach(btn => {
    btn.onclick = () => {
        cardio_btns.forEach(el => el.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

        let cardio = btn.getAttribute('data-cardio')

        if (user.gender === "woman") {
            let result = 655.1 + (9.563 * user.weight) + (1.85 * user.height) - (4.676 * user.age);

            result_view.innerHTML = Math.round(result * cardio)
        } else {
            let result = 66.5 + (13.75 * user.weight) + (5.003 * user.height) - (6.775 * user.age)

            result_view.innerHTML = Math.round(result * cardio)
        }
    }
})

// timer
const deadline = "2024-02-20 12:52"

function getRemainingTime(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date())
    const days = Math.floor((t / 1000) / 60 / 60 / 24)
    const hours = Math.floor((t / 1000) / 60 / 60 % 24)
    const minutes = Math.floor((t / 1000) / 60 % 60)
    const seconds = Math.floor((t / 1000) % 60)

    return {
        t,
        days,
        hours,
        minutes,
        seconds
    }
}

function setTimer(endTime, selector) {
    const t = document.querySelector(selector)
    const days = t.querySelector('#days')
    const hours = t.querySelector('#hours')
    const minutes = t.querySelector('#minutes')
    const seconds = t.querySelector('#seconds')
    const interval = setInterval(updateTimer, 1000)

    function updateTimer() {
        const t = getRemainingTime(endTime)

        if (t.t <= 0 -1) {
            clearInterval(interval)
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.6
                },
            });
            return
        }

        days.innerHTML = setNulls(t.days)
        hours.innerHTML = setNulls(t.hours)
        minutes.innerHTML = setNulls(t.minutes)
        seconds.innerHTML = setNulls(t.seconds)

        function setNulls(num) {
            return num < 10 ? `0${num}` : num
        }
    }

}

setTimer(deadline, '.timer')

