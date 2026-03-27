/**
 * Cloudflare Workers 入口文件
 * 用于托管 Live2D Widget 静态资源
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      });
    }

    const url = new URL(request.url);
    let path = url.pathname;

    // 根路径重定向到 autoload.js
    if (path === '/' || path === '') {
      return Response.redirect(url.origin + '/dist/autoload.js', 302);
    }

    // 从静态资源中获取文件
    const response = await env.ASSETS.fetch(request);

    // Add CORS headers to response
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    return newResponse;
  }
};
