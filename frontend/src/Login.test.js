import { render, screen } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Login', () => {
    const mockStore = createMockStore([]);
    
    const state = {        
    };
    
    const store = mockStore(state);    
    
    it('renders Login component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <Login/>
              </Router>
            </Provider>
        );
    });
});
