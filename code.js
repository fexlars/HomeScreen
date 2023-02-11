console.log("Hello, world!")

const bid = (id) => { return document.getElementById(id) }

const editBTN = bid('editBTN')
const secret = bid('secret')
const container = bid('container')

// detect if localstorage settings are Set, if not, set them to default
if (localStorage.getItem('settings') === null) {
    localStorage.setItem('settings', JSON.stringify({
        'custom': {
            'bgColor': '#2b2b2b',
            'containerColor': '#333333',
            'textColor': '#ffffff',
            'borderColor': '#6e6d6d',
            'borderWidth': '4px',
            'fontSize': '16px',
            'fontFamily': 'sans-serif'
        },
        'bookmarks': [
            {
                'name': 'Google',
                'url': 'https://google.com'
            },
            {
                'name': 'YouTube',
                'url': 'https://youtube.com'
            },
            {
                'name': 'GitHub',
                'url': 'https://github.com'
            }
        ]
    }))
}

// get settings from localstorage, then apply the styles to the container and the body
const settings = JSON.parse(localStorage.getItem('settings'))

container.style.backgroundColor = settings.custom.containerColor
container.style.borderColor = settings.custom.borderColor
container.style.borderWidth = settings.custom.borderWidth

document.body.style.color = settings.custom.textColor
document.body.style.backgroundColor = settings.custom.bgColor
document.body.style.fontFamily = settings.custom.fontFamily

// apply bookmarks to the container 
settings.bookmarks.forEach((bookmark) => {
    const a = document.createElement('a')
    a.setAttribute('href', bookmark.url)
    a.innerText = bookmark.name
    container.appendChild(a)
})

// when edit mode is enabled, the secret div is shown, and give the option to delete and create new bookmarks
editBTN.addEventListener('click', () => {
    const bool = secret.style.visibility === 'hidden' ? 'visible' : 'hidden'
    secret.style.visibility = bool
})

// delete bookmarks
const deleteBTN = bid('deleteBTN')
deleteBTN.addEventListener('click', () => {
    const name = bid('name').value
    const url = bid('url').value

    const index = settings.bookmarks.findIndex((bookmark) => {
        return bookmark.name === name && bookmark.url === url
    })

    settings.bookmarks.splice(index, 1)

    localStorage.setItem('settings', JSON.stringify(settings))

    location.reload()
})

// create new bookmarks
const createBTN = bid('createBTN')
createBTN.addEventListener('click', () => {
    const name = bid('name').value
    const url = bid('url').value

    settings.bookmarks.push({
        'name': name,
        'url': url
    })

    localStorage.setItem('settings', JSON.stringify(settings))

    location.reload()
})