class InterceptModel {
    public url: string;
    public endpoint: string;
    public method: string;
    public status: number;
    public body: {};

    constructor() {
        this.url = '**'
        this.endpoint = ''
        this.method = 'GET'
        this.status = 200
        this.body = {}
    }
}

export default InterceptModel;