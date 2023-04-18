import { LeftCardSide } from './LeftCardSide';
import { UserInfo } from './LeftCardSide';
import { RightCardSide } from './RightCardSide';

import style from './Card.module.css';

export default function ClientCard({ cards }: { cards: UserInfo }) {
  return (
    <>
      <div className={style.card} key={cards.id}>
        <LeftCardSide cards={cards} />
        <RightCardSide cards={cards} />
      </div>
    </>
  );
}
