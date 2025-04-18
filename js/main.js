const slides = document.querySelectorAll('.header__item')
const dots = document.querySelectorAll('.dot')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

let currentIndex = 0

function showSlide(index) {
	slides.forEach((slide, i) => {
		slide.classList.toggle('active', i === index)
		dots[i].classList.toggle('active', i === index)
	})
	currentIndex = index
}

// Початковий показ
showSlide(currentIndex)

// Стрілки
nextBtn.addEventListener('click', () => {
	let newIndex = (currentIndex + 1) % slides.length
	showSlide(newIndex)
})

prevBtn.addEventListener('click', () => {
	let newIndex = (currentIndex - 1 + slides.length) % slides.length
	showSlide(newIndex)
})

// Кліки по точках
dots.forEach(dot => {
	dot.addEventListener('click', () => {
		showSlide(Number(dot.dataset.index))
	})
})

// SWIPE для мобільних
let touchStartX = 0
let touchEndX = 0

const slider = document.querySelector('.header__slider')

slider.addEventListener('touchstart', e => {
	touchStartX = e.changedTouches[0].screenX
})

slider.addEventListener('touchend', e => {
	touchEndX = e.changedTouches[0].screenX
	handleSwipe()
})

function handleSwipe() {
	const swipeThreshold = 50
	const swipeDistance = touchEndX - touchStartX

	if (swipeDistance > swipeThreshold) {
		// Swipe right
		let newIndex = (currentIndex - 1 + slides.length) % slides.length
		showSlide(newIndex)
	} else if (swipeDistance < -swipeThreshold) {
		// Swipe left
		let newIndex = (currentIndex + 1) % slides.length
		showSlide(newIndex)
	}
}
