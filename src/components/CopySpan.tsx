import {ClickAwayListener, Tooltip} from "@mui/material";
import {useState} from "react";

interface Props {
  value: string;
}

const CopySpan = ({value}:Props)=>{
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        console.log(`"${value}" was copied to clipboard.`);
        setMessage('👍 Text copied');
        setOpen(true);
      })
      .catch((err) => {
        console.error(`Error copying text to clipboard: ${err}`);
        setMessage('Unable to copy');
        setOpen(true);
      });
    setOpen(true);
  };

  return(<>
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={message}
        >
          <span onClick={handleClick}>{value} </span>
        </Tooltip>
      </div>
    </ClickAwayListener>

  </>);
}

export default CopySpan;