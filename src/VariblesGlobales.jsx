import GlobalStyles from '@mui/material/GlobalStyles';

export default function GlobalCssOverride() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ p: { color: 'red' } }} />
    </React.Fragment>
  );
}
