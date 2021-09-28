import * as React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
    open: boolean
}
export default function LoadingIndicator(props: Props) {

    return (
        <div>
            {/* <Backdrop
        open={props && props.open}
      > */}
            {props && props.open === true && <CircularProgress color="inherit" />}

            {/* </Backdrop> */}
        </div>
    );
}
