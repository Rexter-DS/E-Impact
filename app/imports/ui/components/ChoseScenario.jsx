import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Form, Checkbox } from 'semantic-ui-react';

export default class ChoseScenario extends React.Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (
        <div>
          <div id='calendar-container'>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                contentHeight={300}
                selectable={true}
            />
          </div>

          <Form id='calendar-form'>
            <Form.Field>
              Mode of Transportation: <b>{this.state.value}</b>
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Bike'
                name='checkboxRadioGroup'
                value='Bike'
                checked={this.state.value === 'Bike'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Carpool'
                name='checkboxRadioGroup'
                value='Carpool'
                checked={this.state.value === 'Carpool'}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                  radio
                  label='Electric Vehicle'
                  name='checkboxRadioGroup'
                  value='Electric Vehicle'
                  checked={this.state.value === 'Electric Vehicle'}
                  onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                  radio
                  label='Gas Car'
                  name='checkboxRadioGroup'
                  value='Gas Car'
                  checked={this.state.value === 'Gas Car'}
                  onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                  radio
                  label='Public Transportation'
                  name='checkboxRadioGroup'
                  value='Public Transportation'
                  checked={this.state.value === 'Public Transportation'}
                  onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                  radio
                  label='Telework'
                  name='checkboxRadioGroup'
                  value='Telework'
                  checked={this.state.value === 'Telework'}
                  onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                  radio
                  label='Walk'
                  name='checkboxRadioGroup'
                  value='Walk'
                  checked={this.state.value === 'Walk'}
                  onChange={this.handleChange}
              />
            </Form.Field>
          </Form>
        </div>
    );
  }
}
