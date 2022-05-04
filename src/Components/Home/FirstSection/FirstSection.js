import React from "react";
import classes from "./FirstSection.module.css";
import { Link } from "react-router-dom";
const FirstSection = () => {
  return (
    <section className={classes[`section`]} id="FirstSection">
      <div className={classes[`main-text`]}>
        <h1>VÄLKOMMEN TILL NEDRE DALÄLVEN!</h1>
        <p>
          En resa i Nedre Dalälven är en färd genom ett ödmjukt men storslaget
          landskap. Där nord möter syd i svensk natur och där den unika miljön i
          hjärtat av området är skyddad som Nationalpark. Områdets historia är
          starkt präglad av älven, en livgivande förutsättning för bygden.
          Tidigare generationers värv och nedlagda möda har lämnat tydliga
          avtryck.
        </p>
        <p>
          {" "}
          De öppna landskapen som fortfarande breder ut sig, varvat med de djupa
          skogarna. De många välbevarade bruken, som likt ett pärlband ligger
          längs älven. Tack vare de unika natur- och kulturmiljöer som finns i
          området har det av Unesco utsetts till ett biosfärområde,
          Älvlandskapet Nedre Dalälven.
        </p>
        <Link className={classes.button} to="/explore">
          Utforska
        </Link>
      </div>
      <div className={classes.square}>
          <iframe
            title="Forest Campfire"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/af086b62a4c84ea89eda895b23d64813/embed?autostart=1"
          >
          </iframe>
      </div>
    </section>
  );
};

export default FirstSection;
