import Axios from 'axios';
import { Api } from 'src/types/api';

// import * as apisMock from '../../test/__mocks__/apis.json';

export async function getAllApis(): Promise<Api[]> {
  const response = await Axios.get<Api[]>('http://localhost:4000/api/v1/apis');
  //const apis: Api[] = response.data;
  //const apis: any = apisMock;
  return response.data;
}
