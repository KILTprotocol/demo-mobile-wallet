/**
 * @module Attestation
 */
import TxStatus from '../blockchain/TxStatus';
import Identity from '../identity/Identity';
import IAttestation from '../types/Attestation';
import Attestation from './Attestation';
export declare function store(attestation: IAttestation, identity: Identity): Promise<TxStatus>;
export declare function query(claimHash: string): Promise<Attestation | null>;
export declare function revoke(claimHash: string, identity: Identity): Promise<TxStatus>;
