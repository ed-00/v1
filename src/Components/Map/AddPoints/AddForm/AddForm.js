import { useState, useCallback } from "react";
import classes from "./AddForm.module.css";
import Button from "../../../UI/Button/Button";
import { useDropzone } from "react-dropzone";
import imgIcon from "../../../../icons/AddImg.svg";
import { BallTriangle } from "react-loader-spinner";

const AddForm = ({ submit }) => {
  const [err, setErr] = useState(null);
  const [place, setPlace] = useState("");
  const isValid = place != null && place.trim().length > 1;
  const [info, setInfo] = useState("");
  const [imges, setImges] = useState([]);
  const [loading, setLoading] = useState(false);

  const onPlaceChangeHandler = (event) => {
    setPlace(event.target.value);
    setErr(null);
  };
  const onInfoChangeHandler = (event) => {
    setInfo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!isValid) {
      setErr("Namnet får inte vara tom");
      return;
    }
    submit({ name: place, description: info, imgs: imges });
  };

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      const res = await fetch(url, { method: "post", body: formData });
      const data = await res.json();
      const image = { src: data.secure_url };
      setImges((PrevImges) => [...PrevImges, image]);
      setLoading(false);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: "image/jpeg,image/png,image/jpg",
      multiple: true,
    });
  return (
    <form onSubmit={submitHandler} className={classes[`add-form`]}>
      <h1>Vad heter platsen?</h1>
      {err && <p className={classes.err}>{err}</p>}
      <input
        type="text"
        required
        onChange={onPlaceChangeHandler}
        value={place}
        className={classes.name}
      ></input>

      <h1>Lägg till Bilder</h1>
      <div
        {...getRootProps()}
        className={`${classes[`drag-drop`]} ${isDragActive && classes.active} ${
          imges && classes[`add-file`]
        }`}
      >
        {!loading && imges.length !== 0 ? (
          <>
            {imges.map((img, index) => (
              <div key={index} className={classes[`upload-img`]}>
                <p>loaddar..</p>
                <img  src={img.src} alt="upload" />
              </div>
            ))}
            <div className={classes[`upload-img-svg`]}>
              <img src={imgIcon} alt="upload" />
            </div>
          </>
        ) : !loading && isDragActive ? (
          <p>
            {" "}
            <img src={imgIcon} alt="img1" />
            Droppa bilden här ...
          </p>
        ) : !loading && !isDragActive ? (
          <p>
            <img src={imgIcon} alt="img" /> Dra och släpp bilderna här, eller
            klicka för att välja
          </p>
        ) : !loading && fileRejections ? (
          <p className={classes.err}>
            Ogiltigt format, endast .jpg,.png,.jpeg{" "}
          </p>
        ) : (
          <div className={classes.loading}>
            <BallTriangle color="#38D5BC" width={40} height={40} />
            <p>Loading...</p>
          </div>
        )}
        {!loading && <input {...getInputProps()} />}
      </div>

      <h1>Extra info!</h1>
      <input
        type="textarea"
        onChange={onInfoChangeHandler}
        value={info}
        className={classes.info}
      ></input>
      <Button type="submit" disabled={!isValid && !loading}>
        Spara
      </Button>
    </form>
  );
};

export default AddForm;
