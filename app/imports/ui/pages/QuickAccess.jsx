import React, { useState } from 'react';
import { Grid, Form, Input, Select } from 'semantic-ui-react';
// A suggestions portion could be added below the produced GHG section.

class QuickAccess extends React.Component {

    constructor() {
        super();
        this.state = {
            distanceTraveled: 0,
            modeOfTrans: '',
            vehicleMPG: 0,
        };
    }

    calculate() {
        const miles = this.state.distanceTraveled;
        // const mode = this.state.modeOfTrans;
        const mpg = this.state.vehicleMPG;
        if (miles <= 0 || mpg <= 0) {
            return '-';
        }
        return (miles / mpg) * 8887;
    }

    updateDistance(event) {
        this.setState({ distanceTraveled: event.target.value });
    }

    updateMode(event) {
        this.setState({ modeOfTrans: event.target.value });
    }

    updateMPG(event) {
        this.setState({ vehicleMPG: event.target.value });
    }

    render() {
        return (
            <Grid id="quick-access-container" centered>
                <Grid.Row>
                    <img src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
                </Grid.Row>
                <Grid.Row>
                    <Form>
                        <Form.Field
                            control={Input}
                            label="Distance traveled (mi)"
                            onChange={this.updateDistance.bind(this)}
                        />
                        <Form.Field
                            control={Select}
                            label="Mode of transportation"
                            options={[
                                { text: 'Bike', value: 'bike' },
                                { text: 'Bus', value: 'bus' },
                                { text: 'Car', value: 'car' },
                                { text: 'Foot', value: 'foot' },
                            ]}
                        />
                        <Form.Field
                            control={Input}
                            label="Vehicle miles per gallon"
                            onChange={this.updateMPG.bind(this)}
                        />
                    </Form>
                </Grid.Row>
                <Grid.Row>
                    <p>Miles Traveled: {this.state.distanceTraveled}; Mileage Of Vehicle (if used): {this.state.vehicleMPG}</p>
                    <br/>
                    <label>You produced {this.calculate()} grams of CO2/gallon. </label>
                </Grid.Row>
            </Grid>
        );
    }
}

// function QuickAccess() {
//   // Hooks.
//   const [miles, setMiles] = useState(1);
//   const [mpg, setMpg] = useState(1);
//   const [ghg, setGhg] = useState(0);
//   // Updates the generated greenhouse gases.
//   const updateProduced = () => {
//     setGhg((miles / mpg) * 8887);
//   };
//   // Handles of Hooks.
//   const handleMiles = miles => {
//     setMiles(miles);
//     updateProduced();
//   };
//   const handleMpg = mpg => {
//     setMpg(mpg);
//     updateProduced();
//   };
//
//   return (
//       <Grid id="quick-access-container" centered>
//         <Grid.Row>
//           <img src={'/images/QuickAccessLogo.png'} height={102} width={271} alt="Quick Access"/>
//         </Grid.Row>
//         <Grid.Row>
//           <Form>
//             <Form.Field
//                 control={Input}
//                 label="Distance traveled (mi)"
//                 onChange={e => handleMiles(e.target.value)}
//             />
//             <Form.Field
//                 control={Select}
//                 label="Mode of transportation"
//                 options={[
//                   { text: 'Bike', value: 'bike' },
//                   { text: 'Bus', value: 'bus' },
//                   { text: 'Car', value: 'car' },
//                   { text: 'Foot', value: 'foot' },
//                 ]}
//             />
//             <Form.Field
//                 control={Input}
//                 label="Vehicle miles per gallon"
//                 onChange={e => handleMpg(e.target.value)}
//             />
//           </Form>
//         </Grid.Row>
//         <Grid.Row>
//           <p>Miles Traveled: {miles}; Mileage Of Vehicle(if used): {mpg}</p>
//           <label>You produced {ghg} grams of CO2/gallon. </label>
//         </Grid.Row>
//       </Grid>
//   );
// }
export default QuickAccess;
