import React, { Component } from 'react';
import './App.css';
import chariz from './charizard.png';
import charmel from './charmeleon.png';
import fire from './fire_energy.png';

class Header extends Component {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <div className="card-header">
        <span>{pokemon.name}</span>
        <span className="right">
          <small>hp</small>
          {pokemon.hp}
          <img src={fire} className="energy" alt="pokemon" />
        </span>
      </div>
    )
  }
}

class Attacks extends Component {
  renderAttacks(attacks) {
    const atks = attacks.map(atk =>
        <div key={atk.name.replace(" ", "-")}>
          <span>{atk.cost.length}</span>
          <span>{atk.name}</span>
          <span className="right">{atk.damage}</span>
          <p>{atk.text}</p>
        </div>
      );

    return (
      <div>
        {atks}
      </div>
    )
  }

  render() {
    const pokemon = this.props.pokemon;
    const hasAbility = pokemon.ability ? (
      <div>
        <span>{pokemon.ability.type}</span>
        <span>{pokemon.ability.name}</span>
        <p>{pokemon.ability.text}</p>
      </div>
    ) : null;

    return (
      <div className="attacks">
        {hasAbility}
        {this.renderAttacks(pokemon.attacks)}
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <div className="footer">
        <span className="weaknesses">{pokemon.weaknesses.map(weak => weak.type + " " + weak.value)}</span>
        <span className="resistances">{pokemon.resistances.map(resist => resist.type + " " + resist.value)}</span>
        <span className="retreat">{pokemon.retreatCost.length}</span>
      </div>
    );
  }
}

class Card extends Component {
  render() {
    const pokemon = this.props.pokemon;

    return (
      <div className="card">
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {pokemon});
        })}
      </div>
    );
  }
}

class Image extends Component {
  constructor(props) {
    super(props);
    this.renderEvolveFrom = this.renderEvolveFrom.bind(this);
  }

  renderEvolveFrom(evolveFrom) {
    return (
      <img src={charmel} className="evolves-from" alt="evolves-from"/>
    )
  }

  render() {
    const pokemon = this.props.pokemon;
    const evolvesFrom = pokemon.evolvesFrom ? this.renderEvolveFrom(pokemon.evolvesFrom) : null;

    return (
      <div>
        {evolvesFrom}
        <img className="picture" src={chariz} alt="pokemon" />
      </div>
    )
  }
};

class App extends Component {
  render() {
    const pokemon = this.props.appState.pokemon;

    return (
      <Card pokemon={pokemon}>
        <Header />
        <Image />
        <Attacks />
        <Footer />
      </Card>
    );
  }
}

export default App;
