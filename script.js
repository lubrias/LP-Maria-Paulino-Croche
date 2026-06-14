const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.2,
	}
);

revealElements.forEach((element) => observer.observe(element));

// Carousel functionality
const carousel = document.querySelector('.carousel');
if (carousel) {
	const slides = carousel.querySelectorAll('.carousel-slide');
	const dots = carousel.querySelectorAll('.carousel-dot');
	const prevBtn = carousel.querySelector('.carousel-btn--prev');
	const nextBtn = carousel.querySelector('.carousel-btn--next');
	let currentIndex = 0;

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
		});
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
		showSlide(currentIndex);
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		showSlide(currentIndex);
	}

	prevBtn.addEventListener('click', prevSlide);
	nextBtn.addEventListener('click', nextSlide);

	dots.forEach((dot) => {
		dot.addEventListener('click', (e) => {
			currentIndex = parseInt(e.target.dataset.index);
			showSlide(currentIndex);
		});
	});

	// Auto-advance carousel every 5 seconds
	setInterval(nextSlide, 5000);

	// Show first slide on load
	showSlide(0);
}

const form = document.querySelector('.contact-form');

if (form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const name = form.querySelector('#nome')?.value.trim() || '';
		const interest = form.querySelector('#produto')?.value.trim() || '';
		const message = form.querySelector('#mensagem')?.value.trim() || '';
		const whatsappLink = document.querySelector('.whatsapp')?.getAttribute('href') || '';
		const number = whatsappLink.replace(/\D/g, '');

		if (!number) {
			return;
		}

		const textLines = [
			'Ola! Vim pelo site da Maria Paulino Atelier.',
			`Nome: ${name || 'Nao informado'}`,
			`Interesse: ${interest || 'Nao informado'}`,
			`Mensagem: ${message || 'Nao informada'}`,
		];

		const text = encodeURIComponent(textLines.join('\n'));
		const target = `https://wa.me/${number}?text=${text}`;
		window.open(target, '_blank', 'noopener,noreferrer');
	});
}
