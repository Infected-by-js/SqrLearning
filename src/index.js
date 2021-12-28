import '@scss/main';

class Tilt {
	#MAX_ANGLE = 25;
	#PERSPECTIVE = 1500;
	#SCALE = 1.1;
	#EASING = 'cubic-bezier(0.03,0.98,0.52,0.99)';
	#SPEED = 800;
	#BOX_SHADOW = false;
	#SHADOW_COLOR = 'rgba(0,0,0,0.3)';
	#SHADOW_BLUR = '3px';
	#SHADOW_SPREAD = '0';

	#setDefaultStyles(config = {}) {
		this.maxAngle = config.max || this.#MAX_ANGLE;
		this.perspective = config.perspective || this.#PERSPECTIVE;
		this.scale = config.scale || this.#SCALE;
		this.easing = config.easing || this.#EASING;
		this.speed = config.speed || this.#SPEED;
		this.boxShadow = config.boxShadow || this.#BOX_SHADOW;
		this.shadowColor = config.shadowColor || this.#SHADOW_COLOR;
		this.shadowBlur = config.shadowBlur || this.#SHADOW_BLUR;
		this.shadowSpread = config.shadowSpread || this.#SHADOW_SPREAD;

		this.element.style.transformStyle = 'preserve-3d';
		this.setShadow();
		this.setTransition();
	}

	constructor(element, config) {
		this.element = element;

		this.#setDefaultStyles(config);
		this.element.addEventListener('mousemove', this.handlerMouseMove.bind(this));
		this.element.addEventListener('mouseenter', this.handlerMouseHover.bind(this));
		this.element.addEventListener('mouseleave', this.handlerMouseLeave.bind(this));
	}

	getRotationAngle(mousePosition, elementSize) {
		return (2 * ((mousePosition / elementSize) * this.maxAngle - this.maxAngle / 2)).toFixed(1);
	}

	handlerMouseMove(event) {
		const angleX = this.getRotationAngle(event.offsetY, this.element.offsetHeight);
		const angleY = -1 * this.getRotationAngle(event.offsetX, this.element.offsetWidth);

		this.setTransform({ angleX, angleY });
		this.setShadow(angleX, angleY);
	}

	handlerMouseHover() {
		this.setTransform();
		this.setShadow();
	}

	handlerMouseLeave() {
		this.setTransform({ scale: 1 });
		this.setShadow();
	}

	setTransform({ angleX = 0, angleY = 0, scale = this.scale } = {}) {
		const scaleValue = `scale3d(${scale},${scale},${scale})`;
		const perspectiveValue = `perspective(${this.perspective}px)`;
		const rotateValue = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;

		return (this.element.style.transform = `${scaleValue} ${perspectiveValue} ${rotateValue}`);
	}

	setShadow(angleX = 0, angleY = 0) {
		if (this.boxShadow) {
			const SHADOW_COEF = 0.1;
			const shadowParams = `${this.shadowBlur} ${this.shadowColor}`;

			const offsetX = SHADOW_COEF * angleX;
			const offsetY = -1 * SHADOW_COEF * angleY;

			return (this.element.style.filter = `drop-shadow(${offsetY}px ${offsetX}px ${shadowParams})`);
		}
	}

	setTransition() {
		this.element.style.transition = `transform ${this.speed}ms ${this.easing}, box-shadow 100ms ease-out`;
	}
}

const mainImage = document.querySelector('#main-image');
const settings = {
	boxShadow: true,
	shadowColor: 'rgba(0,0,0,0.4)',
	shadowBlur: '3px',
	shadowSpread: '0',
};

new Tilt(mainImage, settings);
