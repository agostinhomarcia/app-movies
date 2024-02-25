import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Detalhes from '.';

describe('Detalhes component', () => {
  const filme = {
    nome: 'Filme Teste',
    sinopse: 'Sinopse do Filme Teste'
  };

  it('should render correctly with movie details', () => {
    const voltarMock = jest.fn();
    const { getByText } = render(<Detalhes filme={filme} voltar={voltarMock} />);

    expect(getByText(filme.nome)).toBeTruthy();
    expect(getByText('Sinopse:')).toBeTruthy();
    expect(getByText(filme.sinopse)).toBeTruthy();
  });

  it('should call voltar function when "Voltar" button is pressed', () => {
    const voltarMock = jest.fn();
    const { getByText } = render(<Detalhes filme={filme} voltar={voltarMock} />);
    const voltarButton = getByText('Voltar');

    fireEvent.press(voltarButton);
    expect(voltarMock).toHaveBeenCalled();
  });
});
