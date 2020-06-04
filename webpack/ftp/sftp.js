const Client = require('ftp');
const ftpConfig = {
    host: 'ftp.sinacloud.com', // ftp服务器ip地址
    port: '10221', // ftp服务器port
    user: 'ruler', // 你的登录用户名
    password: 'slkyn2lv8k3s', // 你的密码
    debug: console.log,
    connTimeout: 20000,
    pasvTimeout: 20000,
    keepalive: 20000
}
const sftp = new Client();
sftp.connect(ftpConfig)
module.exports = sftp;