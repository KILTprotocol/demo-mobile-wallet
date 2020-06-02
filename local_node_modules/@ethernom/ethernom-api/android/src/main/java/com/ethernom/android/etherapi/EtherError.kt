package com.ethernom.android.etherapi

typealias EtherErrorValue = Int

object  EtherError {
    const val ETH_SUCCESS: Int = 0
    const val ETH_FAIL: Int = -1
    const val ETH_CARD_AUTH_FAIL: Int = -2

    const val ETH_DISCOVERY_COMPLETE = 0x1001
    const val ETH_SCAN_FOREVER = 0x1002

    const val ETH_ADAPTER_FOUND = 0x1003
    const val ETH_ADAPTER_NOT_FOUND = 0x1004

    // card errors
    const val ERR_ETH_CARDSCAN_FAILED = 0x0101

    // Select errors
    const val ERR_ETH_SELECT_DENIED = 0x0102
    const val ERR_ETH_SELECT_FAILED = 0x0103
    const val ERR_ETH_DISCONNECTED = 0x0104

    // service errors
    val ERR_ETH_SERVICE_OPEN_DENIED = 0x0201
}
