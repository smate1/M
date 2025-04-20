// HEADER SLIDER
document.addEventListener('DOMContentLoaded', () => {
	const slides = document.querySelectorAll('.header__item')
	const dots = document.querySelectorAll('.dot')
	const prevBtn = document.getElementById('prev')
	const nextBtn = document.getElementById('next')
	const headerSlider = document.querySelector('.header__slider')
	let currentIndex = 0
	let isSwiping = false

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index)
			dots[i].classList.toggle('active', i === index)
		})
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
	const header = document.querySelector('.header')
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
	const qualityPrev = document.getElementById('quality-prev') // Updated ID selector
	const qualityNext = document.getElementById('quality-next') // Updated ID selector

	const visibleCount = 4 // Показываем 4 фото одновременно
	const totalSlides = qualityItems.length
	const maxDots = Math.min(4, Math.ceil(totalSlides / visibleCount))
	let currentSlide = 0

	// Создаем точки навигации динамически
	function createDots() {
		// Очищаем существующие точки
		const existingDots = qualityDotsContainer.querySelectorAll('.quality-dot')
		existingDots.forEach(dot => dot.remove())

		// Создаем только 4 точки
		for (let i = 0; i < 4; i++) {
			const dot = document.createElement('span')
			dot.classList.add('quality-dot')
			dot.dataset.index = i

			if (i === currentSlide) {
				dot.classList.add('quality-active')
			}

			// Вставляем точку перед кнопкой "next"
			qualityDotsContainer.insertBefore(dot, qualityNext)
		}
	}

	function showQualitySlide(index) {
		// Проверяем границы
		if (index < 0) index = 0
		if (index > 3) index = 3 // Максимум 4 точки (0-3)

		currentSlide = index

		// Анимация слайдера - показываем нужный слайд, но всегда отображаем 4 слайда
		qualityTrack.style.transform = `translateX(-${index * 25}%)`

		// Обновляем активную точку
		const dots = qualityDotsContainer.querySelectorAll('.quality-dot')
		dots.forEach((dot, i) => {
			// Точка активна, если ее индекс соответствует текущему слайду
			dot.classList.toggle('quality-active', i === currentSlide)
		})

		// Обновляем активные элементы - активен только первый видимый слайд
		qualityItems.forEach((item, i) => {
			item.classList.toggle('active', i === index)
		})
	}

	// Инициализируем точки и показываем первый слайд
	createDots()
	showQualitySlide(0)

	// Обработчики событий
	qualityNext.addEventListener('click', () => {
		// Ограничиваем максимальный индекс до 3 для 4 точек
		const newIndex = currentSlide < 3 ? currentSlide + 1 : 0
		showQualitySlide(newIndex)
	})

	qualityPrev.addEventListener('click', () => {
		// Ограничиваем минимальный индекс до 0, максимальный до 3
		const newIndex = currentSlide > 0 ? currentSlide - 1 : 3
		showQualitySlide(newIndex)
	})

	qualityDotsContainer.addEventListener('click', e => {
		if (e.target.classList.contains('quality-dot')) {
			const index = Number(e.target.dataset.index)
			// Перемещаем слайдер до позиции, соответствующей индексу точки
			// Для фиксированных 4 точек индексы 0-3
			showQualitySlide(index)
		}
	})

	// Поддержка свайпов на мобильных устройствах
	let startX = 0
	let endX = 0
	let isSwiping = false

	qualityTrack.addEventListener(
		'touchstart',
		e => {
			startX = e.touches[0].clientX
			isSwiping = true
			qualityTrack.classList.add('swiping') // Добавляем класс при начале свайпа
		},
		{ passive: true }
	) // passive: true для улучшения производительности

	qualityTrack.addEventListener(
		'touchmove',
		e => {
			if (!isSwiping) return

			const currentX = e.touches[0].clientX
			const initialX = startX
			const diff = currentX - initialX

			// Если это горизонтальный свайп, предотвращаем скролл страницы
			if (Math.abs(diff) > 10) {
				// небольшой threshold для определения горизонтального жеста
				e.preventDefault()
			}

			// Применяем трансформацию "на лету" для эффекта следования за пальцем
			// Ограничиваем сдвиг, чтобы не выходить за пределы слайдера
			const currentOffset = currentSlide * 25
			let newOffset =
				currentOffset - (diff * 0.5) / (qualityTrack.offsetWidth / 100)

			// Ограничиваем смещение
			if (newOffset < 0) newOffset = 0
			if (newOffset > 75) newOffset = 75 // Максимум 75% (для 4 слайдов)

			qualityTrack.style.transform = `translateX(-${newOffset}%)`
		},
		{ passive: false }
	) // passive: false для возможности вызова preventDefault

	qualityTrack.addEventListener('touchend', e => {
		if (!isSwiping) return

		isSwiping = false
		qualityTrack.classList.remove('swiping') // Удаляем класс при окончании свайпа
		endX = e.changedTouches[0].clientX
		const delta = endX - startX

		// Определяем направление свайпа и перемещаем слайдер
		if (Math.abs(delta) > 50) {
			// Минимальное расстояние для свайпа
			if (delta > 0 && currentSlide > 0) {
				// Свайп вправо
				showQualitySlide(currentSlide - 1)
			} else if (delta < 0 && currentSlide < 3) {
				// Свайп влево
				showQualitySlide(currentSlide + 1)
			} else {
				// Вернуть на текущий слайд, если свайп вне пределов
				showQualitySlide(currentSlide)
			}
		} else {
			// Если слайд не изменился, возвращаем на место
			showQualitySlide(currentSlide)
		}
	})

	// Отменяем свайп при уходе с элемента
	qualityTrack.addEventListener('touchcancel', () => {
		isSwiping = false
		qualityTrack.classList.remove('swiping') // Удаляем класс при отмене свайпа
		showQualitySlide(currentSlide)
	})
})
