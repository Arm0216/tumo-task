export class ApiRequest {
    method: API_METHODS;
    url: string;
    headers: Record<string, string>;
    data?: any;
    params?: Record<string, string>;

    constructor() {
        this.method = 'get';
        this.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
        this.url = '';
    }
}
