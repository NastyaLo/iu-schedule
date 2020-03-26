<template>
    <v-app id="dayspan" v-cloak>

        <CalendarApp ref="app"
             :calendar="calendar"
             :read-only="readOnly"
             @change="saveState">

            <template slot="title">
                Расписание инфошколы
            </template>

            <template slot="menuRight">
                <v-checkbox
                    label="Только для чтения?"
                    v-model="readOnly"
                ></v-checkbox>
            </template>

            <template slot="eventPopover" slot-scope="slotData">
                <CalendarEventPopover
                        v-bind="slotData"
                        :read-only="readOnly"
                        @finish="saveState"
                ></CalendarEventPopover>
            </template>

            <template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
                <CalendarEventCreatePopover
                        :calendar-event="placeholder"
                        :calendar="calendar"
                        :close="$refs.app.$refs.calendar.clearPlaceholder"
                        @create-edit="$refs.app.editPlaceholder"
                        @create-popover-closed="saveState"
                ></CalendarEventCreatePopover>
            </template>

            <template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
                <div>
                    <v-icon class="ds-ev-icon"
                            v-if="details.icon"
                            size="14"
                            :style="{color: details.forecolor}">
                        {{ details.icon }}
                    </v-icon>
                    <strong class="ds-ev-title">{{ details.title }}</strong>
                </div>
                <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
            </template>

        </CalendarApp>

    </v-app>
</template>

<script>
    import CalendarApp from './components/CalendarApp';
    import CalendarEventPopover from './components/CalendarEventPopover';
    import CalendarEventCreatePopover from './components/CalendarEventCreatePopover';

    import {Calendar, Weekday, Month} from 'dayspan';
    import Vue from 'vue';

    export default {
        name: 'app',
        components: {
            CalendarApp,
            CalendarEventPopover,
            CalendarEventCreatePopover,

        },
        data: () => ({
            storeKey: 'dayspanState',
            calendar: Calendar.months(),
            readOnly: false,
            defaultEvents: [
                {
                    data: {
                        title: 'Weekly Meeting',
                        color: '#3F51B5'
                    },
                    schedule: {
                        dayOfWeek: [Weekday.MONDAY],
                        times: [9],
                        duration: 30,
                        durationUnit: 'minutes'
                    }
                },
            ]
        }),

        mounted() {
            window.app = this.$refs.app;

            this.loadState();
        },

        methods:
            {
                getCalendarTime(calendarEvent) {
                    let sa = calendarEvent.start.format('a');
                    let ea = calendarEvent.end.format('a');
                    let sh = calendarEvent.start.format('h');
                    let eh = calendarEvent.end.format('h');

                    if (calendarEvent.start.minute !== 0) {
                        sh += calendarEvent.start.format(':mm');
                    }

                    if (calendarEvent.end.minute !== 0) {
                        eh += calendarEvent.end.format(':mm');
                    }

                    return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
                },

                saveState() {
                    let state = this.calendar.toInput(true);
                    let json = JSON.stringify(state);

                    localStorage.setItem(this.storeKey, json);
                },

                loadState() {
                    let state = {};

                    try {
                        let savedState = JSON.parse(localStorage.getItem(this.storeKey));

                        if (savedState) {
                            state = savedState;
                            state.preferToday = false;
                        }
                    } catch (e) {
                        // eslint-disable-next-line
                        console.log(e);
                    }

                    if (!state.events || !state.events.length) {
                        state.events = this.defaultEvents;
                    }

                    state.events.forEach(ev => {
                        let defaults = this.$dayspan.getDefaultEventDetails();

                        ev.data = Vue.util.extend(defaults, ev.data);
                    });

                    this.$refs.app.setState(state);
                }
            }
    }
</script>

<style>

    body, html, #app, #dayspan {
        font-family: Roboto, sans-serif !important;
        width: 100%;
        height: 100%;
    }

    .v-btn--flat,
    .v-text-field--solo .v-input__slot {
        background-color: #f5f5f5 !important;
        margin-bottom: 8px !important;
    }

</style>
