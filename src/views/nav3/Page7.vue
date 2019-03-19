<template>
    <div>
        <input id="upload" type="file" @change="importfxx()"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <button id="expord"  @click="outExe()">导出</button>
    </div>
</template>
<script>
export default {
       data() {
            return {
                dataList:{}
            }
        },
        mounted() {

        },
        methods: {
            importfxx(obj) {
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);　　　　　　　　　　　　　　
                        let importList = _this.dateTransition(outdata);
                        console.log(importList)
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            // 将对应的中文key转化为自己想要的英文key
            dateTransition(outdata) {
                let list = [];
                var obj = {};
                for(var i = 0; i < outdata.length; i++) {
                    obj = {};
                    for(var key in outdata[i]) {
                        if(key == '姓名') {
                            obj['Name'] = outdata[i][key];
                        } else if(key == '性别') {
                            obj['Sex'] = outdata[i][key];
                        } else if(key == '年龄') {
                            obj['Age'] = outdata[i][key];
                        }
                    }
                    list.push(obj);
                }
                this.dataList = list
                return list;
            },
            outExe() {
                console.log(this.dataList)
                this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.excelData = this.dataList //你要导出的数据list。
                    this.export2Excel()
                }).catch(() => {

                });
            },
            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('../../vendor/Export2Excel'); //这里必须使用绝对路径
                    const tHeader = ['姓名','性别', '年龄']; // 导出的表头名
                    const filterVal = ['Name','Sex','Age']; // 导出的表头字段名
                    const list = that.excelData;
                    const data = that.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, `提现管理excel`);// 导出的表格名称，根据需要自己命名
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }	
    }
</script>

<style lang="less" scoped>

</style>

