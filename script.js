const vandalCarrousel = document.querySelector('.vandal--carrousel')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')
const videoHighlight = document.querySelector('.video--highlight')
const availableChromas = document.querySelector('.available-chromas')
const skinDisponivel = document.querySelector('.vandal-color-available')
const vandalVideo = document.querySelector('.vandal--video')
const btnSelector = document.querySelector('.selector')
const vandalNameInTitle = document.querySelector('#title')
const availableTitleSkins = document.querySelector('.available-title')

let skins = []
let skin = null
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
        console.log(page);

        const vandalThumb = document.createElement('div')
        vandalThumb.classList.add('vandal--thumb')
        vandalThumb.style.backgroundImage = `url(${vandal.displayIcon})`
        vandalThumb.onclick = function () {

            availableTitleSkins.innerHTML = 'CHOOSE YOUR FAVOURITE SKIN COLOR:'
            availableTitleSkins.style.fontSize = '20px'
            availableTitleSkins.style.marginTop = '10px'

            vandalNameInTitle.innerHTML = vandal.displayName

            btnSelector.style.display = 'block'

            skin = vandal

            availableChromas.innerHTML = ''
            vandalVideo.innerHTML = ''




            const skinVideo = document.createElement('video')
            skinVideo.setAttribute('src', skin.levels[skin.levels.length - 1].streamedVideo)
            skinVideo.setAttribute('width', '615px')
            skinVideo.setAttribute('height', '500px')
            skinVideo.setAttribute('allow', 'autoplay')
            skinVideo.setAttribute('frameborder', '0')
            skinVideo.setAttribute('controls', '1')
            skinVideo.setAttribute('autoplay', 'yes')
            skinVideo.muted = true



            vandalVideo.appendChild(skinVideo)




            for (const chroma of skin.chromas) {
                const skinDisponivel = document.createElement('div')
                skinDisponivel.classList.add('vandal-color-available')
                skinDisponivel.style.backgroundImage = `url(${chroma.displayIcon || chroma.fullRender || skin.displayIcon})`

                skinDisponivel.onclick = function mostrarVideo() {


                    if (chroma.streamedVideo === null && skin.levels[skin.levels.length - 1].streamedVideo === null) {
                        skinVideo.style.display = 'none'
                        vandalVideo.innerHTML = 'NO VANDAL VIDEO AVAILABLE :('
                        vandalVideo.style.fontSize = '20px'

                    } else {
                        skinVideo.setAttribute('src', chroma.streamedVideo || skin.levels[skin.levels.length - 1].streamedVideo)
                    }



                }

                availableChromas.appendChild(skinDisponivel)
            }


        };
        vandalCarrousel.appendChild(vandalThumb);
    }




}


async function loadSkins() {
    const { data } = await api.get('v1/weapons/skins')
    const list = data.data;
    skins = list

    filterVandal()
}

loadSkins()


























