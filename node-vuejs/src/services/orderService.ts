import store from '../store/index';
import EventSource from 'eventsource';

const updateUrl = 'http://localhost:8000';

function deliveryOrderEvent(callback: any)
{
    return new EventSource(updateUrl + '/deliveries/available-orders/updates', {
        headers: {
            'Authorization': 'Bearer ' + store.state.currentUser.accessToken
        }
    }).addEventListener('message', response => {
        callback(response.data);
    });
}

function restaurantOrderEvent(restaurantId, callback: any)
{
    return new EventSource(updateUrl + '/restaurants/'+restaurantId+'/orders/updates', {
        headers: {
            'Authorization': 'Bearer ' + store.state.currentUser.accessToken
        }
    }).addEventListener('message', response => {
        callback(response.data);
    });
}

function consumerOrderEvent(callback: any)
{
    return new EventSource(updateUrl + '/users/'+store.state.currentUser.id+'/orders/updates', {
        headers: {
            'Authorization': 'Bearer ' + store.state.currentUser.accessToken
        }
    }).addEventListener('message', response => {
        callback(response.data);
    });
}


export default {
    consumerOrderEvent,
    restaurantOrderEvent,
    deliveryOrderEvent
}