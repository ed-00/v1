import classes from "./MapSearch.module.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const MapSearch = ({ panTo }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 60.287113, lng: () => 16.883993 },
       country: "se",
      radius: 200,
    },
  });

  const onSelectHandler = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const res = await getGeocode({ address });
      const { lat, lng } = await getLatLng(res[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const suggestionList = data.map(({ place_id, description }) => (
    <ComboboxOption key={place_id} value={description} />
  ));

  return (
    <div className={classes.search}>
      <Combobox onSelect={onSelectHandler}>
        <ComboboxInput
          value={value}
          onChange={onChangeHandler}
          disabled={!ready}
          placeholder="Enter an adress"
        />
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && suggestionList}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default MapSearch;
