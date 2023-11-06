import { IconButton, InputAdornment } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type Props = {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
};

const VisibilityButton = ({ showPassword, setShowPassword }: Props) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword((show) => !show)}
        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) =>
          event.preventDefault()
        }
        edge="end"
      >
        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default VisibilityButton;
