import Axios, { AxiosResponse } from 'axios';
import { Model } from 'src/types/model';

class ModelsRepository {
  /**
   * Modelをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Model> {
    const response = await Axios.get<Model>(`models/${id}`);
    return response.data;
  }

  /**
   * ModelをapiIdで1件取得します。
   * @param  {string} ApiId
   */
  async getByApiId(id: string): Promise<Model | null> {
    const response = await Axios.get<Model>(`apis/${id}/model`);
    if (response.status !== 200) return null;
    return response.data;
  }

  /**
   * Modelを作成します。
   * @param  {Model} model
   */
  async create(model: Model): Promise<AxiosResponse<{ id: string }>> {
    const response = await Axios.post<{ id: string }>('models', model);
    return response;
  }

  /**
   * Modelを更新します。
   * @param  {Model} model
   */
  async update(model: Model): Promise<AxiosResponse<any>> {
    const response = await Axios.put('models', model);
    return response;
  }

  /**
   * Modelを削除します。
   * @param  {string} id
   */
  async delete(id: string): Promise<AxiosResponse<any>> {
    const response = await Axios.delete(`models/${id}`);
    return response;
  }
}

export const modelsRepository = new ModelsRepository();
