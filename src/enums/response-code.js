const ResponseCode = {
    SUCCESS: "SU",

    VALIDATION_FAIL: "VF",
    DUPLICATE_EMAIL: "DE",
    DUPLICATE_TEL: "DT",
    NOT_EXIST_USER: "NU",
    NOT_EXIST_PARTY: "NP",

    SIGN_IN_FAIL: "SF",
    CERTIFICATION_FAIL: "CF",
    REISSUE_FAIL: "RF",
    NO_PERMISSION: "NP",
    EXPIRED_TOKEN: "ET",
    ROLE_ERROR: "RE",

    MESSAGE_FAIL: "MF",
    DATABASE_ERROR: "DBE"
}

export default ResponseCode;