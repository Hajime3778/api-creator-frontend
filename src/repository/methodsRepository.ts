import Axios, { AxiosResponse } from 'axios';
import { Method } from 'src/types/method';

class MethodsRepository {
  /**
   * APIに紐づくMethodをすべて取得します。
   */
  async getByApiId(apiId: string): Promise<Method[]> {
    const response = await Axios.get<Method[]>(`apis/${apiId}/methods`);
    if (response.status !== 200) return [];
    return response.data;
  }

  /**
   * Methodをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Method | null> {
    const response = await Axios.get<Method>(`methods/${id}`);
    if (response.status !== 200) return null;
    return response.data;
  }

  /**
   * Methodを作成します。
   * @param  {Method} method
   */
  async create(method: Method): Promise<AxiosResponse<{ id: string }>> {
    const response = await Axios.post<{ id: string }>('methods', method);
    return response;
  }

  /**
   * Methodを更新します。
   * @param  {Method} method
   */
  async update(method: Method): Promise<AxiosResponse<any>> {
    const response = await Axios.put('methods', method);
    return response;
  }

  /**
   * Methodを削除します。
   * @param  {string} id
   */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const response = await Axios.delete(`methods/${id}`);
    return response;
  }
}

export const methodsRepository = new MethodsRepository();
