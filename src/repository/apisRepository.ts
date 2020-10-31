import Axios from 'axios';
import { Api } from 'src/types/api';

class ApisRepository {
  /**
   * APIをすべて取得します。
   */
  async getAll(): Promise<Api[]> {
    const response = await Axios.get<Api[]>('apis');
    return response.data;
  }
  /**
   * APIをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Api> {
    const response = await Axios.get<Api>(`apis/${id}`);
    return response.data;
  }
}

export const apisRepository = new ApisRepository();
