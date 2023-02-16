//? Teraz sie nie importuje Reacta do wszystkich komponentów?

import styles from "../Card.module.css";
//* Tutaj musisz osadzić props data jako obiekt, jeżeli przekazujesz w nim cały obiekt, w innych wypadkach nie trzeba tego robić
interface CardObject {
    data: {
        id: number;
        imgSrc: string;
        name: string;
        surname: string;
        street: string;
        postCode: string;
        town: string;
        subRegion: string;
        phoneNumber: string;
    };
}

export const Card = ({ data }: CardObject) => {
    const { imgSrc } = data; //! --> Podmień
    return (
        <>
            <main className={styles.card}>
                <section className={styles.cardleft}>
                    <picture className={styles.cardleft__avatar}>
                        <img className={styles.cardleft__img} src={imgSrc}></img>
                    </picture>
                </section>
                <section className={styles.cardright}>
                    <div className={styles.cardright__fullName}>
                        <h4>Imię Nazwisko</h4>
                        <p className={styles.cardright__paragraph}>
                            {data.name} {data.surname}
                        </p>
                    </div>
                    <div className={styles.cardright__address}>
                        <h4> Adres</h4>
                        <p className={styles.cardright__paragraph}>
                            {data.street} {data.postCode}
                        </p>
                    </div>

                    <div className={styles.cardright__town}>
                        <h4>Miasto</h4>
                        <p className={styles.cardright__paragraph}>{data.town}</p>
                    </div>
                    <div className={styles.cardright__subRegion}>
                        <h4>Województwo</h4>
                        <p className={styles.cardright__paragraph}>{data.subRegion}</p>
                    </div>
                    <div className={styles.cardright__phoneNumber}>
                        <h4>Telefon</h4>
                        <p className={styles.cardright__paragraph}>{data.phoneNumber}</p>
                    </div>
                </section>
            </main>
        </>
    );
};
