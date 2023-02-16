import { render } from '@testing-library/react';
import UserDetails from './userDetails';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

describe('UserDetails', () => {
    const mockStore = createMockStore([]);
    
    const state = {        
    };
    
    const store = mockStore(state);    
    
    it('renders UserDetails component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <UserDetails/>
              </Router>
            </Provider>
        );
    });
});
