/**
 * @module TypeInterfaces/Delegation
 */
/**
 * Dummy comment needed for correct doc display, do not remove.
 */
import IPublicIdentity from './PublicIdentity';
import ICType from './CType';
export declare enum Permission {
    ATTEST = 1,
    DELEGATE = 2
}
export interface IDelegationBaseNode {
    id: string;
    account: IPublicIdentity['address'];
    revoked: boolean;
}
export interface IDelegationRootNode extends IDelegationBaseNode {
    cTypeHash: ICType['hash'];
}
export interface IDelegationNode extends IDelegationBaseNode {
    rootId: IDelegationBaseNode['id'];
    parentId?: IDelegationBaseNode['id'];
    permissions: Permission[];
}
