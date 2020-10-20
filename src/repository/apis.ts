import Axios from 'axios';
import { Api } from 'src/types/api';

// import * as apisMock from '../../test/__mocks__/apis.json';

export class ApiRepository {
  /**
   * APIをすべて取得します。
   */
  async getAll(): Promise<Api[]> {
    const response = await Axios.get<Api[]>('api/v1/apis');
    return response.data;
  }
  /**
   * APIをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Api> {
    const response = await Axios.get<Api>(`api/v1/apis/${id}`);
    return response.data;
  }
}
