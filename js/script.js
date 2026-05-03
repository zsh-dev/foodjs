const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabcontainer'),
    modalBtns = document.querySelectorAll('[data-modal]'),
    modalCLose = document.querySelector('[data-modal-close]'),
    modal = document.querySelector('.modal'),
    orderSection = document.querySelector('.order');

function hideTabs() {
    tabs.forEach(item => item.classList.remove('tabheader__item_active'));
    tabsContent.forEach(item => {
        item.classList.remove('show');
        item.classList.add('hide')
    })
}


function showTabs(i = 0) {
    tabs[i].classList.add('tabheader__item_active');
    tabsContent[i].classList.add('show');
    tabsContent[i].classList.remove('hide')

}

hideTabs();
showTabs();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target === item) {
                hideTabs();
                showTabs(i);
            }
        })

    }
})

function showModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modalBtns.forEach(item => {
    item.addEventListener('click', showModal);
})



modalCLose.addEventListener('click', closeModal)
modal.addEventListener('click', ({
    target
}) => {
    if (target == modal) closeModal();
})
document.body.addEventListener('keydown', ({
    key
}) => {
    if (key === 'Escape' && modal.classList.contains('show')) closeModal();
})

class Card {
    constructor(image, altimg, title, descr, price, ...classes) {
        this.image = image;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
    }
    addCard() {
        document.querySelector('.menu__field .container').insertAdjacentHTML('beforeend', `<div class="${this.classes}">
                    <img src="${this.image}" alt="${this.altimg}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>`)
    }
}



// const getData = async (url) => {
//     let res = await fetch(url);
//     if (!res.ok) {
//         throw new Error("aaa");

//     }
//     return (await res).json();
// }

// getData('http://localhost:3000/menu')
//     .then(res => {
//         res.forEach(({img, altimg, title, descr, price}) => {
//            new Card(img, altimg, title, descr, price, 'menu__item menu__item2').addCard()
//         })
//     })




const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
    }

    return await res.json();
}
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        // const formBody = new FormData(form);
        // const json = JSON.stringify(Object.fromEntries(formBody.entries()));
        // postData('http://localhost:3000/requests', json)
        //     .then(res => console.log(res))
        //     .finally(() => form.reset())
        const formBody = new FormData(form);
        console.log(formBody);

    })
})

const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next');

let slidesIndex = 1;
showSlides(slidesIndex)
function showSlides(n) {
    if (n > slides.length) {
        slidesIndex = 1;
    }
    if (n < 1) {
        slidesIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none');

    slides[slidesIndex - 1].style.display = 'block';

}

function plusSlides(n) {
    showSlides(slidesIndex += n);
}
prev.addEventListener('click', () => {
    plusSlides(-1)
})
next.addEventListener('click', () => {
    plusSlides(1)
})