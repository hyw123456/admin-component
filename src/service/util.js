export function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

/**
 * file转 url链接
 * @param file 文件流
 * @returns {Promise<any>}
 */
export async function uploadImg(file, url) {
    let data;
    if (file.size > 1024 * 512) {
        data = await fileResizetoFile(file, .7, file.type);
    } else {
        data = file;
    }
    return new Promise((resolve, reject) => {
        let xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) {// 4 = "loaded"
                if (xmlhttp.status == 200) {// 200 = OK

                    let res = JSON.parse(xmlhttp.response);
                    resolve(res.url);
                }
                else {
                    reject();
                }
            }
        };
        let form = new FormData(); // FormData 对象
        form.append("uploadFile", data); // 文件对象
        xmlhttp.open("POST", process.env.VUE_APP_BASE_API + url, true);
        xmlhttp.send(form);

    });
}



export function fileResizetoFile(file, quality, imgType) {
    return new Promise(resolve => {
        filetoDataURL(file, function (dataurl) {
            dataURLtoImage(dataurl, function (image) {
                canvasResizetoFile(imagetoCanvas(image), quality, resolve, imgType);
            })
        })
    })

}

export function srcToBase64(src) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = function(){
            let base64 = getBase64Image(this);
            resolve(base64);
        }
        image.onerror = function () {
            reject();
        }
        image.src = src;
    })
}

function getBase64Image(img) {
    return imagetoCanvas(img).toDataURL();
}

function imagetoCanvas(image) {
    var cvs = document.createElement("canvas");
    var ctx = cvs.getContext('2d');
    cvs.width = image.width;
    cvs.height = image.height;
    ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
    return cvs;
}

function filetoDataURL(file, fn) {
    var reader = new FileReader();
    reader.onloadend = function (e) {
        fn(e.target.result);
    };
    reader.readAsDataURL(file);
}

function dataURLtoImage(dataurl, fn) {
    var img = new Image();
    img.onload = function () {
        fn(img);
    };
    img.src = dataurl;
}

function canvasResizetoFile(canvas, quality, fn, type) {
    canvas.toBlob(function (blob) {
        fn(blob);
    }, type || 'image/jpeg', quality);
}
