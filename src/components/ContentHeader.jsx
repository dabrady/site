/** @jsxImportSource theme-ui */

import { Box } from "theme-ui";

export default function ContentHeader({ children, sidelink }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: ['space-between', 'end'],

        left: 0,
        paddingBottom: ['1.6rem', 'inherit'],
      }}
    >
      {sidelink && (
        <aside
          sx={{
            display: 'inline-block',
            position: ['inherit', 'absolute'],
            textAlign: 'left',
            padding: ['0.3rem 0', '0'],
            marginBottom: ['inherit', '0rem'],
            border: 'none',
            width: ['auto', '90%'],
            a: {
              lineHeight: 1,
            }
          }}
        >
          {sidelink}
        </aside>
      )}
      {children}
    </Box>
  );
}
