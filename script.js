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
