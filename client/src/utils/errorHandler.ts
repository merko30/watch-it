import {AxiosError} from 'axios';

const errorHandler = (err: AxiosError) => {
  return err.response?.data.message
    ? err.response?.data.message
    : 'Something went wrong';
};

export default errorHandler;
