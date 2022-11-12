import {render, screen} from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should show calculator', () => {
        render(<App/>);
        const linkElement = screen.getByText(/AC/i);
        expect(linkElement).toBeInTheDocument();
    })
})
