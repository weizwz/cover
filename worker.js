addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  let path = url.pathname

  // 如果是 API 请求
  if (path.startsWith('/api')) {
    return handleApiRequest(request)
  }

  // 否则尝试提供静态资源
  let file = await STATIC_FILES.get(path === '/' ? '/index.html' : path)

  if (file) {
    return new Response(file, {
      headers: { 'Content-Type': getContentType(path) }
    })
  } else {
    return new Response('404: Not Found', { status: 404 })
  }
}

async function handleApiRequest(request) {
  // 根据请求路径和方法来处理不同的 API 请求
  if (request.method === 'GET' && request.url.endsWith('/api/data')) {
    return new Response(JSON.stringify({ message: 'This is an API response!' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } else {
    return new Response('405: Method Not Allowed', { status: 405 })
  }
}

function getContentType(path) {
  const ext = path.split('.').pop()
  switch (ext) {
    case 'html':
      return 'text/html;charset=UTF-8'
    case 'js':
      return 'application/javascript'
    case 'css':
      return 'text/css'
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    default:
      return 'application/octet-stream'
  }
}
