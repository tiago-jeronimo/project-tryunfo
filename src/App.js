import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      newCard: [],
    };
    this.validationForms = this.validationForms.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.validacaoNumbers = this.validacaoNumbers.bind(this);
    this.validacaoNumbersNegativos = this.validacaoNumbersNegativos.bind(this);
    this.validacao = this.validacao.bind(this);
    this.validacaoNumbersMaiores = this.validacaoNumbersMaiores.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checked' ? target.checked : target.value;
    this.setState({ [name]: value },
      () => this.validationForms());
  }

  onSaveButtonClick(e) {
    e.preventDefault();
    const { cardName, cardDescription, cardImage,
      cardAttr1, cardAttr2, cardAttr3, cardRare } = this.state;

    const theCard = [{
      cardName: { cardName },
      cardDescription: { cardDescription },
      cardImage: { cardImage },
      cardAttr1: { cardAttr1 },
      cardAttr2: { cardAttr2 },
      cardAttr3: { cardAttr3 },
      cardRare: { cardRare },
    }];
    this.setState((prevState) => ({ newCard: [...prevState.newCard, theCard],
    }));
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      cardTrunfo: false,
    });
  }

  validacaoNumbers() {
    const limite = 90;
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    if (cardAttr1 > limite || cardAttr2 > limite || cardAttr3 > limite) {
      return true;
    }
    return false;
  }

  validacaoNumbersNegativos() {
    const minimo = 0;
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    if (cardAttr1 < minimo || cardAttr2 < minimo || cardAttr3 < minimo) {
      return true;
    }
    return false;
  }

  validacaoNumbersMaiores() {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const maximo = 210;
    const somatoriaNumeros = (+cardAttr1 + +cardAttr2 + +cardAttr3);
    if (somatoriaNumeros <= maximo) {
      return false;
    }
    return true;
  }

  validacao() {
    const { cardName, cardDescription, cardImage } = this.state;
    if (cardName !== '' && cardDescription !== '' && cardImage !== '') {
      return false;
    }
    return true;
  }

  // SE TODAS RETORNAREM FALSE: isSaveButtonDisabled vai ficar false
  // SE TODAS RETORNAREM TRUE : isSaveButtonDisabled vai ficar TRUE
  // se alguma retornar false: isSaveButtonDisabled vai ficar false
  // Se alguma retornar true: isSaveButtonDisabled vai ficar false

  validationForms() {
    if (this.validacao()
    || this.validacaoNumbers()
    || this.validacaoNumbersNegativos()
    || this.validacaoNumbersMaiores()) {
      this.setState({ isSaveButtonDisabled: true });
    } else {
      this.setState({ isSaveButtonDisabled: false });
    }
  }

  render() {
    const { state: {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
    } } = this;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardImage={ cardImage }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

export default App;
