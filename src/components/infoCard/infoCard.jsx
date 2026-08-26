import S from './infoCard.module.scss';

export default function InfoCard({ img, alt, subtitulo, paragrafo, textBotao, status }) {
    return (
        <article className={S.article}>
            <div className={S.cardImage}>
                <img src={img} alt={alt} />
            </div>
            
            <div className={S.cardContent}>
                <h2>{subtitulo}</h2>
                <p>{paragrafo}</p>
                <span
                className={
                    status === "importante"
                    ? `${S.btnImportante}`
                    : `${S.btnUrgente}`
                }
                >
                {textBotao}
                </span>
            </div>
        </article>
    );
}
