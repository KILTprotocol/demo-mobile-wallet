// const Kilt = require('@kiltprotocol/sdk-js')

// // use the ATTESTER'S MNEMONIC you've generated in the Identity step
// const attester = Kilt.Identity.buildFromMnemonic(`<ATTESTER'S MNEMONIC>`)

// const requestForAttestationAsJson = '<requestForAttestationJSON>'
// const requestForAttestationAsObj = JSON.parse(requestForAttestationAsJson)
// const requestForAttestation = Kilt.RequestForAttestation.fromObject(
//   requestForAttestationAsObj
// )

// const isDataValid = requestForAttestation.verifyData()
// const isSignatureValid = requestForAttestation.verifySignature()
// console.log(isDataValid)
// console.log(isSignatureValid)

// // build the Attestation object
// const attestation = new Kilt.Attestation(requestForAttestation, attester)

// // connect to the chain (this is one KILT test node)
// Kilt.default.connect('wss://full-nodes.kilt.io:9944')

// // store the attestation on chain
// attestation
//   .store(attester)
//   .then(data => {
//     console.log(data)
//   })
//   .then(() => {
//     // the attestation was successfully stored on the chain, so we can create the *AttestedClaim* object
//     const attestedClaim = new Kilt.AttestedClaim(
//       requestForAttestation,
//       attestation
//     )
//     // Let's copy the result to send it to the claimer
//     console.log(JSON.stringify(attestedClaim))
//   })
//   .catch(e => {
//     console.log(e)
//   })
//   .finally(() => {
//     Kilt.BlockchainApiConnection.getCached().then(blockchain => {
//       blockchain.api.disconnect()
//     })
//   })
