export default function Appteam() {
  function handleTogglemodalClick() {}
  return (
    <>
      <section className="team">
        <h2 className="team__title">Team</h2>
        <article className="team__article">
          <div className="team__article__imgholder">
            <img
              className="team__article__imgholder__img"
              src="../src/images/gyssens.jpg"
              alt="Stijn Gyssens"
            />
            <span className="team__article__imgholder__name">
              Stijn Gyssens
            </span>
          </div>
          <div className="team__article__description">
            <h3 className="team__article__description__job">
              Back end development
            </h3>
            <p className="team__article__description__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cum
              numquam harum. Blanditiis beatae doloremque perspiciatis assumenda
              distinctio id neque, illo odit reiciendis recusandae magni
              similique qui repudiandae dolor adipisci.
            </p>
          </div>
        </article>
        <article className="team__article">
          <div className="team__article__imgholder">
            <img
              className="team__article__imgholder__img"
              alt="Anthony Meyers"
              src="../src/images/anthony.jpg"
            />
            <span className="team__article__imgholder__name">
              Anthony Meyers
            </span>
          </div>
          <div className="team__article__description">
            <h3 className="team__article__description__job">
              Front end development
            </h3>
            <p className="team__article__description__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
              exercitationem accusantium, id omnis modi nihil fuga adipisci odio
              quidem illum culpa alias hic ratione. Magni eum repudiandae autem
              libero. Cupiditate.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
