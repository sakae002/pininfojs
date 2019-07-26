/**
 * 
 * representing a pin which can extend svg lines with messages.
 * @module PinInfo
 * @author santichai kaensopha
 * @version 1.0.0
 * 
 */
const PRESET_POINTS = ['0,50 100,50', '0,50 10,50 90,100 100,100'];
const DEFAULT_OPTION = {
    pin_size: 20,
    pin_color: '#00cec9',
    message: 'Hallo Welt! こんにちは世界! Hello World! Привет мир!',
    direction: 'left',
    event: 'hover',
    points: PRESET_POINTS[1],
    svg: {
        viewbox_width: '100',
        viewbox_height: '100',
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
        if (!_option) {
            this.option = DEFAULT_OPTION;
        } else {
            // prevent unset value
            this.option = DEFAULT_OPTION;
            this.setOption(_option);
        }
        this.createPinInfo();
    }

    // init all needed value for creating object
    setOption(_option) {
        if (typeof (_option) === 'object') {
            var optionKeys = Object.keys(DEFAULT_OPTION);
            if (_option.hasOwnProperty('pin_size')) this.option['pin_size'] = _option.pin_size;
            if (_option.hasOwnProperty('pin_color')) this.option['pin_color'] = _option.pin_color;
            if (_option.hasOwnProperty('direction')) this.option['direction'] = _option.direction;
            if (_option.hasOwnProperty('event')) this.option['event'] = _option.event;
            if (_option.hasOwnProperty('message')) this.option['message'] = _option.message;
            if (_option.hasOwnProperty('points')) this.option['points'] = _option.points;
            if (_option.hasOwnProperty('animation')) {
                if (_option.animation.hasOwnProperty('animation_duration')) {
                    this.option['animation'] = {
                        animation_duration: _option.animation.animation_duration
                    }
                }
            }
            // if (_option.hasOwnProperty('svg')){

            // }
        }
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
        let containerDirection = 'trim-path-container ' + _getDirectionClass(this.option.direction);
        container.setAttribute('class', containerDirection);
        let message = document.createElement('div');
        message.setAttribute('class', 'pin-info-message');
        message.innerText = this.option.message;
        message.setAttribute('style', 'top: ' + this.getLastPoint().y+'px;left:' + this.getLastPoint().x+'px');
        // create svg viewbox
        let svg = document.createElementNS(NAMESPACE, 'svg');
        svg.setAttribute('class', 'trim-path');
        svg.setAttribute('height', this.option.svg.viewbox_height);
        svg.setAttribute('width', this.option.svg.viewbox_width);
        // crate svg line
        let polyline = document.createElementNS(NAMESPACE, 'polyline');
        polyline.setAttribute('points', this.option.points);
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
            this.element.addEventListener("mouseenter", function () { _addClassByElement(svg, 'active') });
            this.element.addEventListener("mouseleave", function () { _removeClassByElement(svg, 'active') });
        }

        if (this.option.event === 'click') {
            this.element.addEventListener("click", function () { _toggleClassByElement(svg, 'active') });
        }
    }

    getLastPoint() {
        var points = this.option.points.split(" ");
        var lastpoint = points[points.length - 1].split(",");
        return { x: lastpoint[0], y: lastpoint[1] }
    }
}

function _addClassByElement(_e, _n) {
    _e.classList.add(_n);
}

function _removeClassByElement(_e, _n) {
    _e.classList.remove(_n);
}

function _toggleClassByElement(_e, _n) {
    _e.classList.contains(_n) ? _e.classList.remove(_n) : _e.classList.add(_n);
}

function _getDirectionClass(_d) {
    var cn = 'path-l';
    switch (_d) {
        case 'left':
            cn = 'path-l';
            break;
        case 'top':
            cn = 'path-t';
            break;
        case 'right':
            cn = 'path-r';
            break;
        case 'bottom':
            cn = 'path-b';
            break;
        default:
            break;
    }
    return cn
}