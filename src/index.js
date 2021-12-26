import '@scss/main';

// const tiltELement = (element, config) => {
// 	const range = 80;
// 	let timeout = null;

// 	const calcValue = (a, b) => {
// 		return ((a / b) * range - range / 2).toFixed(1);
// 	};

// 	const moveElementHandler = ({ x, y }) => {
// 		if (timeout) {
// 			window.cancelAnimationFrame(timeout);
// 		}

// 		console.log(timeout);

// 		timeout = window.requestAnimationFrame(() => {
// 			const valueX = calcValue(x, window.innerWidth);
// 			const valueY = calcValue(y, window.innerHeight);

// 			element.style.transform = `rotateX(${valueY}deg) rotateY(${-valueX}deg)`;
// 		});
// 	};

// 	element.addEventListener('mousemove', moveElementHandler, false);
// };

const tiltELement = (element, config) => {
	const imageWidth = element.offsetWidth;
	const imageHeight = element.offsetHeight;
	const centerX = element.offsetLeft + imageWidth / 2;
	const centerY = element.offsetTop + imageHeight / 2;

	const settings = {
		max: 25,
		prespective: 1800,
		scale: 1.2,
		easing: 'cubic-bezier(0.03,0.98,0.52,0.99)',
		speed: 1500,
		boxShadow: false,
		shadowColor: 'rgba(255,255,255,0.8)',
		shadowBlur: '5px',
		shadowSpread: '0',
	};

	const debounce = (ms) => {
		let isCooldown = false;

		return (callback) => {
			if (isCooldown) return;

			callback();
			isCooldown = true;

			setTimeout(() => {
				isCooldown = false;
			}, ms);
		};
	};
	//init
	const db = debounce(100);

	const setTransition = (isHovered) => {
		clearTimeout(element.timer);

		element.style.transition = `transform ${settings.speed}ms ${settings.easing}, box-shadow ${settings.speed}ms ${settings.easing}`;

		if (!isHovered) {
			element.timer = setTimeout(() => {
				element.style.transition = '';
				element.style.boxShadow = '';
			}, settings.speed);
		}
	};

	const mouseOverHandler = (event) => {
		setTransition(true);
		element.style.transform = `perspective(${settings.prespective}px) scale3d(${settings.scale},${settings.scale},${settings.scale})`;
		element.style.boxShadow =
			settings.boxShadow &&
			`0px 0px ${settings.shadowBlur} ${settings.shadowSpread} ${settings.shadowColor}`;
	};

	const mouseMoveHandler = (event) => {
		db(() => {
			const mouseX = event.clientX - centerX;
			const mouseY = event.clientY - centerY;

			const rotateXUncapped = (1 * settings.max * mouseY) / (imageHeight / 2);
			const rotateYUncapped = (-1 * settings.max * mouseX) / (imageWidth / 2);

			const rotateX =
				rotateXUncapped < -settings.max
					? -settings.max
					: rotateXUncapped > settings.max
					? settings.max
					: rotateXUncapped.toFixed(2);
			const rotateY =
				rotateYUncapped < -settings.max
					? -settings.max
					: rotateYUncapped > settings.max
					? settings.max
					: rotateYUncapped.toFixed(2);

			element.style.transform = `scale3d(${settings.scale},${settings.scale},${settings.scale})  perspective(${settings.prespective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
			console.log({ rotateX, rotateY });
			const shadowX = (2 * rotateX) / 10;
			const shadowY = (-2 * rotateY) / 10;
			element.style.boxShadow =
				settings.boxShadow &&
				`${shadowY}px ${shadowX}px ${settings.shadowBlur} ${settings.shadowSpread} ${settings.shadowColor}`;
		});
	};

	const mouseOutHandler = (event) => {
		console.log('ON OUT');
		element.style.transform = `perspective(${settings.prespective}px) scale(1)`;
		element.style.boxShadow =
			settings.boxShadow &&
			`0px 0px ${settings.shadowBlur} ${settings.shadowSpread} ${settings.shadowColor}`;

		setTransition(false);
	};

	element.addEventListener('mouseover', mouseOverHandler);
	element.addEventListener('mousemove', mouseMoveHandler);
	element.addEventListener('mouseout', mouseOutHandler);
};

const mainImage = document.querySelector('#main-image');
const settings = {
	prespective: 1800,
	scale: 1.2,
	easing: 'cubic-bezier(0.03,0.98,0.52,0.99)',
	speed: 1500,
	boxShadow: true,
	shadowColor: 'rgba(255,255,255,0.8)',
	shadowBlur: '5px',
	shadowSpread: '0',
};

tiltELement(mainImage, settings);
