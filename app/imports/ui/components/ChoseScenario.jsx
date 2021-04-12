import { _ } from 'meteor/underscore';
import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import swal from 'sweetalert';
import { Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';


function ChoseScenario(
    {
        milesSavedTotal,
        milesSavedPerDay,
        modesOfTransport,
        userProfile,
        ghgProducedTotal,
        ghgReducedPerDay,
        fuelSavedPerDay,
    },
) {

    const defaultData = useRef(true);

    const isEventSelected = useRef(false);

    // change to useState()
    let nMilesSavedPerDay = useRef(_.map(milesSavedPerDay.mode, (mode, i) => ({
        date: milesSavedPerDay.date[i],
        distance: milesSavedPerDay.distance[i],
        mode: mode,
    })));

    let nModesOfTransport = useRef(_.map(modesOfTransport.label, (mode, i) => ({
        label: mode,
        value: modesOfTransport.value[i],
    })));

    let nGHGProducedTotal = useRef(ghgProducedTotal);

    // state for events in fullcalendar
    const [events, setEvents] = useState(() => _.map(milesSavedPerDay.date, function (date, i) {
        const year = `${date.getFullYear()}`;
        let month = `${date.getMonth() + 1}`;
        let day = `${date.getDate()}`;

        // Adjust month and day to have 2 numbers if necessary
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }

        return { id: i, title: milesSavedPerDay.mode[i], date: [year, month, day].join('-') };
    }));

    // state for event user selected in fullcalendar
    const [selectedEvent, setSelectedEvent] = useState(() => ({ id: null, title: null, date: 'no date selected' }));

    // state for transport user selected in form
    const [transport, setTransport] = useState();

    // sets events back to user's original data
    function defaultEvents() {
        setEvents(() => _.map(milesSavedPerDay.date, function (date, i) {
            const year = `${date.getFullYear()}`;
            let month = `${date.getMonth() + 1}`;
            let day = `${date.getDate()}`;

            // Adjust month and day to have 2 numbers if necessary
            if (month.length < 2) {
                month = `0${month}`;
            }
            if (day.length < 2) {
                day = `0${day}`;
            }

            return { id: i, title: milesSavedPerDay.mode[i], date: [year, month, day].join('-') };
        }));
    }

    // on clicking event, it stores event information in state selectedEvent
    const handleEventSelect = (info) => {
        const year = `${info.event.start.getFullYear()}`;
        let month = `${info.event.start.getMonth() + 1}`;
        let day = `${info.event.start.getDate()}`;

        // Adjust month and day to have 2 numbers if necessary
        if (month.length < 2) {
            month = `0${month}`;
        }
        if (day.length < 2) {
            day = `0${day}`;
        }

        // update state selectEvent with event user selected on fullcalendar
        setSelectedEvent(() => ({ id: info.event.id, title: info.event.title, date: [year, month, day].join('-'), oldDateFormat: info.event.start }));
        defaultData.current = false;
        isEventSelected.current = true;
    };

    // on clicking submit button, updates state events with new info
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // check that event is selected to change
        if (isEventSelected.current === true) {
            // store event state in array
            const eventArr = [...events];
            // update array with new event info
            eventArr[selectedEvent.id] = { id: eventArr[selectedEvent.id].id, title: transport, date: selectedEvent.date };
            // update state events with array
            setEvents(eventArr);

            // update nMilesSavedPerDay with new info
            nMilesSavedPerDay.current[selectedEvent.id] = {
                date: selectedEvent.oldDateFormat,
                distance: nMilesSavedPerDay.current[selectedEvent.id].distance,
                mode: nMilesSavedPerDay.current[selectedEvent.id].mode,
            };

            // get index of original mode
            const indexOfOldTransport = nModesOfTransport.current.findIndex(({ label }) => label === selectedEvent.title);
            // decrement value of original mode
            nModesOfTransport.current[indexOfOldTransport] = { label: nModesOfTransport.current[indexOfOldTransport].label, value: nModesOfTransport.current[indexOfOldTransport].value - 1 };
            // get index of what if mode
            const indexOfNewTransport = nModesOfTransport.current.findIndex(({ label }) => label === transport);
            if (indexOfNewTransport === -1) {
                nModesOfTransport.current.push({ label: transport, value: 1 });
            } else {
                // increment index of what if mode
                nModesOfTransport.current[indexOfNewTransport] = {
                    label: transport,
                    value: nModesOfTransport.current[indexOfNewTransport].value + 1,
                };
            }

            // update nGHGProducedTotal
            // ! check for if user doesn't have autoMPG registered
            let ghgProduced = 0;
            const userMPG = userProfile.autoMPG;
            const ghgPerGallon = 19.6;
            _.forEach(nMilesSavedPerDay.current, function (objects) {
                if (objects.mode === 'Gas Car' || objects.mode === 'Carpool') {
                    ghgProduced += ((objects.distance / userMPG) * ghgPerGallon);
                }
            });
            nGHGProducedTotal.current = ghgProduced;
        } else {
            swal('Pick a date');
        }
    };

    // updates selected state transport
    const handleChange = (event, { value }) => setTransport(value);

    return (
        <div>
            {/* renders fullcalendar */}
            <div id='calendar-container'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    contentHeight={400}
                    selectable={true}
                    eventClick={handleEventSelect}
                    events={events}
                />
            </div>

            {/* render form to select mode of transportation */}
            <Form id='calendar-form' onSubmit={handleSubmit}>
                <Form.Field>
                    Selected date: {selectedEvent.date}
                </Form.Field>
                <Form.Radio
                    label='Bike'
                    checked={transport === 'Bike'}
                    value='Bike'
                    onClick={handleChange}
                />

                <Form.Radio
                    label='Carpool'
                    checked={transport === 'Carpool'}
                    value='Carpool'
                    onClick={handleChange}
                />

                <Form.Radio
                    label='Electric Vehicle'
                    checked={transport === 'Electric Vehicle'}
                    value='Electric Vehicle'
                    onClick={handleChange}
                />

                <Form.Radio
                    label='Gas Car'
                    checked={transport === 'Gas Car'}
                    value='Gas Car'
                    onClick={handleChange}
                />

                <Form.Radio
                    label='Public Transportation'
                    checked={transport === 'Public Transportation'}
                    value='Public Transportation'
                    onClick={handleChange}
                />

                <Form.Radio
                    label='Telework'
                    checked={transport === 'Telework'}
                    value='Telework'
                    onClick={handleChange}
                />

                <Form.Radio
                    label='Walk'
                    checked={transport === 'Walk'}
                    value='Walk'
                    onClick={handleChange}
                />

                <Form.Field>
                    <Form.Button content='submit'/>
                </Form.Field>
            </Form>

            <Button id='defaultButton' onClick={defaultEvents}>Default</Button>
        </div>
    );
}

ChoseScenario.propTypes = {
    tripDate: PropTypes.instanceOf(Date),
    milesSavedTotal: PropTypes.number,
    milesSavedPerDay: PropTypes.object,
    modesOfTransport: PropTypes.object,
    userProfile: PropTypes.object,
    ghgProducedTotal: PropTypes.string,
    ghgReducedPerDay: PropTypes.object,
    fuelSavedPerDay: PropTypes.object,
};

export default ChoseScenario;
