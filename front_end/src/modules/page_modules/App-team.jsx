export default function Appteam() {
  function handleTogglemodalClick() {}
  return (
    <>
      <section class="team">
        <h2 className="team__title">Team</h2>
        <article class="team__article">
          <div class="team__article__imgholder">
            <img
              class="team__article__imgholder__img"
              src="../src/images/gyssens.jpg"
              alt="Stijn Gyssens"
            />
            <span class="team__article__imgholder__name">Stijn Gyssens</span>
          </div>
          <div class="team__article__description">
            <h3 class="team__article__description__job">
              Back end development
            </h3>
            <p class="team__article__description__text">Reenactor actor</p>
          </div>
        </article>
        <article class="team__article">
          <div class="team__article__imgholder">
            <img
              class="team__article__imgholder__img"
              alt="Anthony Meyers"
              src="../src/images/anthony.jpg"
            />
            <span class="team__article__imgholder__name">Anthony Meyers</span>
          </div>
          <div class="team__article__description">
            <h3 class="team__article__description__job">
              Front end development
            </h3>
            <p class="team__article__description__text">testing</p>
          </div>
        </article>
      </section>
    </>
  );
}
