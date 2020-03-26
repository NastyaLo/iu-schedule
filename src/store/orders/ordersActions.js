import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;

export const actions = {
    initClassrooms: ({commit}) => {
        return new Promise((res) => {
            axios.post(`${pupilUrl}/ext/classroom/index?isAjax=1`)
                .then(({ data }) => {
                    if (data) {
                        commit('SET_CLASSROOMS', data.data);
                    }

                    res();
                })
                .catch((e) => {
                    console.log(e);
                })
        })
    },
    initOrders: ({commit}, series) => {
        axios.get(`/konkurs/s${series}/getOrders?isAjax=1`)
            .then(({ data }) => {
                commit('SET_ORDERS', data.data);
            })
            .catch((e) => {
                console.log(e);
            })
    },
    getPupilsAdditionalData: ({commit}, pupilsArr) => {
        return new Promise((res, rej) => {
            const accesses = pupilsArr.map(order => order.access);

            axios.post(
                `${pupilUrl}/ext/pupil/view-all`,
                qs.stringify({ access: accesses })
            )
                .then(({ data }) => {
                    const pupils = pupilsArr.map((orderData) => {
                        const pupilData = data.pupil.find(item => item.access === orderData.access);

                        return {
                            ...orderData,
                            ...pupilData,
                        };
                    });

                    res(pupils);
                })
                .catch((e) => {
                    rej(e);
                })
        })
    },
    initPupilsForOrder ({commit, dispatch}, id) {
        return new Promise((res) => {
            axios.post(`${pupilUrl}/ext/assign/get-order?isAjax=1`,
                qs.stringify({ id_order: id }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Accept: 'application/json, text/javascript, */*; q=0.01',
                    }
                },
            )
                .then(({ data }) => {
                    if (data.order && data.order.length > 0) {
                        return dispatch('getPupilsAdditionalData', data.order);
                    } else {
                        commit('SET_ORDER_PUPILS', {pupils: [], id});
                        res();
                        return;
                    }
                })
                .then((pupils) => {
                    if (pupils) {
                        commit('SET_ORDER_PUPILS', {id, pupils});
                        res();
                    }
                })
                .catch((e) => {
                    console.log(e, id);
                });
        });
    },
    initPupilsForClassroom({commit, dispatch}, id) {
        return new Promise((res, rej) => {
            axios.post(
                `${pupilUrl}/ext/pupil/index?isAjax=1`,
                qs.stringify({
                    query: `id_classroom = ${id}`,
                })
            )
                .then(({ data }) => {
                    commit('SET_CLASSROOM_PUPILS', [id, data.data]);
                    res();
                })
                .catch((e) => {
                    console.log(e);
                    rej();
                })
        });
    },
    getOrderPupilsResults({commit}, orderId) {
        return new Promise((res, rej) => {
           axios.post(
               `${testUrl}/ext/execution/get-execution-by-task?isAjax=1`,
               qs.stringify({
                   id_task: orderId,
               })
           )
               .then(({ data }) => {
                   if (data && data.execution) {
                       commit('SET_PUPILS_RESULTS', {
                           id: orderId,
                           pupils: data.execution,
                       });

                       res();
                   } else {
                       commit('SET_PUPILS_RESULTS', {
                           id: orderId,
                           pupils: [],
                       });

                       res();
                   }
               })
               .catch((e) => {
                   console.log(e);
                   rej();
               });
        });
    },
    getTestDetailedResults({commit}, {id, seriesId}) {
        return new Promise((res, rej) => {
            axios({
                method: 'post',
                url: `/backOffice/getTestResult?isAjax=1`,
                data: qs.stringify({
                    id_execution: id,
                    result: true,
                    full: true,
                    id_series: seriesId,
                }),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
                .then(({ data }) => {
                    commit('SET_PUPIL_DETAILED_RESULTS', {id, results: data.data});
                    res();
                })
                .catch((e) => {
                    rej();
                    console.log(e);
                })
        });
    },
    createClass({commit}, {classNum, classLetter, isCustom, schoolId}) {
        return new Promise((res, rej) => {
            let title = '';

            if (isCustom === 1) {
                title = classLetter;
            } else if (!classLetter.trim()) {
                if (classNum == -1) {
                    title = 'Дошкольники';
                } else {
                    title = classNum;
                }
            } else {
                title = `${classNum} "${classLetter}"`;
            }

            axios.post(
                `${pupilUrl}/ext/classroom/create?isAjax=1`,
                qs.stringify({
                    data: {
                        gsi_class: classNum,
                        id_school: schoolId,
                        is_custom_title: isCustom,
                        title,
                    }
                })
            )
                .then(({ data }) => {
                    commit('ADD_CLASS', data.classroom);
                    res();
                })
                .catch((e) => {
                    rej();
                    console.log(e);
                })
        })
    },
    createPupil({commit}, {classId, name}) {
        return new Promise((res, rej) => {
            if (!name) {
                rej();
                return;
            }

            axios.post(
                `${pupilUrl}//ext/pupil/create?isAjax=1`,
                qs.stringify({
                    data: {
                        id_classroom: classId,
                        full_name: name,
                    },
                })
            )
                .then(({ data }) => {
                    commit('ADD_PUPIL_TO_CLASS', data.pupil);
                    res(data.pupil);
                })
                .catch((e) => {
                    rej();
                    console.log(e);
                })
        });
    },
    sendOrderPupils({commit, dispatch}, {accesses, olympId, orderId}) {
        return new Promise((res, rej) => {
            axios.post(
                `${pupilUrl}/ext/assign/set-olp`,
                qs.stringify({
                    access: accesses.join(', '),
                    id_olympic: olympId,
                    id_order: orderId
                })
            )
                .then(({ data }) => {
                    if (data.exist === null && data.order) {
                        if (data.order.length > 0) {
                            return dispatch('getPupilsAdditionalData', data.order);
                        } else {
                            return [];
                        }
                    }

                    rej();
                })
                .then((results) => {
                    commit('SET_ORDER_PUPILS', {
                        id: orderId,
                        pupils: results,
                    });

                    res();
                })
                .catch((e) => {
                    console.log(e);
                    rej();
                });
        });
    },
    changeTeacherName({commit}, {newName, olympId}) {
        return new Promise((res, rej) => {
            axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: newName,
                    id: `OlpOrder-full_name-${olympId}`,
                })
            )
                .then(({ data }) => {
                    if (data && data.data && data.data.val) {
                        commit('CHANGE_ORDER_TEACHER_NAME', {
                            newName: data.data.val,
                            id: olympId,
                        });

                        res();
                    } else if (data && data.error) {
                        rej(data.error.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    rej('Ошибка')
                });
        });
    },
    changeTeacherWorkTitle({commit}, {newWorkTitle, olympId}) {
        return new Promise((res, rej) => {
            axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: newWorkTitle,
                    id: `OlpOrder-work_title-${olympId}`,
                })
            )
                .then(({ data }) => {
                    if (data && data.data && data.data.val) {
                        commit('CHANGE_ORDER_TEACHER_WORK_TITLE', {
                            newWorkTitle: data.data.val,
                            id: olympId,
                        });

                        res();
                    } else if (data && data.error) {
                        rej(data.error.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    rej('Ошибка')
                });
        });
    },
    changeTeacherWorkplace({commit}, {newTeacherWorkplace, olympId}) {
        return new Promise((res, rej) => {
            const setWorkplace = axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: newTeacherWorkplace,
                    id: `OlpOrder-workplace-${olympId}`,
                })
            );

            const removeSchool = axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: 0,
                    id: `OlpOrder-id_school-${olympId}`,
                })
            );

            const removeSchoolName = axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: '',
                    id: `OlpOrder-school-${olympId}`,
                })
            );

            Promise.all([setWorkplace, removeSchool, removeSchoolName])
                .then(([workplace]) => {
                    const { data } = workplace;

                    if (data && data.data && data.data.val) {
                        commit('CHANGE_ORDER_TEACHER_WORK_PLACE', {
                            newWorkPlace: data.data.val,
                            id: olympId,
                        });

                        res();
                    } else if (data && data.error) {
                        rej(data.error.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    rej('Ошибка')
                });
        });
    },
    changeTeacherSchool({commit}, {olympId, schoolId, name}) {
        return new Promise((res, rej) => {
            const school = axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: name || '',
                    id: `OlpOrder-school-${olympId}`,
                })
            );

            const idSchool = axios.post(`/ajax/inlineSave`,
                qs.stringify({
                    val: schoolId || 0,
                    id: `OlpOrder-id_school-${olympId}`,
                })
            );

            Promise.all([school, idSchool])
                .then(([schoolRes, schoolIdRes]) => {
                    if (schoolRes.data.error) {
                        rej(schoolRes.data.error);
                    }

                    if (schoolIdRes.data.error) {
                        rej(schoolIdRes.data.error);
                    }

                    res();
                    commit('CHANGE_ORDER_TEACHER_SCHOOL', {
                        id: olympId,
                        school: name,
                        schoolId,
                    });
                })
                .catch((e) => {
                    console.log(e);
                    rej('Ошибка')
                });
        });
    },
    deleteOrder({commit}, {id, series}) {
        return new Promise((res, rej) => {
            axios.post(
                `/konkurs/s${series}/ajaxOrderDel`,
                qs.stringify({ id })
            )
                .then(({ data }) => {
                    if(data.error !== undefined){
                        iu.error(data.error.msg);
                    } else if(data.popup !== undefined) {
                        res(data.popup);
                        commit('DELETE_ORDER', id);
                    }
                })
                .catch((e) => {
                    rej(e);
                    console.log(e);
                });
        })
    },
};
