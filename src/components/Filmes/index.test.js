import React from "react";
import { render } from '@testing-library/react-native';
import Filmes from '.';

describe('Films Components', () => {
  it('should render Films component', () => {
    const data = {
      nome: 'Nome do Filme',
      foto: 'caminho/para/a/foto.jpg'
    };

    const { getByText } = render(<Filmes data={data} />);

    expect(getByText(data.nome)).toBeTruthy();
  });
});
