import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Settings} from "@mui/icons-material";
import Dictionary from "components/Dictionary";
import { FirebaseContext } from "components/Firebase";
export interface IHeaderProps {
  className?: string;
}

export interface IHeaderState {

}

class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
    }
  }

  public render() {
    return (
      <>
        <IconButton
          size="medium"
          color="primary"
        >
          <Settings />
        </IconButton>
        <div className="authentication">
          <FirebaseContext.Consumer>
            {(firebase: any) => (
              <Button
                size="large"
                color="primary"
                variant="outlined"
                style={{ borderRadius: 25 }}
                onClick={() => firebase.signInWithEmailAndPassword("bagratinho@gmail.com", "br224728")}
              >
                <Dictionary label="signIn"/>
              </Button>
            )}
          </FirebaseContext.Consumer>
          <span>or</span>
          <Button
            size="large"
            color="primary"
            variant="contained"
            style={{ borderRadius: 25 }}
            disableElevation
          >
            <Dictionary label="signUp"/>
          </Button>
        </div>
      </>
    );
  }
}

export default Header;
