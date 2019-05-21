
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
        this.rows = data.rows || ''
        this.disabled = data.disabled || false
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
        this.remote = data.remote || false
        this.filterable = data.filterable || false
        this.paramQueryName = data.paramQueryName
        this.otherParams = data.otherParams || {}
        this.services = data.services
        this.resKey= data.resKey;
        this.multiple = data.multiple || false
        this.changeCb = data.changeCb
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
            if(this.resKey){
                this.options = this.options.concat(res[this.resKey]);
            }
            else{
                this.options= this.options.concat(res);
            }
        });
    }

}

/**
 * 级联选项
 */
export class  Cascader  extends Base{
    constructor(data = {}){
        super(data);
        this.type = 'cascader';
        this.options = [];
        this.placeholder = data.placeholder || '';
        this.expandTrigger = data.expandTrigger || 'click';  //click / hover ,展开下级方式
        this.showAllLevels = data.showAllLevels===undefined?true:data.showAllLevels;  //值显示所有级
        this.changeOnSelect = data.changeOnSelect===undefined?false:data.changeOnSelect; //是否允许选择任意一级的选项,为true时，active-item-change失效
        this.filterable=data.filterable===undefined?false:data.filterable;
        let labelKey = data.labelKey || 'label';
        let valueKey = data.valueKey || 'value';
        let childrenKey = data.childrenKey || 'children';
        let disabledKey = data.disabledKey || 'disabled';
        this.props = {label:labelKey,value:valueKey,children:childrenKey,disabled:disabledKey};
        this.hasChildrenKey = data.hasChildrenKey || 'children' //判断是否有children的字段
        this.services=data.services; //获取数据函数，promise
        this.servicesParamsKey=data.servicesParamsKey
        this.remote=data.remote
        if(data.options){
            if (data.options instanceof Array) {
                this.options = data.options;
            } else if (data.options instanceof Promise) {
                this.getOptions(data.options);
            }
        }
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
        this.dateType = data.dateType || 'datetime'
        this.format = data.format;
        this.valueFormat = data.valueFormat;
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
        this.one = data.one || false
        if(!this.one){
            if (data.value instanceof Array) {
                this.value = data.value
            } else {
                this.value = [];
            }
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
        this.name = data.name;
        this.cb = data.cb
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
        this.one = data.one; //是否只有单张图片上传
        this.fileKey = data.fileKey
        // if(!this.value){
        //     this.value=this.one?{}:[]
        // }
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
