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

    // Creates array from milesSavedPerDay's fields for use in fullcalendar
    const events = _.map(milesSavedPerDay.date, function (date, i) {
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
    });

    const handleEventSelect = (info) => {
        swal(`Events: ${info.event.id} ${info.event.title} ${info.event.start}`);
        const eventDate = info.event.start.toString();
        const year = eventDate.slice(11, 15);
        let month = eventDate.slice(4, 7);
        switch (month) {
            case 'Jan':
                month = '01';
                break;
            case 'Feb':
                month = '02';
                break;
            case 'Mar':
                month = '03';
                break;
            case 'Apr':
                month = '04';
                break;
            case 'May':
                month = '05';
                break;
            case 'Jun':
                month = '06';
                break;
            case 'Jul':
                month = '07';
                break;
            case 'Aug':
                month = '08';
                break;
            case 'Sep':
                month = '09';
                break;
            case 'Oct':
                month = '10';
                break;
            case 'Nov':
                month = '11';
                break;
            case 'Dec':
                month = '12';
                break;
            default:
                break;
        }
        const day = eventDate.slice(8, 10);
        const selectedEvent = { id: info.event.id, title: info.event.title, date: [year, month, day].join('-') };
    };

    // state for transport user selected in form
    const [transport, setTransport] = useState();

    // on clicking submit button, swal message appears
    const handleSubmit = (evt) => {
        evt.preventDefault();
        swal('Success');
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
