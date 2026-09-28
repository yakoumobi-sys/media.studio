// Existing production backend: reservations stay in the same database.
export const studioBackend = 'https://caractere-media-studio.mokka266.chatgpt.site';

export async function proxyStudio(request: Request, path: string) {
  const origin = request.headers.get('origin');
  if (request.method !== 'GET' && origin) {
    let allowed = false;
    try {
      const source = new URL(origin);
      allowed = ['http:', 'https:'].includes(source.protocol) && source.host === request.headers.get('host');
    } catch { /* Opaque and malformed origins are rejected. */ }
    if (!allowed) return Response.json({ error: 'Requête non autorisée.' }, { status: 403 });
  }
  try {
    const body = request.method === 'GET' ? undefined : await request.text();
    if (body && body.length > 12000) {
      return Response.json({ error: 'Demande trop volumineuse.' }, { status: 413 });
    }
    const upstream = new URL(path, studioBackend);
    upstream.search = new URL(request.url).search;
    // Never forward cookies or identity headers to the backend.
    const result = await fetch(upstream, {
      method: request.method,
      headers: { 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
    });
    if (!result.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Unexpected studio response');
    }
    return new Response(await result.text(), {
      status: result.status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json(
      { error: 'Le studio est momentanément indisponible. Réessayez dans un instant.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
