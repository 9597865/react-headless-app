import cute from 'cute-http';
import qs from 'qs';
import { message } from 'antd';
import axios from 'axios';
import reqwest from 'reqwest';

cute.setConfig({
  retryCount: 3, // 重试次数
  timeout: 8000, // 超时时间
  debug: true, // 打开debug模式
});

const getXFormOptions = () => ({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  withCredentials: true,
});
const generalOptions = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

const checkCode = (method, reply, url = '', returnServerData = true) => {
  const statusCode = reply.statusCode || 0;
  const data = reply.data || reply;
  if (statusCode >= 400) throw new Error(`服务器内部错误${statusCode}`);
  const { message = '接口格式错误', response, code, data: d, msg } = data;

  /** custom : api response result */
  if (code != undefined) {
    if (code != 0 && code != 10000) {
      throw new Error(`${method}: ${url} ${msg || message}`);
    }
  }
  //
  if (returnServerData) {
    return data; // 直接返回axios的 reply.data, 即服务器返回的原始数据
  }
  return d || response || data;
};

const attachPrefixAndData = (url, data) => {
  const prefixedUrl = `${url}`;
  // const host = window.location.host;
  // if(['tcms.pcg.com', 'stage.tcms.pcg.com'].includes(host) ){
  //   prefixedUrl = `http://api.tcms.pcg.com/baihua${url}`;
  // }

  if (data) {
    if (url.includes('?')) return `${prefixedUrl}&${qs.stringify(data)}`;
    return `${prefixedUrl}?${qs.stringify(data)}`;
  }
  return prefixedUrl;
};

function handleError(error, options, defaultValue) {
  // 上报错误到 sentry https://sentry.oa.com/Tencent/leah-react-app/
  window.Raven && window.Raven.captureException(error, { extra: options });
  // console.error(options, error.message);
  // message.error(error.message);
  if (!defaultValue) {
    throw error;
  } else {
    if (error?.response && error.response.status >= 400) {
      message.error(`服务器内部错误 ${error.response.status}`);
    }
  }

  // 返回默认值
  return defaultValue;
}

/**
 *
 * @param {*} method
 * @param {*} url
 * @param {*} data
 * @param {*} defaultValue
 * @param {object} options
 * @param {boolean} [options.returnServerData=false] - false: 返回服务器响应的data值，true：返回服务原始的响应数据 {code, msg, data}
 */
async function sendRequest(method, url, data, defaultValue, options) {
  try {
    const { returnServerData } = options;
    delete options.returnServerData;
    const mergedOpt = { ...generalOptions, ...options };
    const reply = await cute[method](attachPrefixAndData(url), data, mergedOpt);
    return checkCode(method, reply, url, returnServerData);
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

// eslint-disable-next-line
const method_multiMethodName = {
  get: 'multiGet',
  post: 'multiPost',
  put: 'multiPut',
  patch: 'multiPatch',
  delete: 'multiDelete',
};

/**
 *发起一组多个相同类型的请求
 * @param {'get' | 'post' | 'put' | 'patch' | 'delete'} method
 * @param {{url:string, data:any}} urlItems
 * @param {any} defaultValue
 * @param {*} options
 */
async function sendMultiSameRequest(
  method,
  urlItems,
  defaultValue = '',
  options = {},
) {
  try {
    const _urlItems = urlItems.map(item => attachPrefixAndData(item.url));
    const failStrategy =      options.failStrategy !== undefined
      ? options.failStrategy
      : cute.const.KEEP_ALL_BEEN_EXECUTED;
    const mName = method_multiMethodName[method];
    const replyList = await cute[mName](_urlItems, {
      ...generalOptions,
      failStrategy,
    });
    return replyList.map(r => checkCode(method, r));
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

async function get(url, data, defaultValue = '', options = {}) {
  return sendRequest('get', url, data, defaultValue, options);
}

async function del(url, data, defaultValue = '', options = {}) {
  return sendRequest('delete', url, data, defaultValue, options);
}

async function post(url, data, defaultValue = '', options = {}) {
  return sendRequest('post', url, data, defaultValue, options);
}

async function put(url, data, defaultValue = '', options = {}) {
  return sendRequest('put', url, data, defaultValue, options);
}

async function patch(url, data, defaultValue = '', options = {}) {
  return sendRequest('patch', url, data, defaultValue, options);
}

async function xFormPost(url, data, defaultValue = '', options = {}) {
  try {
    const xFormOptions = getXFormOptions();
    const reply = await cute.post(attachPrefixAndData(url, data), xFormOptions);
    return checkCode('post', reply, url);
  } catch (err) {
    return handleError(err, options, defaultValue);
  }
}

async function multiGet(urls, defaultValue = '', options = {}) {
  const urlItems = urls.map((item) => {
    if (typeof item === 'string') return { url: item };
    return item;
  });
  return sendMultiSameRequest('get', urlItems, defaultValue, options);
}

async function multiPost(items, defaultValue = '', options = {}) {
  return sendMultiSameRequest('post', items, defaultValue, options);
}

async function postFromData(url, data) {
  const formData = new FormData();
  Object.keys(data).forEach((k) => {
    formData.append(k, data[k]);
  });

  const instance = axios.create({
    withCredentials: true,
  });

  return new Promise((resolve, reject) => {
    instance.post(url, formData).then((res) => {
      if (res.status == 200) {
        resolve(res.data);
      } else {
        reject(res.status);
      }
    });
  });
}

/**
 * 兼容老式写法
 *   http({
 *     method: 'get', url: list, data: { where, page, size },
 *   })
 * @param {*} param0
 */
const http = async ({ checkFn = checkCode, defaultValue, ...options }) => {
  try {
    // jsonp 通过 reqwest 发送
    if (options.method === 'jsonp') {
      const data = await reqwest({
        type: 'jsonp',
        url: `${options.url}?${qs.stringify(options.data)}`,
      });
      return checkFn(
        options.method,
        data,
        options.url,
        options.returnServerData,
      );
    }
    // get 请求通过params发送参数
    if (options.method === 'get' || !options.method) {
      options.params = options.data;
      delete options.data;
    }

    options.withCredentials = true;
    const { data } = await axios(options);
    return checkFn(options.method, data, options.url, options.returnServerData);
  } catch (error) {
    // 上报错误到 sentry https://sentry.oa.com/Tencent/leah-react-app/
    window.Raven && window.Raven.captureException(error, { extra: options });
    console.error(options, error.message);
    message.error(error.message);
    // 返回默认值
    return defaultValue;
  }
};

http.get = get;
http.del = del;
http.put = put;
http.xFormPost = xFormPost;
http.post = post;
http.patch = patch;
http.postFromData = postFromData;
http.multiGet = multiGet;
http.multiPost = multiPost;
http.crossDomainPost = cute.crossDomainPost;
http.createFileForm = cute.createFileForm;

export default http;
