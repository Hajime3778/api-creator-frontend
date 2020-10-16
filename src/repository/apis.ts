import { Api } from 'src/types/api';

import * as apisMock from '../../test/__mocks__/apis.json';

export function getAllApis(): Api[] {
  const apis: any = apisMock;
  return apis.default;
}
