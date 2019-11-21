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
