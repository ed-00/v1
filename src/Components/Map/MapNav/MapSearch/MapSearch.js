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

const MapSearch = ({ panTo, onClear, placeholder, className, onSelect }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 60.287113, lng: () => 16.883993 },
      country: "SE",
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
      if (onSelect) onSelect({ lat, lng });
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim() === "") {
      onClear();
    }
  };

  const suggestionList = data.map(({ place_id, description }) => (
    <ComboboxOption
      className={classes.listItems}
      key={place_id}
      value={description}
    />
  ));

  return (
    <div className={`${classes.search} ${className}`}>
      <Combobox onSelect={onSelectHandler}>
        <ComboboxInput
          value={value}
          onChange={onChangeHandler}
          disabled={!ready}
          placeholder={placeholder}
        />
        <ComboboxPopover className={classes.popOver}>
          <ComboboxList className={classes.suggestionList}>
            {status === "OK" && suggestionList}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default MapSearch;
