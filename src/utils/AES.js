
import CryptoJS from 'crypto-js';
 
export default {
    //随机生成指定数量的16进制key
    
    //加密
    encrypt(word) {
        let keyStr = '473050b7e2304b2fbb0e574d0b619f0b';
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    },
    //解密
    decrypt(word) {
        let word1=CryptoJS.enc.Base64.stringify(word);
        let keyStr = '473050b7e2304b2fbb0e574d0b619f0b'; 
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var decrypt = CryptoJS.AES.decrypt(word1, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}