export const getters = {
    orders: state => state.orders,
    uppaidOrders: state => {
        return state.orders.filter(order => order.status != 10);
    },
    orderById: state => id => {
        return {...state.orders.find(order => order.id == id)};
    },
    orderPupilsById: state => (id) => {
        if (state.ordersPupils[id]) {
            return state.ordersPupils[id].map(i => i);
        } else {
            return [];
        }
    },
    schoolId: state => {
        if (state.orders.length > 0) {
            return state.orders[0].id_school;
        }
    },
    olympicId: state => orderId => {
        return state.orders.find(order => order.id === orderId).id_olp_olympic;
    },
    pupilFromOrder: state => (id, access) => {
        return {...state.ordersPupils[id].find((pupil) => pupil.access === access)};
    },
    isPupilInOrder: state => (id, access) => {
        const pupil = state.ordersPupils[id].findIndex((pupil) => pupil.access === access);
        return pupil !== -1;
    },
    isInAnyOrderExcluding: state => (excludingId, access) => {
        for (const key in state.ordersPupils) {
            if (key !== excludingId) {
                const pupilIndex = state
                    .ordersPupils[key].findIndex((pupil) => pupil.access === access);

                if (pupilIndex !== -1) return key;
            }
        }

        return false;
    },
    orderPupilsResults: state => id => {
        if (state.pupilsResults[id]) {
            return [...state.pupilsResults[id]];
        }

        return [];
    },
    orderPupilResult: state => (id, access) => {
        if (state.pupilsResults[id]) {
            return state.pupilsResults[id].find(result => result.id_access === access);
        }

        return undefined;
    },
    pupilDetailedResults: state => executionId => {
        return state.pupilDetailedResults[executionId];
    },
    classrooms: state => state.classrooms,
    classroomTitle: state => id => {
        const classroom = state.classrooms.find(classroom => classroom.id == id);

        if (classroom) {
            if (classroom.is_custom_title == 1) {
                return `${classroom.title} (${classroom.gsi_class} класс)`;
            } else if (classroom.gsi_class == -1) {
                return classroom.title;
            } else {
                return `${classroom.title} класс`;
            }
        } else {
            return '';
        }
    },
    classroomPupils: state => id => {
        if (state.classroomsPupils[id]) {
            return state.classroomsPupils[id].map(i => i);
        } else {
            return [];
        }
    },
    classroomPupilByAccess: state => access => {
        for (const key in state.classroomsPupils) {
            const pupilObj = state.classroomsPupils[key].find(pupil => pupil.access === access);
            if (pupilObj) return pupilObj;
        }

        return undefined;
    },
};
