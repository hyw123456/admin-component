
export class Base {
    constructor(data = {}) {
        this.value = data.value || null;
        this.type = 'baseComponent';
        if (data.key) {
            this.key = data.key;
        } else {
            this.key = 'noValue';
            throw new Error('请输入键值')
        }
        this.rules = data.rules || [];
        this.label = data.label;
    }
}

export class Input extends Base {
    constructor(data = {}) {
        super(data);
        this.type = 'input';
        this.placeholder = data.placeholder || '';
        this.inputType = data.inputType || 'text';
    }
}

export class Select extends Base {
    constructor(data = {}) {
        super(data);
        this.type = 'select';
        this.options = [];
        this.placeholder = data.placeholder || '';
        this.labelKey = data.labelKey || 'label';
        this.valueKey = data.valueKey || 'value';
        if (data.options instanceof Array) {
            this.options = data.options;
        } else if (data.options instanceof Promise) {
            this.getOptions(data.options);
        }
        // if(this.option instanceof Promise){
        //    this.options.then(res => {
        //        this.optionsData = res;
        //    });
        // }
    }

    getOptions(op) {
        op.then(res => {
            this.options = this.options.concat(res);
        });
    }

}

/**
 * 单个日期时间选择
 */
export class SingDate extends Base {
    constructor(data = {}) {
        super(data);
        this.type = 'singDate';
        this.placeholder = data.placeholder || ''; // 时间提示语
    }
}

/**
 * 切换组件
 */
export class Switch extends Base {
    constructor(data = {}) {
        super(data);
        this.type = 'switch';
        this.trueValue = data.trueValue || true;
        this.falseValue = data.falseValue || false;
    }
}

/**
 * 单选框
 */
export class Radio extends Base {
    constructor(data = {}) {
        super(data);
        this.type = 'radio';
        this.options = [];
        if (data.options instanceof Array) {
            this.options = data.options;
        } else if (data.options instanceof Promise) {
            this.getOptions(data.options);
        }
    }

    getOptions(op) {
        op.then(res => {
            this.options = this.options.concat(res);
        });
    }
}

/**
 * 复选框
 */
export class Checkbox extends Base {
    constructor(data = {}) {
        super(data);
        if (data.value instanceof Array) {
            this.value = data.value
        } else {
            this.value = [];
        }
        this.type = 'checkbox';
        this.options = [];
        if (data.options instanceof Array) {
            this.options = data.options;
        } else if (data.options instanceof Promise) {
            this.getOptions(data.options);
        }
        this.max = data.max;
        this.min = data.min;
    }

    getOptions(op) {
        op.then(res => {
            this.options = this.options.concat(res);
        });
    }
}

/**
 * 上传图片组件
 */
export class UploadImg extends Base{
    constructor(data = {}) {
        super(data);
        this.type = 'uploadImg';
        this.url = data.url; // 图片上传路径
        this.max = data.max; // 0 或者不传 即没有限制
        this.size = data.size; //  kb为单位  0 或者不传 即没有限制
    }
}
/**
 * 富文本编辑组件
 */
export class Editor extends Base {
    constructor(data = {}) {
        super(data);
        this.type = 'editor';
    }
}

/**
 * 测试组件,  演示数据交互过程
 */
export class Test extends Base{
    constructor(data = {}) {
        super(data);
        this.type = 'test';
    }
}

/**
 * 自定义组件
 */
export class CustomComponent{
    constructor(data = {}) {
        Object.assign(this, data);
        this.name = data.name || data.key;
        this.label = data.label;
        this.options = [];
        if (data.options instanceof Array) {
            this.options = data.options;
        } else if (data.options instanceof Promise) {
            this.getOptions(data.options);
        }
    }
    getOptions(op) {
        op.then(res => {
            this.options = this.options.concat(res);
        });
    }
}
