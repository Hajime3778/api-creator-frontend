import Axios from 'axios';
import { Method } from 'src/types/method';

class MethodsRepository {
  /**
   * APIに紐づくMethodをすべて取得します。
   */
  async getByApiId(apiId: string): Promise<Method[]> {
    const response = await Axios.get<Method[]>(`apis/${apiId}/methods`);
    return response.data;
  }

  /**
   * Methodをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Method> {
    const response = await Axios.get<Method>(`methods/${id}`);
    return response.data;
  }

  /**
   * Methodを作成します。
   * @param  {Method} method
   */
  async create(method: Method): Promise<string> {
    const response = await Axios.post<{ id: string }>('methods', method);
    return response.data.id;
  }

  /**
   * Methodを更新します。
   * @param  {Method} method
   */
  async update(method: Method): Promise<Method> {
    const response = await Axios.put<Method>('methods', method);
    return response.data;
  }

  /**
   * Methodを削除します。
   * @param  {string} id
   */
  async delete(id: string): Promise<Method> {
    const response = await Axios.delete<Method>(`methods/${id}`);
    return response.data;
  }
}

export const methodsRepository = new MethodsRepository();
