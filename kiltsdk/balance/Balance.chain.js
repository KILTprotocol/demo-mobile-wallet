"use strict";
/**
 *  Balance provides the accounts and balances of the KILT protocol.
 * ***
 *  * Checking Balances between accounts
 *  * Transfer of assets between accounts
 *
 * @module Balance
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
const blockchainApiConnection_1 = require("../blockchainApiConnection");
/**
 * @description Attaches the given [listener] for balance changes on the account with [accountAddress].
 * <B>Note that balance amount is in µ-Kilt and must be translated to Kilt-Coin</B>
 *
 * @param accountAddress address of the account on which to listen for balance changes.
 * @param listener listener to receive balance change updates
 * @returns a promise containing the current balance of the account
 *
 * @example
 * <BR>
 *
 * ```javascript
 * import * as sdk from '@kiltprotocol/prototype-sdk';
 *
 * const address = ...
 * sdk.Balance.listenToBalanceChanges(address,
 *   (account: IPublicIdentity['address'], balance: BN, change: BN) => {
 *     console.log(`Balance has changed by ${change.toNumber()} to ${balance.toNumber()}`)
 *   });
 * ```
 */
async function listenToBalanceChanges(accountAddress, listener) {
    const blockchain = await blockchainApiConnection_1.getCached();
    // @ts-ignore
    let previous = await blockchain.api.query.balances.freeBalance(accountAddress);
    if (listener) {
        blockchain.api.query.balances.freeBalance(accountAddress, (current) => {
            const change = current.sub(previous);
            previous = current;
            listener(accountAddress, current, change);
        });
    }
    return previous;
}
exports.listenToBalanceChanges = listenToBalanceChanges;
/**
 * @description Fetches the current balance of the account with [accountAddress].
 * <B>Note that balance amount is in µ-Kilt and must be translated to Kilt-Coin</B>
 *
 * @param accountAddress address of the account for which to get the balance.
 * @returns a promise containing the current balance of the account
 *
 * @example
 * <BR>
 *
 * ```javascript
 * import * as sdk from '@kiltprotocol/prototype-sdk';
 *
 * const address = ...
 * sdk.Balance.getBalance(address)
 *   .then((balance: BN) => {
 *     console.log(`balance is ${balance.toNumber()}`)
 *   })
 * ```
 */
async function getBalance(accountAddress) {
    return listenToBalanceChanges(accountAddress);
}
exports.getBalance = getBalance;
/**
 * @description Transfer Kilt [amount] tokens to [toAccountAddress] using the given [[Identity]].
 * <B>Note that balance amount is in µ-Kilt and must be translated to Kilt-Coin</B>
 *
 * @param identity identity to use for token transfer
 * @param accountAddressTo address of the receiver account
 * @param amount amount of µ-Kilt to transfer
 * @returns promise containing the transaction status
 *
 * @example
 * <BR>
 *
 * ```javascript
 * import * as sdk from '@kiltprotocol/prototype-sdk';
 *
 * const identity = ...
 * const address = ...
 * const amount: BN = new BN(42)
 * sdk.Balance.makeTransfer(identity, address, amount)
 *   .then((status: TxStatus) => {
 *     console.log('Successfully transferred ${amount.toNumber()} tokens')
 *   })
 *   .catch(err => {
 *     console.log('Transfer failed')
 *   })
 * ```
 */
async function makeTransfer(identity, accountAddressTo, amount) {
    const blockchain = await blockchainApiConnection_1.getCached();
    const transfer = blockchain.api.tx.balances.transfer(accountAddressTo, amount);
    return blockchain.submitTx(identity, transfer);
}
exports.makeTransfer = makeTransfer;
//# sourceMappingURL=Balance.chain.js.map