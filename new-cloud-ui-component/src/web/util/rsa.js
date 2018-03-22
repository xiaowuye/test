import RSA from "./../../plugins/jsencrypt/jsencrypt.min";
export default {
    encode: function (str) {
        var public_key = "-----BEGIN PUBLIC KEY-----" +
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCta3WjYH6NeTY7v+0y7x5Dd2LR" +
            "gAuaVXN1mSrJde32EMXUdwt/J9TncChcUNsD51Zq+1Cc0mlL0w4OC2s1EQ5+TUt0" +
            "jSc26I1/4ulNYxubyNmUXTj0K0G2NpZ9/XxK/P/jAUBzXBXaz1Az3QMj8NhXpDbz" +
            "gpzA8onBPvnuKfcDBQIDAQAB" +
            "-----END PUBLIC KEY-----";
        var encrypt = new RSA.JSEncrypt();
        encrypt.setPublicKey(public_key);
        return encrypt.encrypt(str);
    },
};