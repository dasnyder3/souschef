import Ingredient from '../client/Components/Ingredient.jsx';
import { render, fireEvent } from '@testing-library/react';
import { build, fake } from 'test-data-bot';
import '@testing-library/jest-dom/extend-expect'


describe('', () => {
  it('render to show amount of ingredient and scale it based on the scaler value', () => { const {} = render(<Ingredient amount={2}unit={tablespoon}originalName={cheese}scaler={1}/>); })
});