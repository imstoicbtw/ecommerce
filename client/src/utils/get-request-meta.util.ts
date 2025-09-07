export function getRequestMeta (search: string) {
    const params = new URLSearchParams(search);
    return {
        size: params.get("size") ? parseInt(params.get("size")!) : undefined,
        page: params.get("page") ? parseInt(params.get("page")!) : undefined,
        keyword: params.get("keyword") || undefined,
    };
}