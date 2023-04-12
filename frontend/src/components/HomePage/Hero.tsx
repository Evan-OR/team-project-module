import heroStyles from '../../styles/heroStyles.module.scss';
import cocktails from '../../images/Cocktail.png';

const Hero = () => {
  return (
    <div className={heroStyles.heroWrapper}>
      <div className={heroStyles.left}>
        <div className={heroStyles.aboutWrapper}>
          <div className={heroStyles.title}>Find What's Good For You</div>
          <div className={heroStyles.about}>
            Looking for the perfect cocktail? Our website has you covered. With expertly curated recipes, search and
            filter features, and a community of cocktail enthusiasts, we're your go-to source for drink recommendations
            and reviews. Cheers to finding your new favorite drink!
          </div>
        </div>
      </div>

      <div className={heroStyles.right}>
        <img draggable={false} alt="cocktails" src={cocktails}></img>
      </div>
    </div>
  );
};

export default Hero;
