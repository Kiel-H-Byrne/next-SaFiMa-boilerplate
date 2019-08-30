import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useDispatch } from 'react-redux';

import GiftCard from './GiftCard';
//get list of gifts that match giftValue prop.
//firebase search Gifts where(giftValue=x)
//forEach giftitem, show gift card with selection button.

//div scroll horizontal

const GiftChoices = () => {

  // useEffect(() => {
  //   // getGifts(giftValue)
  // }, [])

  return (
    <div>
      Choices of gifts...
      <GiftCard gift={doc} />
    </div>
  );
};

export default GiftChoices;
