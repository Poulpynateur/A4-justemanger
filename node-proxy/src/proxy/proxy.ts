export class ProxyRoute {
    constructor(
        public from: string,
        public to: string = '/',
        public auth: boolean = false,
    ) {};
}

export class ServiceProxy {
    constructor(
        public uri: string,
        public routes: Array<ProxyRoute>
    ) {};
}

export const services = {
    'auth': new ServiceProxy('http://service-auth:3000', [
        new ProxyRoute('/auth', '/auth')
    ]),
    'test': new ServiceProxy('http://service-test:3000', [
        new ProxyRoute('/test'),
        new ProxyRoute('/test/secured', '/secured', true)
    ])
}