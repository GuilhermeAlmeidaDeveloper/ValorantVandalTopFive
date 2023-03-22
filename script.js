const vandalCarrousel = document.querySelector('.vandal--carrousel')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
const videoHighlight = document.querySelector('.video--highlight')
const availableChromas = document.querySelector('.available-chromas')
const skinDisponivel = document.querySelector('.vandal-color-available')
const vandalVideo = document.querySelector('.vandal--video')
const btnSelector = document.querySelector('#btn-selector')
const vandalNameInTitle = document.querySelector('#title')
const availableTitleSkins = document.querySelector('.available-title')
const videoMsg = document.querySelector('#video-msg')
const allAvailableChromas = document.querySelectorAll('.vandal-color-available')
const conteinerTop5 = document.querySelector('.conteiner-top5')
const top5 = document.querySelector('.top-5')
const btnDone = document.querySelector('.done')
const top5sentence = document.querySelector('.top5-sentence')
const btnExcluir = document.querySelector('.btn--excluir')
const vandalSelectedTxt = document.querySelector('.vandal--selected')


let skins = []
let skin = null
let chromaSelected = null
let page = 0

const MIN_PAGE = 0
const MAX_PAGE = 45

btnPrev.addEventListener('click', () => {
    if (page <= 0 || page <= 3) {
        page = MAX_PAGE;
        filterVandal()
        return
    }
    page -= 5;
    filterVandal()
});

btnNext.addEventListener('click', () => {
    if (page >= MAX_PAGE) {
        page = MIN_PAGE
        filterVandal()
        return
    }
    page += 5
    filterVandal()
})


function filterVandal() {


    vandalCarrousel.innerHTML = ''

    vandalsData = skins.filter((item) => item.displayName.includes('Vandal') && item.displayIcon)

    for (let i = page; i < page + 5; i++) {
        const vandal = vandalsData[i];

        const vandalThumb = document.createElement('div')
        vandalThumb.classList.add('vandal--thumb')
        vandalThumb.style.backgroundImage = `url(${vandal.displayIcon})`
        vandalThumb.onclick = function () {

            vandalSelectedTxt.style.display = 'block';
            skin = vandal

            availableChromas.innerHTML = ''

            vandalNameInTitle.innerHTML = vandal.displayName;

            availableTitleSkins.innerHTML = 'CHOOSE YOUR FAVOURITE SKIN COLOR:'
            availableTitleSkins.style.fontSize = '20px'
            availableTitleSkins.style.marginTop = '10px'


            const skinVideo = document.createElement('video')
            skinVideo.setAttribute('src', skin.levels[skin.levels.length - 1].streamedVideo)
            skinVideo.setAttribute('width', '615px')
            skinVideo.setAttribute('height', '500px')
            skinVideo.setAttribute('allow', 'autoplay')
            skinVideo.setAttribute('frameborder', '0')
            skinVideo.setAttribute('controls', '1')
            skinVideo.setAttribute('autoplay', 'yes')
            skinVideo.muted = true

            for (const chroma of skin.chromas) {
                const skinDisponivel = document.createElement('div')
                skinDisponivel.classList.add('vandal-color-available')
                skinDisponivel.setAttribute('id', chroma.uuid)
                skinDisponivel.style.backgroundImage = `url(${chroma.displayIcon || chroma.fullRender || skin.displayIcon})`;


                skinDisponivel.onclick = function mostrarVideo() {
                    chromaSelected = chroma;
                    btnSelector.style.display = 'block';


                    // visualizar video
                    vandalVideo.innerHTML = ''

                    if (chroma.streamedVideo === null && skin.levels[skin.levels.length - 1].streamedVideo === null) {
                        skinVideo.style.display = 'none'
                        vandalVideo.innerHTML = 'NO VANDAL VIDEO AVAILABLE :('
                        vandalVideo.style.fontSize = '20px'

                    } else {
                        skinVideo.setAttribute('src', chroma.streamedVideo || skin.levels[skin.levels.length - 1].streamedVideo)
                        vandalVideo.appendChild(skinVideo)
                    }


                    // alterar selected
                    const allAvailableChromas = document.querySelectorAll('.vandal-color-available')

                    for (const iterator of allAvailableChromas) {
                        iterator.classList.remove('selected')
                    } skinDisponivel.classList.add('selected')



                }
                availableChromas.appendChild(skinDisponivel)


            }



        };
        vandalCarrousel.appendChild(vandalThumb);


    }



}


btnSelector.addEventListener('click', () => {

    top5sentence.innerHTML = 'Here are your top five vandals:'
    top5sentence.style.fontSize = '15px'

    let rank = 1

    const skinDisponivel = document.querySelector('.vandal-color-available')
    const selecioanda = document.querySelector('.selected')
    const ranking = document.createElement('div')
    const vandalName = document.createElement('div')
    const btnExcluir = document.createElement('button')
    const rPosition = document.createElement('div')

    ranking.classList.add('tops')
    vandalName.classList.add('vandal--name')
    btnExcluir.classList.add('btn--excluir')
    rPosition.classList.add('rank-position')

    ranking.style.backgroundImage = `url(${chromaSelected.fullRender || chromaSelected.displayIcon})`;
    vandalName.innerHTML = skin.displayName
    btnExcluir.innerHTML = 'x'
    rPosition.innerHTML = rank

    selecioanda.classList.remove('selected')
    btnSelector.style.display = 'none';

    console.log(skinDisponivel);
    const allSkinsTop = document.querySelectorAll('.tops')

    if (allSkinsTop.length < 5) {


        conteinerTop5.appendChild(ranking)
        // ranking.appendChild(rPosition)
        ranking.appendChild(vandalName)
        vandalName.appendChild(btnExcluir)



    }

    if (allSkinsTop.length == 4) {
        btnDone.style.display = 'block'


    }

    btnExcluir.addEventListener('click', () => {
        conteinerTop5.removeChild(ranking)
        refreshDoneBtn()
    })



})

function refreshDoneBtn() {
    const allSkinsTop = document.querySelectorAll('.tops')
    if (allSkinsTop.length < 5) {
        btnDone.style.display = 'none'
    } else {
        btnDone.style.display = 'block'
    }
}

btnDone.addEventListener('click', () => {
    const rnkSkins = document.querySelector('.ranking--skins')
    rnkSkins.print()
})

async function loadSkins() {
    const { data } = await api.get('v1/weapons/skins')
    const list = data.data;
    skins = list

    filterVandal()
}

loadSkins()


























