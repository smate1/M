// HEADER SLIDER
document.addEventListener('DOMContentLoaded', () => {
	const slides = document.querySelectorAll('.header__item')
	const dots = document.querySelectorAll('.dot')
	const prevBtn = document.getElementById('prev')
	const nextBtn = document.getElementById('next')
	const headerSlider = document.querySelector('.header__slider')
	const backgroundsDesktop = [
		'./images/header-bg-1.png',
		'./images/header-bg-2.png',
		'./images/header-bg-3.jpg',
		'./images/header-bg-4.jpg',
	]

	const backgroundsMobile = [
		'./images/header-bg-mobile.png',
		'./images/header-bg-2.png',
		'./images/header-bg-3.jpg',
		'./images/header-bg-4.jpg',
	]

	function isMobile() {
		return window.innerWidth <= 650
	}

	function updateBackground(index) {
		const bgImage = isMobile()
			? backgroundsMobile[index]
			: backgroundsDesktop[index]
		nextBg.style.backgroundImage = `url('${bgImage}')`
		nextBg.classList.add('active')
		currentBg.classList.remove('active')

		// Перемикання
		const temp = currentBg
		currentBg = nextBg
		nextBg = temp
	}


	const bg1 = document.getElementById('bg1')
	const bg2 = document.getElementById('bg2')

	let currentBgIndex = 0
	let currentBg = bg1
	let nextBg = bg2




	let currentIndex = 0
	let isSwiping = false

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index)
			dots[i].classList.toggle('active', i === index)
		})
		updateBackground(index)
		currentIndex = index
	}



	showSlide(currentIndex)

	nextBtn.addEventListener('click', () => {
		const newIndex = (currentIndex + 1) % slides.length
		showSlide(newIndex)
	})

	prevBtn.addEventListener('click', () => {
		const newIndex = (currentIndex - 1 + slides.length) % slides.length
		showSlide(newIndex)
	})

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			showSlide(Number(dot.dataset.index))
		})
	})

	// Улучшенная поддержка touch-событий
	let touchStartX = 0
	let touchEndX = 0

	headerSlider.addEventListener(
		'touchstart',
		e => {
			touchStartX = e.changedTouches[0].screenX
			isSwiping = true
		},
		{ passive: true }
	)

	headerSlider.addEventListener(
		'touchmove',
		e => {
			if (!isSwiping) return

			// Для header__slider не добавляем визуальную трансформацию,
			// так как слайды меняются через классы, а не CSS transform
		},
		{ passive: true }
	)

	headerSlider.addEventListener('touchend', e => {
		if (!isSwiping) return

		isSwiping = false
		touchEndX = e.changedTouches[0].screenX
		const swipeDistance = touchEndX - touchStartX

		if (Math.abs(swipeDistance) > 50) {
			// Минимальное расстояние для свайпа
			if (swipeDistance > 50) {
				// Свайп вправо - предыдущий слайд
				const newIndex = (currentIndex - 1 + slides.length) % slides.length
				showSlide(newIndex)
			} else if (swipeDistance < -50) {
				// Свайп влево - следующий слайд
				const newIndex = (currentIndex + 1) % slides.length
				showSlide(newIndex)
			}
		}
	})

	headerSlider.addEventListener('touchcancel', () => {
		isSwiping = false
	})
})
window.addEventListener('DOMContentLoaded', () => {
	const fadeInElements = document.querySelectorAll('.fade-in')
	const sliderElements = document.querySelectorAll('.fade-in-slider')

	// Звичайна поява
	fadeInElements.forEach((el, index) => {
		setTimeout(() => {
			el.classList.add('visible')
		}, index * 200)
	})

	// Слайдова поява справа
	sliderElements.forEach((el, index) => {
		setTimeout(() => {
			el.classList.add('visible-slider')
		}, index * 200)
	})
})

window.addEventListener('DOMContentLoaded', () => {
	const slideItem = document.querySelector('.slide-in-right')
	if (slideItem) {
		setTimeout(() => {
			slideItem.classList.add('visible')
		}, 300) // Трохи затримки — виглядає краще
	}
})
document.addEventListener('DOMContentLoaded', () => {
	const animatedElems = document.querySelectorAll(
		'.scroll-animate-left, .scroll-animate-right, .scroll-animate-up, .map-animate'
	)

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible')
					obs.unobserve(entry.target) // анімація один раз
				}
			})
		},
		{
			threshold: 0.3, // коли 30% видно — запускаємо
		}
	)

	animatedElems.forEach(elem => observer.observe(elem))
})
document.addEventListener('DOMContentLoaded', () => {
	const processItems = document.querySelectorAll('.process__item')

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					processItems.forEach((item, index) => {
						setTimeout(() => {
							item.classList.add('visible')
						}, index * 200) // затримка 200мс між кожним
					})
					obs.disconnect() // тільки один раз
				}
			})
		},
		{
			threshold: 0.3,
		}
	)

	if (processItems.length) {
		observer.observe(processItems[0])
	}
})

