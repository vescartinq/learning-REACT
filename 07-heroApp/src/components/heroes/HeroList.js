import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
  // Si el publisher no cambia, no necesito volver a generar la info -> useMemo
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);
  // const hero = getHeroesByPublisher(publisher);

  return (
    <div className="card-columns animate__animated animate__fadeIn">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};
