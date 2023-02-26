import heroStyles from '../../styles/heroStyles.module.scss';

const Hero = () => {
  return (
    <div className={heroStyles.heroWrapper}>
      <div className={heroStyles.left}>
        <div className={heroStyles.aboutWrapper}>
          <div className={heroStyles.title}>Find What's Good For You</div>
          <div className={heroStyles.about}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue nibh sapien, vitae efficitur lectus
            imperdiet in. Ut molestie gravida eros, ut scelerisque lacus malesuada in. Quisque maximus erat nec metus
            ornare luctus.
          </div>
        </div>
      </div>

      <div className={heroStyles.right}>COOL ICONS OR IMAGES THAT MATCH THE THEME</div>
    </div>
  );
};

export default Hero;
0;
