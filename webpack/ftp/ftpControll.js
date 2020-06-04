const fs = require('fs');
const sftp = require('./sftp');
class Ftp {
    /**
    * 处理文件路径，循环所有文件，如果是图片需要读取成Buffer类型
    **/
    handleFilePath(obj, type) {
        const { local, remote } = obj;
        const files = fs.readdirSync(local);
        return files.map(file => {
            const _lp = `${local}/${file}`;
            return {
                type: type,
                file: file,
                localPath: type !== 'img' ? _lp : fs.readFileSync(_lp),
                remotePath: `${remote}/${file}`,
            };
        });
    }
    uploadFile(staticFilesPath) {
        let files = [];
        Object.keys(staticFilesPath).forEach(key => {
            files = files.concat(this.handleFilePath(staticFilesPath[key], key));
        });
        const tasks = files.map(item => {
            return new Promise((resolve, reject) => {
                console.log(`执行上传操作`);
                //sftp.on('ready', function () {
                    sftp.put(item.localPath, `${item.remotePath}`, function (err) {
                        if (err) {
                            console.log(`${item.remotePath}上传失败`)
                            reject();
                        } else {
                            console.log(`${item.remotePath}上传成功`)
                            sftp.end();
                            resolve();
                        }
                    })
                //})
            });
        });
        return Promise.all(tasks);
    }
    /*缺少判断是否存在*/
    mkdirFile(path) {
        return new Promise((resolve, reject) => {
            //sftp.on('ready', function () {
                sftp.mkdir(`${path}`, function (err) {
                    sftp.end();
                    if (err) {
                        console.log(`${path}生成失败`)
                        reject();
                    } else {
                        console.log(`${path}生成成功`)
                        resolve();
                    }
                })
            //})
        });
    }
}
module.exports = Ftp