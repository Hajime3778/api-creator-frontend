import Axios, { AxiosResponse } from 'axios';
import { Api } from 'src/types/api';
import { CreatedResponse } from 'src/types/createdResponse';
import { Error } from 'src/types/error';

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
  async getById(id: string): Promise<Api | null> {
    const response = await Axios.get<Api>(`apis/${id}`);
    if (response.status !== 200) return null;
    return response.data;
  }

  /**
   * APIを作成します。
   * @param  {API} api
   */
  async create(api: Api): Promise<AxiosResponse<CreatedResponse | Error>> {
    // idが指定された場合、採番されないため初期化する。
    api.id = '';
    const response = await Axios.post('apis', api);
    return response;
  }

  /**
   * APIを更新します。
   * @param  {API} api
   */
  async update(api: Api): Promise<AxiosResponse<any>> {
    const response = await Axios.put('apis', api);
    return response;
  }

  /**
   * Apiを削除します。
   * @param  {string} id
   */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const response = await Axios.delete(`apis/${id}`);
    return response;
  }
}

export const apisRepository = new ApisRepository();
