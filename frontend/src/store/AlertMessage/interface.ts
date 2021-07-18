export enum AlertMessageStatus {
  Success = "Success",
  Failure = "Failure",
  Pending = "Pending"
}

export interface AlertMessage {
  show: boolean;
  status: string;
  message: string;
}
