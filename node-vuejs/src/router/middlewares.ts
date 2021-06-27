import store from '../store/index';

function authentificated(to: any, from: any, next: any)
{
    if (store.state.currentUser) next();
    else next({ name: 'home', query: {login: true} });
}

export default {
    authentificated
}