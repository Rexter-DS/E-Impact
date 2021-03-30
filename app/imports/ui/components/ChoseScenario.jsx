import { _ } from 'meteor/underscore';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import swal from 'sweetalert';
import { Form } from 'semantic-ui-react';
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

    // Turns milesSavedPerDay into array while formatting date to YYYY-MM-DD
    const formatDate = _.map(milesSavedPerDay.date, function (date, i) {
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

        return { ID: i, mode: milesSavedPerDay.mode[i], date: [year, month, day].join('-') };
    });

    // Extract individual fields of formatDate
    const index = _.pluck(formatDate, 'ID');
    const transportMode = _.pluck(formatDate, 'mode');
    const date = _.pluck(formatDate, 'date');

    // Create array Events for fullcalendar using transportMode and date of formatDate
    const events = _.map(index, function (i) {
       return { title: `${transportMode[i]}`, date: `${date[i]}` };
    });

    const handleCalendarSelect = (info) => {
        swal(`selected ${info.startStr} to ${info.endStr}`);
    };

    const [transport, setTransport] = useState();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        swal('Success');
    };

    const handleChange = (event, { value }) => setTransport(value);

    return (
        <div>
            <div id='calendar-container'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    contentHeight={400}
                    selectable={true}
                    select={handleCalendarSelect}
                    events={events}
                />
            </div>

            <Form id='calendar-form' onSubmit={handleSubmit}>
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
