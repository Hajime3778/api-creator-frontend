import Axios from 'axios';
import { Model } from 'src/types/model';

class ModelsRepository {
  /**
   * Modelをidで1件取得します。
   * @param  {string} id
   */
  async getById(id: string): Promise<Model> {
    const response = await Axios.get<Model>(`api/v1/models/${id}`);
    return response.data;
  }
}

export const modelsRepository = new ModelsRepository();
