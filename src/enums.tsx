/* ---------------------------------- */
/*      Statuses and UI States        */
/* ---------------------------------- */

export enum AsyncStatus {
  NotStarted,
  Pending,
  Success,
  Error,
}

export enum AppEncryptionStatus {
  // not set up = no identity is set up
  NotSetUp,
  // set up and locked = the app has been set up with an identity but is locked = the identity is still encrypted => nothing can be used
  SetUpAndEncrypted,
  // set up and unlocked = the app has been set up with an identity and the identity is decrypted (via user touchID or passcode) => ready for use
  SetUpAndDecrypted,
  Unknown,
}

export enum AppUiState {
  Active = 'active',
  Inactive = 'inactive',
  Background = 'background',
}

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
