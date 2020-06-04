const sftp = require('./ftp/sftp');
const fs = require('fs');
const path = require('path');
const proName = 'dist'
const staticFilesPath = {
    js: {
        local: path.resolve(__dirname, './dist'),
        remote: `/${proName}`,
    },
    css: {
        local: path.resolve(__dirname, './dist'),
        remote: `/${proName}`,
    },
    img: {
        local: path.resolve(__dirname, './dist/static'),
        remote: `/${proName}/static`,
    }
};
function handleFilePath(obj, type) {
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
function uploadFile() {
    let files = [];
    Object.keys(staticFilesPath).forEach(key => {
        files = files.concat(handleFilePath(staticFilesPath[key], key));
    });
    const tasks = files.map(item => {
        return new Promise((resolve, reject) => {
            sftp.put(item.localPath, `${item.remotePath}`, (err) => {
                if (err) {
                    console.log(`${item.remotePath}上传失败`)
                    reject();
                } else {
                    console.log(`${item.remotePath}上传成功`)
                    sftp.end();
                    resolve();
                }
            })
        });
    });
    return Promise.all(tasks)
}
function rmdirFile(filesPath) {
    sftp.rmdir(filesPath, (err) => {
        if (err) { console.log(`${filesPath}删除失败`) }
    })
}
function mkdirFile(filesPath) {
    sftp.mkdir(filesPath, (err) => {
        if (err) { console.log(`${filesPath}生成失败`) }
        sftp.mkdir(`${filesPath}static`, (err) => {
            if (err) { console.log(`${filesPath}生成失败`) }
            uploadFile().then(() => { console.log(`全部上传成功`) });
        })
    })
}
sftp.on('ready', function () {
    mkdirFile(`/${proName}/`);
})