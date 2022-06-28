let sliderWrap = document.querySelector('.infinite-scroll');
let infiniteScroll = document.querySelector('.infinite-scroll');
let slider = document.querySelector('.scroll');
let clonesWidth;
let sliderWidth;
let clones=[];

let disableScroll = false;
let scrollPos;

let items = [...document.querySelectorAll('.scroll-item')];
console.log(items);
let images = [...document.querySelectorAll('.scroll-image')];
console.log(images);

images.forEach((image, idx)=>{
    image.style.backgroundImage = `url(../resources/img/infiniteScrollImages/${idx+1}.jpg)`
})

items.forEach(item =>{
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
})
console.log(clones)

function getClonesWidth(){
    let width = 0;
    clones.forEach(clone =>{
        width += clone.offsetWidth;
    })
    return width;
}

function getScrollPos(){
    return window.scrollY;
}

function scrollUpdate(){
    scrollPos = getScrollPos();
    if(clonesWidth + scrollPos >= sliderWidth){
        window.scrollTo({top:1});
    }else if(scrollPos <= 0){
        window.scrollTo({top:sliderWidth-clonesWidth-1})
    }

    slider.style.transform = `translateX(${-window.scrollY}px)`

    requestAnimationFrame(scrollUpdate);
}

function onLoad(){
    calculate();
    document.body.style.height = `${sliderWidth}px`;
    window.scrollTo({top:1});
    scrollUpdate();
}

function calculate(){
    sliderWidth = slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();
}

onLoad()