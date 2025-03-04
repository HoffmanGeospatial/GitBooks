export interface PDFSearchParams {
    /** Page to export. If none is passed, all pages are exported. */
    page?: string;
    /** If true, only the `page` is exported, and not its descendant */
    only?: boolean;
    /** Limit the number of pages */
    limit?: number;
    /** URL to redirect back to */
    back?: string;
}

/**
 * Get the PDF export params from the URL serch params.
 */
export function getPDFSearchParams(searchParams: URLSearchParams): PDFSearchParams {
    const params: PDFSearchParams = {};

    if (searchParams.has('page')) {
        params.page = searchParams.get('page') ?? '';
    }
    if (searchParams.has('only')) {
        params.only = true;
    }
    if (searchParams.has('limit')) {
        params.limit = Number(searchParams.get('limit'));
    }
    if (searchParams.has('back')) {
        params.back = searchParams.get('back') ?? '';
    }

    return params;
}

/**
 * Update the URL with the PDF export params.
 */
export function getPDFUrl(url: URL, params: PDFSearchParams): URL {
    const copy = new URL(url);
    getPDFUrlSearchParams(params, copy.searchParams);
    return copy;
}

export function getPDFUrlSearchParams(
    params: PDFSearchParams,
    searchParams = new URLSearchParams({})
): URLSearchParams {
    if (params?.page) {
        searchParams.set('page', params.page);
    } else {
        searchParams.delete('page');
    }
    if (params?.only) {
        searchParams.set('only', 'yes');
    } else {
        searchParams.delete('only');
    }

    // Persist limit and back
    if (params?.limit) {
        searchParams.set('limit', String(params.limit));
    }
    if (params?.back) {
        searchParams.set('back', String(params.back));
    }

    return searchParams;
}
