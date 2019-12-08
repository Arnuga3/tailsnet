import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from './../actions/notificationActions';

const defaultState = {
    notifications: [],
};

const notificationStore = (state = defaultState, action) => {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };

        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    notification.key === action.key
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            }

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };

        default:
            return state;
    }
};

export default notificationStore;
