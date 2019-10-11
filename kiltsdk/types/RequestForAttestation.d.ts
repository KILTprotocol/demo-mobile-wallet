/**
 * @module TypeInterfaces/RequestForAttestation
 */
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
import IClaim from './Claim';
import { IDelegationBaseNode } from './Delegation';
import IAttestedClaim from './AttestedClaim';
export declare type Hash = string;
export declare type NonceHash = {
    nonce: string;
    hash: Hash;
};
export default interface IRequestForAttestation {
    claim: IClaim;
    claimerSignature: string;
    claimHashTree: object;
    ctypeHash: NonceHash;
    hash: Hash;
    legitimations: IAttestedClaim[];
    delegationId?: IDelegationBaseNode['id'];
}
