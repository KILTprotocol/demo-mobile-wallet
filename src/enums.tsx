/* ---------------------------------- */
/*                Claim               */
/* ---------------------------------- */

export enum ClaimStatus {
  Valid,
  Revoked,
  AttestationPending,
}

/* ---------------------------------- */
/*          Claim Properties          */
/* ---------------------------------- */

export enum ClaimPropertyType {
  Boolean = 'boolean',
  String = 'string',
  Integer = 'integer',
}

export enum ClaimPropertyFormat {
  Date = 'date',
}

/* ---------------------------------- */
/*              UI Statuses           */
/* ---------------------------------- */

export enum AsyncStatus {
  NotStarted,
  Pending,
  Success,
  Error,
}

export enum AppLockStatus {
  NotSetUp,
  SetUpAndLocked,
  SetUpAndUnlocked,
  Unknown,
}

/* ---------------------------------- */
/*                 UI                 */
/* ---------------------------------- */

export enum LoadingIndicatorSize {
  S,
  M,
  L,
}

export enum ButtonType {
  Danger,
}
