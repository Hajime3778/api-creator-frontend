// export const successCreate = 'Successful create';
// export const successUpdate = 'Successful update';
// export const successDelete = 'Successful delete';
// export const failedCreate = 'Failed create';
// export const failedUpdate = 'Failed update';
// export const failedDelete = 'Failed delete';

export const ActionMessage = {
  SuccessCreate: 'Successful create',
  SuccessUpdate: 'Successful update',
  SuccessDelete: 'Successful delete',
  FailedCreate: 'Failed create',
  FailedUpdate: 'Failed update',
  FailedDelete: 'Failed delete',
} as const;
type ActionMessage = typeof ActionMessage[keyof typeof ActionMessage];
