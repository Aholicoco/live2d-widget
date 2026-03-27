/**
 * Cloudflare Workers 入口文件
 * 用于托管 Live2D Widget 静态资源
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 获取请求路径
    let path = url.pathname;

    // 根路径重定向到 autoload.js
    if (path === '/' || path === '') {
      return Response.redirect(url.origin + '/autoload.js', 302);
    }

    // 从静态资源中获取文件
    return env.ASSETS.fetch(request);
  }
};
