export const mutations = {
    'SET_CLASSROOMS'(state, classrooms) {
        state.classrooms = classrooms;
    },
    'SET_ORDERS'(state, orders) {
        state.orders = orders;
    },
    'SET_ORDER_PUPILS'(state, {id, pupils}) {
        const classrooms = state.classrooms;

        state.ordersPupils[id] = [];

        if (pupils) pupils.forEach((pupil) => {
            const classTitle = classrooms.find(classroom => classroom.id === pupil.id_classroom).title;
            pupil.classTitle = classTitle;

            if (pupil.full_name) {
                state.ordersPupils[id].push(pupil);
            }
        });
    },
    'SET_CLASSROOM_PUPILS'(state, [classroomId, pupils]) {
        state.classroomsPupils[classroomId] = pupils;
    },
    'SET_PUPILS_RESULTS'(state, {id, pupils}) {
        state.pupilsResults[id] = pupils;
    },
    'SET_PUPIL_DETAILED_RESULTS'(state, {id, results}) {
        state.pupilDetailedResults[id] = results;
    },
    'ADD_CLASS'(state, newClass) {
        state.classrooms.push(newClass);
    },
    'ADD_PUPIL_TO_CLASS'(state, newPupil) {
        state.classroomsPupils[newPupil.id_classroom].push(newPupil);
    },
    'CHANGE_ORDER_TEACHER_NAME'(state, { newName, id }) {
        const order = state.orders.find(order => order.id == id);

        if (order) {
            order.full_name = newName;
        }
    },
    'CHANGE_ORDER_TEACHER_WORK_TITLE'(state, { newWorkTitle, id }) {
        const order = state.orders.find(order => order.id == id);

        if (order) {
            order.work_title = newWorkTitle;
        }
    },
    'CHANGE_ORDER_TEACHER_WORK_PLACE'(state, { newWorkPlace, id }) {
        const order = state.orders.find(order => order.id == id);

        if (order) {
            order.workplace = newWorkPlace;
            order.school = '';
            order.id_school = 0;
        }
    },
    'CHANGE_ORDER_TEACHER_SCHOOL'(state, { school, schoolId, id }) {
        const order = state.orders.find(order => order.id == id);

        if (order) {
            order.school = school;
            order.id_school = schoolId;
        }
    },
    'DELETE_ORDER'(state, id) {
        const orderIndex = state.orders.findIndex(order => order.id == id);

        if (orderIndex !== -1) {
            state.orders.splice(orderIndex, 1);
        }
    },
    'DELETE_PUPIL_FROM_ORDER'(state, { access, olympId, orderId }) {
        const pupilIndex = state.ordersPupils[orderId].findIndex((pupil, index) => {
            if (
                pupil.access == access
                && pupil.id_olympic == olympId
            ) {
                return index;
            }
        });

        if (pupilIndex) {
            state.ordersPupils[orderId].splice(pupilIndex, 1);
        }
    },
};
