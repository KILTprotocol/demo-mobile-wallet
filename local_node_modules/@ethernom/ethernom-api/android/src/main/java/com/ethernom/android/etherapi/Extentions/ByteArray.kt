package com.ethernom.android.etherapi.Extentions

fun ByteArray.hexa(): String? {
    val sb = java.lang.StringBuilder()
    for (b in this) {
        sb.append(String.format("%02x", b))
    }

    return sb.toString()
}

fun ByteArray.hexaSpaced(): String? {
    val sb = java.lang.StringBuilder()

    for (b in this) {
        sb.append(String.format("%02x ", b))
    }

    return sb.toString()
}