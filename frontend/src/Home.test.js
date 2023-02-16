import { render, screen } from '@testing-library/react';
import Home from './Home';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

describe('Home',() => {
    const mockStore = createMockStore([]);

    const state = {
    };
    
    const store = mockStore(state);    
    
    it('renders Home component', ()=>{        
        render(
            <Provider store={store}>
              <Home/>
            </Provider>
        );
    });
});
