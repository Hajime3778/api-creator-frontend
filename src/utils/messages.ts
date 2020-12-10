export const ActionMessage = {
  SuccessCreate: 'Successful create',
  SuccessUpdate: 'Successful update',
  SuccessDelete: 'Successful delete',
  FailedCreate: 'Failed create',
  FailedUpdate: 'Failed update',
  FailedDelete: 'Failed delete',
} as const;
type ActionMessage = typeof ActionMessage[keyof typeof ActionMessage];

export const JsonMessage = {
  Valid: 'Json format OK!',
  InValid: 'JSONの形式が正しくありません',
} as const;
type JsonMessage = typeof JsonMessage[keyof typeof JsonMessage];

export const InvalidMessage = {
  InvalidUrl: 'URLに指定できない文字列が含まれています',
  InvalidRequire: '入力されていない項目があります',
} as const;
type InvalidMessage = typeof InvalidMessage[keyof typeof InvalidMessage];
