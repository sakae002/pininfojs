/**
 * 
 * representing a pin which can extend svg lines with messages.
 * @module PinInfo
 * @author santichai kaensopha
 * @version 1.0.0
 * 
 */
const PRESET_POINTS = ['0,0 25,0 75,50 100,50', '0,0 100,50', '0,0 100,0'];
const DEFAULT_OPTION = {
    pin_size: 20,
    pin_color: '#00cec9',
    message: 'Hallo Welt! こんにちは世界! Hello World! Привет мир!',
    direction: 'right',
    event: 'click',
    svg: {
        viewbox_width: '100',
        viewbox_height: '50',
        line: {
            fill: 'none',
            points: '',
            stroke: '#00cec9',
            stroke_witdh: '1',
            stroke_dasharray: '120',
            stroke_dashoffset: '120',
            stroke_opacity: '1',
        }
    },
    animation: {
        animation_duration: '1',
    }
}

class PinInfo {

    constructor(_id, _option) {
        this.id = _id;
        if (!_option || option === '') {
            this.option = DEFAULT_OPTION;
        } else {
            this.setOption(_option);
        }
        this.createPinInfo();
    }

    // init all needed value for creating object
    setOption(_option) {
        console.log("ma option", _option)
    }

    // define and create DOM for PinInfo
    createPinInfo() {
        try {
            this.element = document.getElementById(this.id);
            if (!this.element) throw 'No element found with this id: ' + this.id;
            this.createPin();
            this.createSvgElement();
            this.createEvent();
        } catch (err) {
            console.error(err);
        }
    }

    createPin() {
        this.element.style.height = this.element.style.width = this.option.pin_size + 'px';
        this.element.style.backgroundColor = this.element.style.color = this.option.pin_color;
    }


    createSvgElement() {
        const NAMESPACE = 'http://www.w3.org/2000/svg';

        // create contianer
        let container = document.createElement('div');
        container.setAttribute('class', 'trim-path-container');

        let message = document.createElement('div');
        message.setAttribute('class', 'pin-info-message');
        message.innerText = this.option.message;

        // create svg viewbox
        let svg = document.createElementNS(NAMESPACE, 'svg');
        svg.setAttribute('class', 'trim-path');
        svg.setAttribute('height', this.option.svg.viewbox_height);
        svg.setAttribute('width', this.option.svg.viewbox_width);

        // crate svg line
        let polyline = document.createElementNS(NAMESPACE, 'polyline');
        polyline.setAttribute('points', PRESET_POINTS[2]);
        polyline.setAttribute('stroke', this.option.svg.line.stroke);
        polyline.setAttribute('stroke-width', this.option.svg.line.stroke_witdh);
        polyline.setAttribute('fill', this.option.svg.line.fill);
        // append line ine the viewbox
        svg.append(polyline);
        // append svg-element in container
        container.append(svg);
        container.append(message);

        this.element.append(container);
    }


    createEvent() {
        // this > .trim-path-contianer > .trim-path
        var svg = this.element.children[0];

        if (this.option.event === 'hover') {
            this.element.addEventListener("mouseenter", function () { addClassByElement(svg, 'active') });
            this.element.addEventListener("mouseleave", function () { removeClassByElement(svg, 'active') });
        }

        if (this.option.event === 'click') {
            this.element.addEventListener("click", function () { toggleClassByElement(svg, 'active') });
        }
    }
}

function addClassByElement(_element, name) {
    _element.classList.add(name);
}

function removeClassByElement(_element, name) {
    _element.classList.remove(name);
}

function toggleClassByElement(_element, name) {
    _element.classList.contains(name) ? _element.classList.remove(name) : _element.classList.add(name);
}
