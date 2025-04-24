import request from '../../library/axios/request';
import { ILogin, ISignUp } from './auth.model';

class AuthApi {
  ENDPOINT = '/auth';

  async signUp(data: ISignUp): Promise<any> {
    const url = `${this.ENDPOINT}/sign-up`;
    return request({ url, method: 'POST', data }).then((res: any) => {
      return res.data;
    });
  }

  async signIn(data: ILogin): Promise<any> {
    const url = `${this.ENDPOINT}/login`;
    return request({ url, method: 'POST', data }).then((res: any) => {
      return res.data;
    });
  }
}

const authApiInstance = new AuthApi();
export default authApiInstance;
