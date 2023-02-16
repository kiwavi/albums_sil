import { render } from '@testing-library/react';
import Footer from './Footer';
import * as React from 'react';

describe('Footer',() => {    
    it('renders Footer component', ()=>{        
        render(
            <Footer/>
        );
    });
});
