async function loadVandals() {
    const { data } = await api.get('v1/weapons/skins')
    const list = data.data

    const vandals = []

    for (let i = 0; i < list.length; i++) {
        if (list[i].displayName.includes('Vandal') == true) {
            vandals.push(list[i])
        }
    }
    console.log(vandals);
}

loadVandals()