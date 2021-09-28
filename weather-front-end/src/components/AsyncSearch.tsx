import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LocationInfo } from '../types/typesInfo';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type Props = {
  onChangeSelect: (event: object, newValue: any) => void;
};
export default function Asynchronous(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<LocationInfo[]>([]);
  const { onChangeSelect } = props;
  const loading = open && options.length === 0;
  let active = true;
  React.useEffect(() => {


    if (!loading) {
      return undefined;
    }

  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChangeHandle = async (value: String) => {

    fetch('http://localhost:4001/location?locationInfo=' + value)
      .then(res => res.json())
      .then(res => {
        let b: LocationInfo[] = res;
        if (active) {
          setOptions(b);
        }
      });
  }


  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title as string}
      options={options}
      loading={loading}
      onChange={onChangeSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Location"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          onChange={ev => {
            // dont fire API if the user delete input or not entered anything
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }

          }}
        />
      )}
    />
  );
}
