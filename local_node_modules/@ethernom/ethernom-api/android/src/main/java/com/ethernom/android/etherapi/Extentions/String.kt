package com.ethernom.android.etherapi.Extentions

import com.ethernom.android.etherapi.EtherTransportProtocol
import org.json.JSONObject

fun String.hexa(): ByteArray? {
    val str = this

    val `val` = ByteArray(str.length / 2)

    for (i in `val`.indices) {
        val index = i * 2
        val j: Int = str.substring(index, index + 2).toInt(16)
        `val`[i] = j.toByte()
    }

    return `val`
}


//fun String.toJSON() : JSONObject? {
//    return JSONObject(this)
//}
//
//fun String.parseJSONString() : Any? {
//    val data = this.data(using = String.Encoding.utf8, allowLossyConversion = false)
//    val jsonByteArray = data
//    if (jsonByteArray != null) {
//        // Will return an object or nil if JSON decoding fails
//        return try { JSONSerialization.jsonObject(with = jsonByteArray, options = JSONSerialization.ReadingOptions.mutableContainers) as Any? } catch (e: Throwable) { null }
//    } else {
//        // Lossless conversion of the string was not possible
//        return null
//    }
//}
//
//fun String.subString(from: Int, to: Int) : String {
//    return this.subString(from, to)
//}
//
//fun Array.toJSON() : String? {
//    val data = try { JSONSerialization.data(withJSONObject = this, options = listOf<>) } catch (e: Throwable) { null } ?: return null
//    return String(data = data, encoding = String.Encoding.utf8)
//}
//
//fun ParseEncryptedHeader(payload: List<Byte>) : (val v1: List<Byte>, val v2: List<Byte>, val v3: List<Byte>) {
//    var transportHdr = CopyBytes(payload = payload, startIdx = 0, count = Byte(EtherTransportProtocol.ETH_BLE_HEADER_SIZE))
//    val encHdr = CopyBytes(payload = payload, startIdx = Byte(EtherTransportProtocol.ETH_BLE_HEADER_SIZE), count = Byte(EtherTransportProtocol.ETH_BLE_ENC_HEADER_SIZE))
//    val ct = Byte(payload.size - 24)
//    var appPayload = arrayListOf<Byte>()
//    if ((ct != 0)) {
//        appPayload = CopyBytes(payload = payload, startIdx = TRANSPORT_PLUS_ENC_HEADER_SIZE, count = ct)
//    }
//    // no need to do this as payload is decrypted later   transportHdr.add(contentsOf: appPayload)
//    return (encHdr, transportHdr, appPayload)
//}
//
//fun CopyBytes(payload: List<Byte>, startIdx: Byte, count: Byte) : List<Byte> {
//    var out: List<Byte> = Array()
//    for (i in 0 .. count - 1) {
//        val idx: Int = Int(startIdx) + Int(i)
//        out.add(payload[idx])
//    }
//    return out
//}
///// Create `ByteArray` from hexadecimal string representation
/////
///// This creates a `ByteArray` object from hex string. Note, if the string has any spaces or non-hex characters (e.g. starts with '<' and with a '>'), those are ignored and only hex characters are processed.
/////
///// - returns: ByteArray represented by this hexadecimal string.
//val String.toByteArray: ByteArray?
//    get() {
//        var data = ByteArray(capacity = this.count / 2)
//        val regex = NSRegularExpression(pattern = "[0-9a-f]{1,2}", options = .caseInsensitive)
//        regex.enumerateMatches(in = this, range = NSRange(startIndex..., in = this)) { match, _, _  ->
//            val byteString = (this as NSString).substring(with = match!!.range)
//            val num = Byte(byteString, radix = 16)!!
//            data.add(num)
//        }
//        if (data.size <= 0) {
//            return null
//        }
//        return data
//    }
//
//fun String.toBase64() : String? {
//    val data = this.data(using = String.Encoding.utf8) ?: return null
//    return data.base64EncodedString(options = ByteArray.Base64EncodingOptions(rawValue = 0))
//}
////FIXME: @SwiftKotlin - Kotlin does not support where clauses in extensions:  where Element == Byte
//val Sequence.data: ByteArray
//    get() {
//        .init(this)
//    }
//val Sequence.hexa: String
//    get() {
//        map { .init(format = "%02x", it) }.joined()
//    }
//val Sequence.hexaSpaced: String
//    get() {
//        map { .init(format = "%02x ", it) }.joined()
//    }
//val StringProtocol.hexa: List<Byte>
//    get() {
//        var startIndex = this.startIndex
//        return stride(from = 0, to = count, by = 2).compactMap { _  ->
//            val endIndex = index(startIndex, offsetBy = 2, limitedBy = this.endIndex) ?: this.endIndex
//            defer {
//                startIndex = endIndex
//            }
//            Byte(this[startIndex until endIndex], radix = 16)
//        }
//    }
//val ByteArray.hexDescription: String
//    get() = reduce("") { it + String(format = "%02x", $1) }
//
//data class ByteArray.HexEncodingOptions: OptionSet(
//val rawValue: Int,
//val upperCase = HexEncodingOptions(rawValue = 1 << 0)) {}
//
//fun ByteArray.hexEncodedString(options: HexEncodingOptions = listOf()) : String {
//    val format = if (options.contains(.upperCase)) "%02hhX" else "%02hhx"
//    return map { String(format = format, it) }.joined()
//}
