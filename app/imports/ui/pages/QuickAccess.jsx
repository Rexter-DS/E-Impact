import React from 'react';
// import { Grid, Image } from 'semantic-ui-react';

const QuickAccessInput = () => (
      <form className='quick-access-form'>
        <div className='form-control'>
          <label>Distance Traveled(mi)</label>
          <input type='text' placeholder='0'/>
        </div>
        <div className='form-control'>
          <label>Mode of Transportation</label>
          <input type='text' placeholder='0'/>
        </div>
        <div className='form-control'>
          <label>Vehicle Miles per Gallon(gal)</label>
          <input type='text' placeholder='0'/>
        </div>
        <input type='submit' value='Submit'/>
      </form>
  );
export default QuickAccessInput;
