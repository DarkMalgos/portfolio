document.querySelector('#burger').addEventListener('click', function () {
    let menu = document.querySelector('#menu')
    menu.parentNode.style.height = '100vh'
    menu.style.display = 'flex'
})

function smooth_scroll(anchor) {
    console.log(anchor)
    document.querySelector(anchor).scrollIntoView({
        behavior: 'smooth'
    });
}
let spans = document.querySelectorAll('#menu span')
for (let span of spans) {
    span.addEventListener('click', function () {
        console.log('span clicked')
        smooth_scroll(span.getAttribute('data-scroll'))
        document.querySelector('#menu').style.display = 'none'
        document.querySelector('#menu').parentNode.style.height = '100px'
    })
}