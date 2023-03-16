const vandalCarrousel = document.querySelector('.vandal--carrousel')

let skins = []


function filterVandal() {
    vandalCarrousel.innerHTML = ''

    for (const vandal of skins.filter((item) => item.displayName.includes('Vandal'))) {
        const vandalThumb = document.createElement('div')
        vandalThumb.classList.add('vandal--thumb')
        vandalThumb.style.backgroundImage = `url(${vandal.displayIcon})`
        vandalCarrousel.appendChild(vandalThumb)

    }

}
async function loadSkins() {
    const { data } = await api.get('v1/weapons/skins')
    const list = data.data;
    skins = list

    filterVandal()
}

loadSkins()
























