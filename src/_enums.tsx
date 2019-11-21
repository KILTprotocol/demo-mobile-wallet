/* ---------------------------------- */
/*              Statuses              */
/* ---------------------------------- */

export enum AsyncStatus {
  NotStarted,
  Pending,
  Success,
  Error,
}

export enum CredentialStatus {
  Valid,
  Revoked,
  AttestationPending,
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