document.addEventListener('DOMContentLoaded', function () {
	const burger = document.getElementById('burger')
	const header = document.getElementById('header') // змінено з querySelector('.header')
	const closeBtn = document.getElementById('burger-menu')
	const menuLinks = document.querySelectorAll('.mobile__menu a')
	const body = document.body

	function toggleMenu() {
		header.classList.toggle('open')
		body.classList.toggle('no-scroll')
	}

	burger.addEventListener('click', toggleMenu)

	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			header.classList.remove('open')
			body.classList.remove('no-scroll')
		})
	}

	menuLinks.forEach(link => {
		link.addEventListener('click', () => {
			header.classList.remove('open')
			body.classList.remove('no-scroll')
		})
	})
})


// QUALITY SLIDER
document.addEventListener('DOMContentLoaded', () => {
	const qualityTrack = document.querySelector('.quality__items')
	const qualityItems = document.querySelectorAll('.quality__item')
	const qualityDotsContainer = document.querySelector('.quality-slider-dots')
	const qualityPrev = document.getElementById('quality-prev')
	const qualityNext = document.getElementById('quality-next')

	let visibleCount = getVisibleCount()
	let currentSlide = 0

	function getVisibleCount() {
		const width = window.innerWidth
		if (width <= 450) return 2
		if (width <= 650) return 3
		return 4
	}

	// Завжди створюємо 4 точки
	function createDots() {
		const existingDots = qualityDotsContainer.querySelectorAll('.quality-dot')
		existingDots.forEach(dot => dot.remove())

		for (let i = 0; i < 4; i++) {
			const dot = document.createElement('span')
			dot.classList.add('quality-dot')
			dot.dataset.index = i

			if (i === currentSlide) {
				dot.classList.add('quality-active')
			}

			qualityDotsContainer.insertBefore(dot, qualityNext)
		}
	}

	function showQualitySlide(index) {
		const maxIndex = 3 // бо 4 точки
		if (index < 0) index = 0
		if (index > maxIndex) index = maxIndex

		currentSlide = index

		const percent = (100 / visibleCount) * currentSlide
		qualityTrack.style.transform = `translateX(-${percent}%)`

		const dots = qualityDotsContainer.querySelectorAll('.quality-dot')
		dots.forEach((dot, i) => {
			dot.classList.toggle('quality-active', i === currentSlide)
		})

		qualityItems.forEach((item, i) => {
			item.classList.toggle('active', i === index)
		})
	}

	function updateSlider() {
		visibleCount = getVisibleCount()
		showQualitySlide(currentSlide)
	}

	createDots()
	showQualitySlide(0)

	qualityNext.addEventListener('click', () => {
		const newIndex = currentSlide < 3 ? currentSlide + 1 : 0
		showQualitySlide(newIndex)
	})

	qualityPrev.addEventListener('click', () => {
		const newIndex = currentSlide > 0 ? currentSlide - 1 : 3
		showQualitySlide(newIndex)
	})

	qualityDotsContainer.addEventListener('click', e => {
		if (e.target.classList.contains('quality-dot')) {
			const index = Number(e.target.dataset.index)
			showQualitySlide(index)
		}
	})

	let startX = 0
	let endX = 0
	let isSwiping = false

	qualityTrack.addEventListener(
		'touchstart',
		e => {
			startX = e.touches[0].clientX
			isSwiping = true
			qualityTrack.classList.add('swiping')
		},
		{ passive: true }
	)

	qualityTrack.addEventListener(
		'touchmove',
		e => {
			if (!isSwiping) return
			const currentX = e.touches[0].clientX
			const diff = currentX - startX

			if (Math.abs(diff) > 10) {
				e.preventDefault()
			}

			const currentOffset = (100 / visibleCount) * currentSlide
			let newOffset =
				currentOffset - (diff * 0.5) / (qualityTrack.offsetWidth / 100)
			const maxOffset = (100 / visibleCount) * 3

			if (newOffset < 0) newOffset = 0
			if (newOffset > maxOffset) newOffset = maxOffset

			qualityTrack.style.transform = `translateX(-${newOffset}%)`
		},
		{ passive: false }
	)

	qualityTrack.addEventListener('touchend', e => {
		if (!isSwiping) return
		isSwiping = false
		qualityTrack.classList.remove('swiping')

		endX = e.changedTouches[0].clientX
		const delta = endX - startX

		if (Math.abs(delta) > 50) {
			if (delta > 0 && currentSlide > 0) {
				showQualitySlide(currentSlide - 1)
			} else if (delta < 0 && currentSlide < 3) {
				showQualitySlide(currentSlide + 1)
			} else {
				showQualitySlide(currentSlide)
			}
		} else {
			showQualitySlide(currentSlide)
		}
	})

	qualityTrack.addEventListener('touchcancel', () => {
		isSwiping = false
		qualityTrack.classList.remove('swiping')
		showQualitySlide(currentSlide)
	})

	window.addEventListener('resize', updateSlider)
})

