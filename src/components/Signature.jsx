/** @jsxImportSource theme-ui */

import dayjs from 'dayjs';
import dayjs_relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(dayjs_relativeTime);

import { Box } from "theme-ui";

import { smallCaps } from '@styles/theme';

export default function Signature({ date }) {
  return (
    <Box sx={{
      marginTop: '3.4rem',
      paddingTop: '0.3rem',
      borderTop: '1px solid',
    }}>
      <small sx={{
        fontFamily: smallCaps('informal'),
        fontFeatureSettings: "'c2sc'",
        float: 'right',
        textAlign: 'right',
      }}>
        <em>
          ~ Daniel.
          <br/>
          {date && (
            <span title={dayjs(date).format('HH:mm:ss @ D MMMM, YYYY')}>
              {dayjs(date).fromNow()}
            </span>
          )}
        </em>
      </small>
    </Box>
  );
}
