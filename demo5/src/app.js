/**
 * Created by dujiaheng on 2017/4/10.
 */

import {add} from 'demo_util'

import {append} from '@util/append'

import'./app.css'


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return "point(" + this.x + ',' + this.y + ")"
    }
}

append('#app', add(3, 5));
append('#app', new Point(3, 5).toString());