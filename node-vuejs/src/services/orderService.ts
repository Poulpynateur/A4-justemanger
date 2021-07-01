import store from '../store/index';
import EventSource from 'eventsource';

function subscribeOrderCreateEvent(callback: any)
{
    return new EventSource('http://localhost:8000/orders-notifications', {
        headers: {
            'Authorization': 'Bearer ' + store.state.currentUser.accessToken
        }
    }).addEventListener('message', response => {
        callback(response.data);
    });
}

export default {
    subscribeOrderCreateEvent
}