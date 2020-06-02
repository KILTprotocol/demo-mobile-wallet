package com.ethernom.android.etherapi
import java.util.*

val ETH_advServiceUUD = "19490016-5537-4f5e-99ca-290f4fbff142"
val ETH_serviceUUID = UUID.fromString("19490001-5537-4F5E-99CA-290F4FBFF142")
val ETH_characteristicUUID = UUID.fromString("19490002-5537-4F5E-99CA-290F4FBFF142")
val ETH_BLE_INTERFACE: Byte = 0x02


val ETH_BLE_HEADER_SIZE = 8
val ETH_BLE_ENC_HEADER_SIZE = 16
val CARD_NAME_MAX_LEN = 15 - 4
val HOST_NAME_MAX_LEN = 15

// hack remove when we completely get rid of the extension ble module
val PSD_MGR_PORT: Byte = 0x0D
val PSD_MGR_ID: Byte = 0x02
val GENERIC_PORT: Byte = 0x16
val DELIMITER: Byte = 0x1F
val H2C_RQST_INIT: Byte = 0x01
val INT8NULL: Byte = 0

//ENC
val CM_AUTHENTICATE_RSP: Byte = 0x88.toByte()
val FLAG_CONTAIN_ENCRYPTION_HDR = 0x80
val ALLOWED_SEQ_NUM_SKIPS = 4
val APP_FLAG_H2C = 0x80
val APP_FLAG_ENCRYPT = 0x40
//val APP_CMD_MASK = ~APP_FLAG_ENCRYPT
val APP_H2C_KEY_EXCHANGE = APP_FLAG_H2C or 0x01
val APP_H2C_ENCRYPT_START = APP_FLAG_H2C or 0x02
val APP_H2C_MSG = APP_FLAG_H2C or 0x11
val APP_C2H_KEY_EXCHANGE = 0x01
val APP_C2H_ENCRYPT_START = 0x02
val APP_C2H_MSG = 0x11
val APP_ERROR_SEQUENCE = 0x81
val APP_ERROR_AUTH = 0x82
val APP_ERROR_INTERNAL = 0x83
val APP_ERROR_FORMAT = 0x84

val CM_LAUNCH_APP: Byte = 0x81.toByte()
val CM_SUSPEND_APP: Byte = 0x82.toByte()
val CM_INIT_APP_PERM: Byte = 0x87.toByte()
val CM_INIT_DM: Byte = 0x89.toByte()
val CM_PIN_RSP: Byte = 0x8A.toByte()
val CM_SESSION_REQUEST: Byte = 0x8B.toByte()
val CM_SESSION_RECONNECT: Byte = 0x8C.toByte()
val CM_SESSION_TERMINATE: Byte = 0x8D.toByte()

//card to host
val CM_RSP: Byte = 0x01
val CM_AUTHENTICATE: Byte = 0x08
val CM_SESSION_RSP: Byte = 0x0B

//response type
val CM_ERR_SUCCESS: Byte = 0x00.toByte()
val CM_ERR_CARD_BUSY: Byte = 0x01.toByte()
val CM_ERR_INVALID_CMD: Byte = 0x02.toByte()
val CM_ERR_APP_NOT_ALLOWED: Byte = 0x04.toByte()
val CM_ERR_INVALID_IMG_ID: Byte = 0x08.toByte()
val CM_ERR_APP_BUSY: Byte = 0x09.toByte()
var CM_ERR_APP_DISCONNECT: Byte = 0x0E.toByte()

