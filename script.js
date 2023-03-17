const vandalCarrousel = document.querySelector('.vandal--carrousel')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let skins = []
let page = 0

const MIN_PAGE = 0
const MAX_PAGE = 43

btnPrev.addEventListener('click', () => {
    if (page === 0) {
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
























