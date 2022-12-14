import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SchoolCard from '../SchoolCard/SchoolCard';

const FavoriteSchools = ({ favoriteSchools }) => {

  const returnFavoriteSchoolCards = () => {
    const favoriteSchoolCards = favoriteSchools.map((list) => {
      return (
        <SchoolCard 
          key={Math.random()} 
          school={list.latest.school}
          costPerYear={list.latest.cost.attendance.academic_year}
        />
      )
    })
    return favoriteSchoolCards
  }

  return (
    <section>
      {favoriteSchools.length ? returnFavoriteSchoolCards() : <h2 style={{textAlign: 'center'}}>No Favorites Yet!</h2>}
    </section>
  )
}

export default FavoriteSchools;

FavoriteSchools.propTypes = {
  favoriteSchools: PropTypes.array.isRequired
};