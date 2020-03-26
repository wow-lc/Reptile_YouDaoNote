const XLSX = require('xlsx');

/**
 * 生成xlsx文件
 * @param {*} _headers 
 * @param {*} _data 
 * @param {*} _outPath 
 */
const dlXlsx = (_headers,_data,_outPath) => {
    const headers = _headers
        .map((v, i) => Object.assign({}, { v: v, position: String.fromCharCode(65 + i) + 1 }))
        .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {});
    const data = _data
        .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })))
        .reduce((prev, next) => prev.concat(next))
        .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {});
    // 合并 headers 和 data
    const output = Object.assign({}, headers, data);
    // 获取所有单元格的位置
    const outputPos = Object.keys(output);
    // 计算出范围
    const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];

    // 构建 workbook 对象
    const workbook = {
        SheetNames: ['mySheet'],
        Sheets: {
            'mySheet': Object.assign({}, output, { '!ref': ref })
        }
    };
   
    // 导出 Excel
    XLSX.writeFile(workbook, _outPath);
}

module.exports = dlXlsx;