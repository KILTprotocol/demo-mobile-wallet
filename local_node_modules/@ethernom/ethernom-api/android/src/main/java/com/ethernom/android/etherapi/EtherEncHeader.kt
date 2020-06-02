package com.ethernom.android.etherapi

import com.ethernom.android.etherapi.Extentions.hexa

val AES_MAC_SIZE = 8
val AES_KEY_SIZE = 16
val TRANSPORT_PLUS_ENC_HEADER_SIZE: Byte = 24

class EtherEncHeader {
    companion object {
        // encryption extensions
        var _encSequence: Int = 0
    }

    var _encCmd: Byte = 0
    var _encStatus: Byte = 0
    var _encLength: Int = 0

    // so this is misnamed, its actually the lenght of the transport header plus the length of the enc header, its really the data offset
    var _encSequence: Int = 0
    var _encMac = arrayListOf<Byte>()

    // end encryption extensions
    constructor(cmd: Byte, status: Byte, length: Int, sequence: Int) {
        initMac()

        _encCmd = cmd
        _encStatus = status
        _encLength = length

        EtherEncHeader._encSequence = sequence
    }

    constructor(cmd: Byte, status: Byte, length: Int, sequence: Int, mac: List<Byte>) {
        for (i in 0 .. 7) {
            _encMac.add(mac[i])
        }

        _encCmd = cmd
        _encStatus = status
        _encLength = length

        EtherEncHeader._encSequence = sequence
    }

    fun initMac() {
        _encMac.clear()

        for (index in 0..7) {
            _encMac.add(0)
        }
    }

    fun SetPayloadLength(len: Int) {
        _encLength = len
    }

    fun SetMac(mac: List<Byte>) {
        var i = 0
        _encMac.clear()

        for (index in 0..7) {
            _encMac.add(mac[i])
            i += 1
        }
    }

    fun GetMac():  List<Byte>{
        return _encMac
    }

    fun GetNonce() : ByteArray {
        var nonceheader = ByteArray(0)
        nonceheader += _encCmd
        nonceheader += _encStatus

        val ByteValue0 = (_encLength and 0x00ff).toByte()
        val ByteValue1 = (_encLength shr 8).toByte()

        nonceheader += ByteValue0
        nonceheader += ByteValue1

        println("sequence:")
        println(EtherEncHeader._encSequence)

        val byte1 = (EtherEncHeader._encSequence and 0x000000FF).toByte()
        val byte2 = ((EtherEncHeader._encSequence and 0x0000FF00) shr 8).toByte()
        val byte3 = ((EtherEncHeader._encSequence and 0x00FF0000) shr 16).toByte()
        val byte4 = ((EtherEncHeader._encSequence and 0xFF000000.toInt()) shr 24).toByte()

        nonceheader += byte1
        nonceheader += byte2
        nonceheader += byte3
        nonceheader += byte4

        val padding = mutableListOf<Byte>().apply {
            repeat(8){ this.add(0) }
        }
        nonceheader += padding

        println("nonce: ")
        println(nonceheader.hexa())

        return nonceheader
    }

    fun GetHeaderBuffer() : ByteArray{
        var header = ByteArray(0)
        header += _encCmd
        header  += _encStatus

        val ByteValue0 = (_encLength and 0x00ff).toByte()
        val ByteValue1 = (_encLength shr 8).toByte()

        header += ByteValue0
        header += ByteValue1

        val byte1 = (EtherEncHeader._encSequence and 0x000000FF).toByte()
        val byte2 = ((EtherEncHeader._encSequence and 0x0000FF00) shr 8).toByte()
        val byte3 = ((EtherEncHeader._encSequence and 0x00FF0000) shr 16).toByte()
        val byte4 = ((EtherEncHeader._encSequence and 0xFF000000.toInt()) shr 24).toByte()

        header += byte1
        header += byte2
        header += byte3
        header += byte4
        header += _encMac

        return header
    }

    fun GetNextHeaderBuffer(cmd: Byte, status: Byte, length: Int) : ByteArray {
        _encSequence += 1
        return GetHeaderBuffer()
    }
}

