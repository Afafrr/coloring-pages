import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function Modal({
  showModal,
  handleClose,
  handleClick,
  input,
}: {
  showModal: boolean;
  handleClose: () => void;
  handleClick: () => void;
  input: string;
}) {
  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <DialogTitle>Czy na pewno chcesz wygenerować obraz?</DialogTitle>
      <DialogContent>
        <Typography>
          {input.length === 0
            ? "Jeśli nie został wprowadzony tekst, wygenerowana zostanie losowa postać"
            : `Twój wprowadzony tekst to "${input}" Potwierdź czy chcesz kontynuować.`}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <Button
          autoFocus
          onClick={handleClose}
          variant="outlined"
          sx={{ width: { xs: "100%", sm: "30%" } }}
        >
          Anuluj
        </Button>
        <Button
          autoFocus
          onClick={handleClick}
          variant="contained"
          sx={{ width: { xs: "100%", sm: "30%" } }}
        >
          Generuj
        </Button>
      </DialogActions>
    </Dialog>
  );
}
