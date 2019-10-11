/**
 *  Balance provides the accounts and balances of the KILT protocol.
 * ***
 *  * Checking Balances between accounts
 *  * Transfer of assets between accounts
 *
 * @module Balance
 * @preferred
 */
/**
 * Dummy comment needed for correct doc display, do not remove
 */
import BN from 'bn.js';
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import IPublicIdentity from '../types/PublicIdentity';
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
export declare function listenToBalanceChanges(accountAddress: IPublicIdentity['address'], listener?: (account: IPublicIdentity['address'], balance: BN, change: BN) => void): Promise<BN>;
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
export declare function getBalance(accountAddress: IPublicIdentity['address']): Promise<BN>;
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
export declare function makeTransfer(identity: Identity, accountAddressTo: IPublicIdentity['address'], amount: BN): Promise<TxStatus>;
