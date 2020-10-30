import Axios from 'axios';
import { Method } from 'src/types/method';

class MethodsRepository {
  /**
   * APIに紐づくMethodをすべて取得します。
   */
  async getByApiId(apiId: string): Promise<Method[]> {
    const response = await Axios.get<Method[]>(`api/v1/apis/${apiId}/methods`);
    return response.data;
  }
  /**
   * Methodをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Method> {
    const response = await Axios.get<Method>(`api/v1/methods/${id}`);
    return response.data;
  }
}

export const methodsRepository = new MethodsRepository();
